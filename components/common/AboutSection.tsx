'use client';

export default function AboutSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-black text-black mb-6">
              PH - Gilberto Filipe
            </h2>
            <p className="text-black font-bold text-lg leading-relaxed mb-4">
              Fundado em 2003, o nosso centro equestre tornou-se referência em Portugal na formação de cavaleiros e na qualidade dos serviços prestados.
            </p>
            <p className="text-black font-bold text-lg leading-relaxed mb-4">
              Com uma equipa de instrutores certificados internacionalmente e instalações de primeira categoria, oferecemos programas de treino para todas as idades e níveis.
            </p>
            <p className="text-black font-bold text-lg leading-relaxed">
              A nossa loja especializada oferece equipamentos de marcas renomadas, garantindo qualidade e durabilidade para todo o tipo de cavalaria.
            </p>
          </div>
          <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&h=400&fit=crop" 
              alt="Centro Equestre" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
