'use client';

import { useState } from 'react';

export default function SettingsTab() {
  const [settings, setSettings] = useState({
    businessName: 'Picadeiro Quinta da Horta',
    businessEmail: 'contato@picadeiroqh.pt',
    phone: '912345678',
    address: 'Quinta da Horta, Vila Franca, Portugal',
    currency: 'EUR',
    timezone: 'Europe/Lisbon',
    language: 'pt',
    enableEmails: true,
    enableSMS: false,
    maintenanceMode: false,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: any) => {
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Configurações do Sistema</h2>

      {saved && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
          ✓ Configurações guardadas com sucesso!
        </div>
      )}

      {/* Business Information */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informações do Negócio</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome do Negócio</label>
            <input
              type="text"
              value={settings.businessName}
              onChange={(e) => handleChange('businessName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email de Contacto</label>
            <input
              type="email"
              value={settings.businessEmail}
              onChange={(e) => handleChange('businessEmail', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Telefone</label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Morada</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      {/* System Settings */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Configurações do Sistema</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Moeda</label>
            <select
              value={settings.currency}
              onChange={(e) => handleChange('currency', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            >
              <option value="EUR">Euro (€)</option>
              <option value="USD">Dólar ($)</option>
              <option value="GBP">Libra (£)</option>
              <option value="BRL">Real Brasileiro (R$)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fuso Horário</label>
            <select
              value={settings.timezone}
              onChange={(e) => handleChange('timezone', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            >
              <option value="Europe/Lisbon">Europa/Lisboa</option>
              <option value="Europe/London">Europa/Londres</option>
              <option value="Europe/Paris">Europa/Paris</option>
              <option value="America/New_York">América/Nova Iorque</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Idioma</label>
            <select
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
            >
              <option value="pt">Português</option>
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notificações</h3>
        <div className="space-y-4">
          <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <input
              type="checkbox"
              checked={settings.enableEmails}
              onChange={(e) => handleChange('enableEmails', e.target.checked)}
              className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
            />
            <div className="ml-3">
              <p className="font-medium text-gray-900">Ativar Notificações por Email</p>
              <p className="text-sm text-gray-600">Receba notificações de novas reservas e pedidos</p>
            </div>
          </label>

          <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition">
            <input
              type="checkbox"
              checked={settings.enableSMS}
              onChange={(e) => handleChange('enableSMS', e.target.checked)}
              className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
            />
            <div className="ml-3">
              <p className="font-medium text-gray-900">Ativar Notificações por SMS</p>
              <p className="text-sm text-gray-600">Receba mensagens de texto para alertas importantes</p>
            </div>
          </label>
        </div>
      </div>

      {/* Maintenance Mode */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Modo de Manutenção</h3>
        <label className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition">
          <input
            type="checkbox"
            checked={settings.maintenanceMode}
            onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
            className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
          />
          <div className="ml-3">
            <p className="font-medium text-gray-900">Ativar Modo de Manutenção</p>
            <p className="text-sm text-gray-600">O site estará indisponível para clientes durante a manutenção</p>
          </div>
        </label>
      </div>

      {/* Save Button */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="bg-amber-600 text-white px-8 py-3 rounded-lg hover:bg-amber-700 transition font-semibold"
        >
          💾 Guardar Configurações
        </button>
        <button
          className="bg-gray-200 text-gray-900 px-8 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
        >
          ↺ Restaurar Padrões
        </button>
      </div>
    </div>
  );
}
