import QuizCard from "@/components/QuizCard";
import styles from "./page.module.css";
import { Search } from "lucide-react";

const quizzes = [
    { id: "1", title: "Physics: Laws of Motion", subject: "Physics", questions: 15, difficulty: "Medium" as const },
    { id: "2", title: "Biology: Cell Structure", subject: "Biology", questions: 20, difficulty: "Easy" as const },
    { id: "3", title: "Periodic Table Challenge", subject: "Chemistry", questions: 25, difficulty: "Hard" as const },
    { id: "4", title: "World Capitals", subject: "Geography", questions: 50, difficulty: "Medium" as const },
    { id: "5", title: "Calculus Limits", subject: "math", questions: 10, difficulty: "Hard" as const },
];

export default function QuizListPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>Quiz Arena</h1>
                    <p className={styles.subtitle}>Test your skills and climb the leaderboard.</p>
                </div>

                <div className={styles.searchBar}>
                    <Search className={styles.searchIcon} size={20} />
                    <input
                        type="text"
                        placeholder="Search quizzes..."
                        className={styles.searchInput}
                    />
                </div>
            </header>

            <div className={styles.grid}>
                {quizzes.map((quiz) => (
                    <QuizCard key={quiz.id} {...quiz} />
                ))}
            </div>
        </div>
    );
}
