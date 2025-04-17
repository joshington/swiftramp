

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prisma";


export default async function handler(req: NextApiRequest, res:NextApiResponse) {
    if(req.method !== 'POST'){
        return res.status(405).json({message: 'Method not allowed' })
    }

    try {
        const {userName, phoneNumber, email,walletAddress} = req.body;

        
        //check if user exists by email or wallet address
        let user = await prisma.user.findFirst({
            where: {
                OR: [
                    {email},
                    {walletAddress} 
                ]
            }
        });

        //update or create user
        if(user){
            user = await prisma.user.update({
                where: {id: user.id},
                data: {
                    userName,
                    phone_no:phoneNumber,
                    email,
                    //saveForFuture,
                    walletAddress
                }
            });
        } else {
            user = await prisma.user.create({
                data: {
                    userName,
                    phone_no: phoneNumber,
                    email,
                    //saveForFuture,
                    walletAddress
                }
            });
        }
        res.status(200).json(user);
    } catch(error) {
        console.error('Error saving user info:', error);
        res.status(500).json({ message: 'Error saving user info' });
    }
}