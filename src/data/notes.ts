import { Note } from "./types";

export const notes: Note[] = [
    {
        id: "1",
        title: "Organic Chemistry Basics",
        slug: "organic-chemistry-basics",
        subject: "Chemistry",
        grade: "Grade 11",
        chapter: "Hydrocarbons",
        topics: ["Alkanes", "Alkenes", "Nomenclature", "Isomerism"],
        author: "Dr. Sarah Smith",
        date: "2023-10-12",
        description: "Comprehensive guide to alkanes, alkenes, and alkynes with reaction mechanisms.",
        views: 1245,
        downloads: 340,
        rating: 4.8
    },
    {
        id: "2",
        title: "Calculus: Limits & Derivatives",
        slug: "calculus-limits-derivatives",
        subject: "Math",
        grade: "Grade 12",
        chapter: "Calculus",
        topics: ["Limits", "Continuity", "Derivatives", "Chain Rule"],
        author: "Prof. Alan Turing",
        date: "2023-10-15",
        description: "Key formulas and solved examples for limits and differentiation provided.",
        views: 980,
        downloads: 215,
        rating: 4.5
    },
    {
        id: "3",
        title: "World War II History",
        slug: "world-war-ii-history",
        subject: "History",
        grade: "Grade 10",
        chapter: "The World Wars",
        topics: ["Causes", "Axis Powers", "Allies", "Aftermath"],
        author: "Emily White",
        date: "2023-10-22",
        description: "Detailed timeline of major events, causes, and consequences of WWII.",
        views: 1560,
        downloads: 450,
        rating: 4.9
    },
    {
        id: "4",
        title: "Hamlet Analysis",
        slug: "hamlet-analysis",
        subject: "English",
        grade: "Grade 12",
        chapter: "Drama",
        topics: ["Themes", "Characters", "Soliloquies"],
        author: "William S.",
        date: "2023-11-01",
        description: "Character analysis and themes in Shakespeare's Hamlet.",
        views: 890,
        downloads: 120,
        rating: 4.2
    },
    {
        id: "5",
        title: "Newton's Laws of Motion",
        slug: "newtons-laws-motion",
        subject: "Physics",
        grade: "Grade 11",
        chapter: "Kinematics",
        topics: ["Inertia", "Force", "Action-Reaction"],
        author: "Isaac N.",
        date: "2023-11-05",
        description: "Real-world examples and problems solving techniques for Newton's laws.",
        views: 2100,
        downloads: 670,
        rating: 4.7
    },
    {
        id: "6",
        title: "Photosynthesis Diagram",
        slug: "photosynthesis-diagram",
        subject: "Biology",
        grade: "Grade 10",
        chapter: "Plant Physiology",
        topics: ["Light Reaction", "Calvin Cycle", "Chloroplast"],
        author: "Dr. Green",
        date: "2023-10-23",
        description: "Visual guide to light-dependent and light-independent reactions.",
        views: 1750,
        downloads: 500,
        rating: 4.6
    }
];

export const subjects = Array.from(new Set(notes.map(n => n.subject)));
export const grades = Array.from(new Set(notes.map(n => n.grade)));
