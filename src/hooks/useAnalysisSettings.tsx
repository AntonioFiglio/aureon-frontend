import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import mock from "../mock.json"
interface DbConfig {
  projectId: string;
  datasetId: string;
  tableId: string;
  gcpServiceKey: string;
  schema: string;

  host: string;
  database: string;
  user: string;
  password: string;
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
const ws = io('http://localhost:5000');

export function AnalysisSettingsProvider({ children }: { children?: ReactNode }) {
  const [lineLimit, setLineLimit] = useState(100);
  const [dbType, setDbType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(mock);
  const [dbConfig, setDbConfig] = useState<DbConfig>({
    projectId: '',
    datasetId: '',
    tableId: '',
    gcpServiceKey: '',
    host: '',
    database: '',
    user: '',
    password: '',
  });

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
    if (ws) {
      ws.emit('analyze_table', {
        'host': dbConfig.host,
        'database': dbConfig.database,
        'user': dbConfig.user,
        'password': dbConfig.password,
        'schema': dbConfig.schema,
        'table': dbConfig.tableId,
        'sample_size': lineLimit,
      });
    }
  };

  useEffect(() => {
    ws.on('analysis_complete', (message) => {
      const messageParsed = JSON.parse(message);
      console.log(messageParsed);
    });

    ws.on('analysis_error', (message) => {
      const messageParsed = JSON.parse(message);
      console.log(messageParsed);
    });

    ws.on('analysis_result', (message) => {
      const messageParsed = JSON.parse(message);
      console.log(messageParsed);
    });

    ws.on('analysis_progress', (message) => {
      const messageParsed = JSON.parse(message);
      console.log(messageParsed);
    });

    return () => {
      ws.off('analysis_complete');
      ws.off('analysis_error');
      ws.off('analysis_result');
      ws.off('analysis_progress');
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

