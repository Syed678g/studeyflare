import { blogPosts, blogCategories } from "@/data/blogs";
import Link from "next/link";
import styles from "./page.module.css";
import Button from "@/components/Button";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Metadata } from "next";
import AdBanner from "@/components/AdBanner";

export const metadata: Metadata = {
    title: "Study Tips & Educational Blog - Studyflare",
    description: "Read the latest study tips, exam strategies, and educational news from our expert team.",
};

export default function BlogPage() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Studyflare Blog</h1>
                <p className={styles.subtitle}>Insights, tips, and strategies for better learning.</p>
            </header>

            <AdBanner slot="blog-header" />

            <div className={styles.categories}>
                {blogCategories.map((cat) => (
                    <button key={cat} className={styles.categoryBtn}>{cat}</button>
                ))}
            </div>

            <div className={styles.grid}>
                {blogPosts.map((post) => (
                    <div key={post.id} className={styles.card}>
                        <div className={styles.cardContent}>
                            <span className={styles.categoryTag}>{post.category}</span>
                            <h2 className={styles.cardTitle}>{post.title}</h2>
                            <p className={styles.cardExcerpt}>{post.excerpt}</p>
                            <div className={styles.cardMeta}>
                                <span className={styles.metaItem}><Calendar size={14} /> {post.date}</span>
                                <span className={styles.metaItem}><Clock size={14} /> {post.readTime}</span>
                            </div>
                        </div>
                        <div className={styles.cardFooter}>
                            <Link href={`/blog/${post.slug}`}>
                                <Button variant="ghost" fullWidth size="sm">Read Article <ArrowRight size={16} style={{ marginLeft: 6 }} /></Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
