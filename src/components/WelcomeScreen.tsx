import React, { useState } from 'react';
import { Heart, Zap, Target, ArrowRight, Globe } from 'lucide-react';
import { PersonalData } from '../types/PersonalData';
import { useLanguage } from '../contexts/LanguageContext';

interface WelcomeScreenProps {
  onDataSubmit: (data: PersonalData) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onDataSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<PersonalData>>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const handleNext = () => {
    if (step < 4) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep(step + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      onDataSubmit(formData as PersonalData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setStep(step - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name && formData.name.length >= 2 && language;
      case 2:
        return formData.height && formData.weight && formData.age && formData.gender;
      case 3:
        return formData.activityLevel;
      case 4:
        return formData.goal;
      default:
        return false;
    }
  };

  const languages = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 px-6 sm:px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Heart className="text-green-400 w-6 h-6 sm:w-8 sm:h-8" />
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{t('appName')}</h1>
          </div>
          <p className="text-gray-300 text-sm sm:text-base">{t('appDescription')}</p>
          
          {/* Link discreto para área admin */}
          <div className="mt-4">
            <a 
              href="/admin" 
              className="text-gray-500 hover:text-gray-400 text-xs transition-colors"
              style={{ fontSize: '10px' }}
            >
              •
            </a>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">{t('step')} {step} {t('of')} 4</span>
            <span className="text-sm text-gray-400">{Math.round((step / 4) * 100)}%</span>
          </div>
          <div className="bg-gray-700 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-400 h-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Steps */}
        <div className={`bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 transition-all duration-300 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 mx-auto mb-2" />
                <h2 className="text-lg sm:text-xl font-semibold text-white">{t('letsStart')}</h2>
                <p className="text-gray-300 text-sm">{t('whatToCallYou')}</p>
              </div>

              {/* Language Selector */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Globe className="w-5 h-5 text-blue-400" />
                  <label className="text-sm font-medium text-gray-300">{t('selectLanguage')} *</label>
                </div>
                <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code as any)}
                      className={`flex items-center gap-2 p-3 rounded-xl transition-all text-left ${
                        language === lang.code
                          ? 'bg-gradient-to-r from-blue-400 to-purple-400 text-white'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="text-sm font-medium truncate">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">{t('yourName')} *</label>
                <input
                  type="text"
                  placeholder={t('fullNamePlaceholder')}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all text-base"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              {formData.name && language && (
                <p className="text-green-400 text-sm animate-fade-in">
                  {t('great')}, {formData.name}! {t('letsDefineYourPlan')}
                </p>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Target className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 mx-auto mb-2" />
                <h2 className="text-lg sm:text-xl font-semibold text-white">{t('bodyData')}</h2>
                <p className="text-gray-300 text-sm">{t('needToKnowYouBetter')}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t('height')} (cm)</label>
                  <input
                    type="number"
                    placeholder="180"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-base"
                    value={formData.height || ''}
                    onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t('weight')} (kg)</label>
                  <input
                    type="number"
                    placeholder="70"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-base"
                    value={formData.weight || ''}
                    onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t('age')}</label>
                  <input
                    type="number"
                    placeholder="25"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-base"
                    value={formData.age || ''}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">{t('gender')}</label>
                  <select
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all text-base"
                    value={formData.gender || ''}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
                  >
                    <option value="">{t('select')}</option>
                    <option value="male">{t('male')}</option>
                    <option value="female">{t('female')}</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400 mx-auto mb-2" />
                <h2 className="text-lg sm:text-xl font-semibold text-white">{t('activityLevel')}</h2>
                <p className="text-gray-300 text-sm">{t('exerciseRoutine')}</p>
              </div>
              
              <div className="space-y-3">
                {[
                  { value: 'sedentary', label: t('sedentary'), desc: t('sedentaryDesc') },
                  { value: 'lightly_active', label: t('lightlyActive'), desc: t('lightlyActiveDesc') },
                  { value: 'moderately_active', label: t('moderatelyActive'), desc: t('moderatelyActiveDesc') },
                  { value: 'very_active', label: t('veryActive'), desc: t('veryActiveDesc') },
                  { value: 'extra_active', label: t('extraActive'), desc: t('extraActiveDesc') }
                ].map((option) => (
                  <label key={option.value} className="flex items-start space-x-3 cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-all">
                    <input
                      type="radio"
                      name="activityLevel"
                      value={option.value}
                      checked={formData.activityLevel === option.value}
                      onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value as any })}
                      className="w-4 h-4 text-purple-400 focus:ring-purple-400 focus:ring-2 mt-1"
                    />
                    <div className="flex-1">
                      <div className="text-white font-medium">{option.label}</div>
                      <div className="text-gray-400 text-sm">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Target className="w-10 h-10 sm:w-12 sm:h-12 text-green-400 mx-auto mb-2" />
                <h2 className="text-lg sm:text-xl font-semibold text-white">{t('yourGoal')}</h2>
                <p className="text-gray-300 text-sm">{t('whatToAchieve')}</p>
              </div>
              
              <div className="space-y-3">
                {[
                  { value: 'lose_weight', label: t('loseWeight'), desc: t('loseWeightDesc') },
                  { value: 'gain_muscle', label: t('gainMuscle'), desc: t('gainMuscleDesc') },
                  { value: 'lose_fat_maintain_muscle', label: t('loseFatMaintainMuscle'), desc: t('loseFatMaintainMuscleDesc') },
                  { value: 'maintain_weight', label: t('maintainWeight'), desc: t('maintainWeightDesc') }
                ].map((option) => (
                  <label key={option.value} className="flex items-start space-x-3 cursor-pointer p-3 rounded-xl hover:bg-white/5 transition-all">
                    <input
                      type="radio"
                      name="goal"
                      value={option.value}
                      checked={formData.goal === option.value}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value as any })}
                      className="w-4 h-4 text-green-400 focus:ring-green-400 focus:ring-2 mt-1"
                    />
                    <div className="flex-1">
                      <div className="text-white font-medium">{option.label}</div>
                      <div className="text-gray-400 text-sm">{option.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="order-2 sm:order-1 px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-all text-base"
            >
              {t('back')}
            </button>
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="order-1 sm:order-2 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-500 hover:to-blue-500 transition-all flex items-center justify-center gap-2 text-base"
            >
              {step === 4 ? t('finish') : t('next')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};