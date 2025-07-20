import React, { useState } from 'react';
import { PersonalData, UserSubscription } from '../types/PersonalData';
import { useLanguage } from '../contexts/LanguageContext';
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

const AccessRequired: React.FC<{ onUpgrade: () => void }> = ({ onUpgrade }) => (
  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 text-center">
    <Crown className="w-16 h-16 text-purple-400 mx-auto mb-4" />
    <h3 className="text-xl font-bold text-white mb-2">Acesso Premium Necessário</h3>
    <p className="text-gray-300 mb-6">
      Esta funcionalidade está disponível apenas para usuários premium.
    </p>
    <button
      onClick={onUpgrade}
      className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 rounded-xl text-white font-semibold hover:from-green-500 hover:to-green-700 transition-all"
    >
      Fazer Upgrade - R$ 27
    </button>
  </div>
);

export const Dashboard: React.FC<DashboardProps> = ({ 
  personalData, 
  userSubscription, 
  onBack, 
  onSubscriptionUpdate 
}) => {
  const [activeTab, setActiveTab] = useState<'metrics' | 'meals' | 'chat' | 'progress' | 'plans'>('metrics');
  const { t } = useLanguage();

  const tabs = [
    { id: 'metrics', label: t('metrics'), icon: Activity },
    { id: 'meals', label: t('meals'), icon: Utensils },
    { id: 'chat', label: t('aiNutritional'), icon: MessageSquare },
    { id: 'progress', label: t('progress'), icon: TrendingUp },
    { id: 'plans', label: t('plans'), icon: Crown }
  ];

  return (
    <div className="min-h-screen p-3 sm:p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 mb-4 sm:mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>
              <div className="flex items-center gap-2 min-w-0">
                <Heart className="text-green-400 w-6 h-6" />
                <h1 className="text-lg sm:text-xl font-bold text-white truncate">{t('appName')}</h1>
              </div>
            </div>
            <div className="text-right min-w-0 hidden sm:block">
              <p className="text-white font-semibold truncate">{t('hello')}, {personalData.name}!</p>
              <p className="text-gray-300 text-sm">{t('transformYourLife')}</p>
            </div>
          </div>
          
          {/* Mobile User Greeting */}
          <div className="sm:hidden mt-4 text-center">
            <p className="text-white font-semibold">{t('hello')}, {personalData.name}!</p>
            <p className="text-gray-300 text-sm">{t('transformYourLife')}</p>
          </div>
          
          {/* Access Status */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="p-2 bg-green-500 rounded-xl">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-white font-medium">
                  {userSubscription.hasAccess ? 'Acesso Completo Ativo' : 'Acesso Limitado'}
                </p>
                <p className="text-gray-300 text-sm truncate">
                  {userSubscription.hasAccess ? 'Aproveite todas as funcionalidades' : 'Desbloqueie o potencial completo'}
                </p>
              </div>
            </div>
            
            {!userSubscription.hasAccess && (
              <button
                onClick={() => setActiveTab('plans')}
                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 rounded-xl text-white text-xs sm:text-sm hover:from-green-500 hover:to-green-700 transition-all whitespace-nowrap flex-shrink-0"
              >
                <span className="hidden sm:inline">Desbloquear Acesso</span>
                <span className="sm:hidden">Desbloquear</span>
              </button>
            )}
          </div>
        </div>
        
        {/* Access Required Warning */}
        {!userSubscription.hasAccess && (
          <div className="bg-purple-500/20 border border-purple-500/30 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="text-center">
              <Crown className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Desbloqueie o Acesso Completo</h3>
              <p className="text-purple-300 mb-4 text-sm sm:text-base">
                Para usar todas as funcionalidades da plataforma, adquira o acesso completo por apenas R$ 27
              </p>
              <button
                onClick={() => setActiveTab('plans')}
                className="px-4 sm:px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 rounded-xl text-white font-semibold hover:from-green-500 hover:to-green-700 transition-all text-sm sm:text-base"
              >
                Ver Oferta Especial - R$ 27
              </button>
            </div>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20 mb-4 sm:mb-6">
          <div className="flex gap-1 sm:gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 rounded-xl transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-green-400 to-blue-400 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-4 sm:h-4" />
                  <span className="font-medium text-xs sm:text-sm">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="animate-fade-in">
          {activeTab === 'metrics' && <HealthMetrics personalData={personalData} />}
          {activeTab === 'meals' && (userSubscription.hasAccess ? <MealPlan personalData={personalData} userSubscription={userSubscription} onSubscriptionUpdate={onSubscriptionUpdate} /> : <AccessRequired onUpgrade={() => setActiveTab('plans')} />)}
          {activeTab === 'chat' && (userSubscription.hasAccess ? <AIChat personalData={personalData} userSubscription={userSubscription} onSubscriptionUpdate={onSubscriptionUpdate} /> : <AccessRequired onUpgrade={() => setActiveTab('plans')} />)}
          {activeTab === 'progress' && <ProgressTracker personalData={personalData} />}
          {activeTab === 'plans' && <PricingPlans onSubscriptionUpdate={onSubscriptionUpdate} />}
        </div>
      </div>
    </div>
  );
};