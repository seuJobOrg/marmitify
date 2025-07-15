import { Calendar, Clock, User, MessageSquare } from "lucide-react";

interface AppointmentCardProps {
  id: string;
  chefName: string;
  appointmentDateTime: string;
  observations?: string;
  status?: string;
}

export function AppointmentCard({
  id,
  chefName,
  appointmentDateTime,
  observations,
  status = "scheduled",
}: AppointmentCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Get status text
  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case "scheduled":
        return "Agendado";
      case "completed":
        return "Concluído";
      case "cancelled":
        return "Cancelado";
      default:
        return "Desconhecido";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200">
      {/* Header with Chef name and status */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-orange-500" />
          <h3 className="text-lg font-semibold text-gray-800">{chefName}</h3>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            status
          )}`}
        >
          {getStatusText(status)}
        </span>
      </div>

      {/* Date and time */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4 text-orange-500" />
          <span className="text-sm">{formatDate(appointmentDateTime)}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="w-4 h-4 text-orange-500" />
          <span className="text-sm">{formatTime(appointmentDateTime)}</span>
        </div>
      </div>

      {/* Observations */}
      {observations && (
        <div className="border-t pt-3">
          <div className="flex items-start gap-2 text-gray-600">
            <MessageSquare className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-xs font-medium text-gray-500 block mb-1">
                Observações:
              </span>
              <p className="text-sm text-gray-700">{observations}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
