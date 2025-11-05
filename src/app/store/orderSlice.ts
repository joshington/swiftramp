//my orderReducer.ts file
import { OrderActions } from "../actions/orderActions";
import { OrderPayload, OrderStatus } from "../actions/actionTypes";

interface OrderState {
    status: OrderStatus | null;
    currentOrder: OrderPayload | null;
    txHash: string | null;
    error: string | null;
    executedPrice: number | null;
}

const initialState: OrderState = {
    status: null,
    currentOrder: null,
    txHash: null,
    error: null,
    executedPrice: null
};

export const orderReducer = (
    state = initialState,
    action: OrderActions
): OrderState => {
    switch (action.type) {
        case 'INITIATE_ORDER':
            return {
                ...state,
                status: OrderStatus.PENDING,
                currentOrder:action.payload,
                error: null
            };
        case 'ORDER_SUCCESS':
            return  {
                ...state,
                status:OrderStatus.EXECUTED,
                txHash:action.payload.txHash,
                executedPrice:action.payload.executedPrice,
                error:null
            };
        case 'ORDER_FAILURE':
            return {
                ...state,
                status:OrderStatus.FAILED,
                error:action.payload.error
            }
        
        case 'RESET_ORDER':
            return initialState;
        default:
            return state;
    }
}