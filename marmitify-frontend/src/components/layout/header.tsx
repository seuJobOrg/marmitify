"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image"
import Link from "next/link"

interface HeaderProps {
  variant?: "default" | "split-left" | "split-right"
  className?: string
}

export function Header({ variant = "default", className = "" }: HeaderProps) {
  const { data: session } = useSession();

  if (variant === "split-left") {
    return (
      <div className={`h-[152px] flex items-center px-[100px] py-[36px] ${className}`}>
        <div className="flex flex-col w-[215px] h-[80px] gap-2">
          <Link href="/">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-7VasU2FTbmmq0pN21vohL8vSI4iOlB.png"
              alt="Marmitify Logo"
              width={215}
              height={80}
              className="w-[215px] h-[80px] object-contain cursor-pointer"
            />
          </Link>
        </div>
      </div>
    )
  }

  if (variant === "split-right") {
    return (
      <div className={`h-[152px] flex items-center justify-end px-[100px] py-[36px] ${className}`}>
        <div className="flex flex-row items-center w-[248px] h-[50px] gap-4">
          <Link href="/register">
            <button className="text-orange-600 cursor-pointer hover:text-orange-700 font-medium text-base">
              Criar Conta
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-base cursor-pointer">
              Entrar
            </button>
          </Link>
        </div>
      </div>
    )
  }

  // Default header - usando a estrutura exata que você especificou
  return (
    <header
      className={`flex items-center justify-between w-full max-w-[1440px] h-[152px] px-[100px] py-[36px] rounded-b-[24px] mx-auto ${className}`}
    >
      {/* Logo */}
      <div className="flex flex-col w-[215px] h-[80px] gap-2">
        <Link href="/">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-7VasU2FTbmmq0pN21vohL8vSI4iOlB.png"
            alt="Marmitify Logo"
            width={215}
            height={80}
            className="w-[215px] h-[80px] object-contain cursor-pointer"
          />
        </Link>
      </div>

      {/* Botões */}
      <div className="flex flex-row items-center w-[248px] h-[50px] gap-4">
        {
          (!session) ? 
          <div className="flex items-center justify-between w-50">
            <Link href="/register">
              <button className="text-orange-600 cursor-pointer hover:text-orange-700 font-medium text-base">
                Criar Conta
              </button>
            </Link>
            <Link href="/login">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-base cursor-pointer">
                Entrar
              </button>
            </Link>
          </div>
          :
          <div className="flex items-center justify-between w-40 ">
            <Link href="/profile">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-base cursor-pointer">
                Meu Perfil
              </button>
            </Link>
            <button
              onClick={() => signOut()}
              className="text-red-600 cursor-pointer hover:text-red-700 font-medium text-base"
            >
              Sair
            </button>
          </div>
        }
      </div>
    </header>
  )
}
