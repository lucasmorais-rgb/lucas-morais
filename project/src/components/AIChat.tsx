import React, { useState, useEffect } from 'react';
import { PersonalData, UserSubscription } from '../types/PersonalData';
import { useLanguage } from '../contexts/LanguageContext';
import { MessageSquare, Send, Bot, User, Sparkles, Coins, Lock } from 'lucide-react';

interface AIChatProps {
  personalData: PersonalData;
  userSubscription: UserSubscription;
  onSubscriptionUpdate: (subscription: UserSubscription) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export const AIChat: React.FC<AIChatProps> = ({ personalData, userSubscription, onSubscriptionUpdate }) => {
  const { t } = useLanguage();
  
  // Gerar mensagem inicial personalizada baseada nos dados do usuário
  const getInitialMessage = (): Message => ({
    id: '1',
    sender: 'ai',
    content: `${t('aiGreeting')} ${personalData.name}! ${t('aiIntroduction')}`,
    timestamp: new Date()
  });
  
  const [messages, setMessages] = useState<Message[]>(() => [
    getInitialMessage()
  ]);
  
  // Atualizar mensagem inicial quando dados do usuário mudarem
  React.useEffect(() => {
    setMessages([getInitialMessage()]);
  }, [personalData.name, t]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Respostas personalizadas baseadas nos dados do usuário
  const getPersonalizedResponses = (): { [key: string]: string } => {
    const goalText = personalData.goal === 'lose_weight' ? 'perder peso' : 
                    personalData.goal === 'gain_muscle' ? 'ganhar massa muscular' : 
                    personalData.goal === 'lose_fat_maintain_muscle' ? 'definir o corpo' : 'manter o peso';
    
    return {
      'tapioca': `A tapioca é uma excelente opção para seu objetivo de ${goalText}! É rica em carboidratos complexos e tem baixo índice glicêmico. ${personalData.goal === 'lose_weight' ? 'À noite, consuma com moderação (1 tapioca pequena) e combine com proteína magra.' : 'Pode consumir normalmente, especialmente no pré-treino.'}`,
      
      'shake': `Receita de shake personalizada para ${goalText}:\n\n🥤 Shake para ${personalData.name}:\n• 1 banana\n• ${personalData.goal === 'gain_muscle' ? '300ml' : '200ml'} de leite\n• 1 scoop de whey protein\n• ${personalData.goal === 'gain_muscle' ? '2 colheres' : '1 colher'} de aveia\n• ${personalData.goal === 'gain_muscle' ? '1 colher de pasta de amendoim' : '1/2 colher de pasta de amendoim'}\n• Gelo a gosto\n\nBata tudo no liquidificador. ${personalData.goal === 'gain_muscle' ? 'Rende ~500 kcal e 40g de proteína!' : 'Rende ~350 kcal e 30g de proteína!'}`,
      
      'água': `A hidratação é fundamental para ${goalText}! Recomendo:\n\n💧 Para você (${personalData.weight}kg): aproximadamente ${Math.round(personalData.weight * 35 / 1000 * 10) / 10}L por dia\n💧 Beba 1 copo ao acordar\n💧 1 copo antes de cada refeição\n💧 Aumente durante exercícios\n💧 ${personalData.goal === 'lose_weight' ? 'Água ajuda na saciedade e acelera o metabolismo' : 'Essencial para síntese proteica e recuperação'}`,
      
      'carboidrato': `Os carboidratos são essenciais para ${goalText}! Para seu objetivo:\n\n✅ Melhores fontes:\n• Aveia, quinoa, batata doce\n• Arroz integral, banana\n• Frutas em geral\n\n⏰ Timing ideal para você:\n• Manhã: carboidratos complexos\n• ${personalData.goal === 'lose_weight' ? 'Evite à noite' : 'Pré-treino: carboidratos simples'}\n• ${personalData.goal !== 'lose_weight' ? 'Pós-treino: carboidratos + proteína' : 'Prefira vegetais à noite'}`,
      
      'proteína': `Proteína para ${goalText}:\n\n🥩 Recomendação para você: ${personalData.goal === 'gain_muscle' ? '2,2g' : personalData.goal === 'lose_weight' ? '1,8g' : '2,0g'} por kg\n🥩 Para seus ${personalData.weight}kg: ~${Math.round(personalData.weight * (personalData.goal === 'gain_muscle' ? 2.2 : personalData.goal === 'lose_weight' ? 1.8 : 2.0))}g por dia\n\n✅ Melhores fontes:\n• Peito de frango, peixe, ovos\n• Whey protein, caseína\n• ${personalData.goal === 'lose_weight' ? 'Queijo cottage, iogurte grego' : 'Carne vermelha magra, feijões'}\n\n⏰ Distribua em ${personalData.goal === 'gain_muscle' ? '5-6' : '4-5'} refeições`,
      
      // Treinos por grupo muscular
      'peito': `Treino de PEITO personalizado para ${goalText}:\n\n💪 Exercícios principais:\n• Supino reto (3x8-12)\n• Supino inclinado (3x8-12)\n• Crucifixo (3x10-15)\n• Flexão de braço (3x máximo)\n• Supino declinado (3x8-12)\n\n⚡ Dicas importantes:\n• ${personalData.goal === 'gain_muscle' ? 'Use cargas pesadas, 6-8 reps' : 'Foque na execução, 12-15 reps'}\n• Descanse 2-3 minutos entre séries\n• Treine peito 2x por semana\n• ${personalData.goal === 'lose_weight' ? 'Combine com cardio pós-treino' : 'Priorize a sobrecarga progressiva'}`,
      
      'costas': `Treino de COSTAS personalizado para ${goalText}:\n\n💪 Exercícios principais:\n• Barra fixa (3x máximo)\n• Remada curvada (3x8-12)\n• Puxada frontal (3x8-12)\n• Remada unilateral (3x10 cada)\n• Levantamento terra (3x6-8)\n\n⚡ Dicas importantes:\n• ${personalData.goal === 'gain_muscle' ? 'Foque em cargas pesadas' : 'Priorize a amplitude de movimento'}\n• Aperte as escápulas em cada rep\n• Mantenha o core contraído\n• ${personalData.goal === 'lose_weight' ? 'Use drop sets para queimar mais calorias' : 'Aumente a carga gradualmente'}`,
      
      'pernas': `Treino de PERNAS personalizado para ${goalText}:\n\n💪 Exercícios principais:\n• Agachamento (4x8-12)\n• Leg press (3x12-15)\n• Stiff (3x10-12)\n• Afundo (3x12 cada perna)\n• Panturrilha (4x15-20)\n\n⚡ Dicas importantes:\n• ${personalData.goal === 'gain_muscle' ? 'Use cargas altas, descanso longo' : 'Mantenha ritmo acelerado'}\n• Desça até 90° no agachamento\n• Treine pernas 2x por semana\n• ${personalData.goal === 'lose_weight' ? 'Pernas queimam muitas calorias!' : 'Pernas são a base da força'}`,
      
      'braços': `Treino de BRAÇOS personalizado para ${goalText}:\n\n💪 Bíceps:\n• Rosca direta (3x10-12)\n• Rosca martelo (3x10-12)\n• Rosca concentrada (3x12-15)\n\n💪 Tríceps:\n• Tríceps testa (3x10-12)\n• Mergulho (3x máximo)\n• Tríceps corda (3x12-15)\n\n⚡ Dicas importantes:\n• ${personalData.goal === 'gain_muscle' ? 'Foque na conexão mente-músculo' : 'Use superseries para intensidade'}\n• Amplitude completa de movimento\n• ${personalData.goal === 'lose_weight' ? 'Combine bíceps + tríceps' : 'Priorize exercícios compostos'}`,
      
      'ombros': `Treino de OMBROS personalizado para ${goalText}:\n\n💪 Exercícios principais:\n• Desenvolvimento militar (3x8-12)\n• Elevação lateral (3x12-15)\n• Elevação frontal (3x10-12)\n• Crucifixo inverso (3x12-15)\n• Encolhimento (3x12-15)\n\n⚡ Dicas importantes:\n• ${personalData.goal === 'gain_muscle' ? 'Varie os ângulos de trabalho' : 'Foque na resistência muscular'}\n• Cuidado com a postura\n• Aqueça bem antes do treino\n• ${personalData.goal === 'lose_weight' ? 'Use circuitos para cardio' : 'Trabalhe os 3 feixes do deltóide'}`,
      
      'abdômen': `Treino de ABDÔMEN personalizado para ${goalText}:\n\n💪 Exercícios principais:\n• Prancha (3x30-60s)\n• Abdominal supra (3x15-20)\n• Bicicleta (3x20 cada lado)\n• Prancha lateral (3x20s cada)\n• Mountain climber (3x30s)\n\n⚡ Dicas importantes:\n• ${personalData.goal === 'lose_weight' ? 'Combine com cardio intenso' : 'Foque na qualidade, não quantidade'}\n• Respire corretamente\n• Treine abdômen 3-4x por semana\n• ${personalData.goal === 'lose_weight' ? 'Lembre-se: abdômen se faz na cozinha!' : 'Varie os exercícios constantemente'}`,
      
      'cardio': `Cardio personalizado para ${goalText}:\n\n🏃‍♂️ Para seu objetivo:\n${personalData.goal === 'lose_weight' ? 
        '• HIIT: 20-30min, 3-4x/semana\n• Caminhada: 45-60min, diário\n• Corrida: 30-40min, 3x/semana' : 
        personalData.goal === 'gain_muscle' ? 
        '• Cardio leve: 15-20min pós-treino\n• Caminhada: 30min, 2-3x/semana\n• Evite cardio excessivo' :
        '• Cardio moderado: 30min, 3x/semana\n• HIIT: 20min, 2x/semana\n• Atividades que goste'}\n\n⚡ Dicas importantes:\n• ${personalData.goal === 'lose_weight' ? 'Cardio em jejum potencializa queima' : 'Cardio após musculação'}\n• Monitore frequência cardíaca\n• ${personalData.goal === 'gain_muscle' ? 'Não exagere no cardio' : 'Varie os tipos de cardio'}`
    };
  };

  const canSendMessage = userSubscription.hasAccess;


  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    const personalizedAnswers = getPersonalizedResponses();
    
    // Check for keywords in predefined answers
    for (const [keyword, answer] of Object.entries(personalizedAnswers)) {
      if (message.includes(keyword)) {
        return answer;
      }
    }
    
    // Treino keywords
    if (message.includes('treino') || message.includes('exercício') || message.includes('musculação')) {
      if (message.includes('peito') || message.includes('peitoral')) {
        return personalizedAnswers['peito'];
      }
      if (message.includes('costas') || message.includes('dorsal')) {
        return personalizedAnswers['costas'];
      }
      if (message.includes('pernas') || message.includes('quadríceps') || message.includes('glúteo')) {
        return personalizedAnswers['pernas'];
      }
      if (message.includes('braços') || message.includes('bíceps') || message.includes('tríceps')) {
        return personalizedAnswers['braços'];
      }
      if (message.includes('ombros') || message.includes('deltóide')) {
        return personalizedAnswers['ombros'];
      }
      if (message.includes('abdômen') || message.includes('abdominal') || message.includes('core')) {
        return personalizedAnswers['abdômen'];
      }
      if (message.includes('cardio') || message.includes('aeróbico') || message.includes('corrida') || message.includes('caminhada')) {
        return personalizedAnswers['cardio'];
      }
      
      // Treino geral
      return `Treino personalizado para ${personalData.name} (${personalData.goal === 'lose_weight' ? 'perder peso' : personalData.goal === 'gain_muscle' ? 'ganhar massa' : personalData.goal === 'lose_fat_maintain_muscle' ? 'definir o corpo' : 'manter o peso'}):\n\n💪 Divisão recomendada:\n• ${personalData.activityLevel === 'sedentary' ? 'Treino ABC (3x/semana)' : personalData.activityLevel === 'very_active' ? 'Treino ABCDE (5x/semana)' : 'Treino ABCD (4x/semana)'}\n• A: Peito + Tríceps\n• B: Costas + Bíceps\n• C: Pernas + Glúteos\n• D: Ombros + Abdômen\n\n⚡ Dicas gerais:\n• ${personalData.goal === 'lose_weight' ? 'Combine com cardio 4x/semana' : personalData.goal === 'gain_muscle' ? 'Foque em cargas pesadas' : 'Balance força e resistência'}\n• Descanse 48h entre treinos do mesmo grupo\n• Hidrate-se bem durante o treino\n\nQuer dicas específicas para algum grupo muscular?`;
    }
    
    // Default responses based on goal
    if (message.includes('perder peso') || message.includes('emagrecer')) {
      return `Para perder peso de forma saudável, ${personalData.name}, baseado no seu perfil (${personalData.age} anos, ${personalData.weight}kg):\n\n🔥 Déficit calórico moderado (300-500 kcal)\n🔥 Meta: ${Math.round(personalData.weight * 1.8)}g de proteína/dia\n🔥 Inclua fibras em todas as refeições\n🔥 Beba ${Math.round(personalData.weight * 35 / 1000 * 10) / 10}L de água/dia\n🔥 ${personalData.activityLevel === 'sedentary' ? 'Comece com caminhadas de 30min' : 'Mantenha sua rotina de exercícios'}\n\nLembre-se: a consistência é mais importante que a perfeição!`;
    }
    
    if (message.includes('ganhar massa') || message.includes('músculo')) {
      return `Para ganhar massa muscular, ${personalData.name} (${personalData.weight}kg):\n\n💪 Superávit calórico controlado (+300-500 kcal)\n💪 Meta: ${Math.round(personalData.weight * 2.2)}g de proteína/dia\n💪 Carboidratos: ${Math.round(personalData.weight * 4)}g/dia\n💪 ${personalData.activityLevel === 'sedentary' ? 'Inicie treino de força 3x/semana' : 'Mantenha treino intenso'}\n💪 Durma 7-9 horas por noite\n\nPaciência e consistência são fundamentais!`;
    }
    
    if (message.includes('quando comer') || message.includes('horário')) {
      return `Timing nutricional otimizado para ${personalData.name}:\n\n🌅 Café da manhã: 30min após acordar\n🌞 Almoço: 4-5h após café da manhã\n🌆 Lanche: 3-4h após almoço\n🌙 Jantar: 3-4h antes de dormir\n\n💡 Para seu objetivo de ${personalData.goal === 'lose_weight' ? 'perder peso' : personalData.goal === 'gain_muscle' ? 'ganhar massa' : 'definir o corpo'}: ${personalData.goal === 'lose_weight' ? 'Evite comer 3h antes de dormir' : 'Inclua um lanche proteico antes de dormir'}`;
    }
    
    // Generic helpful response
    return `Ótima pergunta, ${personalData.name}! Com base no seu perfil (${personalData.age} anos, ${personalData.weight}kg, objetivo: ${personalData.goal === 'lose_weight' ? 'perder peso' : personalData.goal === 'gain_muscle' ? 'ganhar massa muscular' : personalData.goal === 'lose_fat_maintain_muscle' ? 'definir o corpo' : 'manter o peso'}), posso te dar orientações mais específicas.\n\nPoderia me dar mais detalhes sobre sua dúvida? Por exemplo:\n• Sobre que alimento específico?\n• Em que horário do dia?\n• Contexto da sua rotina?\n\nAssim posso te ajudar melhor! 😊`;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !canSendMessage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const quickQuestions = [
    "Posso comer tapioca à noite?",
    "Qual shake caseiro você recomenda?",
    "Quanto de água devo beber?",
    "Quando devo comer carboidratos?",
    "Quanta proteína preciso por dia?",
    "Como treinar peito?",
    "Treino de pernas para iniciante",
    "Melhor cardio para emagrecer"
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-500 rounded-xl">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-white">IA Nutricional Personalizada</h3>
            <p className="text-gray-300 text-sm">Assistente inteligente para suas dúvidas sobre alimentação</p>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Perguntas Rápidas:</h4>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => {
                  if (canSendMessage) {
                    setInputMessage(question);
                    setTimeout(() => handleSendMessage(), 100);
                  }
                }}
                disabled={!canSendMessage}
                className={`px-3 py-2 border rounded-lg text-xs sm:text-sm transition-all ${
                  canSendMessage 
                    ? 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20' 
                    : 'bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed'
                }`}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="bg-white/5 rounded-xl p-3 sm:p-4 h-80 sm:h-96 overflow-y-auto mb-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 sm:gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 sm:gap-3 max-w-[85%] sm:max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`p-2 rounded-xl ${message.sender === 'user' ? 'bg-blue-500' : 'bg-purple-500'}`}>
                  {message.sender === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-white" />
                  )}
                </div>
                <div className={`p-3 sm:p-4 rounded-xl ${message.sender === 'user' ? 'bg-blue-500/20 border border-blue-500/30' : 'bg-purple-500/20 border border-purple-500/30'}`}>
                  <p className="text-white text-sm whitespace-pre-line">{message.content}</p>
                  <p className="text-gray-400 text-xs mt-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-2 sm:gap-3 justify-start">
              <div className="p-2 bg-purple-500 rounded-xl">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="p-3 sm:p-4 bg-purple-500/20 border border-purple-500/30 rounded-xl">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span className="text-gray-300 text-sm">IA está digitando...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* No Coins Warning */}
        {!canSendMessage && (
          <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <Lock className="w-6 h-6 text-purple-400" />
              <div className="min-w-0 flex-1">
                <p className="text-purple-300 font-medium">Acesso completo necessário!</p>
                <p className="text-purple-400 text-sm">
                  Desbloqueie o acesso completo por R$ 27 e tenha conversas ilimitadas com a IA
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex gap-3 flex-1">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={canSendMessage ? "Digite sua pergunta sobre nutrição..." : "Acesso completo necessário..."}
              disabled={!canSendMessage}
              className={`flex-1 px-4 py-3 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all text-base ${
                canSendMessage 
                  ? 'bg-white/10 border-white/20 focus:ring-2 focus:ring-green-400' 
                  : 'bg-gray-700 border-gray-600 cursor-not-allowed'
              }`}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping || !canSendMessage}
              className={`px-4 py-3 rounded-xl text-white font-medium transition-all ${
                canSendMessage && inputMessage.trim() && !isTyping
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
                  : 'bg-gray-600 cursor-not-allowed opacity-50'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};