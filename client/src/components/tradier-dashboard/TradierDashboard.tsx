import { useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import QuotesCard from "./quotes-card/QuotesCard";
import { Box } from "@mui/material";
import Watchlist from "./watchlist/Watchlist";

export default function TradierDashboard(): ReactNode {
    const [symbols, setSymbols]: [Array<string>, Dispatch<SetStateAction<Array<string>>>] = useState<Array<string>>((): Array<string> => {
        const savedQuotes: string | null = localStorage.getItem('mySavedQuotes');
        return savedQuotes ? JSON.parse(savedQuotes) : [];
    });

    useEffect((): void => {
        localStorage.setItem('mySavedQuotes', JSON.stringify(symbols));
    }, [symbols]);

    function addSymbol(symbolToAdd: string): void {
        if (!symbols.some((symbol: string): boolean => {
            return symbol === symbolToAdd;
        })) {
            setSymbols([...symbols, symbolToAdd]);
        }
    }

    function deleteSymbol(indexToDelete: number): void {
        setSymbols((prevQuotes: Array<string>): Array<string> => {
            return prevQuotes.filter((_: string, index: number) => index !== indexToDelete);
        })
    }

    return <Box sx={{ display: 'block' }}>
        <Box sx={{ display: 'inline-block', verticalAlign: 'top' }}>
            <QuotesCard addSymbol={addSymbol} deleteSymbol={deleteSymbol} />
        </Box>
        <Box sx={{ display: 'inline-block', verticalAlign: 'top' }}>
            <Watchlist symbols={symbols} />
        </Box>
    </Box>
}