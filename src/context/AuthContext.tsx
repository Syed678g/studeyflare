"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface UserUsage {
    date: string; // YYYY-MM-DD
    questionsCount: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    plan: 'free' | 'premium';
    planEndDate?: string;
    subscriptionId?: string;
    usage: UserUsage;
    joinDate: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string) => Promise<void>;
    signup: (name: string, email: string) => Promise<void>;
    logout: () => void;
    upgradeToPremium: () => void;
    incrementAIUsage: () => boolean; // Returns true if allowed, false if limit reached
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Load user from local storage
        const storedUser = localStorage.getItem("studyflare_user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    // Sync user with server
    const syncUser = async (email: string, name?: string) => {
        try {
            const res = await fetch("/api/auth/me", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, name }),
            });
            const data = await res.json();

            if (data.user) {
                setUser(data.user);
                localStorage.setItem("studyflare_user", JSON.stringify(data.user));
                return data.user;
            }
        } catch (error) {
            console.error("Failed to sync user", error);
        }
        return null;
    };

    const login = async (email: string) => {
        setIsLoading(true);
        await syncUser(email);
        setIsLoading(false);
        router.push("/dashboard");
    };

    const signup = async (name: string, email: string) => {
        setIsLoading(true);
        await syncUser(email, name);
        setIsLoading(false);
        router.push("/dashboard");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("studyflare_user");
        router.push("/login");
    };

    const upgradeToPremium = () => {
        // In real Stripe flow, user is redirected.
        // However, for testing without webhook locally, we might want a manual refresh.
        if (user) {
            syncUser(user.email);
        }
    };

    const incrementAIUsage = (): boolean => {
        if (!user) {
            // Guest usage logic could be handled here or in component
            // For now, let's say guests get 3
            const guestUsage = parseInt(localStorage.getItem("studyflare_guest_usage") || "0");
            if (guestUsage >= 3) return false;
            localStorage.setItem("studyflare_guest_usage", (guestUsage + 1).toString());
            return true;
        }

        const today = new Date().toISOString().split('T')[0];
        let currentUsage = user.usage;

        // Reset if new day
        if (currentUsage.date !== today) {
            currentUsage = { date: today, questionsCount: 0 };
        }

        // Check limits
        if (user.plan === 'free' && currentUsage.questionsCount >= 10) {
            return false;
        }

        // Increment
        const updatedUser = {
            ...user,
            usage: { ...currentUsage, questionsCount: currentUsage.questionsCount + 1 }
        };

        setUser(updatedUser);
        localStorage.setItem("studyflare_user", JSON.stringify(updatedUser));
        return true;
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout, upgradeToPremium, incrementAIUsage }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
