"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import { Download, Share2, AlertCircle, Eye, Calendar, User, ChevronRight } from "lucide-react";
import PremiumCTA from "@/components/PremiumCTA";
import AdBanner from "@/components/AdBanner";
import styles from "@/app/notes/[[...slug]]/page.module.css"; // Reuse existing styles

interface NoteDetailViewProps {
    note: any;
}

export default function NoteDetailView({ note }: NoteDetailViewProps) {
    const [downloadCount, setDownloadCount] = useState(0);
    const [isPremium, setIsPremium] = useState(false); // Mock user state
    const DOWNLOAD_LIMIT = 3;

    useEffect(() => {
        const count = parseInt(localStorage.getItem("studyflare_downloads") || "0");
        setDownloadCount(count);
    }, []);

    const handleDownload = () => {
        if (downloadCount >= DOWNLOAD_LIMIT && !isPremium) {
            alert("You have reached your daily download limit. Go Premium for unlimited access!");
            return;
        }

        // Mock download
        const newCount = downloadCount + 1;
        setDownloadCount(newCount);
        localStorage.setItem("studyflare_downloads", newCount.toString());
        alert(`Downloading ${note.title}... (Download ${newCount}/${DOWNLOAD_LIMIT})`);
    };

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": note.title,
        "author": {
            "@type": "Person",
            "name": note.author
        },
        "datePublished": note.date,
        "description": note.description,
    };

    return (
        <div className={styles.container}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Breadcrumbs slug={[note.grade.replace(/\s+/g, '-').toLowerCase(), note.subject.toLowerCase(), note.slug]} />

            <div className={styles.contentWrapper}>
                <AdBanner slot="top-banner" className={styles.adBanner} />

                <header className={styles.detailHeader}>
                    <div className={styles.metaTags}>
                        <span className={styles.tag}>{note.subject}</span>
                        <span className={styles.tag}>{note.grade}</span>
                        <span className={styles.tag}>{note.chapter}</span>
                    </div>
                    <h1 className={styles.detailTitle}>{note.title}</h1>
                    <div className={styles.metaStats}>
                        <span className={styles.stat}><User size={16} /> {note.author}</span>
                        <span className={styles.stat}><Calendar size={16} /> {note.date}</span>
                        <span className={styles.stat}><Eye size={16} /> {note.views} Views</span>
                    </div>
                </header>

                <div className={styles.actions}>
                    {downloadCount >= DOWNLOAD_LIMIT && !isPremium ? (
                        <div style={{ width: '100%', maxWidth: '600px' }}>
                            <PremiumCTA />
                        </div>
                    ) : (
                        <Button variant="primary" size="lg" onClick={handleDownload}>
                            Download PDF ({DOWNLOAD_LIMIT - downloadCount} left) <Download size={18} style={{ marginLeft: 8 }} />
                        </Button>
                    )}

                    {!(downloadCount >= DOWNLOAD_LIMIT && !isPremium) && (
                        <Button variant="outline" size="lg">Share Note <Share2 size={18} style={{ marginLeft: 8 }} /></Button>
                    )}
                </div>

                <div className={styles.pdfViewer}>
                    <div className={styles.pdfPlaceholder}>
                        <AlertCircle size={48} className={styles.pdfIcon} />
                        <h3>Preview Document</h3>
                        <p>{note.description}</p>
                    </div>
                </div>

                <div className={styles.description}>
                    <h3>About this Note</h3>
                    <p>{note.description}</p>
                    <div className={styles.topics}>
                        <h4>Topics Covered:</h4>
                        <ul>
                            {note.topics.map((t: string) => <li key={t}>{t}</li>)}
                        </ul>
                    </div>
                </div>

                <AdBanner slot="bottom-banner" />
            </div>
        </div>
    );
}

// Helper Breadcrumbs for Detail View
function Breadcrumbs({ slug }: { slug: string[] }) {
    const items = [
        { label: "Home", href: "/" },
        { label: "Notes", href: "/notes" },
    ];

    let currentPath = "/notes";
    slug.forEach(s => {
        currentPath += `/${s}`;
        items.push({ label: s.replace(/-/g, ' '), href: currentPath });
    });

    return (
        <nav className={styles.breadcrumbs}>
            {items.map((item, index) => (
                <span key={item.href} className={styles.crumbItem}>
                    <Link href={item.href} className={styles.crumbLink}>{item.label}</Link>
                    {index < items.length - 1 && <ChevronRight size={14} className={styles.crumbIcon} />}
                </span>
            ))}
        </nav>
    );
}
