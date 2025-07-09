import { PersonalData } from '../types/PersonalData';

export interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  preparation: string;
  tips: string[];
}

// Função para gerar um hash simples baseado nos dados do usuário
function generateUserHash(personalData: PersonalData): string {
  const dataString = `${personalData.name}-${personalData.height}-${personalData.weight}-${personalData.age}-${personalData.gender}-${personalData.activityLevel}-${personalData.goal}`;
  let hash = 0;
  for (let i = 0; i < dataString.length; i++) {
    const char = dataString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString();
}

// Receitas base organizadas por objetivo
const mealTemplates = {
  lose_weight: {
    breakfast: {
      name: 'Café da Manhã Proteico Light',
      time: '07:00',
      calories: 320,
      protein: 28,
      carbs: 25,
      fat: 12,
      ingredients: [
        '2 claras + 1 ovo inteiro',
        '1 fatia de pão integral',
        '1/2 banana média',
        '1 copo de leite desnatado',
        'Canela a gosto'
      ],
      preparation: 'Prepare ovos mexidos com pouco óleo. Corte a banana em fatias e polvilhe canela. Aqueça o leite e sirva com o pão integral.',
      tips: ['Evite açúcar refinado', 'Beba água antes da refeição', 'Mastigue bem os alimentos']
    },
    lunch: {
      name: 'Almoço Balanceado Light',
      time: '12:00',
      calories: 450,
      protein: 35,
      carbs: 45,
      fat: 15,
      ingredients: [
        '120g de peito de frango grelhado',
        '3/4 xícara de arroz integral',
        '1 xícara de brócolis',
        '1/2 colher de azeite extra virgem',
        'Salada verde à vontade'
      ],
      preparation: 'Grelhe o frango temperado com ervas. Cozinhe o arroz integral. Refogue o brócolis no vapor. Monte o prato com salada.',
      tips: ['Tempere com ervas naturais', 'Evite frituras', 'Coma devagar e mastigue bem']
    },
    snack: {
      name: 'Lanche da Tarde Light',
      time: '15:30',
      calories: 180,
      protein: 12,
      carbs: 18,
      fat: 8,
      ingredients: [
        '1 iogurte grego natural desnatado',
        '1/2 punhado de amêndoas',
        '1 maçã pequena',
        'Canela em pó'
      ],
      preparation: 'Corte a maçã em pedaços. Misture com o iogurte e adicione as amêndoas. Polvilhe canela.',
      tips: ['Opte por frutas da estação', 'Evite industrializados', 'Hidrate-se bem']
    },
    dinner: {
      name: 'Jantar Leve e Nutritivo',
      time: '19:00',
      calories: 350,
      protein: 30,
      carbs: 20,
      fat: 15,
      ingredients: [
        '120g de salmão grelhado',
        '1/2 xícara de quinoa',
        'Legumes refogados variados',
        '1/2 colher de azeite',
        'Ervas finas'
      ],
      preparation: 'Grelhe o salmão com ervas. Cozinhe a quinoa. Refogue os legumes levemente. Tempere com azeite e ervas.',
      tips: ['Jante 3h antes de dormir', 'Evite carboidratos pesados', 'Prefira proteínas magras']
    }
  },
  gain_muscle: {
    breakfast: {
      name: 'Café da Manhã Anabólico',
      time: '07:00',
      calories: 520,
      protein: 35,
      carbs: 55,
      fat: 18,
      ingredients: [
        '3 ovos inteiros',
        '2 fatias de pão integral',
        '1 banana grande',
        '1 copo de leite integral',
        '1 colher de pasta de amendoim'
      ],
      preparation: 'Prepare ovos mexidos. Torre o pão. Corte a banana e adicione pasta de amendoim. Sirva com leite.',
      tips: ['Coma logo após acordar', 'Inclua gorduras boas', 'Hidrate-se bem']
    },
    lunch: {
      name: 'Almoço para Ganho de Massa',
      time: '12:00',
      calories: 750,
      protein: 50,
      carbs: 80,
      fat: 25,
      ingredients: [
        '180g de peito de frango grelhado',
        '1,5 xícara de arroz integral',
        '1 xícara de feijão',
        '1 colher de azeite extra virgem',
        'Salada variada'
      ],
      preparation: 'Grelhe o frango bem temperado. Cozinhe o arroz e feijão. Monte o prato com salada e regue com azeite.',
      tips: ['Varie as proteínas', 'Inclua leguminosas', 'Coma até se sentir satisfeito']
    },
    snack: {
      name: 'Lanche Pré-Treino',
      time: '15:30',
      calories: 380,
      protein: 25,
      carbs: 35,
      fat: 15,
      ingredients: [
        '1 shake de whey protein',
        '1 banana grande',
        '1 colher de aveia',
        '200ml de leite integral',
        '1 colher de mel'
      ],
      preparation: 'Bata todos os ingredientes no liquidificador com gelo. Consuma 30min antes do treino.',
      tips: ['Ideal para pré-treino', 'Ajuste a consistência', 'Beba imediatamente']
    },
    dinner: {
      name: 'Jantar Construtivo',
      time: '19:00',
      calories: 650,
      protein: 45,
      carbs: 50,
      fat: 25,
      ingredients: [
        '180g de carne vermelha magra',
        '1 batata doce média',
        'Legumes grelhados',
        '1 colher de azeite',
        'Temperos naturais'
      ],
      preparation: 'Grelhe a carne no ponto desejado. Asse a batata doce. Grelhe os legumes. Tempere com azeite e ervas.',
      tips: ['Varie os tipos de carne', 'Inclua carboidratos complexos', 'Coma com calma']
    }
  },
  lose_fat_maintain_muscle: {
    breakfast: {
      name: 'Café da Manhã Definição',
      time: '07:00',
      calories: 380,
      protein: 30,
      carbs: 30,
      fat: 15,
      ingredients: [
        '2 ovos inteiros + 2 claras',
        '1 fatia de pão integral',
        '1/2 abacate pequeno',
        '1 copo de leite desnatado',
        'Temperos a gosto'
      ],
      preparation: 'Prepare ovos mexidos. Torre o pão. Amasse o abacate e tempere. Sirva com leite.',
      tips: ['Gorduras boas são essenciais', 'Mantenha proteína alta', 'Evite açúcares']
    },
    lunch: {
      name: 'Almoço para Definição',
      time: '12:00',
      calories: 550,
      protein: 42,
      carbs: 50,
      fat: 18,
      ingredients: [
        '150g de peito de frango',
        '1 xícara de arroz integral',
        '1 xícara de brócolis',
        '1 colher de azeite',
        'Salada verde abundante'
      ],
      preparation: 'Grelhe o frango com temperos. Cozinhe o arroz. Refogue o brócolis. Monte com salada.',
      tips: ['Priorize vegetais', 'Controle as porções', 'Mastigue bem']
    },
    snack: {
      name: 'Lanche Estratégico',
      time: '15:30',
      calories: 220,
      protein: 18,
      carbs: 20,
      fat: 8,
      ingredients: [
        '1 iogurte grego natural',
        '1 scoop de whey protein',
        '1/2 maçã',
        '1 colher de chia',
        'Canela'
      ],
      preparation: 'Misture o whey no iogurte. Corte a maçã. Adicione chia e canela.',
      tips: ['Ideal pós-treino', 'Rica em proteína', 'Baixo em açúcar']
    },
    dinner: {
      name: 'Jantar Definição',
      time: '19:00',
      calories: 420,
      protein: 38,
      carbs: 25,
      fat: 18,
      ingredients: [
        '150g de peixe grelhado',
        'Legumes variados refogados',
        '1/2 xícara de quinoa',
        '1 colher de azeite',
        'Ervas aromáticas'
      ],
      preparation: 'Grelhe o peixe com limão. Refogue os legumes. Cozinhe a quinoa. Tempere com ervas.',
      tips: ['Jantar leve', 'Rico em ômega-3', 'Evite carboidratos simples']
    }
  },
  maintain_weight: {
    breakfast: {
      name: 'Café da Manhã Equilibrado',
      time: '07:00',
      calories: 420,
      protein: 25,
      carbs: 45,
      fat: 16,
      ingredients: [
        '2 ovos inteiros',
        '1 fatia de pão integral',
        '1 banana média',
        '1 copo de leite semi-desnatado',
        '1 colher de geleia sem açúcar'
      ],
      preparation: 'Prepare ovos como preferir. Torre o pão e passe geleia. Corte a banana. Sirva com leite.',
      tips: ['Mantenha regularidade', 'Varie os alimentos', 'Escute seu corpo']
    },
    lunch: {
      name: 'Almoço Balanceado',
      time: '12:00',
      calories: 600,
      protein: 40,
      carbs: 65,
      fat: 20,
      ingredients: [
        '150g de proteína (frango, peixe ou carne)',
        '1 xícara de arroz integral',
        '1/2 xícara de feijão',
        '1 colher de azeite',
        'Salada mista'
      ],
      preparation: 'Prepare a proteína grelhada. Cozinhe arroz e feijão. Monte o prato com salada.',
      tips: ['Varie as proteínas', 'Inclua fibras', 'Coma com prazer']
    },
    snack: {
      name: 'Lanche Nutritivo',
      time: '15:30',
      calories: 280,
      protein: 15,
      carbs: 30,
      fat: 12,
      ingredients: [
        '1 iogurte natural',
        '1 punhado de castanhas',
        '1 fruta da estação',
        '1 colher de granola',
        'Mel a gosto'
      ],
      preparation: 'Misture o iogurte com granola. Corte a fruta. Adicione castanhas e mel.',
      tips: ['Varie as frutas', 'Inclua oleaginosas', 'Aproveite o momento']
    },
    dinner: {
      name: 'Jantar Completo',
      time: '19:00',
      calories: 520,
      protein: 35,
      carbs: 40,
      fat: 22,
      ingredients: [
        '150g de proteína variada',
        '1 porção de carboidrato complexo',
        'Legumes coloridos',
        '1 colher de azeite',
        'Temperos frescos'
      ],
      preparation: 'Prepare a proteína como preferir. Cozinhe o carboidrato. Refogue os legumes.',
      tips: ['Jante com a família', 'Varie os sabores', 'Coma sem pressa']
    }
  }
};

export function generateConsistentMealPlan(personalData: PersonalData): Meal[] {
  const userHash = generateUserHash(personalData);
  const goal = personalData.goal;
  
  // Usar o hash para garantir consistência
  const templates = mealTemplates[goal] || mealTemplates.maintain_weight;
  
  return [
    {
      id: `${userHash}-breakfast`,
      ...templates.breakfast
    },
    {
      id: `${userHash}-lunch`,
      ...templates.lunch
    },
    {
      id: `${userHash}-snack`,
      ...templates.snack
    },
    {
      id: `${userHash}-dinner`,
      ...templates.dinner
    }
  ];
}

export function getForbiddenFoods(goal: string): string[] {
  const forbiddenFoodsMap = {
    lose_weight: [
      'Doces em geral',
      'Refrigerantes',
      'Frituras',
      'Alimentos processados',
      'Bebidas alcoólicas',
      'Fast food',
      'Biscoitos recheados'
    ],
    gain_muscle: [
      'Junk food',
      'Refrigerantes',
      'Doces industrializados',
      'Alimentos muito processados',
      'Bebidas alcoólicas em excesso'
    ],
    lose_fat_maintain_muscle: [
      'Açúcar refinado',
      'Carboidratos simples',
      'Frituras',
      'Processados com muito sódio',
      'Bebidas açucaradas',
      'Doces industrializados'
    ],
    maintain_weight: [
      'Excesso de açúcar',
      'Alimentos muito processados',
      'Frituras em excesso',
      'Refrigerantes diários',
      'Fast food frequente'
    ]
  };
  
  return forbiddenFoodsMap[goal] || forbiddenFoodsMap.maintain_weight;
}