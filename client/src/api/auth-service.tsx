import apiClient from "./api-client";

interface Jwt {
    data: {
        message: string;
        token: string;
    }
}

interface ValidationResponse {
    data: User
}

export interface User {
    id: number;
    username: string;
    email: string;
    watchlist?: string[];
}

export interface AuthService {
    login: (username: string, email: string, password: string) => Promise<string>;
    validate: () => Promise<User>;
    register: (username: string, email: string, password: string) => void;
}

export const authService: AuthService = {
    login: async function (username: string, email: string, password: string): Promise<string> {
        try {
            const response: Jwt = await apiClient.post('/api/auth/login', {
                username: username,
                email: email,
                password: password
            });
            return response.data.token;
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw e;
            } else {
                throw new Error('An unexpected error occurred', { cause: e });
            }
        }
    },

    validate: async function (): Promise<User> {
        try {
            const response: ValidationResponse = await apiClient.post('api/auth/verify');
            return response.data;
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw e;
            } else {
                throw new Error('An unexpected error occurred', { cause: e });
            }
        }
    },

    register: function (username: string, email: string, password: string): void {
        console.log('username:', username);
        console.log('email:', email);
        console.log('password:', password);
    }
}