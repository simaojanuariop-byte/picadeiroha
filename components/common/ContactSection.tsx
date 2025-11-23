'use client';

import { BUSINESS_INFO } from '@/lib/constants';

export default function ContactSection() {
  return (
    <section className="py-20 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-black mb-4">Entre em Contacto</h2>
          <p className="text-black font-bold text-lg">Visite-nos ou contacte-nos para mais informações</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Address */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="text-xl font-black text-black mb-2">Localização</h3>
            <p className="text-black font-bold">{BUSINESS_INFO.address}</p>
          </div>

          {/* Phone */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-4xl mb-4">📞</div>
            <h3 className="text-xl font-black text-black mb-2">Telefone</h3>
            <p className="text-black font-bold">{BUSINESS_INFO.phone}</p>
            <p className="text-black font-bold text-sm mt-2">Disponível durante o horário de funcionamento</p>
          </div>

          {/* Hours */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-4xl mb-4">🕐</div>
            <h3 className="text-xl font-black text-black mb-2">Horário</h3>
            <p className="text-black font-bold">Seg-Sábado: {BUSINESS_INFO.hours.weekday}</p>
            <p className="text-black font-bold">Domingo: {BUSINESS_INFO.hours.sunday}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
