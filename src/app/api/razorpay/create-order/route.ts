import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_dummy",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "dummy_secret",
});

export async function POST(req: Request) {
    try {
        const { amount } = await req.json();

        if (!amount) {
            return NextResponse.json({ error: "Amount required" }, { status: 400 });
        }

        const options = {
            amount: amount * 100, // Razorpay expects amount in paise (e.g. 100 INR = 10000 paise)
            currency: "INR",
            receipt: "receipt_" + Math.random().toString(36).substring(7),
        };

        const order = await razorpay.orders.create(options);

        return NextResponse.json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
        });
    } catch (error: any) {
        console.error("Razorpay Order Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
