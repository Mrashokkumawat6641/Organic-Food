import axios from "axios";
import { getAccessToken } from "../../../utils/paypalClient.js";
import { PAYPAL_API } from "../../../env.js";

export const createOrderService = async () => {
    const accessToken = await getAccessToken();

    const response = await axios.post(
        `${PAYPAL_API}/v2/checkout/orders`,
        {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "INR",
                        value: "199.00",
                    },
                },
            ],
        },
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
};

export const captureOrderService = async (orderID) => {
    const accessToken = await getAccessToken();

    const response = await axios.post(
        `${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`,
        {},
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    return response.data;
};
