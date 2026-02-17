import { blogPosts } from "@/data/blogs";
import styles from "./page.module.css";
import { Metadata } from "next";
import { User, Calendar, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Button from "@/components/Button";

interface BlogPostProps {
    params: { slug: string };
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
    const post = blogPosts.find(p => p.slug === params.slug);
    if (!post) return { title: "Post Not Found" };

    return {
        title: `${post.title} - Studyflare Blog`,
        description: post.excerpt,
        authors: [{ name: post.author }],
        openGraph: {
            type: "article",
            publishedTime: post.date,
            tags: post.tags,
        }
    };
}

import AdBanner from "@/components/AdBanner";

export default function BlogPostPage({ params }: BlogPostProps) {
    const post = blogPosts.find(p => p.slug === params.slug);

    if (!post) {
        return <div className={styles.container}><h1>Post not found</h1></div>;
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.imageUrl,
        "author": {
            "@type": "Person",
            "name": post.author
        },
        "datePublished": post.date,
        "description": post.excerpt,
    };

    return (
        <div className={styles.container}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <Link href="/blog" className={styles.backLink}>
                <ArrowLeft size={16} /> Back to Blog
            </Link>

            <AdBanner slot="blog-post-top" />

            <header className={styles.header}>
                <span className={styles.category}>{post.category}</span>
                <h1 className={styles.title}>{post.title}</h1>
                <div className={styles.meta}>
                    <span className={styles.metaItem}><User size={16} /> {post.author}</span>
                    <span className={styles.metaItem}><Calendar size={16} /> {post.date}</span>
                    <span className={styles.metaItem}><Clock size={16} /> {post.readTime}</span>
                </div>
            </header>

            <div className={styles.layout}>
                <article className={styles.content}>
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />

                    <div className={styles.tags}>
                        {post.tags.map(tag => <span key={tag} className={styles.tag}>#{tag}</span>)}
                    </div>
                </article>

                <aside className={styles.sidebar}>
                    <div className={styles.tocCard}>
                        <h3>Table of Contents</h3>
                        <ul className={styles.tocList}>
                            {/* In a real app, parse headings from content */}
                            <li><a href="#">Introduction</a></li>
                            <li><a href="#">Key Concepts</a></li>
                            <li><a href="#">Strategies</a></li>
                            <li><a href="#">Conclusion</a></li>
                        </ul>
                    </div>

                    <div className={styles.ctaCard}>
                        <h3>Need more help?</h3>
                        <p>Try our AI Homework Helper for instant answers.</p>
                        <Link href="/ai-helper">
                            <Button variant="primary" fullWidth size="sm">Ask AI Tutor</Button>
                        </Link>
                    </div>
                </aside>
            </div>
        </div>
    );
}
