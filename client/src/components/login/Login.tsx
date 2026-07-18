import { Box, Button, Card, CardContent, CardHeader, FormGroup, TextField, Typography } from '@mui/material';
import { useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import type { AuthService } from '../../api/auth-service';
import { useNavigate, type NavigateFunction } from 'react-router';
import { AuthContext, type AuthContextType } from '../auth/AuthContext';

interface LoginProperties {
    authService: AuthService
}

export default function Login(props: LoginProperties): ReactNode {
    const [username, setUsername]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');
    const [password, setPassword]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');
    const [error, setError]: [string | undefined, Dispatch<SetStateAction<string | undefined>>] = useState<string | undefined>(undefined);
    const context: AuthContextType | null = useContext(AuthContext);
    const navigate: NavigateFunction = useNavigate();
    
    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setUsername(event.target.value);
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setPassword(event.target.value);
    }

    async function login(username: string, password: string): Promise<void> {
        try {
            const token: string = await props.authService.login(username, password);
            localStorage.setItem('token', token);
            await context?.validateToken();
            navigate('/dashboard');
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            }
        }
    }

    return <Card className='login-form' variant='outlined' sx={{ m: 1, width: 322 }}>
        <CardHeader
            className='header'
            title={<Typography variant='h6'>Signin</Typography>}
            disableTypography={true}
            sx={{ py: 1, borderBottom: 1, borderBottomColor: 'inherit' }}
        />
        <CardContent 
            className='signin-content'
            sx={{
                py: 0,
                blockSize: 148.5,
                borderBottom: 0,
                borderBottomColor: 'inherit'
            }}>
            <FormGroup className='signin-form'>
                <TextField
                    variant='outlined'
                    size='small'
                    type='text'
                    value={username}
                    label='Username'
                    className='username-input'
                    onChange={handleUsernameChange}
                    sx={{ mt: 1 }} />
                <TextField
                    variant='outlined'
                    size='small'
                    type='text'
                    value={password}
                    label='Password'
                    className='password-input'
                    onChange={handlePasswordChange}
                    sx={{ mt: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pt: 1 }}>
                    <Button
                        variant='outlined'
                        className='signin-button'
                        onClick={async () => await login(username, password)}>
                        Signin
                    </Button>
                    <Button variant='outlined' className='register-button'>Register</Button>
                </Box>
            </FormGroup>
        </CardContent>
        { error ?
            <Box sx={{ px: 2, pb: 1 }}>
                <Typography variant='body1' sx={{ lineHeight: '20px' }}>{error}</Typography>
            </Box>
        : undefined }
    </Card>;
};