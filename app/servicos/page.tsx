'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services = [
    {
      id: 1,
      name: 'Aulas Particulares',
      icon: '🏫',
      price: '€60/hora',
      description: 'Aulas individualizadas com instrutores certificados',
      details: [
        'Adaptadas ao seu nível de experiência',
        'Instrutores certificados pela FEI',
        'Cavalos profissionais selecionados',
        'Programa personalizado de treino',
        'Horários flexíveis',
        'Progresso monitorizado regularmente'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 2,
      name: 'Aulas em Grupo',
      icon: '👥',
      price: '€30/pessoa/hora',
      description: 'Aprendizado em grupo com ambiente motivador',
      details: [
        'Máximo 4 pessoas por grupo',
        'Ambiente colaborativo e motivador',
        'Diferentes níveis de proficiência',
        'Calendário fixo semanal',
        'Tarifas especiais para mensalidades',
        'Seguro incluído'
      ],
      color: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      name: 'Treino Avançado',
      icon: '🏆',
      price: '€100/hora',
      description: 'Preparação para competições com especialistas',
      details: [
        'Preparação para competições nacionais',
        'Técnicas avançadas de dressage e saltos',
        'Trabalho psicológico com cavaleiro',
        'Análise de vídeo e feedback detalhado',
        'Plano de competição personalizado',
        'Acompanhamento em provas'
      ],
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 4,
      name: 'Alojamento de Cavalos',
      icon: '🐴',
      price: 'A partir de €400/mês',
      description: 'Pensão completa com cuidados especializados',
      details: [
        'Baias climatizadas e espaçosas',
        'Alimentação premium personalizada',
        'Veterinário disponível 24/7',
        'Zona de pasto quando apropriado',
        'Fisioterapia equina',
        'Limpeza e manutenção diária'
      ],
      color: 'from-amber-500 to-amber-600'
    },
    {
      id: 5,
      name: 'Venda de Equipamentos',
      icon: '🛍️',
      price: 'Variável',
      description: 'Equipamentos profissionais de qualidade superior',
      details: [
        'Marcas internacionais premium',
        'Equipamento de proteção certificado',
        'Vestuário técnico e casual',
        'Nutrição e suplementos equinos',
        'Consultoria especializada',
        'Entregas em todo o país'
      ],
      color: 'from-red-500 to-red-600'
    },
    {
      id: 6,
      name: 'Eventos Corporativos',
      icon: '🎉',
      price: 'Orçamento personalizado',
      description: 'Experiências únicas e team building equestre',
      details: [
        'Atividades de team building em grupo',
        'Experiências de meia jornada',
        'Jantares temáticos com vista para pista',
        'Apresentações ao vivo',
        'Organização completa de eventos',
        'Buffet e catering disponível'
      ],
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">Nossos Serviços</h1>
          <p className="text-xl text-amber-100">Experiências equestres profissionais para todos os níveis</p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service) => (
            <div
              key={service.id}
              className="group cursor-pointer"
              onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Color Header */}
                <div className={`bg-gradient-to-r ${service.color} p-6 text-white`}>
                  <div className="text-5xl mb-2">{service.icon}</div>
                  <h3 className="text-2xl font-bold">{service.name}</h3>
                  <p className="text-lg mt-2 opacity-90">{service.price}</p>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{service.description}</p>
                  
                  {selectedService === service.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      {service.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-gray-700">
                          <span className="text-amber-600 mt-1">✓</span>
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                    className={`w-full mt-4 py-2 rounded-lg font-semibold transition-colors ${
                      selectedService === service.id
                        ? `bg-gradient-to-r ${service.color} text-white`
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {selectedService === service.id ? 'Ocultar Detalhes' : 'Ver Detalhes'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para Começar?</h2>
          <p className="text-lg mb-6 opacity-90">
            Entre em contacto connosco para conhecer melhor nossos serviços e agendar uma visita
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/reservations"
              className="bg-white text-amber-700 px-8 py-3 rounded-lg font-bold hover:bg-amber-50 transition-colors"
            >
              Fazer Reserva
            </Link>
            <a
              href="tel:+351912345678"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-amber-700 transition-colors"
            >
              Contactar por Telefone
            </a>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="mt-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Descontos Disponíveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-600">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Pacotes Mensais</h3>
              <p className="text-gray-700">
                Contrate aulas em pacotes e ganhe <span className="font-bold text-blue-600">10% de desconto</span>
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-6 border-l-4 border-green-600">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Grupos</h3>
              <p className="text-gray-700">
                Aulas em grupo desde <span className="font-bold text-green-600">€20 por pessoa</span>
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6 border-l-4 border-purple-600">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Eventos Corporativos</h3>
              <p className="text-gray-700">
                Orçamentos customizados para <span className="font-bold text-purple-600">grupos acima de 10</span>
              </p>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section className="mt-20 bg-amber-50 rounded-lg p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Como Começar</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">1️⃣</div>
              <p className="font-bold text-gray-900">Contacte-nos</p>
              <p className="text-sm text-gray-600 mt-2">Por telefone ou via formulário de contacto</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">2️⃣</div>
              <p className="font-bold text-gray-900">Conhecer as Instalações</p>
              <p className="text-sm text-gray-600 mt-2">Visite-nos para conhecer nosso espaço</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">3️⃣</div>
              <p className="font-bold text-gray-900">Escolha seu Programa</p>
              <p className="text-sm text-gray-600 mt-2">Encontre o serviço ideal para você</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">4️⃣</div>
              <p className="font-bold text-gray-900">Comece Sua Jornada</p>
              <p className="text-sm text-gray-600 mt-2">Inicie seu caminho na equitação</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
