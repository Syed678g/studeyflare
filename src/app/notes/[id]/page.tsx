import Button from "@/components/Button";
import { Download, Share2, AlertCircle } from "lucide-react";
import styles from "./page.module.css";

export default function NoteDetailPage({ params }: { params: { id: string } }) {
    // In a real app, fetch note data based on params.id
    const note = {
        id: params.id,
        title: "Organic Chemistry Basics",
        subject: "Chemistry",
        grade: "Grade 11",
        author: "Dr. Sarah Smith",
        date: "Oct 12, 2023",
        description: "This comprehensive guide covers the fundamentals of organic chemistry, including nomenclature, structure, and bonding of alkanes, alkenes, and alkynes. It also includes practice problems and detailed reaction mechanisms.",
    };

    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                <header className={styles.header}>
                    <div className={styles.meta}>
                        <span className={styles.tag}>{note.subject}</span>
                        <span className={styles.tag}>{note.grade}</span>
                    </div>
                    <h1 className={styles.title}>{note.title}</h1>
                    <div className={styles.authorInfo}>
                        <p>By <span className={styles.author}>{note.author}</span> • {note.date}</p>
                    </div>
                </header>

                <div className={styles.actions}>
                    <Button variant="primary">Download PDF <Download size={18} style={{ marginLeft: 8 }} /></Button>
                    <Button variant="outline">Share <Share2 size={18} style={{ marginLeft: 8 }} /></Button>
                </div>

                <div className={styles.pdfViewer}>
                    <div className={styles.pdfPlaceholder}>
                        <AlertCircle size={48} className={styles.pdfIcon} />
                        <h3>PDF Preview Unavailable</h3>
                        <p>This is a demo. In a real application, the PDF viewer would be embedded here.</p>
                        <Button variant="ghost" size="sm">Click to Download</Button>
                    </div>
                </div>

                <div className={styles.description}>
                    <h3>Description</h3>
                    <p>{note.description}</p>
                </div>
            </div>
        </div>
    );
}
