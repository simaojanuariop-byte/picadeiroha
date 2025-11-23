'use client';

import { BUSINESS_INFO } from '@/lib/constants';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4">{BUSINESS_INFO.name}</h3>
            <p className="text-gray-400 text-sm">Centro Equestre de Excelência com mais de 20 anos de experiência.</p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Menu</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/historia" className="hover:text-white transition">História</Link></li>
              <li><Link href="/products" className="hover:text-white transition">Loja</Link></li>
              <li><Link href="/reservations" className="hover:text-white transition">Reservas</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contacto</h3>
            <div className="text-gray-400 text-sm space-y-2">
              <p>📍 {BUSINESS_INFO.address}</p>
              <p>📞 {BUSINESS_INFO.phone}</p>
              <p>✉️ {BUSINESS_INFO.email}</p>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-bold text-lg mb-4">Horário</h3>
            <div className="text-gray-400 text-sm space-y-1">
              <p>Seg-Sábado: {BUSINESS_INFO.hours.weekday}</p>
              <p>Domingo: {BUSINESS_INFO.hours.sunday}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2025x {BUSINESS_INFO.name}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
