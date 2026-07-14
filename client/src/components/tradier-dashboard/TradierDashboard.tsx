import { useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import QuotesCard from "./quotes-card/QuotesCard";
import type { Quote } from "../../api/quote-service";
import { Box } from "@mui/material";
import Watchlist from "./watchlist/Watchlist";

export default function TradierDashboard(): ReactNode {
    const [quotes, setQuotes]: [Array<Quote>, Dispatch<SetStateAction<Array<Quote>>>] = useState<Array<Quote>>([]);

    function addQuote(quoteToAdd: Quote): void {
        if (!quotes.some((quote: Quote): boolean => {
            return quote.symbol === quoteToAdd.symbol
        })) {
            setQuotes([...quotes, quoteToAdd]);
        }
    }

    function deleteQuote(indexToDelete: number): void {
        setQuotes((prevQuotes: Array<Quote>): Array<Quote> => {
            return prevQuotes.filter((_: Quote, index: number) => index !== indexToDelete);
        })
    }

    return <Box sx={{ display: 'block' }}>
        <Box sx={{ display: 'inline-block', verticalAlign: 'top' }}>
            <QuotesCard addQuote={addQuote} deleteQuote={deleteQuote} />
        </Box>
        <Box sx={{ display: 'inline-block', verticalAlign: 'top' }}>
            <Watchlist quotes={quotes} />
        </Box>
    </Box>
}