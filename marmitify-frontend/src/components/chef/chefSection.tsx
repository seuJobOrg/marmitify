"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ChefCard } from "@/components/chef/chefCard"

const chefs = Array.from({ length: 3 }, (_, i) => ({
  id: i,
  name: `Comida Mexicana ${i + 1}`,
  description: "Ex-cozinheiro do flamengo. Em dia de sopa, eu levava garfo para Adriano Imperador.",
  rating: 4.6,
  reviews: 155,
  tags: ["vegetariana", "italiana"],
  image: "https://images.unsplash.com/photo-1474600056930-615c3d706456?auto=format&fit=crop&w=800&q=60",
}))

export function ChefSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollButtons = () => {
    const el = scrollRef.current
    if (!el) return

    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 0)
    
    // Margem maior para evitar falsos negativos
    const hasMoreContent = scrollLeft + clientWidth < scrollWidth - 10
    setCanScrollRight(hasMoreContent)
  }

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" })
    }
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    updateScrollButtons()
    el.addEventListener("scroll", updateScrollButtons)

    return () => el.removeEventListener("scroll", updateScrollButtons)
  }, [])

  // Recalcula quando a lista de chefs mudar
  useEffect(() => {
    updateScrollButtons()
  }, [chefs])

  return (
    <section className="relative w-full my-6">
      <button
        onClick={() => scroll(-600)}
        disabled={!canScrollLeft}
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-2 rounded-full z-10 bg-white shadow-md transition-opacity ${
          canScrollLeft ? "opacity-100 cursor-pointer" : "opacity-30 cursor-not-allowed"
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 scrollbar-hide scroll-smooth"
      >
        {chefs.map((chef) => (
          <ChefCard key={chef.id} {...chef} />
        ))}
      </div>

      <button
        onClick={() => scroll(600)}
        disabled={!canScrollRight}
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 p-2 rounded-full z-10 bg-white shadow-md transition-opacity ${
          canScrollRight ? "opacity-100 cursor-pointer" : "opacity-30 cursor-not-allowed"
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </section>
  )
}