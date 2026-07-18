import { useState, useEffect, useCallback, type ReactNode, type Dispatch, type SetStateAction } from 'react';
import { authService } from '../../api/auth-service';
import { AuthContext } from './AuthContext';

interface AuthProviderProperties {
  children: ReactNode;
}

export default function AuthProvider(props: AuthProviderProperties): ReactNode {
  const [tokenValidated, setTokenValidated]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);

  const validateToken: () => Promise<void> = useCallback(async (): Promise<void> => {
    try {
      const validated: boolean = await authService.validate();
      setTokenValidated(validated);
    } catch {
      setTokenValidated(false);
    }
  }, []);

  useEffect((): void => {
    const setData: () => Promise<void> = async (): Promise<void> => {
      validateToken();
    }
    setData();
  }, [validateToken]);

  return <AuthContext.Provider value={{tokenValidated, validateToken}}>
    {props.children}
  </AuthContext.Provider>
};