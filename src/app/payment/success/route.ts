import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16'
})

export async function POST(request: Request) {
    const sig = request.headers.get("stripe-signature")!;

    const text = await request.text();

    const event = stripe.webhooks.constructEvent(text, sig, process.env.STRIPE_WEBHOOK_SECRET_KEY!)

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as any;

        await prisma.prestador_Ativo.create({
            data: {
                id_user: session.metadata.userId,
                data_inicio: session.metadata.startDate,
                data_fim: session.metadata.endDate,
                tipo_plano: session.metadata.planoType,
            },
        });
    }

    return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
