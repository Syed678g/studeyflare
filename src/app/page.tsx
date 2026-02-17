import Hero from "@/components/Hero";
import NoteCard from "@/components/NoteCard";
import QuizCard from "@/components/QuizCard";
import styles from "./page.module.css";
import { Book, Calculator, FlaskConical, Globe, History, Code } from "lucide-react";

export default function Home() {
  const featuredNotes = [
    { id: "1", title: "Organic Chemistry Basics", subject: "Chemistry", grade: "Grade 11", summary: "Comprehensive guide to alkanes, alkenes, and alkynes with reaction mechanisms.", date: "2 days ago" },
    { id: "2", title: "Calculus: Limits & Derivatives", subject: "Math", grade: "Grade 12", summary: "Key formulas and solved examples for limits and differentiation provided.", date: "5 days ago" },
    { id: "3", title: "World War II History", subject: "History", grade: "Grade 10", summary: "Detailed timeline of major events, causes, and consequences of WWII.", date: "1 week ago" },
  ];

  const recentQuizzes = [
    { id: "1", title: "Physics: Laws of Motion", subject: "Physics", questions: 15, difficulty: "Medium" as const },
    { id: "2", title: "Biology: Cell Structure", subject: "Biology", questions: 20, difficulty: "Easy" as const },
    { id: "3", title: "Periodic Table Challenge", subject: "Chemistry", questions: 25, difficulty: "Hard" as const },
  ];

  const categories = [
    { name: "Mathematics", count: "1,240 Notes", icon: <Calculator /> },
    { name: "Science", count: "850 Notes", icon: <FlaskConical /> },
    { name: "History", count: "420 Notes", icon: <History /> },
    { name: "Computer Sci", count: "320 Notes", icon: <Code /> },
    { name: "English", count: "550 Notes", icon: <Book /> },
    { name: "Geography", count: "210 Notes", icon: <Globe /> },
  ];

  return (
    <main className={styles.main}>
      <Hero />

      {/* Categories Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Browse by Subject</h2>
              <p className={styles.sectionSubtitle}>Find study materials for your favorite subjects</p>
            </div>
          </div>
          <div className={styles.categoryGrid}>
            {categories.map((cat, index) => (
              <div key={index} className={styles.categoryCard}>
                <div className={styles.categoryIcon}>{cat.icon}</div>
                <span className={styles.categoryName}>{cat.name}</span>
                <span className={styles.categoryCount}>{cat.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Notes Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Featured Notes</h2>
              <p className={styles.sectionSubtitle}>Top-rated study materials from our community</p>
            </div>
          </div>
          <div className={styles.grid}>
            {featuredNotes.map((note) => (
              <NoteCard key={note.id} {...note} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Quizzes Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Practice Quizzes</h2>
              <p className={styles.sectionSubtitle}>Test your knowledge and earn XP</p>
            </div>
          </div>
          <div className={styles.grid}>
            {recentQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} {...quiz} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
