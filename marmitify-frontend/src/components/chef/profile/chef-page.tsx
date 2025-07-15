"use client"

import { useEffect, useState } from "react";
import { CalendarDays, Star } from "lucide-react";
import { Header } from "@/components/layout/header-logged";
import { BreadcrumbComponent } from "@/components/layout/breadcrumb";
import { getSession, useSession } from "next-auth/react";
import { userIsChef } from "@/app/api/user";

export default function ChefProfileComponent({chef}: { chef?: any }) {
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    if (!session) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
          <div className="text-center">
            <p className="text-gray-600">Carregando...</p>
          </div>
        </div>
      );
    }
  
    return (
      <>
        <main className="px-[100px]">
          <section className="max-w-7xl mx-auto pt-10">
            <BreadcrumbComponent
                        items={
                          [
                            { label: "Dashboard", to: "dashboard" },
                            { label: "Perfil do Chef", to: "profile" },
                          ]
                        }/>
            {/* Header com imagem e nome */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 relative rounded-2xl overflow-hidden shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1474600056930-615c3d706456?auto=format&fit=crop&w=800&q=60"
                  alt="Chef Javier"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-4 left-4 bg-green-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  Chef Profissional
                </span>
              </div>
  
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h1 className="text-3xl font-bold">{ chef.user.name }</h1>
                  <p className="text-gray-600 text-sm mb-2">
                    { chef.address}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    {/* <Star className="text-yellow-500 w-5 h-5" /> */}
                    {/* <span className="font-semibold text-lg">4.5</span> */}
                    {/* <span className="text-sm text-gray-500">
                      (482 avaliações)
                    </span> */}
                  </div>
  
                  {/* <div className="flex gap-2 flex-wrap mt-2">
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                      #Vegetariana
                    </span>
                    <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
                      #Italiana
                    </span>
                  </div> */}
  
                  <p className="mt-4 text-gray-700 leading-relaxed">
                    { chef.description || "Descrição não informada" }
                  </p>
                </div>
  
                <button className="mt-6 inline-flex items-center bg-orange-500 text-white px-4 py-2 rounded-full shadow hover:bg-orange-600 transition w-fit">
                  <CalendarDays className="mr-2 w-5 h-5" />
                  Agendar com o chef
                </button>
              </div>
            </div>
  
            {/* Seção de pratos */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold mb-4">Pratos principais</h2>
  
              <div className="grid md:grid-cols-3 gap-6">
                <h1>Em breve...</h1>
                {/* {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition"
                  >
                    <img
                      src="https://cdn.deliway.com.br/blog/base/045/cf8/3ab/chili-com-carne.jpg"
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">
                        Quesadilla Gourmet
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Ingredientes: 10 · Tempo: 40 min
                      </p>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-orange-600 font-semibold hover:underline text-sm"
                      >
                        Ver detalhes
                      </button>
                    </div>
                  </div>
                ))} */}
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }