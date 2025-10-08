"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from '@/contexts/AuthContext';

export default function Cadastro() {
  const router = useRouter();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    general: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {
      password: "",
      confirmPassword: "",
      general: ""
    };

    if (formData.password.length < 6) {
      newErrors.password = "A senha deve ter no mínimo 6 caracteres";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    // Verificar se email já existe (simulação)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const emailExists = users.some((user: any) => user.email === formData.email);
    if (emailExists) {
      newErrors.general = "Este email já está cadastrado";
    }

    setErrors(newErrors);
    return !newErrors.password && !newErrors.confirmPassword && !newErrors.general;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ password: "", confirmPassword: "", general: "" });

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      // Criar objeto do usuário
      const userData = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        // Em uma aplicação real, a senha seria enviada para um backend seguro
      };

      // Registrar usuário no contexto de autenticação
      register(userData);
      
      console.log("Cadastro realizado:", userData);
      
      // Redirecionar para a página inicial
      router.push("/");
      
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        general: "Erro ao criar conta. Tente novamente."
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
    // Limpa erros quando o usuário começar a digitar
    if (errors.password || errors.confirmPassword || errors.general) {
      setErrors({ password: "", confirmPassword: "", general: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Card de Cadastro */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Cabeçalho */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">TP</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Criar conta</h1>
            <p className="text-gray-600">Junte-se à nossa comunidade</p>
          </div>

          {/* Mensagem de erro geral */}
          {errors.general && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {errors.general}
            </div>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nome completo
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition text-gray-800 bg-white"
                placeholder="Seu nome completo"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Mínimo 6 caracteres"
                required
                minLength={6}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirmar senha
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Digite novamente sua senha"
                required
                minLength={6}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            <label className="flex items-start">
              <input
                type="checkbox"
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 mt-1"
                required
              />
              <span className="ml-2 text-sm text-gray-600">
                Concordo com os{" "}
                <Link href="/terms" className="text-green-600 hover:text-green-500">
                  Termos de Serviço
                </Link>{" "}
                e{" "}
                <Link href="/privacy" className="text-green-600 hover:text-green-500">
                  Política de Privacidade
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Criando conta..." : "Criar conta"}
            </button>
          </form>

          {/* Divisor */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Já tem uma conta?</span>
              </div>
            </div>

            <Link
              href="/login"
              className="w-full mt-4 border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:border-green-500 hover:text-green-600 transition font-semibold flex items-center justify-center"
            >
              Fazer login
            </Link>
          </div>
        </div>

        {/* Link para voltar */}
        <div className="text-center mt-6">
          <Link href="/" className="text-green-600 hover:text-green-500 font-medium">
            ← Voltar para a página inicial
          </Link>
        </div>
      </div>
    </div>
  );
}