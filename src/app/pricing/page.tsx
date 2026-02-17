"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Button from "@/components/Button";
import { Check, Loader, Globe } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function PricingPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
    const [country, setCountry] = useState<'IN' | 'INTL'>('IN'); // Default to India
    const [paddleInitialized, setPaddleInitialized] = useState(false);

    // Initialize Paddle
    useEffect(() => {
        if (country === 'INTL' && !paddleInitialized) {
            const script = document.createElement("script");
            script.src = "https://cdn.paddle.com/paddle/paddle.js";
            script.onload = () => {
                // @ts-ignore
                Paddle.Setup({ vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID) || 12345 });
                setPaddleInitialized(true);
            };
            document.body.appendChild(script);
        }
    }, [country, paddleInitialized]);

    const handleCheckout = async (planType: 'monthly' | 'yearly') => {
        if (!user) {
            router.push("/login?redirect=/pricing");
            return;
        }

        setLoadingPlan(planType);

        if (country === 'IN') {
            // Razorpay Logic
            try {
                // 1. Create Order
                const orderRes = await fetch("/api/razorpay/create-order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        amount: planType === 'monthly' ? 199 : 1499,
                    }),
                });
                const order = await orderRes.json();

                if (order.error) {
                    alert("Order creation failed: " + order.error);
                    setLoadingPlan(null);
                    return;
                }

                // 2. Load Script
                const loadScript = (src: string) => {
                    return new Promise((resolve) => {
                        const script = document.createElement("script");
                        script.src = src;
                        script.onload = () => resolve(true);
                        script.onerror = () => resolve(false);
                        document.body.appendChild(script);
                    });
                };

                const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

                if (!res) {
                    alert("Razorpay SDK failed to load. Are you online?");
                    setLoadingPlan(null);
                    return;
                }

                // 3. Open Modal
                const options = {
                    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                    amount: order.amount,
                    currency: order.currency,
                    name: "Studyflare Premium",
                    description: planType === 'monthly' ? "Monthly Subscription" : "Yearly Subscription",
                    order_id: order.id,
                    handler: async function (response: any) {
                        // 4. Verify Payment
                        const verifyRes = await fetch("/api/razorpay/verify-payment", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                email: user.email,
                                planType
                            }),
                        });

                        const verifyData = await verifyRes.json();

                        if (verifyData.success) {
                            router.push("/payment-success");
                        } else {
                            alert("Payment verification failed!");
                        }
                    },
                    prefill: {
                        name: user.name,
                        email: user.email,
                    },
                    theme: {
                        color: "#3b82f6",
                    },
                };

                const paymentObject = new (window as any).Razorpay(options);
                paymentObject.open();
                setLoadingPlan(null);

            } catch (error) {
                console.error(error);
                alert("Failed to start Razorpay checkout");
                setLoadingPlan(null);
            }
        } else {
            // Paddle Logic
            try {
                // @ts-ignore
                Paddle.Checkout.open({
                    product: planType === 'monthly' ? process.env.NEXT_PUBLIC_PADDLE_MONTHLY_ID : process.env.NEXT_PUBLIC_PADDLE_YEARLY_ID,
                    email: user.email,
                    successCallback: (data: any, err: any) => {
                        if (err) {
                            console.error(err);
                            alert("Paddle Checkout Error");
                        } else {
                            router.push("/payment-success");
                        }
                        setLoadingPlan(null);
                    },
                    closeCallback: () => {
                        setLoadingPlan(null);
                    }
                });
            } catch (error) {
                console.error("Paddle Error", error);
                setLoadingPlan(null);
            }
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1>Simple, Transparent Pricing</h1>
                <p>Invest in your education with our premium features</p>

                {/* Location Toggle */}
                <div className={styles.locationToggle}>
                    <Globe size={16} />
                    <span>Billing Location:</span>
                    <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value as 'IN' | 'INTL')}
                        className={styles.select}
                    >
                        <option value="IN">🇮🇳 India (UPI/Cards)</option>
                        <option value="INTL">🌍 International (Paddle)</option>
                    </select>
                </div>
            </header>

            <div className={styles.grid}>
                {/* Free Plan */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3>Free Starter</h3>
                        <div className={styles.price}>
                            <span className={styles.currency}>{country === 'IN' ? '₹' : '$'}</span>0
                            <span className={styles.period}>/mo</span>
                        </div>
                        <p>Perfect for trying out Studyflare</p>
                    </div>
                    <div className={styles.features}>
                        <FeatureItem text="3 AI Questions per day" />
                        <FeatureItem text="3 Note downloads per day" />
                        <FeatureItem text="Access to all free notes" />
                        <FeatureItem text="Basic quizzes" />
                    </div>
                    <Button variant="outline" fullWidth disabled>Current Plan</Button>
                </div>

                {/* Monthly Plan */}
                <div className={`${styles.card} ${styles.popular}`}>
                    <div className={styles.popularTag}>Most Popular</div>
                    <div className={styles.cardHeader}>
                        <h3>Pro Monthly</h3>
                        <div className={styles.price}>
                            <span className={styles.currency}>{country === 'IN' ? '₹' : '$'}</span>
                            {country === 'IN' ? '199' : '4.99'}
                            <span className={styles.period}>/mo</span>
                        </div>
                        <p>Unlock everything, cancel anytime</p>
                    </div>
                    <div className={styles.features}>
                        <FeatureItem text="Unlimited AI Questions" />
                        <FeatureItem text="Unlimited Note downloads" />
                        <FeatureItem text="Ad-free Experience" />
                        <FeatureItem text="Priority Support" />
                        <FeatureItem text="All AI Modes (Essay, Quiz)" />
                    </div>
                    <Button
                        variant="primary"
                        fullWidth
                        onClick={() => handleCheckout('monthly')}
                        disabled={loadingPlan === 'monthly'}
                    >
                        {loadingPlan === 'monthly' ? <Loader className={styles.spin} size={20} /> : "Get Started"}
                    </Button>
                </div>

                {/* Yearly Plan */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h3>Pro Yearly</h3>
                        <div className={styles.price}>
                            <span className={styles.currency}>{country === 'IN' ? '₹' : '$'}</span>
                            {country === 'IN' ? '1499' : '39.99'}
                            <span className={styles.period}>/yr</span>
                        </div>
                        <p>Save 37% compared to monthly</p>
                    </div>
                    <div className={styles.features}>
                        <FeatureItem text="Everything in Pro Monthly" />
                        <FeatureItem text="2 Months Free" />
                        <FeatureItem text="Exclusive Study Guides" />
                    </div>
                    <Button
                        variant="primary"
                        fullWidth
                        onClick={() => handleCheckout('yearly')}
                        disabled={loadingPlan === 'yearly'}
                    >
                        {loadingPlan === 'yearly' ? <Loader className={styles.spin} size={20} /> : "Get Started"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

function FeatureItem({ text }: { text: string }) {
    return (
        <div className={styles.feature}>
            <div className={styles.check}>
                <Check size={14} />
            </div>
            <span>{text}</span>
        </div>
    );
}
