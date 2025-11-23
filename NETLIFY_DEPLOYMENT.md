# 🚀 Guia de Deployment - Netlify

## Pré-requisitos

- [ ] Conta Netlify criada
- [ ] Repositório GitHub conectado
- [ ] Database PostgreSQL (Vercel Postgres) ativo
- [ ] Variáveis de ambiente configuradas

---

## Configuração na Netlify

### 1. Conectar GitHub

1. Aceda a https://app.netlify.com
2. Clique em **"New site from Git"**
3. Escolha **GitHub** e autorize
4. Selecione o repositório: `januariosimao7-star/picadeiroha`
5. Configure os seguintes settings:

### 2. Build Settings

```
Build command: npm run build
Publish directory: .next
```

### 3. Environment Variables

Vá para **Site settings → Build & deploy → Environment**

Adicione as seguintes variáveis:

```
NEXTAUTH_SECRET=faizI61+OdgjneVOrQO0NXk4VwF54mWuGY8o9HgPznY=
NEXTAUTH_URL=https://gilbertofilipe.netlify.app
DATABASE_URL=postgresql://default:0bw6qpvg0r0c@ep-long-darkness-a41qjtwj.eu-central-1.postgres.vercel-storage.com:5432/verceldb
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AfdaaB-AlwGPE5MYpZ-fqSs0AymqEbAto3Fr4jrUmOXpCHzvi1uAf2elkggC1cjLHx4qJJV2kjU3rleK
NODE_ENV=production
```

### 4. Functions (Serverless)

Netlify functions já estão configuradas no `netlify.toml`.

---

## Resolver Erros Comuns

### ❌ Erro: "DATABASE_URL is required"

**Solução:**
1. Verifique se DATABASE_URL está configurada nas Environment Variables
2. Verifique se a DATABASE_URL está correta
3. Faça um redeploy

### ❌ Erro: "NEXTAUTH_SECRET is not set"

**Solução:**
1. Adicione NEXTAUTH_SECRET nas Environment Variables
2. Use: `faizI61+OdgjneVOrQO0NXk4VwF54mWuGY8o9HgPznY=`

### ❌ Erro: "Cannot connect to database"

**Solução:**
1. Verifique se Vercel Postgres está online
2. Teste a conexão localmente primeiro
3. Verifique se o IP da Netlify está whitelisted (geralmente não é necessário)

### ❌ Erro 500 no Admin Dashboard

**Solução:**
1. Limpe cache do navegador
2. Tente em modo incógnito
3. Verifique os logs da Netlify (Functions)

### ❌ Build falha com "Prisma error"

**Solução:**
```bash
# Localmente, execute:
npm run build

# Se funcionar localmente, o problema é nas Environment Variables da Netlify
# Verifique se DATABASE_URL está correta
```

---

## Monitoramento

### Verificar Logs do Build

1. Aceda a https://app.netlify.com/sites/gilbertofilipe
2. Vá para **Deploys**
3. Clique no último deploy
4. Veja **Build log**

### Verificar Erros em Runtime

1. Aceda a **Functions**
2. Procure por erros nas funções serverless
3. Verifique **Logs** (canto superior direito)

---

## Redeployment

Para fazer redeploy:

**Opção 1:** Push para GitHub
```bash
git add .
git commit -m "chore: update"
git push origin main
```

**Opção 2:** Trigger manual na Netlify
1. Aceda a https://app.netlify.com/sites/gilbertofilipe
2. Clique **Deploys → Trigger deploy**

---

## Teste de Produção

Após o deploy, teste:

1. **Home**: https://gilbertofilipe.netlify.app ✓
2. **Login**: https://gilbertofilipe.netlify.app/auth/login ✓
3. **Admin**: https://gilbertofilipe.netlify.app/dashboard ✓
4. **Shop**: https://gilbertofilipe.netlify.app/products ✓

### Credenciais de Teste:
- **Utilizador**: `picadeiroquintadahorta`
- **Senha**: `picadeiro2026`

---

## Otimizações de Produção

### 1. Cache Control

Já configurado em `netlify.toml`:
- Assets estáticos: Cache por 1 ano
- HTML: Sem cache

### 2. Security Headers

Já configurado:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- X-XSS-Protection: Ativo

### 3. Performance

- Next.js 16 com Turbopack
- Static generation onde possível
- API routes dinamicamente renderizadas

---

## Documentação Oficial

- [Netlify Next.js Guide](https://www.netlify.com/blog/deploy-nextjs-to-netlify-the-complete-guide/)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [NextAuth.js Docs](https://next-auth.js.org/)
