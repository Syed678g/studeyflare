"use client";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Button from "@/components/Button";
import { User, BookOpen, MessageSquare, Download, CreditCard, LogOut, Settings } from "lucide-react";

export default function DashboardPage() {
    const { user, logout, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        }
    }, [user, isLoading, router]);

    if (isLoading || !user) {
        return <div className={styles.loading}>Loading dashboard...</div>;
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.userInfo}>
                    <div className={styles.avatar}>
                        <User size={32} />
                    </div>
                    <div>
                        <h1>Hello, {user.name}</h1>
                        <p>{user.email}</p>
                    </div>
                </div>
                <Button variant="outline" onClick={logout}>
                    <LogOut size={16} style={{ marginRight: 8 }} /> Sortie
                </Button>
            </header>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.icon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <h3>Current Plan</h3>
                        <p className={styles.planName}>{user.plan === 'premium' ? 'Premium' : 'Free Plan'}</p>
                        {user.plan === 'free' && (
                            <Button variant="primary" size="sm" style={{ marginTop: 8 }} onClick={() => router.push("/pricing")}>
                                Upgrade to Premium
                            </Button>
                        )}
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.icon} style={{ background: 'rgba(168, 85, 247, 0.1)', color: '#a855f7' }}>
                        <MessageSquare size={24} />
                    </div>
                    <div>
                        <h3>AI Questions</h3>
                        <p className={styles.statValue}>{user.usage.questionsCount} / {user.plan === 'premium' ? '∞' : '10'}</p>
                        <p className={styles.statLabel}>Used today</p>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.icon} style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                        <Download size={24} />
                    </div>
                    <div>
                        <h3>Downloads</h3>
                        <p className={styles.statValue}>{localStorage.getItem("studyflare_downloads") || 0}</p>
                        <p className={styles.statLabel}>Total downloads</p>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h2>Recent Activity</h2>
                <div className={styles.emptyState}>
                    <BookOpen size={48} />
                    <p>No recent activity found. Start exploring!</p>
                    <div className={styles.actions}>
                        <Button onClick={() => router.push("/notes")}>Explore Notes</Button>
                        <Button variant="outline" onClick={() => router.push("/ai-helper")}>Ask AI Helper</Button>
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <h2>Account Settings</h2>
                <div className={styles.settingsList}>
                    <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                            <Settings size={20} />
                            <span>Profile Settings</span>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                    </div>
                    <div className={styles.settingItem}>
                        <div className={styles.settingInfo}>
                            <Lock size={20} />
                            <span>Change Password</span>
                        </div>
                        <Button variant="ghost" size="sm">Update</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Fix icon import in Button
import { Lock } from "lucide-react";
