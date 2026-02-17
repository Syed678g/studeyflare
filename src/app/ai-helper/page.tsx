"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import styles from "./page.module.css";
import ChatInterface from "@/components/chat/ChatInterface";
import AIModes from "@/components/chat/AIModes";
import Button from "@/components/Button";
import { MessageSquare, Settings, History, Lock } from "lucide-react";

export default function AIHelperPage() {
    const { user, incrementAIUsage } = useAuth();
    const [currentMode, setCurrentMode] = useState("homework");
    const [usageLimitReached, setUsageLimitReached] = useState(false);

    // Check initial limit on load
    useEffect(() => {
        if (user && user.plan === 'free' && user.usage.questionsCount >= 10) {
            setUsageLimitReached(true);
        } else if (!user) {
            // Guest check logic
            const guestUsage = parseInt(localStorage.getItem("studyflare_guest_usage") || "0");
            if (guestUsage >= 3) setUsageLimitReached(true);
        }
    }, [user]);

    const handleSendMessage = async (message: string): Promise<string> => {
        // Enforce limits
        const allowed = incrementAIUsage();
        if (!allowed) {
            setUsageLimitReached(true);
            throw new Error("Limit reached");
        }

        // Mock AI Response with delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simple mock logic based on mode
        let response = "";
        switch (currentMode) {
            case "homework":
                response = `**Solution:**\n\nHere is a step-by-step breakdown of your question: "${message}"\n\n1. **Analyze the problem**: identify the key variables.\n2. **Apply the formula**: Use the standard equation.\n3. **Calculation**: The result is derived from...\n\nHOPE THIS HELPS!`;
                break;
            case "explanation":
                response = `**Explanation:**\n\nThe concept of "${message}" can be understood as follows...\n\nImagine a scenario where...`;
                break;
            case "essay":
                response = `**Essay Draft:**\n\nTitle: Reflections on ${message}\n\nIn recent years, the topic of ${message} has garnered significant attention...`;
                break;
            case "quiz":
                response = `**Practice Quiz:**\n\n1. What is the main characteristic of ${message}?\n   a) Option A\n   b) Option B\n\n2. When did ${message} occur?\n   a) 1990\n   b) 2000`;
                break;
            default:
                response = `I have received your request regarding "${message}".`;
        }

        return response;
    };

    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h2>History</h2>
                    <Button variant="ghost" size="sm"><History size={16} /></Button>
                </div>
                <div className={styles.historyList}>
                    <div className={styles.historyItem}>
                        <MessageSquare size={16} />
                        <span>Algebra Quadratics</span>
                    </div>
                    <div className={styles.historyItem}>
                        <MessageSquare size={16} />
                        <span>Photosynthesis Essay</span>
                    </div>
                    <div className={styles.historyItem}>
                        <MessageSquare size={16} />
                        <span>French Revolution Date</span>
                    </div>
                </div>
                {!user || user.plan === 'free' ? (
                    <div className={styles.premiumAd}>
                        <Lock size={20} />
                        <p>Unlock Unlimited AI</p>
                        <Button variant="primary" size="sm" fullWidth>Go Premium</Button>
                    </div>
                ) : null}
            </aside>

            <main className={styles.mainContent}>
                <header className={styles.header}>
                    <h1>AI Homework Helper</h1>
                    <p>Powered by advanced AI models</p>
                </header>

                <AIModes currentMode={currentMode} onSelectMode={setCurrentMode} />

                <ChatInterface
                    mode={currentMode}
                    onSendMessage={handleSendMessage}
                    usageLimitReached={usageLimitReached}
                />
            </main>
        </div>
    );
}
