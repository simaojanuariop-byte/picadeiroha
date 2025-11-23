#!/bin/bash

# PH - Gilberto Filipe | Script Rápido de Desenvolvimento
# ========================================================

export DATABASE_URL="file:./prisma/dev.db"

echo "🐴 PH - Gilberto Filipe | Iniciando..."
echo "📍 Localização: Rua das Hortas 83, Atalaia, Portugal"
echo "📞 Contacto: 932 111 786"
echo ""

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
    echo ""
fi

# Sincronizar BD se não existir
if [ ! -f "prisma/dev.db" ]; then
    echo "🗄️ Criando banco de dados..."
    npx prisma db push
    echo ""
fi

echo "🚀 Iniciando servidor de desenvolvimento..."
echo "🌐 Acesso em: http://localhost:3000"
echo "⏹️  Pressione CTRL+C para parar"
echo ""

npm run dev
