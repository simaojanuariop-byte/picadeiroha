'use client';

import { useState, useEffect, useCallback } from 'react';
import { Trash2, Plus, RefreshCw } from 'lucide-react';

interface Reservation {
  id: string;
  clientName: string;
  professor: string;
  horses: string[];
  lessonType: 'individual' | 'group';
  date: string;
  startTime: string;
  duration: 30 | 60;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface User {
  id: string;
  name: string;
}

export default function ReservationsTab() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    professor: 'Professor',
    horses: [''],
    lessonType: 'individual' as 'individual' | 'group',
    date: '',
    startTime: '',
    level: 'iniciante',
    notes: ''
  });

  // Carregar reservas e usuários
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [resRes, usersRes] = await Promise.all([
        fetch('/api/reservations'),
        fetch('/api/users')
      ]);

      if (resRes.ok) {
        const data = await resRes.json();
        setReservations(data);
      }

      if (usersRes.ok) {
        const data = await usersRes.json();
        setUsers(data);
      } else {
        // Se API de usuários não existir, criar usuários padrão
        setUsers([
          { id: 'cmicbaesv000011y4mxnzhtbs', name: 'João Silva' },
          { id: 'cmicbaesz000111y4hpcw3o79', name: 'Maria Oliveira' },
          { id: 'cmicbaet0000211y4fnfu0m4m', name: 'Admin User' }
        ]);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    // Auto-refresh a cada 5 segundos
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [fetchData]);

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

    return { valid: true, message: '✅ Agendamento válido' };
  };

  const handleAddReservation = () => {
    setFormData({
      userId: '',
      professor: 'Professor',
      horses: [''],
      lessonType: 'individual',
      date: '',
      startTime: '',
      level: 'iniciante',
      notes: ''
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!formData.userId || !formData.date || !formData.startTime) {
      alert('❌ Preencha todos os campos obrigatórios!');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: formData.userId,
          date: formData.date,
          time: formData.startTime,
          type: formData.lessonType,
          horse: formData.horses[0] || null,
          level: formData.level,
          notes: formData.notes,
          status: 'pending'
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Reserva criada com sucesso!');
        setShowModal(false);
        await fetchData(); // Recarregar dados
      } else {
        alert(`❌ ${data.error || 'Erro ao criar reserva'}`);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('❌ Erro ao criar reserva');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem a certeza que deseja remover esta reserva?')) return;

    try {
      const response = await fetch(`/api/reservations/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('✅ Reserva removida!');
        await fetchData();
      } else {
        alert('❌ Erro ao remover reserva');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('❌ Erro ao remover reserva');
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

  if (isLoading) {
    return <div className="text-center py-8 text-gray-600 font-bold">Carregando reservas...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-black text-black">📅 Gestão de Reservas</h2>
          <p className="text-black font-bold text-sm mt-1">Regras: Máx 4 por hora | Máx 4 cavalos por professor</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchData}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-black flex items-center gap-2"
            title="Atualizar reservas"
          >
            <RefreshCw size={18} />
            Atualizar
          </button>
          <button
            onClick={handleAddReservation}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-black flex items-center gap-2"
          >
            <Plus size={18} />
            Nova Reserva
          </button>
        </div>
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
                  <span className={`px-4 py-2 rounded-full text-sm font-black ${getStatusColor(reservation.status)}`}>
                    {getStatusLabel(reservation.status)}
                  </span>
                  <button
                    onClick={() => handleDelete(reservation.id)}
                    className="text-red-600 hover:text-red-800 font-black text-xl"
                  >
                    <Trash2 size={18} />
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
                <label className="block text-sm font-black text-black mb-2">👤 Cliente</label>
                <select
                  value={formData.userId}
                  onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-bold"
                >
                  <option value="">Seleccione um cliente...</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2">🐴 Cavalo</label>
                <input
                  type="text"
                  value={formData.horses[0] || ''}
                  onChange={(e) => setFormData({ ...formData, horses: [e.target.value] })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-bold"
                  placeholder="Nome do cavalo"
                />
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2">📝 Tipo de Aula</label>
                <select
                  value={formData.lessonType}
                  onChange={(e) => {
                    const type = e.target.value as 'individual' | 'group';
                    setFormData({ ...formData, lessonType: type });
                  }}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-bold"
                >
                  <option value="individual">Individual (30 min)</option>
                  <option value="group">Grupo (60 min)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2">📚 Nível</label>
                <select
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-bold"
                >
                  <option value="iniciante">Iniciante</option>
                  <option value="intermédio">Intermédio</option>
                  <option value="avançado">Avançado</option>
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

              <div>
                <label className="block text-sm font-black text-black mb-2">📝 Notas</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-bold"
                  placeholder="Observações sobre a aula..."
                  rows={3}
                />
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
                disabled={isSubmitting}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition font-black"
              >
                {isSubmitting ? 'Guardando...' : 'Guardar Reserva'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
