import { Star, BriefcaseBusiness } from "lucide-react"

interface ChefCardProps {
  name: string
  description: string
  rating: number
  reviews: number
  tags: string[]
  image: string
}

export function ChefCard({
  name,
  description,
  rating,
  reviews,
  tags,
  image,
}: ChefCardProps) {
  return (
    <div className="w-[600px] min-w-[600px] h-[250px] bg-white rounded-md shadow-md overflow-hidden grid grid-cols-[2fr_3fr_auto]">
      {/* Imagem */}
      <div className="h-full w-full">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Conteúdo */}
      <div className="p-5 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>

          <div className="flex gap-2 mt-1 flex-wrap">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className={`text-[10px] text-white px-2 py-[2px] rounded-full uppercase ${
                  idx % 2 === 0 ? "bg-orange-500" : "bg-gray-500"
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>

          <p className="text-sm mt-2 text-gray-700">{description}</p>
        </div>

        <div className="flex gap-4 text-sm font-medium mt-2">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star /> {rating}
          </div>
          <div className="flex items-center gap-1 text-pink-600">
            <BriefcaseBusiness className="text-black" /> <span className="text-black">{reviews} Avaliações</span>
          </div>
        </div>
      </div>

      {/* Tarja lateral */}
      <div className="bg-orange-500 text-white text-[14px] font-semibold flex items-center justify-center px-2 writing-vertical rotate-180">
        Chef Profissional
      </div>
    </div>
  )
}