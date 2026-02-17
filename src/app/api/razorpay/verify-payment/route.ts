import { NextResponse } from "next/server";
import crypto from "crypto";
import { updateUser, getUser, UserData } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            email,
            planType // 'monthly' | 'yearly'
        } = await req.json();

        const key_secret = process.env.RAZORPAY_KEY_SECRET || "dummy_secret";

        // Verify signature
        const generated_signature = crypto
            .createHmac("sha256", key_secret)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generated_signature !== razorpay_signature) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
        }

        // Calculate expiry
        const now = new Date();
        let expiryDate = new Date();
        if (planType === 'monthly') {
            expiryDate.setDate(now.getDate() + 30);
        } else if (planType === 'yearly') {
            expiryDate.setDate(now.getDate() + 365);
        }

        // Update User
        if (email) {
            const updates: Partial<UserData> = {
                plan: 'premium',
                // Store as ISO string or timestamp
                planEndDate: expiryDate.toISOString(),
                subscriptionId: razorpay_order_id // Storing order ID as sub ID for reference
            };
            updateUser(email, updates);
        }

        return NextResponse.json({ success: true, expiryDate });
    } catch (error: any) {
        console.error("Verification Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
