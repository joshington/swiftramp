
import { constants } from "starknet"
import { createContext, useContext } from "react";
import { Provider } from "starknet"; //since we need our app to bridge starknet and nextjs
import {starknetProvider} from "../utils/starknet";

//create the context
const StarknetContext = createContext<Provider | null>(null);

//custom hook to use the satrknet provider

export function useStarknet() {
    const context = useContext(StarknetContext);
    if(!context) {
        throw new Error('useStarknet must be used within a StarknetProvider');
    }
    return context;
}

//provider component
export function StarknetProvider({children}: {children:React.ReactNode}) {
   
    return (
        <StarknetContext.Provider value={StarknetProvider}>
            {children}
        </StarknetContext.Provider>
    )
}