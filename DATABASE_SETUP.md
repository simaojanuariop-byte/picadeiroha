# 📊 Guia de Configuração e Uso do Banco de Dados

## Visão Geral

O sistema **Centro Equestre Quinta da Horta** suporta dois tipos de banco de dados:

- **Desenvolvimento Local**: SQLite (rápido, sem dependências externas)
- **Produção**: PostgreSQL (Vercel Storage)

## 🗄️ Arquitetura de Banco de Dados

### Modelos Principais

```
User (Usuários)
├── id: String (CUID)
├── email: String (único)
├── name: String
├── password: String (bcrypted)
├── phone: String?
├── address: String?
├── role: String (customer|professor|admin)
├── orders: Order[] (relação 1:N)
└── reservations: Reservation[] (relação 1:N)

Reservation (Reservas)
├── id: String (CUID)
├── userId: String (FK)
├── user: User (relação N:1)
├── date: DateTime
├── time: String (formato: HH:MM)
├── type: String (individual|group)
├── horse: String? (nome do cavalo)
├── level: String? (iniciante|intermédio|avançado)
├── notes: String? (observações)
├── status: String (pending|confirmed|cancelled)
├── createdAt: DateTime
└── updatedAt: DateTime

Order (Pedidos)
├── id: String (CUID)
├── userId: String (FK)
├── items: OrderItem[] (relação 1:N)
├── total: Float
├── status: String (pending|completed|cancelled)
└── timestamps

OrderItem (Itens do Pedido)
├── orderId: String (FK)
├── productId: String (FK)
├── quantity: Int
└── price: Float

Product (Produtos)
├── id: String (CUID)
├── name: String
├── description: String
├── price: Float
├── category: String
├── image: String?
├── stock: Int
├── featured: Boolean
└── orderItems: OrderItem[]

Content (Conteúdo CMS)
├── id: String (CUID)
├── slug: String (único)
├── title: String
├── content: String
├── image: String?
└── timestamps
```

## 🚀 Instalação e Setup

### 1️⃣ Instalação Inicial

```bash
npm install
```

### 2️⃣ Desenvolvimento Local (SQLite)

```bash
# Primeiro setup
./dev-db-setup.sh sqlite

# Ou manualmente:
# 1. Altere prisma/schema.prisma para usar sqlite
# 2. Execute:
npx prisma db push --skip-generate
npx prisma generate
npm run db:seed
```

**Resultado**: Banco SQLite criado em `prisma/dev.db` com dados de teste.

### 3️⃣ Produção (PostgreSQL)

```bash
# Restaurar schema para PostgreSQL
./dev-db-setup.sh postgres

# Então sincronize com o banco remoto:
npx prisma db push

# Ou gere migrações:
npx prisma migrate deploy
```

## 🔑 Credenciais de Teste

Após executar `npm run db:seed`, estão disponíveis:

| Email | Senha | Papel |
|-------|-------|-------|
| cliente@test.com | (configure em produção) | Customer |
| professor@test.com | (configure em produção) | Professor |
| admin@test.com | (configure em produção) | Admin |

## 📡 API de Reservas

### GET /api/reservations
Busca todas as reservas do banco de dados.

**Resposta:**
```json
[
  {
    "id": "cuid123",
    "clientName": "João Silva",
    "professor": "Maria Oliveira",
    "horses": ["Tornado", "Sultan"],
    "lessonType": "individual|group",
    "date": "2025-01-25",
    "startTime": "10:00",
    "duration": 30,
    "status": "confirmed|pending|cancelled"
  }
]
```

### POST /api/reservations
Cria uma nova reserva com validações:
- **Máximo 4 reservas por hora** (mesmo professor, mesmo horário)
- **Máximo 4 usos do cavalo** por turno

**Request:**
```json
{
  "userId": "cuid123",
  "date": "2025-01-25",
  "time": "10:00",
  "type": "individual",
  "horse": "Tornado",
  "level": "iniciante",
  "notes": "Primeira aula",
  "status": "pending"
}
```

**Resposta (201 Created):**
```json
{
  "id": "cuid456",
  "clientName": "João Silva",
  "professor": "Maria Oliveira",
  "horses": ["Tornado"],
  "lessonType": "individual",
  "date": "2025-01-25",
  "startTime": "10:00",
  "duration": 30,
  "status": "pending"
}
```

**Erros:**
- `400`: Campos obrigatórios faltando
- `404`: Usuário não encontrado
- `409`: Limite de reservas ou cavalos atingido
- `500`: Erro ao criar reserva

## 🔄 Fluxo de Desenvolvimento

1. **Modificar schema**: Edite `prisma/schema.prisma`
2. **Sincronizar localmente**: `npx prisma db push` (SQLite) ou `npx prisma migrate dev --name description` (PostgreSQL)
3. **Testar**: `npm run dev`
4. **Deploy em produção**: Altere para PostgreSQL com `./dev-db-setup.sh postgres`

## 📋 Scripts Disponíveis

```bash
npm run dev              # Iniciar servidor de desenvolvimento
npm run build            # Build para produção
npm start                # Iniciar servidor de produção

npm run db:push          # Sincronizar schema com banco
npm run db:seed          # Carregar dados de teste
npm run db:studio        # Abrir Prisma Studio (GUI)

./dev-db-setup.sh sqlite    # Setup local com SQLite
./dev-db-setup.sh postgres  # Setup para PostgreSQL (produção)
```

## 🛡️ Segurança

### Passwords
- Sempre use `bcryptjs` em produção
- Nunca commite senhas em pleno texto
- Configure senhas reais no arquivo `.env.production`

### Database URLs
- **Desenvolvimento**: Arquivo local (`file:./prisma/dev.db`)
- **Produção**: Variável de ambiente `DATABASE_URL` com SSL

## 📊 Visualizar Dados

### Prisma Studio (GUI)
```bash
npm run db:studio
```

Acessa: http://localhost:5555

### Terminal
```bash
sqlite3 prisma/dev.db ".tables"
sqlite3 prisma/dev.db "SELECT * FROM Reservation;"
```

## ⚠️ Troubleshooting

### Erro: "DATABASE_URL not found"
```bash
# Certifique-se de que .env existe:
cat .env | grep DATABASE_URL

# Deve mostrar:
# DATABASE_URL="file:./prisma/dev.db"
```

### Erro: "Provider mismatch"
```bash
# Restaure o schema:
cp prisma/schema.prisma.backup prisma/schema.prisma

# Regenere:
npx prisma generate
```

### Banco SQLite corrompido
```bash
rm prisma/dev.db
npx prisma db push
npm run db:seed
```

## 🔗 Recursos Úteis

- [Documentação Prisma](https://www.prisma.io/docs/)
- [Referência do Schema](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Prisma Studio](https://www.prisma.io/docs/concepts/more/introspection)
- [PostgreSQL no Vercel](https://vercel.com/docs/storage/postgres)

---

**Última atualização**: Novembro 2025  
**Sistema**: Centro Equestre Quinta da Horta  
**Versão**: 1.0.0
