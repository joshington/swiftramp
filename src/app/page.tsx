
"use client"

import Dapp from "@/components/Dapp"
import { StarknetProvider } from "@/components/starknet-provider"


export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <StarknetProvider>
          <Dapp />
      </StarknetProvider>
    </div>
  )
}