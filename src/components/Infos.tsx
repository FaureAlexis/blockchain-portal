import { Card } from "@chakra-ui/react";
import { Web3ReactHooks } from "@web3-react/core";
import type { BigNumber } from '@ethersproject/bignumber'
import {useState, useEffect} from "react";

export default function Infos({
    wallet,
    provider
}: {
    wallet: string;
    provider: ReturnType<Web3ReactHooks['useProvider']>;
}) {
    const [EtherBalance, setEtherBalance] = useState<number>();
    useEffect(() => {
        const updateBalance = async () => {
            if (!wallet || !provider) return;
            const balance = await provider.getBalance(wallet);
            console.log(balance);
            setEtherBalance(balance as unknown as number);
        };
        updateBalance();
    }, [wallet]);

    return (
        <Card p="5" className="text-center bg-gray-600 text-white">
            <h1>👛 Wallet Address</h1>
            <span className="text-center">{wallet}</span>
            <h1>💰 Ether Balance</h1>
            <span className="text-center">{EtherBalance ? EtherBalance * 1e-18 : 0} ETH</span>
        </Card>
    )
}
