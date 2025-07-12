"use client"

import { useState } from "react"
import { Phone, MapPinHouse, BookOpen } from "lucide-react"
import { Loader2Icon } from "lucide-react"
import { registrarChef } from "@/app/api/chef"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

export function RegisterForm() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    description: '',
    address: '',
    phone: ''
  });

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    const description = form.description
    const address = form.address
    const phone = form.phone

    try {
      await registrarChef(description, address, phone, session?.user?.email || "")
      toast.success("Chef registrado com sucesso!")
      window.location.href = "/chef"
    } catch (error) {
      toast.error("Erro ao registrar chef", {
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
          Torne-se um chef e comece a vender suas refeições hoje mesmo!
        </p>
      </div>
      <form className="space-y-6">
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-3">
            Descreva sua especialidade
          </label>
          <div className="relative">
            <BookOpen className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <textarea
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              id="description"
              placeholder="Quais são suas especialidades? Quais pratos você oferece? Como gosta de cozinhar?"
              className="w-full pl-8 pr-4 py-3 border-0 border-b border-gray-300 rounded-none bg-transparent focus:border-red-500 focus:ring-0 placeholder:text-gray-400 outline-none text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-3">
            phone
          </label>
          <div className="relative">
            <Phone className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              id="phone"
              type="tel"
              placeholder="Digite seu phone"
              className="w-full pl-8 pr-4 py-3 border-0 border-b border-gray-300 rounded-none bg-transparent focus:border-red-500 focus:ring-0 placeholder:text-gray-400 outline-none text-sm"
            />
          </div>
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-3">
            Endereço
          </label>
          <div className="relative">
            <MapPinHouse className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="address"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              type="text"
              placeholder="Digite seu endereço"
              className="w-full pl-8 pr-4 py-3 border-0 border-b border-gray-300 rounded-none bg-transparent focus:border-red-500 focus:ring-0 placeholder:text-gray-400 outline-none text-sm"
            />
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
            <div className="flex items-center justify-center space-x-5">
              Carregando...
              <span>
                <Loader2Icon className="animate-spin" /> 
              </span>
            </div>
            : 
            "Registrar"
          }
        </button>
      </form>
    </div>
  )
}
