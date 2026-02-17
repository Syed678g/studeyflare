import { MetadataRoute } from "next";
import { notes } from "@/data/notes";
import { blogPosts } from "@/data/blogs";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://studyflare.com"; // Replace with real domain

    // Static routes
    const routes = [
        "",
        "/notes",
        "/quiz",
        "/ai-helper",
        "/about",
        "/contact",
        "/privacy",
        "/terms",
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1,
    }));

    // Dynamic Notes routes
    const noteRoutes = notes.map((note) => ({
        url: `${baseUrl}/notes/${note.grade.replace(/\s+/g, '-').toLowerCase()}/${note.subject.toLowerCase()}/${note.slug}`,
        lastModified: new Date(note.date),
        changeFrequency: "weekly" as const,
        priority: 0.8,
    }));

    // Dynamic Blog routes
    const blogRoutes = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    return [...routes, ...noteRoutes, ...blogRoutes];
}
