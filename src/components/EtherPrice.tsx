'use client';
import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";
import { Card } from "@chakra-ui/react";

const apiKey = process.env.API_KEY;

export default function EtherPrice() {
    const [EtherPrice, setEtherPrice] = useState<string>();

    const getEtherPrice = async () => {
        const response = await axios
            .get("https://api.etherscan.io/api", {
                params: {
                    module: "stats",
                    action: "ethprice",
                    apikey: apiKey
                }
            });
        if (response.data.status !== "1") return;
        setEtherPrice(response.data.result.ethusd);
    }

    useEffect(() => {
        getEtherPrice();
        setInterval(() => {
            getEtherPrice();
        }, 1e3 * 60);
    }, [])

    return (
        <Card p="5" m="10" className="bg-gray-600">
            <h1>💰 Ether Price</h1>
            <span className="text-center">{EtherPrice ? EtherPrice : "Error"}$</span>
        </Card>
    )
}
