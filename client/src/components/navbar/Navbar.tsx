import { AppBar, Button, Toolbar } from '@mui/material';
import { useContext, type ReactNode } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router';
import { AuthContext, type AuthContextType } from '../auth/AuthContext';

export default function Navbar(): ReactNode {
    const context: AuthContextType | null = useContext(AuthContext);
    const navigate: NavigateFunction = useNavigate();

    return <AppBar position='static'>
        <Toolbar variant='dense' disableGutters>
            <Button color='inherit' onClick={(): void => { navigate('/'); }}>Home</Button>
            <Button color='inherit' onClick={(): void => { navigate('/resume'); }}>Resume</Button>
            { context?.user ? <Button color='inherit' onClick={(): void => { navigate('/dashboard'); }}>Dashboard</Button> : undefined }
            { context?.user ? <Button color='inherit' onClick={(): void => { navigate('/profile'); }}>Profile</Button> : undefined }
            { context?.user
                ? <Button color='inherit' onClick={async (): Promise<void> => { 
                    localStorage.removeItem('token');
                    await context?.validateToken();
                }}>Logout</Button>
                : <Button color='inherit' onClick={(): void => { navigate('/login'); }}>Login</Button>
            }
        </Toolbar>
    </AppBar>;
};