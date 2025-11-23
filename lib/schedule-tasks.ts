import cron from 'node-cron';

const NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';
const CALENDAR_EMAIL = process.env.CALENDAR_EMAIL || 'januariosimao8@gmail.com';

export function initializeScheduledTasks() {
  console.log('📅 Inicializando tarefas agendadas...');

  // Executar diariamente às 6 da manhã
  // Formato: '0 6 * * *' (minuto hora * * dia-semana)
  cron.schedule('0 6 * * *', async () => {
    console.log('📧 Enviando calendário diário...');
    
    try {
      const response = await fetch(`${NEXTAUTH_URL}/api/reports/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          period: 'week',
          email: CALENDAR_EMAIL,
        }),
      });

      if (response.ok) {
        console.log('✅ Calendário enviado com sucesso para', CALENDAR_EMAIL);
      } else {
        console.error('❌ Erro ao enviar calendário:', response.statusText);
      }
    } catch (error) {
      console.error('❌ Erro ao enviar calendário:', error);
    }
  });

  // Executar limpeza de reservas canceladas às 2 da manhã
  cron.schedule('0 2 * * *', async () => {
    console.log('🧹 Limpando dados antigos...');
    // Aqui você pode adicionar lógica para limpar dados
  });

  // Verificar disponibilidade de cavalos diariamente às 7 da manhã
  cron.schedule('0 7 * * *', async () => {
    console.log('🐴 Verificando disponibilidade de cavalos...');
    // Aqui você pode adicionar lógica para verificar status
  });

  console.log('✅ Tarefas agendadas inicializadas com sucesso');
}
