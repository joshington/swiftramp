
import { ARGENT_WEBWALLET_URL, CHAIN_ID } from "@/constants";
import {
    isInArgentMobileAppBrowser,
    ArgentMobileConnector,
} from "starknetkit/argentMobile"

import {
    BraavosMobileConnector,
    isInBraavosMobileAppBrowser,
} from "starknetkit/braavosMobile"

import { InjectedConnector } from "@starknet-react/core";
import { WebWalletConnector } from "starknetkit/webwallet"
import { getStarknet } from "@starknet-io/get-starknet-core"
import { Connector } from "starknetkit";


//handling case of mobile device
const isMobileDevice = () => {
    if(typeof window === "undefined") {
        return false
    }
    getStarknet()
    // Primary method: User Agent + Touch support check
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileUA = 
        /android|webos|iphone|ipad|ipod|blackberry|windows phone/.test(userAgent)

    const hasTouchSupport = 
        "ontouchStart" in window || navigator.maxTouchPoints > 0

    //Backup method:Screen size
    const isSmallScreen = window.innerWidth <= 768
    //combine checks; must match user agent AND (touch support OR small screen)
    return isMobileUA && (hasTouchSupport || isSmallScreen)
}

export const availableConnectors = () => {
    if (isInArgentMobileAppBrowser()) {
        return [
            ArgentMobileConnector.init({
                options: {
                    url: typeof window !== "undefined" ? window.location.href : "",
                    dappName: "SwiftRamp",
                    chainId: CHAIN_ID,
                },
            }),   
        ]
    }
    if (isInBraavosMobileAppBrowser()) {
        return [BraavosMobileConnector.init({})]
    }
    return [
        new InjectedConnector({options: {id: "argentx"}}),
        new InjectedConnector({options: {id:"braavos"}}),
        new InjectedConnector({options: {id: "metamask"}}),

        ArgentMobileConnector.init({
            options: {
                url: typeof window !== "undefined" ? window.location.href : "",
                dappName: "SwiftRamp",
                chainId: CHAIN_ID,
            },
        }),
        isMobileDevice() ? BraavosMobileConnector.init({}) : null,
        new WebWalletConnector({url: ARGENT_WEBWALLET_URL, theme: "dark"}),
    ].filter((connector) => connector !== null)
}

export const connectors = availableConnectors();