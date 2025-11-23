#!/bin/bash

# Script para gerenciar desenvolvimento local com SQLite vs produção com PostgreSQL
# Uso: ./dev-db-setup.sh [sqlite|postgres]

echo "🔧 Gerenciador de Base de Dados - Centro Equestre"
echo "=================================================="

MODE="${1:-sqlite}"

if [ "$MODE" = "sqlite" ]; then
  echo "📱 Configurando para desenvolvimento local com SQLite..."
  
  # Backup do schema original
  if [ ! -f prisma/schema.prisma.backup ]; then
    cp prisma/schema.prisma prisma/schema.prisma.backup
  fi
  
  # Alterar schema para SQLite
  sed -i.bak 's/provider = "postgresql"/provider = "sqlite"/' prisma/schema.prisma
  sed -i.bak 's|url = env("DATABASE_URL")|url = "file:./prisma/dev.db"|' prisma/schema.prisma
  
  # Garantir DATABASE_URL está configurado para SQLite no .env
  if grep -q "^DATABASE_URL=" .env 2>/dev/null; then
    sed -i.bak 's|^DATABASE_URL=.*|DATABASE_URL="file:./prisma/dev.db"|' .env
  else
    echo 'DATABASE_URL="file:./prisma/dev.db"' >> .env
  fi
  
  # Sincronizar banco de dados
  echo "📊 Sincronizando banco SQLite..."
  npx prisma db push --skip-generate
  
  echo "📦 Gerando cliente Prisma..."
  npx prisma generate
  
  echo "🌱 Carregando dados de teste..."
  npm run db:seed
  
  echo "✅ Ambiente SQLite configurado!"
  echo "🚀 Inicie com: npm run dev"
  
elif [ "$MODE" = "postgres" ]; then
  echo "🐘 Configurando para produção com PostgreSQL..."
  
  # Restaurar schema original
  if [ -f prisma/schema.prisma.backup ]; then
    cp prisma/schema.prisma.backup prisma/schema.prisma
    echo "✅ Schema restaurado para PostgreSQL"
  fi
  
  echo "⚠️  Certifique-se de que DATABASE_URL está configurado no .env"
  echo "📦 Gerando cliente Prisma..."
  npx prisma generate
  
  echo "✅ Ambiente PostgreSQL pronto!"
  
else
  echo "❌ Uso inválido"
  echo "Sintaxe: ./dev-db-setup.sh [sqlite|postgres]"
  exit 1
fi
