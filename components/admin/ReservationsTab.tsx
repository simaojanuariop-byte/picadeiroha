'use client';

import { useState } from 'react';

interface Reservation {
  id: string;
  clientName: string;
  professor: string;
  horses: string[]; // array de cavalos
  lessonType: 'individual' | 'group'; // 30 min ou 1 hora
  date: string;
  startTime: string;
  duration: 30 | 60; // minutos
  status: 'confirmed' | 'pending' | 'cancelled';
}

export default function ReservationsTab() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    professor: '',
    horses: [''],
    lessonType: 'individual' as 'individual' | 'group',
    date: '',
    startTime: '',
    duration: 30
  });

  // Validar regras de agendamento
  const validateReservation = (newReservation: Reservation): { valid: boolean; message: string } => {
    // Regra 1: Max 4 agendamentos mesma hora
    const sameHourCount = reservations.filter(r => {
      const rStart = parseInt(r.startTime.split(':')[0]);
      const newStart = parseInt(newReservation.startTime.split(':')[0]);
      return r.date === newReservation.date && rStart === newStart && r.status !== 'cancelled';
    }).length;

    if (sameHourCount >= 4) {
      return { valid: false, message: '❌ Máximo 4 agendamentos por hora já atingido' };
    }

    // Regra 2: Max 4 cavalos por professor ao mesmo tempo
    const professorHorseCount = reservations.filter(r => {
      const rStart = parseInt(r.startTime.split(':')[0]);
      const newStart = parseInt(newReservation.startTime.split(':')[0]);
      return (
        r.date === newReservation.date &&
        rStart === newStart &&
        r.professor === newReservation.professor &&
        r.status !== 'cancelled'
      );
    }).reduce((count, r) => count + r.horses.length, 0);

    if (professorHorseCount + newReservation.horses.length > 4) {
      return { valid: false, message: `❌ Professor só pode ter máx 4 cavalos. Atualmente: ${professorHorseCount}` };
    }

    // Regra 3: Max 4 aulas por hora no picadeiro
    if (sameHourCount >= 4) {
      return { valid: false, message: '❌ Picadeiro lotado nessa hora' };
    }

    return { valid: true, message: '✅ Agendamento válido' };
  };

  const handleAddReservation = () => {
    setFormData({
      clientName: '',
      professor: '',
      horses: [''],
      lessonType: 'individual',
      date: '',
      startTime: '',
      duration: 30
    });
    setShowModal(true);
  };

  const handleSave = () => {
    const newReservation: Reservation = {
      id: Date.now().toString(),
      clientName: formData.clientName,
      professor: formData.professor,
      horses: formData.horses.filter(h => h.trim() !== ''),
      lessonType: formData.lessonType,
      date: formData.date,
      startTime: formData.startTime,
      duration: formData.duration as 30 | 60,
      status: 'pending'
    };

    const validation = validateReservation(newReservation);
    if (!validation.valid) {
      alert(validation.message);
      return;
    }

    setReservations([...reservations, newReservation]);
    setShowModal(false);
    alert('✅ Reserva criada com sucesso!');
  };

  const toggleStatus = (id: string) => {
    setReservations(
      reservations.map(r =>
        r.id === id
          ? {
              ...r,
              status:
                r.status === 'confirmed'
                  ? 'cancelled'
                  : r.status === 'pending'
                  ? 'confirmed'
                  : 'pending'
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada';
      case 'pending':
        return 'Pendente';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black text-black">📅 Gestão de Reservas</h2>
          <p className="text-black font-bold text-sm mt-1">Regras: Máx 4 por hora | Máx 4 cavalos por professor</p>
        </div>
        <button
          onClick={handleAddReservation}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-black"
        >
          ➕ Nova Reserva
        </button>
      </div>

      {reservations.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed">
          <p className="text-black font-black text-lg">Nenhuma reserva registada</p>
          <p className="text-black font-bold text-sm mt-2">Clique em "Nova Reserva" para começar</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reservations.map((reservation) => (
            <div key={reservation.id} className="bg-white border-2 border-gray-300 rounded-lg p-6 hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="font-black text-lg text-black">{reservation.clientName}</p>
                  <p className="text-black font-bold text-sm">👨‍🏫 Professor: {reservation.professor}</p>
                  <p className="text-black font-bold text-sm">🐴 Cavalos: {reservation.horses.join(', ')}</p>
                  <p className="text-black font-bold text-sm">📅 {reservation.date} às {reservation.startTime}</p>
                  <p className="text-black font-bold text-sm">⏱️ {reservation.duration} minutos ({reservation.lessonType === 'individual' ? 'Individual' : 'Grupo'})</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    onClick={() => toggleStatus(reservation.id)}
                    className={`px-4 py-2 rounded-full text-sm font-black cursor-pointer transition ${getStatusColor(reservation.status)}`}
                  >
                    {getStatusLabel(reservation.status)}
                  </span>
                  <button
                    onClick={() => handleDelete(reservation.id)}
                    className="text-red-600 hover:text-red-800 font-black text-xl"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-black text-black mb-6">📅 Nova Reserva</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-black text-black mb-2">Nome do Cliente</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-bold"
                  placeholder="Nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2">👨‍🏫 Professor</label>
                <input
                  type="text"
                  value={formData.professor}
                  onChange={(e) => setFormData({ ...formData, professor: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-bold"
                  placeholder="Nome do professor"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2">🐴 Cavalos (separados por vírgula)</label>
                <input
                  type="text"
                  value={formData.horses.join(', ')}
                  onChange={(e) => setFormData({ ...formData, horses: e.target.value.split(',').map(h => h.trim()) })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-bold"
                  placeholder="Cavalo 1, Cavalo 2, ..."
                />
                <p className="text-xs text-black font-bold mt-1">Máx 4 cavalos por professor/hora</p>
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2">📝 Tipo de Aula</label>
                <select
                  value={formData.lessonType}
                  onChange={(e) => {
                    const type = e.target.value as 'individual' | 'group';
                    setFormData({ ...formData, lessonType: type, duration: type === 'individual' ? 30 : 60 });
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-bold"
                >
                  <option value="individual">Individual (30 min)</option>
                  <option value="group">Grupo (60 min)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-black text-black mb-2">📅 Data</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-black mb-2">⏰ Hora Início</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-bold"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <p className="text-sm font-black text-black">ℹ️ Regras de Agendamento:</p>
                <ul className="text-xs font-bold text-black mt-2 space-y-1">
                  <li>✓ Máx 4 agendamentos à mesma hora</li>
                  <li>✓ Máx 4 cavalos por professor/hora</li>
                  <li>✓ Horário do picadeiro: 09:00 - 18:00</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition font-black text-black"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-black"
              >
                Guardar Reserva
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
