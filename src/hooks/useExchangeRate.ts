

import { useState, useEffect } from "react";
import { fetchExchangeRate } from "@/utils/exchangeRate";

export const useExchangeRate = () => {
    const [exchangeRate, setExchangeRate] = useState<number>(3855.76); //default exchange rate
    const [isLoading, setIsLoading] = useState<boolean>(false); //loading state

    useEffect(() => {
        const fetchRate = async () => {
            setIsLoading(true);
            try {
                const rate = await fetchExchangeRate();
                setExchangeRate(rate);
            } catch(error) {
                console.error('Failed to fetch exchange rate:', error);
                //fallback to the default exchnage rate
                setExchangeRate(3855.76);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRate(); //fetch immediately on mount
        const interval = setInterval(fetchRate, 60000); //refresh every 60 secs
        return () => clearInterval(interval); //cleanup interval on unmount
    }, []);
    return { exchangeRate, isLoading };
};