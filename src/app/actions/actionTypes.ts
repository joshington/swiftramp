//my actionTypes.ts
//i have to create action types here
export const ORDER_INITIATED = 'INITIATE_ORDER';
export const ORDER_CREATED   = 'ORDER_CREATED';



export enum OrderType {
    BUY = 'BUY',
    SELL = 'SELL'
}

//Order status
export enum OrderStatus {
    PENDING = 'PENDING',
    EXECUTED = 'EXECUTED',
    FAILED = 'FAILED'
}

// Crypto asset
export interface CryptoAsset {
    symbol: string; // 'BTC', 'ETH'
    name: string;
    amount: number;
    network: string;
}

//Order payload
export interface OrderPayload {
    type: OrderType;
    asset: CryptoAsset;
    amount:number;
    country: string;
    paymthd: string;
}