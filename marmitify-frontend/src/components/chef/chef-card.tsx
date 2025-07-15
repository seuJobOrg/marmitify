import { Star, MapPinHouse } from "lucide-react"
import Link from "next/link";

interface ChefCardProps {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  description: string;
  address: string;
  phone: string;
  image?: string;
}

export function ChefCard({
  id,
  user,
  description,
  address,
  phone,
  image = "",
}: ChefCardProps) {
  // Default user image (avatar placeholder)
  const defaultImage =
    "https://ui-avatars.com/api/?name=" +
    encodeURIComponent(user.name) +
    "&background=cccccc&color=555555&size=256";

  return (
    <Link
      href={`/chef/${id}`}
      className="group flex items-center justify-center p-4 hover:bg-orange-50 transition-colors duration-300 cursor-pointer"
    >
      <div className="w-[600px] min-w-[600px] h-[250px] bg-white rounded-md shadow-md overflow-hidden grid grid-cols-[2fr_3fr_auto]">
        {/* Imagem */}
        <div className="h-full w-full">
          <img
            src={image || defaultImage}
            className="w-full h-full object-cover"
            alt={user.name}
          />
        </div>

        {/* Conteúdo */}
        <div className="p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">{user.name}</h3>

            <div className="flex gap-2 mt-1 flex-wrap">
              {[].map((tag, idx) => (
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
          <div className="flex items-center justify-between mt-4">

            <div className="flex items-center gap-2 text-gray-600">
              <MapPinHouse className="w-4 h-4" />
              <span>{address}</span>
            </div>

            <div className="text-gray-600">
              <span>{phone.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")}</span>
            </div>
          </div>
        </div>

        {/* Tarja lateral */}
        <div className="bg-orange-500 text-white text-[14px] font-semibold flex items-center justify-center px-2 writing-vertical rotate-180">
          Chef Profissional
        </div>
      </div>
    </Link>
  )
}