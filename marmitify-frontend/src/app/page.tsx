import Image from 'next/image';
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      {/* Header */}
  <header className="flex items-center justify-between w-full max-w-[1440px] h-[152px] px-[100px] py-[36px] rounded-b-[24px] mx-auto">
    {/* Logo */}
    <div className="flex flex-col w-[215px] h-[80px] gap-2">
      <Link href="/">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-7VasU2FTbmmq0pN21vohL8vSI4iOlB.png"
          alt="Marmitify Logo"
          width={215}
          height={80}
          className="w-[215px] h-[80px] object-contain"
        />
      </Link>
    </div>

    {/* Botões */}
    <div className="flex flex-row items-center w-[248px] h-[50px] gap-4">
      <button className="text-orange-600 cursor-pointer hover:text-orange-700 font-medium text-base  ">
        Criar Conta
      </button>
      <Link href="/login">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-base">
          Entrar
        </button>
      </Link>
    </div>
  </header>



      {/* Main Content */}
      <main className="flex flex-col lg:flex-row items-center justify-between px-6 py-6 md:px-12 lg:px-45 gap-8">
        <div className="flex-1 max-w-2xl text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
            Diga <span className="text-orange-500">adeus</span> à cozinha.{' '}
            <span className="block">conheça quem cozinha</span>{' '}
            <span className="text-orange-500">pra você!</span>
          </h1>

          <div className="flex flex-col gap-3 mt-6 max-w-xs mx-auto lg:mx-0">
            <button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold border border-orange-500">
              Sou cliente
            </button>
            <button className="text-orange-500 cursor-pointer hover:bg-orange-100 px-8 py-3 rounded-full text-lg font-semibold border border-orange-500 bg-transparent">
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
  );
}
