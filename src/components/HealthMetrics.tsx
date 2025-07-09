import React from 'react';
import { PersonalData, HealthMetrics as HealthMetricsType } from '../types/PersonalData';
import { useLanguage } from '../contexts/LanguageContext';
import { Calculator, Target, Zap, Heart, TrendingUp, Scale } from 'lucide-react';

interface HealthMetricsProps {
  personalData: PersonalData;
}

export const HealthMetrics: React.FC<HealthMetricsProps> = ({ personalData }) => {
  const { t } = useLanguage();
  
  const calculateMetrics = (): HealthMetricsType => {
    const { height, weight, age, gender, activityLevel, goal } = personalData;
    
    // BMI Calculation
    const bmi = weight / ((height / 100) ** 2);
    
    // BMR Calculation (Mifflin-St Jeor Equation)
    const bmr = gender === 'male' 
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
    
    // Activity Level Multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      extra_active: 1.9
    };
    
    const dailyCalories = bmr * activityMultipliers[activityLevel];
    
    // Target Calories based on goal
    let targetCalories = dailyCalories;
    if (goal === 'lose_weight') {
      targetCalories = dailyCalories - 500; // 500 cal deficit
    } else if (goal === 'gain_muscle') {
      targetCalories = dailyCalories + 300; // 300 cal surplus
    } else if (goal === 'lose_fat_maintain_muscle') {
      targetCalories = dailyCalories - 300; // 300 cal deficit
    }
    
    // BMI Category
    let bmiCategory = '';
    if (bmi < 18.5) bmiCategory = 'Abaixo do peso';
    else if (bmi < 25) bmiCategory = 'Peso normal';
    else if (bmi < 30) bmiCategory = 'Sobrepeso';
    else bmiCategory = 'Obesidade';
    
    // Ideal Weight (using BMI 22 as target)
    const idealWeight = 22 * ((height / 100) ** 2);
    
    return {
      bmi,
      bmr,
      dailyCalories,
      targetCalories,
      bmiCategory,
      idealWeight
    };
  };

  const metrics = calculateMetrics();

  const MetricCard: React.FC<{
    icon: React.ElementType;
    title: string;
    value: string;
    subtitle: string;
    color: string;
    progress?: number;
  }> = ({ icon: Icon, title, value, subtitle, color, progress }) => (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {progress !== undefined && (
          <div className="text-right">
            <span className="text-2xl font-bold text-white">{progress}%</span>
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-2xl font-bold text-white mb-2">{value}</p>
      <p className="text-gray-300 text-sm">{subtitle}</p>
      
      {progress !== undefined && (
        <div className="mt-4">
          <div className="bg-gray-700 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${color.replace('bg-', 'bg-')}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );

  const getGoalDescription = () => {
    switch (personalData.goal) {
      case 'lose_weight':
        return 'Déficit calórico para perda de peso';
      case 'gain_muscle':
        return 'Superávit calórico para ganho de massa';
      case 'lose_fat_maintain_muscle':
        return 'Déficit moderado para definição';
      default:
        return 'Manutenção do peso atual';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <MetricCard
          icon={Calculator}
          title="IMC"
          value={metrics.bmi.toFixed(1)}
          subtitle={metrics.bmiCategory}
          color="bg-blue-500"
          progress={Math.min((metrics.bmi / 25) * 100, 100)}
        />
        
        <MetricCard
          icon={Zap}
          title="Taxa Metabólica Basal"
          value={`${Math.round(metrics.bmr)} kcal`}
          subtitle="Calorias em repouso"
          color="bg-purple-500"
        />
        
        <MetricCard
          icon={Heart}
          title="Gasto Diário"
          value={`${Math.round(metrics.dailyCalories)} kcal`}
          subtitle="Com atividade física"
          color="bg-red-500"
        />
      </div>

      {/* Target and Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-green-400" />
            <h3 className="text-base sm:text-lg font-semibold text-white">Meta Calórica Diária</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Calorias Alvo:</span>
              <span className="text-xl sm:text-2xl font-bold text-green-400">{Math.round(metrics.targetCalories)} kcal</span>
            </div>
            
            <div className="bg-gray-700 h-4 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-400 h-full transition-all duration-1000 ease-out"
                style={{ width: `${(metrics.targetCalories / metrics.dailyCalories) * 100}%` }}
              />
            </div>
            
            <p className="text-gray-300 text-sm">{getGoalDescription()}</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <Scale className="w-6 h-6 text-yellow-400" />
            <h3 className="text-base sm:text-lg font-semibold text-white">Peso Ideal</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Peso Atual:</span>
              <span className="text-lg sm:text-xl font-bold text-white">{personalData.weight} kg</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Peso Ideal:</span>
              <span className="text-lg sm:text-xl font-bold text-yellow-400">{metrics.idealWeight.toFixed(1)} kg</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Diferença:</span>
              <span className={`text-lg sm:text-xl font-bold ${personalData.weight > metrics.idealWeight ? 'text-red-400' : 'text-green-400'}`}>
                {personalData.weight > metrics.idealWeight ? '+' : ''}{(personalData.weight - metrics.idealWeight).toFixed(1)} kg
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-blue-400" />
          <h3 className="text-base sm:text-lg font-semibold text-white">Análise Detalhada</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Seus Dados</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Altura:</span>
                <span className="text-white">{personalData.height} cm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Peso:</span>
                <span className="text-white">{personalData.weight} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Idade:</span>
                <span className="text-white">{personalData.age} anos</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Gênero:</span>
                <span className="text-white">{personalData.gender === 'male' ? 'Masculino' : 'Feminino'}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-white">Recomendações</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">Beba pelo menos 2L de água por dia</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">Faça pelo menos 150min de exercício por semana</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-gray-300">Durma 7-9 horas por noite</span>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">Monitore seu progresso semanalmente</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};