"use client";
import { useConnect } from "@starknet-react/core"
import { StarknetkitConnector, useStarknetkitConnectModal } from "starknetkit"
import { useMemo } from "react";


const HeaderConnectButton = () => {
  const { connectAsync, connectors } = useConnect()


    // Ensure connectors are properly typed and available
    const starknetKitConnectors = useMemo(() => {
        return connectors.filter((c): c is StarknetkitConnector => c.id in {
        'argentX': true,
        'braavos': true
        // Add other connector IDs you support
        })
    }, [connectors])

    const { starknetkitConnectModal } = useStarknetkitConnectModal({
        connectors: connectors as StarknetkitConnector[],
        modalTheme: "dark",
    });

    const handleConnect = async () => {
        try {
          const { connector } = await starknetkitConnectModal()
          if (!connector) {
            console.error('No connector selected')
            return
          }
          
          // Verify the connector exists in our list
          const foundConnector = starknetKitConnectors.find(c => c.id === connector.id)
          if (!foundConnector) {
            throw new Error(`Connector ${connector.id} not found in available connectors`)
          }
    
          await connectAsync({ connector: foundConnector })
        } catch (error) {
          console.error('Connection error:', error)
          // You might want to show a user-friendly error message here
        }
    }
    return (
        <button
            className="px-4 py-2 md:px-6 md:py-3 bg-green-500 hover:bg-green-600 
            text-white font-medium rounded-lg transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
            onClick={handleConnect}
        >
            Connect wallet
        </button>
    )
}

export { HeaderConnectButton }
