"use client";
import Link from "next/link";
import styles from "../payment-success/page.module.css"; // Reuse success styles
import { XCircle, ArrowLeft } from "lucide-react";
import Button from "@/components/Button";

export default function PaymentCancelPage() {
    return (
        <div className={styles.container} style={{ background: 'radial-gradient(circle at center, rgba(239, 68, 68, 0.1) 0%, transparent 70%)' }}>
            <div className={styles.card}>
                <XCircle size={80} className={styles.icon} style={{ color: '#ef4444' }} />
                <h1>Payment Cancelled</h1>
                <p>Your payment process was cancelled. No charges were made.</p>
                <div className={styles.actions}>
                    <Link href="/pricing">
                        <Button variant="outline"><ArrowLeft size={16} style={{ marginRight: 8 }} /> Return to Pricing</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
