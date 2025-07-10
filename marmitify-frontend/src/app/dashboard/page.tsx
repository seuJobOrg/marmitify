"use client"

import { useState } from "react"
import { ChevronDown, Loader2Icon } from "lucide-react"
import { MealTabs } from "@/components/card/mealTabs"
import { ChefSection } from "@/components/chef/chefSection"
import { useSession } from "next-auth/react"

export default function DashboardPage() {
  const { data: session } = useSession();
  
  const [address] = useState("Rua da Baixada, 161")

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="text-center">
          <Loader2Icon/>
        </div>
      </div>
    )
  } else {
    return (
      <div className="max-w-7xl mx-auto pt-10">
        {/* Cabeçalho: saudação + endereço */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-zinc-900">
            Olá, <span className="font-bold">{ (session?.user?.name) ? session.user.name : '' }</span>
          </h2>
  
          <div className="flex items-center gap-1 mt-1">
            <span className="text-zinc-700 text-base">{address}</span>
            <ChevronDown className="w-4 h-4 text-orange-600 cursor-pointer" />
          </div>
        </section>
  
        {/* Componente com abas e cards */}
        <MealTabs />
  
        <h3 className="text-2xl mt-6 font-semibold text-zinc-900">
            Chefes especiais
        </h3>
  
        <ChefSection />
      </div>
    )
  }

}
