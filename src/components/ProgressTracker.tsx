import React, { useState, useEffect } from 'react';
import { PersonalData } from '../types/PersonalData';
import { useLanguage } from '../contexts/LanguageContext';
import { TrendingUp, Calendar, Award, Target, Plus, Trophy, Flame, Zap, X, Edit3, Trash2, Save, BarChart3, Activity } from 'lucide-react';

interface ProgressTrackerProps {
  personalData: PersonalData;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  unlocked: boolean;
  progress: number;
  target: number;
}

interface MeasurementEntry {
  id: string;
  weight: number;
  bodyFat?: number;
  muscle?: number;
  waist?: number;
  date: string;
  notes?: string;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ personalData }) => {
  const { t } = useLanguage();
  
  const [showAddMeasurement, setShowAddMeasurement] = useState(false);
  const [editingEntry, setEditingEntry] = useState<string | null>(null);
  const [newWeight, setNewWeight] = useState('');
  const [newBodyFat, setNewBodyFat] = useState('');
  const [newMuscle, setNewMuscle] = useState('');
  const [newWaist, setNewWaist] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<'weight' | 'bodyFat' | 'muscle' | 'waist'>('weight');

  // Estado para armazenar medições (em uma aplicação real, isso viria de um banco de dados)
  const [measurements, setMeasurements] = useState<MeasurementEntry[]>([
    {
      id: '1',
      weight: personalData.weight,
      bodyFat: 15,
      muscle: 70,
      waist: 85,
      date: new Date().toISOString(),
      notes: 'Medição inicial'
    }
  ]);

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: 'first-measurement',
      title: 'Primeira Medição',
      description: 'Registre sua primeira medição',
      icon: Calendar,
      color: 'bg-green-500',
      unlocked: measurements.length > 0,
      progress: measurements.length > 0 ? 1 : 0,
      target: 1
    },
    {
      id: 'consistency',
      title: 'Consistência',
      description: 'Registre medições por 7 dias seguidos',
      icon: Target,
      color: 'bg-purple-500',
      unlocked: false,
      progress: Math.min(measurements.length, 7),
      target: 7
    },
    {
      id: 'weight-progress',
      title: 'Progresso de Peso',
      description: 'Alcance uma mudança de 2kg',
      icon: TrendingUp,
      color: 'bg-blue-500',
      unlocked: false,
      progress: 0,
      target: 2
    },
    {
      id: 'champion',
      title: 'Campeão da Transformação',
      description: 'Complete 30 medições',
      icon: Trophy,
      color: 'bg-yellow-500',
      unlocked: false,
      progress: measurements.length,
      target: 30
    }
  ]);

  // Atualizar conquistas quando medições mudarem
  useEffect(() => {
    const firstMeasurement = measurements[0];
    const latestMeasurement = measurements[measurements.length - 1];
    const weightDifference = firstMeasurement && latestMeasurement 
      ? Math.abs(firstMeasurement.weight - latestMeasurement.weight) 
      : 0;

    setAchievements(prev => prev.map(achievement => {
      switch (achievement.id) {
        case 'first-measurement':
          return {
            ...achievement,
            unlocked: measurements.length > 0,
            progress: measurements.length > 0 ? 1 : 0
          };
        case 'consistency':
          return {
            ...achievement,
            unlocked: measurements.length >= 7,
            progress: Math.min(measurements.length, 7)
          };
        case 'weight-progress':
          return {
            ...achievement,
            unlocked: weightDifference >= 2,
            progress: Math.min(weightDifference, 2)
          };
        case 'champion':
          return {
            ...achievement,
            unlocked: measurements.length >= 30,
            progress: measurements.length
          };
        default:
          return achievement;
      }
    }));
  }, [measurements]);

  const currentMeasurement = measurements[measurements.length - 1];
  const firstMeasurement = measurements[0];

  const calculateProgress = () => {
    if (!currentMeasurement || !firstMeasurement) return { weight: 0, bodyFat: 0, muscle: 0, waist: 0 };
    
    return {
      weight: firstMeasurement.weight - currentMeasurement.weight,
      bodyFat: (firstMeasurement.bodyFat || 0) - (currentMeasurement.bodyFat || 0),
      muscle: (currentMeasurement.muscle || 0) - (firstMeasurement.muscle || 0),
      waist: (firstMeasurement.waist || 0) - (currentMeasurement.waist || 0)
    };
  };

  const progress = calculateProgress();

  const handleAddMeasurement = async () => {
    if (!newWeight || parseFloat(newWeight) <= 0) {
      alert('Por favor, insira um peso válido');
      return;
    }

    setIsSubmitting(true);

    try {
      const newEntry: MeasurementEntry = {
        id: Date.now().toString(),
        weight: parseFloat(newWeight),
        bodyFat: newBodyFat ? parseFloat(newBodyFat) : undefined,
        muscle: newMuscle ? parseFloat(newMuscle) : undefined,
        waist: newWaist ? parseFloat(newWaist) : undefined,
        date: new Date().toISOString(),
        notes: newNotes || undefined
      };

      setMeasurements(prev => [...prev, newEntry]);
      
      // Limpar formulário
      setNewWeight('');
      setNewBodyFat('');
      setNewMuscle('');
      setNewWaist('');
      setNewNotes('');
      setShowAddMeasurement(false);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error('Erro ao adicionar medição:', error);
      alert('Erro ao salvar os dados. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditMeasurement = (id: string) => {
    const measurement = measurements.find(m => m.id === id);
    if (measurement) {
      setNewWeight(measurement.weight.toString());
      setNewBodyFat(measurement.bodyFat?.toString() || '');
      setNewMuscle(measurement.muscle?.toString() || '');
      setNewWaist(measurement.waist?.toString() || '');
      setNewNotes(measurement.notes || '');
      setEditingEntry(id);
      setShowAddMeasurement(true);
    }
  };

  const handleUpdateMeasurement = async () => {
    if (!editingEntry || !newWeight) return;

    setIsSubmitting(true);

    try {
      setMeasurements(prev => prev.map(measurement => 
        measurement.id === editingEntry 
          ? {
              ...measurement,
              weight: parseFloat(newWeight),
              bodyFat: newBodyFat ? parseFloat(newBodyFat) : undefined,
              muscle: newMuscle ? parseFloat(newMuscle) : undefined,
              waist: newWaist ? parseFloat(newWaist) : undefined,
              notes: newNotes || undefined
            }
          : measurement
      ));

      setNewWeight('');
      setNewBodyFat('');
      setNewMuscle('');
      setNewWaist('');
      setNewNotes('');
      setEditingEntry(null);
      setShowAddMeasurement(false);

      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Erro ao atualizar medição:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMeasurement = (id: string) => {
    if (measurements.length <= 1) {
      alert('Você deve manter pelo menos uma medição');
      return;
    }
    
    if (confirm('Tem certeza que deseja excluir esta medição?')) {
      setMeasurements(prev => prev.filter(m => m.id !== id));
    }
  };

  const getMetricData = () => {
    return measurements.map(m => ({
      date: new Date(m.date).toLocaleDateString('pt-BR'),
      value: selectedMetric === 'weight' ? m.weight :
             selectedMetric === 'bodyFat' ? m.bodyFat :
             selectedMetric === 'muscle' ? m.muscle :
             m.waist
    })).filter(item => item.value !== undefined);
  };

  const getMetricUnit = () => {
    switch (selectedMetric) {
      case 'weight': return 'kg';
      case 'bodyFat': return '%';
      case 'muscle': return 'kg';
      case 'waist': return 'cm';
    }
  };

  const getMetricLabel = () => {
    switch (selectedMetric) {
      case 'weight': return 'Peso';
      case 'bodyFat': return 'Gordura Corporal';
      case 'muscle': return 'Massa Muscular';
      case 'waist': return 'Cintura';
    }
  };

  const AchievementCard: React.FC<{ achievement: Achievement }> = ({ achievement }) => {
    const Icon = achievement.icon;
    const progressPercentage = Math.min((achievement.progress / achievement.target) * 100, 100);

    return (
      <div className={`bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 transition-all hover:bg-white/15 ${achievement.unlocked ? 'ring-2 ring-green-400/50' : ''}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className={`p-3 rounded-xl ${achievement.color} ${achievement.unlocked ? 'animate-pulse' : ''}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">{achievement.title}</h3>
            <p className="text-gray-300 text-sm">{achievement.description}</p>
          </div>
          {achievement.unlocked && (
            <div className="text-green-400 animate-bounce">
              <Award className="w-6 h-6" />
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm">Progresso</span>
            <span className="text-white font-medium">{achievement.progress.toFixed(1)}/{achievement.target}</span>
          </div>
          <div className="bg-gray-700 h-3 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${achievement.color} ${achievement.unlocked ? 'animate-pulse' : ''}`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Current Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500 rounded-xl">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-white">Peso Atual</h3>
              <p className="text-gray-300 text-sm">Última medição</p>
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white">{currentMeasurement?.weight.toFixed(1) || '--'} kg</div>
          <div className={`text-sm ${progress.weight >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {progress.weight >= 0 ? '-' : '+'}{Math.abs(progress.weight).toFixed(1)}kg desde o início
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500 rounded-xl">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-white">Gordura Corporal</h3>
              <p className="text-gray-300 text-sm">Opcional</p>
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white">
            {currentMeasurement?.bodyFat?.toFixed(1) || '--'}%
          </div>
          <div className="text-green-400 text-sm">
            {progress.bodyFat > 0 ? `-${progress.bodyFat.toFixed(1)}%` : 'Não informado'}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500 rounded-xl">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-white">Massa Muscular</h3>
              <p className="text-gray-300 text-sm">Opcional</p>
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white">
            {currentMeasurement?.muscle?.toFixed(1) || '--'} kg
          </div>
          <div className="text-green-400 text-sm">
            {progress.muscle > 0 ? `+${progress.muscle.toFixed(1)}kg` : 'Não informado'}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-yellow-500 rounded-xl">
              <Target className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-semibold text-white">Medida Cintura</h3>
              <p className="text-gray-300 text-sm">Opcional</p>
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold text-white">
            {currentMeasurement?.waist || '--'} cm
          </div>
          <div className="text-green-400 text-sm">
            {progress.waist > 0 ? `-${progress.waist}cm` : 'Não informado'}
          </div>
        </div>
      </div>

      {/* Interactive Chart */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-green-400" />
            <h3 className="text-base sm:text-lg font-semibold text-white">Evolução das Medições</h3>
          </div>
          <button
            onClick={() => {
              setEditingEntry(null);
              setNewWeight('');
              setNewBodyFat('');
              setNewMuscle('');
              setNewWaist('');
              setNewNotes('');
              setShowAddMeasurement(true);
            }}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl text-white hover:from-green-500 hover:to-blue-500 transition-all transform hover:scale-105 text-sm sm:text-base"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Nova Medição</span>
            <span className="sm:hidden">Nova</span>
          </button>
        </div>

        {/* Metric Selector */}
        <div className="flex gap-1 sm:gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { key: 'weight', label: 'Peso', icon: TrendingUp },
            { key: 'bodyFat', label: 'Gordura', icon: Flame },
            { key: 'muscle', label: 'Músculo', icon: Zap },
            { key: 'waist', label: 'Cintura', icon: Target }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSelectedMetric(key as any)}
              className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl transition-all whitespace-nowrap text-sm ${
                selectedMetric === key
                  ? 'bg-gradient-to-r from-green-400 to-blue-400 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Measurements List */}
        <div className="space-y-3 max-h-80 sm:max-h-96 overflow-y-auto">
          <h4 className="text-white font-medium mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            {getMetricLabel()} ({getMetricUnit()})
          </h4>
          
          {measurements.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">Nenhuma medição registrada ainda</p>
              <p className="text-gray-500 text-sm">Adicione sua primeira medição para começar</p>
            </div>
          ) : (
            getMetricData().map((data, index) => {
              const measurement = measurements[index];
              return (
                <div key={measurement.id} className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all group">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium">
                        {data.value?.toFixed(1)} {getMetricUnit()}
                      </span>
                      <span className="text-gray-400 text-sm">{data.date}</span>
                    </div>
                    {measurement.notes && (
                      <p className="text-gray-400 text-sm mt-1">{measurement.notes}</p>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button
                      onClick={() => handleEditMeasurement(measurement.id)}
                      className="p-2 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg transition-all"
                    >
                      <Edit3 className="w-4 h-4 text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleDeleteMeasurement(measurement.id)}
                      className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h3 className="text-base sm:text-lg font-semibold text-white">Conquistas</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {achievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>
      </div>

      {/* Add/Edit Measurement Modal */}
      {showAddMeasurement && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-slate-900 rounded-2xl p-4 sm:p-6 max-w-lg w-full border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {editingEntry ? 'Editar Medição' : 'Nova Medição'}
              </h2>
              <button
                onClick={() => {
                  setShowAddMeasurement(false);
                  setEditingEntry(null);
                }}
                className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Peso (kg) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="30"
                  max="300"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all text-base"
                  placeholder="Ex: 70.5"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Gordura Corporal (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="5"
                    max="50"
                    value={newBodyFat}
                    onChange={(e) => setNewBodyFat(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all text-base"
                    placeholder="Ex: 15.5"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Massa Muscular (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="20"
                    max="150"
                    value={newMuscle}
                    onChange={(e) => setNewMuscle(e.target.value)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all text-base"
                    placeholder="Ex: 70.2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Medida da Cintura (cm)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="50"
                  max="150"
                  value={newWaist}
                  onChange={(e) => setNewWaist(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all text-base"
                  placeholder="Ex: 85"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Observações
                </label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all resize-none text-base"
                  placeholder="Ex: Medição após treino, manhã em jejum..."
                  rows={3}
                />
              </div>

              <div className="bg-blue-500/20 border border-blue-500/30 rounded-xl p-4">
                <h4 className="text-blue-300 font-medium mb-2">💡 Dicas para medições precisas:</h4>
                <ul className="text-blue-300 text-sm space-y-1">
                  <li>• Meça-se sempre no mesmo horário</li>
                  <li>• Preferencialmente pela manhã em jejum</li>
                  <li>• Use a mesma balança sempre</li>
                  <li>• Para cintura, meça na altura do umbigo</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowAddMeasurement(false);
                    setEditingEntry(null);
                  }}
                  disabled={isSubmitting}
                  className="order-2 sm:order-1 flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all disabled:opacity-50 text-base"
                >
                  Cancelar
                </button>
                <button
                  onClick={editingEntry ? handleUpdateMeasurement : handleAddMeasurement}
                  disabled={!newWeight || isSubmitting}
                  className="order-1 sm:order-2 flex-1 px-4 py-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-xl text-white hover:from-green-500 hover:to-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      {editingEntry ? 'Atualizando...' : 'Salvando...'}
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      {editingEntry ? 'Atualizar' : 'Salvar Medição'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};