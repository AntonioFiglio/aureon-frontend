import { Loader, Minus, Plus, Search, Settings, X } from 'lucide-react';
import { InputField } from './inputField';
import { useAnalysisSettings } from '../hooks/useAnalysisSettings';

interface SettingsSidebarProps {
  isVisible: boolean;
  onToggle: () => void;
}

interface HandleLineLimitChangeProps {
  increment?: boolean;
  override?: number;
}

export function SettingsSidebar({ isVisible, onToggle }: SettingsSidebarProps) {
  const {
    confidence,
    setConfidence,
    lineLimit,
    handleLineLimitChange,
    dbType,
    setDbType,
    dbConfig,
    handleDbConfigChange,
    isLoading,
    handleAnalysisStart,
  } = useAnalysisSettings();

  return (
    <div
      className={`transition-all duration-300 ${
        isVisible ? 'w-80 opacity-100' : 'w-0 opacity-0 overflow-hidden'
      }`}
    >
      <div
        className="w-80 h-[100dvh] bg-white/10 backdrop-blur-sm border-r border-white/20 p-6 rounded-r-3xl shadow-lg flex flex-col">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-white">Configurações</h2>
          </div>
          <button
            onClick={onToggle}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors group"
          >
            <X className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Conteúdo principal */}
        <div className="flex flex-col flex-grow">

          {/* Limite de Linhas e Banco */}
          <div className="space-y-6 flex-shrink-0">
            {/* Limite de Linhas */}
            <div className="space-y-3">
              <label className="text-white text-md font-bold">Limite de Linhas</label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLineLimitChange({ increment: false })}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Minus className="w-4 h-4 text-white" />
                </button>
                <input
                  type="number"
                  value={lineLimit}
                  onChange={(e) => handleLineLimitChange({ override: Number(e.target.value) })}
                  className="flex-1 bg-white/10 rounded-lg px-3 py-2 text-center text-white outline-none"
                />
                <button
                  onClick={() => handleLineLimitChange({ increment: true })}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Seleção de Banco de Dados */}
            <div className="space-y-3">
              <label className="text-white text-md font-bold">Banco de Dados</label>
              <select
                value={dbType}
                onChange={(e) => setDbType(e.target.value)}
                className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-3 py-2"
              >
                <option value="">Selecione o tipo</option>
                <option value="bigquery" disabled>BigQuery</option>
                <option value="postgres">PostgreSQL</option>
                <option value="mysql">MySQL</option>
              </select>
            </div>
          </div>

          {/* Configuração scrollable */}
          <div className="flex-grow overflow-y-auto mt-4 space-y-4">
            {/* Config BigQuery */}
            {dbType === 'bigquery' && (
              <div className="space-y-4 p-4 bg-white/5 rounded-xl border border-white/10 max-h-[60vh] overflow-y-auto">
                <h3 className="text-white text-md font-bold">Configuração BigQuery</h3>
                <InputField
                  label="Project ID"
                  value={dbConfig.projectId}
                  onChange={(value) => handleDbConfigChange('projectId', value)}
                  placeholder="seu-project-id"
                />
                <InputField
                  label="Dataset ID"
                  value={dbConfig.datasetId}
                  onChange={(value) => handleDbConfigChange('datasetId', value)}
                  placeholder="seu_dataset"
                />
                <InputField
                  label="Table ID"
                  value={dbConfig.tableId}
                  onChange={(value) => handleDbConfigChange('tableId', value)}
                  placeholder="sua_tabela"
                />
                <InputField
                  label="GCP Service Account Key"
                  value={dbConfig.gcpServiceKey}
                  onChange={(value) => handleDbConfigChange('gcpServiceKey', value)}
                  placeholder="Cole aqui sua chave de serviço JSON..."
                />
              </div>
            )}

            {/* Config MySQL/PostgreSQL */}
            {(dbType === 'postgres' || dbType === 'mysql') && (
              <div className="space-y-4 p-4 bg-white/5 rounded-xl border border-white/10 max-h-[60vh] overflow-y-auto">
                <h3 className="text-white text-sm font-semibold">
                  Configuração {dbType === 'postgres' ? 'PostgreSQL' : 'MySQL'}
                </h3>
                <InputField
                  label="Base de Dados"
                  value={dbConfig.database}
                  onChange={(value) => handleDbConfigChange('database', value)}
                />
                <InputField
                  label="Host"
                  value={dbConfig.host}
                  onChange={(value) => handleDbConfigChange('host', value)}
                />
                <InputField
                  label="Usuário"
                  value={dbConfig.user}
                  onChange={(value) => handleDbConfigChange('user', value)}
                />
                <InputField
                  label="Senha"
                  value={dbConfig.password}
                  onChange={(value) => handleDbConfigChange('password', value)}
                  type="password"
                />
                <InputField
                  label="Nome do Schema"
                  value={dbConfig.schema}
                  onChange={(value) => handleDbConfigChange('schema', value)}
                  placeholder="Schema"
                />
                <InputField
                  label="Nome da Tabela"
                  value={dbConfig.tableId}
                  onChange={(value) => handleDbConfigChange('tableId', value)}
                  placeholder="order_items"
                />
              </div>
            )}
          </div>

          {/* Botão fixo */}
          <div className="mt-4 flex-shrink-0">
            <button
              onClick={handleAnalysisStart}
              disabled={isLoading}
              className={`w-full inline-flex items-center justify-center gap-2
                bg-green-400/80 hover:bg-green-400/40
                focus:outline-none focus:ring-4 focus:ring-blue-300
                text-white font-semibold shadow-md transition duration-300
                py-4 px-6 rounded-xl text-base md:text-lg
                ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
              `}
            >
              {isLoading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
              )}
              <span>{isLoading ? 'Analisando...' : 'Iniciar Análise'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
