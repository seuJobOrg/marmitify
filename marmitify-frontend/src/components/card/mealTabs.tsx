"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MealCard } from "@/components/card/mealCard";

const categories = ["Saudável", "Gourmet"];

const meals = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: `Salada Italiana ${i + 1}`,
  chef: "Chef Pedro",
  calories: 553,
  rating: 4.6,
  image:
    "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=60",
}));

export function MealTabs() {
  const [activeTab, setActiveTab] = useState("Saudável");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);

    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, []);

  return (
    <section className="w-full">
      {/* Tabs */}
      <div className="flex gap-6 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`font-medium text-lg ${
              activeTab === cat
                ? "text-red-600 border-b-2 border-red-600"
                : "text-gray-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Carousel com botões sobrepostos nos lados */}
      <div className="relative w-full">
        {/* Botão Esquerdo */}
        <button
          onClick={() => scroll(-300)}
          disabled={!canScrollLeft}
          className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-2 rounded-full z-10 bg-white shadow-md transition-opacity ${
            canScrollLeft ? "opacity-100 cursor-pointer" : "opacity-30 cursor-not-allowed"
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Lista de Cards */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 scrollbar-hide scroll-smooth"
        >
          {meals.map((meal) => (
            <MealCard
              key={meal.id}
              title={meal.title}
              chef={meal.chef}
              calories={meal.calories}
              rating={meal.rating}
              image={meal.image}
            />
          ))}
        </div>

        {/* Botão Direito */}
        <button
          onClick={() => scroll(300)}
          disabled={!canScrollRight}
          className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 p-2 rounded-full z-10 bg-white shadow-md transition-opacity ${
            canScrollRight ? "opacity-100 cursor-pointer" : "opacity-30 cursor-not-allowed"
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
}
