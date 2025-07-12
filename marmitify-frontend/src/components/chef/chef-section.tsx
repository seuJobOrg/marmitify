"use client"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ChefCard } from "@/components/chef/chef-card"

export function ChefSection({
  chefs = []
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollButtons = () => {
    const el = scrollRef.current
    if (!el) return

    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 0)
    
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
          // @ts-ignore
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