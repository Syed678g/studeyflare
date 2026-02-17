import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getUser } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
    apiVersion: "2023-10-16" as any,
});

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        const user = getUser(email);

        if (!user || !user.stripeCustomerId) {
            return NextResponse.json({ error: "User not found or no subscription" }, { status: 404 });
        }

        const session = await stripe.billingPortal.sessions.create({
            customer: user.stripeCustomerId,
            return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/dashboard`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
