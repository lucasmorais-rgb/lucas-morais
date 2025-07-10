import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Dashboard } from './components/Dashboard';
import { PersonalData, UserSubscription } from './types/PersonalData';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'dashboard'>('welcome');
  
  // Usar localStorage para persistir dados
  const [personalData, setPersonalDataStorage] = useLocalStorage<PersonalData | null>('personalData', null);
  const [userSubscription, setUserSubscriptionStorage] = useLocalStorage<UserSubscription>('userSubscription', {
    isPremium: false,
    coins: 7, // 7 moedas gratuitas para começar
    isUnlimited: false
  });
  
  // Definir tela inicial baseada nos dados salvos
  React.useEffect(() => {
    if (personalData) {
      setCurrentScreen('dashboard');
    }
  }, [personalData, setCurrentScreen]);

  const handleDataSubmit = (data: PersonalData) => {
    setPersonalDataStorage(data);
    setCurrentScreen('dashboard');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
    setPersonalDataStorage(null);
    // Resetar subscription para valores iniciais
    setUserSubscriptionStorage({
      isPremium: false,
      coins: 7,
      isUnlimited: false
    });
  };

  const handleSubscriptionUpdate = (subscription: UserSubscription) => {
    setUserSubscriptionStorage(subscription);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {currentScreen === 'welcome' ? (
          <WelcomeScreen onDataSubmit={handleDataSubmit} />
        ) : (
          <Dashboard 
            personalData={personalData!} 
            userSubscription={userSubscription}
            onBack={handleBackToWelcome}
            onSubscriptionUpdate={handleSubscriptionUpdate}
          />
        )}
      </div>
    </LanguageProvider>
  );
}

export default App;