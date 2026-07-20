import { createContext, type Context } from "react";
import type { User } from "../../api/auth-service";

export interface AuthContextType {
    user: User | undefined;
    error: string | undefined;
    validateToken: () => Promise<void>;
}

export const AuthContext: Context<AuthContextType | null> = createContext<AuthContextType | null>(null);