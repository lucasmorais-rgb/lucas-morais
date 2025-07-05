import React, { useState } from 'react';
import { Heart, Zap, Target, ArrowRight } from 'lucide-react';
import { PersonalData } from '../types/PersonalData';

interface WelcomeScreenProps {
  onDataSubmit: (data: PersonalData) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onDataSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<PersonalData>>({});
  const [isAnimating, setIsAnimating] = useState(false);

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
        return formData.name && formData.name.length >= 2;
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Heart className="text-green-400 w-8 h-8" />
            <h1 className="text-3xl font-bold text-white">Seu Corpo Ideal</h1>
          </div>
          <p className="text-gray-300">Transforme sua vida com IA personalizada</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Passo {step} de 4</span>
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
        <div className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transition-all duration-300 ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                <h2 className="text-xl font-semibold text-white">Vamos começar!</h2>
                <p className="text-gray-300 text-sm">Como posso te chamar?</p>
              </div>
              <input
                type="text"
                placeholder="Seu nome completo"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {formData.name && (
                <p className="text-green-400 text-sm animate-fade-in">
                  Ótimo, {formData.name}! Vamos definir seu plano agora.
                </p>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Target className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                <h2 className="text-xl font-semibold text-white">Dados Corporais</h2>
                <p className="text-gray-300 text-sm">Preciso conhecer você melhor</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Altura (cm)</label>
                  <input
                    type="number"
                    placeholder="180"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    value={formData.height || ''}
                    onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Peso (kg)</label>
                  <input
                    type="number"
                    placeholder="70"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    value={formData.weight || ''}
                    onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Idade</label>
                  <input
                    type="number"
                    placeholder="25"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    value={formData.age || ''}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Gênero</label>
                  <select
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    value={formData.gender || ''}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'male' | 'female' })}
                  >
                    <option value="">Selecione</option>
                    <option value="male">Masculino</option>
                    <option value="female">Feminino</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <Zap className="w-12 h-12 text-purple-400 mx-auto mb-2" />
                <h2 className="text-xl font-semibold text-white">Nível de Atividade</h2>
                <p className="text-gray-300 text-sm">Como é sua rotina de exercícios?</p>
              </div>
              
              <div className="space-y-3">
                {[
                  { value: 'sedentary', label: 'Sedentário', desc: 'Pouco ou nenhum exercício' },
                  { value: 'lightly_active', label: 'Levemente Ativo', desc: 'Exercício leve 1-3 dias/semana' },
                  { value: 'moderately_active', label: 'Moderadamente Ativo', desc: 'Exercício moderado 3-5 dias/semana' },
                  { value: 'very_active', label: 'Muito Ativo', desc: 'Exercício intenso 6-7 dias/semana' },
                  { value: 'extra_active', label: 'Extremamente Ativo', desc: 'Exercício muito intenso, trabalho físico' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="activityLevel"
                      value={option.value}
                      checked={formData.activityLevel === option.value}
                      onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value as any })}
                      className="w-4 h-4 text-purple-400 focus:ring-purple-400 focus:ring-2"
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
                <Target className="w-12 h-12 text-green-400 mx-auto mb-2" />
                <h2 className="text-xl font-semibold text-white">Seu Objetivo</h2>
                <p className="text-gray-300 text-sm">O que você quer alcançar?</p>
              </div>
              
              <div className="space-y-3">
                {[
                  { value: 'lose_weight', label: 'Perder Peso', desc: 'Reduzir peso corporal total' },
                  { value: 'gain_muscle', label: 'Ganhar Massa Muscular', desc: 'Aumentar massa magra' },
                  { value: 'lose_fat_maintain_muscle', label: 'Perder Gordura e Manter Músculo', desc: 'Definição corporal' },
                  { value: 'maintain_weight', label: 'Manter Peso', desc: 'Manter peso atual e melhorar composição' }
                ].map((option) => (
                  <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="goal"
                      value={option.value}
                      checked={formData.goal === option.value}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value as any })}
                      className="w-4 h-4 text-green-400 focus:ring-green-400 focus:ring-2"
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
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/20 transition-all"
            >
              Voltar
            </button>
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="px-6 py-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-green-500 hover:to-blue-500 transition-all flex items-center gap-2"
            >
              {step === 4 ? 'Finalizar' : 'Próximo'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};