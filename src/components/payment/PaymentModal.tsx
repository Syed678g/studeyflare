"use client";
import React, { useState } from "react";
import styles from "./PaymentModal.module.css";
import Button from "@/components/Button";
import { CreditCard, Lock, CheckCircle, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface PaymentModalProps {
    plan: string;
    price: string;
    onClose: () => void;
}

export default function PaymentModal({ plan, price, onClose }: PaymentModalProps) {
    const { upgradeToPremium } = useAuth();
    const [step, setStep] = useState(1); // 1: Form, 2: Processing, 3: Success

    const handlePay = async (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);

        // Mock processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        upgradeToPremium();
        setStep(3);
    };

    if (step === 3) {
        return (
            <div className={styles.overlay}>
                <div className={styles.modal}>
                    <div className={styles.successContent}>
                        <CheckCircle size={64} className={styles.successIcon} />
                        <h2>Payment Successful!</h2>
                        <p>You are now a <strong>{plan}</strong> member.</p>
                        <Button variant="primary" onClick={onClose}>Continue to Dashboard</Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>Complete your upgrade</h2>
                    <button className={styles.closeBtn} onClick={onClose}><X size={20} /></button>
                </div>

                {step === 2 ? (
                    <div className={styles.processing}>
                        <div className={styles.spinner}></div>
                        <p>Processing payment securely...</p>
                    </div>
                ) : (
                    <div className={styles.content}>
                        <div className={styles.summary}>
                            <span>{plan}</span>
                            <span className={styles.price}>{price}</span>
                        </div>

                        <form onSubmit={handlePay} className={styles.form}>
                            <div className={styles.formGroup}>
                                <label>Card Information</label>
                                <div className={styles.inputWrapper}>
                                    <CreditCard className={styles.cardIcon} size={20} />
                                    <input type="text" placeholder="Card number" className={styles.input} required />
                                </div>
                                <div className={styles.row}>
                                    <input type="text" placeholder="MM/YY" className={styles.input} required />
                                    <input type="text" placeholder="CVC" className={styles.input} required />
                                </div>
                            </div>

                            <Button variant="primary" fullWidth>
                                Pay {price} <Lock size={16} style={{ marginLeft: 8 }} />
                            </Button>
                        </form>

                        <p className={styles.securityNote}>
                            <Lock size={12} /> Payments are secure and encrypted.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
