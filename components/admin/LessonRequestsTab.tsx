'use client';

import { useEffect, useState, useCallback } from 'react';

interface Reservation {
  id: string;
  clientName: string;
  date: string;
  startTime: string;
  lessonType: 'individual' | 'group';
  status: 'pending' | 'confirmed' | 'cancelled';
  level?: string;
  horse?: string;
  notes?: string;
}

export default function LessonRequestsTab() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'pending' | 'all'>('pending');

  const fetchReservations = useCallback(async () => {
    try {
      const response = await fetch('/api/reservations');
      if (response.ok) {
        const data = await response.json();
        setReservations(data);
      }
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReservations();
    const interval = setInterval(fetchReservations, 5000);
    return () => clearInterval(interval);
  }, [fetchReservations]);

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch('/api/reservations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          status: 'confirmed'
        })
      });

      if (response.ok) {
        alert('✅ Aula confirmada com sucesso!');
        await fetchReservations();
      } else {
        alert('❌ Erro ao confirmar aula');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('❌ Erro ao confirmar aula');
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm('Tem a certeza que deseja rejeitar este pedido?')) return;

    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('✅ Pedido rejeitado');
        await fetchReservations();
      } else {
        alert('❌ Erro ao rejeitar pedido');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('❌ Erro ao rejeitar pedido');
    }
  };

  const filteredReservations = filter === 'pending' 
    ? reservations.filter(r => r.status === 'pending')
    : reservations;

  const statusBadge = {
    confirmed: 'bg-green-100 text-green-800',
    pending: 'bg-orange-100 text-orange-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const statusLabel = {
    confirmed: 'Confirmada',
    pending: 'Pendente',
    cancelled: 'Rejeitada',
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Pedidos de Aulas</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'pending' | 'all')}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
        >
          <option value="pending">Apenas Pendentes ({reservations.filter(r => r.status === 'pending').length})</option>
          <option value="all">Todos ({reservations.length})</option>
        </select>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-600">Carregando pedidos...</div>
      ) : filteredReservations.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 text-lg">Nenhum pedido {filter === 'pending' ? 'pendente' : 'encontrado'}</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredReservations.map((res) => (
            <div key={res.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase">Cliente</p>
                  <p className="text-lg font-semibold text-gray-900">{res.clientName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase">Data e Hora</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {res.date} às {res.startTime}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase">Tipo de Aula</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {res.lessonType === 'individual' ? 'Individual' : 'Em Grupo'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase">Nível</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {res.level || 'Não especificado'}
                  </p>
                </div>
                {res.horse && (
                  <div>
                    <p className="text-xs text-gray-600 font-semibold uppercase">Cavalo</p>
                    <p className="text-lg font-semibold text-gray-900">{res.horse}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-gray-600 font-semibold uppercase">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${statusBadge[res.status]}`}>
                    {statusLabel[res.status]}
                  </span>
                </div>
              </div>

              {res.notes && (
                <div className="mb-4 bg-gray-50 p-3 rounded">
                  <p className="text-xs text-gray-600 font-semibold uppercase mb-1">Observações</p>
                  <p className="text-gray-700">{res.notes}</p>
                </div>
              )}

              {res.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => handleApprove(res.id)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition font-semibold"
                  >
                    ✓ Confirmar Aula
                  </button>
                  <button
                    onClick={() => handleReject(res.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition font-semibold"
                  >
                    ✕ Rejeitar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
