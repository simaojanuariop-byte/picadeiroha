# 🔧 Environment Variables Setup

## Local Development

Para rodar o projeto localmente, copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

### Variáveis Necessárias:

```env
# NextAuth - Autenticação
NEXTAUTH_SECRET=faizI61+OdgjneVOrQO0NXk4VwF54mWuGY8o9HgPznY=
NEXTAUTH_URL=http://localhost:3000

# Database - PostgreSQL (Vercel Postgres)
DATABASE_URL=postgresql://default:0bw6qpvg0r0c@ep-long-darkness-a41qjtwj.eu-central-1.postgres.vercel-storage.com:5432/verceldb

# PayPal Integration (Optional)
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AfdaaB-AlwGPE5MYpZ-fqSs0AymqEbAto3Fr4jrUmOXpCHzvi1uAf2elkggC1cjLHx4qJJV2kjU3rleK
```

---

## Produção (Netlify)

### 1. Configure Environment Variables na Netlify:

1. Aceda a https://app.netlify.com/sites/gilbertofilipe/settings/deploys
2. Vá para **Deploy settings → Build environment variables**
3. Adicione as seguintes variáveis:

| Variable | Value |
|----------|-------|
| `NEXTAUTH_SECRET` | `faizI61+OdgjneVOrQO0NXk4VwF54mWuGY8o9HgPznY=` |
| `NEXTAUTH_URL` | `https://gilbertofilipe.netlify.app` |
| `DATABASE_URL` | `postgresql://default:0bw6qpvg0r0c@ep-long-darkness-a41qjtwj.eu-central-1.postgres.vercel-storage.com:5432/verceldb` |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | `AfdaaB-AlwGPE5MYpZ-fqSs0AymqEbAto3Fr4jrUmOXpCHzvi1uAf2elkggC1cjLHx4qJJV2kjU3rleK` |
| `NODE_ENV` | `production` |

### 2. Credenciais de Admin:

Para fazer login no painel administrativo:

- **Utilizador**: `picadeiroquintadahorta`
- **Senha**: `picadeiro2026`

### 3. URLs Importantes:

- 🏠 **Home**: https://gilbertofilipe.netlify.app
- 🔐 **Login**: https://gilbertofilipe.netlify.app/auth/login
- 📊 **Admin Dashboard**: https://gilbertofilipe.netlify.app/dashboard
- 🛍️ **Shop**: https://gilbertofilipe.netlify.app/products
- 📅 **Reservations**: https://gilbertofilipe.netlify.app/reservations

---

## 🔒 Segurança

### ⚠️ Importante:

1. **NEXTAUTH_SECRET**: Gere uma nova senha para produção com:
   ```bash
   openssl rand -base64 32
   ```

2. **Variáveis Sensíveis**: Nunca commit `.env.local` ao Git
   - O arquivo `.gitignore` já o ignora automaticamente

3. **PayPal**: Configure suas próprias credenciais em produção

---

## 🆘 Troubleshooting

### Erro 500 no Admin Dashboard?

1. Verifique se todas as Environment Variables estão configuradas
2. Verifique se a DATABASE_URL está correta
3. Faça um redeploy na Netlify
4. Limpe o cache do navegador

### Erro de Autenticação?

1. Verifique se NEXTAUTH_SECRET está configurado
2. Verifique se NEXTAUTH_URL corresponde ao seu domínio
3. Tente fazer logout e login novamente

### Database Connection Error?

1. Verifique a DATABASE_URL
2. Teste a conexão com a Vercel Postgres
3. Verifique se o serviço Postgres está online

---

## 📝 Variáveis por Ambiente

### Development (.env.local)
```env
NEXTAUTH_SECRET=dev-secret-key-12345678901234567890123456
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=file:./prisma/dev.db
NODE_ENV=development
```

### Production (Netlify Environment Variables)
```env
NEXTAUTH_SECRET=prod-secret-key-must-be-secure-32-chars
NEXTAUTH_URL=https://gilbertofilipe.netlify.app
DATABASE_URL=postgresql://...
NODE_ENV=production
```

---

## ✅ Checklist

- [ ] `.env.local` criado localmente
- [ ] Environment Variables configuradas na Netlify
- [ ] DATABASE_URL testada e funcional
- [ ] NEXTAUTH_SECRET configurado
- [ ] PayPal Client ID adicionado
- [ ] Netlify redeploy completo
- [ ] Admin login testado
- [ ] Dashboard acessível
