'use client';

import { useState } from 'react';

interface Reservation {
  id: string;
  name: string;
  type: string;
  date: string;
  time: string;
  status: 'Confirmada' | 'Pendente' | 'Cancelada';
}

export default function ReservationsTab() {
  const [reservations, setReservations] = useState<Reservation[]>([
    { id: '1', name: 'João Silva', type: 'Aula Individual', date: '2024-12-15', time: '10:00', status: 'Confirmada' },
    { id: '2', name: 'Maria Santos', type: 'Aula em Grupo', date: '2024-12-16', time: '14:30', status: 'Pendente' },
    { id: '3', name: 'Pedro Costa', type: 'Treino Avançado', date: '2024-12-17', time: '09:00', status: 'Confirmada' },
    { id: '4', name: 'Ana Silva', type: 'Aula Iniciante', date: '2024-12-18', time: '16:00', status: 'Pendente' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: '', date: '', time: '' });

  const handleAddReservation = () => {
    setFormData({ name: '', type: '', date: '', time: '' });
    setShowModal(true);
  };

  const handleSave = () => {
    setReservations([
      ...reservations,
      { id: Date.now().toString(), ...formData, status: 'Pendente' }
    ]);
    setShowModal(false);
  };

  const toggleStatus = (id: string) => {
    setReservations(
      reservations.map(r =>
        r.id === id
          ? {
              ...r,
              status:
                r.status === 'Confirmada'
                  ? 'Cancelada'
                  : r.status === 'Pendente'
                  ? 'Confirmada'
                  : 'Pendente'
            }
          : r
      )
    );
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem a certeza que deseja remover esta reserva?')) {
      setReservations(reservations.filter(r => r.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Gestão de Reservas</h2>
        <button
          onClick={handleAddReservation}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          📅 Nova Reserva
        </button>
      </div>

      <div className="space-y-4">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="border rounded-lg p-4 hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{reservation.name}</p>
                <p className="text-sm text-gray-600">{reservation.type}</p>
                <p className="text-xs text-gray-500 mt-1">
                  📅 {reservation.date} às {reservation.time}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  onClick={() => toggleStatus(reservation.id)}
                  className={`px-3 py-1 rounded-full text-sm font-semibold cursor-pointer transition ${
                    reservation.status === 'Confirmada'
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : reservation.status === 'Pendente'
                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
                >
                  {reservation.status}
                </span>
                <button
                  onClick={() => handleDelete(reservation.id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Nova Reserva</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Cliente</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Aula</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecionar tipo</option>
                  <option value="Aula Individual">Aula Individual</option>
                  <option value="Aula em Grupo">Aula em Grupo</option>
                  <option value="Treino Avançado">Treino Avançado</option>
                  <option value="Aula Iniciante">Aula Iniciante</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
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
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
