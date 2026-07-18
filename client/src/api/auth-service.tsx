import apiClient from "./api-client";

interface Jwt {
    data: {
        message: string;
        token: string;
    }
}

export interface AuthService {
    login: (username: string, password: string) => Promise<string>;
    validate: () => Promise<boolean>;
    register: (username: string, password: string, email?: string) => void;
}

export const authService: AuthService = {
    login: async function (username: string, password: string): Promise<string> {
        try {
            const response: Jwt = await apiClient.post('/api/auth/login', { username: username, password: password });
            return response.data.token;
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw e;
            } else {
                throw new Error('An unexpected error occurred', { cause: e });
            }
        }
    },

    validate: async function (): Promise<boolean> {
        try {
            const response = await apiClient.post('api/auth/verify');
            return response.status === 200;
        } catch {
            return false;
        }
    },

    register: function (username: string, password: string, email?: string): void {
        console.log('username: ', username);
        console.log('password: ', password);
        console.log('email: ', email);
    }
}