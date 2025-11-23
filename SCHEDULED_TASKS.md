# 🤖 Automação de Tarefas Agendadas

## Visão Geral

O sistema utiliza **node-cron** para agendamento de tarefas automáticas que se executam em intervalos regulares sem necessidade de intervenção manual.

## Tarefas Configuradas

### 1. 📧 Envio de Calendário Diário
- **Horário:** 06:00 (6 da manhã)
- **Frequência:** Todos os dias
- **Ação:** Envia email com calendário da semana para `januariosimao8@gmail.com`
- **Formato:** HTML formatado com tabelas de reservas
- **Configuração:** `0 6 * * *`

### 2. 🧹 Limpeza de Dados Antigos
- **Horário:** 02:00 (2 da manhã)
- **Frequência:** Todos os dias
- **Ação:** Remove reservas canceladas e dados obsoletos
- **Configuração:** `0 2 * * *`

### 3. 🐴 Verificação de Disponibilidade
- **Horário:** 07:00 (7 da manhã)
- **Frequência:** Todos os dias
- **Ação:** Verifica status dos cavalos e professores
- **Configuração:** `0 7 * * *`

## Sintaxe CRON

```
* * * * *
│ │ │ │ │
│ │ │ │ └─── Dia da semana (0 = domingo, 6 = sábado)
│ │ │ └───── Mês (1-12)
│ │ └─────── Dia do mês (1-31)
│ └───────── Hora (0-23)
└─────────── Minuto (0-59)
```

### Exemplos Comuns
- `0 6 * * *` - Todos os dias às 6 AM
- `0 */6 * * *` - A cada 6 horas
- `0 9 * * 1` - Toda segunda-feira às 9 AM
- `*/30 * * * *` - A cada 30 minutos
- `0 0 * * *` - Todos os dias à meia-noite

## Arquivos Principais

### `/lib/schedule-tasks.ts`
Ficheiro que define todas as tarefas agendadas

```typescript
export function initializeScheduledTasks() {
  // Define cron jobs aqui
  cron.schedule('0 6 * * *', () => {
    // Enviar email
  });
}
```

### `/app/api/init-tasks/route.ts`
Endpoint que inicializa as tarefas

```bash
GET /api/init-tasks
```

### `/components/TaskInitializer.tsx`
Componente React que chama o endpoint ao carregar a aplicação

## Implementação Local

### 1. Instalar Dependência
```bash
npm install node-cron
npm install --save-dev @types/node-cron
```

### 2. Variáveis de Ambiente Necessárias
```env
NEXTAUTH_URL=http://localhost:3000
CALENDAR_EMAIL=januariosimao8@gmail.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=seu-email@gmail.com
EMAIL_PASSWORD=app-password
```

### 3. Iniciar Servidor
```bash
npm run dev
```

### 4. Verificar Logs
Abra o console e procure por:
```
✅ Tarefas agendadas inicializadas com sucesso
```

## Implementação Produção (Netlify)

### Opção 1: Usar Netlify Functions (⭐ Recomendado)

Crie `/netlify/functions/send-daily-calendar.ts`:

```typescript
import fetch from 'node-fetch';

exports.handler = async () => {
  const SITE_URL = process.env.SITE_URL || 'https://seu-site.netlify.app';
  
  try {
    const response = await fetch(`${SITE_URL}/api/reports/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        period: 'week',
        email: 'januariosimao8@gmail.com',
      }),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: response.ok }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
```

Configure em `netlify.toml`:

```toml
[[scheduled_functions]]
function = "send-daily-calendar"
cron = "0 6 * * *"
```

### Opção 2: Usar Serviço Externo

Use **Cron-Job.org** ou **EasyCron**:

1. Aceda a https://cron-job.org
2. Crie uma nova tarefa (cron job)
3. Configure:
   - **URL:** `https://seu-site.com/api/reports/send-email`
   - **Método:** POST
   - **Dados:** 
     ```json
     {
       "period": "week",
       "email": "januariosimao8@gmail.com"
     }
     ```
   - **Horário:** `0 6 * * *` (6 AM diariamente)

### Opção 3: GitHub Actions (CI/CD)

Crie `.github/workflows/send-calendar.yml`:

```yaml
name: Send Daily Calendar

on:
  schedule:
    - cron: '0 6 * * *'

jobs:
  send-calendar:
    runs-on: ubuntu-latest
    steps:
      - name: Send Calendar Email
        run: |
          curl -X POST ${{ secrets.SITE_URL }}/api/reports/send-email \
            -H "Content-Type: application/json" \
            -d '{
              "period": "week",
              "email": "januariosimao8@gmail.com"
            }'
```

## Monitoramento

### Ver Logs das Tarefas
```bash
# No servidor Netlify
tail -f /var/log/application.log

# Em desenvolvimento
npm run dev 2>&1 | grep "✅\|❌"
```

### Verificar se Cron Está Ativo
```bash
# Verificar status
curl http://localhost:3000/api/init-tasks

# Resposta esperada
{
  "success": true,
  "scheduledTasks": [
    "📧 Envio de calendário diário às 6 AM",
    "🧹 Limpeza de dados às 2 AM",
    "🐴 Verificação de cavalos às 7 AM"
  ]
}
```

## Troubleshooting

### "Tarefas não estão sendo executadas"

1. **Verificar se TaskInitializer está ativo:**
   - Abrir DevTools (F12)
   - Procurar por "✅ Tarefas agendadas inicializadas"

2. **Verificar variáveis de ambiente:**
   ```bash
   echo $CALENDAR_EMAIL
   echo $NEXTAUTH_URL
   ```

3. **Verificar se email está configurado:**
   - Testar manualmente: `curl -X POST http://localhost:3000/api/reports/send-email ...`

4. **Verificar logs do servidor:**
   ```bash
   # Ver todos os logs
   npm run dev 2>&1
   ```

### "Email não está sendo enviado"

1. Confirmar variáveis de email em `.env.local`
2. Testar SMTP com telnet: `telnet smtp.gmail.com 587`
3. Verificar se app password do Gmail está correto
4. Verificar logs de erro no servidor

### "Cron job executa mas não envia email"

1. Verificar se API endpoint está respondendo:
   ```bash
   curl -X POST http://localhost:3000/api/reports/send-email \
     -H "Content-Type: application/json" \
     -d '{"period":"week","email":"seu-email@gmail.com"}'
   ```

2. Verificar logs da aplicação
3. Confirmar configuração SMTP
4. Testar com um email diferente

## Personalizar Agendamentos

### Alterar Horário de Envio

Abra `/lib/schedule-tasks.ts`:

```typescript
// Mudar de 6 AM para 8 AM
cron.schedule('0 8 * * *', async () => {
  // ...
});

// Executar a cada 2 horas
cron.schedule('0 */2 * * *', async () => {
  // ...
});

// Executar só nos dias de semana às 9 AM
cron.schedule('0 9 * * 1-5', async () => {
  // ...
});
```

### Adicionar Nova Tarefa

```typescript
// Nova tarefa: Enviar relatório mensal no dia 1 às 9 AM
cron.schedule('0 9 1 * *', async () => {
  console.log('📊 Enviando relatório mensal...');
  // Implementar lógica aqui
});
```

## Performance e Limitações

### Considerações Importantes

- **Node-Cron:** Funciona apenas enquanto o servidor está ativo
- **Netlify Functions:** Gratuito com limitações de tempo/execuções
- **Serviços Externos:** Mais confiáveis mas com custo
- **GitHub Actions:** Gratuito com 3000 minutos/mês

### Recomendação por Ambiente

| Ambiente | Recomendação |
|----------|--------------|
| Desenvolvimento | node-cron (local) |
| Staging | GitHub Actions |
| Produção | Netlify Functions ou Cron-Job.org |

## Próximas Melhorias

- [ ] Dashboard de monitoramento de tarefas
- [ ] Histórico de execução
- [ ] Alertas de falha
- [ ] Backup automático
- [ ] Limpeza de logs antigos
- [ ] Relatórios de performance

---

**Última atualização:** Dezembro 2024
