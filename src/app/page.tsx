'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import GasFees from '@/components/gasFees';
import EtherPrice from '@/components/EtherPrice';
import TransactionsTable from '@/components/Transactions';
import Infos from '@/components/Infos';
import { hooks as metaMaskHooks, metaMask } from '../utils/web3Connectors';

const apiKey = process.env.API_KEY;
const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = metaMaskHooks;

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [isWallet, setIsWallet] = useState(false);
  
  const accounts = useAccounts();
  const provider = useProvider();
  const [error, setError] = useState(undefined);

  const connectWallet = async () => {
    await metaMask.activate().then(() => setError(undefined)).catch(setError);
    if (error) {
      console.debug('Failed to connect to metamask');
      return;
    }
    if (!accounts || !accounts[0]) {
      console.debug('No accounts found');
      return;
    }
    setIsWallet(true);
    setWallet(accounts[0] as string);
  };

  useEffect(() => {
    void metaMask.connectEagerly().catch(() => {
      console.debug('Failed to connect eagerly to metamask');
    })
    setTimeout(() => {
      if (!isWallet) {
        connectWallet();
      }
    }, 1000);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-900 text-white">
      <h1 className='text-3xl font-bold mb-5'>Welcome to Blockchain portal</h1>
      {isWallet ? (
        <div className='flex flex-col'>
          <Infos wallet={wallet} provider={provider} />
          <TransactionsTable wallet={wallet} />
        </div>
      ) : (
      <div className='flex flex-col items-center'>
        <span>Sign in using MetaMask</span>
        <div className="flex flex-row justify-between">
          <Image src="/metamask.webp" alt="Metamask" width="100" height="100" />
        </div>
        <button onClick={connectWallet}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign in
        </button>
      </div>
      )}
      <div className="flex flex-row justify-center mt-10 w-full">
        <GasFees />
        <EtherPrice />
      </div>
    </main>
  )
}
