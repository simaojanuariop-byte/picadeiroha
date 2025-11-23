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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🐴</div>
          <h1 className="text-3xl font-black text-black">PH - Gilberto Filipe</h1>
          <p className="text-black font-bold mt-2">Centro Equestre de Excelência</p>
        </div>

        {/* Register Card */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h2 className="text-2xl font-black text-black mb-6 text-center">
            Criar Conta
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg font-bold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome Completo */}
            <div>
              <label className="block text-sm font-black text-black mb-2">
                Nome Completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="João Silva"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition font-bold text-black placeholder-gray-400"
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-black text-black mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="joao@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition font-bold text-black placeholder-gray-400"
                disabled={loading}
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-sm font-black text-black mb-2">
                Senha
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition font-bold text-black placeholder-gray-400"
                disabled={loading}
              />
            </div>

            {/* Confirmar Senha */}
            <div>
              <label className="block text-sm font-black text-black mb-2">
                Confirmar Senha
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition font-bold text-black placeholder-gray-400"
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-black font-black py-3 rounded-lg hover:from-amber-700 hover:to-amber-800 transition transform hover:scale-105 disabled:opacity-50"
            >
              {loading ? "Criando Conta..." : "Criar Conta"}
            </button>
          </form>

          {/* Terms */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <p className="text-xs text-black font-bold">
              Ao criar uma conta, concordo com os termos de serviço e política de privacidade
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-black font-bold">
            Já tem conta?{" "}
            <Link href="/auth/login" className="text-amber-600 hover:text-amber-700 font-black">
              Faça login aqui
            </Link>
          </p>
          <p className="text-black font-bold mt-2">
            <Link href="/" className="text-amber-600 hover:text-amber-700 font-black">
              Voltar para Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
