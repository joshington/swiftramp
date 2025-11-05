import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { CheckoutForumSlice } from "./checkoutForumSlice";
import orderSlice from "../order/orderSlice";
import { userReducer } from '../reducers/userReducer';
import orderReducer from "../order/orderSlice"; // Ensure orderReducer is imported correctly

const persistConfig = {
    key: 'swiftramp',
    storage,
    whitelist: ['order', 'user'], // persist both order and user slices
    version: 1,
};

const rootReducer = combineReducers({
    order: persistReducer(persistConfig, orderReducer),
    user:persistReducer(persistConfig, userReducer),
    checkoutForum: CheckoutForumSlice.reducer,
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ 
            serializableCheck: false // Required for redux-persist
        }),
    }); 

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;