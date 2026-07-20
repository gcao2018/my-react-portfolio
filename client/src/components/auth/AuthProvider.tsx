import { useState, useEffect, useCallback, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import { authService, type User } from '../../api/auth-service';
import { AuthContext } from './AuthContext';

interface AuthProviderProperties {
  children: ReactNode;
}

export default function AuthProvider(props: AuthProviderProperties): ReactNode {
  const [user, setUser]: [User | undefined, Dispatch<SetStateAction<User | undefined>>] = useState<User | undefined>(undefined);
  const [error, setError]: [string | undefined, Dispatch<SetStateAction<string | undefined>>] = useState<string | undefined>(undefined);

  const validateToken: () => Promise<void> = useCallback(async (): Promise<void> => {
    try {
      const user: User = await authService.validate();
      setUser(user);
    } catch (e: unknown) {
      setError((e as Error).message);
      setUser(undefined);
    }
  }, []);

  useEffect((): void => {
    const setData: () => Promise<void> = async (): Promise<void> => {
      validateToken();
    }
    setData();
  }, [validateToken]);

  return <AuthContext.Provider value={{user, error, validateToken}}>
    {props.children}
  </AuthContext.Provider>
};