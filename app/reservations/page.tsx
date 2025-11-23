'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Reservation {
  id: string;
  service: string;
  date: string;
  time: string;
  instructor: string;
  horse: string;
  duration: string;
  price: number;
  status: 'available' | 'booked';
}

export default function ReservationsPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedService, setSelectedService] = useState('aula-individual');
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  const services = [
    { id: 'aula-individual', name: 'Aula Individual', price: 80, duration: '1 hora' },
    { id: 'aula-grupo', name: 'Aula em Grupo', price: 50, duration: '1,5 horas' },
    { id: 'treino-competicao', name: 'Treino Competição', price: 120, duration: '1,5 horas' },
    { id: 'passeio-guiado', name: 'Passeio Guiado', price: 80, duration: '2 horas' },
  ];

  const instructors = [
    { id: 1, name: 'Maria Santos', speciality: 'Dressage' },
    { id: 2, name: 'João Silva', speciality: 'Saltos' },
    { id: 3, name: 'Pedro Costa', speciality: 'Cross-Country' },
  ];

  const horses = [
    { id: 1, name: 'Tornado', breed: 'Lusitano', level: 'Avançado' },
    { id: 2, name: 'Azul', breed: 'Árabe', level: 'Intermediário' },
    { id: 3, name: 'Íris', breed: 'PSI', level: 'Iniciante' },
    { id: 4, name: 'Negro', breed: 'Lusitano', level: 'Avançado' },
  ];

  const availableSlots: Reservation[] = [
    { id: '1', service: 'Aula Individual', date: '2024-12-25', time: '10:00', instructor: 'Maria Santos', horse: 'Tornado', duration: '1h', price: 80, status: 'available' },
    { id: '2', service: 'Aula Individual', date: '2024-12-25', time: '11:00', instructor: 'João Silva', horse: 'Azul', duration: '1h', price: 80, status: 'booked' },
    { id: '3', service: 'Aula Individual', date: '2024-12-25', time: '14:00', instructor: 'Pedro Costa', horse: 'Íris', duration: '1h', price: 80, status: 'available' },
    { id: '4', service: 'Aula em Grupo', date: '2024-12-26', time: '15:00', instructor: 'Maria Santos', horse: 'Varios', duration: '1.5h', price: 50, status: 'available' },
    { id: '5', service: 'Treino Competição', date: '2024-12-27', time: '10:00', instructor: 'João Silva', horse: 'Negro', duration: '1.5h', price: 120, status: 'available' },
    { id: '6', service: 'Passeio Guiado', date: '2024-12-28', time: '09:00', instructor: 'Pedro Costa', horse: 'Tornado', duration: '2h', price: 80, status: 'available' },
  ];

  const handleReserve = (slot: Reservation) => {
    if (slot.status === 'available') {
      setSelectedReservation(slot);
      setShowModal(true);
    }
  };

  const confirmReservation = () => {
    setShowModal(false);
    alert('Reserva confirmada! Receberá um email de confirmação em breve.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Reservar Aula ou Serviço</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Escolha o tipo de serviço, data e hora que preferir. Todos os nossos instrutores são certificados e os cavalos são selecionados com cuidado.
          </p>
        </div>

        {/* Service Selection */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">1. Selecione o Tipo de Serviço</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`p-6 rounded-lg border-2 transition ${
                  selectedService === service.id
                    ? 'border-amber-600 bg-amber-50'
                    : 'border-gray-200 bg-white hover:border-amber-300'
                }`}
              >
                <h3 className="font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{service.duration}</p>
                <p className="text-2xl font-bold text-amber-600">€{service.price}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Available Slots */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Escolha Data e Hora Disponível</h2>
          <div className="space-y-4">
            {availableSlots.map((slot) => (
              <div
                key={slot.id}
                className={`p-6 rounded-lg border-2 transition ${
                  slot.status === 'available'
                    ? 'border-green-200 bg-green-50 hover:border-green-400'
                    : 'border-gray-200 bg-gray-50 opacity-50'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <div>
                    <p className="text-sm text-gray-600">Data</p>
                    <p className="font-bold text-gray-900">{slot.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Hora</p>
                    <p className="font-bold text-gray-900">{slot.time}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Instrutor</p>
                    <p className="font-bold text-gray-900">{slot.instructor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Cavalo</p>
                    <p className="font-bold text-gray-900">{slot.horse}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-amber-600">€{slot.price}</p>
                    </div>
                    <button
                      onClick={() => handleReserve(slot)}
                      disabled={slot.status !== 'available'}
                      className={`px-6 py-2 rounded-lg font-bold transition ${
                        slot.status === 'available'
                          ? 'bg-amber-600 text-white hover:bg-amber-700'
                          : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      }`}
                    >
                      {slot.status === 'available' ? 'Reservar' : 'Ocupado'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Instrutores Certificados</h3>
            <p className="text-gray-600">
              Todos os nossos instrutores são certificados pela FEI com anos de experiência em equitação.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">🐴</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Cavalos Profissionais</h3>
            <p className="text-gray-600">
              Selecionamos cuidadosamente os cavalos mais adequados para cada nível de experiência.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-4xl mb-4">🛡️</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Segurança em Primeiro</h3>
            <p className="text-gray-600">
              Treino de segurança incluído e equipamento de proteção fornecido em todas as aulas.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-lg p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Não encontrou o que procura?</h2>
          <p className="text-lg mb-8">Contacte-nos diretamente para pacotes personalizados ou informações adicionais.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/servicos" className="bg-white text-amber-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition">
              Ver Mais Serviços
            </Link>
            <a href="tel:+351234567890" className="bg-amber-800 text-white font-bold py-3 px-8 rounded-lg hover:bg-amber-900 transition">
              ☎️ Ligar Agora
            </a>
          </div>
        </div>
      </div>

      {/* Reservation Modal */}
      {showModal && selectedReservation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirmar Reserva</h2>
            <div className="space-y-4 mb-6">
              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Serviço</p>
                <p className="font-bold text-gray-900">{selectedReservation.service}</p>
              </div>
              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Data e Hora</p>
                <p className="font-bold text-gray-900">{selectedReservation.date} às {selectedReservation.time}</p>
              </div>
              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Instrutor</p>
                <p className="font-bold text-gray-900">{selectedReservation.instructor}</p>
              </div>
              <div className="border-b pb-3">
                <p className="text-sm text-gray-600">Cavalo</p>
                <p className="font-bold text-gray-900">{selectedReservation.horse}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Preço</p>
                <p className="text-2xl font-bold text-amber-600">€{selectedReservation.price}</p>
              </div>
            </div>

            {/* Confirmation Checkbox */}
            <label className="flex items-center mb-6">
              <input type="checkbox" className="w-4 h-4 text-amber-600 rounded" defaultChecked />
              <span className="ml-3 text-sm text-gray-700">
                Concordo com os termos e condições
              </span>
            </label>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={confirmReservation}
                className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-700 transition"
              >
                Confirmar Reserva
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
