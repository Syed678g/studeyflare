"use client";
import styles from "./AIModes.module.css";
import { BookOpen, PenTool, BrainCircuit, FileText, CheckSquare, Languages } from "lucide-react";

interface AIModesProps {
    currentMode: string;
    onSelectMode: (mode: string) => void;
}

export const MODES = [
    { id: "homework", label: "Homework Solver", icon: BookOpen, prompt: "Solve this problem step-by-step..." },
    { id: "explanation", label: "Explanation", icon: BrainCircuit, prompt: "Explain this concept simply..." },
    { id: "essay", label: "Essay Writer", icon: PenTool, prompt: "Write a short essay on..." },
    { id: "quiz", label: "Quiz Generator", icon: CheckSquare, prompt: "Create 5 MCQs about..." },
    { id: "summarizer", label: "Summarizer", icon: FileText, prompt: "Summarize this text..." },
    { id: "grammar", label: "Grammar Fixer", icon: Languages, prompt: "Fix the grammar in..." },
];

export default function AIModes({ currentMode, onSelectMode }: AIModesProps) {
    return (
        <div className={styles.container}>
            <h3>Select AI Mode</h3>
            <div className={styles.grid}>
                {MODES.map((mode) => (
                    <button
                        key={mode.id}
                        className={`${styles.modeBtn} ${currentMode === mode.id ? styles.active : ""}`}
                        onClick={() => onSelectMode(mode.id)}
                    >
                        <mode.icon size={20} className={styles.icon} />
                        <span>{mode.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
