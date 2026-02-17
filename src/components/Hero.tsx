import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import Button from "./Button";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <h1 className={styles.title}>
                        Master Your Studies with <span className={styles.highlight}>Smart Notes</span> & <span className={styles.highlight}>AI Help</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Access thousands of free notes, practice with quizzes, and get instant homework help from our AI tutor. Learning has never been this easy.
                    </p>

                    <div className={styles.actions}>
                        <Link href="/notes">
                            <Button variant="primary" size="lg">Explore Notes <ArrowRight size={20} style={{ marginLeft: 8 }} /></Button>
                        </Link>
                        <Link href="/ai-helper">
                            <Button variant="outline" size="lg">Try AI Helper</Button>
                        </Link>
                    </div>

                    <div className={styles.searchBar}>
                        <Search className={styles.searchIcon} size={20} />
                        <input
                            type="text"
                            placeholder="Search for notes, subjects, or topics..."
                            className={styles.searchInput}
                        />
                        <Button variant="primary" size="md">Search</Button>
                    </div>

                    <div className={styles.stats}>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>10k+</span>
                            <span className={styles.statLabel}>Notes</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>5k+</span>
                            <span className={styles.statLabel}>Quizzes</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>24/7</span>
                            <span className={styles.statLabel}>AI Support</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
