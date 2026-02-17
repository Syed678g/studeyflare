"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./ChatInterface.module.css";
import { Send, User, Bot, Copy, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react";
import Button from "@/components/Button";

interface Message {
    id: string;
    role: "user" | "ai";
    content: string;
    timestamp: Date;
}

interface ChatInterfaceProps {
    mode: string;
    onSendMessage: (message: string) => Promise<string>;
    usageLimitReached: boolean;
}

export default function ChatInterface({ mode, onSendMessage, usageLimitReached }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "ai",
            content: `Hello! I'm your AI Study Assistant. I'm currently in **${mode}** mode. How can I help you today?`,
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    // Update welcome message when mode changes
    useEffect(() => {
        setMessages(prev => [
            ...prev,
            {
                id: Date.now().toString(),
                role: "ai",
                content: `Switched to **${mode}** mode.`,
                timestamp: new Date()
            }
        ]);
    }, [mode]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!input.trim() || isTyping || usageLimitReached) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        try {
            const response = await onSendMessage(userMsg.content);
            const aiMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: response,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            // Error handling handled by parent mostly, but we can show error message here
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: "Sorry, I encountered an error. Please try again.",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Could show toast here
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.messagesArea}>
                {messages.map((msg) => (
                    <div key={msg.id} className={`${styles.message} ${msg.role === "user" ? styles.userMessage : styles.aiMessage}`}>
                        <div className={styles.avatar}>
                            {msg.role === "user" ? <User size={20} /> : <Bot size={20} />}
                        </div>
                        <div className={styles.messageContent}>
                            <div className={styles.bubble}>
                                {/* Basic markdown rendering could go here */}
                                <p>{msg.content}</p>
                            </div>
                            {msg.role === "ai" && (
                                <div className={styles.actions}>
                                    <button onClick={() => copyToClipboard(msg.content)} title="Copy"><Copy size={14} /></button>
                                    <button title="Regenerate"><RefreshCw size={14} /></button>
                                    <button title="Helpful"><ThumbsUp size={14} /></button>
                                    <button title="Not Helpful"><ThumbsDown size={14} /></button>
                                </div>
                            )}
                            <span className={styles.timestamp}>
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className={`${styles.message} ${styles.aiMessage}`}>
                        <div className={styles.avatar}><Bot size={20} /></div>
                        <div className={`${styles.bubble} ${styles.typing}`}>
                            <span></span><span></span><span></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className={styles.inputArea}>
                {usageLimitReached ? (
                    <div className={styles.limitReached}>
                        <p>You have reached your daily limit.</p>
                        <Button variant="primary" size="sm">Upgrade to Premium</Button>
                    </div>
                ) : (
                    <form onSubmit={handleSend} className={styles.inputForm}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={`Ask anything in ${mode} mode...`}
                            className={styles.input}
                        />
                        <button type="submit" className={styles.sendBtn} disabled={!input.trim() || isTyping}>
                            <Send size={20} />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
