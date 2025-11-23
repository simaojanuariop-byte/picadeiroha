#!/bin/bash

# PH - Gilberto Filipe | Script de Desenvolvimento
# ================================================

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir headers
print_header() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

# Função para imprimir sucesso
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

# Função para imprimir erro
print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Função para imprimir info
print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Menu principal
show_menu() {
    echo ""
    echo "PH - Gilberto Filipe | Centro Equestre"
    echo ""
    echo "Escolha uma opção:"
    echo ""
    echo "  1) Iniciar Desenvolvimento (npm run dev)"
    echo "  2) Build para Produção"
    echo "  3) Instalar Dependências"
    echo "  4) Sincronizar Banco de Dados"
    echo "  5) Seed do Banco de Dados"
    echo "  6) Abrir Prisma Studio"
    echo "  7) Lint e Verificação"
    echo "  8) Build + Executar Produção"
    echo "  9) Limpar Cache"
    echo "  0) Sair"
    echo ""
    read -p "Opção: " choice
}

# Opção 1: Desenvolvimento
start_dev() {
    print_header "🚀 Iniciando Servidor de Desenvolvimento"
    print_info "Servidor estará disponível em http://localhost:3000"
    print_info "Pressione CTRL+C para parar"
    echo ""
    export DATABASE_URL="file:./prisma/dev.db"
    npm run dev
}

# Opção 2: Build
build_prod() {
    print_header "🔨 Iniciando Build para Produção"
    export DATABASE_URL="file:./prisma/dev.db"
    if npm run build; then
        print_success "Build concluído com sucesso!"
    else
        print_error "Erro durante o build"
        return 1
    fi
}

# Opção 3: Instalar dependências
install_deps() {
    print_header "📦 Instalando Dependências"
    if npm install; then
        print_success "Dependências instaladas com sucesso!"
    else
        print_error "Erro ao instalar dependências"
        return 1
    fi
}

# Opção 4: Sincronizar BD
sync_db() {
    print_header "🗄️ Sincronizando Banco de Dados"
    export DATABASE_URL="file:./prisma/dev.db"
    if npx prisma db push; then
        print_success "Banco de dados sincronizado!"
    else
        print_error "Erro ao sincronizar banco de dados"
        return 1
    fi
}

# Opção 5: Seed
seed_db() {
    print_header "🌱 Preenchendo Banco de Dados com Dados de Teste"
    export DATABASE_URL="file:./prisma/dev.db"
    if node prisma/seed.js; then
        print_success "Seed concluído com sucesso!"
    else
        print_error "Erro ao executar seed"
        return 1
    fi
}

# Opção 6: Prisma Studio
prisma_studio() {
    print_header "📊 Abrindo Prisma Studio"
    export DATABASE_URL="file:./prisma/dev.db"
    npx prisma studio
}

# Opção 7: Lint
run_lint() {
    print_header "🔍 Executando Verificação de Qualidade"
    if npm run lint; then
        print_success "Verificação concluída!"
    else
        print_error "Erros encontrados"
        return 1
    fi
}

# Opção 8: Build + Produção
build_and_run() {
    print_header "🚀 Build e Execução em Produção"
    export DATABASE_URL="file:./prisma/dev.db"
    
    if npm run build; then
        print_success "Build concluído!"
        print_info "Iniciando servidor de produção..."
        npm start
    else
        print_error "Erro durante o build"
        return 1
    fi
}

# Opção 9: Limpar cache
clean_cache() {
    print_header "🧹 Limpando Cache"
    
    if [ -d ".next" ]; then
        rm -rf .next
        print_success "Removido: .next"
    fi
    
    if [ -d "node_modules/.cache" ]; then
        rm -rf node_modules/.cache
        print_success "Removido: node_modules/.cache"
    fi
    
    print_success "Cache limpo!"
}

# Loop principal
while true; do
    show_menu
    
    case $choice in
        1)
            start_dev
            ;;
        2)
            build_prod
            ;;
        3)
            install_deps
            ;;
        4)
            sync_db
            ;;
        5)
            seed_db
            ;;
        6)
            prisma_studio
            ;;
        7)
            run_lint
            ;;
        8)
            build_and_run
            ;;
        9)
            clean_cache
            ;;
        0)
            print_info "Saindo..."
            exit 0
            ;;
        *)
            print_error "Opção inválida!"
            ;;
    esac
    
    echo ""
    read -p "Pressione ENTER para continuar..."
done
