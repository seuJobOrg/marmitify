import Image from 'next/image';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 md:px-25">
        <div className="flex items-center">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-7VasU2FTbmmq0pN21vohL8vSI4iOlB.png"
            alt="Marmitify Logo"
            width={180}
            height={50}
            className="h-12 w-auto md:h-13"
          />
        </div>
        <div className="flex items-center gap-4">
          <button className="text-orange-600 cursor-pointer hover:text-orange-700 font-medium ">
            Criar Conta
          </button>
          <button className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-6 py-2 rounded-full ">
            Entrar
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-between px-6 py-0 md:px-12 lg:px-24 min-h-[calc(100vh-80px)]">
        <div className="flex-1 max-w-2xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-8">
            Diga <span className="text-orange-500">adeus</span> à cozinha.{' '}
            <span className="block">conheça quem cozinha</span>{' '}
            <span className="text-orange-500">pra você!</span>
          </h1>

          <div className="flex flex-col gap-4 mt-8 max-w-max">
            <button className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-6 py-2 rounded-full text-base font-medium border border-orange-500">
              Sou cliente
            </button>
            <button className="text-orange-500 cursor-pointer hover:bg-orange-200 px-15 py-2 rounded-full text-base font-medium border border-orange-500 bg-transparent">
              Sou chef
            </button>
          </div>
        </div>

        {/* Food Image */}
        <div className="hidden lg:block flex-1 max-w-lg">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/comida1-f5Fxwlop9RKJ2rFOIRQnr9zaRc55ya.png"
            alt="Bandeja de comida indiana"
            width={500}
            height={500}
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
