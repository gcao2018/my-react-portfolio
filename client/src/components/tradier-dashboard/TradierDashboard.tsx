import { useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import QuotesCard from "./quotes-card/QuotesCard";
import { Box } from "@mui/material";
import Watchlist from "./watchlist/Watchlist";
import { quotesService } from "../../api/quotes-service";

export default function TradierDashboard(): ReactNode {
    const [symbols, setSymbols]: [string[], Dispatch<SetStateAction<string[]>>] = useState<string[]>((): string[] => {
        const savedQuotes: string | null = localStorage.getItem('mySavedQuotes');
        return savedQuotes ? JSON.parse(savedQuotes) : [];
    });

    useEffect((): void => {
        localStorage.setItem('mySavedQuotes', JSON.stringify(symbols));
    }, [symbols]);

    function addSymbol(symbolToAdd: string): void {
        if (!symbols.some((symbol: string): boolean => symbol === symbolToAdd)) {
            setSymbols([...symbols, symbolToAdd]);
        }
    }

    function deleteSymbol(symbolToDelete: string): void {
        if (symbols.some((symbol: string): boolean => symbol === symbolToDelete)) {
            setSymbols(symbols.filter((symbol: string): boolean => symbol !== symbolToDelete ));
        }
    }

    return <Box sx={{ display: 'block' }}>
        <Box sx={{ display: 'inline-block', verticalAlign: 'top' }}>
            <QuotesCard addSymbol={addSymbol} deleteSymbol={deleteSymbol} quotesService={quotesService} />
        </Box>
        <Box sx={{ display: 'inline-block', verticalAlign: 'top' }}>
            <Watchlist symbols={symbols} quotesService={quotesService} />
        </Box>
    </Box>
}