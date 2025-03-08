

// utils/exchangeRate.ts
export const fetchExchangeRate = async (): Promise<number> => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=ugx'
      );
      const data = await response.json();
      const rate = data['usd-coin'].ugx; // Extract the UGX rate for USDC
      return rate;
    } catch (error) {
      console.error('Failed to fetch exchange rate:', error);
      throw error; // Re-throw the error to handle it in the component
    }
};