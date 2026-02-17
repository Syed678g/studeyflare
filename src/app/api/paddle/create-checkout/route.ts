import { NextResponse } from "next/server";
import { Environment, Paddle } from "@paddle/paddle-node-sdk";
import { getUser, createUser } from "@/lib/db";

const paddle = new Paddle(process.env.PADDLE_API_KEY || "dummy_key", {
    environment: process.env.NEXT_PUBLIC_PADDLE_ENV === 'production' ? Environment.production : Environment.sandbox,
});

export async function POST(req: Request) {
    try {
        const { planType, userEmail } = await req.json(); // planType: 'monthly' | 'yearly'

        const priceId = planType === 'monthly'
            ? process.env.PADDLE_MONTHLY_PRICE_ID
            : process.env.PADDLE_YEARLY_PRICE_ID;

        if (!priceId) {
            return NextResponse.json({ error: "Price ID not found" }, { status: 400 });
        }

        // 1. Create or Get Customer
        let customerId;
        try {
            // Try creating customer. If using same email, it might create a duplicate in Sandbox, which is fine for testing.
            // In prod, you'd likely list customers by email to check existence first.
            const customer = await paddle.customers.create({
                email: userEmail,
            });
            customerId = customer.id;
        } catch (e) {
            // If error (e.g. valid email check), we might handle it. 
            // For now, assume success or fallback.
            console.error("Customer creation error", e);
            // In a real application, you might want to fetch an existing customer here
            // if the creation failed due to a duplicate email.
            // For this example, we'll proceed with a potentially null customerId,
            // which Paddle's transaction creation might then handle by creating one implicitly
            // or by failing if a customerId is strictly required and not found.
        }

        // Get or create user to get their ID if needed, but Paddle manages customers via email usually in checkout
        // For this flow, we just pass the price ID and let frontend handle the checkout overlay
        // OR we can create a transaction server-side.
        // Paddle Billing usually recommends passing priceId to frontend or creating a transaction.
        // Let's create a transaction to pass custom data.

        const transaction = await paddle.transactions.create({
            items: [{ priceId, quantity: 1 }],
            customData: {
                userId: userEmail, // Pass email as userId for webhook mapping
                planType
            },
            customerId: customerId // Use customerId instead of customer object
        });

        return NextResponse.json({
            transactionId: transaction.id,
            // Paddle JS checks out using transactionId
        });

    } catch (error: any) {
        console.error("Paddle Checkout Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
