#!/bin/bash

# Script para inicializar banco de dados SQLite para desenvolvimento local
# Use: ./setup-local-db.sh

echo "🔧 Configurando banco de dados SQLite local para desenvolvimento..."

# Criar arquivo .env.local se não existir
if [ ! -f .env.local ]; then
  echo "📝 Criando .env.local com configuração SQLite..."
  cat > .env.local << 'EOF'
# Local development database (SQLite)
DATABASE_URL="file:./prisma/dev.db"

# NextAuth configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="faizI61+OdgjneVOrQO0NXk4VwF54mWuGY8o9HgPznY="

# Email configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="januariosimao8@gmail.com"
SMTP_PASSWORD="your_gmail_app_password"
EMAIL_FROM="januariosimao8@gmail.com"
CALENDAR_RECIPIENT_EMAIL="januariosimao8@gmail.com"

# PayPal Integration
NEXT_PUBLIC_PAYPAL_CLIENT_ID="AfdaaB-AlwGPE5MYpZ-fqSs0AymqEbAto3Fr4jrUmOXpCHzvi1uAf2elkggC1cjLHx4qJJV2kjU3rleK"
PAYPAL_SECRET="your_paypal_secret_key_here_change_in_production"
EOF
  echo "✅ .env.local criado"
fi

# Usar SQLite temporariamente
export DATABASE_URL="file:./prisma/dev.db"

# Criar pasta prisma se não existir
mkdir -p prisma

# Alterar schema.prisma para SQLite temporariamente
echo "🔄 Alterando schema para SQLite..."

# Backup do schema original
if [ ! -f prisma/schema.prisma.backup ]; then
  cp prisma/schema.prisma prisma/schema.prisma.backup
fi

# Substituir provider de postgresql para sqlite
sed -i.bak 's/provider = "postgresql"/provider = "sqlite"/' prisma/schema.prisma
sed -i.bak 's|url = env("DATABASE_URL")|url = "file:./prisma/dev.db"|' prisma/schema.prisma

# Executar migração
echo "📊 Criando tabelas no banco SQLite..."
npx prisma db push --skip-generate

# Restaurar schema original
echo "🔄 Restaurando schema para PostgreSQL..."
cp prisma/schema.prisma.backup prisma/schema.prisma
rm -f prisma/schema.prisma.bak

# Gerar cliente Prisma
echo "📦 Gerando cliente Prisma..."
npx prisma generate

echo "✅ Banco de dados SQLite configurado com sucesso!"
echo "📍 Localização: ./prisma/dev.db"
echo "🚀 Execute 'npm run dev' para iniciar o servidor"
