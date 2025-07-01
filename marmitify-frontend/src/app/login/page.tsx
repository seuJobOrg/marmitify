import Image from "next/image"
import Link from "next/link"
import { Eye, Mail, Lock } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Lado esquerdo: imagem + gradiente */}
      <div className="w-1/2 bg-gradient-to-br from-orange-50 to-pink-45 flex flex-col">
        {/* Header lado esquerdo */}
        <header className="h-[152px] flex items-center px-[100px] py-[36px]">
          <div className="w-[215px] h-[80px]">
            <Link href="/">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-7VasU2FTbmmq0pN21vohL8vSI4iOlB.png"
                alt="Marmitify Logo"
                width={215}
                height={80}
                className="w-full h-full object-contain"
              />
            </Link>
          </div>
        </header>

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
        {/* Header lado direito */}
        <header className="h-[152px] flex items-center justify-end px-[100px] py-[36px]">
          <div className="flex gap-4">
            <button className="text-orange-600 hover:text-orange-700 font-medium text-base">
              Criar Conta
            </button>
            <Link href="/login">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-base">
                Entrar
              </button>
            </Link>
          </div>
        </header>

        {/* Formulário */}
        <main className="flex-grow flex items-start justify-center">
          <div className="w-[431px] h-[498px] mt-[178px] border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h1>
            <p className="text-gray-600 mb-6">
              If you don't have an account register{" "}
              <span className="text-orange-500 font-medium cursor-pointer hover:underline">
                You can Register here!
              </span>
            </p>

             <form className="space-y-6">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-orange-500 focus:ring-0 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your Password"
                    className="w-full pl-10 pr-12 py-3 border-0 border-b-2 border-gray-200 rounded-none bg-transparent focus:border-orange-500 focus:ring-0 placeholder:text-gray-400"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <label htmlFor="remember" className="text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <button type="button" className="text-sm text-gray-600 hover:text-orange-500">
                  Forgot Password ?
                </button>
              </div>

              {/* Login Button */}
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full text-lg font-medium">
                Login
              </button>

              {/* Social Login */}
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-4">or continue with</p>
                <div className="flex justify-center space-x-4">
                  <button
                    type="button"
                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}

function SocialButton({ children, color, hover }: any) {
  return (
    <button
      type="button"
      className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${color} ${hover} transition-colors`}
    >
      {children}
    </button>
  )
}
