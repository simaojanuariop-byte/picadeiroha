'use client';

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Reservation {
  id: string;
  type: string;
  date: string;
  time: string;
  horse?: string;
  status: 'Confirmada' | 'Pendente' | 'Cancelada';
}

interface Order {
  id: string;
  items: string;
  total: number;
  date: string;
  status: 'Pendente' | 'Em Processamento' | 'Enviado' | 'Entregue';
}

interface ClientData {
  name: string;
  email: string;
  phone: string;
  address: string;
  memberSince: string;
}

export default function ClientPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [clientData, setClientData] = useState<ClientData>({
    name: 'João Silva',
    email: 'joao@email.com',
    phone: '911234567',
    address: 'Rua das Flores, 123, Lisboa',
    memberSince: '2024-01-15',
  });

  const [reservations, setReservations] = useState<Reservation[]>([
    { id: '1', type: 'Aula Individual', date: '2024-12-15', time: '10:00', horse: 'Tornado', status: 'Confirmada' },
    { id: '2', type: 'Aula em Grupo', date: '2024-12-16', time: '14:30', horse: 'Beleza', status: 'Pendente' },
    { id: '3', type: 'Treino Avançado', date: '2024-12-10', time: '09:00', horse: 'Trovador', status: 'Confirmada' },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    { id: '001', items: 'Sela Dressage, Freio Português', total: 730, date: '2024-12-10', status: 'Entregue' },
    { id: '002', items: 'Colete de Proteção', total: 199, date: '2024-12-11', status: 'Enviado' },
    { id: '003', items: 'Cabeção de Dressage', total: 89, date: '2024-12-13', status: 'Em Processamento' },
  ]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="text-4xl mb-4">🐴</div>
        <p className="text-gray-600">Carregando...</p>
      </div>
    </div>;
  }

  if (!session) {
    return null;
  }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const handleCancelReservation = (id: string) => {
    if (confirm('Tem a certeza que deseja cancelar esta reserva?')) {
      setReservations(reservations.map(r =>
        r.id === id ? { ...r, status: 'Cancelada' } : r
      ));
    }
  };

  const statusColors: Record<string, string> = {
    'Confirmada': 'bg-green-100 text-green-800',
    'Pendente': 'bg-yellow-100 text-yellow-800',
    'Cancelada': 'bg-red-100 text-red-800',
    'Entregue': 'bg-green-100 text-green-800',
    'Enviado': 'bg-blue-100 text-blue-800',
    'Em Processamento': 'bg-yellow-100 text-yellow-800',
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">🐴 Minha Conta</h1>
              <p className="text-amber-100 mt-1">Bem-vindo ao Picadeiro Quinta da Horta</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="font-semibold">{clientData.name}</p>
                <p className="text-xs text-amber-100">Cliente</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-8">
            {[
              { id: 'overview', label: 'Resumo', icon: '📊' },
              { id: 'reservations', label: 'Minhas Reservas', icon: '📅' },
              { id: 'orders', label: 'Meus Pedidos', icon: '📦' },
              { id: 'profile', label: 'Meu Perfil', icon: '👤' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 transition font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-amber-600 text-amber-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">RESERVAS ATIVAS</h3>
                <p className="text-4xl font-bold text-gray-900">
                  {reservations.filter(r => r.status === 'Confirmada').length}
                </p>
                <p className="text-amber-600 text-sm mt-2">Próximas aulas agendadas</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">PEDIDOS PENDENTES</h3>
                <p className="text-4xl font-bold text-gray-900">
                  {orders.filter(o => o.status !== 'Entregue').length}
                </p>
                <p className="text-blue-600 text-sm mt-2">Aguardando entrega</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                <h3 className="text-gray-600 text-sm font-semibold mb-2">MEMBRO DESDE</h3>
                <p className="text-2xl font-bold text-gray-900">{clientData.memberSince}</p>
                <p className="text-purple-600 text-sm mt-2">Conta ativa</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Próximas Reservas */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Próximas Reservas</h2>
                <div className="space-y-3">
                  {reservations.filter(r => r.status === 'Confirmada').slice(0, 3).map((reservation) => (
                    <div key={reservation.id} className="p-4 border rounded-lg hover:bg-gray-50 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900">{reservation.type}</p>
                          <p className="text-sm text-gray-600">📅 {reservation.date} às {reservation.time}</p>
                          {reservation.horse && <p className="text-sm text-gray-600">🐴 Cavalo: {reservation.horse}</p>}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[reservation.status]}`}>
                          {reservation.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setActiveTab('reservations')}
                  className="w-full mt-4 text-amber-600 hover:text-amber-700 font-semibold text-sm"
                >
                  Ver todas as reservas →
                </button>
              </div>

              {/* Últimos Pedidos */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Últimos Pedidos</h2>
                <div className="space-y-3">
                  {orders.slice(0, 3).map((order) => (
                    <div key={order.id} className="p-4 border rounded-lg hover:bg-gray-50 transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-gray-900">Pedido #{order.id}</p>
                          <p className="text-sm text-gray-600">📅 {order.date}</p>
                          <p className="text-sm text-gray-500">{order.items}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">€{order.total.toFixed(2)}</p>
                          <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setActiveTab('orders')}
                  className="w-full mt-4 text-amber-600 hover:text-amber-700 font-semibold text-sm"
                >
                  Ver todos os pedidos →
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Ações Rápidas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/products"
                  className="p-4 bg-amber-50 hover:bg-amber-100 rounded-lg border-l-4 border-amber-600 transition font-semibold text-amber-900"
                >
                  🛍️ Comprar Equipamento
                </Link>
                <button
                  onClick={() => setActiveTab('reservations')}
                  className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border-l-4 border-blue-600 transition font-semibold text-blue-900"
                >
                  📅 Agendar Nova Aula
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reservations Tab */}
        {activeTab === 'reservations' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Minhas Reservas</h2>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                📅 Agendar Nova Aula
              </button>
            </div>

            <div className="space-y-4">
              {reservations.map((reservation) => (
                <div key={reservation.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{reservation.type}</h3>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <p>📅 Data: {reservation.date}</p>
                        <p>🕐 Hora: {reservation.time}</p>
                        {reservation.horse && <p>🐴 Cavalo: {reservation.horse}</p>}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-4 py-2 rounded-full font-semibold mb-3 ${statusColors[reservation.status]}`}>
                        {reservation.status}
                      </span>
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Editar</button>
                        {reservation.status !== 'Cancelada' && (
                          <button
                            onClick={() => handleCancelReservation(reservation.id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Cancelar
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Meus Pedidos</h2>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">ID Pedido</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Itens</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Total</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Data</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                      <td className="py-4 px-6 font-mono text-sm font-semibold">{order.id}</td>
                      <td className="py-4 px-6 text-sm text-gray-600">{order.items}</td>
                      <td className="py-4 px-6 font-semibold">€{order.total.toFixed(2)}</td>
                      <td className="py-4 px-6 text-sm">{order.date}</td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6">
              <Link
                href="/products"
                className="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition font-semibold"
              >
                🛍️ Continuar Comprando
              </Link>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Meu Perfil</h2>

            <div className="bg-white rounded-lg shadow p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                  <input
                    type="text"
                    value={clientData.name}
                    onChange={(e) => setClientData({ ...clientData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={clientData.email}
                      onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                    <input
                      type="tel"
                      value={clientData.phone}
                      onChange={(e) => setClientData({ ...clientData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Morada</label>
                  <input
                    type="text"
                    value={clientData.address}
                    onChange={(e) => setClientData({ ...clientData, address: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Membro Desde</label>
                  <input
                    type="text"
                    value={clientData.memberSince}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  />
                </div>

                <div className="pt-4 border-t">
                  <button className="bg-amber-600 text-white px-8 py-2 rounded-lg hover:bg-amber-700 transition font-semibold">
                    💾 Guardar Alterações
                  </button>
                </div>
              </div>

              {/* Change Password */}
              <div className="mt-8 pt-8 border-t">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Alterar Senha</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Senha Atual</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nova Senha</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="••••••••"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar Senha</label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <button className="bg-blue-600 text-white px-8 py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
                    🔐 Alterar Senha
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
