'use client';

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductsTab from "@/components/admin/ProductsTab";
import ReservationsTab from "@/components/admin/ReservationsTab";
import OrdersTab from "@/components/admin/OrdersTab";
import UsersTab from "@/components/admin/UsersTab";
import ReportsTab from "@/components/admin/ReportsTab";
import SettingsTab from "@/components/admin/SettingsTab";
import AnalyticsTab from "@/components/admin/AnalyticsTab";
import CMSTab from "@/components/admin/CMSTab";
import CalendarTab from "@/components/admin/CalendarTab";
import NotificationsTab from "@/components/admin/NotificationsTab";
import AvailabilityTab from "@/components/admin/AvailabilityTab";
import ProfessorsTab from "@/components/admin/ProfessorsTab";
import HorsesTab from "@/components/admin/HorsesTab";
import ServicesTab from "@/components/admin/ServicesTab";
import LessonRequestsTab from "@/components/admin/LessonRequestsTab";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
    // Verificar se é admin
    if (session && (session.user as any)?.role !== "admin") {
      router.push("/");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="text-4xl mb-4">🐴</div>
        <p className="text-gray-600">Carregando...</p>
      </div>
    </div>;
  }

  if (!session || (session.user as any)?.role !== "admin") {
    return null;
  }

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white transition-all duration-300 shadow-lg flex flex-col`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div className={`text-2xl ${sidebarOpen ? '' : 'hidden'}`}>🐴</div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white transition"
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 py-6 space-y-2 overflow-y-auto px-3">
          {[
            { id: 'overview', label: 'Resumo', icon: '📊' },
            { id: 'calendar', label: 'Calendário', icon: '📆' },
            { id: 'lesson-requests', label: 'Pedidos de Aulas', icon: '📝' },
            { id: 'professors', label: 'Professores', icon: '👨‍🏫' },
            { id: 'horses', label: 'Cavalos', icon: '🐴' },
            { id: 'services', label: 'Serviços', icon: '🎯' },
            { id: 'availability', label: 'Disponibilidade', icon: '🏆' },
            { id: 'notifications', label: 'Notificações', icon: '🔔' },
            { id: 'analytics', label: 'Analytics', icon: '📈' },
            { id: 'cms', label: 'CMS', icon: '✏️' },
            { id: 'products', label: 'Produtos', icon: '🛍️' },
            { id: 'reservations', label: 'Reservas', icon: '📅' },
            { id: 'orders', label: 'Pedidos', icon: '📦' },
            { id: 'users', label: 'Utilizadores', icon: '👥' },
            { id: 'reports', label: 'Relatórios', icon: '📉' },
            { id: 'settings', label: 'Configurações', icon: '⚙️' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === item.id
                  ? 'bg-amber-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className={sidebarOpen ? '' : 'hidden'}>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* User Section */}
        <div className="border-t border-gray-800 p-4">
          <div className={`flex items-center gap-3 ${sidebarOpen ? '' : 'justify-center'}`}>
            <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center font-bold">
              A
            </div>
            <div className={sidebarOpen ? '' : 'hidden'}>
              <p className="text-sm font-semibold text-white">Admin</p>
              <p className="text-xs text-gray-400">Ativo</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className={`w-full mt-3 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition text-sm ${
              sidebarOpen ? '' : 'p-2'
            }`}
          >
            {sidebarOpen ? 'Sair' : '🚪'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
          <div className="px-8 py-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black text-black">Painel Administrativo</h1>
              <p className="text-black font-bold text-sm mt-1">Gilberto Filipe - Centro Equestre de Excelência</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="font-black text-black">{session.user?.name}</p>
                <p className="text-xs text-black font-bold">Administrador</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                {session.user?.name?.[0]?.toUpperCase() || 'A'}
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Stats Overview */}
            {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-300 rounded-lg p-6 shadow hover:shadow-lg transition">
                  <h3 className="text-black text-sm font-black mb-2">TOTAL DE VENDAS</h3>
                  <p className="text-4xl font-black text-black">€0</p>
                  <p className="text-black text-sm mt-2 font-bold">Dados em tempo real</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-300 rounded-lg p-6 shadow hover:shadow-lg transition">
                  <h3 className="text-black text-sm font-black mb-2">RESERVAS ATIVAS</h3>
                  <p className="text-4xl font-black text-black">0</p>
                  <p className="text-black text-sm mt-2 font-bold">Sem agendamentos</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-300 rounded-lg p-6 shadow hover:shadow-lg transition">
                  <h3 className="text-black text-sm font-black mb-2">PRODUTOS EM STOCK</h3>
                  <p className="text-4xl font-black text-black">0</p>
                  <p className="text-black text-sm mt-2 font-bold">Sem produtos</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-300 rounded-lg p-6 shadow hover:shadow-lg transition">
                  <h3 className="text-black text-sm font-black mb-2">UTILIZADORES</h3>
                  <p className="text-4xl font-black text-black">0</p>
                  <p className="text-black text-sm mt-2 font-bold">Registados</p>
                </div>
              </div>

              <h2 className="text-2xl font-black text-black mb-6">Painel de Controlo</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-black text-black mb-4">ℹ️ Boas-vindas</h3>
                  <div className="space-y-3">
                    <div className="p-4 bg-blue-50 rounded border-l-4 border-blue-600">
                      <p className="text-sm font-black text-black">Sistema operacional</p>
                      <p className="text-xs text-black font-bold">Pronto para receber dados</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded border-l-4 border-green-600">
                      <p className="text-sm font-black text-black">Base de dados conectada</p>
                      <p className="text-xs text-black font-bold">PostgreSQL ativo</p>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded border-l-4 border-yellow-600">
                      <p className="text-sm font-black text-black">Configuração completa</p>
                      <p className="text-xs text-black font-bold">Todos os módulos prontos</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-black text-black mb-4">⚡ Ações Rápidas</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={() => setActiveTab('products')}
                      className="w-full text-left p-4 bg-amber-50 hover:bg-amber-100 rounded transition border-l-4 border-amber-600 font-black text-black"
                    >
                      ➕ Adicionar Produto
                    </button>
                    <button 
                      onClick={() => setActiveTab('reservations')}
                      className="w-full text-left p-4 bg-blue-50 hover:bg-blue-100 rounded transition border-l-4 border-blue-600 font-black text-black"
                    >
                      📅 Nova Reserva
                    </button>
                    <button 
                      onClick={() => setActiveTab('users')}
                      className="w-full text-left p-4 bg-purple-50 hover:bg-purple-100 rounded transition border-l-4 border-purple-600 font-black text-black"
                    >
                      👤 Novo Utilizador
                    </button>
                    <button 
                      onClick={() => setActiveTab('reports')}
                      className="w-full text-left p-4 bg-green-50 hover:bg-green-100 rounded transition border-l-4 border-green-600 font-black text-black"
                    >
                      📊 Ver Relatórios
                    </button>
                  </div>
                </div>
              </div>
            </div>
            )}

            {activeTab === 'calendar' && <CalendarTab />}
            {activeTab === 'lesson-requests' && <LessonRequestsTab />}
            {activeTab === 'professors' && <ProfessorsTab />}
            {activeTab === 'horses' && <HorsesTab />}
            {activeTab === 'services' && <ServicesTab />}
            {activeTab === 'availability' && <AvailabilityTab />}
            {activeTab === 'notifications' && <NotificationsTab />}
            {activeTab === 'analytics' && <AnalyticsTab />}
            {activeTab === 'cms' && <CMSTab />}
            {activeTab === 'products' && <ProductsTab />}
            {activeTab === 'reservations' && <ReservationsTab />}
            {activeTab === 'orders' && <OrdersTab />}
            {activeTab === 'users' && <UsersTab />}
            {activeTab === 'reports' && <ReportsTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}
