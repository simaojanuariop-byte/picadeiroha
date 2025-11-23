'use client';

import { BUSINESS_INFO } from '@/lib/constants';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { useCartStore } from '@/lib/store/cartStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const cartItems = useCartStore((state) => state.items.length);

  return (
    <nav className="bg-gradient-to-r from-amber-900 to-amber-800 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-90 transition">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-amber-900 font-bold text-lg">🐴</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-bold text-lg">{BUSINESS_INFO.name}</div>
              <div className="text-xs text-amber-100">Centro Equestre</div>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-amber-200 transition font-black text-black">Home</Link>
            <Link href="/historia" className="hover:text-amber-200 transition font-black text-black">História</Link>
            <Link href="/servicos" className="hover:text-amber-200 transition font-black text-black">Serviços</Link>
            <Link href="/products" className="hover:text-amber-200 transition font-black text-black">Loja</Link>
            <Link href="/reservations" className="hover:text-amber-200 transition font-black text-black">Reservas</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="hover:text-amber-200 transition flex items-center relative">
              <span className="text-2xl">🛒</span>
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Link>
            {session ? (
              <>
                <Link href="/client/area" className="bg-white text-amber-900 px-4 py-2 rounded hover:bg-amber-50 transition text-sm font-semibold flex items-center gap-2">
                  👤
                  Minha Área
                </Link>
                {(session.user as any)?.role === 'admin' && (
                  <Link href="/dashboard" className="bg-yellow-400 text-gray-900 px-4 py-2 rounded hover:bg-yellow-300 transition text-sm font-bold">
                    ⚙️ Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition text-sm font-semibold"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link href="/auth/login" className="bg-white text-amber-900 px-4 py-2 rounded hover:bg-amber-50 transition font-semibold">
                Login
              </Link>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white text-2xl hover:text-amber-200 transition"
          >
            ☰
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t border-amber-700">
            <Link href="/" className="block py-2 px-4 hover:bg-amber-700 transition">Home</Link>
            <Link href="/historia" className="block py-2 px-4 hover:bg-amber-700 transition">História</Link>
            <Link href="/servicos" className="block py-2 px-4 hover:bg-amber-700 transition">Serviços</Link>
            <Link href="/products" className="block py-2 px-4 hover:bg-amber-700 transition">Loja</Link>
            <Link href="/reservations" className="block py-2 px-4 hover:bg-amber-700 transition">Reservas</Link>
            <Link href="/cart" className="block py-2 px-4 hover:bg-amber-700 transition flex items-center justify-between">
              Carrinho
              {cartItems > 0 && (
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {cartItems}
                </span>
              )}
            </Link>
            {session ? (
              <>
                <Link href="/client/area" className="block py-2 px-4 hover:bg-amber-700 transition">👤 Minha Área</Link>
                {(session.user as any)?.role === 'admin' && (
                  <Link href="/dashboard" className="block py-2 px-4 hover:bg-amber-700 transition font-bold bg-yellow-500 text-gray-900">⚙️ Admin</Link>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="block w-full text-left py-2 px-4 hover:bg-amber-700 transition"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link href="/auth/login" className="block py-2 px-4 hover:bg-amber-700 transition">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
