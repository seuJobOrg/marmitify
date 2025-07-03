import type { ReactNode } from "react"

interface PageLayoutProps {
  children: ReactNode
  className?: string
}

export function PageLayout({ children, className = "" }: PageLayoutProps) {
  return <div className={`min-h-screen bg-gradient-to-br from-orange-50 to-pink-50 ${className}`}>{children}</div>
}
