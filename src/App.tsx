import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { Dashboard } from './components/Dashboard';
import { PersonalData } from './types/PersonalData';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'dashboard'>('welcome');
  const [personalData, setPersonalData] = useState<PersonalData | null>(null);

  const handleDataSubmit = (data: PersonalData) => {
    setPersonalData(data);
    setCurrentScreen('dashboard');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
    setPersonalData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {currentScreen === 'welcome' ? (
        <WelcomeScreen onDataSubmit={handleDataSubmit} />
      ) : (
        <Dashboard personalData={personalData!} onBack={handleBackToWelcome} />
      )}
    </div>
  );
}

export default App;