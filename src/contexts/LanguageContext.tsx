import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en' | 'es' | 'fr' | 'de' | 'it' | 'ja' | 'ko' | 'zh' | 'ru';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pt: {
    // App
    appName: 'Seu Corpo Ideal',
    appDescription: 'Transforme sua vida com IA personalizada',
    
    // Welcome Screen
    step: 'Passo',
    of: 'de',
    letsStart: 'Vamos começar!',
    whatToCallYou: 'Como posso te chamar?',
    selectLanguage: 'Selecione seu idioma',
    yourName: 'Seu nome',
    fullNamePlaceholder: 'Seu nome completo',
    great: 'Ótimo',
    letsDefineYourPlan: 'Vamos definir seu plano agora.',
    
    // Body Data
    bodyData: 'Dados Corporais',
    needToKnowYouBetter: 'Preciso conhecer você melhor',
    height: 'Altura',
    weight: 'Peso',
    age: 'Idade',
    gender: 'Gênero',
    select: 'Selecione',
    male: 'Masculino',
    female: 'Feminino',
    
    // Activity Level
    activityLevel: 'Nível de Atividade',
    exerciseRoutine: 'Como é sua rotina de exercícios?',
    sedentary: 'Sedentário',
    sedentaryDesc: 'Pouco ou nenhum exercício',
    lightlyActive: 'Levemente Ativo',
    lightlyActiveDesc: 'Exercício leve 1-3 dias/semana',
    moderatelyActive: 'Moderadamente Ativo',
    moderatelyActiveDesc: 'Exercício moderado 3-5 dias/semana',
    veryActive: 'Muito Ativo',
    veryActiveDesc: 'Exercício intenso 6-7 dias/semana',
    extraActive: 'Extremamente Ativo',
    extraActiveDesc: 'Exercício muito intenso, trabalho físico',
    
    // Goals
    yourGoal: 'Seu Objetivo',
    whatToAchieve: 'O que você quer alcançar?',
    loseWeight: 'Perder Peso',
    loseWeightDesc: 'Reduzir peso corporal total',
    gainMuscle: 'Ganhar Massa Muscular',
    gainMuscleDesc: 'Aumentar massa magra',
    loseFatMaintainMuscle: 'Perder Gordura e Manter Músculo',
    loseFatMaintainMuscleDesc: 'Definição corporal',
    maintainWeight: 'Manter Peso',
    maintainWeightDesc: 'Manter peso atual e melhorar composição',
    
    // Navigation
    back: 'Voltar',
    next: 'Próximo',
    finish: 'Finalizar',
    
    // Dashboard
    hello: 'Olá',
    transformYourLife: 'Vamos transformar sua vida hoje',
    unlimitedCoins: 'Acesso Ilimitado',
    coins: 'Acesso',
    premiumPlanActive: 'Acesso Completo Ativo',
    freeTrial: 'Teste Grátis',
    upgradePremium: 'Fazer Upgrade',
    premium: 'Completo',
    
    // Tabs
    metrics: 'Métricas',
    meals: 'Refeições',
    aiNutritional: 'IA Nutricional',
    progress: 'Progresso',
    plans: 'Planos',
    
    // AI Chat
    aiGreeting: 'Olá',
    aiIntroduction: 'Sou sua IA Nutricional personalizada. Posso ajudar com dúvidas sobre alimentação, receitas saudáveis, substituições de ingredientes e muito mais. Como posso te ajudar hoje?',
    
    // Health Metrics
    bmi: 'IMC',
    bmr: 'Taxa Metabólica Basal',
    dailyCalories: 'Gasto Diário',
    targetCalories: 'Meta Calórica Diária',
    idealWeight: 'Peso Ideal',
    currentWeight: 'Peso Atual',
    bodyFat: 'Gordura Corporal',
    muscleMass: 'Massa Muscular',
    waistMeasure: 'Medida Cintura',
    
    // Meal Plan
    personalizedMealPlan: 'Plano Alimentar Personalizado',
    totalCalories: 'Calorias Totais',
    meals: 'Refeições',
    proteins: 'Proteínas',
    forbiddenFoods: 'Alimentos a Evitar',
    
    // Progress Tracker
    progressEvolution: 'Evolução das Medições',
    newMeasurement: 'Nova Medição',
    achievements: 'Conquistas',
    
    // Pricing
    premiumPlan: 'Acesso Completo',
    specialOffer: 'Oferta Especial',
    month: 'mês',
    activatePremium: 'Ativar Acesso Completo',
    
    // Dashboard warnings
    coinsRunningOut: 'Seu acesso está limitado!',
    remaining: 'restantes',
    upgradeForUnlimited: 'Faça upgrade para o Acesso Completo e tenha funcionalidades ilimitadas por apenas R$ 27',
    coinsFinished: 'Seu teste grátis acabou!',
    upgradeToUseFunctionalities: 'Para continuar usando todas as funcionalidades, adquira o Acesso Completo',
    viewPremiumPlans: 'Ver Planos de Acesso',
    
    // Health Metrics additional
    underweight: 'Abaixo do peso',
    normalWeight: 'Peso normal',
    overweight: 'Sobrepeso',
    obesity: 'Obesidade',
    calorieDeficitForWeightLoss: 'Déficit calórico para perda de peso',
    calorieSurplusForMuscleGain: 'Superávit calórico para ganho de massa',
    moderateDeficitForDefinition: 'Déficit moderado para definição',
    currentWeightMaintenance: 'Manutenção do peso atual'
  },
  
  en: {
    // App
    appName: 'Your Ideal Body',
    appDescription: 'Transform your life with personalized AI',
    
    // Welcome Screen
    step: 'Step',
    of: 'of',
    letsStart: "Let's get started!",
    whatToCallYou: 'What should I call you?',
    selectLanguage: 'Select your language',
    yourName: 'Your name',
    fullNamePlaceholder: 'Your full name',
    great: 'Great',
    letsDefineYourPlan: "Let's define your plan now.",
    
    // Body Data
    bodyData: 'Body Data',
    needToKnowYouBetter: 'I need to know you better',
    height: 'Height',
    weight: 'Weight',
    age: 'Age',
    gender: 'Gender',
    select: 'Select',
    male: 'Male',
    female: 'Female',
    
    // Activity Level
    activityLevel: 'Activity Level',
    exerciseRoutine: "What's your exercise routine like?",
    sedentary: 'Sedentary',
    sedentaryDesc: 'Little or no exercise',
    lightlyActive: 'Lightly Active',
    lightlyActiveDesc: 'Light exercise 1-3 days/week',
    moderatelyActive: 'Moderately Active',
    moderatelyActiveDesc: 'Moderate exercise 3-5 days/week',
    veryActive: 'Very Active',
    veryActiveDesc: 'Intense exercise 6-7 days/week',
    extraActive: 'Extremely Active',
    extraActiveDesc: 'Very intense exercise, physical work',
    
    // Goals
    yourGoal: 'Your Goal',
    whatToAchieve: 'What do you want to achieve?',
    loseWeight: 'Lose Weight',
    loseWeightDesc: 'Reduce total body weight',
    gainMuscle: 'Gain Muscle Mass',
    gainMuscleDesc: 'Increase lean mass',
    loseFatMaintainMuscle: 'Lose Fat and Maintain Muscle',
    loseFatMaintainMuscleDesc: 'Body definition',
    maintainWeight: 'Maintain Weight',
    maintainWeightDesc: 'Maintain current weight and improve composition',
    
    // Navigation
    back: 'Back',
    next: 'Next',
    finish: 'Finish',
    
    // Dashboard
    hello: 'Hello',
    transformYourLife: "Let's transform your life today",
    unlimitedCoins: 'Unlimited Coins',
    coins: 'Coins',
    premiumPlanActive: 'Premium Plan Active',
    freeTrial: 'Free Trial',
    upgradePremium: 'Upgrade Premium',
    premium: 'Premium',
    
    // Tabs
    metrics: 'Metrics',
    meals: 'Meals',
    aiNutritional: 'AI Nutritional',
    progress: 'Progress',
    plans: 'Plans',
    
    // AI Chat
    aiGreeting: 'Hello',
    aiIntroduction: 'I am your personalized Nutritional AI. I can help with questions about nutrition, healthy recipes, ingredient substitutions and much more. How can I help you today?',
    
    // Health Metrics
    bmi: 'BMI',
    bmr: 'Basal Metabolic Rate',
    dailyCalories: 'Daily Expenditure',
    targetCalories: 'Daily Caloric Target',
    idealWeight: 'Ideal Weight',
    currentWeight: 'Current Weight',
    bodyFat: 'Body Fat',
    muscleMass: 'Muscle Mass',
    waistMeasure: 'Waist Measure',
    
    // Meal Plan
    personalizedMealPlan: 'Personalized Meal Plan',
    totalCalories: 'Total Calories',
    meals: 'Meals',
    proteins: 'Proteins',
    forbiddenFoods: 'Foods to Avoid',
    
    // Progress Tracker
    progressEvolution: 'Measurement Evolution',
    newMeasurement: 'New Measurement',
    achievements: 'Achievements',
    
    // Pricing
    premiumPlan: 'Premium Plan',
    specialOffer: 'Special Offer',
    month: 'month',
    activatePremium: 'Activate Premium',
    
    // Dashboard warnings
    coinsRunningOut: 'Your coins are running out!',
    remaining: 'remaining',
    upgradeForUnlimited: 'Upgrade to Premium and get unlimited access for just €15/month',
    coinsFinished: 'Your coins are finished!',
    upgradeToUseFunctionalities: 'To continue using all functionalities, upgrade to Premium Plan',
    viewPremiumPlans: 'View Premium Plans',
    
    // Health Metrics additional
    underweight: 'Underweight',
    normalWeight: 'Normal weight',
    overweight: 'Overweight',
    obesity: 'Obesity',
    calorieDeficitForWeightLoss: 'Calorie deficit for weight loss',
    calorieSurplusForMuscleGain: 'Calorie surplus for muscle gain',
    moderateDeficitForDefinition: 'Moderate deficit for definition',
    currentWeightMaintenance: 'Current weight maintenance'
  },
  
  es: {
    // App
    appName: 'Tu Cuerpo Ideal',
    appDescription: 'Transforma tu vida con IA personalizada',
    
    // Welcome Screen
    step: 'Paso',
    of: 'de',
    letsStart: '¡Empecemos!',
    whatToCallYou: '¿Cómo puedo llamarte?',
    selectLanguage: 'Selecciona tu idioma',
    yourName: 'Tu nombre',
    fullNamePlaceholder: 'Tu nombre completo',
    great: 'Genial',
    letsDefineYourPlan: 'Definamos tu plan ahora.',
    
    // Body Data
    bodyData: 'Datos Corporales',
    needToKnowYouBetter: 'Necesito conocerte mejor',
    height: 'Altura',
    weight: 'Peso',
    age: 'Edad',
    gender: 'Género',
    select: 'Seleccionar',
    male: 'Masculino',
    female: 'Femenino',
    
    // Activity Level
    activityLevel: 'Nivel de Actividad',
    exerciseRoutine: '¿Cómo es tu rutina de ejercicios?',
    sedentary: 'Sedentario',
    sedentaryDesc: 'Poco o ningún ejercicio',
    lightlyActive: 'Ligeramente Activo',
    lightlyActiveDesc: 'Ejercicio ligero 1-3 días/semana',
    moderatelyActive: 'Moderadamente Activo',
    moderatelyActiveDesc: 'Ejercicio moderado 3-5 días/semana',
    veryActive: 'Muy Activo',
    veryActiveDesc: 'Ejercicio intenso 6-7 días/semana',
    extraActive: 'Extremadamente Activo',
    extraActiveDesc: 'Ejercicio muy intenso, trabajo físico',
    
    // Goals
    yourGoal: 'Tu Objetivo',
    whatToAchieve: '¿Qué quieres lograr?',
    loseWeight: 'Perder Peso',
    loseWeightDesc: 'Reducir peso corporal total',
    gainMuscle: 'Ganar Masa Muscular',
    gainMuscleDesc: 'Aumentar masa magra',
    loseFatMaintainMuscle: 'Perder Grasa y Mantener Músculo',
    loseFatMaintainMuscleDesc: 'Definición corporal',
    maintainWeight: 'Mantener Peso',
    maintainWeightDesc: 'Mantener peso actual y mejorar composición',
    
    // Navigation
    back: 'Atrás',
    next: 'Siguiente',
    finish: 'Finalizar',
    
    // Dashboard
    hello: 'Hola',
    transformYourLife: 'Transformemos tu vida hoy',
    unlimitedCoins: 'Monedas Ilimitadas',
    coins: 'Monedas',
    premiumPlanActive: 'Plan Premium Activo',
    freeTrial: 'Prueba Gratuita',
    upgradePremium: 'Actualizar Premium',
    premium: 'Premium',
    
    // Tabs
    metrics: 'Métricas',
    meals: 'Comidas',
    aiNutritional: 'IA Nutricional',
    progress: 'Progreso',
    plans: 'Planes',
    
    // AI Chat
    aiGreeting: 'Hola',
    aiIntroduction: 'Soy tu IA Nutricional personalizada. Puedo ayudar con preguntas sobre alimentación, recetas saludables, sustituciones de ingredientes y mucho más. ¿Cómo puedo ayudarte hoy?',
    
    // Health Metrics
    bmi: 'IMC',
    bmr: 'Tasa Metabólica Basal',
    dailyCalories: 'Gasto Diario',
    targetCalories: 'Meta Calórica Diaria',
    idealWeight: 'Peso Ideal',
    currentWeight: 'Peso Actual',
    bodyFat: 'Grasa Corporal',
    muscleMass: 'Masa Muscular',
    waistMeasure: 'Medida Cintura',
    
    // Meal Plan
    personalizedMealPlan: 'Plan de Comidas Personalizado',
    totalCalories: 'Calorías Totales',
    meals: 'Comidas',
    proteins: 'Proteínas',
    forbiddenFoods: 'Alimentos a Evitar',
    
    // Progress Tracker
    progressEvolution: 'Evolución de Mediciones',
    newMeasurement: 'Nueva Medición',
    achievements: 'Logros',
    
    // Pricing
    premiumPlan: 'Plan Premium',
    specialOffer: 'Oferta Especial',
    month: 'mes',
    activatePremium: 'Activar Premium',
    
    // Dashboard warnings
    coinsRunningOut: '¡Tus monedas se están agotando!',
    remaining: 'restantes',
    upgradeForUnlimited: 'Actualiza a Premium y obtén acceso ilimitado por solo €15/mes',
    coinsFinished: '¡Tus monedas se han agotado!',
    upgradeToUseFunctionalities: 'Para continuar usando todas las funcionalidades, actualiza al Plan Premium',
    viewPremiumPlans: 'Ver Planes Premium',
    
    // Health Metrics additional
    underweight: 'Bajo peso',
    normalWeight: 'Peso normal',
    overweight: 'Sobrepeso',
    obesity: 'Obesidad',
    calorieDeficitForWeightLoss: 'Déficit calórico para pérdida de peso',
    calorieSurplusForMuscleGain: 'Superávit calórico para ganancia muscular',
    moderateDeficitForDefinition: 'Déficit moderado para definición',
    currentWeightMaintenance: 'Mantenimiento del peso actual'
  },
  
  fr: {
    // App
    appName: 'Votre Corps Idéal',
    appDescription: 'Transformez votre vie avec une IA personnalisée',
    
    // Welcome Screen
    step: 'Étape',
    of: 'sur',
    letsStart: 'Commençons !',
    whatToCallYou: 'Comment puis-je vous appeler ?',
    selectLanguage: 'Sélectionnez votre langue',
    yourName: 'Votre nom',
    fullNamePlaceholder: 'Votre nom complet',
    great: 'Parfait',
    letsDefineYourPlan: 'Définissons votre plan maintenant.',
    
    // Body Data
    bodyData: 'Données Corporelles',
    needToKnowYouBetter: 'Je dois mieux vous connaître',
    height: 'Taille',
    weight: 'Poids',
    age: 'Âge',
    gender: 'Genre',
    select: 'Sélectionner',
    male: 'Masculin',
    female: 'Féminin',
    
    // Activity Level
    activityLevel: "Niveau d'Activité",
    exerciseRoutine: 'Comment est votre routine d\'exercice ?',
    sedentary: 'Sédentaire',
    sedentaryDesc: 'Peu ou pas d\'exercice',
    lightlyActive: 'Légèrement Actif',
    lightlyActiveDesc: 'Exercice léger 1-3 jours/semaine',
    moderatelyActive: 'Modérément Actif',
    moderatelyActiveDesc: 'Exercice modéré 3-5 jours/semaine',
    veryActive: 'Très Actif',
    veryActiveDesc: 'Exercice intense 6-7 jours/semaine',
    extraActive: 'Extrêmement Actif',
    extraActiveDesc: 'Exercice très intense, travail physique',
    
    // Goals
    yourGoal: 'Votre Objectif',
    whatToAchieve: 'Que voulez-vous atteindre ?',
    loseWeight: 'Perdre du Poids',
    loseWeightDesc: 'Réduire le poids corporel total',
    gainMuscle: 'Gagner de la Masse Musculaire',
    gainMuscleDesc: 'Augmenter la masse maigre',
    loseFatMaintainMuscle: 'Perdre de la Graisse et Maintenir le Muscle',
    loseFatMaintainMuscleDesc: 'Définition corporelle',
    maintainWeight: 'Maintenir le Poids',
    maintainWeightDesc: 'Maintenir le poids actuel et améliorer la composition',
    
    // Navigation
    back: 'Retour',
    next: 'Suivant',
    finish: 'Terminer',
    
    // Dashboard
    hello: 'Bonjour',
    transformYourLife: 'Transformons votre vie aujourd\'hui',
    unlimitedCoins: 'Pièces Illimitées',
    coins: 'Pièces',
    premiumPlanActive: 'Plan Premium Actif',
    freeTrial: 'Essai Gratuit',
    upgradePremium: 'Mise à niveau Premium',
    premium: 'Premium',
    
    // Tabs
    metrics: 'Métriques',
    meals: 'Repas',
    aiNutritional: 'IA Nutritionnelle',
    progress: 'Progrès',
    plans: 'Plans',
    
    // AI Chat
    aiGreeting: 'Bonjour',
    aiIntroduction: 'Je suis votre IA Nutritionnelle personnalisée. Je peux vous aider avec des questions sur l\'alimentation, des recettes saines, des substitutions d\'ingrédients et bien plus encore. Comment puis-je vous aider aujourd\'hui ?',
    
    // Health Metrics
    bmi: 'IMC',
    bmr: 'Taux Métabolique de Base',
    dailyCalories: 'Dépense Quotidienne',
    targetCalories: 'Objectif Calorique Quotidien',
    idealWeight: 'Poids Idéal',
    currentWeight: 'Poids Actuel',
    bodyFat: 'Graisse Corporelle',
    muscleMass: 'Masse Musculaire',
    waistMeasure: 'Tour de Taille',
    
    // Meal Plan
    personalizedMealPlan: 'Plan de Repas Personnalisé',
    totalCalories: 'Calories Totales',
    meals: 'Repas',
    proteins: 'Protéines',
    forbiddenFoods: 'Aliments à Éviter',
    
    // Progress Tracker
    progressEvolution: 'Évolution des Mesures',
    newMeasurement: 'Nouvelle Mesure',
    achievements: 'Réalisations',
    
    // Pricing
    premiumPlan: 'Plan Premium',
    specialOffer: 'Offre Spéciale',
    month: 'mois',
    activatePremium: 'Activer Premium',
    
    // Dashboard warnings
    coinsRunningOut: 'Vos pièces s\'épuisent !',
    remaining: 'restantes',
    upgradeForUnlimited: 'Passez au Premium et obtenez un accès illimité pour seulement 15€/mois',
    coinsFinished: 'Vos pièces sont épuisées !',
    upgradeToUseFunctionalities: 'Pour continuer à utiliser toutes les fonctionnalités, passez au Plan Premium',
    viewPremiumPlans: 'Voir les Plans Premium',
    
    // Health Metrics additional
    underweight: 'Insuffisance pondérale',
    normalWeight: 'Poids normal',
    overweight: 'Surpoids',
    obesity: 'Obésité',
    calorieDeficitForWeightLoss: 'Déficit calorique pour perte de poids',
    calorieSurplusForMuscleGain: 'Surplus calorique pour gain musculaire',
    moderateDeficitForDefinition: 'Déficit modéré pour définition',
    currentWeightMaintenance: 'Maintien du poids actuel'
  },
  
  de: {
    // App
    appName: 'Ihr Idealer Körper',
    appDescription: 'Verwandeln Sie Ihr Leben mit personalisierter KI',
    
    // Welcome Screen
    step: 'Schritt',
    of: 'von',
    letsStart: 'Lassen Sie uns anfangen!',
    whatToCallYou: 'Wie soll ich Sie nennen?',
    selectLanguage: 'Wählen Sie Ihre Sprache',
    yourName: 'Ihr Name',
    fullNamePlaceholder: 'Ihr vollständiger Name',
    great: 'Großartig',
    letsDefineYourPlan: 'Lassen Sie uns jetzt Ihren Plan definieren.',
    
    // Body Data
    bodyData: 'Körperdaten',
    needToKnowYouBetter: 'Ich muss Sie besser kennenlernen',
    height: 'Größe',
    weight: 'Gewicht',
    age: 'Alter',
    gender: 'Geschlecht',
    select: 'Auswählen',
    male: 'Männlich',
    female: 'Weiblich',
    
    // Activity Level
    activityLevel: 'Aktivitätslevel',
    exerciseRoutine: 'Wie ist Ihre Trainingsroutine?',
    sedentary: 'Sitzend',
    sedentaryDesc: 'Wenig oder keine Bewegung',
    lightlyActive: 'Leicht Aktiv',
    lightlyActiveDesc: 'Leichte Bewegung 1-3 Tage/Woche',
    moderatelyActive: 'Mäßig Aktiv',
    moderatelyActiveDesc: 'Mäßige Bewegung 3-5 Tage/Woche',
    veryActive: 'Sehr Aktiv',
    veryActiveDesc: 'Intensive Bewegung 6-7 Tage/Woche',
    extraActive: 'Extrem Aktiv',
    extraActiveDesc: 'Sehr intensive Bewegung, körperliche Arbeit',
    
    // Goals
    yourGoal: 'Ihr Ziel',
    whatToAchieve: 'Was möchten Sie erreichen?',
    loseWeight: 'Gewicht Verlieren',
    loseWeightDesc: 'Gesamtkörpergewicht reduzieren',
    gainMuscle: 'Muskelmasse Aufbauen',
    gainMuscleDesc: 'Magermasse erhöhen',
    loseFatMaintainMuscle: 'Fett Verlieren und Muskeln Erhalten',
    loseFatMaintainMuscleDesc: 'Körperdefinition',
    maintainWeight: 'Gewicht Halten',
    maintainWeightDesc: 'Aktuelles Gewicht halten und Zusammensetzung verbessern',
    
    // Navigation
    back: 'Zurück',
    next: 'Weiter',
    finish: 'Beenden',
    
    // Dashboard
    hello: 'Hallo',
    transformYourLife: 'Lassen Sie uns heute Ihr Leben verwandeln',
    unlimitedCoins: 'Unbegrenzte Münzen',
    coins: 'Münzen',
    premiumPlanActive: 'Premium-Plan Aktiv',
    freeTrial: 'Kostenlose Testversion',
    upgradePremium: 'Premium Upgrade',
    premium: 'Premium',
    
    // Tabs
    metrics: 'Metriken',
    meals: 'Mahlzeiten',
    aiNutritional: 'KI Ernährung',
    progress: 'Fortschritt',
    plans: 'Pläne',
    
    // AI Chat
    aiGreeting: 'Hallo',
    aiIntroduction: 'Ich bin Ihre personalisierte Ernährungs-KI. Ich kann bei Fragen zur Ernährung, gesunden Rezepten, Zutatenaustausch und vielem mehr helfen. Wie kann ich Ihnen heute helfen?',
    
    // Health Metrics
    bmi: 'BMI',
    bmr: 'Grundumsatz',
    dailyCalories: 'Täglicher Verbrauch',
    targetCalories: 'Tägliches Kalorienziel',
    idealWeight: 'Idealgewicht',
    currentWeight: 'Aktuelles Gewicht',
    bodyFat: 'Körperfett',
    muscleMass: 'Muskelmasse',
    waistMeasure: 'Taillenumfang',
    
    // Meal Plan
    personalizedMealPlan: 'Personalisierter Ernährungsplan',
    totalCalories: 'Gesamtkalorien',
    meals: 'Mahlzeiten',
    proteins: 'Proteine',
    forbiddenFoods: 'Zu vermeidende Lebensmittel',
    
    // Progress Tracker
    progressEvolution: 'Messungsentwicklung',
    newMeasurement: 'Neue Messung',
    achievements: 'Erfolge',
    
    // Pricing
    premiumPlan: 'Premium-Plan',
    specialOffer: 'Sonderangebot',
    month: 'Monat',
    activatePremium: 'Premium Aktivieren',
    
    // Dashboard warnings
    coinsRunningOut: 'Ihre Münzen gehen zur Neige!',
    remaining: 'verbleibend',
    upgradeForUnlimited: 'Upgraden Sie auf Premium und erhalten Sie unbegrenzten Zugang für nur 15€/Monat',
    coinsFinished: 'Ihre Münzen sind aufgebraucht!',
    upgradeToUseFunctionalities: 'Um alle Funktionen weiter nutzen zu können, upgraden Sie auf den Premium-Plan',
    viewPremiumPlans: 'Premium-Pläne Anzeigen',
    
    // Health Metrics additional
    underweight: 'Untergewicht',
    normalWeight: 'Normalgewicht',
    overweight: 'Übergewicht',
    obesity: 'Adipositas',
    calorieDeficitForWeightLoss: 'Kaloriendefizit für Gewichtsverlust',
    calorieSurplusForMuscleGain: 'Kalorienüberschuss für Muskelaufbau',
    moderateDeficitForDefinition: 'Moderates Defizit für Definition',
    currentWeightMaintenance: 'Aktuelles Gewicht halten'
  },
  
  it: {
    // App
    appName: 'Il Tuo Corpo Ideale',
    appDescription: 'Trasforma la tua vita con IA personalizzata',
    
    // Welcome Screen
    step: 'Passo',
    of: 'di',
    letsStart: 'Iniziamo!',
    whatToCallYou: 'Come posso chiamarti?',
    selectLanguage: 'Seleziona la tua lingua',
    yourName: 'Il tuo nome',
    fullNamePlaceholder: 'Il tuo nome completo',
    great: 'Ottimo',
    letsDefineYourPlan: 'Definiamo il tuo piano ora.',
    
    // Body Data
    bodyData: 'Dati Corporei',
    needToKnowYouBetter: 'Ho bisogno di conoscerti meglio',
    height: 'Altezza',
    weight: 'Peso',
    age: 'Età',
    gender: 'Genere',
    select: 'Seleziona',
    male: 'Maschio',
    female: 'Femmina',
    
    // Activity Level
    activityLevel: 'Livello di Attività',
    exerciseRoutine: 'Com\'è la tua routine di esercizi?',
    sedentary: 'Sedentario',
    sedentaryDesc: 'Poco o nessun esercizio',
    lightlyActive: 'Leggermente Attivo',
    lightlyActiveDesc: 'Esercizio leggero 1-3 giorni/settimana',
    moderatelyActive: 'Moderatamente Attivo',
    moderatelyActiveDesc: 'Esercizio moderato 3-5 giorni/settimana',
    veryActive: 'Molto Attivo',
    veryActiveDesc: 'Esercizio intenso 6-7 giorni/settimana',
    extraActive: 'Estremamente Attivo',
    extraActiveDesc: 'Esercizio molto intenso, lavoro fisico',
    
    // Goals
    yourGoal: 'Il Tuo Obiettivo',
    whatToAchieve: 'Cosa vuoi raggiungere?',
    loseWeight: 'Perdere Peso',
    loseWeightDesc: 'Ridurre il peso corporeo totale',
    gainMuscle: 'Guadagnare Massa Muscolare',
    gainMuscleDesc: 'Aumentare la massa magra',
    loseFatMaintainMuscle: 'Perdere Grasso e Mantenere Muscolo',
    loseFatMaintainMuscleDesc: 'Definizione corporea',
    maintainWeight: 'Mantenere Peso',
    maintainWeightDesc: 'Mantenere il peso attuale e migliorare la composizione',
    
    // Navigation
    back: 'Indietro',
    next: 'Avanti',
    finish: 'Finire',
    
    // Dashboard
    hello: 'Ciao',
    transformYourLife: 'Trasformiamo la tua vita oggi',
    unlimitedCoins: 'Monete Illimitate',
    coins: 'Monete',
    premiumPlanActive: 'Piano Premium Attivo',
    freeTrial: 'Prova Gratuita',
    upgradePremium: 'Aggiorna Premium',
    premium: 'Premium',
    
    // Tabs
    metrics: 'Metriche',
    meals: 'Pasti',
    aiNutritional: 'IA Nutrizionale',
    progress: 'Progresso',
    plans: 'Piani',
    
    // AI Chat
    aiGreeting: 'Ciao',
    aiIntroduction: 'Sono la tua IA Nutrizionale personalizzata. Posso aiutare con domande sull\'alimentazione, ricette salutari, sostituzioni di ingredienti e molto altro. Come posso aiutarti oggi?',
    
    // Health Metrics
    bmi: 'IMC',
    bmr: 'Tasso Metabolico Basale',
    dailyCalories: 'Spesa Giornaliera',
    targetCalories: 'Obiettivo Calorico Giornaliero',
    idealWeight: 'Peso Ideale',
    currentWeight: 'Peso Attuale',
    bodyFat: 'Grasso Corporeo',
    muscleMass: 'Massa Muscolare',
    waistMeasure: 'Misura Vita',
    
    // Meal Plan
    personalizedMealPlan: 'Piano Pasti Personalizzato',
    totalCalories: 'Calorie Totali',
    meals: 'Pasti',
    proteins: 'Proteine',
    forbiddenFoods: 'Cibi da Evitare',
    
    // Progress Tracker
    progressEvolution: 'Evoluzione Misurazioni',
    newMeasurement: 'Nuova Misurazione',
    achievements: 'Risultati',
    
    // Pricing
    premiumPlan: 'Piano Premium',
    specialOffer: 'Offerta Speciale',
    month: 'mese',
    activatePremium: 'Attiva Premium',
    
    // Dashboard warnings
    coinsRunningOut: 'Le tue monete stanno finendo!',
    remaining: 'rimanenti',
    upgradeForUnlimited: 'Passa al Premium e ottieni accesso illimitato per soli €15/mese',
    coinsFinished: 'Le tue monete sono finite!',
    upgradeToUseFunctionalities: 'Per continuare a utilizzare tutte le funzionalità, passa al Piano Premium',
    viewPremiumPlans: 'Visualizza Piani Premium',
    
    // Health Metrics additional
    underweight: 'Sottopeso',
    normalWeight: 'Peso normale',
    overweight: 'Sovrappeso',
    obesity: 'Obesità',
    calorieDeficitForWeightLoss: 'Deficit calorico per perdita di peso',
    calorieSurplusForMuscleGain: 'Surplus calorico per guadagno muscolare',
    moderateDeficitForDefinition: 'Deficit moderato per definizione',
    currentWeightMaintenance: 'Mantenimento peso attuale'
  },
  
  ja: {
    // App
    appName: 'あなたの理想の体',
    appDescription: 'パーソナライズされたAIで人生を変革',
    
    // Welcome Screen
    step: 'ステップ',
    of: '/',
    letsStart: '始めましょう！',
    whatToCallYou: 'お名前を教えてください',
    selectLanguage: '言語を選択',
    yourName: 'お名前',
    fullNamePlaceholder: 'フルネーム',
    great: '素晴らしい',
    letsDefineYourPlan: 'プランを決めましょう。',
    
    // Body Data
    bodyData: '身体データ',
    needToKnowYouBetter: 'あなたをもっと知る必要があります',
    height: '身長',
    weight: '体重',
    age: '年齢',
    gender: '性別',
    select: '選択',
    male: '男性',
    female: '女性',
    
    // Activity Level
    activityLevel: '活動レベル',
    exerciseRoutine: '運動習慣はいかがですか？',
    sedentary: '座りがち',
    sedentaryDesc: 'ほとんど運動しない',
    lightlyActive: '軽度活動的',
    lightlyActiveDesc: '軽い運動 週1-3日',
    moderatelyActive: '中程度活動的',
    moderatelyActiveDesc: '中程度の運動 週3-5日',
    veryActive: '非常に活動的',
    veryActiveDesc: '激しい運動 週6-7日',
    extraActive: '極めて活動的',
    extraActiveDesc: '非常に激しい運動、肉体労働',
    
    // Goals
    yourGoal: 'あなたの目標',
    whatToAchieve: '何を達成したいですか？',
    loseWeight: '体重減少',
    loseWeightDesc: '総体重を減らす',
    gainMuscle: '筋肉量増加',
    gainMuscleDesc: '除脂肪量を増やす',
    loseFatMaintainMuscle: '脂肪減少・筋肉維持',
    loseFatMaintainMuscleDesc: '体の引き締め',
    maintainWeight: '体重維持',
    maintainWeightDesc: '現在の体重を維持し、体組成を改善',
    
    // Navigation
    back: '戻る',
    next: '次へ',
    finish: '完了',
    
    // Dashboard
    hello: 'こんにちは',
    transformYourLife: '今日から人生を変えましょう',
    unlimitedCoins: '無制限コイン',
    coins: 'コイン',
    premiumPlanActive: 'プレミアムプラン有効',
    freeTrial: '無料トライアル',
    upgradePremium: 'プレミアムアップグレード',
    premium: 'プレミアム',
    
    // Tabs
    metrics: 'メトリクス',
    meals: '食事',
    aiNutritional: 'AI栄養',
    progress: '進捗',
    plans: 'プラン',
    
    // AI Chat
    aiGreeting: 'こんにちは',
    aiIntroduction: 'パーソナライズされた栄養AIです。食事、健康的なレシピ、食材の代替などに関する質問にお答えできます。今日はどのようにお手伝いできますか？',
    
    // Health Metrics
    bmi: 'BMI',
    bmr: '基礎代謝率',
    dailyCalories: '1日の消費',
    targetCalories: '1日のカロリー目標',
    idealWeight: '理想体重',
    currentWeight: '現在の体重',
    bodyFat: '体脂肪',
    muscleMass: '筋肉量',
    waistMeasure: 'ウエスト',
    
    // Meal Plan
    personalizedMealPlan: 'パーソナライズされた食事プラン',
    totalCalories: '総カロリー',
    meals: '食事',
    proteins: 'タンパク質',
    forbiddenFoods: '避けるべき食品',
    
    // Progress Tracker
    progressEvolution: '測定の推移',
    newMeasurement: '新しい測定',
    achievements: '達成',
    
    // Pricing
    premiumPlan: 'プレミアムプラン',
    specialOffer: '特別オファー',
    month: '月',
    activatePremium: 'プレミアム有効化',
    
    // Dashboard warnings
    coinsRunningOut: 'コインが不足しています！',
    remaining: '残り',
    upgradeForUnlimited: 'プレミアムにアップグレードして月額€15で無制限アクセスを取得',
    coinsFinished: 'コインが尽きました！',
    upgradeToUseFunctionalities: 'すべての機能を引き続き使用するには、プレミアムプランにアップグレードしてください',
    viewPremiumPlans: 'プレミアムプランを表示',
    
    // Health Metrics additional
    underweight: '低体重',
    normalWeight: '標準体重',
    overweight: '過体重',
    obesity: '肥満',
    calorieDeficitForWeightLoss: '体重減少のためのカロリー不足',
    calorieSurplusForMuscleGain: '筋肉増加のためのカロリー過剰',
    moderateDeficitForDefinition: '体型改善のための適度な不足',
    currentWeightMaintenance: '現在の体重維持'
  },
  
  ko: {
    // App
    appName: '당신의 이상적인 몸',
    appDescription: '개인화된 AI로 인생을 변화시키세요',
    
    // Welcome Screen
    step: '단계',
    of: '/',
    letsStart: '시작해봅시다!',
    whatToCallYou: '어떻게 불러드릴까요?',
    selectLanguage: '언어 선택',
    yourName: '성함',
    fullNamePlaceholder: '전체 이름',
    great: '훌륭합니다',
    letsDefineYourPlan: '이제 계획을 세워봅시다.',
    
    // Body Data
    bodyData: '신체 데이터',
    needToKnowYouBetter: '당신을 더 잘 알아야 합니다',
    height: '키',
    weight: '몸무게',
    age: '나이',
    gender: '성별',
    select: '선택',
    male: '남성',
    female: '여성',
    
    // Activity Level
    activityLevel: '활동 수준',
    exerciseRoutine: '운동 루틴은 어떻게 되시나요?',
    sedentary: '좌식 생활',
    sedentaryDesc: '운동을 거의 하지 않음',
    lightlyActive: '가벼운 활동',
    lightlyActiveDesc: '가벼운 운동 주 1-3일',
    moderatelyActive: '보통 활동',
    moderatelyActiveDesc: '보통 운동 주 3-5일',
    veryActive: '매우 활동적',
    veryActiveDesc: '격렬한 운동 주 6-7일',
    extraActive: '극도로 활동적',
    extraActiveDesc: '매우 격렬한 운동, 육체 노동',
    
    // Goals
    yourGoal: '당신의 목표',
    whatToAchieve: '무엇을 달성하고 싶으신가요?',
    loseWeight: '체중 감량',
    loseWeightDesc: '전체 체중 감소',
    gainMuscle: '근육량 증가',
    gainMuscleDesc: '제지방량 증가',
    loseFatMaintainMuscle: '지방 감소 및 근육 유지',
    loseFatMaintainMuscleDesc: '몸매 다듬기',
    maintainWeight: '체중 유지',
    maintainWeightDesc: '현재 체중 유지 및 체성분 개선',
    
    // Navigation
    back: '뒤로',
    next: '다음',
    finish: '완료',
    
    // Dashboard
    hello: '안녕하세요',
    transformYourLife: '오늘부터 인생을 바꿔봅시다',
    unlimitedCoins: '무제한 코인',
    coins: '코인',
    premiumPlanActive: '프리미엄 플랜 활성',
    freeTrial: '무료 체험',
    upgradePremium: '프리미엄 업그레이드',
    premium: '프리미엄',
    
    // Tabs
    metrics: '지표',
    meals: '식사',
    aiNutritional: 'AI 영양',
    progress: '진행상황',
    plans: '플랜',
    
    // AI Chat
    aiGreeting: '안녕하세요',
    aiIntroduction: '개인화된 영양 AI입니다. 식단, 건강한 레시피, 재료 대체 등에 대한 질문을 도와드릴 수 있습니다. 오늘 어떻게 도와드릴까요?',
    
    // Health Metrics
    bmi: 'BMI',
    bmr: '기초대사율',
    dailyCalories: '일일 소모량',
    targetCalories: '일일 칼로리 목표',
    idealWeight: '이상 체중',
    currentWeight: '현재 체중',
    bodyFat: '체지방',
    muscleMass: '근육량',
    waistMeasure: '허리둘레',
    
    // Meal Plan
    personalizedMealPlan: '개인화된 식사 계획',
    totalCalories: '총 칼로리',
    meals: '식사',
    proteins: '단백질',
    forbiddenFoods: '피해야 할 음식',
    
    // Progress Tracker
    progressEvolution: '측정 변화',
    newMeasurement: '새 측정',
    achievements: '성취',
    
    // Pricing
    premiumPlan: '프리미엄 플랜',
    specialOffer: '특별 제안',
    month: '월',
    activatePremium: '프리미엄 활성화',
    
    // Dashboard warnings
    coinsRunningOut: '코인이 부족합니다!',
    remaining: '남음',
    upgradeForUnlimited: '프리미엄으로 업그레이드하고 월 €15로 무제한 액세스를 받으세요',
    coinsFinished: '코인이 다 떨어졌습니다!',
    upgradeToUseFunctionalities: '모든 기능을 계속 사용하려면 프리미엄 플랜으로 업그레이드하세요',
    viewPremiumPlans: '프리미엄 플랜 보기',
    
    // Health Metrics additional
    underweight: '저체중',
    normalWeight: '정상 체중',
    overweight: '과체중',
    obesity: '비만',
    calorieDeficitForWeightLoss: '체중 감량을 위한 칼로리 부족',
    calorieSurplusForMuscleGain: '근육 증가를 위한 칼로리 과잉',
    moderateDeficitForDefinition: '체형 개선을 위한 적당한 부족',
    currentWeightMaintenance: '현재 체중 유지'
  },
  
  zh: {
    // App
    appName: '您的理想身材',
    appDescription: '用个性化AI改变您的生活',
    
    // Welcome Screen
    step: '步骤',
    of: '/',
    letsStart: '让我们开始吧！',
    whatToCallYou: '我应该怎么称呼您？',
    selectLanguage: '选择您的语言',
    yourName: '您的姓名',
    fullNamePlaceholder: '您的全名',
    great: '太好了',
    letsDefineYourPlan: '现在让我们制定您的计划。',
    
    // Body Data
    bodyData: '身体数据',
    needToKnowYouBetter: '我需要更好地了解您',
    height: '身高',
    weight: '体重',
    age: '年龄',
    gender: '性别',
    select: '选择',
    male: '男性',
    female: '女性',
    
    // Activity Level
    activityLevel: '活动水平',
    exerciseRoutine: '您的运动习惯如何？',
    sedentary: '久坐',
    sedentaryDesc: '很少或不运动',
    lightlyActive: '轻度活跃',
    lightlyActiveDesc: '轻度运动 每周1-3天',
    moderatelyActive: '中度活跃',
    moderatelyActiveDesc: '中度运动 每周3-5天',
    veryActive: '非常活跃',
    veryActiveDesc: '剧烈运动 每周6-7天',
    extraActive: '极度活跃',
    extraActiveDesc: '非常剧烈的运动，体力劳动',
    
    // Goals
    yourGoal: '您的目标',
    whatToAchieve: '您想要达到什么目标？',
    loseWeight: '减重',
    loseWeightDesc: '减少总体重',
    gainMuscle: '增肌',
    gainMuscleDesc: '增加瘦体重',
    loseFatMaintainMuscle: '减脂保肌',
    loseFatMaintainMuscleDesc: '身体塑形',
    maintainWeight: '维持体重',
    maintainWeightDesc: '保持当前体重并改善身体成分',
    
    // Navigation
    back: '返回',
    next: '下一步',
    finish: '完成',
    
    // Dashboard
    hello: '您好',
    transformYourLife: '让我们今天开始改变您的生活',
    unlimitedCoins: '无限金币',
    coins: '金币',
    premiumPlanActive: '高级计划已激活',
    freeTrial: '免费试用',
    upgradePremium: '升级高级版',
    premium: '高级版',
    
    // Tabs
    metrics: '指标',
    meals: '餐食',
    aiNutritional: 'AI营养',
    progress: '进度',
    plans: '计划',
    
    // AI Chat
    aiGreeting: '您好',
    aiIntroduction: '我是您的个性化营养AI。我可以帮助回答关于饮食、健康食谱、食材替代等问题。今天我能为您做些什么？',
    
    // Health Metrics
    bmi: 'BMI',
    bmr: '基础代谢率',
    dailyCalories: '每日消耗',
    targetCalories: '每日卡路里目标',
    idealWeight: '理想体重',
    currentWeight: '当前体重',
    bodyFat: '体脂肪',
    muscleMass: '肌肉量',
    waistMeasure: '腰围',
    
    // Meal Plan
    personalizedMealPlan: '个性化膳食计划',
    totalCalories: '总卡路里',
    meals: '餐食',
    proteins: '蛋白质',
    forbiddenFoods: '应避免的食物',
    
    // Progress Tracker
    progressEvolution: '测量演变',
    newMeasurement: '新测量',
    achievements: '成就',
    
    // Pricing
    premiumPlan: '高级计划',
    specialOffer: '特别优惠',
    month: '月',
    activatePremium: '激活高级版',
    
    // Dashboard warnings
    coinsRunningOut: '您的金币即将用完！',
    remaining: '剩余',
    upgradeForUnlimited: '升级到高级版，每月仅€15即可获得无限访问',
    coinsFinished: '您的金币已用完！',
    upgradeToUseFunctionalities: '要继续使用所有功能，请升级到高级计划',
    viewPremiumPlans: '查看高级计划',
    
    // Health Metrics additional
    underweight: '体重不足',
    normalWeight: '正常体重',
    overweight: '超重',
    obesity: '肥胖',
    calorieDeficitForWeightLoss: '减重的卡路里不足',
    calorieSurplusForMuscleGain: '增肌的卡路里过剩',
    moderateDeficitForDefinition: '塑形的适度不足',
    currentWeightMaintenance: '维持当前体重'
  },
  
  ru: {
    // App
    appName: 'Ваше Идеальное Тело',
    appDescription: 'Преобразите свою жизнь с персонализированным ИИ',
    
    // Welcome Screen
    step: 'Шаг',
    of: 'из',
    letsStart: 'Давайте начнем!',
    whatToCallYou: 'Как мне к вам обращаться?',
    selectLanguage: 'Выберите ваш язык',
    yourName: 'Ваше имя',
    fullNamePlaceholder: 'Ваше полное имя',
    great: 'Отлично',
    letsDefineYourPlan: 'Теперь давайте определим ваш план.',
    
    // Body Data
    bodyData: 'Данные Тела',
    needToKnowYouBetter: 'Мне нужно лучше вас узнать',
    height: 'Рост',
    weight: 'Вес',
    age: 'Возраст',
    gender: 'Пол',
    select: 'Выбрать',
    male: 'Мужской',
    female: 'Женский',
    
    // Activity Level
    activityLevel: 'Уровень Активности',
    exerciseRoutine: 'Какова ваша программа упражнений?',
    sedentary: 'Малоподвижный',
    sedentaryDesc: 'Мало или совсем нет упражнений',
    lightlyActive: 'Слегка Активный',
    lightlyActiveDesc: 'Легкие упражнения 1-3 дня/неделю',
    moderatelyActive: 'Умеренно Активный',
    moderatelyActiveDesc: 'Умеренные упражнения 3-5 дней/неделю',
    veryActive: 'Очень Активный',
    veryActiveDesc: 'Интенсивные упражнения 6-7 дней/неделю',
    extraActive: 'Чрезвычайно Активный',
    extraActiveDesc: 'Очень интенсивные упражнения, физическая работа',
    
    // Goals
    yourGoal: 'Ваша Цель',
    whatToAchieve: 'Чего вы хотите достичь?',
    loseWeight: 'Похудеть',
    loseWeightDesc: 'Снизить общий вес тела',
    gainMuscle: 'Набрать Мышечную Массу',
    gainMuscleDesc: 'Увеличить сухую массу',
    loseFatMaintainMuscle: 'Сжечь Жир и Сохранить Мышцы',
    loseFatMaintainMuscleDesc: 'Рельеф тела',
    maintainWeight: 'Поддерживать Вес',
    maintainWeightDesc: 'Поддерживать текущий вес и улучшить состав тела',
    
    // Navigation
    back: 'Назад',
    next: 'Далее',
    finish: 'Завершить',
    
    // Dashboard
    hello: 'Привет',
    transformYourLife: 'Давайте изменим вашу жизнь сегодня',
    unlimitedCoins: 'Неограниченные Монеты',
    coins: 'Монеты',
    premiumPlanActive: 'Премиум План Активен',
    freeTrial: 'Бесплатная Пробная Версия',
    upgradePremium: 'Обновить до Премиум',
    premium: 'Премиум',
    
    // Tabs
    metrics: 'Метрики',
    meals: 'Питание',
    aiNutritional: 'ИИ Питание',
    progress: 'Прогресс',
    plans: 'Планы',
    
    // AI Chat
    aiGreeting: 'Привет',
    aiIntroduction: 'Я ваш персонализированный ИИ по питанию. Могу помочь с вопросами о питании, здоровых рецептах, замене ингредиентов и многом другом. Как я могу помочь вам сегодня?',
    
    // Health Metrics
    bmi: 'ИМТ',
    bmr: 'Базальный Метаболизм',
    dailyCalories: 'Дневной Расход',
    targetCalories: 'Дневная Цель Калорий',
    idealWeight: 'Идеальный Вес',
    currentWeight: 'Текущий Вес',
    bodyFat: 'Жир Тела',
    muscleMass: 'Мышечная Масса',
    waistMeasure: 'Обхват Талии',
    
    // Meal Plan
    personalizedMealPlan: 'Персонализированный План Питания',
    totalCalories: 'Общие Калории',
    meals: 'Приемы Пищи',
    proteins: 'Белки',
    forbiddenFoods: 'Продукты для Избегания',
    
    // Progress Tracker
    progressEvolution: 'Эволюция Измерений',
    newMeasurement: 'Новое Измерение',
    achievements: 'Достижения',
    
    // Pricing
    premiumPlan: 'Премиум План',
    specialOffer: 'Специальное Предложение',
    month: 'месяц',
    activatePremium: 'Активировать Премиум',
    
    // Dashboard warnings
    coinsRunningOut: 'Ваши монеты заканчиваются!',
    remaining: 'осталось',
    upgradeForUnlimited: 'Обновитесь до Премиум и получите неограниченный доступ всего за €15/месяц',
    coinsFinished: 'Ваши монеты закончились!',
    upgradeToUseFunctionalities: 'Чтобы продолжить использовать все функции, обновитесь до Премиум Плана',
    viewPremiumPlans: 'Посмотреть Премиум Планы',
    
    // Health Metrics additional
    underweight: 'Недостаточный вес',
    normalWeight: 'Нормальный вес',
    overweight: 'Избыточный вес',
    obesity: 'Ожирение',
    calorieDeficitForWeightLoss: 'Дефицит калорий для похудения',
    calorieSurplusForMuscleGain: 'Избыток калорий для набора мышц',
    moderateDeficitForDefinition: 'Умеренный дефицит для рельефа',
    currentWeightMaintenance: 'Поддержание текущего веса'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};