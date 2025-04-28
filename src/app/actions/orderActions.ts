

//my orderActions.ts file
import { OrderPayload, OrderStatus } from "./actionTypes";


export const INITIATE_ORDER = 'INITIATE_ORDER';
export const ORDER_SUCCESS = 'ORDER_SUCCESS';
export const ORDER_FAILURE = 'ORDER_FAILURE';
export const RESET_ORDER = 'RESET_ORDER';


//Action interfaces
interface InitiateOrderAction {
    type: typeof INITIATE_ORDER;
    payload: OrderPayload;
}

interface OrderSuccessAction {
    type: typeof ORDER_SUCCESS;
    payload: {
        txHash:string;
        executedPrice: number;
    };
}

interface OrderFailureAction {
    type: typeof ORDER_FAILURE;
    payload: {
        error: string;
    }
}


interface ResetOrderAction {
    type: typeof RESET_ORDER;
}


export type OrderActions = 
    | InitiateOrderAction
    | OrderSuccessAction
    | OrderFailureAction
    | ResetOrderAction;


//action creators
export const InitiateOrder = (order: OrderPayload): InitiateOrderAction => ({
    type: INITIATE_ORDER,
    payload: order 
});

export const orderSuccess = (
    txHash: string,
    executedPrice: number
): OrderSuccessAction => ({
    type:ORDER_SUCCESS,
    payload: {txHash, executedPrice}
});

export const orderFailure = (error: string): OrderFailureAction => ({
    type: ORDER_FAILURE,
    payload: {error}
});

export const resetOrder = (): ResetOrderAction => ({
    type:RESET_ORDER
})