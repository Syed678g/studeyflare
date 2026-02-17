import { NextResponse } from "next/server";
import { getUser, createUser, updateUser } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, name } = body;

        if (!email) {
            return NextResponse.json({ error: "Email required" }, { status: 400 });
        }

        let user = getUser(email);

        // If user calls this endpoint (e.g. on login) and isn't in DB, create them
        if (!user && name) {
            user = createUser({
                id: email,
                email,
                name,
                plan: 'free',
                usage: { date: new Date().toISOString().split('T')[0], questionsCount: 0 }
            });
        }

        // Expiry Check
        if (user && user.plan === 'premium' && user.planEndDate) {
            const expiryDate = new Date(user.planEndDate);
            if (new Date() > expiryDate) {
                console.log(`User ${user.email} premium expired on ${expiryDate.toISOString()}`);
                user = updateUser(user.email, { plan: 'free', planEndDate: undefined, subscriptionId: undefined });
            }
        }

        return NextResponse.json({ user });
    } catch (error) {
        return NextResponse.json({ error: "Failed to sync user" }, { status: 500 });
    }
}
