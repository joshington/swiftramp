
import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import { OrderStatus } from "@/app/actions/actionTypes";

export async function POST(req: Request){
    try{
        const { userInfo, order, walletAddress, strkBalance } = await req.json();

        //create or update user
        const user = await prisma.user.upsert({
            where: {email:userInfo.email},
            update: {
                phone_no: userInfo.phoneNumber,
            },
            create: {
                email: userInfo.email,
                phone_no: userInfo.phoneNumber,
                // other fields
            }
        });
        //cerate the order
        const newOrder = await prisma.order.create({
            data: {
                user: {connect: {id: user.id}},
                status: OrderStatus.PENDING,
                blk_network: order.asset.network,
                country: order.country,
                pay_mthd: order.paymentMethod,
                order_mode: 'ONRAMP', // or 'OFFRAMP'
                subtotal: order.subtotal,
                total: order.total,
                order_tag: order.txRef,
            }
        });
        //return NextResponse.json({order:dbOrder});
        //create transaction====
        const transaction = await prisma.transaction.create({
            data: {
                order: { connect: { id: newOrder.id } },
                user: { connect: { id: user.id } },
                status: false, // pending
                txn_hash: walletAddress, // or payment reference
            }
        });

        return NextResponse.json({
            success: true,
            orderId: newOrder.id,
            txnHash:transaction.id
        });

    } catch(error:any){
        
        return NextResponse.json(
            {error: error.message},
            {status:500}
        );
    }
}