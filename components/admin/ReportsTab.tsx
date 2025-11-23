'use client';

export default function ReportsTab() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Relatórios e Análises</h2>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-300 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-4">Vendas do Mês</h3>
          <p className="text-4xl font-bold text-green-900 mb-2">€3.450</p>
          <p className="text-sm text-green-700">↑ 15% comparado com mês anterior</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-300 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Reservas do Mês</h3>
          <p className="text-4xl font-bold text-blue-900 mb-2">42</p>
          <p className="text-sm text-blue-700">12 aulas iniciantes, 30 avançadas</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-300 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-4">Clientes Ativos</h3>
          <p className="text-4xl font-bold text-purple-900 mb-2">45</p>
          <p className="text-sm text-purple-700">3 novos este mês</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-300 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-orange-900 mb-4">Taxa de Conversão</h3>
          <p className="text-4xl font-bold text-orange-900 mb-2">28%</p>
          <p className="text-sm text-orange-700">Visitantes para clientes</p>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Desempenho Mensal (Últimos 6 Meses)</h3>
        <div className="space-y-3">
          {[
            { month: 'Junho', sales: 2100, reservations: 28 },
            { month: 'Julho', sales: 2450, reservations: 32 },
            { month: 'Agosto', sales: 2800, reservations: 35 },
            { month: 'Setembro', sales: 3000, reservations: 38 },
            { month: 'Outubro', sales: 3200, reservations: 40 },
            { month: 'Novembro', sales: 3450, reservations: 42 },
          ].map((item) => (
            <div key={item.month} className="flex items-center justify-between">
              <div className="w-24 font-medium text-gray-700">{item.month}</div>
              <div className="flex-1 mx-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="bg-green-200 rounded h-6 flex items-center justify-center text-xs font-semibold text-green-900"
                      style={{ width: `${(item.sales / 4000) * 100}%` }}>
                      €{item.sales}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="bg-blue-200 rounded h-6 flex items-center justify-center text-xs font-semibold text-blue-900"
                      style={{ width: `${(item.reservations / 50) * 100}%` }}>
                      {item.reservations} res.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Produtos Vendidos</h3>
        <div className="space-y-3">
          {[
            { name: 'Sela de Dressage', sales: 12, revenue: 5400 },
            { name: 'Freio Português', sales: 18, revenue: 5040 },
            { name: 'Colete de Proteção', sales: 8, revenue: 1592 },
            { name: 'Cabeção de Dressage', sales: 15, revenue: 1335 },
            { name: 'Sela de Salto', sales: 5, revenue: 2600 },
          ].map((product) => (
            <div key={product.name} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium text-gray-900">{product.name}</p>
                <p className="text-sm text-gray-600">{product.sales} vendas</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">€{product.revenue}</p>
                <p className="text-sm text-gray-600">{((product.revenue / 15967) * 100).toFixed(1)}% do total</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
