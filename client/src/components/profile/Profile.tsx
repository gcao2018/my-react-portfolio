import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import { useContext, type ReactNode } from 'react';
import { AuthContext, type AuthContextType } from '../auth/AuthContext';

export default function Profile(): ReactNode {
    const context: AuthContextType | null = useContext(AuthContext);
    return context?.user
        ? <Card className='login-form' variant='outlined' sx={{ m: 1, width: 322 }}>
            <CardHeader
                className='header'
                title={<Typography variant='h6'>Profile</Typography>}
                disableTypography={true}
                sx={{ py: 1, borderBottom: 1, borderBottomColor: 'inherit' }} />
            <CardContent
                className='column-headers'
                sx={{
                    py: 0,
                    blockSize: 68,
                    borderBottom: 1,
                    borderBottomColor: 'inherit'
                }}>
                <Box sx={{ lineHeight: '20px', py: 1.75 }}>
                    <Typography variant='body2'><b>Username: </b>{context.user.username}</Typography>
                    <Typography variant='body2'><b>Email: </b>{context.user.email}</Typography>
                </Box>
        </CardContent>
        </Card>
        : context?.error
            ? <Box sx={{ px: 2, pb: 1 }}>
                <Typography variant='body1' sx={{ lineHeight: '20px' }}>{context?.error}</Typography>
            </Box>
            : undefined
};