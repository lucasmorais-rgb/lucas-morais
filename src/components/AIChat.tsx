import React, { useState } from 'react';
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
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      content: `${t('aiGreeting')} ${personalData.name}! ${t('aiIntroduction')}`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const canSendMessage = userSubscription.isUnlimited || userSubscription.coins > 0;

  const predefinedAnswers: { [key: string]: string } = {
    'tapioca': 'A tapioca é uma excelente opção! É rica em carboidratos complexos e tem baixo índice glicêmico. À noite, se seu objetivo é perder gordura, consuma com moderação (1 tapioca pequena) e combine com proteína magra como queijo cottage ou peito de peru.',
    'shake': 'Receita de shake caseiro para ganho de massa:\n\n🥤 Shake Proteico:\n• 1 banana\n• 200ml de leite\n• 1 scoop de whey protein\n• 1 colher de aveia\n• 1 colher de pasta de amendoim\n• Gelo a gosto\n\nBata tudo no liquidificador. Rende ~400 kcal e 35g de proteína!',
    'água': 'A hidratação é fundamental! Recomendo:\n\n💧 Quantidade diária: 35ml por kg de peso corporal\n💧 Para você: aproximadamente 2,5-3L por dia\n💧 Beba 1 copo ao acordar\n💧 1 copo antes de cada refeição\n💧 Aumente a ingestão durante exercícios',
    'carboidrato': 'Os carboidratos são essenciais! Para seu objetivo:\n\n✅ Melhores fontes:\n• Aveia, quinoa, batata doce\n• Arroz integral, banana\n• Frutas em geral\n\n⏰ Timing ideal:\n• Manhã: carboidratos complexos\n• Pré-treino: carboidratos simples\n• Pós-treino: carboidratos + proteína',
    'proteína': 'Protein intake para seu objetivo:\n\n🥩 Recomendação: 1,6-2,2g por kg de peso\n🥩 Para você: ~150-200g por dia\n\n✅ Melhores fontes:\n• Peito de frango, peixe, ovos\n• Whey protein, caseína\n• Feijões, lentilha, quinoa\n\n⏰ Distribua ao longo do dia em 4-6 refeições'
  };

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Check for keywords in predefined answers
    for (const [keyword, answer] of Object.entries(predefinedAnswers)) {
      if (message.includes(keyword)) {
        return answer;
      }
    }
    
    // Default responses based on goal
    if (message.includes('perder peso') || message.includes('emagrecer')) {
      return `Para perder peso de forma saudável, ${personalData.name}, recomendo:\n\n🔥 Déficit calórico moderado (300-500 kcal)\n🔥 Priorize proteínas magras\n🔥 Inclua fibras em todas as refeições\n🔥 Mantenha-se hidratado\n🔥 Pratique exercícios regularmente\n\nLembre-se: a consistência é mais importante que a perfeição!`;
    }
    
    if (message.includes('ganhar massa') || message.includes('músculo')) {
      return `Para ganhar massa muscular, ${personalData.name}:\n\n💪 Superávit calórico controlado (+300 kcal)\n💪 Proteína: 2g por kg de peso\n💪 Carboidratos no pré e pós-treino\n💪 Treine com pesos regularmente\n💪 Durma 7-9 horas por noite\n\nPaciência e consistência são fundamentais!`;
    }
    
    if (message.includes('quando comer') || message.includes('horário')) {
      return `Timing nutricional otimizado:\n\n🌅 Café da manhã: 30min após acordar\n🌞 Almoço: 4-5h após café da manhã\n🌆 Lanche: 3-4h após almoço\n🌙 Jantar: 3-4h antes de dormir\n\n💡 Dica: Mantenha intervalos regulares entre as refeições para estabilizar o metabolismo!`;
    }
    
    // Generic helpful response
    return `Ótima pergunta, ${personalData.name}! Com base no seu objetivo de ${personalData.goal === 'lose_weight' ? 'perder peso' : personalData.goal === 'gain_muscle' ? 'ganhar massa muscular' : 'manter o peso'}, posso te dar orientações mais específicas.\n\nPoderia me dar mais detalhes sobre sua dúvida? Por exemplo:\n• Sobre que alimento específico?\n• Em que horário do dia?\n• Contexto da sua rotina?\n\nAssim posso te ajudar melhor! 😊`;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !canSendMessage) return;

    // Deduzir moeda se não for premium
    if (!userSubscription.isUnlimited) {
      onSubscriptionUpdate({
        ...userSubscription,
        coins: Math.max(0, userSubscription.coins - 1)
      });
    }

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
    "Quanta proteína preciso por dia?"
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
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <Lock className="w-6 h-6 text-red-400" />
              <div className="min-w-0 flex-1">
                <p className="text-red-300 font-medium">Suas moedas acabaram!</p>
                <p className="text-red-400 text-sm">
                  Faça upgrade para o Premium e tenha conversas ilimitadas com a IA
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="flex flex-col sm:flex-row gap-3">
          {!userSubscription.isUnlimited && (
            <div className="flex items-center justify-center sm:justify-start gap-2 px-3 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-xl">
              <Coins className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-300 text-sm font-medium">{userSubscription.coins}</span>
            </div>
          )}
          <div className="flex gap-3 flex-1">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={canSendMessage ? "Digite sua pergunta sobre nutrição..." : "Sem moedas disponíveis..."}
              disabled={!canSendMessage}
              className={`flex-1 px-4 py-3 border rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all text-base ${
                canSendMessage 
                  ? 'bg-white/10 border-white/20 focus:ring-2 focus:ring-purple-400' 
                  : 'bg-gray-700 border-gray-600 cursor-not-allowed'
              }`}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping || !canSendMessage}
              className={`px-4 py-3 rounded-xl text-white font-medium transition-all ${
                canSendMessage && inputMessage.trim() && !isTyping
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
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