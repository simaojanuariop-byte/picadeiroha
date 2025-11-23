# PH - Gilberto Filipe | Centro Equestre

Plataforma completa de e-commerce e reservas para centro equestre.

## 🚀 Tecnologias

- **Frontend:** Next.js 16.0.3, React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** SQLite (desenvolvimento), PostgreSQL (produção)
- **Autenticação:** NextAuth.js v4
- **Pagamentos:** PayPal Integration
- **Estado:** Zustand (carrinho)
- **Deploy:** Vercel

## 📋 Funcionalidades

### 👤 Públicos
- Landing page profissional
- Catálogo de produtos
- Sistema de reservas
- Carrinho de compras
- Integração PayPal

### 👨‍💼 Utilizadores
- Registro e login
- Área pessoal com perfil
- Histórico de compras
- Gerenciamento de reservas
- Downloads de documentos

### 🔐 Admin
- Painel administrativo completo
- Analytics e relatórios
- Gestor de conteúdo (CMS)
- Gestão de produtos
- Gestão de utilizadores
- Gestão de reservas

Credenciais de Admin (desenvolvimento):
- Utilizador: `picadeiroquintadahorta`
- Senha: `picadeiro2026`

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.local.example .env.local

# Setup do banco de dados
npx prisma migrate dev

# Iniciar servidor de desenvolvimento
npm run dev
```

## 📁 Estrutura do Projeto

```
app/
├── (admin)              # Rotas administrativas
├── (shop)               # Rotas de loja
├── api/                 # API routes
├── auth/                # Autenticação
└── client/              # Área do cliente

components/
├── admin/               # Componentes administrativos
├── common/              # Componentes compartilhados
└── shop/                # Componentes de loja

lib/
├── auth.ts              # Configuração NextAuth
├── store/               # Zustand stores
└── db/                  # Prisma client
```

## 🔑 Variáveis de Ambiente

```env
# Autenticação
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

# Banco de Dados
DATABASE_URL="file:./prisma/dev.db"

# PayPal
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_client_id
PAYPAL_SECRET=your_secret_key
```

## 📦 Build e Deploy

```bash
# Build para produção
npm run build

# Iniciar em produção
npm start
```

## 🚀 Deploy no Vercel

1. Conectar repositório GitHub ao Vercel
2. Adicionar variáveis de ambiente no painel Vercel
3. Database: PostgreSQL recomendado para produção
4. Deploy automático em push para `main`

## 🔒 Segurança

- ✅ Senhas hasheadas com bcryptjs
- ✅ Autenticação JWT segura
- ✅ Validação de inputs
- ✅ CORS configurado
- ✅ Rate limiting recomendado para produção

## 📞 Suporte

Email: picadeiro@phcentroequestre.pt
Telefone: +351 234 567 890

## 📄 Licença

Proprietary - Todos os direitos reservados
