import Link from "next/link";
import { BookOpen, Github, Twitter, Linkedin } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Brand Column */}
                    <div className={styles.brandCol}>
                        <Link href="/" className={styles.logo}>
                            <BookOpen size={24} color="#3B82F6" />
                            <span>Studyflare</span>
                        </Link>
                        <p className={styles.description}>
                            Empowering students worldwide with free top-quality notes, quizzes, and AI-driven study assistance.
                        </p>
                        <div className={styles.socials}>
                            <a href="#" className={styles.socialLink} aria-label="Twitter"><Twitter size={20} /></a>
                            <a href="#" className={styles.socialLink} aria-label="GitHub"><Github size={20} /></a>
                            <a href="#" className={styles.socialLink} aria-label="LinkedIn"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className={styles.linksCol}>
                        <h4>Platform</h4>
                        <Link href="/notes">Notes Library</Link>
                        <Link href="/quiz">Quiz Practice</Link>
                        <Link href="/ai-helper">AI Helper</Link>
                        <Link href="/pricing">Pricing</Link>
                    </div>

                    <div className={styles.linksCol}>
                        <h4>Company</h4>
                        <Link href="/about">About Us</Link>
                        <Link href="/contact">Contact</Link>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                    </div>

                    <div className={styles.linksCol}>
                        <h4>Resources</h4>
                        <Link href="/blog">Blog</Link>
                        <Link href="/guides">Study Guides</Link>
                        <Link href="/community">Community</Link>
                        <Link href="/help">Help Center</Link>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; {new Date().getFullYear()} Studyflare. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
