import { Box, Card, CardContent, CardHeader, IconButton, Paper, Typography } from '@mui/material';
import { type Quote, type QuotesService } from '../../../api/quotes-service';
import { useCallback, useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { formatCurrency } from '../../../utils/currency';
import { Refresh } from '@mui/icons-material';

interface WatchlistProperties {
    symbols: string[];
    quotesService: QuotesService;
}

export default function Watchlist(props: WatchlistProperties): ReactNode {
    const [quotes, setQuotes]: [Quote[], Dispatch<SetStateAction<Quote[]>>] = useState<Quote[]>([]);
    const [error, setError]: [string | undefined, Dispatch<SetStateAction<string | undefined>>] = useState<string | undefined>(undefined);

    const refresh: () => Promise<void> = useCallback(async (): Promise<void> => {
        try {
            if (props.symbols.length > 0) {
                const data: Quote | Quote[] = await props.quotesService.fetchQuotes(props.symbols);
                if (data instanceof Array) {
                    setQuotes(data);
                } else {
                    setQuotes([data]);
                }
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            }
        }
    }, [props.quotesService, props.symbols]);

    useEffect((): void => {
        const setData: () => Promise<void> = async (): Promise<void> => {
            refresh();
        }
        setData();
    }, [refresh]);

    return <Card className='watchlist' variant='outlined' sx={{ m: 1, width: 322 }}>
        <CardHeader
            className='header'
            title={<Typography variant='h6'>Watchlist</Typography>}
            disableTypography={true}
            sx={{ py: 1, borderBottom: 1, borderBottomColor: 'inherit' }}
            action={
                <Paper className='icon-outline' variant='outlined' sx={{ mt: 0.5 }}>
                    <IconButton className='refresh-button' sx={{ p: 0.5 }} onClick={refresh}>
                        <Refresh className='refresh-icon' />
                    </IconButton>
                </Paper>
            }
        />
        <CardContent
            className='column-headers'
            sx={{
                py: 0,
                blockSize: 48,
                borderBottom: 1,
                borderBottomColor: quotes.length > 0 ? 'inherit' : 'transparent'
            }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '96px 96px 96px', width: '100%', py: 1.75 }}>
                <Typography variant='body2' sx={{ textAlign: 'left', lineHeight: '20px' }}><b>Symbol</b></Typography>
                <Typography variant='body2' sx={{ textAlign: 'left', lineHeight: '20px' }}><b>Last</b></Typography>
                <Typography variant='body2' sx={{ textAlign: 'right', lineHeight: '20px' }}><b>Change</b></Typography>
            </Box>
        </CardContent>
        {quotes.map((quote: Quote, index: number): ReactNode => {
            return <CardContent
                key={index}
                sx={{
                    py: 0,
                    blockSize: 48,
                    borderBottom: 1,
                    borderBottomColor: index === props.symbols.length - 1 ? 'transparent' : 'inherit'
                }}>
                { quote ? 
                    <Box sx={{ display: 'grid', gridTemplateColumns: '96px 96px 96px', width: '100%' }}>
                        <Typography
                            variant='body2'
                            sx={{ textAlign: 'left', py: 1.75, lineHeight: '20px' }}>
                            <b>{quote.symbol}</b>
                        </Typography>
                        <Typography
                            variant='body2'
                            sx={{
                                textAlign: 'left',
                                lineHeight: '20px',
                                py: 1.75,
                                color: quote.change > 0 ? '#04b544' : '#ff2c2c'
                            }}>
                            {formatCurrency(quote.last, 'USD')}
                        </Typography>
                        <Box sx={{display: 'block', py: 0.5 }}>
                            <Typography
                                variant='body2'
                                sx={{
                                    textAlign: 'right',
                                    lineHeight: '20px',
                                    color: quote.change > 0 ? '#04b544' : '#ff2c2c'
                                }}>
                                {formatCurrency(quote.change, 'USD')}
                            </Typography>
                            <Typography
                                variant='body2'
                                sx={{
                                    textAlign: 'right',
                                    lineHeight: '20px',
                                    color: quote.change > 0 ? '#04b544' : '#ff2c2c'
                                }}>
                                {quote.change_percentage}%
                            </Typography>
                        </Box>
                    </Box>
                : undefined }
            </CardContent>
        })}
        { error ?
            <Box sx={{ px: 2, pb: 1 }}>
                <Typography variant='body1' sx={{ lineHeight: '20px' }}>{error}</Typography>
            </Box>
        : undefined }
    </Card>
}