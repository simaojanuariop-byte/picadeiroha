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

        {/* Register Card */}
        <div className="bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl p-10 backdrop-blur-sm">
          <div>
            <h2 className="text-2xl font-black text-white mb-2 text-center">
              Criar Conta
            </h2>
            <p className="text-gray-400 font-bold text-xs text-center mb-8">Junte-se à comunidade premium</p>

            {error && (
              <div className="mb-6 p-4 bg-red-950 border border-red-800 text-red-300 rounded-xl font-black text-sm">
                <span className="text-red-500">⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Nome Completo */}
              <div className="group">
                <label className="block text-xs font-black text-gray-300 mb-3 uppercase tracking-wider">
                  👤 Nome Completo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="João Silva"
                  className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-xl focus:border-amber-500 focus:outline-none transition duration-300 font-bold text-white placeholder-gray-600 hover:border-gray-600"
                  disabled={loading}
                />
              </div>

              {/* Email */}
              <div className="group">
                <label className="block text-xs font-black text-gray-300 mb-3 uppercase tracking-wider">
                  📧 Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="joao@example.com"
                  className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-xl focus:border-amber-500 focus:outline-none transition duration-300 font-bold text-white placeholder-gray-600 hover:border-gray-600"
                  disabled={loading}
                />
              </div>

              {/* Senha */}
              <div className="group">
                <label className="block text-xs font-black text-gray-300 mb-3 uppercase tracking-wider">
                  🔐 Senha
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-xl focus:border-amber-500 focus:outline-none transition duration-300 font-bold text-white placeholder-gray-600 hover:border-gray-600"
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 font-bold mt-2">Mínimo 6 caracteres</p>
              </div>

              {/* Confirmar Senha */}
              <div className="group">
                <label className="block text-xs font-black text-gray-300 mb-3 uppercase tracking-wider">
                  ✓ Confirmar Senha
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-xl focus:border-amber-500 focus:outline-none transition duration-300 font-bold text-white placeholder-gray-600 hover:border-gray-600"
                  disabled={loading}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-gradient-to-r from-amber-600 to-amber-500 text-black font-black py-3 rounded-xl hover:from-amber-500 hover:to-amber-400 transition transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider text-sm shadow-lg hover:shadow-amber-600/50"
              >
                {loading ? "🔄 Criando Conta..." : "✓ Criar Conta"}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-800" />
              <span className="text-gray-500 text-xs font-bold">TERMOS</span>
              <div className="flex-1 h-px bg-gray-800" />
            </div>

            {/* Terms Box */}
            <div className="bg-gradient-to-br from-amber-950 to-gray-900 border border-amber-800/30 rounded-xl p-4">
              <p className="text-xs text-amber-300 font-black mb-2">📋 DECLARAÇÃO DE PRIVACIDADE</p>
              <p className="text-xs text-gray-300 font-bold leading-relaxed">
                Ao criar uma conta, concorda com nossos termos de serviço e política de privacidade. Os dados serão utilizados apenas para fins administrativos.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-10 space-y-3">
          <p className="text-center">
            <Link href="/auth/login" className="text-gray-400 hover:text-amber-500 font-black text-sm transition transform hover:scale-105 inline-block">
              ← Já tem conta? Faça login
            </Link>
          </p>
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
