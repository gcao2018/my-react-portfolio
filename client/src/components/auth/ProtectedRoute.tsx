import { useContext, type ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router';
import { AuthContext, type AuthContextType } from './AuthContext';

export function ProtectedRoute(): ReactNode {
    const context: AuthContextType | null = useContext(AuthContext);

    if (context?.user) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" replace={true} />;
    }
};