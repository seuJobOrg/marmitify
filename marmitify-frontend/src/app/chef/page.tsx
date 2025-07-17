"use client";

import { Header } from "@/components/layout/header-logged";
import React, { useEffect, useInsertionEffect } from "react";
import { ChevronDown, Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { userIsChef } from "../api/user";
import { BreadcrumbComponent } from "@/components/layout/breadcrumb";

const chefProfile = {
  name: "Chef Caio",
  description: "Erro ao carregar descrição. Tente novamente mais tarde.",
  imageUrl: null,
};



export default function ChefProfilePage() {
  const { data: session } = useSession();
  const [chef, setChefProfile] = React.useState(null);
  const chefName = session?.user?.name ? session.user.name : "";

  if (!session) {
    
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="text-center">
          <Loader2Icon />
        </div>
      </div>
    );
  } else {
    const defaultImage =
    "https://ui-avatars.com/api/?name=" +
    encodeURIComponent(session.user.name) +
    "&background=cccccc&color=555555&size=256";

    return (
      <section className="max-w-7xl mx-auto pt-10">
        <BreadcrumbComponent 
                    items={[
                      { to: "dashboard", label: "Dashboard" },
                      { to: "chef", label: "Seu Perfil de Chef" }
                    ]}
                  />
        <div className="max-w-xl mx-10 mt-10 p-6 bg-white rounded-lg shadow">
          <div className="flex items-start gap-6">
            <img
              src={chefProfile.imageUrl || defaultImage}
              alt={chefProfile.name}
              className="w-24 h-24 rounded-full object-cover border"
            />
            <div>
              <h1 className="text-2xl font-bold">{chefName}</h1>
              <form className="mt-4 space-y-4">
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Descrição
                  </label>
                  <textarea
                    id="description"
                    rows={3}
                    defaultValue={session.user.chef?.description || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Descreva sua experiência culinária..."
                  />
                </div>
                
                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                    URL da Imagem
                  </label>
                  <input
                    type="url"
                    id="imageUrl"
                    defaultValue={session.user.chef?.imageUrl || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    Salvar
                  </button>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
