import { Database } from 'lucide-react';

interface WelcomeProps {
  sidebarVisible: boolean;
}

export default function Welcome({ sidebarVisible }: WelcomeProps) {
  return <div
    className={`flex-1 flex flex-col items-center justify-center transition-all duration-300 ${
      sidebarVisible ? 'ml-0' : 'ml-0'
    }`}
  >
    <div className="max-w-2xl w-full text-center space-y-8">
      {/* Ícone principal */}
      <div className="relative">
        <div
          className="w-24 h-24 mx-auto bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
          <Database className="w-12 h-12 text-white" />
        </div>
      </div>

      {/* Título e descrição */}
      <div>
        <h1 className="text-white text-4xl">Bem-vindo ao DB Analyzer</h1>
        <div className="space-y-4">
          <p className="text-white/80 text-xl leading-relaxed">
            Otimize seu banco de dados com análises inteligentes
          </p>
          <p className="text-white/60 text-lg leading-relaxed max-w-xl mx-auto">
            Configure sua conexão na barra lateral e descubra oportunidades de
            melhoria em performance, estrutura e segurança do seu banco de
            dados.
          </p>
        </div>
      </div>

      {/* Processo de uso */}
      <div className="mt-16 p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
        <h2 className="text-white text-2xl mb-6">Como usar</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-blue-300 text-sm">1</span>
            </div>
            <div>
              <h3 className="text-white text-lg mb-2">Configure</h3>
              <p className="text-white/70 text-sm">
                Conecte seu banco de dados usando as configurações da barra
                lateral
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-green-300 text-sm">2</span>
            </div>
            <div>
              <h3 className="text-white text-lg mb-2">Analise</h3>
              <p className="text-white/70 text-sm">
                Execute análises automáticas em tabelas, consultas e estrutura
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-purple-300 text-sm">3</span>
            </div>
            <div>
              <h3 className="text-white text-lg mb-2">Otimize</h3>
              <p className="text-white/70 text-sm">
                Implemente as sugestões de melhoria geradas automaticamente
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}