'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validações básicas
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Todos os campos são obrigatórios");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não correspondem");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erro ao criar conta");
        setLoading(false);
        return;
      }

      // Redirecionar para login com mensagem de sucesso
      router.push("/auth/login?registered=true");
    } catch (err) {
      setError("Erro ao conectar ao servidor");
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
            <p className="text-gray-400 text-xs font-bold">Junte-se à Comunidade Premium</p>
            <div className="h-px w-8 bg-gradient-to-l from-amber-600 to-transparent" />
          </div>
        </div>

        {/* Register Card */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-950 to-black border border-gray-800 rounded-2xl shadow-2xl p-10 backdrop-blur-xl relative group">
          {/* Card Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500" />
          
          <div className="relative">
            {/* Title */}
            <div className="mb-8">
              <h2 className="text-2xl font-black text-white mb-1">
                Criar Conta Premium
              </h2>
              <p className="text-gray-400 font-bold text-sm">Acesso completo a todos os serviços</p>
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
              {/* Nome Completo */}
              <div className="group/field">
                <label className="block text-xs font-black text-gray-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                  <span className="text-amber-500">👤</span> Nome Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Insira seu nome completo"
                  className="w-full px-5 py-3.5 bg-gray-900/50 border-2 border-gray-700 rounded-xl focus:border-amber-500 focus:outline-none transition duration-300 font-bold text-white placeholder-gray-600 hover:border-gray-600 backdrop-blur-sm"
                  disabled={loading}
                />
              </div>

              {/* Email */}
              <div className="group/field">
                <label className="block text-xs font-black text-gray-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                  <span className="text-amber-500">📧</span> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className="w-full px-5 py-3.5 bg-gray-900/50 border-2 border-gray-700 rounded-xl focus:border-amber-500 focus:outline-none transition duration-300 font-bold text-white placeholder-gray-600 hover:border-gray-600 backdrop-blur-sm"
                  disabled={loading}
                />
              </div>

              {/* Senha */}
              <div className="group/field">
                <label className="block text-xs font-black text-gray-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                  <span className="text-amber-500">🔐</span> Palavra-passe
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="w-full px-5 py-3.5 bg-gray-900/50 border-2 border-gray-700 rounded-xl focus:border-amber-500 focus:outline-none transition duration-300 font-bold text-white placeholder-gray-600 hover:border-gray-600 backdrop-blur-sm"
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 font-bold mt-2">Mínimo 6 caracteres</p>
              </div>

              {/* Confirmar Senha */}
              <div className="group/field">
                <label className="block text-xs font-black text-gray-300 mb-3 uppercase tracking-wider flex items-center gap-2">
                  <span className="text-amber-500">✓</span> Confirmar Palavra-passe
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••••••"
                  className="w-full px-5 py-3.5 bg-gray-900/50 border-2 border-gray-700 rounded-xl focus:border-amber-500 focus:outline-none transition duration-300 font-bold text-white placeholder-gray-600 hover:border-gray-600 backdrop-blur-sm"
                  disabled={loading}
                />
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
                    Criando Conta...
                  </>
                ) : (
                  <>
                    <span>✓</span>
                    Criar Conta
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-3">
              <div className="flex-1 h-px bg-gradient-to-r from-gray-800 to-transparent" />
              <span className="text-gray-600 text-xs font-bold">SEGURANÇA</span>
              <div className="flex-1 h-px bg-gradient-to-l from-gray-800 to-transparent" />
            </div>

            {/* Security Notice */}
            <div className="bg-gradient-to-br from-green-950/40 to-gray-900 border border-green-800/30 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-xs text-green-400 font-black mb-2 flex items-center gap-2">
                <span>🔒</span> DADOS PROTEGIDOS
              </p>
              <p className="text-xs text-gray-300 font-bold leading-relaxed">
                Seus dados são protegidos por encriptação SSL/TLS de nível empresarial. Nunca partilharemos suas informações com terceiros.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 space-y-6">
          <div className="flex items-center justify-center gap-4 pt-6 border-t border-gray-800">
            <a href="#" className="text-gray-500 hover:text-amber-400 text-xs font-black uppercase tracking-wider transition">Privacy</a>
            <span className="text-gray-700">•</span>
            <a href="#" className="text-gray-500 hover:text-amber-400 text-xs font-black uppercase tracking-wider transition">Terms</a>
            <span className="text-gray-700">•</span>
            <a href="#" className="text-gray-500 hover:text-amber-400 text-xs font-black uppercase tracking-wider transition">Support</a>
          </div>
          
          <div className="space-y-3 text-center">
            <p className="text-center">
              <Link href="/auth/login" className="text-amber-500 hover:text-amber-400 font-black text-sm transition transform hover:scale-105 inline-flex items-center gap-2">
                <span>←</span>
                <span>Já tem conta? Faça login</span>
              </Link>
            </p>
            <p className="text-center">
              <Link href="/" className="text-gray-400 hover:text-amber-500 font-black text-sm transition transform hover:scale-105 inline-flex items-center gap-2">
                <span>←</span>
                <span>Voltar para Home</span>
              </Link>
            </p>
          </div>
          
          <p className="text-center text-gray-700 text-xs font-bold">
            © 2025 Gilberto Filipe - Centro Equestre Premium
          </p>
        </div>
      </div>
    </div>
  );
}
