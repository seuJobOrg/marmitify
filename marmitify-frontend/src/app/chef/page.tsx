import { Header } from "@/components/layout/header-logged";
import React from "react";

const chefProfile = {
    name: "Chef Caio",
    avatar: "/images/chef-avatar.png", // substitua pelo caminho real da imagem
    bio: "Apaixonado por gastronomia, especializado em culinária brasileira e internacional.",
    specialties: ["Culinária Brasileira", "Massas", "Doces"],
    rating: 4.8,
    reviews: 120,
};

export default function ChefProfilePage() {
    return (
        <div className="min-h-screen">
            <Header />
            <div className="max-w-xl mx-8 mt-10 p-6 bg-white rounded-lg shadow">
                <div className="flex items-start gap-6">
                    <img
                        src={chefProfile.avatar}
                        alt={chefProfile.name}
                        className="w-24 h-24 rounded-full object-cover border"
                    />
                    <div>
                        <h1 className="text-2xl font-bold">{chefProfile.name}</h1>
                        <p className="text-gray-600">{chefProfile.bio}</p>
                        <div className="mt-2 flex items-center gap-2">
                            <span className="text-yellow-500 font-semibold">
                                ★ {chefProfile.rating}
                            </span>
                            <span className="text-gray-500">({chefProfile.reviews} avaliações)</span>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <h2 className="text-lg font-semibold mb-2">Especialidades</h2>
                    <ul className="list-disc list-inside text-gray-700">
                        {chefProfile.specialties.map((spec) => (
                            <li key={spec}>{spec}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="max-w-md mx-8 mt-10 p-6 bg-white rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Seus Agendamentos</h2>
                <ul className="space-y-4">
                    <li className="border-b pb-2">
                        <span className="font-medium">12/06/2024</span> - Almoço para 4 pessoas
                    </li>
                    <li className="border-b pb-2">
                        <span className="font-medium">15/06/2024</span> - Jantar especial
                    </li>
                    <li>
                        <span className="font-medium">20/06/2024</span> - Evento corporativo
                    </li>
                </ul>
            </div>
        </div>

    );
}