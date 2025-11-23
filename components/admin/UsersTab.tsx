'use client';

import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'instructor' | 'admin';
  joinDate: string;
  status: 'Ativo' | 'Inativo';
}

export default function UsersTab() {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'João Silva', email: 'joao@email.com', phone: '911234567', role: 'customer', joinDate: '2024-01-15', status: 'Ativo' },
    { id: '2', name: 'Maria Santos', email: 'maria@email.com', phone: '921234567', role: 'instructor', joinDate: '2024-02-20', status: 'Ativo' },
    { id: '3', name: 'Pedro Costa', email: 'pedro@email.com', phone: '931234567', role: 'customer', joinDate: '2024-03-10', status: 'Ativo' },
    { id: '4', name: 'Ana Silva', email: 'ana@email.com', phone: '941234567', role: 'customer', joinDate: '2024-04-05', status: 'Inativo' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', role: 'customer' as const });

  const handleAddUser = () => {
    setFormData({ name: '', email: '', phone: '', role: 'customer' });
    setShowModal(true);
  };

  const handleSave = () => {
    setUsers([
      ...users,
      {
        id: Date.now().toString(),
        ...formData,
        joinDate: new Date().toISOString().split('T')[0],
        status: 'Ativo'
      }
    ]);
    setShowModal(false);
  };

  const toggleStatus = (id: string) => {
    setUsers(
      users.map(u =>
        u.id === id
          ? { ...u, status: u.status === 'Ativo' ? 'Inativo' : 'Ativo' }
          : u
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem a certeza que deseja remover este utilizador?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const roleColors: Record<User['role'], string> = {
    'customer': 'bg-blue-100 text-blue-800',
    'instructor': 'bg-purple-100 text-purple-800',
    'admin': 'bg-red-100 text-red-800',
  };

  const roleLabels: Record<User['role'], string> = {
    'customer': 'Cliente',
    'instructor': 'Instrutor',
    'admin': 'Admin',
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestão de Utilizadores</h2>
        <button
          onClick={handleAddUser}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          👤 Novo Utilizador
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Nome</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Email</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Telefone</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Papel</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Membro desde</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Status</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-4 px-4 font-medium">{user.name}</td>
                <td className="py-4 px-4 text-sm">{user.email}</td>
                <td className="py-4 px-4 text-sm">{user.phone}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${roleColors[user.role]}`}>
                    {roleLabels[user.role]}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm">{user.joinDate}</td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => toggleStatus(user.id)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold cursor-pointer transition ${
                      user.status === 'Ativo'
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    {user.status}
                  </button>
                </td>
                <td className="py-4 px-4">
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Novo Utilizador</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                  placeholder="911234567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Papel</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="customer">Cliente</option>
                  <option value="instructor">Instrutor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
