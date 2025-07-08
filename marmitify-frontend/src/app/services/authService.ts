import axios from './api';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
    };
}

export const authService = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await axios.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    register: async (userData: RegisterRequest): Promise<AuthResponse> => {
        const response = await axios.post<AuthResponse>('/auth/register', userData);
        return response.data;
    },

    logout: async (): Promise<void> => {
        await axios.post('/auth/logout');
    },

    refreshToken: async (): Promise<AuthResponse> => {
        const response = await axios.post<AuthResponse>('/auth/refresh');
        return response.data;
    },

    getProfile: async (): Promise<AuthResponse['user']> => {
        const response = await axios.get<AuthResponse['user']>('/auth/profile');
        return response.data;
    }
};