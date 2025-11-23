'use client';

import { useEffect } from 'react';

export default function TaskInitializer() {
  useEffect(() => {
    // Chamar API de inicialização uma única vez
    const initializeTasks = async () => {
      try {
        const response = await fetch('/api/init-tasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Tarefas agendadas inicializadas:', data);
        }
      } catch (error) {
        console.error('Erro ao inicializar tarefas:', error);
      }
    };

    initializeTasks();
  }, []);

  return null; // Este componente não renderiza nada
}
