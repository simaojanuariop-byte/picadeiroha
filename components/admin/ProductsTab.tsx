'use client';

import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
  description?: string;
}

export default function ProductsTab() {
  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Sela de Dressage', price: 450, stock: 5, category: 'Selas', description: 'Sela profissional de dressage' },
    { id: '2', name: 'Freio Português', price: 280, stock: 12, category: 'Freios', description: 'Freio tradicional português' },
    { id: '3', name: 'Colete de Proteção', price: 199, stock: 3, category: 'Equipamento', description: 'Colete de proteção para cavaleiros' },
    { id: '4', name: 'Cabeção de Dressage', price: 89, stock: 8, category: 'Acessórios', description: 'Cabeção profissional' },
    { id: '5', name: 'Sela de Salto', price: 520, stock: 2, category: 'Selas', description: 'Sela de salto em altura' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', price: 0, stock: 0, category: '', description: '', image: '' });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleAddProduct = () => {
    setEditingId(null);
    setFormData({ name: '', price: 0, stock: 0, category: '', description: '', image: '' });
    setPreviewImage(null);
    setShowModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingId(product.id);
    setFormData({ 
      name: product.name, 
      price: product.price, 
      stock: product.stock, 
      category: product.category,
      description: product.description || '',
      image: product.image || ''
    });
    setPreviewImage(product.image || null);
    setShowModal(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData({ ...formData, image: base64String });
        setPreviewImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!formData.name || !formData.category || formData.price <= 0) {
      alert('Por favor preencha todos os campos obrigatórios');
      return;
    }

    if (editingId) {
      setProducts(products.map(p => p.id === editingId ? { ...p, ...formData } : p));
    } else {
      setProducts([...products, { id: Date.now().toString(), ...formData }]);
    }
    
    setSaved(true);
    setTimeout(() => {
      setShowModal(false);
      setSaved(false);
    }, 1500);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem a certeza que deseja remover este produto?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-black text-black">Gestão de Produtos</h2>
        <button
          onClick={handleAddProduct}
          className="bg-amber-600 text-black font-black px-6 py-2 rounded-lg hover:bg-amber-700 transition"
        >
          ➕ Novo Produto
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gray-50">
              <th className="text-left py-4 px-4 font-black text-black">Imagem</th>
              <th className="text-left py-4 px-4 font-black text-black">Produto</th>
              <th className="text-left py-4 px-4 font-black text-black">Preço</th>
              <th className="text-left py-4 px-4 font-black text-black">Stock</th>
              <th className="text-left py-4 px-4 font-black text-black">Categoria</th>
              <th className="text-left py-4 px-4 font-black text-black">Ações</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-4 px-4">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400">📦</div>
                  )}
                </td>
                <td className="py-4 px-4 font-bold text-black">{product.name}</td>
                <td className="py-4 px-4 font-bold text-amber-600">€{product.price.toFixed(2)}</td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-black ${
                      product.stock > 5 ? 'bg-green-100 text-green-800' : product.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>
                <td className="py-4 px-4 font-bold text-black">{product.category}</td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-blue-600 hover:text-blue-800 mr-3 font-black"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-800 font-black"
                  >
                    🗑️ Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-black text-black mb-6">
              {editingId ? '✏️ Editar Produto' : '➕ Novo Produto'}
            </h3>

            {saved && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg font-bold text-center">
                ✅ Produto guardado com sucesso!
              </div>
            )}

            <div className="space-y-4">
              {/* Imagem Upload */}
              <div>
                <label className="block text-sm font-black text-black mb-2">📸 Imagem do Produto</label>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 text-black font-bold"
                    />
                    <p className="text-xs text-gray-600 mt-1">PNG, JPG até 5MB</p>
                  </div>
                  {previewImage && (
                    <div className="w-24 h-24 rounded-lg border border-gray-300 overflow-hidden">
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Nome */}
              <div>
                <label className="block text-sm font-black text-black mb-1">Nome *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 font-bold text-black"
                  placeholder="Nome do produto"
                />
              </div>

              {/* Descrição */}
              <div>
                <label className="block text-sm font-black text-black mb-1">Descrição</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 font-bold text-black"
                  placeholder="Descrição do produto"
                />
              </div>

              {/* Preço e Stock */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-black text-black mb-1">Preço (€) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 font-bold text-black"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-1">Stock *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 font-bold text-black"
                    placeholder="0"
                  />
                </div>
              </div>

              {/* Categoria */}
              <div>
                <label className="block text-sm font-black text-black mb-1">Categoria *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 font-bold text-black"
                >
                  <option value="">Selecionar categoria</option>
                  <option value="Selas">Selas</option>
                  <option value="Freios">Freios</option>
                  <option value="Equipamento">Equipamento</option>
                  <option value="Acessórios">Acessórios</option>
                  <option value="Roupas">Roupas</option>
                  <option value="Nutrição">Nutrição</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-black text-black"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-3 bg-amber-600 text-black rounded-lg hover:bg-amber-700 transition font-black"
              >
                💾 Guardar Produto
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
