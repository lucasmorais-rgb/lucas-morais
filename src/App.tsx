import React, { useState } from 'react';
import { PersonalData, UserSubscription } from './types/PersonalData';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Dashboard } from './components/Dashboard';
import { SalesLanding } from './components/SalesLanding';
import { LanguageProvider } from './contexts/LanguageContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ExternalLink, ArrowLeft } from 'lucide-react';

function App() {
  // Estado para controlar qual página mostrar
  const [currentPage, setCurrentPage] = useState<'landing' | 'app'>('landing');
  
  // Estados do app original
  const [personalData, setPersonalData] = useLocalStorage<PersonalData | null>('personalData', null);
  const [userSubscription, setUserSubscription] = useLocalStorage<UserSubscription>('userSubscription', {
    isPremium: false,
    coins: 10,
    isUnlimited: false
  });

  const handleDataSubmit = (data: PersonalData) => {
    setPersonalData(data);
  };

  const handleBack = () => {
    setPersonalData(null);
    setUserSubscription({
      isPremium: false,
      coins: 10,
      isUnlimited: false
    });
  };

  // Se estiver na landing page
  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Botão para acessar o app */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setCurrentPage('app')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="hidden sm:inline">Acessar App Gratuito</span>
            <span className="sm:hidden">App</span>
          </button>
        </div>
        
        <SalesLanding />
      </div>
    );
  }

  // Se estiver no app
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Botão para voltar à landing */}
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => setCurrentPage('landing')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Voltar à Landing</span>
            <span className="sm:hidden">Voltar</span>
          </button>
        </div>

        {personalData ? (
          <Dashboard
            personalData={personalData}
            userSubscription={userSubscription}
            onBack={handleBack}
            onSubscriptionUpdate={setUserSubscription}
          />
        ) : (
          <WelcomeScreen onDataSubmit={handleDataSubmit} />
        )}
      </div>
    </LanguageProvider>
  );
}

export default App;