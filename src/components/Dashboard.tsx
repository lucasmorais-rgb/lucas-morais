import React, { useState } from 'react';
import { PersonalData, UserSubscription } from '../types/PersonalData';
import { HealthMetrics } from './HealthMetrics';
import { MealPlan } from './MealPlan';
import { AIChat } from './AIChat';
import { ProgressTracker } from './ProgressTracker';
import { PricingPlans } from './PricingPlans';
import { ArrowLeft, Heart, Activity, Utensils, MessageSquare, TrendingUp, Crown, Coins } from 'lucide-react';

interface DashboardProps {
  personalData: PersonalData;
  userSubscription: UserSubscription;
  onBack: () => void;
  onSubscriptionUpdate: (subscription: UserSubscription) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ 
  personalData, 
  userSubscription, 
  onBack, 
  onSubscriptionUpdate 
}) => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'meals' | 'chat' | 'progress' | 'plans'>('metrics');

  const tabs = [
    { id: 'metrics', label: 'Métricas', icon: Activity },
    { id: 'meals', label: 'Refeições', icon: Utensils },
    { id: 'chat', label: 'IA Nutricional', icon: MessageSquare },
    { id: 'progress', label: 'Progresso', icon: TrendingUp },
    { id: 'plans', label: 'Planos', icon: Crown }
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
          
          {/* Coins Display */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500 rounded-xl">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-medium">
                  {userSubscription.isUnlimited ? 'Moedas Ilimitadas' : `${userSubscription.coins} Moedas`}
                </p>
                <p className="text-gray-300 text-sm">
                  {userSubscription.isPremium ? 'Plano Premium Ativo' : 'Teste Grátis'}
                </p>
              </div>
            </div>
            
            {!userSubscription.isPremium && userSubscription.coins <= 5 && (
              <button
                onClick={() => setActiveTab('plans')}
                className="px-4 py-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl text-white text-sm hover:from-purple-500 hover:to-blue-500 transition-all"
              >
                Upgrade Premium
              </button>
            )}
          </div>
        </div>
        
        {/* Low Coins Warning */}
        {!userSubscription.isPremium && userSubscription.coins <= 5 && userSubscription.coins > 0 && (
          <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-2xl p-4 mb-6">
            <div className="flex items-center gap-3">
              <Coins className="w-6 h-6 text-yellow-400" />
              <div>
                <p className="text-yellow-300 font-medium">
                  Suas moedas estão acabando! ({userSubscription.coins} restantes)
                </p>
                <p className="text-yellow-400 text-sm">
                  Faça upgrade para o Premium e tenha acesso ilimitado por apenas R$ 19,90/mês
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* No Coins Warning */}
        {!userSubscription.isPremium && userSubscription.coins === 0 && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-6 mb-6">
            <div className="text-center">
              <Coins className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Suas moedas acabaram!</h3>
              <p className="text-red-300 mb-4">
                Para continuar usando todas as funcionalidades, faça upgrade para o Plano Premium
              </p>
              <button
                onClick={() => setActiveTab('plans')}
                className="px-6 py-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all"
              >
                Ver Planos Premium
              </button>
            </div>
          </div>
        )}

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
          {activeTab === 'meals' && <MealPlan personalData={personalData} userSubscription={userSubscription} onSubscriptionUpdate={onSubscriptionUpdate} />}
          {activeTab === 'chat' && <AIChat personalData={personalData} userSubscription={userSubscription} onSubscriptionUpdate={onSubscriptionUpdate} />}
          {activeTab === 'progress' && <ProgressTracker personalData={personalData} />}
          {activeTab === 'plans' && <PricingPlans onSubscriptionUpdate={onSubscriptionUpdate} />}
        </div>
      </div>
    </div>
  );
};