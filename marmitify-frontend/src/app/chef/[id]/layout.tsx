import { ReactNode } from "react"
import { Header } from "@/components/layout/header-logged"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  
  return (
    <>
      <main className="px-[100px]">{children}</main>
    </>
  )
}