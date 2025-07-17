import { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  
  return (
    <>
      <main className="px-[100px]">{children}</main>
    </>
  )
}