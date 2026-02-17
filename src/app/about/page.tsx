import styles from "./page.module.css";
import { Users, Globe, BookOpen } from "lucide-react";

export default function AboutPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>About Studyflare</h1>
                <p className={styles.subtitle}>Our mission is to make high-quality education accessible to everyone, everywhere.</p>
            </header>

            <div className={styles.content}>
                <div className={styles.section}>
                    <h2>Who We Are</h2>
                    <p>Studyflare is a global community of students and educators dedicated to sharing knowledge. Founded in 2024, we started with a simple idea: that study materials should be free, easy to access, and fun to use.</p>
                </div>

                <div className={styles.valuesGrid}>
                    <div className={styles.valueCard}>
                        <Globe className={styles.icon} size={32} />
                        <h3>Global Access</h3>
                        <p>We believe in breaking down geographical barriers to education.</p>
                    </div>
                    <div className={styles.valueCard}>
                        <Users className={styles.icon} size={32} />
                        <h3>Community Driven</h3>
                        <p>Our content is created and curated by students, for students.</p>
                    </div>
                    <div className={styles.valueCard}>
                        <BookOpen className={styles.icon} size={32} />
                        <h3>Quality First</h3>
                        <p>We ensure all notes and quizzes meet high academic standards.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
