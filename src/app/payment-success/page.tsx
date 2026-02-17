"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { CheckCircle, ArrowRight } from "lucide-react";
import Button from "@/components/Button";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function PaymentSuccessPage() {
    const { user, upgradeToPremium } = useAuth();

    useEffect(() => {
        // Trigger a sync when landing here to update local state immediately
        if (user) {
            upgradeToPremium();
        }
    }, [user]);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <CheckCircle size={80} className={styles.icon} />
                <h1>Premium Activated!</h1>
                <p>Thank you for subscribing. You now have unlimited access to AI questions and downloads.</p>
                <div className={styles.actions}>
                    <Link href="/dashboard">
                        <Button variant="primary">Go to Dashboard <ArrowRight size={16} style={{ marginLeft: 8 }} /></Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
