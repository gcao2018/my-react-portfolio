import { useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { Box, Card, CardContent, CardHeader, IconButton, Paper, TextField, Typography } from '@mui/material';
import { Search, Visibility } from '@mui/icons-material';
import { quoteService, type Quote } from '../../../api/quote-service';

export default function QuotesCard(): ReactNode {
    const [search, setSearch]: [string, Dispatch<SetStateAction<string>>] = useState('');
    const [quotes, setQuotes]: [Quote | undefined, Dispatch<SetStateAction<Quote | undefined>>] = useState<Quote | undefined>(undefined);
    const [error, setError]: [string | undefined, Dispatch<SetStateAction<string | undefined>>] = useState<string | undefined>(undefined);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setSearch(event.target.value);
    }

    async function searchQuotes(): Promise<void> {
        try {
            const quote = await quoteService.fetchQuote(search);
            setQuotes(quote);
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            }
        }
    }

    function formatCurrency (value: number, currencyCode: string): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencyCode,
        }).format(value);
    };
    
    return <Card className='quotes-card' variant='outlined' sx={{ m: 1, width: 320 }}>
        <CardHeader
            className='quotes-header'
            title={<Typography variant='h6'>Quotes</Typography>}
            disableTypography={true}
            sx={{ py: 0, borderBottom: 1, borderBottomColor: 'inherit' }}
        />
        <CardContent
            className='search-bar-content'
            sx={{
                py: 0,
                blockSize: 48,
                borderBottom: 1,
                borderBottomColor: quotes || error ? 'inherit' : 'transparent'
            }}>
            <TextField
                variant='outlined'
                size='small'
                type='text'
                value={search}
                className='search-bar-input'
                onChange={handleChange}
                sx={{ mt: 0.5 }}
                slotProps={{
                    input: {
                        endAdornment: <Paper className='icon-outline' variant='outlined'>
                            <IconButton className='search-button' sx={{ p: 0.5 }} onClick={searchQuotes}>
                                <Search className='search-icon' />
                            </IconButton>
                        </Paper>,
                        sx: { pl: 0, pr: 0.5, width: 288 }
                    }
                }}
                placeholder='Enter a symbol for quote data...'
            />
        </CardContent>
        { quotes ?
            <CardContent sx={{ pt: 0.5, pb: 0, blockSize: 289, borderBlockColor: 'inherit' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant='body2'><b>{quotes.symbol}</b></Typography>
                    <Typography variant='body2'><b>${quotes.last}</b></Typography>
                </Box>
                <Typography variant='body2'>{quotes?.description}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pt: 1 }}>
                    <Typography variant='body2'>Bid</Typography>
                    <Typography variant='body2'>Ask</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant='body2'>
                        {formatCurrency(quotes.bid, 'USD')}x{quotes.bidsize}
                    </Typography>
                    <Typography variant='body2'>
                        {formatCurrency(quotes.ask, 'USD')}x{quotes.asksize}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pt: 1 }}>
                    <Typography variant='body2'>Day Low</Typography>
                    <Typography variant='body2'>Day High</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant='body2'>{formatCurrency(quotes.low, 'USD')}</Typography>
                    <Typography variant='body2'>{formatCurrency(quotes.high, 'USD')}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pt: 1 }}>
                    <Typography variant='body2'>52 Wk Low</Typography>
                    <Typography variant='body2'>52 Wk High</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant='body2'>{formatCurrency(quotes.week_52_low, 'USD')}</Typography>
                    <Typography variant='body2'>{formatCurrency(quotes.week_52_high, 'USD')}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pt: 1 }}>
                    <Typography variant='body2'>Open</Typography>
                    <Typography variant='body2'>Close</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant='body2'>{formatCurrency(quotes.open, 'USD')}</Typography>
                    <Typography variant='body2'>{formatCurrency(quotes.close, 'USD')}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Box>
                        <Typography variant='body2' sx={{ pt: 1 }}>Volume</Typography>
                        <Typography variant='body2'>{quotes.volume.toLocaleString('en-US')}</Typography>
                    </Box>
                    <Paper className='icon-outline' variant='outlined' sx={{ py: 0, mt: 1.5 }}>
                        <IconButton className='watch-button' sx={{ p: 0.5 }}>
                            <Visibility className='watch-icon' />
                        </IconButton>
                    </Paper>
                </Box>
            </CardContent>
        : error ? 
            <Box sx={{ px: 2, py: 0 }}>
                <Typography variant='body1'>{error}</Typography>
            </Box>
        : undefined }
    </Card>;
}