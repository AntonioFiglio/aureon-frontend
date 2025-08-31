import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import resultRock from '../mock.json';

interface DbConfig {
  projectId: string;
  datasetId: string;
  tableId: string;
  gcpServiceKey: string;
  url: string;
}

interface HandleLineLimitChangeProps {
  increment?: boolean;
  override?: number;
}

interface AnalysisSettingsContextProps {
  lineLimit: number;
  handleLineLimitChange: (props: HandleLineLimitChangeProps) => void;
  dbType: string;
  setDbType: (value: string) => void;
  dbConfig: DbConfig;
  handleDbConfigChange: (field: keyof DbConfig, value: string) => void;
  isLoading: boolean;
  handleAnalysisStart: () => Promise<void>;
  result: AnalysisResponse;
}

export interface AnalysisResponse {
  status: 'success' | 'error';
  data: AnalysisData;
  metadata: Metadata;
}

export interface AnalysisData {
  table_info: TableInfo;
  sample_info: SampleInfo;
  columns_analysis: ColumnAnalysis[];
  summary: Summary;
}

export interface TableInfo {
  schema: string;
  table: string;
  total_columns: number;
  analyzed_columns: number;
}

export interface SampleInfo {
  total_rows: number;
  analyzed_rows: number;
}

export interface ColumnAnalysis {
  column_name: string;
  expected_type: string;
  predicted_type: string;
  confidence: number;
  confidence_ml: number;
  confidence_gen: number;
  concordance: boolean;
  samples: number;
  issues: string[];
  confidence_details: ConfidenceDetails;
}

export interface ConfidenceDetails {
  heuristic_rules: ConfidenceMethod;
  machine_learning: ConfidenceMethod & {
    model_version: string;
  };
  generative_ai: ConfidenceMethod & {
    model_type: string;
  };
}

export interface ConfidenceMethod {
  confidence: number;
  method: string;
  description: string;
}

export interface Summary {
  total_columns: number;
  concordant_columns: number;
  concordance_rate: number;
  confidence_distribution: {
    high: number;
    medium: number;
    low: number;
  };
  issues_found: number;
}

export interface Metadata {
  analyzed_at: string;
  client_id: string;
  parameters: {
    schema: string;
    table: string;
    sample_size: number;
  };
}

const AnalysisSettingsContext = createContext<AnalysisSettingsContextProps | undefined>(undefined);

export function AnalysisSettingsProvider({ children }: { children?: ReactNode }) {
  const [lineLimit, setLineLimit] = useState(100);
  const [dbType, setDbType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(resultRock);
  const [dbConfig, setDbConfig] = useState<DbConfig>({
    projectId: '',
    datasetId: '',
    tableId: '',
    gcpServiceKey: '',
    url: '',
  });

  const wsRef = useRef<WebSocket | null>(null);

  const handleLineLimitChange = ({ increment, override }: HandleLineLimitChangeProps) => {
    setLineLimit((prev) => {
      let newValue;

      if (override !== undefined) {
        newValue = Number(override);
      } else if (increment) {
        newValue = prev + 10;
      } else {
        newValue = prev - 10;
      }

      return Math.max(10, Math.min(10000, newValue));
    });
  };

  const handleDbConfigChange = (field: keyof DbConfig, value: string) => {
    setDbConfig((prev) => ({ ...prev, [field]: value }));
  };

  const handleAnalysisStart = async () => {
    setIsLoading(true);
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: 'start_analysis', params: { lineLimit, dbConfig } }));
    }
  };

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001'); // seu servidor WS
    wsRef.current = ws;

    ws.onopen = () => console.log('✅ WebSocket conectado');
    ws.onclose = () => console.log('❌ WebSocket desconectado');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case 'progress':
          console.log('📊 Progresso:', data.value);
          break;

        case 'partial_result':
          console.log('📄 Resultado parcial:', data.payload);
          setResult((prev) => ({
            ...prev,
            data: {
              ...prev.data,
              columns_analysis: [
                ...prev.data.columns_analysis,
                ...data.payload,
              ],
            },
          }));
          break;

        case 'done':
          console.log('✅ Análise concluída:', data.payload);
          setResult(data.payload);
          setIsLoading(false);
          break;

        default:
          console.warn('⚠️ Evento desconhecido:', data);
      }
    };

    return () => {
      ws.close();
    };
  }, []);


  return (
    <AnalysisSettingsContext.Provider
      value={{
        lineLimit,
        handleLineLimitChange,
        dbType,
        setDbType,
        dbConfig,
        handleDbConfigChange,
        isLoading,
        handleAnalysisStart,
        result,
      }}
    >
      {children}
    </AnalysisSettingsContext.Provider>
  );
}

export function useAnalysisSettings() {
  const context = useContext(AnalysisSettingsContext);
  if (!context) {
    throw new Error('useAnalysisSettings deve ser usado dentro de um AnalysisSettingsProvider');
  }
  return context;
}
