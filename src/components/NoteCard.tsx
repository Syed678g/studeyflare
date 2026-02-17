import Link from "next/link";
import { FileText, Download, Clock } from "lucide-react";
import Button from "./Button";
import styles from "./NoteCard.module.css";

interface NoteCardProps {
    id: string;
    title: string;
    subject: string;
    grade: string;
    summary: string;
    date?: string;
}

export default function NoteCard({ id, title, subject, grade, summary, date = "Recently" }: NoteCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.iconWrapper}>
                <FileText size={24} className={styles.icon} />
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <span className={styles.subject}>{subject}</span>
                    <span className={styles.grade}>{grade}</span>
                </div>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.summary}>{summary}</p>
                <div className={styles.footer}>
                    <span className={styles.date}><Clock size={14} /> {date}</span>
                    <Link href={`/notes/${id}`}>
                        <Button variant="outline" size="sm">View Note</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
