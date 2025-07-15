"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { AppointmentCard } from "@/components/card/appointmentCard";
import { PageLayout } from "@/components/layout/page-layout";
import api from "@/app/api/api";
import { CalendarDays, Loader2 } from "lucide-react";
import { Header } from "@/components/layout/header-logged";
import Link from "next/link";
import { BreadcrumbComponent } from "@/components/layout/breadcrumb";

interface Appointment {
  id: string;
  active: boolean;
  status?: string;
  dateTime: string;
  notes?: string;
  chef: {
    id: number;
    user: {
      name: string;
      email: string;
    };
    phone: string;
  };
}

export default function AppointmentsPage() {
  const { data: session, status } = useSession();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (status === "loading") return;

      if (!session?.user?.id) {
        setError("Usuário não encontrado na sessão");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const response = await api.get(`/appointments/user/${session.user.id}`);
        setAppointments(response.data);
      } catch (err: any) {
        setError(err.message || "Erro ao carregar agendamentos");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [session, status]);

  // Loading state
  if (status === "loading" || loading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-orange-500" />
              <p className="text-gray-600">Carregando agendamentos...</p>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  // Not authenticated
  if (status === "unauthenticated") {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Acesso Negado
            </h1>
            <p className="text-gray-600">
              Você precisa estar logado para ver seus agendamentos.
            </p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex flex-col">
            <BreadcrumbComponent
              items={[
                { to: "dashboard", label: "Dashboard" },
                { to: "appointments", label: "Meus Agendamentos" },
              ]}/>
            <div className="flex items-center gap-3 mb-2">
              <CalendarDays className="w-8 h-8 text-orange-500" />
              <h1 className="text-3xl font-bold text-gray-800">
                Meus Agendamentos
              </h1>
            </div>
            <p className="text-gray-600">
              Acompanhe todos os seus agendamentos com chefs
            </p>
          </div>
          <Link href="/dashboard">
            <button className="bg-orange-500 hover:bg-orange-600 cursor-pointer text-white px-8 py-3 rounded-full text-lg font-semibold border border-orange-500 w-full">
              Voltar
            </button>
          </Link>
        </div>

        {/* Error state */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Appointments list */}
        {!error && (
          <div className="space-y-4">
            {appointments.length === 0 ? (
              <div className="text-center py-12">
                <CalendarDays className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Nenhum agendamento encontrado
                </h3>
                <p className="text-gray-500">
                  Você ainda não possui agendamentos. Que tal explorar nossos
                  chefs?
                </p>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">
                    {appointments.length} agendamento
                    {appointments.length !== 1 ? "s" : ""} encontrado
                    {appointments.length !== 1 ? "s" : ""}
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {appointments.map((appointment) => (
                    <AppointmentCard
                      key={appointment.id}
                      id={appointment.id}
                      chefName={appointment.chef.user.name}
                      appointmentDateTime={appointment.dateTime}
                      observations={appointment.notes}
                      status={appointment.status}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
