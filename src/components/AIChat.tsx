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

  const canSendMessage = userSubscription.hasAccess;

  // IA NUTRICIONAL AVANÇADA - Sistema de resposta inteligente
  const generateAdvancedAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    const goalText = personalData.goal === 'lose_weight' ? 'perder peso' : 
                    personalData.goal === 'gain_muscle' ? 'ganhar massa muscular' : 
                    personalData.goal === 'lose_fat_maintain_muscle' ? 'definir o corpo' : 'manter o peso';

    // SISTEMA DE ANÁLISE INTELIGENTE DE PERGUNTAS
    
    // 1. DOCES E SOBREMESAS
    if (message.includes('doce') || message.includes('sobremesa') || message.includes('açúcar') || 
        message.includes('chocolate') || message.includes('bolo') || message.includes('sorvete') ||
        message.includes('pudim') || message.includes('brigadeiro') || message.includes('torta')) {
      
      if (message.includes('depois do almoço') || message.includes('após almoço') || message.includes('pós almoço')) {
        return `${personalData.name}, sobre comer doce depois do almoço para seu objetivo de ${goalText}:\n\n🍰 **RESPOSTA DIRETA:** ${personalData.goal === 'lose_weight' ? 'EVITE doces após o almoço' : 'PODE consumir com moderação'}\n\n📋 **EXPLICAÇÃO DETALHADA:**\n${personalData.goal === 'lose_weight' ? 
          '• Após o almoço seu corpo já processou carboidratos\n• Doces causam pico de insulina desnecessário\n• Pode atrapalhar a queima de gordura\n• Se quiser doce, prefira pela manhã' : 
          '• Após o almoço é um momento aceitável\n• Seu corpo pode processar o açúcar melhor\n• Mantenha porções pequenas (1-2 quadradinhos chocolate)\n• Prefira doces com menos açúcar'}\n\n✅ **ALTERNATIVAS SAUDÁVEIS:**\n• Frutas doces (manga, uva, banana)\n• Iogurte grego com mel\n• Quadradinho de chocolate 70% cacau\n• Pudim de chia com frutas\n\n💡 **DICA ESPECIAL:** ${personalData.goal === 'lose_weight' ? 'Se a vontade for muito forte, coma 1 quadradinho de chocolate amargo e beba água' : 'Combine o doce com uma caminhada de 10 minutos para ajudar na digestão'}`;
      }
      
      if (message.includes('à noite') || message.includes('noite') || message.includes('antes de dormir')) {
        return `${personalData.name}, sobre doces à noite para ${goalText}:\n\n🌙 **RESPOSTA:** ${personalData.goal === 'lose_weight' ? 'EVITE TOTALMENTE' : 'APENAS EM OCASIÕES ESPECIAIS'}\n\n🧠 **POR QUE EVITAR À NOITE:**\n• Metabolismo mais lento\n• Insulina alta atrapalha o sono\n• Corpo armazena mais gordura\n• Pode causar insônia\n\n🍎 **SUBSTITUTOS NOTURNOS:**\n• Chá de camomila com mel\n• Iogurte natural com canela\n• Frutas vermelhas\n• Castanhas (5-6 unidades)\n\n💤 **PARA DORMIR MELHOR:**\n• Pare de comer 3h antes de dormir\n• Se tiver fome, tome chá ou água\n• Escove os dentes após o jantar (truque psicológico!)`;
      }
      
      return `${personalData.name}, sobre doces para ${goalText}:\n\n🍭 **REGRA GERAL:** ${personalData.goal === 'lose_weight' ? 'Máximo 1x por semana, pequenas porções' : 'Pode consumir com moderação, 3-4x por semana'}\n\n⏰ **MELHOR HORÁRIO:**\n• Manhã: Metabolismo mais ativo\n• Pré-treino: Energia rápida\n• ${personalData.goal === 'lose_weight' ? 'EVITE: Tarde e noite' : 'Pós-treino: Ajuda na recuperação'}\n\n🎯 **DOCES MAIS SAUDÁVEIS:**\n• Chocolate 70% cacau ou mais\n• Frutas secas sem açúcar\n• Doces caseiros com adoçante natural\n• Frozen yogurt\n\n⚖️ **ESTRATÉGIA INTELIGENTE:**\n• ${personalData.goal === 'lose_weight' ? 'Se comer doce, reduza carboidratos na próxima refeição' : 'Combine com exercício no mesmo dia'}\n• Beba muita água depois\n• Não se culpe, apenas volte ao foco!`;
    }

    // 2. HORÁRIOS DE ALIMENTAÇÃO
    if (message.includes('quando comer') || message.includes('que horas') || message.includes('horário') ||
        message.includes('manhã') || message.includes('tarde') || message.includes('noite') ||
        message.includes('antes do treino') || message.includes('depois do treino')) {
      
      if (message.includes('antes do treino') || message.includes('pré treino') || message.includes('pré-treino')) {
        return `${personalData.name}, alimentação PRÉ-TREINO para ${goalText}:\n\n⏰ **TIMING IDEAL:** 30-60 minutos antes\n\n🥗 **O QUE COMER:**\n• Banana + aveia (carboidrato rápido)\n• Pão integral + mel\n• Tapioca pequena + queijo\n• ${personalData.goal === 'gain_muscle' ? 'Shake com whey + banana' : 'Fruta + castanhas (3-4 unidades)'}\n\n💧 **HIDRATAÇÃO:**\n• 300-500ml de água\n• ${personalData.goal === 'lose_weight' ? 'Café sem açúcar (acelera metabolismo)' : 'Água de coco (eletrólitos naturais)'}\n\n❌ **EVITE:**\n• Alimentos gordurosos\n• Muita fibra\n• Grandes quantidades\n• Leite (pode causar desconforto)\n\n🎯 **OBJETIVO:** Energia rápida sem desconforto gástrico!`;
      }
      
      if (message.includes('depois do treino') || message.includes('pós treino') || message.includes('pós-treino')) {
        return `${personalData.name}, alimentação PÓS-TREINO para ${goalText}:\n\n⏰ **JANELA ANABÓLICA:** Até 2 horas após o treino\n\n🥤 **OPÇÃO 1 - SHAKE RÁPIDO:**\n• ${personalData.goal === 'gain_muscle' ? '1 scoop whey + 1 banana + 300ml leite' : '1 scoop whey + 200ml água + 1/2 banana'}\n• ${personalData.goal === 'gain_muscle' ? '+ 1 colher de aveia' : '+ 1 colher de chia'}\n\n🍽️ **OPÇÃO 2 - REFEIÇÃO SÓLIDA:**\n• ${personalData.goal === 'gain_muscle' ? '150g frango + 1 xícara arroz + legumes' : '120g frango + 1/2 xícara arroz + salada'}\n• Hidratação: 500ml água\n\n🎯 **PROPORÇÃO IDEAL:**\n• Proteína: ${personalData.goal === 'gain_muscle' ? '25-30g' : '20-25g'}\n• Carboidrato: ${personalData.goal === 'gain_muscle' ? '30-40g' : '15-25g'}\n\n💡 **DICA PRO:** ${personalData.goal === 'lose_weight' ? 'Priorize proteína, carboidrato moderado' : 'Não pule essa refeição - é crucial para ganhos!'}`;
      }
      
      return `${personalData.name}, horários ideais para ${goalText}:\n\n🌅 **CAFÉ DA MANHÃ:** 30min-1h após acordar\n• ${personalData.goal === 'lose_weight' ? 'Proteína + carboidrato complexo' : 'Refeição completa e abundante'}\n• Ex: Ovos + pão integral + fruta\n\n🌞 **ALMOÇO:** 4-5h após café da manhã\n• Refeição principal do dia\n• Proteína + carboidrato + vegetais + gordura boa\n\n🌆 **LANCHE:** 3-4h após almoço\n• ${personalData.goal === 'lose_weight' ? 'Leve: fruta + oleaginosas' : 'Consistente: shake ou sanduíche'}\n\n🌙 **JANTAR:** 3-4h antes de dormir\n• ${personalData.goal === 'lose_weight' ? 'Leve: proteína + vegetais' : 'Moderado: proteína + carboidrato'}\n\n⚡ **REGRA DE OURO:** Coma de 3 em 3 horas para manter metabolismo ativo!`;
    }

    // 3. ALIMENTOS ESPECÍFICOS
    if (message.includes('posso comer') || message.includes('pode comer') || message.includes('faz mal')) {
      
      // Análise de alimentos específicos
      const foods = {
        'banana': `🍌 **BANANA** é EXCELENTE para ${goalText}!\n\n✅ **BENEFÍCIOS:**\n• Rica em potássio (evita cãibras)\n• Carboidrato natural\n• Fibras para saciedade\n• Vitaminas do complexo B\n\n⏰ **MELHOR HORÁRIO:**\n• ${personalData.goal === 'lose_weight' ? 'Manhã ou pré-treino' : 'Qualquer horário, especialmente pré/pós-treino'}\n• ${personalData.goal === 'lose_weight' ? 'Evite à noite (açúcar natural)' : 'Ótima para lanches'}\n\n📊 **QUANTIDADE:** ${personalData.goal === 'lose_weight' ? '1 banana média por dia' : '1-2 bananas por dia'}\n\n💡 **DICA:** Banana verde tem menos açúcar e mais amido resistente!`,
        
        'arroz': `🍚 **ARROZ** para ${goalText}:\n\n✅ **TIPO IDEAL:** Arroz integral (mais fibras e nutrientes)\n\n📏 **PORÇÃO RECOMENDADA:**\n• ${personalData.goal === 'lose_weight' ? '1/2 a 3/4 xícara cozido' : personalData.goal === 'gain_muscle' ? '1 a 1,5 xícara cozido' : '3/4 a 1 xícara cozido'}\n\n⏰ **HORÁRIOS IDEAIS:**\n• Almoço: Sempre liberado\n• ${personalData.goal === 'lose_weight' ? 'Jantar: Evite ou porção mínima' : 'Jantar: Pode consumir normalmente'}\n\n🔥 **DICA PRO:** ${personalData.goal === 'lose_weight' ? 'Substitua por quinoa ou batata doce às vezes' : 'Combine com feijão para proteína completa'}`,
        
        'ovo': `🥚 **OVOS** são PERFEITOS para ${goalText}!\n\n✅ **QUANTIDADE IDEAL:**\n• ${personalData.goal === 'gain_muscle' ? '3-4 ovos inteiros por dia' : personalData.goal === 'lose_weight' ? '2 ovos inteiros + 2-3 claras' : '2-3 ovos inteiros por dia'}\n\n🍳 **MELHORES PREPAROS:**\n• Cozido ou pochê (mais saudável)\n• Mexido com pouco óleo\n• ${personalData.goal === 'lose_weight' ? 'Evite frituras' : 'Pode fritar com azeite'}\n\n⏰ **QUALQUER HORÁRIO:** Café, almoço, lanche ou jantar\n\n💪 **BENEFÍCIOS:**\n• Proteína completa (todos aminoácidos)\n• Colina (saúde cerebral)\n• Vitaminas A, D, E, K\n• Saciedade prolongada`,
        
        'frango': `🐔 **FRANGO** é a BASE para ${goalText}!\n\n🥩 **CORTES IDEAIS:**\n• Peito: Mais magro (${personalData.goal === 'lose_weight' ? 'PRIORIZE' : 'excelente opção'})\n• Coxa/sobrecoxa: Mais saborosa (${personalData.goal === 'gain_muscle' ? 'ÓTIMA OPÇÃO' : 'com moderação'})\n\n📏 **PORÇÃO DIÁRIA:**\n• ${personalData.goal === 'lose_weight' ? '120-150g' : personalData.goal === 'gain_muscle' ? '180-200g' : '150-180g'} por refeição\n\n🍳 **PREPAROS SAUDÁVEIS:**\n• Grelhado com temperos naturais\n• Assado no forno com legumes\n• Refogado com pouco óleo\n• ${personalData.goal === 'lose_weight' ? 'EVITE: Empanado e frito' : 'Pode variar os preparos'}\n\n🌿 **TEMPEROS PODEROSOS:**\n• Alho, cebola, ervas finas\n• Páprica, curry, açafrão\n• Limão, vinagre balsâmico`,
        
        'pão': `🍞 **PÃO** para ${goalText}:\n\n✅ **TIPOS LIBERADOS:**\n• Pão integral (SEMPRE priorize)\n• Pão de centeio\n• Pão de aveia\n• ${personalData.goal === 'gain_muscle' ? 'Pão francês com moderação' : ''}\n\n❌ **EVITE:**\n• Pão branco comum\n• Pães doces\n• Pão de açúcar\n\n📏 **QUANTIDADE:**\n• ${personalData.goal === 'lose_weight' ? '1-2 fatias por dia' : personalData.goal === 'gain_muscle' ? '2-4 fatias por dia' : '2-3 fatias por dia'}\n\n⏰ **MELHOR HORÁRIO:**\n• Café da manhã: SEMPRE\n• ${personalData.goal === 'lose_weight' ? 'Evite à noite' : 'Pode consumir até o lanche da tarde'}\n\n🥑 **ACOMPANHAMENTOS SAUDÁVEIS:**\n• Abacate amassado\n• Pasta de amendoim natural\n• Queijo cottage\n• Ovo mexido`,
        
        'leite': `🥛 **LEITE** para ${goalText}:\n\n🎯 **TIPO IDEAL:**\n• ${personalData.goal === 'lose_weight' ? 'Desnatado ou semi-desnatado' : personalData.goal === 'gain_muscle' ? 'Integral (mais calorias)' : 'Semi-desnatado'}\n\n📊 **QUANTIDADE DIÁRIA:**\n• ${personalData.goal === 'lose_weight' ? '200-400ml' : personalData.goal === 'gain_muscle' ? '400-600ml' : '300-500ml'}\n\n⏰ **MELHORES HORÁRIOS:**\n• Café da manhã: Sempre\n• Pré-treino: 1 copo\n• ${personalData.goal === 'gain_muscle' ? 'Antes de dormir: Caseína natural' : 'Evite muito próximo ao treino'}\n\n🌱 **ALTERNATIVAS:**\n• Leite de amêndoas (menos calorias)\n• Leite de aveia (mais cremoso)\n• Leite de coco (gorduras boas)\n\n💡 **INTOLERÂNCIA?** Experimente leites vegetais fortificados com cálcio!`
      };
      
      // Verificar alimentos específicos
      for (const [food, response] of Object.entries(foods)) {
        if (message.includes(food)) {
          return response;
        }
      }
      
      // Resposta genérica para "posso comer X"
      return `${personalData.name}, sobre sua dúvida alimentar para ${goalText}:\n\n🤔 **ANÁLISE GERAL:**\nPara te dar uma resposta precisa, preciso saber qual alimento específico você quer saber!\n\n📋 **REGRAS GERAIS:**\n• ${personalData.goal === 'lose_weight' ? 'Priorize: proteínas magras, vegetais, frutas' : 'Foque em: proteínas, carboidratos complexos, gorduras boas'}\n• Evite: processados, frituras, açúcar em excesso\n• Hidrate-se: ${Math.round(personalData.weight * 35 / 1000 * 10) / 10}L água/dia\n\n💬 **ME CONTE:**\n• Qual alimento específico?\n• Em que horário do dia?\n• Contexto (pré/pós treino, lanche, etc.)\n\nAssim posso te dar uma resposta personalizada e detalhada! 😊`;
    }

    // 4. TREINOS ESPECÍFICOS
    if (message.includes('treino') || message.includes('exercício') || message.includes('musculação') ||
        message.includes('academia') || message.includes('malhar')) {
      
      const workoutResponses = {
        'peito': `💪 **TREINO DE PEITO** personalizado para ${goalText}:\n\n🏋️ **EXERCÍCIOS PRINCIPAIS:**\n1. **Supino reto** - 4x${personalData.goal === 'gain_muscle' ? '6-8 reps (pesado)' : '10-12 reps'}\n2. **Supino inclinado** - 3x${personalData.goal === 'gain_muscle' ? '8-10 reps' : '12-15 reps'}\n3. **Crucifixo** - 3x${personalData.goal === 'gain_muscle' ? '10-12 reps' : '15-20 reps'}\n4. **Flexão de braço** - 3x máximo\n5. **Supino declinado** - 3x${personalData.goal === 'gain_muscle' ? '8-10 reps' : '12-15 reps'}\n\n⚡ **TÉCNICA PERFEITA:**\n• Desça a barra até o peito\n• Aperte o peito no topo\n• Controle a descida (2-3 segundos)\n• ${personalData.goal === 'gain_muscle' ? 'Use cargas que desafiem' : 'Foque na execução perfeita'}\n\n⏱️ **DESCANSO:** ${personalData.goal === 'gain_muscle' ? '2-3 minutos entre séries' : '1-2 minutos (mais intenso)'}\n\n🔥 **DICA AVANÇADA:** ${personalData.goal === 'lose_weight' ? 'Faça superseries com tríceps' : 'Aumente carga toda semana (sobrecarga progressiva)'}`,
        
        'costas': `💪 **TREINO DE COSTAS** para ${goalText}:\n\n🏋️ **EXERCÍCIOS ESSENCIAIS:**\n1. **Barra fixa** - 4x máximo (${personalData.goal === 'gain_muscle' ? 'com peso se conseguir' : 'foque na técnica'})\n2. **Remada curvada** - 4x${personalData.goal === 'gain_muscle' ? '6-8 reps' : '10-12 reps'}\n3. **Puxada frontal** - 3x${personalData.goal === 'gain_muscle' ? '8-10 reps' : '12-15 reps'}\n4. **Remada unilateral** - 3x10-12 cada braço\n5. **Levantamento terra** - 3x${personalData.goal === 'gain_muscle' ? '5-6 reps (PESADO)' : '8-10 reps'}\n\n🎯 **FOCO TÉCNICO:**\n• Aperte as escápulas\n• Puxe com as costas, não com braços\n• Amplitude completa\n• Core sempre contraído\n\n💡 **SEGREDO:** ${personalData.goal === 'gain_muscle' ? 'Costas respondem bem a volume alto' : 'Use pegadas variadas para trabalhar ângulos diferentes'}`,
        
        'pernas': `🦵 **TREINO DE PERNAS** para ${goalText}:\n\n🏋️ **EXERCÍCIOS FUNDAMENTAIS:**\n1. **Agachamento livre** - 4x${personalData.goal === 'gain_muscle' ? '6-8 reps' : '12-15 reps'}\n2. **Leg press** - 4x${personalData.goal === 'gain_muscle' ? '10-12 reps' : '15-20 reps'}\n3. **Stiff** (posterior) - 3x${personalData.goal === 'gain_muscle' ? '8-10 reps' : '12-15 reps'}\n4. **Afundo** - 3x12-15 cada perna\n5. **Panturrilha** - 4x15-25 reps\n\n🔥 **TÉCNICA CRUCIAL:**\n• Agachamento: Desça até 90° ou mais\n• Joelhos alinhados com pés\n• Peso nos calcanhares\n• Subida explosiva\n\n⚡ **INTENSIDADE:** ${personalData.goal === 'gain_muscle' ? 'Pernas suportam MUITO peso - não tenha medo!' : 'Mantenha ritmo acelerado entre exercícios'}\n\n🎯 **RESULTADO:** ${personalData.goal === 'lose_weight' ? 'Pernas queimam MUITAS calorias!' : 'Base de toda força do corpo!'}`,
        
        'braços': `💪 **TREINO DE BRAÇOS** para ${goalText}:\n\n🔥 **BÍCEPS:**\n• Rosca direta - 3x${personalData.goal === 'gain_muscle' ? '8-10 reps' : '12-15 reps'}\n• Rosca martelo - 3x${personalData.goal === 'gain_muscle' ? '10-12 reps' : '15-20 reps'}\n• Rosca concentrada - 3x12-15 reps\n\n🔥 **TRÍCEPS:**\n• Tríceps testa - 3x${personalData.goal === 'gain_muscle' ? '8-10 reps' : '12-15 reps'}\n• Mergulho - 3x máximo\n• Tríceps corda - 3x${personalData.goal === 'gain_muscle' ? '10-12 reps' : '15-20 reps'}\n\n🎯 **CONEXÃO MENTE-MÚSCULO:**\n• Sinta o músculo trabalhando\n• Amplitude completa\n• Controle total do movimento\n• ${personalData.goal === 'gain_muscle' ? 'Foque em cargas progressivas' : 'Use superseries (bíceps + tríceps)'}\n\n⚡ **FREQUÊNCIA:** 2x por semana (48h descanso entre treinos)`,
        
        'abdômen': `🔥 **TREINO DE ABDÔMEN** para ${goalText}:\n\n💪 **EXERCÍCIOS EFICAZES:**\n1. **Prancha** - 3x30-60 segundos\n2. **Abdominal supra** - 3x15-25 reps\n3. **Bicicleta** - 3x20-30 cada lado\n4. **Prancha lateral** - 3x20-30s cada lado\n5. **Mountain climber** - 3x30-45 segundos\n\n🎯 **VERDADE SOBRE ABDÔMEN:**\n• ${personalData.goal === 'lose_weight' ? 'Abdômen se faz 80% na COZINHA!' : 'Abdômen forte melhora todos os exercícios'}\n• Não existe "queima localizada"\n• ${personalData.goal === 'lose_weight' ? 'Reduza gordura corporal para ver definição' : 'Foque em força, não apenas repetições'}\n\n⚡ **FREQUÊNCIA:** 3-4x por semana\n\n💡 **RESPIRAÇÃO:** Expire contraindo, inspire relaxando`,
        
        'cardio': `🏃‍♂️ **CARDIO** personalizado para ${goalText}:\n\n${personalData.goal === 'lose_weight' ? 
          '🔥 **PARA EMAGRECER:**\n• **HIIT:** 20-30min, 3-4x/semana (queima mais gordura)\n• **Caminhada:** 45-60min, diário (baixo impacto)\n• **Corrida:** 30-40min, 3x/semana\n• **Bike:** 40-50min, 3x/semana\n\n⚡ **ESTRATÉGIA:** Cardio em jejum pela manhã potencializa queima!' : 
          personalData.goal === 'gain_muscle' ? 
          '💪 **PARA GANHAR MASSA:**\n• **Cardio leve:** 15-20min pós-treino\n• **Caminhada:** 30min, 2-3x/semana\n• **EVITE:** Cardio excessivo (atrapalha ganhos)\n• **Foco:** Preserve energia para musculação\n\n⚡ **REGRA:** Menos é mais quando o foco é massa!' :
          '⚖️ **PARA DEFINIÇÃO:**\n• **Cardio moderado:** 30min, 3-4x/semana\n• **HIIT:** 20min, 2x/semana\n• **Atividades prazerosas:** Dança, natação\n• **Combine:** Musculação + cardio'}\n\n💡 **DICA PRO:** ${personalData.goal === 'lose_weight' ? 'Varie tipos para não enjoar' : 'Monitore frequência cardíaca'}`,
      };
      
      // Verificar exercícios específicos
      for (const [exercise, response] of Object.entries(workoutResponses)) {
        if (message.includes(exercise)) {
          return response;
        }
      }
      
      // Verificar alimentos específicos
      for (const [food, response] of Object.entries(foods)) {
        if (message.includes(food)) {
          return response;
        }
      }
    }

    // 5. SUPLEMENTAÇÃO
    if (message.includes('whey') || message.includes('creatina') || message.includes('suplemento') ||
        message.includes('proteína em pó') || message.includes('bcaa') || message.includes('vitamina')) {
      
      if (message.includes('whey') || message.includes('proteína em pó')) {
        return `🥤 **WHEY PROTEIN** para ${goalText}:\n\n✅ **NECESSÁRIO?** ${personalData.goal === 'gain_muscle' ? 'ALTAMENTE RECOMENDADO' : personalData.goal === 'lose_weight' ? 'MUITO ÚTIL para saciedade' : 'OPCIONAL, mas ajuda'}\n\n📏 **DOSAGEM IDEAL:**\n• ${personalData.goal === 'gain_muscle' ? '1-2 scoops por dia' : '1 scoop por dia'}\n• Cada scoop: ~25-30g proteína\n\n⏰ **MELHORES HORÁRIOS:**\n• **Pós-treino:** Até 2h após (PRIORIDADE)\n• **Entre refeições:** Quando não conseguir comer\n• ${personalData.goal === 'gain_muscle' ? 'Antes de dormir: Caseína é melhor' : 'Manhã: Se não comer ovos'}\n\n🥤 **RECEITA PERFEITA:**\n• 1 scoop whey\n• ${personalData.goal === 'gain_muscle' ? '300ml leite + 1 banana' : '250ml água + 1/2 banana'}\n• ${personalData.goal === 'gain_muscle' ? '1 colher aveia' : 'Gelo a gosto'}\n\n💰 **VALE A PENA?** ${personalData.goal === 'lose_weight' ? 'Sim! Ajuda a bater meta de proteína facilmente' : 'ESSENCIAL para quem quer ganhar massa!'}`;
      }
      
      if (message.includes('creatina')) {
        return `⚡ **CREATINA** para ${goalText}:\n\n✅ **FUNCIONA?** SIM! Suplemento mais estudado do mundo\n\n🎯 **BENEFÍCIOS:**\n• +15-20% força nos treinos\n• Músculos mais volumosos (retenção água)\n• Recuperação mais rápida\n• ${personalData.goal === 'gain_muscle' ? 'ESSENCIAL para ganhos' : 'Ajuda na performance'}\n\n📊 **COMO USAR:**\n• **Dosagem:** 3-5g por dia\n• **Horário:** Qualquer hora (não importa)\n• **Saturação:** 7-10 dias para fazer efeito\n• **Ciclo:** Pode usar continuamente\n\n💧 **IMPORTANTE:**\n• Beba MUITA água (3L+ por dia)\n• Pode causar pequeno ganho de peso (água)\n• ${personalData.goal === 'lose_weight' ? 'Não atrapalha emagrecimento' : 'Potencializa ganhos de massa'}\n\n💰 **VALE A PENA:** ${personalData.goal === 'gain_muscle' ? 'OBRIGATÓRIO!' : 'Recomendado se treina pesado'}`;
      }
      
      return `💊 **SUPLEMENTAÇÃO** para ${goalText}:\n\n🥇 **PRIORIDADES:**\n1. **Whey Protein** - ${personalData.goal === 'gain_muscle' ? 'ESSENCIAL' : 'Muito útil'}\n2. **Creatina** - ${personalData.goal === 'gain_muscle' ? 'OBRIGATÓRIO' : 'Recomendado'}\n3. **Multivitamínico** - Base para todos\n4. **Ômega 3** - Saúde geral\n\n💡 **LEMBRE-SE:**\n• Suplemento COMPLEMENTA, não substitui comida\n• ${personalData.goal === 'lose_weight' ? 'Foque primeiro na dieta' : 'Comida real sempre em primeiro lugar'}\n• Qualidade > Quantidade\n\n🎯 **PARA SEU OBJETIVO:**\n• ${personalData.goal === 'lose_weight' ? 'Whey para saciedade + multivitamínico' : personalData.goal === 'gain_muscle' ? 'Whey + Creatina + Multivitamínico' : 'Whey + Multivitamínico básico'}\n\nQuer saber sobre algum suplemento específico?`;
    }

    // 6. HIDRATAÇÃO
    if (message.includes('água') || message.includes('hidratação') || message.includes('beber') ||
        message.includes('sede') || message.includes('líquido')) {
      return `💧 **HIDRATAÇÃO** personalizada para ${personalData.name} (${personalData.weight}kg):\n\n📊 **SUA META DIÁRIA:** ${Math.round(personalData.weight * 35 / 1000 * 10) / 10}L de água\n\n⏰ **ESTRATÉGIA INTELIGENTE:**\n• **Ao acordar:** 1-2 copos (reidrata após jejum)\n• **Antes refeições:** 1 copo (ajuda digestão)\n• **Durante treino:** 150-200ml a cada 15min\n• **Antes de dormir:** 1 copo (não exagere)\n\n🔥 **BENEFÍCIOS PARA ${goalText.toUpperCase()}:**\n• ${personalData.goal === 'lose_weight' ? 'Acelera metabolismo em até 30%' : 'Essencial para síntese proteica'}\n• ${personalData.goal === 'lose_weight' ? 'Aumenta saciedade (menos fome)' : 'Melhora performance nos treinos'}\n• Elimina toxinas\n• Melhora pele e disposição\n\n💡 **TRUQUES PARA BEBER MAIS:**\n• Garrafa sempre à vista\n• Água com limão/hortelã\n• Apps lembretes\n• ${personalData.goal === 'lose_weight' ? 'Beba antes de sentir fome (pode ser sede!)' : 'Monitore cor da urina (deve ser clara)'}\n\n🚨 **SINAIS DE DESIDRATAÇÃO:** Sede, urina escura, cansaço, dor de cabeça`;
    }

    // 7. PERDA DE PESO ESPECÍFICA
    if (message.includes('emagrecer') || message.includes('perder peso') || message.includes('queimar gordura') ||
        message.includes('barriga') || message.includes('definir')) {
      return `🔥 **EMAGRECIMENTO INTELIGENTE** para ${personalData.name}:\n\n📊 **SEU PERFIL:** ${personalData.age} anos, ${personalData.weight}kg\n\n🎯 **ESTRATÉGIA PERSONALIZADA:**\n• **Déficit calórico:** 300-500 kcal/dia\n• **Meta proteína:** ${Math.round(personalData.weight * 1.8)}g/dia\n• **Carboidratos:** Manhã e pré-treino\n• **Gorduras boas:** 20-25% das calorias\n\n🍽️ **PLANO ALIMENTAR:**\n• **Café:** Proteína + carboidrato + fruta\n• **Almoço:** Proteína + carboidrato + vegetais\n• **Lanche:** Proteína + gordura boa\n• **Jantar:** Proteína + vegetais (pouco carbo)\n\n🏃‍♀️ **EXERCÍCIOS PARA QUEIMAR:**\n• **HIIT:** 3x/semana (máxima queima)\n• **Musculação:** 4x/semana (preserva músculo)\n• **Caminhada:** Diário 45min (queima gordura)\n\n⚡ **ACELERADOR NATURAL:**\n• Água gelada (corpo gasta energia para aquecer)\n• Chá verde (termogênico natural)\n• Pimenta (acelera metabolismo)\n• Jejum intermitente 16h (opcional)\n\n🎯 **META REALISTA:** ${Math.round(personalData.weight * 0.01)}kg por semana (saudável e sustentável)`;
    }

    // 8. GANHO DE MASSA
    if (message.includes('ganhar massa') || message.includes('músculo') || message.includes('hipertrofia') ||
        message.includes('bulk') || message.includes('crescer')) {
      return `💪 **GANHO DE MASSA** para ${personalData.name} (${personalData.weight}kg):\n\n🎯 **FÓRMULA DO SUCESSO:**\n• **Superávit:** +300-500 kcal/dia\n• **Proteína:** ${Math.round(personalData.weight * 2.2)}g/dia\n• **Carboidratos:** ${Math.round(personalData.weight * 4-5)}g/dia\n• **Treino:** 4-5x/semana (intenso)\n\n🍽️ **REFEIÇÕES ANABÓLICAS:**\n• **6 refeições/dia** (de 3 em 3h)\n• **Nunca pule** café da manhã\n• **Lanche noturno** com caseína\n• **Pós-treino** em até 1h\n\n🏋️ **TREINO PARA MASSA:**\n• **Cargas pesadas:** 6-10 repetições\n• **Exercícios compostos:** Agachamento, supino, barra\n• **Descanso:** 2-3 minutos entre séries\n• **Progressão:** Aumente peso toda semana\n\n💤 **RECUPERAÇÃO:**\n• **Sono:** 7-9 horas (hormônio do crescimento)\n• **Descanso:** 48h entre treinos do mesmo músculo\n• **Stress:** Controle (cortisol atrapalha ganhos)\n\n⚡ **PACIÊNCIA:** Ganhos reais levam 8-12 semanas para aparecer!`;
    }

    // 9. RECEITAS E PREPAROS
    if (message.includes('receita') || message.includes('como fazer') || message.includes('preparo') ||
        message.includes('cozinhar') || message.includes('shake')) {
      
      if (message.includes('shake')) {
        return `🥤 **SHAKE PERSONALIZADO** para ${personalData.name} (${goalText}):\n\n🏆 **RECEITA PERFEITA:**\n• ${personalData.goal === 'gain_muscle' ? '300ml leite integral' : '250ml leite desnatado ou água'}\n• 1 scoop whey protein\n• ${personalData.goal === 'gain_muscle' ? '1 banana grande' : '1/2 banana'}\n• ${personalData.goal === 'gain_muscle' ? '2 colheres aveia' : '1 colher aveia'}\n• ${personalData.goal === 'gain_muscle' ? '1 colher pasta amendoim' : '1/2 colher pasta amendoim'}\n• Gelo a gosto\n\n📊 **VALORES NUTRICIONAIS:**\n• Calorias: ${personalData.goal === 'gain_muscle' ? '~520 kcal' : '~350 kcal'}\n• Proteína: ${personalData.goal === 'gain_muscle' ? '~40g' : '~30g'}\n• Carboidratos: ${personalData.goal === 'gain_muscle' ? '~45g' : '~30g'}\n\n⏰ **QUANDO TOMAR:**\n• **Pós-treino:** Até 2h após\n• **Lanche:** Entre refeições\n• ${personalData.goal === 'gain_muscle' ? 'Antes de dormir: Troque whey por caseína' : 'Manhã: Se não tiver tempo para café completo'}\n\n🔄 **VARIAÇÕES:**\n• Substitua banana por morango\n• Adicione cacau em pó\n• Use leite de coco\n• ${personalData.goal === 'gain_muscle' ? 'Adicione mel para mais calorias' : 'Use adoçante natural'}`;
      }
      
      return `👨‍🍳 **RECEITAS SAUDÁVEIS** para ${goalText}:\n\n🥗 **SALADA PROTEICA:**\n• Mix de folhas verdes\n• ${personalData.goal === 'gain_muscle' ? '150g frango desfiado' : '120g frango'}\n• 1/2 abacate\n• Tomate cereja\n• Azeite + limão\n\n🍳 **OMELETE PERFEITA:**\n• ${personalData.goal === 'gain_muscle' ? '3 ovos inteiros' : '2 ovos + 2 claras'}\n• Espinafre, tomate, cebola\n• Queijo branco (opcional)\n• Temperos a gosto\n\n🥘 **REFOGADO SAUDÁVEL:**\n• ${personalData.goal === 'gain_muscle' ? '180g proteína' : '120g proteína'}\n• Legumes variados\n• Alho, cebola, gengibre\n• Pouco azeite\n\n💡 **DICA DE CHEF:** Temperos naturais fazem TODA diferença no sabor!`;
    }

    // 10. JEJUM INTERMITENTE
    if (message.includes('jejum') || message.includes('intermitente') || message.includes('não comer') ||
        message.includes('pular refeição')) {
      return `⏰ **JEJUM INTERMITENTE** para ${goalText}:\n\n🎯 **RECOMENDAÇÃO PARA VOCÊ:**\n${personalData.goal === 'lose_weight' ? 
        '✅ **ALTAMENTE RECOMENDADO**\n• Protocolo 16:8 (16h jejum, 8h alimentação)\n• Ex: Última refeição 20h, primeira 12h\n• Acelera queima de gordura\n• Melhora sensibilidade à insulina' : 
        personalData.goal === 'gain_muscle' ? 
        '⚠️ **CUIDADO** - Pode atrapalhar ganhos\n• Se fizer, protocolo 14:10 (mais suave)\n• Mantenha todas as calorias necessárias\n• Não pule pós-treino' :
        '✅ **PODE FAZER** com moderação\n• Protocolo 16:8 ou 14:10\n• Ajuda na definição\n• Melhora composição corporal'}\n\n☕ **DURANTE O JEJUM:**\n• Água à vontade\n• Café sem açúcar\n• Chá sem açúcar\n• NADA com calorias\n\n🚨 **CONTRAINDICAÇÕES:**\n• Diabetes\n• Distúrbios alimentares\n• Gravidez/amamentação\n• ${personalData.age < 18 ? 'Menores de 18 anos' : 'Sempre consulte médico'}\n\n💡 **DICA:** Comece gradual - 12h, depois 14h, até chegar em 16h`;
    }

    // 11. ÁLCOOL
    if (message.includes('álcool') || message.includes('cerveja') || message.includes('vinho') ||
        message.includes('bebida') || message.includes('drink') || message.includes('balada')) {
      return `🍺 **ÁLCOOL** e ${goalText}:\n\n🚨 **IMPACTO NO SEU OBJETIVO:**\n${personalData.goal === 'lose_weight' ? 
        '❌ **ATRAPALHA MUITO** o emagrecimento\n• 1g álcool = 7 kcal (quase como gordura)\n• Bloqueia queima de gordura por 24-48h\n• Aumenta apetite (comida de boteco)\n• Desidrata o corpo' : 
        personalData.goal === 'gain_muscle' ? 
        '⚠️ **PREJUDICA** ganho de massa\n• Reduz síntese proteica\n• Atrapalha recuperação muscular\n• Diminui testosterona\n• Piora qualidade do sono' :
        '⚠️ **MODERAÇÃO** é a chave\n• Pode atrapalhar definição\n• Causa retenção de líquido\n• Reduz performance nos treinos'}\n\n🍷 **SE FOR BEBER:**\n• **Limite:** ${personalData.goal === 'lose_weight' ? '1x por semana máximo' : '1-2x por semana'}\n• **Escolhas melhores:** Vinho tinto, vodka pura\n• **Evite:** Cerveja, drinks doces, caipirinha\n• **Hidrate:** 1 copo água para cada dose\n\n💡 **ESTRATÉGIA:**\n• Coma antes de beber\n• Escolha UM dia da semana\n• No dia seguinte: muito treino e água\n• ${personalData.goal === 'lose_weight' ? 'Compense reduzindo carboidratos' : 'Mantenha rotina normal'}`;
    }

    // 12. SONO E RECUPERAÇÃO
    if (message.includes('sono') || message.includes('dormir') || message.includes('insônia') ||
        message.includes('cansaço') || message.includes('recuperação')) {
      return `😴 **SONO E RECUPERAÇÃO** para ${goalText}:\n\n⏰ **META DE SONO:** 7-9 horas por noite\n\n🧠 **POR QUE É CRUCIAL:**\n• ${personalData.goal === 'lose_weight' ? 'Pouco sono = +40% chance de engordar' : 'Hormônio do crescimento é liberado dormindo'}\n• Controla hormônios da fome (leptina/grelina)\n• ${personalData.goal === 'gain_muscle' ? 'Músculos crescem durante o sono' : 'Metabolismo se regula dormindo'}\n• Melhora performance nos treinos\n\n🌙 **ROTINA PARA DORMIR MELHOR:**\n• **2h antes:** Pare de comer\n• **1h antes:** Desligue telas (celular, TV)\n• **30min antes:** Chá de camomila\n• **Quarto:** Escuro, fresco, silencioso\n\n🍽️ **ALIMENTAÇÃO NOTURNA:**\n• **Pode comer:** ${personalData.goal === 'gain_muscle' ? 'Caseína, iogurte grego, cottage' : 'Chá, água, no máximo iogurte'}\n• **Evite:** Cafeína, açúcar, muita água\n\n💊 **SUPLEMENTOS NATURAIS:**\n• Melatonina (consulte médico)\n• Magnésio\n• Chá de valeriana\n\n⚡ **RESULTADO:** Sono de qualidade = ${personalData.goal === 'lose_weight' ? 'emagrecimento mais rápido' : 'ganhos musculares acelerados'}!`;
    }

    // 13. METABOLISMO
    if (message.includes('metabolismo') || message.includes('acelerar') || message.includes('lento') ||
        message.includes('queimar') || message.includes('termogênico')) {
      return `🔥 **ACELERAR METABOLISMO** para ${goalText}:\n\n⚡ **ESTRATÉGIAS COMPROVADAS:**\n\n🏋️ **MUSCULAÇÃO (PRIORIDADE #1):**\n• Cada 1kg músculo = +50-100 kcal/dia queimadas\n• ${personalData.goal === 'lose_weight' ? 'Mantenha massa muscular' : 'Aumente massa muscular'}\n• Treino intenso = metabolismo acelerado por 24h\n\n🍽️ **ALIMENTAÇÃO TERMOGÊNICA:**\n• **Proteína:** Gasta 30% das calorias para digestão\n• **Pimenta:** Capsaicina acelera metabolismo\n• **Chá verde:** 3-4 xícaras/dia\n• **Gengibre:** Anti-inflamatório e termogênico\n• **Água gelada:** Corpo gasta energia para aquecer\n\n🏃‍♀️ **CARDIO INTELIGENTE:**\n• **HIIT:** Queima calorias por 24h após treino\n• **Jejum:** Cardio em jejum potencializa queima\n• **Variação:** Mude tipo de cardio sempre\n\n💤 **FATORES CRUCIAIS:**\n• **Sono:** 7-9h (hormônios regulados)\n• **Stress:** Cortisol alto = metabolismo lento\n• **Hidratação:** Desidratação reduz metabolismo\n\n🚫 **EVITE:**\n• Dietas muito restritivas (metabolismo adapta)\n• Pular refeições\n• Muito cardio (pode reduzir metabolismo)\n\n📈 **RESULTADO:** Metabolismo até 15% mais rápido em 4-6 semanas!`;
    }

    // 14. SUBSTITUIÇÕES ALIMENTARES
    if (message.includes('substituir') || message.includes('trocar') || message.includes('não gosto') ||
        message.includes('alergia') || message.includes('intolerância')) {
      return `🔄 **SUBSTITUIÇÕES INTELIGENTES** para ${goalText}:\n\n🥩 **PROTEÍNAS:**\n• Frango → Peixe, carne vermelha magra, ovos\n• Carne → Frango, peru, peixe\n• Peixe → Frango, ovos, whey protein\n• Leite → Iogurte grego, queijo cottage\n\n🌾 **CARBOIDRATOS:**\n• Arroz → Quinoa, batata doce, aveia\n• Pão → Tapioca, batata doce, aveia\n• Macarrão → Abobrinha espiral, shirataki\n• Açúcar → Mel, tâmaras, stevia\n\n🥑 **GORDURAS BOAS:**\n• Azeite → Óleo coco, abacate\n• Amendoim → Amêndoas, castanhas\n• Manteiga → Ghee, pasta amendoim natural\n\n🥬 **VEGETAIS:**\n• Brócolis → Couve-flor, aspargos\n• Espinafre → Rúcula, agrião\n• Qualquer vegetal verde é bem-vindo!\n\n💡 **REGRA DE OURO:** Mantenha mesmo perfil nutricional (proteína por proteína, carbo por carbo)\n\n🤔 **TEM ALGUMA RESTRIÇÃO ESPECÍFICA?** Me conte que te ajudo com substituições personalizadas!`;
    }

    // 15. MOTIVAÇÃO E MINDSET
    if (message.includes('desanimado') || message.includes('desistir') || message.includes('difícil') ||
        message.includes('não consigo') || message.includes('motivação') || message.includes('preguiça')) {
      return `💪 **MOTIVAÇÃO PERSONALIZADA** para ${personalData.name}:\n\n🎯 **LEMBRE-SE DO SEU OBJETIVO:** ${goalText}\n\n🔥 **VERDADES QUE VÃO TE MOTIVAR:**\n• Você já deu o primeiro passo (está aqui!)\n• Cada dia de consistência = resultado mais próximo\n• ${personalData.goal === 'lose_weight' ? 'Cada kg perdido = mais saúde e autoestima' : personalData.goal === 'gain_muscle' ? 'Cada treino = músculos mais fortes' : 'Cada escolha saudável = corpo mais definido'}\n• Não existe fracasso, apenas aprendizado\n\n🏆 **ESTRATÉGIAS MENTAIS:**\n• **Foque no processo**, não só no resultado\n• **Celebre pequenas vitórias** (1 semana consistente)\n• **80% de consistência** é melhor que 100% por 1 semana\n• **Compare-se apenas** com você de ontem\n\n📅 **PLANO ANTI-DESISTÊNCIA:**\n• **Semana 1-2:** Foque em criar hábitos\n• **Semana 3-4:** Primeiros resultados aparecem\n• **Semana 5-8:** Transformação visível\n• **Mês 3+:** Novo estilo de vida\n\n💡 **QUANDO BATER PREGUIÇA:**\n• Lembre por que começou\n• Faça pelo menos 50% do planejado\n• Pense em como se sentirá depois\n• ${personalData.name}, você é mais forte que pensa!\n\n🌟 **AFIRMAÇÃO:** "Eu sou capaz, eu mereço, eu vou conseguir!"`;
    }

    // 16. PLATEAU (ESTAGNAÇÃO)
    if (message.includes('parou') || message.includes('estagnado') || message.includes('plateau') ||
        message.includes('não emagreço') || message.includes('não ganho')) {
      return `📈 **QUEBRAR PLATEAU** para ${goalText}:\n\n🎯 **POR QUE ESTAGNOU:**\n• Corpo se adaptou à rotina atual\n• ${personalData.goal === 'lose_weight' ? 'Metabolismo se ajustou ao déficit' : 'Músculos se acostumaram ao estímulo'}\n• Possível retenção de líquido\n• Stress ou sono ruim\n\n🔄 **ESTRATÉGIAS PARA QUEBRAR:**\n\n${personalData.goal === 'lose_weight' ? 
  '🔥 **PARA VOLTAR A EMAGRECER:**\n• **Refeed day:** 1 dia comendo mais carboidratos\n• **Mude o cardio:** HIIT se faz esteira, esteira se faz bike\n• **Jejum intermitente:** Se não faz, experimente\n• **Mais proteína:** Aumente 20-30g/dia\n• **Água:** Aumente para 3L/dia' : 
  personalData.goal === 'gain_muscle' ? 
  '💪 **PARA VOLTAR A CRESCER:**\n• **Aumente calorias:** +200-300 kcal/dia\n• **Mude treino:** Novas séries, exercícios, ângulos\n• **Mais descanso:** Talvez esteja overtraining\n• **Suplementação:** Creatina se não usa\n• **Sono:** Priorize 8-9h por noite' :
  '⚖️ **PARA DEFINIR MAIS:**\n• **Varie treino:** Mais intensidade\n• **Cardio:** Adicione HIIT 2x/semana\n• **Dieta:** Cicle carboidratos\n• **Medidas:** Foque em cm, não só peso'}\n\n⏰ **TEMPO:** Dê 2-3 semanas para ver mudanças\n\n💡 **LEMBRE-SE:** Plateau é normal e temporário. Seu corpo está se preparando para o próximo nível!`;
    }

    // 17. SUPLEMENTOS ESPECÍFICOS
    if (message.includes('bcaa') || message.includes('glutamina') || message.includes('cafeína') ||
        message.includes('termogênico') || message.includes('vitamina')) {
      
      const supplements = {
        'bcaa': `💊 **BCAA** para ${goalText}:\n\n🤔 **NECESSÁRIO?** ${personalData.goal === 'gain_muscle' ? 'OPCIONAL se come proteína suficiente' : 'DESNECESSÁRIO se usa whey'}\n\n✅ **QUANDO PODE AJUDAR:**\n• Treino em jejum\n• Treinos muito longos (+90min)\n• Dieta muito restritiva\n\n📊 **DOSAGEM:** 10-15g durante treino\n\n💰 **VEREDICTO:** Invista primeiro em whey e creatina`,
        
        'glutamina': `💊 **GLUTAMINA** para ${goalText}:\n\n🎯 **BENEFÍCIOS:**\n• Melhora recuperação muscular\n• Fortalece sistema imunológico\n• Reduz catabolismo\n\n📊 **DOSAGEM:** 10-20g/dia\n⏰ **HORÁRIO:** Pós-treino ou antes de dormir\n\n💰 **PRIORIDADE:** ${personalData.goal === 'gain_muscle' ? 'MÉDIA - depois de whey e creatina' : 'BAIXA - foque no básico primeiro'}`,
        
        'cafeína': `☕ **CAFEÍNA** para ${goalText}:\n\n🔥 **BENEFÍCIOS COMPROVADOS:**\n• +15-20% performance no treino\n• Acelera metabolismo\n• Queima gordura\n• Melhora foco\n\n📊 **DOSAGEM IDEAL:**\n• ${personalData.weight < 70 ? '200-300mg' : '300-400mg'} (${personalData.weight}kg)\n• 30-45min antes do treino\n\n⏰ **TIMING:**\n• Manhã: Café natural\n• Pré-treino: Suplemento ou café forte\n• **EVITE:** 6h antes de dormir\n\n💡 **FONTES NATURAIS:**\n• Café coado: 80-100mg/xícara\n• Chá verde: 25-50mg/xícara\n• Chá preto: 40-70mg/xícara`,
        
        'termogênico': `🔥 **TERMOGÊNICOS** para ${goalText}:\n\n⚡ **FUNCIONAM?** Sim, mas não fazem milagres\n\n🎯 **BENEFÍCIOS REAIS:**\n• +5-10% gasto calórico\n• Reduz apetite\n• Mais energia para treinar\n• ${personalData.goal === 'lose_weight' ? 'Acelera queima de gordura' : 'Melhora performance'}\n\n💊 **INGREDIENTES EFICAZES:**\n• Cafeína (principal)\n• Chá verde\n• Pimenta (capsaicina)\n• L-carnitina\n\n⚠️ **CUIDADOS:**\n• Não use à noite\n• Comece com dose menor\n• Cicle: 6 semanas ON, 2 semanas OFF\n• ${personalData.age > 40 ? 'Consulte médico (pressão)' : 'Monitore batimentos'}\n\n💰 **VALE A PENA?** ${personalData.goal === 'lose_weight' ? 'Pode ajudar, mas dieta é 80% do resultado' : 'Foque primeiro em whey e creatina'}`,
        
        'vitamina': `💊 **VITAMINAS** para ${goalText}:\n\n🥇 **ESSENCIAIS PARA VOCÊ:**\n• **Vitamina D:** 2000-4000 UI/dia (maioria tem deficiência)\n• **Vitamina C:** 1000mg/dia (antioxidante)\n• **Complexo B:** Metabolismo energético\n• **Magnésio:** Relaxamento muscular\n\n🎯 **ESPECÍFICAS PARA SEU OBJETIVO:**\n${personalData.goal === 'lose_weight' ? 
  '• **Vitamina B12:** Acelera metabolismo\n• **Cromo:** Controla vontade de doce\n• **CLA:** Pode ajudar na queima de gordura' : 
  personalData.goal === 'gain_muscle' ? 
  '• **Zinco:** Produção de testosterona\n• **Vitamina E:** Antioxidante para recuperação\n• **Ferro:** Transporte de oxigênio' :
  '• **Multivitamínico completo**\n• **Ômega 3:** Anti-inflamatório\n• **Vitamina D:** Base para tudo'}\n\n🥗 **FONTES NATURAIS:**\n• Sol: Vitamina D (15min/dia)\n• Frutas cítricas: Vitamina C\n• Vegetais verdes: Folato, ferro\n• Castanhas: Vitamina E, magnésio\n\n💡 **DICA:** Exame de sangue anual para verificar deficiências!`
      };
      
      for (const [supplement, response] of Object.entries(supplements)) {
        if (message.includes(supplement)) {
          return response;
        }
      }
    }

    // 18. MULHERES ESPECÍFICO
    if (message.includes('menstruação') || message.includes('tpm') || message.includes('ciclo') ||
        message.includes('hormônio') || (personalData.gender === 'female' && message.includes('mulher'))) {
      return `🌸 **NUTRIÇÃO FEMININA** para ${goalText}:\n\n🔄 **CICLO MENSTRUAL E ALIMENTAÇÃO:**\n\n🩸 **FASE MENSTRUAL (1-7 dias):**\n• **Ferro:** Carnes vermelhas, espinafre, feijão\n• **Magnésio:** Chocolate amargo, castanhas (reduz cólicas)\n• **Água:** Extra para compensar perda\n• **Carboidratos:** Pode aumentar um pouco (corpo pede)\n\n🌱 **FASE FOLICULAR (8-14 dias):**\n• **Energia alta:** Aproveite para treinos intensos\n• **Metabolismo normal:** Siga dieta padrão\n• **Foco:** ${personalData.goal === 'lose_weight' ? 'Fase ideal para déficit calórico' : 'Momento de treinar pesado'}\n\n🥚 **FASE OVULATÓRIA (14-16 dias):**\n• **Pico de energia:** Treinos mais intensos\n• **Apetite normal:** Controle mais fácil\n\n🌙 **FASE LÚTEA (17-28 dias):**\n• **TPM:** Aumente magnésio e vitamina B6\n• **Vontade de doce:** Normal! Opte por frutas ou chocolate 70%\n• **Retenção:** Beba mais água, reduza sódio\n• **Carboidratos:** Pode precisar de mais (escute seu corpo)\n\n💡 **DICAS ESPECIAIS:**\n• Não se pese durante TPM (retenção)\n• ${personalData.goal === 'lose_weight' ? 'Seja mais flexível na TPM' : 'Mantenha treinos, ajuste intensidade'}\n• Ferro + Vitamina C = melhor absorção`;
    }

    // 19. IDOSOS/IDADE
    if (personalData.age > 50 || message.includes('idade') || message.includes('idoso') || message.includes('mais velho')) {
      return `👴👵 **NUTRIÇÃO APÓS OS ${personalData.age} ANOS** para ${goalText}:\n\n🎯 **PRIORIDADES NA SUA IDADE:**\n• **Proteína:** AINDA MAIS importante (${Math.round(personalData.weight * 2.0)}g/dia)\n• **Cálcio + Vitamina D:** Ossos fortes\n• **Ômega 3:** Saúde cardiovascular e cerebral\n• **Fibras:** Digestão saudável\n\n🏋️ **EXERCÍCIOS ADAPTADOS:**\n• **Musculação:** ESSENCIAL (previne sarcopenia)\n• **Cardio:** Baixo impacto (caminhada, bike, natação)\n• **Flexibilidade:** Yoga, alongamento\n• **Equilíbrio:** Tai chi, pilates\n\n🍽️ **ALIMENTAÇÃO ESPECIAL:**\n• **Mais refeições:** 5-6 pequenas (digestão melhor)\n• **Hidratação:** Sede diminui com idade - force água\n• **Antioxidantes:** Frutas vermelhas, vegetais coloridos\n• **Evite:** Excesso de sódio (pressão)\n\n💊 **SUPLEMENTOS IMPORTANTES:**\n• Multivitamínico completo\n• Vitamina D3 (2000-4000 UI)\n• Ômega 3 (1-2g/dia)\n• ${personalData.goal === 'gain_muscle' ? 'Whey protein (digestão mais fácil)' : 'Cálcio se não consome laticínios'}\n\n⚡ **MOTIVAÇÃO:** Nunca é tarde para ser saudável! Aos ${personalData.age} anos você ainda pode ter o melhor shape da vida!`;
    }

    // 20. RESPOSTA INTELIGENTE GENÉRICA
    // Se chegou até aqui, a IA vai tentar entender o contexto e dar uma resposta útil
    
    // Análise de contexto por palavras-chave
    let contextualResponse = `${personalData.name}, analisando sua pergunta sobre "${userMessage}":\n\n`;
    
    // Determinar categoria da pergunta
    if (message.includes('comer') || message.includes('alimento') || message.includes('comida')) {
      contextualResponse += `🍽️ **SOBRE ALIMENTAÇÃO:**\nPara seu objetivo de ${goalText}, a regra geral é:\n\n`;
      
      if (personalData.goal === 'lose_weight') {
        contextualResponse += `• **Priorize:** Proteínas magras, vegetais, frutas\n• **Modere:** Carboidratos (prefira integrais)\n• **Evite:** Processados, frituras, açúcar\n• **Horário:** Carboidratos até 16h, proteína sempre\n\n`;
      } else if (personalData.goal === 'gain_muscle') {
        contextualResponse += `• **Coma mais:** Proteínas, carboidratos, calorias\n• **Frequência:** 5-6 refeições/dia\n• **Qualidade:** Comida real > processados\n• **Timing:** Pós-treino é sagrado\n\n`;
      } else {
        contextualResponse += `• **Balance:** Proteína alta, carboidratos moderados\n• **Qualidade:** Alimentos naturais\n• **Timing:** Carboidratos pré/pós treino\n• **Hidratação:** Fundamental\n\n`;
      }
    } else if (message.includes('treino') || message.includes('exercício')) {
      contextualResponse += `🏋️ **SOBRE TREINO:**\nPara ${goalText}, o foco deve ser:\n\n`;
      
      if (personalData.goal === 'lose_weight') {
        contextualResponse += `• **Musculação:** 4x/semana (preserva músculo)\n• **Cardio:** 3-4x/semana (queima gordura)\n• **Intensidade:** Moderada a alta\n• **Descanso:** 48h entre grupos musculares\n\n`;
      } else if (personalData.goal === 'gain_muscle') {
        contextualResponse += `• **Musculação:** 4-5x/semana (estímulo máximo)\n• **Cardio:** Mínimo (apenas saúde cardiovascular)\n• **Cargas:** Pesadas, 6-10 repetições\n• **Progressão:** Aumente peso toda semana\n\n`;
      } else {
        contextualResponse += `• **Musculação:** 4x/semana (força + resistência)\n• **Cardio:** 3x/semana (definição)\n• **Variação:** Mude estímulos constantemente\n• **Intensidade:** Moderada a alta\n\n`;
      }
    }
    
    contextualResponse += `💬 **PARA RESPOSTA MAIS ESPECÍFICA:**\nMe dê mais detalhes sobre:\n• Contexto exato da sua dúvida\n• Horário do dia que se refere\n• Se é sobre algum alimento/exercício específico\n\n🧠 **EXEMPLOS DE PERGUNTAS QUE POSSO RESPONDER:**\n• "Posso comer banana à noite?"\n• "Como treinar peito em casa?"\n• "Whey protein faz mal?"\n• "Quanto de água devo beber?"\n• "Melhor horário para carboidratos?"\n\n😊 **Estou aqui para te ajudar com QUALQUER dúvida sobre nutrição e treino!**`;
    
    return contextualResponse;
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
        content: generateAdvancedAIResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const quickQuestions = [
    "Posso comer doce depois do almoço?",
    "Qual o melhor shake para ganhar massa?",
    "Como acelerar meu metabolismo?",
    "Whey protein é necessário?",
    "Melhor horário para comer carboidratos?",
    "Como quebrar o plateau?",
    "Treino de peito em casa",
    "Jejum intermitente funciona?",
    "Posso beber álcool no final de semana?",
    "Como melhorar meu sono?",
    "Creatina faz mal?",
    "Substituto saudável para açúcar?"
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 border border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-500 rounded-xl">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-semibold text-white">IA Nutricional Avançada</h3>
            <p className="text-gray-300 text-sm">Especialista em nutrição e treino personalizado</p>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Perguntas Populares:</h4>
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
                  <span className="text-gray-300 text-sm">IA analisando e preparando resposta...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* No Access Warning */}
        {!canSendMessage && (
          <div className="bg-purple-500/20 border border-purple-500/30 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <Lock className="w-6 h-6 text-purple-400" />
              <div className="min-w-0 flex-1">
                <p className="text-purple-300 font-medium">Acesso completo necessário!</p>
                <p className="text-purple-400 text-sm">
                  Desbloqueie conversas ilimitadas com nossa IA especialista por apenas R$ 27
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
              placeholder={canSendMessage ? "Pergunte QUALQUER coisa sobre nutrição ou treino..." : "Acesso completo necessário..."}
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

        {/* AI Capabilities Info */}
        <div className="mt-4 bg-green-500/20 border border-green-500/30 rounded-xl p-4">
          <h4 className="text-green-300 font-medium mb-2">🧠 IA Nutricional Avançada - Posso responder sobre:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-green-200 text-xs sm:text-sm">
            <div>• Qualquer alimento</div>
            <div>• Horários ideais</div>
            <div>• Treinos específicos</div>
            <div>• Suplementação</div>
            <div>• Receitas saudáveis</div>
            <div>• Substituições</div>
            <div>• Metabolismo</div>
            <div>• Jejum intermitente</div>
            <div>• Hidratação</div>
            <div>• Sono e recuperação</div>
            <div>• Motivação</div>
            <div>• E muito mais!</div>
          </div>
        </div>
      </div>
    </div>
  );
};