import React, { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Dashboard } from './components/Dashboard';
import { PersonalData, UserSubscription } from './types/PersonalData';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'dashboard'>('welcome');
  const [personalData, setPersonalData] = useState<PersonalData | null>(null);
  const [userSubscription, setUserSubscription] = useState<UserSubscription>({
    isPremium: false,
    coins: 7, // 7 moedas gratuitas para começar
    isUnlimited: false
  });

  const handleDataSubmit = (data: PersonalData) => {
    setPersonalData(data);
    setCurrentScreen('dashboard');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
    setPersonalData(null);
  };

  const handleSubscriptionUpdate = (subscription: UserSubscription) => {
    setUserSubscription(subscription);
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