import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

// Admin credenciais predefinidas
const ADMIN_USER = {
  id: "admin-1",
  email: "picadeiroquintadahorta",
  password: "picadeiro2026",
  name: "Administrador",
  role: "admin",
};

interface CustomUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email/Utilizador", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials): Promise<CustomUser | null> {
        // Validação básica
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credenciais inválidas");
        }

        // Verificar admin
        if (
          credentials.email === ADMIN_USER.email &&
          credentials.password === ADMIN_USER.password
        ) {
          return {
            id: ADMIN_USER.id,
            email: ADMIN_USER.email,
            name: ADMIN_USER.name,
            role: ADMIN_USER.role,
          };
        }

        // Aqui você pode adicionar verificação em BD para clientes normais
        // Por enquanto, apenas admin pode fazer login
        throw new Error("Email ou senha incorretos");
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.role = user.role || "user";
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },
  secret: process.env.NEXTAUTH_SECRET,
};
