import React, { useState } from 'react';
import { PersonalData, UserSubscription } from './types/PersonalData';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Dashboard } from './components/Dashboard';
import { LanguageProvider } from './contexts/LanguageContext';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  // Estados do app
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

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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