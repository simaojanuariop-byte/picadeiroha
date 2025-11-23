'use client';

import { useState } from 'react';

interface Order {
  id: string;
  customer: string;
  items: string;
  total: number;
  date: string;
  status: 'Pendente' | 'Em Processamento' | 'Enviado' | 'Entregue';
}

export default function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([
    { id: '001', customer: 'João Silva', items: 'Sela Dressage, Freio Português', total: 730, date: '2024-12-10', status: 'Entregue' },
    { id: '002', customer: 'Maria Santos', items: 'Colete de Proteção', total: 199, date: '2024-12-11', status: 'Enviado' },
    { id: '003', customer: 'Pedro Costa', items: 'Cabeção de Dressage, Sela de Salto', total: 609, date: '2024-12-12', status: 'Em Processamento' },
    { id: '004', customer: 'Ana Silva', items: 'Freio Português', total: 280, date: '2024-12-13', status: 'Pendente' },
  ]);

  const handleStatusChange = (id: string, status: Order['status']) => {
    setOrders(
      orders.map(o =>
        o.id === id ? { ...o, status } : o
      )
    );
  };

  const statusColors: Record<Order['status'], string> = {
    'Pendente': 'bg-gray-100 text-gray-800',
    'Em Processamento': 'bg-yellow-100 text-yellow-800',
    'Enviado': 'bg-blue-100 text-blue-800',
    'Entregue': 'bg-green-100 text-green-800',
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Gestão de Pedidos Online</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <p className="text-sm text-orange-700">Pedidos Pendentes</p>
          <p className="text-2xl font-bold text-orange-900">{orders.filter(o => o.status === 'Pendente').length}</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-700">Em Processamento</p>
          <p className="text-2xl font-bold text-yellow-900">{orders.filter(o => o.status === 'Em Processamento').length}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-700">Enviados</p>
          <p className="text-2xl font-bold text-blue-900">{orders.filter(o => o.status === 'Enviado').length}</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-700">Entregues</p>
          <p className="text-2xl font-bold text-green-900">{orders.filter(o => o.status === 'Entregue').length}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-4 px-4 font-semibold text-gray-900">ID Pedido</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Cliente</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Itens</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Total</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Data</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-4 px-4 font-mono text-sm">{order.id}</td>
                <td className="py-4 px-4 font-medium">{order.customer}</td>
                <td className="py-4 px-4 text-sm text-gray-600">{order.items}</td>
                <td className="py-4 px-4 font-semibold">€{order.total.toFixed(2)}</td>
                <td className="py-4 px-4 text-sm">{order.date}</td>
                <td className="py-4 px-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                    className={`px-3 py-1 rounded-full text-sm font-semibold border-0 cursor-pointer ${statusColors[order.status]}`}
                  >
                    <option value="Pendente">Pendente</option>
                    <option value="Em Processamento">Em Processamento</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Entregue">Entregue</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
