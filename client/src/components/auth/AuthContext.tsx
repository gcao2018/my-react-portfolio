import { createContext, type Context } from "react";

export interface AuthContextType {
    tokenValidated: boolean;
    validateToken: () => Promise<void>;
}

export const AuthContext: Context<AuthContextType | null> = createContext<AuthContextType | null>(null);