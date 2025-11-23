'use client';

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

interface Order {
  id: string;
  date: string;
  items: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
}

interface Reservation {
  id: string;
  date: string;
  time: string;
  type: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export default function ClientAreaPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('perfil');
  const [orders, setOrders] = useState<Order[]>([
    { id: 'PED-001', date: '2024-12-10', items: 'Sela de Dressage', total: 450, status: 'delivered' },
    { id: 'PED-002', date: '2024-12-15', items: 'Freio Português, Cabeção', total: 369, status: 'shipped' },
  ]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoadingReservations, setIsLoadingReservations] = useState(true);
  const [showNewReservationForm, setShowNewReservationForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    phone: '912 345 678',
    address: 'Rua Example, 123',
    birthDate: '1990-05-15',
  });
  const [newReservation, setNewReservation] = useState({
    date: '',
    time: '',
    type: 'individual',
    horse: '',
    level: 'iniciante',
    notes: '',
    isRecurring: false,
    recurringEndDate: ''
  });

  // Carregar reservas do banco de dados
  const fetchReservations = useCallback(async () => {
    if (!session?.user?.email) return;
    try {
      const response = await fetch('/api/reservations');
      if (response.ok) {
        const data = await response.json();
        // Filtrar reservas do utilizador actual pelo email
        const userReservations = data
          .filter((res: any) => res.email === session.user?.email)
          .map((res: any) => ({
            id: res.id,
            date: res.date,
            time: res.startTime,
            type: res.lessonType === 'individual' ? 'Aula Individual' : 'Aula em Grupo',
            status: res.status,
            isRecurring: res.isRecurring,
            horse: res.horse,
            level: res.level
          }));
        setReservations(userReservations);
      }
    } catch (error) {
      console.error('Erro ao carregar reservas:', error);
    } finally {
      setIsLoadingReservations(false);
    }
  }, [session?.user?.email]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    } else if (status === "authenticated") {
      fetchReservations();
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  const handleProfileSave = () => {
    setEditingProfile(false);
    // Aqui você salvaria os dados no servidor
  };

  const handleCancelReservation = (id: string) => {
    if (confirm('Tem a certeza que deseja cancelar esta reserva?')) {
      setReservations(reservations.map(r => r.id === id ? { ...r, status: 'cancelled' } : r));
    }
  };

  const handleRequestLesson = async () => {
    if (!newReservation.date || !newReservation.time) {
      alert('Preencha data e hora!');
      return;
    }

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session?.user?.email,
          date: newReservation.date,
          startTime: newReservation.time,
          lessonType: newReservation.type,
          horse: newReservation.horse || undefined,
          level: newReservation.level,
          notes: newReservation.notes || undefined
        })
      });

      if (response.ok) {
        alert('✅ Pedido de aula enviado para confirmação do administrador!');
        setShowNewReservationForm(false);
        setNewReservation({
          date: '',
          time: '',
          type: 'individual',
          horse: '',
          level: 'iniciante',
          notes: ''
        });
        await fetchReservations();
      } else {
        const error = await response.json();
        alert(`❌ ${error.error || 'Erro ao solicitar aula'}`);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('❌ Erro ao solicitar aula');
    }
  };

  const statusBadge = {
    delivered: 'bg-green-100 text-green-800',
    shipped: 'bg-blue-100 text-blue-800',
    processing: 'bg-yellow-100 text-yellow-800',
    pending: 'bg-orange-100 text-orange-800',
    cancelled: 'bg-red-100 text-red-800',
    confirmed: 'bg-green-100 text-green-800',
  };

  const statusLabel = {
    delivered: 'Entregue',
    shipped: 'Enviado',
    processing: 'Em Processamento',
    pending: 'Pendente',
    cancelled: 'Cancelada',
    confirmed: 'Confirmada',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Minha Área</h1>
              <p className="text-gray-600 mt-2">Bem-vindo(a) de volta! 👋</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition font-semibold"
            >
              Sair
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              {/* Profile Card */}
              <div className="text-center pb-6 border-b">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-3 shadow-lg">
                  👤
                </div>
                <p className="font-semibold text-gray-900 text-lg">{session?.user?.name}</p>
                <p className="text-sm text-gray-600 break-all">{session?.user?.email}</p>
                <p className="text-xs text-amber-600 font-semibold mt-2">Cliente Premium</p>
              </div>

              {/* Navigation */}
              <nav className="mt-6 space-y-2">
                {[
                  { id: 'perfil', label: 'Meu Perfil', icon: '👤' },
                  { id: 'compras', label: 'Meus Pedidos', icon: '🛍️' },
                  { id: 'reservas', label: 'Minhas Reservas', icon: '📅' },
                  { id: 'favoritos', label: 'Favoritos', icon: '❤️' },
                  { id: 'downloads', label: 'Downloads', icon: '📥' },
                  { id: 'configuracoes', label: 'Configurações', icon: '⚙️' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition font-medium ${
                      activeTab === item.id
                        ? 'bg-amber-100 text-amber-900 border-l-4 border-amber-600'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t space-y-3">
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-600">{orders.length}</p>
                  <p className="text-xs text-gray-600">Pedidos Totais</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{reservations.filter(r => r.status === 'confirmed').length}</p>
                  <p className="text-xs text-gray-600">Reservas Ativas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Perfil */}
            {activeTab === 'perfil' && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Meu Perfil</h2>
                  <button
                    onClick={() => setEditingProfile(!editingProfile)}
                    className="text-amber-600 hover:text-amber-700 font-semibold text-sm"
                  >
                    {editingProfile ? '✕ Cancelar' : '✎ Editar'}
                  </button>
                </div>

                {editingProfile ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                        <input type="text" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input type="email" value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
                        <input type="tel" value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Data de Nascimento</label>
                        <input type="date" value={profileData.birthDate} onChange={(e) => setProfileData({...profileData, birthDate: e.target.value})} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Morada</label>
                        <input type="text" value={profileData.address} onChange={(e) => setProfileData({...profileData, address: e.target.value})} placeholder="Rua, nº, Código Postal, Cidade" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent" />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button onClick={handleProfileSave} className="flex-1 bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition font-semibold">
                        Guardar Alterações
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-600 font-semibold uppercase">Nome Completo</p>
                        <p className="text-lg font-semibold text-gray-900">{profileData.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold uppercase">Email</p>
                        <p className="text-lg font-semibold text-gray-900">{profileData.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold uppercase">Telefone</p>
                        <p className="text-lg font-semibold text-gray-900">{profileData.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold uppercase">Data de Nascimento</p>
                        <p className="text-lg font-semibold text-gray-900">{profileData.birthDate}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-xs text-gray-600 font-semibold uppercase">Morada</p>
                        <p className="text-lg font-semibold text-gray-900">{profileData.address}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Pedidos */}
            {activeTab === 'compras' && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Meus Pedidos</h2>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-6 hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <p className="font-bold text-gray-900 text-lg">Pedido #{order.id}</p>
                            <p className="text-sm text-gray-600">Data: {order.date}</p>
                          </div>
                          <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusBadge[order.status as keyof typeof statusBadge]}`}>
                            {statusLabel[order.status as keyof typeof statusLabel]}
                          </span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded mb-4">
                          <p className="text-gray-700">{order.items}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-2xl font-bold text-amber-600">€{order.total.toFixed(2)}</p>
                          <button className="text-blue-600 hover:text-blue-800 font-semibold">Ver Detalhes →</button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📦</div>
                    <p className="text-gray-600 mb-4">Nenhum pedido realizado ainda</p>
                    <Link href="/products" className="text-amber-600 hover:text-amber-700 font-semibold">
                      Ir para a Loja →
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Reservas */}
            {activeTab === 'reservas' && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Minhas Aulas</h2>
                {isLoadingReservations ? (
                  <div className="text-center py-8 text-gray-600 font-bold">Carregando aulas...</div>
                ) : (
                  <div className="space-y-4">
                    {reservations.length > 0 ? (
                      reservations.map((res) => (
                        <div key={res.id} className="border rounded-lg p-6 hover:shadow-md transition">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <p className="font-bold text-gray-900 text-lg">{res.type}</p>
                              <p className="text-sm text-gray-600">📅 {res.date} às {res.time}</p>
                            </div>
                            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusBadge[res.status as keyof typeof statusBadge]}`}>
                              {statusLabel[res.status as keyof typeof statusLabel]}
                            </span>
                          </div>
                          {res.status !== 'cancelled' && (
                            <button
                              onClick={() => handleCancelReservation(res.id)}
                              className="text-red-600 hover:text-red-800 font-semibold text-sm"
                            >
                              Cancelar Aula
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">Nenhuma aula reservada</p>
                      </div>
                    )}
                    {!showNewReservationForm ? (
                      <button 
                        onClick={() => setShowNewReservationForm(true)}
                        className="w-full text-left p-4 bg-amber-50 hover:bg-amber-100 rounded-lg transition border-l-4 border-amber-600 font-semibold text-gray-900"
                      >
                        ➕ Solicitar Nova Aula
                      </button>
                    ) : (
                      <div className="bg-amber-50 rounded-lg p-6 border-l-4 border-amber-600">
                        <h3 className="font-bold text-gray-900 text-lg mb-4">Solicitar Aula</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Data</label>
                              <input
                                type="date"
                                value={newReservation.date}
                                onChange={(e) => setNewReservation({...newReservation, date: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Hora</label>
                              <input
                                type="time"
                                value={newReservation.time}
                                onChange={(e) => setNewReservation({...newReservation, time: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Aula</label>
                              <select
                                value={newReservation.type}
                                onChange={(e) => setNewReservation({...newReservation, type: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                              >
                                <option value="individual">Individual</option>
                                <option value="group">Grupo</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Nível</label>
                              <select
                                value={newReservation.level}
                                onChange={(e) => setNewReservation({...newReservation, level: e.target.value})}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                              >
                                <option value="iniciante">Iniciante</option>
                                <option value="intermédio">Intermédio</option>
                                <option value="avançado">Avançado</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Cavalo (opcional)</label>
                            <input
                              type="text"
                              value={newReservation.horse}
                              onChange={(e) => setNewReservation({...newReservation, horse: e.target.value})}
                              placeholder="Nome do cavalo de preferência"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Observações</label>
                            <textarea
                              value={newReservation.notes}
                              onChange={(e) => setNewReservation({...newReservation, notes: e.target.value})}
                              placeholder="Observações sobre a aula..."
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                              rows={3}
                            />
                          </div>
                          <div className="bg-blue-50 border border-blue-200 rounded p-4">
                            <p className="text-sm font-bold text-blue-900">ℹ️ Nota importante:</p>
                            <p className="text-sm text-blue-800 mt-1">Seu pedido será analisado pelo administrador e você receberá uma confirmação por email quando for aprovado.</p>
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={() => setShowNewReservationForm(false)}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-semibold text-gray-900"
                            >
                              Cancelar
                            </button>
                            <button
                              onClick={handleRequestLesson}
                              className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition font-semibold"
                            >
                              Solicitar Aula
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Favoritos */}
            {activeTab === 'favoritos' && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Meus Favoritos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { name: 'Sela de Dressage', price: 450, emoji: '🪑' },
                    { name: 'Freio Português', price: 280, emoji: '🐴' },
                  ].map((item) => (
                    <div key={item.name} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                      <div className="bg-gradient-to-br from-amber-100 to-amber-200 h-40 flex items-center justify-center text-6xl">{item.emoji}</div>
                      <div className="p-4">
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        <p className="text-2xl text-amber-600 font-bold mt-2">€{item.price}</p>
                        <button className="w-full mt-3 bg-amber-600 text-white py-2 rounded hover:bg-amber-700 transition font-semibold">
                          Adicionar ao Carrinho
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Downloads */}
            {activeTab === 'downloads' && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Meus Downloads</h2>
                <div className="space-y-3">
                  {[
                    { name: 'Guia de Cuidados com Selas', date: '2024-12-10' },
                    { name: 'Catálogo de Produtos 2024', date: '2024-12-01' },
                    { name: 'Horários de Aulas', date: '2024-11-20' },
                  ].map((doc) => (
                    <div key={doc.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                      <div>
                        <p className="font-semibold text-gray-900">📄 {doc.name}</p>
                        <p className="text-sm text-gray-600">{doc.date}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 font-semibold">⬇️ Descarregar</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Configurações */}
            {activeTab === 'configuracoes' && (
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Configurações</h2>
                <div className="space-y-6 border-t pt-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Segurança</h3>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                      Alterar Senha
                    </button>
                  </div>
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notificações</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-3 w-4 h-4 rounded" />
                        <span className="text-gray-700 font-medium">Notificações por Email sobre Pedidos</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-3 w-4 h-4 rounded" />
                        <span className="text-gray-700 font-medium">Notificações por Email sobre Reservas</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3 w-4 h-4 rounded" />
                        <span className="text-gray-700 font-medium">Receber Newsletter e Promoções</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-3 w-4 h-4 rounded" />
                        <span className="text-gray-700 font-medium">Notificações por SMS</span>
                      </label>
                    </div>
                  </div>
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacidade</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" defaultChecked className="mr-3 w-4 h-4 rounded" />
                        <span className="text-gray-700 font-medium">Perfil Público</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="mr-3 w-4 h-4 rounded" />
                        <span className="text-gray-700 font-medium">Permitir Cookies de Marketing</span>
                      </label>
                    </div>
                  </div>
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Conta</h3>
                    <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold">
                      Eliminar Conta
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
