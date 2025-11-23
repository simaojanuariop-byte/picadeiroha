'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center" style={{
      backgroundImage: 'linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(120, 53, 15, 0.3) 100%), url(https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=1400&h=900&fit=crop)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-40 w-96 h-96 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 -right-40 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 0.5px, transparent 0.5px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="mb-8 flex items-center gap-3 group cursor-pointer">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-600 to-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-600/50 group-hover:scale-110 transition transform">
              <span className="text-3xl">🐴</span>
            </div>
            <div>
              <p className="text-amber-400 font-black text-xs uppercase tracking-widest">✦ Premium ✦</p>
              <p className="text-amber-300 font-bold text-sm">Centro Equestre de Excelência</p>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight drop-shadow-2xl bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
            Gilberto Filipe
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl text-gray-200 font-bold mb-10 leading-relaxed max-w-2xl drop-shadow-lg">
            Centro Equestre de Excelência com formação profissional, treino especializado e equipamentos de qualidade superior. Sua melhor escolha em equitação clássica.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="/servicos" className="group relative inline-flex items-center justify-center px-8 py-4 font-black text-black uppercase tracking-wider text-sm bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 rounded-xl transition transform hover:scale-105 active:scale-95 shadow-lg shadow-amber-600/50 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                <span>🎯</span>
                <span>Nossos Serviços</span>
              </span>
            </Link>
            <Link href="/products" className="group relative inline-flex items-center justify-center px-8 py-4 font-black text-white uppercase tracking-wider text-sm border-2 border-white hover:border-amber-400 rounded-xl transition transform hover:scale-105 active:scale-95 hover:text-amber-400">
              <span className="relative z-10 flex items-center gap-2">
                <span>🛒</span>
                <span>Visitar Loja</span>
              </span>
            </Link>
            <Link href="/reservations" className="group relative inline-flex items-center justify-center px-8 py-4 font-black text-white uppercase tracking-wider text-sm bg-white/10 hover:bg-white/20 border-2 border-white/30 rounded-xl transition transform hover:scale-105 active:scale-95 backdrop-blur-sm">
              <span className="relative z-10 flex items-center gap-2">
                <span>📅</span>
                <span>Fazer Reserva</span>
              </span>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl">
            <div className="group">
              <div className="bg-gradient-to-br from-amber-950/50 to-gray-900 border-2 border-amber-800/30 backdrop-blur-sm p-5 rounded-xl group-hover:border-amber-600/50 transition">
                <div className="text-4xl font-black text-amber-400 mb-2">20+</div>
                <p className="text-white font-black text-xs uppercase tracking-wider">Anos de Experiência</p>
              </div>
            </div>
            <div className="group">
              <div className="bg-gradient-to-br from-amber-950/50 to-gray-900 border-2 border-amber-800/30 backdrop-blur-sm p-5 rounded-xl group-hover:border-amber-600/50 transition">
                <div className="text-4xl font-black text-amber-400 mb-2">500+</div>
                <p className="text-white font-black text-xs uppercase tracking-wider">Clientes Satisfeitos</p>
              </div>
            </div>
            <div className="group">
              <div className="bg-gradient-to-br from-amber-950/50 to-gray-900 border-2 border-amber-800/30 backdrop-blur-sm p-5 rounded-xl group-hover:border-amber-600/50 transition">
                <div className="text-4xl font-black text-amber-400 mb-2">100%</div>
                <p className="text-white font-black text-xs uppercase tracking-wider">Qualidade Garantida</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="text-amber-400 font-black text-2xl drop-shadow-lg">↓</div>
      </div>
    </div>
  );
}
