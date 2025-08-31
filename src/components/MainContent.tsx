import Welcome from './Welcome';
import { useAnalysisSettings } from '../hooks/useAnalysisSettings';
import AnalysisTable from './AnaysisTable';

interface MainContentProps {
  sidebarVisible: boolean;
}

export function MainContent({ sidebarVisible }: MainContentProps) {
  const { isLoading, result } = useAnalysisSettings();

  if (!isLoading && !result?.data?.columns_analysis) {
    return <Welcome sidebarVisible={sidebarVisible} />;
  }

  if (!result?.data?.columns_analysis) {
    return (
      <div className="flex items-center justify-center h-full text-white text-lg">
        Nenhum resultado disponível.
      </div>
    );
  }

  return (
    <div className="p-8 flex-1 overflow-auto px-24">
      <h1 className="text-2xl font-bold text-white mb-6">
        Resultado da Análise - Tabela: {result.data.table_info.table}
      </h1>

      <AnalysisTable columns={result.data.columns_analysis} />
    </div>
  );
}
