import Image from "next/image"
import { LoginForm } from "@/components/auth/login-form"
import { Header } from "@/components/layout/header"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Lado esquerdo: imagem + gradiente */}
      <div className="w-1/2 bg-gradient-to-br from-orange-50 to-pink-50 flex flex-col">
        {/* Header lado esquerdo - logo */}
        <Header variant="split-left" />

        {/* Imagem principal */}
        <div className="flex-grow flex items-start justify-center">
          <div className="w-[730px] h-[906px] mt-[-3px]">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NPMj7ejLi41vIqrceP6ieAh2SK9JKy.png"
              alt="Happy customer eating healthy food"
              width={730}
              height={906}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      {/* Lado direito: formulário + fundo branco */}
      <div className="w-1/2 bg-white flex flex-col">
        {/* Header lado direito - botões */}
        <Header variant="split-right" />

        {/* Formulário */}
        <main className="flex-grow flex items-start justify-center">
          <LoginForm />
        </main>
      </div>
    </div>
  )
}
