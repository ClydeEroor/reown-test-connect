import { createAppKit } from '@reown/appkit/react'

import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet,polygon,solana, type AppKitNetwork  } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import type {ReactNode} from "react";
import {SolanaAdapter} from "@reown/appkit-adapter-solana";
import "@reown/appkit-wallet-button/react";



// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://dashboard.reown.com
const projectId = 'f56ff67f0b1ec84d10bc34f472b01514'

// 2. Create a metadata object - optional
const metadata = {
    name: 'AppKit',
    description: 'AppKit Example',
    url: (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173'),
    icons: ['https://avatars.githubusercontent.com/u/179229932']
}

// 3. Set the networks
const networks = [mainnet, arbitrum,polygon,solana ] as [AppKitNetwork, ...AppKitNetwork[]]

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
    ssr: true
})

const solanaWeb3JsAdapter = new SolanaAdapter()

// 5. Create modal
createAppKit({
    defaultNetwork:solana,
    adapters: [wagmiAdapter,solanaWeb3JsAdapter],
    networks,
    projectId,
    metadata,
    features: {
        analytics: false // Optional - defaults to your Cloud configuration
    }
})

export function AppKitProvider({ children}: {children: ReactNode}) {
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    )
}