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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🐴</div>
          <h1 className="text-3xl font-black text-black">PH - Gilberto Filipe</h1>
          <p className="text-black font-bold mt-2">Centro Equestre de Excelência</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h2 className="text-2xl font-black text-black mb-6 text-center">
            Acesso Restrito
          </h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email/Utilizador */}
            <div>
              <label className="block text-sm font-black text-black mb-2">
                Utilizador / Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="picadeiroquintadahorta"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <p className="text-xs text-black font-bold">
              ✉️ Email: <span className="font-black">picadeiro@phcentroequestre.pt</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-black font-bold">
            Não tem conta?{" "}
            <Link href="/auth/register" className="text-amber-600 hover:text-amber-700 font-black">
              Registe-se aqui
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
