import React, { useState } from 'react';
import { PersonalData, UserSubscription } from '../types/PersonalData';
import { useLanguage } from '../contexts/LanguageContext';
import { generateConsistentMealPlan, getForbiddenFoods, Meal } from '../utils/mealGenerator';
import { Utensils, Clock, Users, ChefHat, AlertTriangle, Sparkles, Coins, Lock } from 'lucide-react';

interface MealPlanProps {
  personalData: PersonalData;
  userSubscription: UserSubscription;
  onSubscriptionUpdate: (subscription: UserSubscription) => void;
}

export const MealPlan: React.FC<MealPlanProps> = ({ personalData, userSubscription, onSubscriptionUpdate }) => {
  const { t } = useLanguage();
  
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const canViewMealDetails = userSubscription.hasAccess;

  const handleMealClick = (meal: Meal) => {
    if (!canViewMealDetails) return;
    
    setSelectedMeal(meal);
  };



  // Gerar plano de refeições consistente baseado nos dados do usuário
  const meals = generateConsistentMealPlan(personalData);
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);

  // Obter alimentos proibidos baseado no objetivo
  const forbiddenFoods = getForbiddenFoods(personalData.goal);

  const MealCard: React.FC<{ meal: Meal }> = ({ meal }) => (
    <div 
      className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transition-all ${
        canViewMealDetails 
          ? 'hover:bg-white/15 cursor-pointer' 
          : 'opacity-75 cursor-not-allowed'
      }`}
      onClick={() => handleMealClick(meal)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500 rounded-xl">
            <Utensils className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-white truncate">{meal.name}</h3>
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <Clock className="w-4 h-4" />
              <span>{meal.time}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl sm:text-2xl font-bold text-white">{meal.calories}</div>
          <div className="text-gray-300 text-sm">kcal</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-blue-400 font-semibold">{meal.protein}g</div>
          <div className="text-gray-300 text-sm">Proteína</div>
        </div>
        <div className="text-center">
          <div className="text-yellow-400 font-semibold">{meal.carbs}g</div>
          <div className="text-gray-300 text-sm">Carboidratos</div>
        </div>
        <div className="text-center">
          <div className="text-purple-400 font-semibold">{meal.fat}g</div>
          <div className="text-gray-300 text-sm">Gorduras</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-gray-300 text-sm">
          {meal.ingredients.length} ingredientes
        </div>
        <div className={`text-sm font-medium ${canViewMealDetails ? 'text-green-400' : 'text-gray-500'}`}>
          {canViewMealDetails ? 'Ver receita →' : <Lock className="w-4 h-4" />}
        </div>
      </div>
      
      {!canViewMealDetails && (
        <div className="mt-4 p-3 bg-purple-500/20 border border-purple-500/30 rounded-xl">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm">
            </span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Daily Summary */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <ChefHat className="w-6 h-6 text-green-400" />
          <h3 className="text-base sm:text-lg font-semibold text-white">Plano Alimentar Personalizado</h3>
        </div>
        
        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          <div className="text-center">
            <div className="text-xl sm:text-3xl font-bold text-green-400">{totalCalories}</div>
            <div className="text-gray-300 text-sm">Calorias Totais</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-3xl font-bold text-blue-400">4</div>
            <div className="text-gray-300 text-sm">Refeições</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-3xl font-bold text-purple-400">115g</div>
            <div className="text-gray-300 text-sm">Proteínas</div>
          </div>
        </div>
      </div>

      {/* Meals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>

      {/* Forbidden Foods */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-400" />
          <h3 className="text-base sm:text-lg font-semibold text-white">Alimentos a Evitar</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {forbiddenFoods.map((food, index) => (
            <div key={index} className="bg-red-500/20 border border-red-500/30 rounded-xl p-3">
              <span className="text-red-300 text-sm">{food}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Meal Detail Modal */}
      {selectedMeal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-white pr-4">{selectedMeal.name}</h2>
              <button
                onClick={() => setSelectedMeal(null)}
                className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">{selectedMeal.calories}</div>
                <div className="text-gray-300 text-sm">Calorias</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-blue-400">{selectedMeal.protein}g</div>
                <div className="text-gray-300 text-sm">Proteína</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-yellow-400">{selectedMeal.carbs}g</div>
                <div className="text-gray-300 text-sm">Carboidratos</div>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-purple-400">{selectedMeal.fat}g</div>
                <div className="text-gray-300 text-sm">Gorduras</div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-3">Ingredientes</h3>
                <ul className="space-y-2">
                  {selectedMeal.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-3">Modo de Preparo</h3>
                <p className="text-gray-300 leading-relaxed">{selectedMeal.preparation}</p>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-3">Dicas Importantes</h3>
                <ul className="space-y-2">
                  {selectedMeal.tips.map((tip, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <Sparkles className="w-4 h-4 text-yellow-400" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};