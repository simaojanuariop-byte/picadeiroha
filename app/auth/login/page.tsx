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
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-amber-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 -right-40 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-80 h-80 bg-amber-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 0.5px, transparent 0.5px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6 p-4 bg-gradient-to-br from-amber-600 to-amber-500 rounded-2xl shadow-2xl shadow-amber-600/50">
            <div className="text-6xl">🐴</div>
          </div>
          <h1 className="text-5xl font-black text-white mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Gilberto Filipe
          </h1>
          <p className="text-amber-500 font-black text-xs tracking-widest uppercase mb-4">
            ✦ Centro Equestre de Excelência ✦
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-gradient-to-r from-amber-600 to-transparent" />
            <p className="text-gray-400 text-xs font-bold">Acesso Administrativo Seguro</p>
            <div className="h-px w-8 bg-gradient-to-l from-amber-600 to-transparent" />
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-black border border-gray-800 rounded-2xl shadow-2xl p-10 backdrop-blur-xl relative group">
          {/* Card Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500" />
          
          <div className="relative">
            {/* Title */}
            <div className="mb-8">
              <h2 className="text-2xl font-black text-white mb-1">
                Bem-vindo de volta
              </h2>
              <p className="text-gray-400 font-bold text-sm">Aceda ao seu painel administrativo</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-950/50 border border-red-800/50 text-red-300 rounded-xl font-black text-sm backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <span className="text-xl">⚠️</span>
                  <span>{error}</span>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email/Utilizador */}
              <div className="group/field">
                <label className="block text-xs font-black text-gray-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                  <span className="text-amber-500">👤</span> Utilizador / Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Insira seu utilizador"
                    className="w-full px-5 py-3.5 bg-gray-900/50 border-2 border-gray-700 rounded-xl focus:border-amber-500 focus:outline-none transition duration-300 font-bold text-white placeholder-gray-600 hover:border-gray-600 backdrop-blur-sm"
                    disabled={loading}
                  />
                  <div className="absolute right-4 top-3.5 text-gray-500 group-focus-within/field:text-amber-500 transition">👤</div>
                </div>
              </div>

              {/* Senha */}
              <div className="group/field">
                <label className="block text-xs font-black text-gray-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                  <span className="text-amber-500">🔐</span> Palavra-passe
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-5 py-3.5 bg-gray-900/50 border-2 border-gray-700 rounded-xl focus:border-amber-500 focus:outline-none transition duration-300 font-bold text-white placeholder-gray-600 hover:border-gray-600 backdrop-blur-sm"
                    disabled={loading}
                  />
                  <div className="absolute right-4 top-3.5 text-gray-500 group-focus-within/field:text-amber-500 transition">🔐</div>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 cursor-pointer group/check">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 bg-gray-900 border-2 border-gray-700 rounded focus:ring-2 focus:ring-amber-500 cursor-pointer"
                  />
                  <span className="text-xs text-gray-400 font-bold group-hover/check:text-gray-300">Lembrar-me</span>
                </label>
                <Link href="#" className="text-xs text-amber-500 font-black hover:text-amber-400 transition">
                  Esqueceu a palavra-passe?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-black font-black py-3.5 rounded-xl transition transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 uppercase tracking-wider text-sm shadow-lg shadow-amber-600/50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    Processando...
                  </>
                ) : (
                  <>
                    <span>✓</span>
                    Entrar no Painel
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent" />
              <span className="text-gray-600 text-xs font-bold">OU</span>
              <div className="flex-1 h-px bg-gradient-to-l from-gray-800 to-transparent" />
            </div>

            {/* Security Notice */}
            <div className="bg-gradient-to-br from-green-950/40 to-gray-900 border border-green-800/30 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-xs text-green-400 font-black mb-2 flex items-center gap-2">
                <span>🔒</span> CONEXÃO SEGURA
              </p>
              <p className="text-xs text-gray-300 font-bold leading-relaxed">
                Sua conexão é protegida por encriptação SSL/TLS de nível empresarial. Nunca compartilhe suas credenciais.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-10 space-y-4">
          <p className="text-center">
            <Link href="/" className="text-gray-400 hover:text-amber-500 font-black text-sm transition transform hover:scale-105 inline-flex items-center gap-2">
              <span>←</span>
              <span>Voltar para Home</span>
            </Link>
          </p>
          <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-800">
            <a href="#" className="text-gray-500 hover:text-gray-400 text-xs font-bold transition">Privacy</a>
            <span className="text-gray-700">•</span>
            <a href="#" className="text-gray-500 hover:text-gray-400 text-xs font-bold transition">Terms</a>
            <span className="text-gray-700">•</span>
            <a href="#" className="text-gray-500 hover:text-gray-400 text-xs font-bold transition">Support</a>
          </div>
          <p className="text-center text-gray-700 text-xs font-bold mt-4">
            © 2025 Gilberto Filipe - Centro Equestre Premium
          </p>
        </div>
      </div>
    </div>
  );
}
