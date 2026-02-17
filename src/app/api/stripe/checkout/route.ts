import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getUser, createUser } from "@/lib/db";

// Use secret key from env, fallback for build safety (but will fail runtime if missing)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
    apiVersion: "2023-10-16" as any,
});

export async function POST(req: Request) {
    if (!process.env.STRIPE_SECRET_KEY) {
        return NextResponse.json({ error: "Stripe setup incomplete" }, { status: 500 });
    }

    try {
        const { email, plan, planType } = await req.json(); // planType: 'monthly' | 'yearly'

        if (!email) {
            return NextResponse.json({ error: "Email required" }, { status: 400 });
        }

        // Ensure user exists in our "DB"
        let user = getUser(email);
        if (!user) {
            // Create basic user record if not exists
            user = createUser({
                id: email, // Using email as ID for simplicity in this file-based DB
                email,
                name: email.split("@")[0],
                plan: 'free',
                usage: { date: new Date().toISOString().split('T')[0], questionsCount: 0 }
            });
        }

        // Determine price ID
        const priceId = planType === 'yearly'
            ? process.env.STRIPE_YEARLY_PRICE_ID
            : process.env.STRIPE_MONTHLY_PRICE_ID;

        if (!priceId) {
            return NextResponse.json({ error: "Price ID not configured" }, { status: 500 });
        }

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            customer: user.stripeCustomerId, // If undefined, Stripe creates a new one
            customer_email: user.stripeCustomerId ? undefined : user.email,
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: "subscription",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment-cancel`,
            metadata: {
                userId: user.email, // Passing email as ID
                planType: planType
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
