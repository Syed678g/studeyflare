"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "../login/page.module.css"; // Reuse login styles
import Link from "next/link";
import Button from "@/components/Button";
import { Mail, Lock, User, AlertCircle } from "lucide-react";

export default function SignupPage() {
    const { signup, isLoading } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!name || !email || !password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            await signup(name, email);
        } catch (err) {
            setError("Failed to create account. Please try again.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1>Create Account</h1>
                    <p>Join Studyflare for free today</p>
                </div>

                {error && (
                    <div className={styles.error}>
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Full Name</label>
                        <div className={styles.inputWrapper}>
                            <User className={styles.inputIcon} size={20} />
                            <input
                                type="text"
                                id="name"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email">Email Address</label>
                        <div className={styles.inputWrapper}>
                            <Mail className={styles.inputIcon} size={20} />
                            <input
                                type="email"
                                id="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <div className={styles.inputWrapper}>
                            <Lock className={styles.inputIcon} size={20} />
                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={styles.input}
                            />
                        </div>
                    </div>

                    <Button variant="primary" fullWidth disabled={isLoading}>
                        {isLoading ? "Creating Account..." : "Sign Up"}
                    </Button>

                    <div className={styles.divider}>
                        <span>or sign up with</span>
                    </div>

                    <button type="button" className={styles.googleBtn} onClick={() => signup("Google User", "google-user@gmail.com")}>
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} />
                        Google
                    </button>
                </form>

                <div className={styles.footer}>
                    <p>Already have an account? <Link href="/login">Log in</Link></p>
                </div>
            </div>
        </div>
    );
}
