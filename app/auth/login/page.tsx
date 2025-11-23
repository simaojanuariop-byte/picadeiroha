'use client';

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      // Redirecionar baseado no tipo de utilizador
      router.push("/dashboard");
    } catch (err) {
      setError("Erro ao fazer login");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 0.5px, transparent 0.5px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Top Decoration */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-amber-600 rounded-full opacity-10 blur-3xl" />
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <div className="text-7xl bg-gradient-to-br from-amber-500 to-amber-600 bg-clip-text text-transparent">🐴</div>
          </div>
          <h1 className="text-4xl font-black text-white mb-2">Gilberto Filipe</h1>
          <p className="text-amber-500 font-black text-sm tracking-widest">CENTRO EQUESTRE PREMIUM</p>
          <div className="mt-4 h-1 w-16 bg-gradient-to-r from-amber-500 to-amber-600 mx-auto rounded-full" />
        </div>

        {/* Login Card */}
        <div className="bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl p-10 backdrop-blur-sm relative">
          {/* Card Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500" />
          
          <div className="relative">
            <h2 className="text-2xl font-black text-white mb-2 text-center">
              Acesso Administrativo
            </h2>
            <p className="text-gray-400 font-bold text-xs text-center mb-8">Sistema de Gestão Seguro</p>

            {error && (
              <div className="mb-6 p-4 bg-red-950 border border-red-800 text-red-300 rounded-xl font-black text-sm">
                <span className="text-red-500">⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email/Utilizador */}
              <div className="group">
                <label className="block text-xs font-black text-gray-300 mb-3 uppercase tracking-wider">
                  👤 Utilizador / Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="picadeiroquintadahorta"
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-xl focus:border-amber-500 focus:outline-none transition duration-300 font-bold text-white placeholder-gray-600 hover:border-gray-600"
                    disabled={loading}
                  />
                  <div className="absolute right-3 top-3 text-xl opacity-50">👤</div>
                </div>
              </div>

              {/* Senha */}
              <div className="group">
                <label className="block text-xs font-black text-gray-300 mb-3 uppercase tracking-wider">
                  🔐 Senha
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-xl focus:border-amber-500 focus:outline-none transition duration-300 font-bold text-white placeholder-gray-600 hover:border-gray-600"
                    disabled={loading}
                  />
                  <div className="absolute right-3 top-3 text-xl opacity-50">🔐</div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-black py-3 rounded-xl hover:from-amber-500 hover:to-amber-400 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm shadow-lg hover:shadow-amber-600/50"
              >
                {loading ? "🔄 Entrando..." : "✓ Entrar no Painel"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-800" />
              <span className="text-gray-500 text-xs font-bold">OU</span>
              <div className="flex-1 h-px bg-gray-800" />
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-br from-amber-950 to-gray-900 border border-amber-800/30 rounded-xl p-4">
              <p className="text-xs text-amber-300 font-black mb-2">📋 CREDENCIAIS DE TESTE</p>
              <div className="space-y-1">
                <p className="text-xs text-gray-300 font-bold">
                  <span className="text-amber-400">Utilizador:</span> picadeiroquintadahorta
                </p>
                <p className="text-xs text-gray-300 font-bold">
                  <span className="text-amber-400">Senha:</span> picadeiro2026
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-10 space-y-3">
          <p className="text-center">
            <Link href="/" className="text-gray-400 hover:text-amber-500 font-black text-sm transition transform hover:scale-105 inline-block">
              ← Voltar para Home
            </Link>
          </p>
          <p className="text-center text-gray-600 text-xs font-bold">
            © 2025 Gilberto Filipe - Centro Equestre Premium
          </p>
        </div>
      </div>

      {/* Bottom Decoration */}
      <div className="absolute -bottom-20 right-10 w-40 h-40 bg-amber-600 rounded-full opacity-5 blur-3xl" />
    </div>
  );
}
