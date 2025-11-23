import type { NextApiRequest, NextApiResponse } from 'next';
import { initializeScheduledTasks } from '@/lib/schedule-tasks';

// Esta API é chamada uma vez no startup para inicializar as tarefas agendadas
export async function GET(
  request: Request
) {
  // Verificar se é uma requisição interna (do servidor)
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  
  if (origin && origin !== `https://${host}` && origin !== `http://${host}`) {
    return new Response('Forbidden', { status: 403 });
  }

  try {
    // Inicializar tarefas agendadas
    initializeScheduledTasks();
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Tarefas agendadas inicializadas',
      scheduledTasks: [
        '📧 Envio de calendário diário às 6 AM',
        '🧹 Limpeza de dados às 2 AM',
        '🐴 Verificação de cavalos às 7 AM'
      ]
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Erro ao inicializar tarefas:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'Erro ao inicializar tarefas agendadas' 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
