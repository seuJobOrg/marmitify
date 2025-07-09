interface MealCardProps {
  title: string
  chef: string
  calories: number
  rating: number
  image: string
}

export function MealCard({ title, chef, calories, rating, image }: MealCardProps) {
  return (
    <div className="min-w-[260px] bg-white rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-full h-[160px] object-cover" />
      <div className="p-4">
        <p className="text-lg font-semibold mb-1">{title}</p>
        <p className="text-sm text-gray-600">{chef}</p>
        <div className="flex justify-between text-sm mt-2 text-yellow-600 font-medium">
          <span>⭐ {rating}</span>
          <span className="bg-blue-100 text-blue-700 rounded-full px-2 text-xs">
            {calories} kcal
          </span>
        </div>
      </div>
    </div>
  )
}