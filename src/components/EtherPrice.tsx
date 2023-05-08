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
        setEtherPrice(response.data.result.ethusd);
    }

    useEffect(() => {
        getEtherPrice();
    }, []);

    return (
        <Card p="5" m="10">
            <h1>💰 Ether Price</h1>
            <span className="text-center">{EtherPrice}$</span>
        </Card>
    )
}
