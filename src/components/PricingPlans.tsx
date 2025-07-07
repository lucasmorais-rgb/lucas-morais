import React from 'react';
import { Crown, Star, Zap, Check, ExternalLink, Sparkles } from 'lucide-react';

export const PricingPlans: React.FC = () => {
  const plans = [
    {
      id: 'basic',
      name: 'Plano Básico',
      price: 'R$ 29,90',
      period: '/mês',
      description: 'Perfeito para quem está começando sua jornada',
      icon: Star,
      color: 'from-blue-400 to-blue-600',
      borderColor: 'border-blue-400/50',
      features: [
        'Cálculo de IMC e TMB',
        'Plano alimentar básico',
        'Acompanhamento de peso',
        'Suporte por email',
        'Acesso ao app mobile'
      ],
      popular: false
    },
    {
      id: 'premium',
      name: 'Plano Premium',
      price: 'R$ 59,90',
      period: '/mês',
      description: 'O mais escolhido! Transformação completa',
      icon: Crown,
      color: 'from-purple-400 to-purple-600',
      borderColor: 'border-purple-400/50',
      features: [
        'Tudo do plano básico',
        'IA Nutricional personalizada',
        'Planos de treino customizados',
        'Acompanhamento completo de medidas',
        'Receitas exclusivas',
        'Suporte prioritário 24/7',
        'Relatórios detalhados',
        'Comunidade VIP'
      ],
      popular: true
    },
    {
      id: 'elite',
      name: 'Plano Elite',
      price: 'R$ 99,90',
      period: '/mês',
      description: 'Para quem busca resultados extraordinários',
      icon: Sparkles,
      color: 'from-yellow-400 to-orange-500',
      borderColor: 'border-yellow-400/50',
      features: [
        'Tudo do plano premium',
        'Consultoria nutricional 1:1',
        'Personal trainer virtual',
        'Análise corporal avançada',
        'Suplementação personalizada',
        'Acompanhamento médico',
        'Acesso antecipado a novidades',
        'Garantia de resultados'
      ],
      popular: false
    }
  ];

  const handlePlanSelect = (planId: string) => {
    // Redireciona para o link da Kiwify
    window.open('https://pay.kiwify.com.br/b73TeZ4', '_blank');
  };

  const PlanCard: React.FC<{ plan: typeof plans[0] }> = ({ plan }) => {
    const Icon = plan.icon;
    
    return (
      <div className={`relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 border ${plan.borderColor} hover:bg-white/15 transition-all transform hover:scale-105 ${plan.popular ? 'ring-2 ring-purple-400/50' : ''}`}>
        {plan.popular && (
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Mais Popular
            </div>
          </div>
        )}

        <div className="text-center mb-6">
          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${plan.color} mb-4`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
          <p className="text-gray-300 text-sm mb-4">{plan.description}</p>
          
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-4xl font-bold text-white">{plan.price}</span>
            <span className="text-gray-400">{plan.period}</span>
          </div>
        </div>

        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <span className="text-gray-300 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => handlePlanSelect(plan.id)}
          className={`w-full py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            plan.popular
              ? 'bg-gradient-to-r from-purple-400 to-purple-600 text-white hover:from-purple-500 hover:to-purple-700'
              : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
          }`}
        >
          Escolher Plano
          <ExternalLink className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Zap className="w-8 h-8 text-yellow-400" />
          <h2 className="text-3xl font-bold text-white">Planos de Transformação</h2>
        </div>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Escolha o plano ideal para sua jornada de transformação. Todos os planos incluem 
          garantia de 7 dias e podem ser cancelados a qualquer momento.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>

      {/* Benefits Section */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-white mb-4">Por que escolher o Seu Corpo Ideal?</h3>
          <p className="text-gray-300">Mais de 10.000 pessoas já transformaram suas vidas conosco</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-green-500 p-3 rounded-xl w-fit mx-auto mb-4">
              <Check className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-white font-semibold mb-2">Resultados Comprovados</h4>
            <p className="text-gray-300 text-sm">Método validado por nutricionistas e personal trainers</p>
          </div>

          <div className="text-center">
            <div className="bg-blue-500 p-3 rounded-xl w-fit mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-white font-semibold mb-2">Tecnologia Avançada</h4>
            <p className="text-gray-300 text-sm">IA personalizada que aprende com seus hábitos</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-500 p-3 rounded-xl w-fit mx-auto mb-4">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-white font-semibold mb-2">Suporte Especializado</h4>
            <p className="text-gray-300 text-sm">Equipe de profissionais sempre disponível</p>
          </div>

          <div className="text-center">
            <div className="bg-yellow-500 p-3 rounded-xl w-fit mx-auto mb-4">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-white font-semibold mb-2">Garantia Total</h4>
            <p className="text-gray-300 text-sm">7 dias para testar sem compromisso</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <h3 className="text-2xl font-bold text-white mb-6 text-center">Perguntas Frequentes</h3>
        
        <div className="space-y-4">
          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-2">Posso cancelar a qualquer momento?</h4>
            <p className="text-gray-300 text-sm">Sim! Você pode cancelar sua assinatura a qualquer momento sem taxas adicionais.</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-2">Como funciona a garantia de 7 dias?</h4>
            <p className="text-gray-300 text-sm">Se não ficar satisfeito nos primeiros 7 dias, devolvemos 100% do seu dinheiro.</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-2">Posso trocar de plano depois?</h4>
            <p className="text-gray-300 text-sm">Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-2">O app funciona offline?</h4>
            <p className="text-gray-300 text-sm">Sim! Muitas funcionalidades funcionam offline, sincronizando quando você se conectar.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-2xl p-8 border border-green-400/30">
        <h3 className="text-2xl font-bold text-white mb-4">Pronto para transformar sua vida?</h3>
        <p className="text-gray-300 mb-6">Junte-se a milhares de pessoas que já alcançaram seus objetivos</p>
        <button
          onClick={() => handlePlanSelect('premium')}
          className="bg-gradient-to-r from-green-400 to-blue-400 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-500 hover:to-blue-500 transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
        >
          Começar Agora
          <ExternalLink className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};