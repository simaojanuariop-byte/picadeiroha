'use client';

import { useState } from 'react';

interface AnalyticsData {
  metric: string;
  value: number;
  change: number;
  trend: 'up' | 'down';
}

export default function AnalyticsTab() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  const analyticsData: AnalyticsData[] = [
    { metric: 'Receita Total', value: 12450, change: 12, trend: 'up' },
    { metric: 'Pedidos Completados', value: 45, change: 8, trend: 'up' },
    { metric: 'Reservas Confirmadas', value: 28, change: -3, trend: 'down' },
    { metric: 'Clientes Ativos', value: 156, change: 15, trend: 'up' },
    { metric: 'Taxa de Conversão', value: 34.5, change: 2.3, trend: 'up' },
    { metric: 'Tempo Médio de Entrega', value: 2.4, change: -0.5, trend: 'down' },
  ];

  const topProducts = [
    { name: 'Sela de Dressage', sales: 12, revenue: 5400 },
    { name: 'Freio Português', sales: 18, revenue: 5040 },
    { name: 'Colete de Proteção', sales: 8, revenue: 1592 },
    { name: 'Cabeção de Dressage', sales: 22, revenue: 1958 },
    { name: 'Sela de Salto', sales: 5, revenue: 2600 },
  ];

  const dailyRevenue = [
    { day: 'Seg', revenue: 1200 },
    { day: 'Ter', revenue: 1450 },
    { day: 'Qua', revenue: 1100 },
    { day: 'Qui', revenue: 1800 },
    { day: 'Sex', revenue: 2100 },
    { day: 'Sab', revenue: 2400 },
    { day: 'Dom', revenue: 1400 },
  ];

  const maxRevenue = Math.max(...dailyRevenue.map(d => d.revenue));

  return (
    <div className="space-y-8">
      {/* Filtros */}
      <div className="flex gap-4">
        {(['week', 'month', 'year'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              timeRange === range
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {range === 'week' ? 'Última Semana' : range === 'month' ? 'Último Mês' : 'Último Ano'}
          </button>
        ))}
      </div>

      {/* KPIs */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Indicadores-Chave de Desempenho</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analyticsData.map((item) => (
            <div key={item.metric} className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{item.metric}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {typeof item.value === 'number' && item.value % 1 !== 0
                      ? item.value.toFixed(1)
                      : item.value}
                    {item.metric.includes('Taxa') ? '%' : item.metric.includes('Receita') ? '€' : ''}
                  </p>
                </div>
                <div className={`px-2 py-1 rounded-full text-sm font-semibold ${
                  item.trend === 'up'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {item.trend === 'up' ? '↑' : '↓'} {Math.abs(item.change)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gráfico de Receita Diária */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Receita Diária</h3>
        <div className="flex items-end gap-2 h-48">
          {dailyRevenue.map((item) => (
            <div key={item.day} className="flex-1 flex flex-col items-center">
              <div className="relative w-full h-full flex items-end justify-center">
                <div
                  className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition hover:opacity-80 cursor-pointer"
                  style={{
                    height: `${(item.revenue / maxRevenue) * 100}%`,
                    minHeight: '4px'
                  }}
                  title={`€${item.revenue}`}
                />
              </div>
              <p className="text-sm font-medium text-gray-700 mt-2">{item.day}</p>
              <p className="text-xs text-gray-600">€{item.revenue}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Produtos Mais Vendidos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Produtos Mais Vendidos</h3>
          <div className="space-y-3">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} vendas</p>
                  </div>
                </div>
                <p className="font-bold text-purple-600">€{product.revenue.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Distribuição de Vendas */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Resumo de Vendas</h3>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-300 rounded-lg p-4">
              <p className="text-green-700 text-sm font-semibold">VENDAS ONLINE</p>
              <p className="text-3xl font-bold text-green-900 mt-2">€8.400</p>
              <p className="text-green-600 text-sm mt-1">67% das vendas totais</p>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-300 rounded-lg p-4">
              <p className="text-orange-700 text-sm font-semibold">RESERVAS DE AULAS</p>
              <p className="text-3xl font-bold text-orange-900 mt-2">€4.050</p>
              <p className="text-orange-600 text-sm mt-1">33% das vendas totais</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela Detalhada */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Detalhada por Produto</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Produto</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Vendas</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Receita</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Ticket Médio</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Margem</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product) => (
                <tr key={product.name} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4 font-medium">{product.name}</td>
                  <td className="py-3 px-4 text-right text-gray-700">{product.sales}</td>
                  <td className="py-3 px-4 text-right font-semibold text-green-600">€{product.revenue.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right text-gray-700">€{(product.revenue / product.sales).toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm font-semibold">35%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
