export interface Note {
    id: string;
    title: string;
    slug: string;
    subject: string;
    grade: string;
    chapter: string;
    topics: string[];
    author: string;
    date: string;
    description: string;
    content?: string; // HTML or Markdown content
    pdfUrl?: string; // URL to the PDF file
    views: number;
    downloads: number;
    rating: number;
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string; // HTML content
    author: string;
    date: string;
    readTime: string;
    category: "Study Tips" | "Notes" | "Exam Prep" | "AI Learning";
    tags: string[];
    imageUrl?: string;
}

export interface Quiz {
    id: string;
    title: string;
    slug: string;
    subject: string;
    questionsCount: number;
    difficulty: "Easy" | "Medium" | "Hard";
    plays: number;
}
