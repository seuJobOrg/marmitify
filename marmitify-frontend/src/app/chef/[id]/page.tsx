"use client"

import { obterChefPorId } from "@/app/api/chef";
import ChefProfileComponent from "@/components/chef/profile/chef-page";
import { Header } from "@/components/layout/header-logged";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChefProfilePage() {
  const params = useParams();
  const chefId = parseInt(params.id?.toString() || "0");
  const [chef, setChef] = useState(null);
  useEffect(() => {
    if (chefId != 0) {
      obterChefPorId(chefId)
        .then((data) => {
          setChef(data);
        })
        .catch((error) => {
          console.error("Erro ao obter chef:", error);
        });
    }
  }, [chefId]);

  if (!chef) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="text-center">
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header/>
      <ChefProfileComponent chef={chef}/>
    </>
  );
}
