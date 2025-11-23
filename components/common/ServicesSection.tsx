'use client';

export default function ServicesSection() {
  const services = [
    {
      icon: '🎓',
      title: 'Aulas de Equitação',
      description: 'Programas de formação para iniciantes e avançados'
    },
    {
      icon: '🏆',
      title: 'Treino Profissional',
      description: 'Preparação para competições de dressage e saltos'
    },
    {
      icon: '🐴',
      title: 'Aluguel de Cavalos',
      description: 'Cavalos bem cuidados para passeios e treino'
    },
    {
      icon: '🛍️',
      title: 'Loja de Equipamentos',
      description: 'Acessórios, vestuário e artigos de qualidade'
    },
    {
      icon: '🏥',
      title: 'Cuidados Especializados',
      description: 'Serviços de higiene e saúde equina'
    },
    {
      icon: '🎪',
      title: 'Eventos e Torneios',
      description: 'Organização de competições e eventos'
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-black mb-4">Nossos Serviços</h2>
          <p className="text-black font-bold text-lg">Tudo o que precisa para uma experiência equestre completa</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition transform hover:scale-105">
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-black text-black mb-2">{service.title}</h3>
              <p className="text-black font-bold">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
