import React, { useState } from 'react';
import { PersonalData } from '../types/PersonalData';
import { HealthMetrics } from './HealthMetrics';
import { MealPlan } from './MealPlan';
import { AIChat } from './AIChat';
import { ProgressTracker } from './ProgressTracker';
import { ArrowLeft, Heart, Activity, Utensils, MessageSquare, TrendingUp } from 'lucide-react';

interface DashboardProps {
  personalData: PersonalData;
  onBack: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ personalData, onBack }) => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'meals' | 'chat' | 'progress'>('metrics');

  const tabs = [
    { id: 'metrics', label: 'Métricas', icon: Activity },
    { id: 'meals', label: 'Refeições', icon: Utensils },
    { id: 'chat', label: 'IA Nutricional', icon: MessageSquare },
    { id: 'progress', label: 'Progresso', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex items-center gap-2">
                <Heart className="text-green-400 w-6 h-6" />
                <h1 className="text-xl font-bold text-white">Seu Corpo Ideal</h1>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white font-semibold">Olá, {personalData.name}!</p>
              <p className="text-gray-300 text-sm">Vamos transformar sua vida hoje</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20 mb-6">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-green-400 to-blue-400 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {activeTab === 'metrics' && <HealthMetrics personalData={personalData} />}
          {activeTab === 'meals' && <MealPlan personalData={personalData} />}
          {activeTab === 'chat' && <AIChat personalData={personalData} />}
          {activeTab === 'progress' && <ProgressTracker personalData={personalData} />}
        </div>
      </div>
    </div>
  );
};