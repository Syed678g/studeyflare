import { notes } from "@/data/notes";
import NoteCard from "@/components/NoteCard";
import styles from "./page.module.css";
import { Search, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import NoteDetailView from "@/components/NoteDetailView";

interface NotesPageProps {
    params: { slug?: string[] };
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: NotesPageProps): Promise<Metadata> {
    const slug = params.slug;
    if (!slug) {
        return {
            title: "All Study Notes - Studyflare",
            description: "Browse our collection of free study notes for all classes and subjects.",
        };
    }

    // Logic to handle /grade/subject specific metadata
    if (slug.length === 1) {
        return {
            title: `${slug[0].replace(/-/g, ' ').toUpperCase()} Notes`,
            description: `Free study notes for ${slug[0].replace(/-/g, ' ')}.`,
        };
    }

    if (slug.length === 2) {
        return {
            title: `${slug[1].toUpperCase()} Notes for ${slug[0].replace(/-/g, ' ').toUpperCase()}`,
            description: `Download free ${slug[1]} notes for ${slug[0]}.`,
        };
    }

    // Note detail
    const noteSlug = slug[slug.length - 1];
    const note = notes.find(n => n.slug === noteSlug);
    return {
        title: note ? `${note.title} - Free Download` : "Note Not Found",
        description: note?.description || "Study notes",
    };
}

export default function NotesPage({ params }: NotesPageProps) {
    const slug = params.slug || [];

    // Is this a detail page? (Length 3 = /grade/subject/note-slug)
    // Ideally, we check if the last segment matches a note slug
    const noteDetail = notes.find(n => n.slug === slug[slug.length - 1]);

    if (noteDetail) {
        return <NoteDetailView note={noteDetail} />;
    }

    // Filter logic based on slug
    let filteredNotes = notes;
    let title = "All Notes";

    if (slug.length > 0) {
        // Basic routing logic: /grade/subject
        const [grade, subject] = slug;

        // Check if first param is grade
        if (grade) {
            filteredNotes = filteredNotes.filter(n => n.grade.toLowerCase().replace(/\s+/g, '-') === grade.toLowerCase());
            title = grade.replace(/-/g, ' ').toUpperCase();
        }

        if (subject) {
            filteredNotes = filteredNotes.filter(n => n.subject.toLowerCase() === subject.toLowerCase());
            title += ` • ${subject.charAt(0).toUpperCase() + subject.slice(1)}`;
        }
    }

    return (
        <div className={styles.container}>
            <Breadcrumbs slug={slug} />

            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.subtitle}>Found {filteredNotes.length} resources</p>
                </div>

                <div className={styles.searchBar}>
                    <Search className={styles.searchIcon} size={20} />
                    <input
                        type="text"
                        placeholder="Search within these notes..."
                        className={styles.searchInput}
                    />
                </div>
            </header>

            <div className={styles.mainLayout}>
                <aside className={styles.sidebar}>
                    <div className={styles.filterGroup}>
                        <h3>Refine Selection</h3>
                        {/* Advanced filters would go here */}
                        <p className={styles.filterHint}>Use the URL or navigation to filter by Grade and Subject.</p>
                        <div className={styles.quickLinks}>
                            <Link href="/notes/grade-10" className={styles.quickLink}>Grade 10</Link>
                            <Link href="/notes/grade-11" className={styles.quickLink}>Grade 11</Link>
                            <Link href="/notes/grade-12" className={styles.quickLink}>Grade 12</Link>
                        </div>
                    </div>
                </aside>

                <div className={styles.notesGrid}>
                    {filteredNotes.length > 0 ? (
                        filteredNotes.map((note) => (
                            <NoteCard
                                key={note.id}
                                {...note}
                                summary={note.description} // Map description to summary
                                // Override link to use SEO friendly URL
                                id={note.slug}
                            />
                        ))
                    ) : (
                        <p>No notes found for this category.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

// Sub-components
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
