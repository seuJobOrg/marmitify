import api from "./api";

export async function registrarChef(
  description: string,
  address: string,
  phone: string,
  email: string
) {
  try {
    const response = await api.post("/chefs", {
      description,
      address,
      phone,
      email,
    });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao registrar chef");
  }
}

export async function obterChefs() {
  try {
    const response = await api.get("/chefs");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao obter chefs");
  }
}

export async function obterChefPorId(id: number) {
  try {
    const response = await api.get(`/chefs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao obter chef");
  }
}

export async function atualizarChef(
  id: number,
  description: string,
  endereco: string,
  telefone: string
) {
  try {
    const response = await api.put(`/chefs/${id}`, {
      description,
      endereco,
      telefone,
    });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao atualizar chef");
  }
}

export async function excluirChef(id: number) {
  try {
    const response = await api.delete(`/chefs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao excluir chef");
  }
}

export async function criarAgendamento(
  userId: number,
  chefId: number,
  dateTime: string,
  notes: string
) {
  try {
    const response = await api.post("/appointments", {
      userId,
      chefId,
      dateTime,
      notes,
    });
    return response.data;
  } catch (error) {
    throw new Error("Erro ao criar agendamento");
  }
}
