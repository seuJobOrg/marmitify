import Image from "next/image";
import "tailwindcss"; 

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-3xl text-center">
        <Image
          src="/images/logo.png"
          alt="Marmitify Logo"
          width={400}
          height={400}
          className="mb-4"
        />
      </h1>
    </div>
  )
}