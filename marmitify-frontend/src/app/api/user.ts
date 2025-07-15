import api from "./api";

export const userIsChef = async (userId: number) => {
    try {
        const response = await api.get(`/users/${userId}/is-chef`);
        return response.data;
    } catch (error) {
        throw new Error("Erro ao verificar se o usuário é chef");
    }
}