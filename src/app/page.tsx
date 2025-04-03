
"use client"

import Dapp from "@/components/Dapp"
import { StarknetProvider } from "@/components/starknet-provider"
import ReduxProvider from "./redux-provider"

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <ReduxProvider>
        <StarknetProvider>
          <Dapp />
        </StarknetProvider>
      </ReduxProvider>
    </div>
  )
}