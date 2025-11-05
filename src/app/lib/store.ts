import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { orderReducer } from '../reducers/orderReducer';
import { userReducer } from '../reducers/userReducer';

const persistConfig = {
    key: 'swiftramp',
    storage,
    whitelist: ['order', 'user'], // persist both order and user slices
    version: 1,
};

const rootReducer = combineReducers({
    order: persistReducer(persistConfig, orderReducer),
    //order:orderReducer,
    user:persistReducer(persistConfig, userReducer)
});

export const store = configureStore({
    reducer: rootReducer, // Use the persisted reducer directly
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ 
            serializableCheck: false // Required for redux-persist
        }),
});

//export const persistor = persistStore(store);

// Type definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;