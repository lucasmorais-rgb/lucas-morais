import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Clock, Users, Award, Shield, Gift, ArrowRight, Play, Heart, Target, Zap } from 'lucide-react';

export const SalesLanding: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 47,
    seconds: 23
  });

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handlePurchase = () => {
    // Redirecionar para página de pagamento Kiwify
    window.open('https://pay.kiwify.com.br/bpe7te1', '_blank');
  };

  const testimonials = [
    {
      name: "Maria Silva",
      age: 34,
      result: "Perdi 6cm de cintura em 3 semanas",
      image: "https://images.pexels.com/photos/3768911/pexels-photo-3768911.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      stars: 5,
      text: "Não acreditava que funcionaria, mas em 3 semanas já estava usando roupas que não cabiam há anos!"
    },
    {
      name: "Ana Costa",
      age: 28,
      result: "8cm a menos em 1 mês",
      image: "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      stars: 5,
      text: "O método é simples e funciona! Fiz tudo em casa, sem academia. Recomendo para todas as amigas!"
    },
    {
      name: "Carla Mendes",
      age: 41,
      result: "5cm reduzidos em 20 dias",
      image: "https://images.pexels.com/photos/3768997/pexels-photo-3768997.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      stars: 5,
      text: "Depois dos 40 achei que seria impossível. Mas o Seca Tudo me provou o contrário!"
    }
  ];

  const benefits = [
    "✅ Reduza até 8cm de cintura em 30 dias",
    "✅ Método 100% caseiro - sem academia",
    "✅ Sem dietas malucas ou remédios",
    "✅ Apenas 15 minutos por dia",
    "✅ Funciona para qualquer idade",
    "✅ Resultados visíveis em 7 dias"
  ];

  const bonuses = [
    {
      title: "🎁 BÔNUS #1: Receitas Detox Japonesas",
      value: "R$ 47",
      description: "15 receitas que aceleram o metabolismo"
    },
    {
      title: "🎁 BÔNUS #2: Exercícios de 10 Minutos",
      value: "R$ 37",
      description: "Rotina completa para fazer em casa"
    },
    {
      title: "🎁 BÔNUS #3: Grupo VIP no WhatsApp",
      value: "R$ 97",
      description: "Suporte direto e motivação diária"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      {/* Header com Urgência */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 text-center">
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          <Clock className="w-4 h-4" />
          <span>OFERTA ESPECIAL TERMINA EM:</span>
          <div className="flex gap-1 ml-2">
            <span className="bg-white/20 px-2 py-1 rounded">{timeLeft.hours.toString().padStart(2, '0')}</span>
            <span>:</span>
            <span className="bg-white/20 px-2 py-1 rounded">{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span>:</span>
            <span className="bg-white/20 px-2 py-1 rounded">{timeLeft.seconds.toString().padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              Mais de 2.347 mulheres já transformaram seus corpos
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-pink-600">SECA BARRIGA EM 30 DIAS:</span><br />
              Método Japonês que Elimina até<br />
              <span className="text-red-600">8cm de Cintura SEM Academia</span>
            </h1>
            
            <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Descubra o segredo das mulheres japonesas para ter barriga sequinha usando apenas 
              <strong> 15 minutos por dia</strong> no conforto da sua casa
            </p>

            {/* Avaliações */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-600">4.9/5 estrelas</span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600">847 avaliações</span>
            </div>
          </div>

          {/* Imagem Principal */}
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <img 
                src="https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" 
                alt="Mulher feliz mostrando barriga sequinha" 
                className="rounded-2xl shadow-2xl max-w-full h-auto"
              />
              <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold transform rotate-12">
                NOVO!
              </div>
            </div>
          </div>

          {/* CTA Principal */}
          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                OFERTA ESPECIAL - 72% DE DESCONTO
              </h2>
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="text-2xl line-through opacity-75">De R$ 97</span>
                <span className="text-4xl font-bold">por apenas R$ 27</span>
              </div>
              <button
                onClick={handlePurchase}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-xl text-xl transition-all transform hover:scale-105 shadow-lg"
              >
                🔥 QUERO SECAR MINHA BARRIGA AGORA - R$ 27
              </button>
              <p className="text-sm mt-4 opacity-90">
                ✅ Acesso imediato • ✅ Garantia de 7 dias • ✅ Pagamento 100% seguro
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefícios */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
              O Que Você Vai Conseguir com o <span className="text-pink-600">Método Seca Tudo</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 text-left bg-green-50 p-4 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-lg text-gray-800">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Antes e Depois */}
      <div className="bg-gradient-to-r from-pink-100 to-rose-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Resultados <span className="text-pink-600">Reais</span> de Mulheres Reais
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              Veja as transformações incríveis que aconteceram em apenas 30 dias
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                      <p className="text-gray-600">{testimonial.age} anos</p>
                      <div className="flex gap-1">
                        {[...Array(testimonial.stars)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-pink-100 p-3 rounded-xl mb-4">
                    <p className="font-bold text-pink-800">{testimonial.result}</p>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bônus */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              <span className="text-yellow-600">BÔNUS EXCLUSIVOS</span> para Quem Age Hoje
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              Além do método completo, você também recebe estes presentes especiais:
            </p>
            
            <div className="space-y-6 mb-12">
              {bonuses.map((bonus, index) => (
                <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{bonus.title}</h3>
                      <p className="text-gray-700">{bonus.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-green-600">{bonus.value}</span>
                      <p className="text-sm text-gray-600">GRÁTIS</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-green-100 p-6 rounded-2xl">
              <h3 className="text-2xl font-bold text-green-800 mb-2">
                VALOR TOTAL: R$ 181
              </h3>
              <p className="text-xl text-green-700">
                Hoje você leva tudo por apenas <span className="font-bold text-2xl">R$ 27</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Garantia */}
      <div className="bg-gradient-to-r from-blue-100 to-indigo-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <Shield className="w-16 h-16 text-blue-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Garantia Incondicional de <span className="text-blue-600">7 Dias</span>
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                Se você não ficar 100% satisfeita com os resultados, devolvemos todo o seu dinheiro. 
                Sem perguntas, sem complicações.
              </p>
              <div className="flex items-center justify-center gap-4 text-green-600">
                <CheckCircle className="w-6 h-6" />
                <span className="font-medium">Risco ZERO para você</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sua Transformação Começa AGORA!
            </h2>
            <p className="text-xl mb-8">
              Não deixe para amanhã o que pode mudar sua vida hoje. 
              Milhares de mulheres já conseguiram, e você também pode!
            </p>
            
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-6 h-6" />
                <span className="text-xl font-bold">ÚLTIMAS HORAS:</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-3xl font-bold mb-6">
                <span className="bg-white/20 px-4 py-2 rounded">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-white/20 px-4 py-2 rounded">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span>:</span>
                <span className="bg-white/20 px-4 py-2 rounded">{timeLeft.seconds.toString().padStart(2, '0')}</span>
              </div>
              
              <button
                onClick={handlePurchase}
                className="w-full max-w-2xl bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-6 px-8 rounded-xl text-2xl transition-all transform hover:scale-105 shadow-2xl"
              >
                🔥 SIM! QUERO O MÉTODO SECA TUDO - R$ 27
              </button>
              
              <div className="flex items-center justify-center gap-6 mt-6 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>Pagamento Seguro</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Acesso Imediato</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Garantia 7 Dias</span>
                </div>
              </div>
            </div>

            <p className="text-lg opacity-90">
              ⚠️ Esta oferta é limitada e pode sair do ar a qualquer momento
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Seca Tudo. Todos os direitos reservados.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Este produto não substitui orientação médica. Consulte sempre um profissional.
          </p>
        </div>
      </div>
    </div>
  );
};