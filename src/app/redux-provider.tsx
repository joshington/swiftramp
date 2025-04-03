

'use client'
import { Provider } from "react-redux";
import {store} from "./lib/store";
import {persistStore} from "redux-persist";

persistStore(store);
//we are persisting the store here



export default function ReduxProvider({
    children
}: {
    children: React.ReactNode
}) {
    return <Provider store={store}>{children}</Provider>;
}