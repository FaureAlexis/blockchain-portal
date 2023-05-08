// app/providers.tsx
'use client';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import { Web3ReactProvider, Web3ReactHooks } from '@web3-react/core';
import type { MetaMask } from '@web3-react/metamask'
import { Web3Provider } from '@ethersproject/providers';
import { hooks as metaMaskHooks, metaMask } from '../utils/web3Connectors';

function getLibrary(provider: any): Web3Provider {
    const library = new Web3Provider(provider);
    library.pollingInterval = 12000;
    return library;
}

export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
    const connectors: [MetaMask, Web3ReactHooks][] = [
        [metaMask, metaMaskHooks],
        ];
    return (
    <Web3ReactProvider connectors={connectors}>
        <CacheProvider>
        <ChakraProvider>
            {children}
        </ChakraProvider>
        </CacheProvider>
    </Web3ReactProvider>
  )
}
