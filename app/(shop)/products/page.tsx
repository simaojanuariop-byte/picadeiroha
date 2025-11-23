'use client';

import { useCartStore } from '@/lib/store/cartStore';
import { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  inStock: boolean;
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [notification, setNotification] = useState<string>('');
  const addItem = useCartStore((state) => state.addItem);

  const products: Product[] = [
    { id: 1, name: 'Sela de Dressage Premium', price: 450, image: '🪑', category: 'Selas', description: 'Sela profissional de dressage de alta qualidade', inStock: true },
    { id: 2, name: 'Freio Português Tradicional', price: 280, image: '🎯', category: 'Freios', description: 'Freio tradicional português com design ergonômico', inStock: true },
    { id: 3, name: 'Bridão Estruturado', price: 150, image: '🎪', category: 'Bridões', description: 'Bridão estruturado para melhor controle', inStock: true },
    { id: 4, name: 'Colete de Proteção Profissional', price: 199, image: '🦺', category: 'Equipamento Pessoal', description: 'Colete de proteção com proteções laterais', inStock: true },
    { id: 5, name: 'Jaqueta de Competição', price: 320, image: '🧥', category: 'Vestuário', description: 'Jaqueta profissional para competições', inStock: true },
    { id: 6, name: 'Kit de Higiene Equina', price: 85, image: '🧹', category: 'Higiene', description: 'Kit completo de higiene e limpeza', inStock: false },
    { id: 7, name: 'Ração Premium Horse 20kg', price: 42, image: '🌾', category: 'Alimentação', description: 'Ração premium balanceada para cavalos', inStock: true },
    { id: 8, name: 'Acessórios de Montagem', price: 125, image: '🛠️', category: 'Acessórios', description: 'Acessórios variados de montagem', inStock: true },
    { id: 9, name: 'Capa de Chuva Equina', price: 95, image: '🌧️', category: 'Vestuário', description: 'Capa impermeável resistente', inStock: true },
    { id: 10, name: 'Botas de Trabalho', price: 180, image: '👢', category: 'Vestuário', description: 'Botas profissionais de couro', inStock: true },
    { id: 11, name: 'Cabeção de Dressage', price: 89, image: '🎀', category: 'Acessórios', description: 'Cabeção específico para dressage', inStock: true },
    { id: 12, name: 'Sela de Salto', price: 520, image: '🏇', category: 'Selas', description: 'Sela profissional para saltos', inStock: true },
  ];

  const categories = ['Todos', ...new Set(products.map((p) => p.category))];
  const filteredProducts = selectedCategory === 'Todos' ? products : products.filter((p) => p.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) {
      setNotification('Produto indisponível!');
      setTimeout(() => setNotification(''), 3000);
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });

    setNotification(`${product.name} adicionado ao carrinho!`);
    setTimeout(() => setNotification(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Loja Online</h1>
          <p className="text-gray-600 text-lg">Equipamentos de qualidade para cavalaria profissional</p>
          <div className="mt-6">
            <Link href="/cart" className="inline-block bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition font-semibold">
              Ver Carrinho
            </Link>
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-lg text-center font-semibold animate-pulse">
            ✓ {notification}
          </div>
        )}

        {/* Categories Filter */}
        <div className="mb-12 flex flex-wrap gap-3 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                selectedCategory === category
                  ? 'bg-amber-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-amber-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`rounded-xl shadow-md overflow-hidden transition transform hover:scale-105 ${
                product.inStock ? 'bg-white hover:shadow-xl' : 'bg-gray-100 opacity-60'
              }`}
            >
              {/* Product Image */}
              <div className="text-7xl bg-gradient-to-br from-amber-100 to-amber-50 p-8 text-center border-b-2 border-amber-100">
                {product.image}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <p className="text-xs text-amber-600 font-bold uppercase tracking-wider mb-2">{product.category}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <p className="text-3xl font-bold text-amber-600">€{product.price.toFixed(2)}</p>
                  {!product.inStock && (
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                      Indisponível
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                  className={`w-full py-3 rounded-lg font-bold transition text-white ${
                    product.inStock
                      ? 'bg-amber-600 hover:bg-amber-700 active:scale-95'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? '🛒 Adicionar ao Carrinho' : 'Fora de Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-gray-600 text-lg">Nenhum produto nesta categoria</p>
          </div>
        )}
      </div>
    </div>
  );
}
