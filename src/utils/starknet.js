


import { constants, Provider } from "starknet";

export const starknetProvider = new Provider({
    sequencer: {
        network:constants.NetworkName.SN_SEPOLIA  //using the sepolia testnet here
    },
});