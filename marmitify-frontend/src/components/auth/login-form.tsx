"use client"

import { useState } from "react"
import { signIn, useSession } from "next-auth/react"
import { Eye, EyeOff, Mail, Lock, Loader2Icon } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export function LoginForm() {
  const { data: session } = useSession();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false
      });
      if (session) {
        // Redirect to dashboard or home page after successful login
        window.location.href = "/dashboard";
      }
    } catch (error) {
      toast.error("Erro ao logar", {
        description: "Tente novamente mais tarde.",
      })
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[400px] mt-[100px] space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Logue-se</h1>
        <p className="text-gray-600 text-sm">
          Se você ainda não possui uma conta <br />
          Pode se {" "}
          <Link href="/register" className="text-red-500 font-medium cursor-pointer hover:underline">
            registrar aqui!
          </Link>
        </p>
      </div>

      <form className="space-y-6">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-3">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="email"
              type="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Digite seu endereço de e-mail"
              className="w-full pl-8 pr-4 py-3 border-0 border-b border-gray-300 rounded-none bg-transparent focus:border-red-500 focus:ring-0 placeholder:text-gray-400 outline-none text-sm"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-3">
            Senha
          </label>
          <div className="relative">
            <Lock className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              className="w-full pl-8 pr-12 py-3 border-0 border-b border-gray-300 rounded-none bg-transparent focus:border-red-500 focus:ring-0 placeholder:text-gray-400 outline-none text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="remember"
              className="w-4 h-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
            />
            <label htmlFor="remember" className="text-sm text-gray-600">
              Lembre de mim
            </label>
          </div>
          <Link href="/forgot-password" className="text-sm text-gray-600 hover:text-red-500">
            Esqueceu sua senha?
          </Link>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          type="submit"
          className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-4 rounded-full text-lg font-medium transition-all duration-200 mt-8 cursor-pointer"
        >
          {
            loading ? 
            <span>
              Carregando...
              <Loader2Icon className="animate-spin" /> 
            </span>
            : 
            "Login"
          }
        </button>

        {/* Social Login */}
        <div className="text-center pt-4">
          <p className="text-gray-400 text-sm mb-6">or continue with</p>
          <div className="flex justify-center space-x-6">
            <button
              type="button"
              className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button
              type="button"
              className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </button>
            <button
              type="button"
              className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
