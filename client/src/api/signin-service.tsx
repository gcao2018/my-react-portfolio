import apiClient from "./api-client";

interface Jwt {
    data: {
        message: string;
        token: string;
    }
}

export interface SigninService {
    login: (username: string, password: string) => Promise<string>;
    register: (username: string, password: string, email?: string) => void;
}

export const signinService: SigninService = {
    login: async function (username: string, password: string): Promise<string> {
        try {
            const response: Jwt = await apiClient.post('/api/login', { username: username, password: password });
            return response.data.token;
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw e;
            } else {
                throw new Error('An unexpected error occurred', { cause: e });
            }
        }
    },

    register: function (username: string, password: string, email?: string): void {
        console.log('username: ', username);
        console.log('password: ', password);
        console.log('email: ', email);
    }
}