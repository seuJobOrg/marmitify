"use client"

import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import Link from "next/link"
import { register } from "@/app/api/auth"
import { Loader2Icon } from "lucide-react"
import { toast } from "sonner"
import { signIn } from "next-auth/react"

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: ''
  });

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    
    const email = form.email
    const name = form.name
    const password = form.password

    try {
      const user = await register(email, name, password)
      if (user) {
        toast.success("Usuário registrado com sucesso!")
        signIn("credentials", {
          email: form.email,
          password: form.password,
          redirect: true,
          callbackUrl: "/dashboard",
        }).then((result) => {
          if (result?.error) {
            toast.error("Erro ao logar", {
              description: "Verifique suas credenciais e tente novamente.",
            })
          } else {
            toast.success("Logado com sucesso!")
          }
        })
      } else {
        toast.error("Erro ao registrar usuário", {
          description: "Verifique os dados e tente novamente.",
        })
      }
    } catch (error) {
      toast.error("Erro ao logar", {
        description: "Tente novamente mais tarde.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-[400px] mt-[100px] space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Registre-se</h1>
        <p className="text-gray-600 text-sm">
          Se você já possui uma conta <br />
          Você pode  {" "}
          <Link href="/login" className="text-red-500 font-medium cursor-pointer hover:underline">
            logar aqui!
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
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              id="email"
              type="email"
              placeholder="Enter your email address"
              className="w-full pl-8 pr-4 py-3 border-0 border-b border-gray-300 rounded-none bg-transparent focus:border-red-500 focus:ring-0 placeholder:text-gray-400 outline-none text-sm"
            />
          </div>
        </div>

        {/* Username Field */}
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-3">
            Primeiro Nome
          </label>
          <div className="relative">
            <User className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              id="username"
              type="text"
              placeholder="Enter your User name"
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
              id="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
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

        {/* Confirm Password Field */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-3">
            Confirme a senha
          </label>
          <div className="relative">
            <Lock className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="confirmPassword"
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your Password"
              className="w-full pl-8 pr-12 py-3 border-0 border-b border-gray-300 rounded-none bg-transparent focus:border-red-500 focus:ring-0 placeholder:text-gray-400 outline-none text-sm"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          disabled={loading}
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
            "Registrar"
          }
        </button>
      </form>
    </div>
  )
}
