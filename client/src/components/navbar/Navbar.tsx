import { AppBar, Button, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router';

export default function Navbar() {
    const navigate = useNavigate();

    return <AppBar position='static'>
        <Toolbar variant='dense' disableGutters>
            <Button color='inherit' onClick={(): void => { navigate('/'); }}>Home</Button>
            <Button color='inherit' onClick={(): void => { navigate('/resume'); }}>Resume</Button>
            <Button color='inherit'>Login</Button>
        </Toolbar>
    </AppBar>;
};