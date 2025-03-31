

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res:NextApiResponse,
) {
    const {orderTrackingId, status} = req.query;
    console.log('Payment Callback:', { orderTrackingId, status });

    // Update your database or perform other actions based on the payment status
    res.status(200).json({ message: 'Callback received' });
}