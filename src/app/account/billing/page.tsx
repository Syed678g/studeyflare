"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useAuth, User } from "@/context/AuthContext";
import Button from "@/components/Button";
import { CreditCard, Calendar, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BillingPage() {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return <div className={styles.loading}>Loading billing info...</div>;
    }

    const currentUser = user as User;
    const expiryDate = currentUser.planEndDate ? new Date(currentUser.planEndDate).toLocaleDateString() : null;

    return (
        <div className={styles.container}>
            <h1>Billing & Subscription</h1>

            <div className={styles.grid}>
                {/* Current Plan Card */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <CreditCard size={24} className={styles.icon} />
                        <h2>Current Plan</h2>
                    </div>
                    <div className={styles.planDetails}>
                        <div className={styles.status}>
                            <span className={user.plan === 'premium' ? styles.premiumBadge : styles.freeBadge}>
                                {user.plan === 'premium' ? "PREMIUM" : "FREE"}
                            </span>
                        </div>
                        {user.plan === 'premium' && expiryDate && (
                            <p className={styles.expiry}>
                                <Calendar size={16} /> Renews on: <strong>{expiryDate}</strong>
                            </p>
                        )}
                        {user.plan === 'free' && (
                            <p className={styles.expiry}>
                                You are on the free plan. Upgrade to unlock unlimited access.
                            </p>
                        )}
                    </div>
                    <div className={styles.actions}>
                        {user.plan === 'free' ? (
                            <Link href="/pricing">
                                <Button variant="primary" fullWidth>Upgrade to Premium</Button>
                            </Link>
                        ) : (
                            user.subscriptionId?.startsWith('sub_') ? (
                                <a href="https://checkout.paddle.com/portal" target="_blank" rel="noopener noreferrer">
                                    <Button variant="outline" fullWidth>Manage Subscription (Paddle)</Button>
                                </a>
                            ) : (
                                <Link href="/pricing">
                                    <Button variant="outline" fullWidth>Manage / Extend Plan</Button>
                                </Link>
                            )
                        )}
                    </div>
                </div>

                {/* Billing History (Mock) */}
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2>Payment History</h2>
                    </div>
                    <p className={styles.emptyState}>No recent invoices found.</p>
                </div>
            </div>
        </div>
    );
}
