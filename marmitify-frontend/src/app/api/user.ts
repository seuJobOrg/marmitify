import api from "./api";

export const buscaUser = async (userId: number, token = "") => {
    try {
        const response = await api.get(`/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export const atualizaUser = async (userId: number, data: any) => {
    try {
        const response = await api.put(`/users/${userId}`, data);
        return response.data;
    } catch (error) {
        throw new Error("Erro ao atualizar usuário");
    }
}

export const userIsChef = async (userId: number, token: string = "") => {
    try {
        const response = await api.get(`/users/${userId}/is-chef`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error("Erro ao verificar se o usuário é chef");
    }
}