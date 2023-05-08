import axios from "axios";
import { useState, useEffect } from "react";
import { Card } from "@chakra-ui/react";

const apiKey = "MNINI6SBHZ3GJ8PDUBTCXU5NMEU87SJYAF";

interface IGasFees {
    LastBlock: string;
    SafeGasPrice: string;
    ProposeGasPrice: string;
    FastGasPrice: string;
};

export default function GasFees() {
    const [GasFees, setGasFees] = useState<IGasFees>();

    const getGasFees = async () => {
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
    }, []);

    return (
        <Card p="5" m="10">
            <h1>⛽ Gas Fees</h1>
            <span className="text-center">{GasFees?.ProposeGasPrice}</span>
        </Card>
    )
}
