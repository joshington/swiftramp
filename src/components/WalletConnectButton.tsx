import { useConnect } from "@starknet-react/core";
import { StarknetkitConnector, useStarknetkitConnectModal } from "starknetkit";


const WalletConnectButton = () => {
    const {connectAsync, connectors} = useConnect();

    const {starknetkitConnectModal} = useStarknetkitConnectModal({
        connectors: connectors as StarknetkitConnector[],
        modalTheme: "dark",
    })

    return (
        <button
            className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
            onClick={async () => {
            const { connector } = await starknetkitConnectModal();
            if (!connector) {
                return;
            }
            await connectAsync({ connector });
            }}
        >
            Connect wallet
        </button>
    )
}

export {WalletConnectButton}