"use client";

import { Header } from "@/components/layout/header-logged";
import React, { useEffect, useInsertionEffect } from "react";
import { ChevronDown, Loader2Icon } from "lucide-react";
import { useSession } from "next-auth/react";

const chefProfile = {
  name: "Chef Caio",
  description: "Erro ao carregar descrição. Tente novamente mais tarde.",
  imageUrl: "https://placehold.co/600x400",
};

export default function ChefProfilePage() {
  const { data: session } = useSession();
  const chefName = session?.user?.name ? session.user.name : "";

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="text-center">
          <Loader2Icon />
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-xl mx-8 mt-10 p-6 bg-white rounded-lg shadow">
          <div className="flex items-start gap-6">
            <img
              src={chefProfile.imageUrl || "https://placehold.co/600x400"}
              alt={chefProfile.name}
              className="w-24 h-24 rounded-full object-cover border"
            />
            <div>
              <h1 className="text-2xl font-bold">{chefName}</h1>
              <p className="text-gray-600">{chefProfile.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
