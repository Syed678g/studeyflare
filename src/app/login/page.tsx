"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.css";
import Link from "next/link";
import Button from "@/components/Button";
import { Mail, Lock, AlertCircle } from "lucide-react";

export default function LoginPage() {
    const { login, isLoading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            await login(email);
        } catch (err) {
            setError("Failed to login. Please try again.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1>Welcome Back</h1>
                    <p>Login to continue your learning journey</p>
                </div>

                {error && (
                    <div className={styles.error}>
                        <AlertCircle size={18} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
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

                    <div className={styles.forgotPassword}>
                        <Link href="/forgot-password">hard to remember?</Link>
                    </div>

                    <Button variant="primary" fullWidth disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>

                    <div className={styles.divider}>
                        <span>or continue with</span>
                    </div>

                    <button type="button" className={styles.googleBtn} onClick={() => login("google-user@gmail.com")}>
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} />
                        Google
                    </button>
                </form>

                <div className={styles.footer}>
                    <p>Don't have an account? <Link href="/signup">Sign up for free</Link></p>
                </div>
            </div>
        </div>
    );
}
