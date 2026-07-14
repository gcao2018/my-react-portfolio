import apiClient from './api-client';

interface Quotes {
    data: {
        quotes: {
            quote: Quote;
        }
    }
}

export interface Quote {
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

interface QuoteService {
    fetchQuote: (quote: string) => Promise<Quote>;
}

export const quoteService: QuoteService = {
    fetchQuote: async (quote: string): Promise<Quote> => {
        try {
            const response: Quotes = await apiClient.get(`/api/quote/${quote}`);
            return response.data.quotes.quote;
        } catch (e: unknown) {
            if (e instanceof Error) {
                throw e;
            } else {
                throw new Error('An unexpected error occurred', { cause: e });
            }
        }
    }
}