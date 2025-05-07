

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderType,OrderStatus } from "../actions/actionTypes";


interface OrderState {
    status: OrderStatus | null;
    currentOrder: any | null;
    txHash: string | null;
    error: string | null;
}

const initialState: OrderState = {
    status: null,
    currentOrder: null,
    txHash: null,
    error: null
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
      setOrderStatus: (state, action: PayloadAction<OrderStatus>) => {
        state.status = action.payload;
      },
      resetOrder: () => initialState,
    },
    // Add extraReducers for thunks if needed
  });


  export const { setOrderStatus, resetOrder } = orderSlice.actions;
  export default orderSlice.reducer;