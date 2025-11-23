'use client';

import { useState } from 'react';

export default function CMSTab() {
  const [activeSection, setActiveSection] = useState('hero');
  const [saved, setSaved] = useState(false);
  
  const [content, setContent] = useState({
    // Hero Section
    heroTitle: 'PH - Gilberto Filipe',
    heroSubtitle: 'Centro Equestre de Excelência com formação profissional, treino de cavaleiros e equipamentos de qualidade superior',
    heroStats: [
      { label: 'Anos de Experiência', value: '20+' },
      { label: 'Clientes Satisfeitos', value: '500+' },
      { label: 'Qualidade Garantida', value: '100%' }
    ],
    
    // About Section
    aboutTitle: 'PH - Gilberto Filipe',
    aboutText1: 'Fundado em 2003, o nosso centro equestre tornou-se referência em Portugal na formação de cavaleiros e na qualidade dos serviços prestados.',
    aboutText2: 'Com uma equipa de instrutores certificados internacionalmente e instalações de primeira categoria, oferecemos programas de treino para todas as idades e níveis.',
    aboutText3: 'A nossa loja especializada oferece equipamentos de marcas renomadas, garantindo qualidade e durabilidade para todo o tipo de cavalaria.',
    
    // Contact Section
    address: 'Rua do Centro Equestre, 123 - Portugal',
    phone: '+351 234 567 890',
    emailContact: 'info@phcentroequestre.pt',
    hoursWeekday: '09:00 - 18:00',
    hoursSunday: 'Fechado',
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    // Aqui você salvaria os dados no banco de dados
    console.log('Conteúdo salvo:', content);
  };

  const handleChange = (field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-black text-black">Gestor de Conteúdo (CMS)</h2>
        <button
          onClick={handleSave}
          className="bg-green-600 hover:bg-green-700 text-white font-black py-2 px-6 rounded-lg transition"
        >
          💾 Guardar Alterações
        </button>
      </div>

      {saved && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg font-bold">
          ✅ Conteúdo guardado com sucesso!
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'hero', label: '🏠 Hero Section' },
          { id: 'about', label: '📝 Sobre Nós' },
          { id: 'contact', label: '📞 Contacto' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`px-6 py-2 rounded-lg font-black transition ${
              activeSection === tab.id
                ? 'bg-amber-600 text-white'
                : 'bg-gray-200 text-black hover:bg-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Hero Section */}
      {activeSection === 'hero' && (
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <h3 className="text-2xl font-black text-black">Editar Hero Section</h3>
          
          <div>
            <label className="block text-sm font-black text-black mb-2">Título Principal</label>
            <input
              type="text"
              value={content.heroTitle}
              onChange={(e) => handleChange('heroTitle', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-bold text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-black mb-2">Subtítulo</label>
            <textarea
              value={content.heroSubtitle}
              onChange={(e) => handleChange('heroSubtitle', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-bold text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-black mb-2">Estatísticas</label>
            <div className="space-y-4">
              {content.heroStats.map((stat, idx) => (
                <div key={idx} className="flex gap-4">
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => {
                      const stats = [...content.heroStats];
                      stats[idx].label = e.target.value;
                      setContent(prev => ({ ...prev, heroStats: stats }));
                    }}
                    placeholder="Label"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-bold text-black"
                  />
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => {
                      const stats = [...content.heroStats];
                      stats[idx].value = e.target.value;
                      setContent(prev => ({ ...prev, heroStats: stats }));
                    }}
                    placeholder="Valor"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-bold text-black"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* About Section */}
      {activeSection === 'about' && (
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <h3 className="text-2xl font-black text-black">Editar Secção Sobre Nós</h3>
          
          <div>
            <label className="block text-sm font-black text-black mb-2">Título</label>
            <input
              type="text"
              value={content.aboutTitle}
              onChange={(e) => handleChange('aboutTitle', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-bold text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-black mb-2">Parágrafo 1</label>
            <textarea
              value={content.aboutText1}
              onChange={(e) => handleChange('aboutText1', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-bold text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-black mb-2">Parágrafo 2</label>
            <textarea
              value={content.aboutText2}
              onChange={(e) => handleChange('aboutText2', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-bold text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-black mb-2">Parágrafo 3</label>
            <textarea
              value={content.aboutText3}
              onChange={(e) => handleChange('aboutText3', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-bold text-black"
            />
          </div>
        </div>
      )}

      {/* Contact Section */}
      {activeSection === 'contact' && (
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <h3 className="text-2xl font-black text-black">Editar Informações de Contacto</h3>
          
          <div>
            <label className="block text-sm font-black text-black mb-2">Morada</label>
            <input
              type="text"
              value={content.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-bold text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-black mb-2">Telefone</label>
            <input
              type="text"
              value={content.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-bold text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-black mb-2">Email</label>
            <input
              type="email"
              value={content.emailContact}
              onChange={(e) => handleChange('emailContact', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-bold text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-black mb-2">Horário Seg-Sábado</label>
            <input
              type="text"
              value={content.hoursWeekday}
              onChange={(e) => handleChange('hoursWeekday', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-bold text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-black mb-2">Horário Domingo</label>
            <input
              type="text"
              value={content.hoursSunday}
              onChange={(e) => handleChange('hoursSunday', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg font-bold text-black"
            />
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <p className="text-black font-bold">
          ℹ️ <strong>Nota:</strong> As alterações aqui são apenas visuais por enquanto. Para persistir os dados, é necessário integrar com um banco de dados.
        </p>
      </div>
    </div>
  );
}
