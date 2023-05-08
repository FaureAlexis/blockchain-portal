import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Link
} from '@chakra-ui/react'
import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
const apiKey = "MNINI6SBHZ3GJ8PDUBTCXU5NMEU87SJYAF";

interface Transaction {
    blockNumber: string;
    timeStamp: string;
    hash: string;
    nonce: string;
    blockHash: string;
    transactionIndex: string;
    from: string;
    to: string;
    value: string;
    gas: string;
    gasPrice: string;
    isError: string;
    txreceipt_status: string;
}

export default function TransactionsTable({
    wallet
}: {
    wallet: string;
}) {
    const [Transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        const getTransactions = async () => {
            const response = await axios
            .get("https://api.etherscan.io/api", {
                params: {
                module: "account",
                action: "txlist",
                address: wallet,
                startblock: 0,
                endblock: 99999999,
                sort: "asc",
                apikey: apiKey
                }
            });
            setTransactions(response.data.result);
        }
        getTransactions();
    }, [wallet]);

    return (
        Transactions.length > 0 && Array.isArray(Transactions) ? (
            <div className='mt-10'>
                <h1 className='font-bold text-2xl'>Transactions list</h1>
                <TableContainer>
                    <Table variant='simple'>
                        <TableCaption>Last Transactions</TableCaption>
                        <Thead>
                        <Tr>
                            <Th>from</Th>
                            <Th>to</Th>
                            <Th>value</Th>
                            <Th>date</Th>
                        </Tr>
                        </Thead>
                        <Tbody>
                            {Transactions.map((transaction, index) => (
                                <Tr key={index} >
                                    <Td><Link href={`https://etherscan.io/address/${transaction.from}`} className='text-blue-300'>{transaction.from}</Link></Td>
                                    <Td><Link href={`https://etherscan.io/address/${transaction.to}`} className='text-blue-300'>{transaction.to}</Link></Td>
                                    <Td>{parseInt(transaction.value) * 1e-18} ETH</Td>
                                    <Td>{new Date(parseInt(transaction.timeStamp) * 1000).toLocaleString().split(' ')[0]}</Td>
                                </Tr>
                            ))}
                        </Tbody>
                        <Tfoot>
                        <Tr>
                            <Th>from</Th>
                            <Th>to</Th>
                            <Th>value</Th>
                        </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </div>
        ) : (
            <div>no transactions</div>
        )
    )
}
