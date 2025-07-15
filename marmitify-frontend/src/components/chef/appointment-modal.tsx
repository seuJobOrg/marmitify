"use client";

import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { criarAgendamento } from "@/app/api/chef";
import { useSession } from "next-auth/react";

interface Chef {
  id: number;
  user: {
    name: string;
  };
  phone: string;
  description: string;
  address: string;
}

interface AppointmentData {
  chefId: number;
  date: string;
  time: string;
  notes: string;
}

interface AppointmentModalProps {
  isOpen: boolean;
  chef: Chef | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export function AppointmentModal({
  isOpen,
  chef,
  onClose,
  onSuccess,
}: AppointmentModalProps) {
  const { data: session } = useSession();
  const [appointmentData, setAppointmentData] = useState<AppointmentData>({
    chefId: chef?.id || 0,
    date: "",
    time: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitAppointment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.id) {
      toast.error("Usuário não autenticado");
      return;
    }

    if (!appointmentData.date || !appointmentData.time) {
      toast.error("Por favor, preencha data e hora");
      return;
    }

    if (!chef) {
      toast.error("Chef não selecionado");
      return;
    }

    setSubmitting(true);

    try {
      const dateTime = `${appointmentData.date}T${appointmentData.time}:00-03:00`;

      await criarAgendamento(
        parseInt(session.user.id),
        chef.id,
        dateTime,
        appointmentData.notes
      );

      toast.success("Agendamento criado com sucesso!");

      // Reset form
      setAppointmentData({
        chefId: chef.id,
        date: "",
        time: "",
        notes: "",
      });

      onClose();
      onSuccess?.();
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
      toast.error("Erro ao criar agendamento");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      setAppointmentData({
        chefId: chef?.id || 0,
        date: "",
        time: "",
        notes: "",
      });
      onClose();
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen || !chef) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Agendar com {chef.user.name}
        </h2>

        <form onSubmit={handleSubmitAppointment} className="space-y-4">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Data
            </label>
            <input
              type="date"
              id="date"
              value={appointmentData.date}
              onChange={(e) =>
                setAppointmentData({
                  ...appointmentData,
                  date: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Hora
            </label>
            <input
              type="time"
              id="time"
              value={appointmentData.time}
              onChange={(e) =>
                setAppointmentData({
                  ...appointmentData,
                  time: e.target.value,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Observações
            </label>
            <textarea
              id="notes"
              value={appointmentData.notes}
              onChange={(e) =>
                setAppointmentData({
                  ...appointmentData,
                  notes: e.target.value,
                })
              }
              placeholder="Ex: Gostaria de um prato vegetariano com ingredientes frescos. Tenho alergia a amendoim."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 h-20 resize-none"
              disabled={submitting}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              disabled={submitting}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              disabled={submitting}
            >
              {submitting ? (
                <Loader2Icon className="animate-spin w-4 h-4" />
              ) : (
                "Confirmar Agendamento"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
