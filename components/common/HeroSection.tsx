'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-cover bg-center flex items-center" style={{
      backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1400&h=900&fit=crop)'
    }}>
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="max-w-2xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
              <span className="text-2xl">🐴</span>
            </div>
            <span className="text-amber-400 font-bold text-lg">Centro Equestre Premium</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-lg">
            PH - Gilberto Filipe
          </h1>

          <p className="text-xl md:text-2xl text-white font-bold mb-8 drop-shadow-lg leading-relaxed max-w-xl">
            Centro Equestre de Excelência com formação profissional, treino de cavaleiros e equipamentos de qualidade superior
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link href="/servicos" className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 text-center">
              🎯 Conheça Nossos Serviços
            </Link>
            <Link href="/products" className="bg-white text-amber-900 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition transform hover:scale-105 text-center">
              🛒 Visitar Loja
            </Link>
            <Link href="/reservations" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-lg hover:bg-white/10 transition text-center">
              📅 Fazer Reserva
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 max-w-lg">
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
              <div className="text-3xl font-black text-white">20+</div>
              <p className="text-white font-bold text-sm">Anos de Experiência</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
              <div className="text-3xl font-black text-white">500+</div>
              <p className="text-white font-bold text-sm">Clientes Satisfeitos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg border border-white/20">
              <div className="text-3xl font-black text-white">100%</div>
              <p className="text-white font-bold text-sm">Qualidade Garantida</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="text-3xl">↓</div>
      </div>
    </div>
  );
}
