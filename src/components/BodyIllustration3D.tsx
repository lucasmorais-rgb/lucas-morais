import React, { useState } from 'react';
import { PersonalData } from '../types/PersonalData';
import { RotateCcw, Maximize2, Minimize2 } from 'lucide-react';

interface BodyIllustration3DProps {
  personalData: PersonalData;
}

export const BodyIllustration3D: React.FC<BodyIllustration3DProps> = ({ personalData }) => {
  const [rotation, setRotation] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Calcular proporções baseadas nos dados do usuário
  const calculateBodyProportions = () => {
    const { height, weight, gender, goal } = personalData;
    
    // BMI para determinar largura do corpo
    const bmi = weight / ((height / 100) ** 2);
    
    // Fator de escala baseado no BMI (18.5-30)
    const bodyWidth = Math.max(0.7, Math.min(1.4, bmi / 22));
    
    // Altura relativa (normalizada)
    const bodyHeight = Math.max(0.8, Math.min(1.2, height / 170));
    
    // Definição muscular baseada no objetivo
    const muscleDef = goal === 'gain_muscle' ? 1.2 : 
                     goal === 'lose_fat_maintain_muscle' ? 1.1 : 1.0;
    
    // Cor da pele baseada no gênero (apenas para diferenciação visual)
    const skinColor = gender === 'male' ? '#D4A574' : '#E8B896';
    
    return {
      bodyWidth,
      bodyHeight,
      muscleDef,
      skinColor,
      bmi
    };
  };

  const { bodyWidth, bodyHeight, muscleDef, skinColor, bmi } = calculateBodyProportions();

  // Determinar status do corpo baseado no BMI
  const getBodyStatus = () => {
    if (bmi < 18.5) return { status: 'Abaixo do peso', color: '#60A5FA' };
    if (bmi < 25) return { status: 'Peso normal', color: '#34D399' };
    if (bmi < 30) return { status: 'Sobrepeso', color: '#FBBF24' };
    return { status: 'Obesidade', color: '#F87171' };
  };

  const bodyStatus = getBodyStatus();

  const resetRotation = () => setRotation(0);

  return (
    <div className={`bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20 transition-all ${
      isExpanded ? 'fixed inset-4 z-50 overflow-auto' : ''
    }`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Visualização 3D do Corpo</h3>
          <p className="text-gray-300 text-sm">Baseado nos seus dados pessoais</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetRotation}
            className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
            title="Resetar rotação"
          >
            <RotateCcw className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-all"
            title={isExpanded ? "Minimizar" : "Expandir"}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4 text-white" /> : <Maximize2 className="w-4 h-4 text-white" />}
          </button>
        </div>
      </div>

      {/* Status do Corpo */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300 text-sm">Status Corporal:</span>
          <span className="font-medium" style={{ color: bodyStatus.color }}>
            {bodyStatus.status}
          </span>
        </div>
        <div className="bg-gray-700 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-1000"
            style={{ 
              width: `${Math.min((bmi / 30) * 100, 100)}%`,
              backgroundColor: bodyStatus.color
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>18.5</span>
          <span>25</span>
          <span>30+</span>
        </div>
      </div>

      {/* Ilustração 3D */}
      <div className={`relative ${isExpanded ? 'h-96' : 'h-64'} flex items-center justify-center`}>
        <div 
          className="relative cursor-grab active:cursor-grabbing"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s ease'
          }}
          onMouseDown={(e) => {
            const startX = e.clientX;
            const startRotation = rotation;
            
            const handleMouseMove = (e: MouseEvent) => {
              const deltaX = e.clientX - startX;
              setRotation(startRotation + deltaX * 0.5);
            };
            
            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
          onTouchStart={(e) => {
            const startX = e.touches[0].clientX;
            const startRotation = rotation;
            
            const handleTouchMove = (e: TouchEvent) => {
              const deltaX = e.touches[0].clientX - startX;
              setRotation(startRotation + deltaX * 0.5);
            };
            
            const handleTouchEnd = () => {
              document.removeEventListener('touchmove', handleTouchMove);
              document.removeEventListener('touchend', handleTouchEnd);
            };
            
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', handleTouchEnd);
          }}
        >
          <svg 
            width={isExpanded ? "200" : "150"} 
            height={isExpanded ? "300" : "220"} 
            viewBox="0 0 100 150" 
            className="drop-shadow-2xl"
          >
            {/* Sombra do corpo */}
            <ellipse 
              cx="50" 
              cy="145" 
              rx={15 * bodyWidth} 
              ry="3" 
              fill="rgba(0,0,0,0.3)"
              style={{
                transform: `rotateX(${Math.abs(Math.sin(rotation * Math.PI / 180)) * 20}deg)`
              }}
            />
            
            {/* Corpo principal */}
            <g style={{ transform: `scale(${bodyHeight}, ${bodyHeight})` }}>
              {/* Cabeça */}
              <circle 
                cx="50" 
                cy="15" 
                r="8" 
                fill={skinColor}
                stroke="rgba(0,0,0,0.1)" 
                strokeWidth="0.5"
              />
              
              {/* Cabelo */}
              <path 
                d={personalData.gender === 'male' 
                  ? "M42 10 Q50 5 58 10 Q58 12 50 12 Q42 12 42 10" 
                  : "M40 8 Q50 3 60 8 Q60 15 50 15 Q40 15 40 8"
                }
                fill="#4A4A4A"
              />
              
              {/* Pescoço */}
              <rect 
                x="47" 
                y="23" 
                width="6" 
                height="8" 
                fill={skinColor}
                rx="3"
              />
              
              {/* Tronco */}
              <ellipse 
                cx="50" 
                cy="55" 
                rx={12 * bodyWidth * muscleDef} 
                ry="25" 
                fill={skinColor}
                stroke="rgba(0,0,0,0.1)" 
                strokeWidth="0.5"
              />
              
              {/* Definição muscular (se aplicável) */}
              {muscleDef > 1.05 && (
                <>
                  {/* Peitoral */}
                  <ellipse cx="45" cy="45" rx="4" ry="6" fill="rgba(0,0,0,0.1)" />
                  <ellipse cx="55" cy="45" rx="4" ry="6" fill="rgba(0,0,0,0.1)" />
                  
                  {/* Abdômen */}
                  <rect x="46" y="55" width="8" height="3" fill="rgba(0,0,0,0.1)" rx="1" />
                  <rect x="46" y="60" width="8" height="3" fill="rgba(0,0,0,0.1)" rx="1" />
                  <rect x="46" y="65" width="8" height="3" fill="rgba(0,0,0,0.1)" rx="1" />
                </>
              )}
              
              {/* Braços */}
              <ellipse 
                cx="30" 
                cy="50" 
                rx={4 * muscleDef} 
                ry="20" 
                fill={skinColor}
                stroke="rgba(0,0,0,0.1)" 
                strokeWidth="0.5"
                transform="rotate(-10 30 50)"
              />
              <ellipse 
                cx="70" 
                cy="50" 
                rx={4 * muscleDef} 
                ry="20" 
                fill={skinColor}
                stroke="rgba(0,0,0,0.1)" 
                strokeWidth="0.5"
                transform="rotate(10 70 50)"
              />
              
              {/* Antebraços */}
              <ellipse 
                cx="25" 
                cy="75" 
                rx="3" 
                ry="15" 
                fill={skinColor}
                stroke="rgba(0,0,0,0.1)" 
                strokeWidth="0.5"
                transform="rotate(-5 25 75)"
              />
              <ellipse 
                cx="75" 
                cy="75" 
                rx="3" 
                ry="15" 
                fill={skinColor}
                stroke="rgba(0,0,0,0.1)" 
                strokeWidth="0.5"
                transform="rotate(5 75 75)"
              />
              
              {/* Mãos */}
              <circle cx="23" cy="88" r="3" fill={skinColor} />
              <circle cx="77" cy="88" r="3" fill={skinColor} />
              
              {/* Quadril */}
              <ellipse 
                cx="50" 
                cy="85" 
                rx={10 * bodyWidth} 
                ry="8" 
                fill={skinColor}
                stroke="rgba(0,0,0,0.1)" 
                strokeWidth="0.5"
              />
              
              {/* Coxas */}
              <ellipse 
                cx="42" 
                cy="110" 
                rx={5 * bodyWidth} 
                ry="20" 
                fill={skinColor}
                stroke="rgba(0,0,0,0.1)" 
                strokeWidth="0.5"
              />
              <ellipse 
                cx="58" 
                cy="110" 
                rx={5 * bodyWidth} 
                ry="20" 
                fill={skinColor}
                stroke="rgba(0,0,0,0.1)" 
                strokeWidth="0.5"
              />
              
              {/* Panturrilhas */}
              <ellipse 
                cx="42" 
                cy="135" 
                rx="3" 
                ry="12" 
                fill={skinColor}
                stroke="rgba(0,0,0,0.1)" 
                strokeWidth="0.5"
              />
              <ellipse 
                cx="58" 
                cy="135" 
                rx="3" 
                ry="12" 
                fill={skinColor}
                stroke="rgba(0,0,0,0.1)" 
                strokeWidth="0.5"
              />
              
              {/* Pés */}
              <ellipse cx="42" cy="148" rx="4" ry="2" fill="#8B4513" />
              <ellipse cx="58" cy="148" rx="4" ry="2" fill="#8B4513" />
            </g>
            
            {/* Indicadores de medidas */}
            <g opacity="0.7">
              {/* Linha de altura */}
              <line x1="85" y1="10" x2="85" y2="145" stroke="#60A5FA" strokeWidth="1" strokeDasharray="2,2" />
              <text x="87" y="80" fill="#60A5FA" fontSize="6" transform="rotate(90 87 80)">
                {personalData.height}cm
              </text>
              
              {/* Linha de peso */}
              <circle cx="15" cy="30" r="8" fill="rgba(34, 197, 94, 0.2)" stroke="#22C55E" strokeWidth="1" />
              <text x="15" y="33" fill="#22C55E" fontSize="5" textAnchor="middle">
                {personalData.weight}kg
              </text>
            </g>
          </svg>
        </div>

        {/* Controles */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="text-center">
            <p className="text-gray-300 text-sm">Arraste para rotacionar</p>
            <p className="text-gray-400 text-xs">ou use os controles</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => setRotation(rotation - 45)}
            className="px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all text-white text-sm"
          >
            ← 45°
          </button>
          <button
            onClick={() => setRotation(rotation + 45)}
            className="px-3 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all text-white text-sm"
          >
            45° →
          </button>
        </div>
      </div>

      {/* Informações do corpo */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-white/5 rounded-xl p-3">
          <div className="text-center">
            <div className="text-lg font-bold text-white">{personalData.height} cm</div>
            <div className="text-gray-300 text-sm">Altura</div>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-xl p-3">
          <div className="text-center">
            <div className="text-lg font-bold text-white">{personalData.weight} kg</div>
            <div className="text-gray-300 text-sm">Peso</div>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-xl p-3">
          <div className="text-center">
            <div className="text-lg font-bold" style={{ color: bodyStatus.color }}>
              {bmi.toFixed(1)}
            </div>
            <div className="text-gray-300 text-sm">IMC</div>
          </div>
        </div>
        
        <div className="bg-white/5 rounded-xl p-3">
          <div className="text-center">
            <div className="text-lg font-bold text-white">
              {personalData.gender === 'male' ? '♂' : '♀'}
            </div>
            <div className="text-gray-300 text-sm">
              {personalData.gender === 'male' ? 'Masculino' : 'Feminino'}
            </div>
          </div>
        </div>
      </div>

      {/* Objetivo atual */}
      <div className="mt-4 p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl border border-purple-500/30">
        <div className="text-center">
          <h4 className="text-white font-medium mb-2">Objetivo Atual</h4>
          <p className="text-purple-300 text-sm">
            {personalData.goal === 'lose_weight' && '🎯 Perder peso de forma saudável'}
            {personalData.goal === 'gain_muscle' && '💪 Ganhar massa muscular'}
            {personalData.goal === 'lose_fat_maintain_muscle' && '🔥 Definir o corpo'}
            {personalData.goal === 'maintain_weight' && '⚖️ Manter peso ideal'}
          </p>
        </div>
      </div>

      {/* Dicas baseadas no corpo */}
      <div className="mt-4 space-y-2">
        <h4 className="text-white font-medium text-sm">💡 Dicas Personalizadas:</h4>
        <div className="space-y-1 text-xs text-gray-300">
          {bmi < 18.5 && (
            <p className="bg-blue-500/20 p-2 rounded">• Foque em ganhar peso saudável com proteínas e carboidratos</p>
          )}
          {bmi >= 18.5 && bmi < 25 && (
            <p className="bg-green-500/20 p-2 rounded">• Você está no peso ideal! Mantenha uma alimentação equilibrada</p>
          )}
          {bmi >= 25 && bmi < 30 && (
            <p className="bg-yellow-500/20 p-2 rounded">• Pequeno déficit calórico e exercícios regulares ajudarão</p>
          )}
          {bmi >= 30 && (
            <p className="bg-red-500/20 p-2 rounded">• Consulte um profissional e foque em mudanças graduais</p>
          )}
          
          {personalData.goal === 'gain_muscle' && (
            <p className="bg-purple-500/20 p-2 rounded">• Priorize treino de força e aumente a ingestão proteica</p>
          )}
          
          {personalData.activityLevel === 'sedentary' && (
            <p className="bg-orange-500/20 p-2 rounded">• Comece com caminhadas de 30min e aumente gradualmente</p>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setIsExpanded(false)}
            className="p-2 bg-black/50 rounded-xl hover:bg-black/70 transition-all text-white"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};