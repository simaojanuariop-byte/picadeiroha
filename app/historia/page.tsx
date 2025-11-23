export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 to-amber-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-4">A História do PH - Gilberto Filipe</h1>
          <p className="text-xl text-amber-100">Duas décadas de paixão, dedicação e excelência em equitação</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {/* Timeline */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Linha do Tempo</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg">2003</div>
                  <div className="w-1 h-20 bg-amber-200 mt-2"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Fundação do PH</h3>
                  <p className="text-gray-600 mt-2">Gilberto Filipe funda o centro equestre com uma visão clara: criar um espaço de excelência para a equitação profissional.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg">2008</div>
                  <div className="w-1 h-20 bg-amber-200 mt-2"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Expansão</h3>
                  <p className="text-gray-600 mt-2">Construção do segundo picadeiro coberto e expansão das instalações para 50 baias climatizadas.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg">2015</div>
                  <div className="w-1 h-20 bg-amber-200 mt-2"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Reconhecimento Nacional</h3>
                  <p className="text-gray-600 mt-2">Primeiros prémios em campeonatos nacionais. O PH torna-se referência em dressage e saltos.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold text-lg">2020</div>
                  <div className="w-1 h-20 bg-amber-200 mt-2"></div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Digitalização</h3>
                  <p className="text-gray-600 mt-2">Lança plataforma online de reservas e estabelece loja virtual de equipamentos.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">2024</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Presente e Futuro</h3>
                  <p className="text-gray-600 mt-2">Com 21 anos de experiência, o PH continua inovando e preparando novos campeões da equitação portuguesa.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Philosophy */}
          <section className="bg-amber-50 rounded-lg p-8 border-l-4 border-amber-600">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nossa Filosofia</h2>
            <p className="text-gray-700 mb-4">
              Acreditamos que a equitação é mais do que um desporto - é uma arte, uma tradição e um estilo de vida. Cada cavaleiro merece uma educação de qualidade e cada cavalo merece respeito e cuidado impecável.
            </p>
            <p className="text-gray-700">
              O nosso objetivo é preparar novos talentos para o desporto equestre enquanto preservamos as tradições centenárias da equitação portuguesa.
            </p>
          </section>

          {/* Facilities */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Instalações de Classe Mundial</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-amber-600">
                <div className="text-4xl mb-3">🏛️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Picadeiros Profissionais</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>✓ 2 Picadeiros cobertos com iluminação profissional</li>
                  <li>✓ 1 Picadeiro ao ar livre com pista de treino</li>
                  <li>✓ Superfícies de qualidade olímpica</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-amber-600">
                <div className="text-4xl mb-3">🐴</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Estábulos Modernos</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>✓ 50 Baias climatizadas</li>
                  <li>✓ Zona de repouso e recuperação</li>
                  <li>✓ Veterinários no local</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-amber-600">
                <div className="text-4xl mb-3">🛍️</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Loja Especializada</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>✓ Equipamentos de qualidade premium</li>
                  <li>✓ Marcas internacionais</li>
                  <li>✓ Consultoria especializada</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-amber-600">
                <div className="text-4xl mb-3">🎪</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Áreas de Convívio</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>✓ Recepção moderna e acessível</li>
                  <li>✓ Cafetaria com vistas para pista</li>
                  <li>✓ Áreas de descanso</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Team */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Equipa de Especialistas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center bg-white rounded-lg shadow p-6">
                <div className="text-5xl mb-3">👨‍🏫</div>
                <p className="text-2xl font-bold text-amber-600">8+</p>
                <p className="text-gray-700 font-semibold">Instrutores Certificados</p>
                <p className="text-sm text-gray-600 mt-2">Pela FEI e com experiência internacional</p>
              </div>
              <div className="text-center bg-white rounded-lg shadow p-6">
                <div className="text-5xl mb-3">🐴</div>
                <p className="text-2xl font-bold text-amber-600">50+</p>
                <p className="text-gray-700 font-semibold">Cavalos Profissionais</p>
                <p className="text-sm text-gray-600 mt-2">Selecionados e treinados com cuidado</p>
              </div>
              <div className="text-center bg-white rounded-lg shadow p-6">
                <div className="text-5xl mb-3">👨‍⚕️</div>
                <p className="text-2xl font-bold text-amber-600">3+</p>
                <p className="text-gray-700 font-semibold">Veterinários Especializados</p>
                <p className="text-sm text-gray-600 mt-2">Em cuidados equinos 24/7</p>
              </div>
              <div className="text-center bg-white rounded-lg shadow p-6">
                <div className="text-5xl mb-3">🏆</div>
                <p className="text-2xl font-bold text-amber-600">20+</p>
                <p className="text-gray-700 font-semibold">Prémios Conquistados</p>
                <p className="text-sm text-gray-600 mt-2">Em competições nacionais</p>
              </div>
            </div>
          </section>

          {/* Achievements */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Prémios e Reconhecimentos</h2>
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-8">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🏆</span>
                  <div>
                    <p className="font-bold text-gray-900">Campeonato Nacional de Dressage</p>
                    <p className="text-gray-600">3 primeiros lugares (2022, 2023, 2024)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">🥇</span>
                  <div>
                    <p className="font-bold text-gray-900">Campeonato Regional de Saltos</p>
                    <p className="text-gray-600">5 vitórias consecutivas</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">💚</span>
                  <div>
                    <p className="font-bold text-gray-900">Prémio ao Bem-estar Animal</p>
                    <p className="text-gray-600">2023 - Reconhecimento pela FEP</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-2xl">⭐</span>
                  <div>
                    <p className="font-bold text-gray-900">Melhor Centro Equestre da Região</p>
                    <p className="text-gray-600">2024 - Votação Popular</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          {/* Future */}
          <section className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-8 border-l-4 border-blue-600">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">O Futuro</h2>
            <p className="text-gray-700 mb-4">
              Continuamos a investir em inovação e qualidade. Nos próximos anos, esperamos:
            </p>
            <ul className="space-y-3 text-gray-700">
              <li>✓ Expandir ainda mais as nossas infraestruturas</li>
              <li>✓ Desenvolver programas avançados de formação</li>
              <li>✓ Manter o foco no bem-estar dos cavalos</li>
              <li>✓ Preparar novos campeões da equitação portuguesa</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
