import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { updateUser, getUserByStripeCustomerId, UserData } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_dummy", {
    apiVersion: "2023-10-16" as any,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: Request) {
    if (!endpointSecret) {
        return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    const body = await req.text();
    const signatureHeader = await headers();
    const sig = signatureHeader.get("stripe-signature");

    let event: Stripe.Event;

    try {
        if (!sig) throw new Error("No signature");
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err: any) {
        console.error(`Webhook Error: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    try {
        switch (event.type) {
            case "checkout.session.completed": {
                const session = event.data.object as Stripe.Checkout.Session;
                const userId = session.metadata?.userId; // We passed email as ID

                if (userId) {
                    const updates: Partial<UserData> = {
                        plan: 'premium',
                        stripeCustomerId: session.customer as string,
                        subscriptionId: session.subscription as string,
                    };
                    updateUser(userId, updates);
                    console.log(`User ${userId} upgraded to premium.`);
                }
                break;
            }

            case "customer.subscription.deleted": {
                const subscription = event.data.object as Stripe.Subscription;
                const customerId = subscription.customer as string;

                const user = getUserByStripeCustomerId(customerId);
                if (user) {
                    updateUser(user.email, { plan: 'free', subscriptionId: undefined });
                    console.log(`User ${user.email} subscription cancelled.`);
                }
                break;
            }

            // Handle failed payments, updates, etc. as needed
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Error processing webhook:", error);
        return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
    }
}
