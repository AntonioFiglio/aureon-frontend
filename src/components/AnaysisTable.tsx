import React, { useMemo, useState } from 'react';

interface ConfidenceDetails {
  heuristic_rules: {
    confidence: number;
    method: string;
    description: string;
  };
  machine_learning: {
    confidence: number;
    method: string;
    description: string;
    model_version: string;
  };
  generative_ai: {
    confidence: number;
    method: string;
    description: string;
    model_type: string;
  };
}

interface ColumnAnalysis {
  column_name: string;
  predicted_type: string;
  expected_type: string;
  confidence: number;
  concordance: boolean;
  issues: string[];
  confidence_details: ConfidenceDetails;
}

interface AnalysisTableProps {
  columns: ColumnAnalysis[];
}

export default function AnalysisTable({ columns }: AnalysisTableProps) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterConcordance, setFilterConcordance] = useState('');

  const filteredColumns = useMemo(() => {
    return columns.filter((col) => {
      const matchesSearch = col.column_name.toLowerCase().includes(search.toLowerCase());

      const matchesType = filterType
        ? col.predicted_type.toLowerCase() === filterType.toLowerCase() ||
        col.expected_type.toLowerCase() === filterType.toLowerCase()
        : true;

      const matchesConcordance =
        filterConcordance === 'sim'
          ? col.concordance
          : filterConcordance === 'nao'
            ? !col.concordance
            : true;

      return matchesSearch && matchesType && matchesConcordance;
    });
  }, [columns, search, filterType, filterConcordance]);


  const options = Array.from(new Set(
    columns.flatMap(col => [col.predicted_type, col.expected_type])
           .filter(Boolean) // remove valores nulos/undefined
           .map(tipo => tipo.toUpperCase()), // padroniza, por exemplo: "int" → "INT"
  ));

  return (
    <div className="space-y-4">
      {/* Filtros */}
      <div className="flex flex-wrap gap-4 items-center bg-white/5 p-4 rounded-xl border border-white/10">
        <input
          type="text"
          placeholder="🔍 Buscar coluna..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white/10 text-white placeholder-white/60 px-3 py-2 rounded-md border border-white/20 focus:outline-none w-52"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-white/10 text-white px-3 py-2 rounded-md border border-white/20 focus:outline-none w-40"
        >
          <option value="">Tipo Detectado</option>
          {
            options.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))
          }
        </select>

        <select
          value={filterConcordance}
          onChange={(e) => setFilterConcordance(e.target.value)}
          className="bg-white/10 text-white px-3 py-2 rounded-md border border-white/20 focus:outline-none w-40"
        >
          <option value="">Concordância</option>
          <option value="sim">✔ Sim</option>
          <option value="nao">✖ Não</option>
        </select>

        {(search || filterType || filterConcordance) && (
          <button
            onClick={() => {
              setSearch('');
              setFilterType('');
              setFilterConcordance('');
            }}
            className="text-sm px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
          >
            Limpar Filtros
          </button>
        )}
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="min-w-full text-sm bg-white/5 text-white">
          <thead className="bg-white/10 text-white/80">
          <tr>
            <th className="px-4 py-3 text-center">Coluna</th>
            <th className="px-4 py-3 text-center">Tipo Detectado</th>
            <th className="px-4 py-3 text-center">Tipo Esperado</th>
            <th className="px-4 py-3 text-center">Concordância</th>
            <th className="px-4 py-3 text-center">Confiança</th>
            <th className="px-4 py-3 text-left">Problemas</th>
          </tr>
          </thead>
          <tbody>
          {filteredColumns.length > 0 ? (
            filteredColumns.map((col, idx) => (
              <tr
                key={idx}
                className={`border-t border-white/10 ${
                  col.concordance ? 'bg-white/5' : 'bg-red-900/50'
                }  ${
                  col.concordance ? 'hover:bg-white/20' : 'hover:bg-red-900/80'
                } transition-colors`}
              >
                <td className="px-4 py-3 text-center font-medium">{col.column_name}</td>
                <td className="px-4 py-3 text-center uppercase text-[#FFFFFF]">{col.predicted_type}</td>
                <td className="px-4 py-3 text-center uppercase text-white">{col.expected_type}</td>
                <td className="px-4 py-3 text-center">
                  {col.concordance ? (
                    <span className="text-green-400 font-semibold">Sim</span>
                  ) : (
                    <span className="text-red-400 font-semibold">Não</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-white/20 rounded h-2">
                      <div
                        className={`h-2 rounded ${
                          col.confidence >= 0.9
                            ? 'bg-green-400'
                            : col.confidence >= 0.7
                              ? 'bg-yellow-400'
                              : 'bg-red-400'
                        }`}
                        style={{ width: `${(col.confidence * 100).toFixed(1)}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-white/80 min-w-[3ch] text-right text-center">
                        {(col.confidence * 100).toFixed(0)}%
                      </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-left">
                  {col.issues.length > 0 ? (
                    <ul className="list-disc list-inside text-yellow-300 text-xs">
                      {col.issues.map((issue, i) => (
                        <li key={i}>{issue}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-white/40 text-xs">Nenhum</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center px-4 py-6 text-white/60 italic">
                Nenhuma coluna encontrada com os filtros aplicados.
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
