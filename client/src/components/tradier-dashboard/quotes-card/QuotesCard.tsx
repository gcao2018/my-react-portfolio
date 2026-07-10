import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import axios from 'axios';
import { Box, Card, CardContent, CardHeader, IconButton, InputAdornment, Paper, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';

interface Quotes {
    data: {
        quotes: {
            quote: Quote;
        }
    }
}

interface Quote {
    symbol: string;
    description: string;
    exch: string;
    type: string;
    last: number;
    change: number;
    volume: number;
    open: number;
    high: number;
    low: number;
    close: number;
    bid: number;
    ask: number;
    change_percentage: number;
    average_volume: number;
    last_volume: number;
    trade_date: number;
    prevclose: number;
    week_52_high: number;
    week_52_low: number;
    bidsize: number;
    bidexch: string;
    bid_date: number;
    asksize: number;
    askexch: string;
    ask_date: number;
    root_symbols: string;
}

export default function QuotesCard() {
    const [quote, setQuote]: [Quote | undefined, Dispatch<SetStateAction<Quote | undefined>>] = useState<Quote | undefined>(undefined);
    const [error, setError]: [string | undefined, Dispatch<SetStateAction<string | undefined>>] = useState<string | undefined>(undefined);
    
    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const response: Quotes = await axios.get('http://localhost:3000/api/quote/GOOG');
                const quote: Quote = response.data.quotes.quote;
                setQuote(quote); 
            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message);
                }
            }
        }
        fetchQuotes();
    });

    function formatCurrency (value: number, currencyCode: string): string {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencyCode,
        }).format(value);
    };

    if (error) {
        return error;
    }
    
    return <Card variant='outlined' sx={{ m: 1, width: 320 }}>
        <CardHeader title={<Typography variant='h6'>Quotes</Typography>} disableTypography={true} sx={{ py: 0.5, borderBottom: 1, borderBottomColor: 'inherit' }} />
        <CardContent sx={{ pt: 0, pb: 0, blockSize: 56, borderBottom: 1, borderBlockColor: 'inherit' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <TextField
                    variant='outlined'
                    size='small'
                    sx={{ py: 1 }}
                    slotProps={{
                        input: {
                            endAdornment: <Paper variant='outlined'>
                                <InputAdornment position='end' sx={{ mx: 0, borderRadius: 1 }}>
                                    <IconButton sx={{ p: 0.5 }}><Search /></IconButton>
                                </InputAdornment>
                            </Paper>,
                            sx: { pl: 0, pr: 0.5, width: 288 }
                        }
                    }}
                    placeholder='Enter a symbol for quote data...'
                />
            </Box>
        </CardContent>
        { quote ?
            <CardContent sx={{ pt: 0.5, pb: 0, blockSize: 289, borderBlockColor: 'inherit' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant='body2'><b>{quote.symbol}</b></Typography>
                    <Typography variant='body2'><b>${quote.last}</b></Typography>
                </Box>
                <Typography variant='body2'>{quote?.description}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pt: 1 }}>
                    <Typography variant='body2'>Bid</Typography>
                    <Typography variant='body2'>Ask</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant='body2'>
                        {formatCurrency(quote.bid, 'USD')}x{quote.bidsize}
                    </Typography>
                    <Typography variant='body2'>
                        {formatCurrency(quote.ask, 'USD')}x{quote.asksize}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pt: 1 }}>
                    <Typography variant='body2'>Day Low</Typography>
                    <Typography variant='body2'>Day High</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant='body2'>{formatCurrency(quote.low, 'USD')}</Typography>
                    <Typography variant='body2'>{formatCurrency(quote.high, 'USD')}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pt: 1 }}>
                    <Typography variant='body2'>52 Wk Low</Typography>
                    <Typography variant='body2'>52 Wk High</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant='body2'>{formatCurrency(quote.week_52_low, 'USD')}</Typography>
                    <Typography variant='body2'>{formatCurrency(quote.week_52_high, 'USD')}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pt: 1 }}>
                    <Typography variant='body2'>Open</Typography>
                    <Typography variant='body2'>Close</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant='body2'>{formatCurrency(quote.open, 'USD')}</Typography>
                    <Typography variant='body2'>{formatCurrency(quote.close, 'USD')}</Typography>
                </Box>
                <Box>
                    <Box>
                        <Typography variant='body2' sx={{ pt: 1 }}>Volume</Typography>
                        <Typography variant='body2'>{quote.volume.toLocaleString('en-US')}</Typography>
                    </Box>
                </Box>
            </CardContent>
        : undefined }
    </Card>;
}