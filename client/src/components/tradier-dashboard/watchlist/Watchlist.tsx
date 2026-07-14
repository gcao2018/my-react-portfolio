import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material';
import type { Quote } from '../../../api/quote-service';
import type { ReactNode } from 'react';
import { formatCurrency } from '../../../utils/currency';

interface WatchlistProperties {
    quotes: Array<Quote>;
}

export default function Watchlist(props: WatchlistProperties): ReactNode {
    return <Card className='watchlist' variant='outlined' sx={{ m: 1, width: 322 }}>
        <CardHeader
            className='header'
            title={<Typography variant='h6'>Watchlist</Typography>}
            disableTypography={true}
            sx={{ py: 1, borderBottom: 1, borderBottomColor: 'inherit' }}
        />
        <CardContent
            className='column-headers'
            sx={{
                py: 0,
                blockSize: 48,
                borderBottom: 1,
                borderBottomColor: props.quotes.length > 0 ? 'inherit' : 'transparent'
            }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: '96px 96px 96px', width: '100%', py: 1.75 }}>
                <Typography variant='body2' sx={{ textAlign: 'left', lineHeight: '20px' }}><b>Symbol</b></Typography>
                <Typography variant='body2' sx={{ textAlign: 'left', lineHeight: '20px' }}><b>Last</b></Typography>
                <Typography variant='body2' sx={{ textAlign: 'right', lineHeight: '20px' }}><b>Change</b></Typography>
            </Box>
        </CardContent>
        {props.quotes.map((quote: Quote, index: number): ReactNode => {
            return <CardContent
                key={index}
                sx={{ py: 0, blockSize: 48, borderBottom: 1, borderBottomColor: index === props.quotes.length - 1 ? 'transparent' : 'inherit' }}>
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
                            color: quote.change > 0 ? '#04b544' : '#ff2c2c' }}>
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
            </CardContent>
        })}
    </Card>
}