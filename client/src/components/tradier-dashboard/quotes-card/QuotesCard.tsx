import { useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { Box, Card, CardContent, CardHeader, IconButton, Paper, TextField, Typography } from '@mui/material';
import { Search, Visibility, VisibilityOff } from '@mui/icons-material';
import { type Quote, type QuotesService } from '../../../api/quotes-service';
import { formatCurrency } from '../../../utils/currency';

interface QuotesCardProperties {
    addSymbol: (symbol: string) => void;
    deleteSymbol: (symbol: string) => void;
    quotesService: QuotesService;
}

export default function QuotesCard(props: QuotesCardProperties): ReactNode {
    const [search, setSearch]: [string, Dispatch<SetStateAction<string>>] = useState('');
    const [quote, setQuote]: [Quote | undefined, Dispatch<SetStateAction<Quote | undefined>>] = useState<Quote | undefined>(undefined);
    const [visibilityIcon, setVisibilityIcon]: [boolean, Dispatch<SetStateAction<boolean>>] = useState(true);
    const [error, setError]: [string | undefined, Dispatch<SetStateAction<string | undefined>>] = useState<string | undefined>(undefined);

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        setSearch(event.target.value);
    }

    function isSaved(quote: Quote): boolean {
        return JSON.parse(localStorage.getItem('mySavedQuotes') || '[]').includes(quote.symbol);
    }

    function toggleVisibilityIcon(): void {
        setVisibilityIcon((prevVisibilityIcon: boolean): boolean => !prevVisibilityIcon);
    }

    async function searchQuotes(): Promise<void> {
        try {
            const data: Quote = await props.quotesService.fetchQuotes([search.replaceAll(',', '')]) as Quote;
            setQuote(data);
            setVisibilityIcon(isSaved(data));
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            }
        }
    }
    
    return <Card className='quotes-card' variant='outlined' sx={{ m: 1, width: 322 }}>
        <CardHeader
            className='header'
            title={<Typography variant='h6'>Quotes</Typography>}
            disableTypography={true}
            sx={{ py: 1, borderBottom: 1, borderBottomColor: 'inherit' }}
        />
        <CardContent
            className='search-bar-content'
            sx={{
                py: 0,
                blockSize: 48,
                borderBottom: 1,
                borderBottomColor: quote || error ? 'inherit' : 'transparent'
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
        { quote
            ? <CardContent sx={{ pt: 0.5, pb: 0, blockSize: 288, borderBlockColor: 'inherit' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant='body2' sx={{ lineHeight: '20px' }}><b>{quote.symbol}</b></Typography>
                    <Typography variant='body2' sx={{ lineHeight: '20px' }}><b>{formatCurrency(quote.last, 'USD')}</b></Typography>
                </Box>
                <Typography variant='body2' sx={{ lineHeight: '20px' }}>{quote?.description}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pt: 1 }}>
                    <Typography variant='body2' sx={{ lineHeight: '20px' }}>Bid</Typography>
                    <Typography variant='body2' sx={{ lineHeight: '20px' }}>Ask</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant='body2' sx={{ lineHeight: '20px' }}>
                        {formatCurrency(quote.bid, 'USD')}x{quote.bidsize}
                    </Typography>
                    <Typography variant='body2' sx={{ lineHeight: '20px' }}>
                        {formatCurrency(quote.ask, 'USD')}x{quote.asksize}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pt: 1 }}>
                    <Typography variant='body2' sx={{ lineHeight: '20px' }}>Day Low</Typography>
                    <Typography variant='body2' sx={{ lineHeight: '20px' }}>Day High</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant='body2' sx={{ lineHeight: '20px' }}>{formatCurrency(quote.low, 'USD')}</Typography>
                    <Typography variant='body2' sx={{ lineHeight: '20px' }}>{formatCurrency(quote.high, 'USD')}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pt: 1 }}>
                    <Typography variant='body2' sx={{ lineHeight: '20px' }}>52 Wk Low</Typography>
                    <Typography variant='body2' sx={{ lineHeight: '20px' }}>52 Wk High</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant='body2' sx={{ lineHeight: '20px' }}>{formatCurrency(quote.week_52_low, 'USD')}</Typography>
                    <Typography variant='body2' sx={{ lineHeight: '20px' }}>{formatCurrency(quote.week_52_high, 'USD')}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', pt: 1 }}>
                    <Typography variant='body2' sx={{ lineHeight: '20px' }}>Open</Typography>
                    <Typography variant='body2' sx={{ lineHeight: '20px' }}>Close</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Typography variant='body2' sx={{ lineHeight: '20px' }}>{formatCurrency(quote.open, 'USD')}</Typography>
                    <Typography variant='body2' sx={{ lineHeight: '20px' }}>{formatCurrency(quote.close, 'USD')}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Box>
                        <Typography variant='body2' sx={{ pt: 1, lineHeight: '20px' }}>Volume</Typography>
                        <Typography variant='body2' sx={{ lineHeight: '20px' }}>{quote.volume.toLocaleString('en-US')}</Typography>
                    </Box>
                    <Paper className='icon-outline' variant='outlined' sx={{ py: 0, mt: 1.5 }}>
                        { visibilityIcon
                            ? <IconButton
                                className='unwatch-button'
                                sx={{ p: 0.5 }}
                                onClick={(): void => {
                                    props.deleteSymbol(quote.symbol);
                                    toggleVisibilityIcon();
                                }}>
                                <VisibilityOff className='unwatch-icon' />
                            </IconButton>
                            : <IconButton
                                className='watch-button'
                                sx={{ p: 0.5 }}
                                onClick={(): void => {
                                    props.addSymbol(quote.symbol);
                                    toggleVisibilityIcon();
                                }}>
                                <Visibility className='watch-icon' />
                            </IconButton>
                        }
                    </Paper>
                </Box>
            </CardContent>
            : error
                ? <Box sx={{ px: 2, py: 0 }}>
                    <Typography variant='body1' sx={{ lineHeight: '20px' }}>{error}</Typography>
                </Box>
                : undefined
        }
    </Card>;
}