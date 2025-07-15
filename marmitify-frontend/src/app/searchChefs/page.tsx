"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Loader2Icon } from "lucide-react";
import { obterChefs } from "../api/chef";
import { toast } from "sonner";
import { AppointmentModal } from "@/components/chef/appointment-modal";

interface Chef {
  id: number;
  user: {
    name: string;
  };
  phone: string;
  description: string;
  address: string;
}

export default function SearchChefsPage() {
  const { data: session } = useSession();
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedChef, setSelectedChef] = useState<Chef | null>(null);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const data = await obterChefs();
        setChefs(data);
      } catch (error) {
        console.error("Erro ao obter chefs:", error);
        toast.error("Erro ao carregar chefs");
      } finally {
        setLoading(false);
      }
    };
    fetchChefs();
  }, []);

  const handleScheduleClick = (chef: Chef) => {
    setSelectedChef(chef);
    setShowModal(true);
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
        <div className="text-center">
          <Loader2Icon className="animate-spin" />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pt-10 px-4">
      <h1 className="text-3xl font-bold text-zinc-900 mb-8">Buscar Chefs</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nome
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Telefone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descrição
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Endereço
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {chefs.map((chef) => (
              <tr key={chef.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {chef.user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {chef.phone}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {chef.description}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {chef.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleScheduleClick(chef)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Agendar agora
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Agendamento */}
      <AppointmentModal
        isOpen={showModal}
        chef={selectedChef}
        onClose={() => {
          setShowModal(false);
          setSelectedChef(null);
        }}
        onSuccess={() => {
          // Opcional: recarregar lista de chefs ou outras ações após sucesso
        }}
      />
    </div>
  );
}
