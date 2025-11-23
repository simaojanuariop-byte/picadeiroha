'use client';

import { useCartStore } from '@/lib/store/cartStore';
import Link from 'next/link';
import { useState } from 'react';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);
  const [notification, setNotification] = useState('');

  const handleCheckout = () => {
    if (items.length === 0) {
      setNotification('Carrinho vazio!');
      setTimeout(() => setNotification(''), 3000);
      return;
    }
    setNotification('Processando pagamento...');
    setTimeout(() => {
      clearCart();
      setNotification('Pedido realizado com sucesso!');
      setTimeout(() => setNotification(''), 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Carrinho de Compras</h1>
          <Link href="/products" className="text-amber-600 hover:text-amber-700 font-semibold">
            ← Voltar à Loja
          </Link>
        </div>

        {/* Notification */}
        {notification && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg text-center font-semibold">
            {notification}
          </div>
        )}

        {items.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Carrinho Vazio</h2>
            <p className="text-gray-600 mb-6">Adicione produtos à sua lista de compras</p>
            <Link href="/products" className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition font-semibold">
              Continuar Comprando
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="text-5xl bg-amber-50 w-24 h-24 rounded-lg flex items-center justify-center">
                      {item.image}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                      <p className="text-2xl font-bold text-amber-600 mt-2">€{item.price.toFixed(2)}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4 mt-4">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="bg-gray-200 text-gray-700 w-8 h-8 rounded hover:bg-gray-300 transition font-bold"
                        >
                          −
                        </button>
                        <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="bg-gray-200 text-gray-700 w-8 h-8 rounded hover:bg-gray-300 transition font-bold"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto text-red-600 hover:text-red-800 font-semibold"
                        >
                          Remover
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right">
                      <p className="text-sm text-gray-600 mb-2">Subtotal</p>
                      <p className="text-2xl font-bold text-gray-900">€{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6 sticky top-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumo</h2>

                <div className="space-y-4 pb-6 border-b">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">€{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Envio</span>
                    <span className="font-semibold text-green-600">Grátis</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">IVA (23%)</span>
                    <span className="font-semibold">€{(getTotalPrice() * 0.23).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between mt-6 mb-6">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-amber-600">€{(getTotalPrice() * 1.23).toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition font-bold text-lg mb-3"
                >
                  Checkout
                </button>

                <button
                  onClick={() => clearCart()}
                  className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition font-semibold"
                >
                  Limpar Carrinho
                </button>

                {/* Security Badge */}
                <div className="mt-6 pt-6 border-t text-center">
                  <p className="text-sm text-gray-600 mb-2">🔒 Pagamento Seguro</p>
                  <p className="text-xs text-gray-500">Stripe Payment Gateway</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
