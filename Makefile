.PHONY: help install dev build start clean db-push db-seed db-studio lint

# PH - Gilberto Filipe | Makefile
# ================================

help:
	@echo "🐴 PH - Gilberto Filipe | Centro Equestre"
	@echo ""
	@echo "Comandos disponíveis:"
	@echo ""
	@echo "  make install      - Instalar dependências"
	@echo "  make dev          - Iniciar desenvolvimento (npm run dev)"
	@echo "  make quick        - Iniciar desenvolvimento rápido (./start.sh)"
	@echo "  make build        - Build para produção"
	@echo "  make start        - Executar servidor de produção"
	@echo "  make db-push      - Sincronizar banco de dados"
	@echo "  make db-seed      - Preencher com dados de teste"
	@echo "  make db-studio    - Abrir Prisma Studio"
	@echo "  make lint         - Verificação de qualidade"
	@echo "  make clean        - Limpar cache"
	@echo "  make menu         - Menu interativo (./dev.sh)"
	@echo ""

install:
	@echo "📦 Instalando dependências..."
	@npm install

dev:
	@echo "🚀 Iniciando desenvolvimento..."
	@export DATABASE_URL="file:./prisma/dev.db" && npm run dev

quick:
	@echo "⚡ Iniciar rápido..."
	@./start.sh

build:
	@echo "🔨 Build para produção..."
	@export DATABASE_URL="file:./prisma/dev.db" && npm run build

start: build
	@echo "🚀 Executando servidor de produção..."
	@npm start

db-push:
	@echo "🗄️ Sincronizando banco de dados..."
	@export DATABASE_URL="file:./prisma/dev.db" && npx prisma db push

db-seed: db-push
	@echo "🌱 Preenchendo com dados de teste..."
	@export DATABASE_URL="file:./prisma/dev.db" && node prisma/seed.js

db-studio:
	@echo "📊 Abrindo Prisma Studio..."
	@export DATABASE_URL="file:./prisma/dev.db" && npx prisma studio

lint:
	@echo "🔍 Verificando qualidade..."
	@npm run lint

clean:
	@echo "🧹 Limpando cache..."
	@rm -rf .next
	@rm -rf node_modules/.cache
	@echo "✓ Cache limpo!"

menu:
	@./dev.sh

.DEFAULT_GOAL := help
