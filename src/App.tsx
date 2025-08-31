import { useState } from 'react';
import { SettingsSidebar } from './components/SettingsSidebar';
import { MainContent } from './components/MainContent';
import { Menu } from 'lucide-react';
import { AnalysisSettingsProvider } from './hooks/useAnalysisSettings';

export default function App() {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <AnalysisSettingsProvider>
      <div
        className="bg-gradient-to-br from-[#0D1B2A] via-[#1B263B] to-[#A9D6E5] min-h-screen relative overflow-hidden">

        {/* BG decorativo com pontos */}
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `
            radial-gradient(circle at 15% 25%, rgba(255, 255, 255, 0.4) 1px, transparent 3px),
            radial-gradient(circle at 75% 80%, rgba(200, 230, 255, 0.3) 1.5px, transparent 4px),
            radial-gradient(circle at 40% 60%, rgba(255, 240, 200, 0.2) 0.5px, transparent 2px),
            radial-gradient(circle at 60% 30%, rgba(220, 220, 255, 0.25) 1.5px, transparent 3px)
          `,
            backgroundSize: '80px 80px, 100px 100px, 60px 60px, 50px 50px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center',
          }}
        />

        {/* Botão para abrir a sidebar */}
        {!sidebarVisible && (
          <button
            onClick={() => setSidebarVisible(true)}
            className="fixed top-6 left-6 z-20 p-3 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-xl shadow-lg border border-white/20 transition-all duration-300 group"
          >
            <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        )}

        {/* Grid com sidebar e conteúdo principal */}
        <div
          className={`grid ${sidebarVisible ? 'grid-cols-[320px_auto]' : 'grid-cols-[0_auto]'} transition-all duration-300`}>
          <SettingsSidebar
            isVisible={sidebarVisible}
            onToggle={() => setSidebarVisible(!sidebarVisible)}
          />
          <MainContent sidebarVisible={sidebarVisible} />
        </div>
      </div>
    </AnalysisSettingsProvider>
  );
}
