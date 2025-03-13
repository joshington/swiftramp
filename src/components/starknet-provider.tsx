"use client";

import React from "react";

import { sepolia, mainnet } from "@starknet-react/chains";

import { connectors } from "@/connectors";

import { 
    publicProvider, 
    StarknetConfig, 
    argent,braavos,
    useInjectedConnectors,
    voyager
} from "@starknet-react/core";


export function StarknetProvider({children}: {children:React.ReactNode}) {
    const chains = [mainnet, sepolia]
    const  providers = publicProvider()

    return (
        <div className="flex flex-col h-screen">
          <StarknetConfig
            chains={chains}
            provider={providers}
            connectors={connectors}
          >
            {children}
          </StarknetConfig>
        </div>
      )
}