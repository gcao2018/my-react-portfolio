import { AppBar, Button, Toolbar } from '@mui/material';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router';

export default function Navbar(): ReactNode {
    const navigate = useNavigate();

    return <AppBar position='static'>
        <Toolbar variant='dense' disableGutters>
            <Button color='inherit' onClick={(): void => { navigate('/'); }}>Home</Button>
            <Button color='inherit' onClick={(): void => { navigate('/resume'); }}>Resume</Button>
            <Button color='inherit' onClick={(): void => { navigate('/dashboard')}}>Dashboard</Button>
            <Button color='inherit' onClick={(): void => { navigate('/login')}}>Login</Button>
        </Toolbar>
    </AppBar>;
};