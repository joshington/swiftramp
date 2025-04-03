


import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';


const persistConfig = {
    key:'swiftramp',
    storage,
    whitelist: [], //i will be adding the states i need to persist here
    version:1, //increment if state structure changes
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: {},
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ 
            serializableCheck: false 
    }),
});

//Infer the type of makeStore
export type RootState  = ReturnType<typeof store.getState>;
// Infer the `RootState` and `AppDispatch` types from the store itself


export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
