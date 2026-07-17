import apiClient from './api-client';

interface Quotes {
    data: {
        quotes: {
            quote: Quote | Quote[];
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

export interface QuotesService {
    fetchQuotes: (quotes: string[]) => Promise<Quote | Quote[]>;
}

export const quotesService: QuotesService = {
    fetchQuotes: async (quotes: string[]): Promise<Quote | Quote[]> => {
        const quotesString: string = quotes.join(',');
        try {
            const response: Quotes = await apiClient.get(`/api/quote/${quotesString}`);
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