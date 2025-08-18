import React from 'react';
import { UserSubscription } from '../types/PersonalData';
import { useLanguage } from '../contexts/LanguageContext';
import { Crown, Star, Zap, Check, ExternalLink, Sparkles, Heart, Target, Clock, Gift } from 'lucide-react';

interface PricingPlansProps {
  onSubscriptionUpdate: (subscription: UserSubscription) => void;
}

export const PricingPlans: React.FC<PricingPlansProps> = ({ onSubscriptionUpdate }) => {
  const { t } = useLanguage();
  
  const handlePlanSelect = () => {
    // Redirecionar diretamente para a página de pagamento do Kiwify
    window.open('https://pay.kiwify.com.br/bpe7te1', '_blank');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Crown className="w-8 h-8 text-purple-400" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            {onSubscriptionUpdate ? 'Oferta Especial Limitada' : 'Acesso Completo'}
            {onSubscriptionUpdate ? 'Oferta Especial Limitada' : 'Acesso Completo'}
          </h2>
        </div>
        <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto px-4">
          {onSubscriptionUpdate 
            ? 'Acesso completo ao Seu Corpo Ideal com desconto imperdível! Transforme sua vida com nossa plataforma completa de saúde e bem-estar.'
            : 'Transforme sua vida com nossa plataforma completa de saúde e bem-estar.'}
        </p>
      </div>

      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 px-6 rounded-2xl text-center">
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <Clock className="w-4 h-4" />
          <span>⚡ OFERTA ESPECIAL - 89% de desconto por tempo limitado!</span>
        </div>
      </div>

      {/* Main Plan Card */}
      <div className="max-w-lg mx-auto px-4">
        <div className="relative bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 border border-purple-400/50 hover:bg-white/15 transition-all transform hover:scale-105 ring-2 ring-purple-400/50">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2">
              <Gift className="w-4 h-4" />
              89% DE DESCONTO
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="inline-flex p-3 sm:p-4 rounded-xl bg-gradient-to-r from-purple-400 to-purple-600 mb-6">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Acesso Completo</h3>
            <p className="text-gray-300 mb-6 text-sm sm:text-base">Plataforma completa de transformação corporal</p>
            
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-green-300 font-bold">🎁 TESTE GRÁTIS INCLUÍDO!</span>
              </div>
              <p className="text-green-200 text-sm">
                Experimente todas as funcionalidades gratuitamente antes de decidir
              </p>
            </div>
            
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-green-300 font-bold">🎁 TESTE GRÁTIS INCLUÍDO!</span>
              </div>
              <p className="text-green-200 text-sm">
                Experimente todas as funcionalidades gratuitamente antes de decidir
              </p>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-lg text-gray-400 line-through">De R$ 250</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">89% OFF</span>
              </div>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-4xl sm:text-6xl font-bold text-green-400">R$ 27</span>
                <span className="text-gray-400 text-base sm:text-lg">pagamento único</span>
              </div>
              <p className="text-green-400 text-sm font-medium">💰 Economia de R$ 223 - Oferta limitada!</p>
            </div>
          </div>

          <ul className="space-y-4 mb-8">
            {[
              'IA Nutricional personalizada ilimitada',
              'Planos alimentares customizados para seu objetivo',
              'Acompanhamento completo de progresso e métricas',
              'Cálculos precisos de IMC, TMB e calorias ideais',
              'Receitas exclusivas e saudáveis para cada meta',
              'Sistema de conquistas e gamificação motivacional',
              'Suporte prioritário via chat integrado',
              'Atualizações constantes da plataforma',
              'Acesso vitalício pelo celular e computador',
              'Garantia de 7 dias ou seu dinheiro de volta',
              'Sem mensalidades - pagamento único',
              'Acesso imediato após confirmação do pagamento'
            ].map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Check className="w-5 h-5 text-green-400 mt-0.5" />
                </div>
                <span className="text-gray-300 text-sm sm:text-base">{feature}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={handlePlanSelect}
            className="w-full py-3 sm:py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-green-400 to-green-600 text-white hover:from-green-500 hover:to-green-700 transform hover:scale-105 text-base sm:text-lg shadow-2xl"
          >
            <span className="hidden sm:inline">🔥 GARANTIR ACESSO COMPLETO - R$ 27</span>
            <span className="sm:hidden">🔥 GARANTIR ACESSO - R$ 27</span>
            <ExternalLink className="w-5 h-5" />
          </button>

          <p className="text-center text-gray-400 text-sm mt-4">
            🔒 Pagamento 100% seguro • Acesso imediato • Sem mensalidades
          </p>
        </div>
      </div>

      {/* Value Comparison */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-8 border border-white/20">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Compare o Valor</h3>
          <p className="text-gray-300 text-sm sm:text-base">Veja quanto você economiza com nossa oferta especial</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-6">
            <h4 className="text-red-300 font-bold text-lg mb-4">❌ Alternativas Tradicionais</h4>
            <ul className="space-y-3 text-red-200 text-sm">
              <li>• Nutricionista: R$ 150/consulta</li>
              <li>• Personal trainer: R$ 80/sessão</li>
              <li>• Academia: R$ 89/mês</li>
              <li>• Apps premium: R$ 29/mês</li>
              <li>• Cursos online: R$ 297+</li>
              <li className="font-bold pt-2 border-t border-red-500/30">
                💸 Total: Mais de R$ 500/mês
              </li>
            </ul>
          </div>

          <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-6">
            <h4 className="text-green-300 font-bold text-lg mb-4">✅ Seu Corpo Ideal</h4>
            <ul className="space-y-3 text-green-200 text-sm">
              <li>• IA Nutricional personalizada</li>
              <li>• Planos alimentares ilimitados</li>
              <li>• Acompanhamento completo</li>
              <li>• Suporte integrado</li>
              <li>• Acesso vitalício</li>
              <li className="font-bold pt-2 border-t border-green-500/30 text-lg">
                💚 Apenas R$ 27 (pagamento único)
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-8 border border-white/20">
        <div className="text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Por que escolher o Seu Corpo Ideal?</h3>
          <p className="text-gray-300 text-sm sm:text-base">Milhares de pessoas já transformaram suas vidas conosco</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="text-center">
            <div className="bg-green-500 p-3 rounded-xl w-fit mx-auto mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-white font-semibold mb-2">Resultados Reais</h4>
            <p className="text-gray-300 text-sm">Método validado por nutricionistas e personal trainers</p>
          </div>

          <div className="text-center">
            <div className="bg-blue-500 p-3 rounded-xl w-fit mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-white font-semibold mb-2">IA Avançada</h4>
            <p className="text-gray-300 text-sm">Inteligência artificial que aprende com seus hábitos</p>
          </div>

          <div className="text-center">
            <div className="bg-purple-500 p-3 rounded-xl w-fit mx-auto mb-4">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-white font-semibold mb-2">Suporte Total</h4>
            <p className="text-gray-300 text-sm">Plataforma completa sempre disponível</p>
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

      {/* Social Proof */}
      <div className="bg-gradient-to-r from-green-400/20 to-purple-400/20 rounded-2xl p-4 sm:p-8 border border-green-400/30">
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">O que nossos usuários dizem</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
            <div className="bg-white/10 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-3 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-3">"Perdi 8kg em 2 meses! A IA realmente entende minhas necessidades."</p>
              <p className="text-white font-medium">- Maria Silva</p>
            </div>

            <div className="bg-white/10 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-3 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-3">"Melhor investimento que já fiz! Mudou completamente minha relação com a comida."</p>
              <p className="text-white font-medium">- João Santos</p>
            </div>

            <div className="bg-white/10 rounded-xl p-6">
              <div className="flex items-center gap-1 mb-3 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-3">"Finalmente consegui ganhar massa muscular de forma saudável!"</p>
              <p className="text-white font-medium">- Pedro Costa</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-8 border border-white/20">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">Perguntas Frequentes</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-2">É realmente pagamento único?</h4>
            <p className="text-gray-300 text-sm">Sim! Você paga apenas R$ 27 uma vez e tem acesso vitalício a todas as funcionalidades.</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-2">Como funciona a garantia?</h4>
            <p className="text-gray-300 text-sm">Se não ficar satisfeito nos primeiros 7 dias, devolvemos 100% do seu dinheiro.</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-2">Funciona para todos os objetivos?</h4>
            <p className="text-gray-300 text-sm">Sim! Seja para emagrecer, ganhar massa ou manter o peso, nossa IA se adapta ao seu objetivo.</p>
          </div>

          <div className="bg-white/5 rounded-xl p-4">
            <h4 className="text-white font-semibold mb-2">Preciso de conhecimento prévio?</h4>
            <p className="text-gray-300 text-sm">Não! Nossa plataforma é intuitiva e guia você passo a passo em sua jornada.</p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-2xl p-4 sm:p-8 border border-purple-400/30">
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Sua transformação começa hoje!</h3>
        <p className="text-gray-300 mb-6 text-base sm:text-lg">Junte-se a milhares de pessoas que já alcançaram seus objetivos</p>
        
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-green-400">5.000+</div>
            <div className="text-gray-300 text-sm">Usuários ativos</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-blue-400">4.9★</div>
            <div className="text-gray-300 text-sm">Avaliação média</div>
          </div>
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-purple-400">95%</div>
            <div className="text-gray-300 text-sm">Taxa de sucesso</div>
          </div>
        </div>

        <button
          onClick={handlePlanSelect}
          className="bg-gradient-to-r from-green-400 to-green-600 text-white px-6 sm:px-12 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-xl hover:from-green-500 hover:to-green-700 transition-all transform hover:scale-105 flex items-center gap-2 sm:gap-3 mx-auto shadow-2xl"
        >
          <Crown className="w-6 h-6" />
          <span className="hidden sm:inline">🔥 GARANTIR ACESSO COMPLETO - R$ 27</span>
          <span className="sm:hidden">🔥 ACESSO COMPLETO - R$ 27</span>
          <ExternalLink className="w-5 h-5" />
        </button>
        
        <p className="text-gray-400 text-sm mt-4">
          ⚡ Oferta especial • Acesso imediato • Garantia de 7 dias
        </p>
      </div>
    </div>
  );
};