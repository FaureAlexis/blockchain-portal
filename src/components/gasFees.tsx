'use client';
import axios from "axios";
import { useState, useEffect } from "react";
import { Card } from "@chakra-ui/react";

interface IGasFees {
    LastBlock: string;
    SafeGasPrice: string;
    ProposeGasPrice: string;
    FastGasPrice: string;
};

export default function GasFees() {
    const [GasFees, setGasFees] = useState<IGasFees>();
    const [LastGasFees, setLastGasFees] = useState<IGasFees>();
    const apiKey = process.env.API_KEY;

    const getGasFees = async () => {
        if (GasFees) setLastGasFees(GasFees);
        const response = await axios
            .get("https://api.etherscan.io/api", {
                params: {
                    module: "gastracker",
                    action: "gasoracle",
                    apikey: apiKey
                }
            });
        setGasFees(response.data.result);
    }


    useEffect(() => {
        getGasFees();
        setInterval(() => {
            getGasFees();
        }, 1e3 * 30);
    }, [])

    return (
        <Card p="5" m="10" className="bg-gray-600">
            <h1>⛽ Gas Fees</h1>
            <span className="text-center">{GasFees ? GasFees.ProposeGasPrice : LastGasFees?.ProposeGasPrice}</span>
        </Card>
    )
}
