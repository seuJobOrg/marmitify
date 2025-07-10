"use client";

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session } = useSession();
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row items-center justify-between w-full max-w-[1440px] px-[100px] py-6 mx-auto gap-8">
        <div className="flex-1 max-w-2xl text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
            Diga <span className="text-orange-500">adeus</span> à cozinha.{" "}
            <span className="block">conheça quem cozinha</span> <span className="text-orange-500">pra você!</span>
          </h1>

          <div className="flex flex-col gap-3 mt-6 max-w-xs mx-auto lg:mx-0">
            <Link href="/register?type=client">
              <button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold border border-orange-500 w-full">
                Sou cliente
              </button>
            </Link>
            <Link href="/register?type=chef">
              <button className="text-orange-500 cursor-pointer hover:bg-orange-100 px-8 py-3 rounded-full text-lg font-semibold border border-orange-500 bg-transparent w-full">
                Sou chef
              </button>
            </Link>
            <button 
              onClick={() => console.log(session)}
            className="text-orange-500 cursor-pointer hover:bg-orange-100 px-8 py-3 rounded-full text-lg font-semibold border border-orange-500 bg-transparent w-full">
                Sou chef
              </button>
          </div>
        </div>

        {/* Food Image */}
        <div className="hidden lg:block flex-1 max-w-xl">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/comida1-f5Fxwlop9RKJ2rFOIRQnr9zaRc55ya.png"
            alt="Bandeja de comida indiana"
            width={600}
            height={600}
            className="w-full h-auto"
          />
        </div>
      </main>

      {/* Mobile Food Image */}
      <div className="lg:hidden px-6 pb-12">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/comida1-f5Fxwlop9RKJ2rFOIRQnr9zaRc55ya.png"
          alt="Bandeja de comida indiana"
          width={400}
          height={400}
          className="w-full max-w-md mx-auto h-auto"
        />
      </div>
    </div>
  )
}
