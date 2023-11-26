import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16'
})


export async function POST(request: Request) {
    const req = await request.json();

    const { userId, price, name, startDate, endDate, planoType } = req;
    
    const session = await stripe.checkout.sessions.create({
        success_url: 'http://localhost:3000/',
        metadata: {
          userId,
          price,
          startDate,
          endDate,
          planoType,
        },
        line_items: [
          {
            price_data: {
              currency: "brl",
              unit_amount: price * 100,
              product_data: {
                name,
              },
            },
            quantity: 1,
          },
        ],
        mode: "payment",
      });
    
      return new NextResponse(JSON.stringify({ sessionId: session.id }), { status: 200 });
}