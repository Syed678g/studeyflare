import Link from "next/link";
import { HelpCircle, Clock, Trophy } from "lucide-react";
import Button from "./Button";
import styles from "./QuizCard.module.css";

interface QuizCardProps {
    id: string;
    title: string;
    subject: string;
    questions: number;
    difficulty?: "Easy" | "Medium" | "Hard";
}

export default function QuizCard({ id, title, subject, questions, difficulty = "Medium" }: QuizCardProps) {
    const difficultyColor = {
        Easy: "#22C55E",
        Medium: "#FACC15",
        Hard: "#EF4444"
    }[difficulty];

    return (
        <div className={styles.card}>
            <div className={styles.iconWrapper}>
                <HelpCircle size={24} className={styles.icon} />
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <span className={styles.subject}>{subject}</span>
                    <span className={styles.difficulty} style={{ color: difficultyColor }}>{difficulty}</span>
                </div>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.meta}>
                    <span className={styles.metaItem}><HelpCircle size={14} /> {questions} Questions</span>
                    <span className={styles.metaItem}><Trophy size={14} /> +100 XP</span>
                </div>
                <div className={styles.action}>
                    <Link href={`/quiz/${id}`} style={{ width: '100%' }}>
                        <Button variant="primary" fullWidth size="sm">Start Quiz</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
