import { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [
    {
        id: "1",
        title: "How to Study Physics Fast without Forgetting",
        slug: "how-to-study-physics-fast",
        excerpt: "Master physics concepts quickly with these proven memory techniques and active recall strategies.",
        content: `
      <h2>Introduction</h2>
      <p>Physics can be daunting, but with the right approach, you can master it...</p>
      
      <h2>1. Understand the Basics</h2>
      <p>Don't just memorize formulas. Understand the underlying concepts...</p>
      
      <h2>2. Visual Learning</h2>
      <p>Use diagrams and free-body diagrams to visualize problems...</p>
      
      <h2>3. Practice Problems</h2>
      <p>The only way to learn physics is to do physics...</p>
    `,
        author: "Alex Johnson",
        date: "2023-11-10",
        readTime: "5 min read",
        category: "Study Tips",
        tags: ["Physics", "Study Hacks", "Memory"],
        imageUrl: "/images/blog/physics-study.jpg"
    },
    {
        id: "2",
        title: "Class 10 Math Notes PDF Free Download Guide",
        slug: "class-10-math-notes-pdf-free",
        excerpt: "Get the best free resources for Class 10 Mathematics. Download standard notes, cheat sheets, and formula books.",
        content: `
      <h2>Why You Need Good Notes</h2>
      <p>Class 10 is a crucial year. Having concise notes helps in last-minute revision...</p>
      
      <h2>Top Topics to Cover</h2>
      <ul>
        <li>Trigonometry</li>
        <li>Quadratic Equations</li>
        <li>Arithmetic Progressions</li>
      </ul>
      
      <h2>Download Links</h2>
      <p>Check out our notes section for free PDF downloads...</p>
    `,
        author: "Sarah Connor",
        date: "2023-11-12",
        readTime: "3 min read",
        category: "Notes",
        tags: ["Math", "Free Resources", "Class 10"],
        imageUrl: "/images/blog/math-notes.jpg"
    },
    {
        id: "3",
        title: "AI in Education: How It's Changing the Game",
        slug: "ai-in-education-trends",
        excerpt: "From personalized tutors to automated grading, explore how Artificial Intelligence is reshaping how we learn.",
        content: `
      <h2>The Rise of AI Tutors</h2>
      <p>Tools like Studyflare's AI Helper are making personalized education accessible...</p>
      
      <h2>Benefits of AI Learning</h2>
      <p>Instant feedback, 24/7 availability, and adaptive learning paths...</p>
    `,
        author: "Tech Insider",
        date: "2023-11-15",
        readTime: "7 min read",
        category: "AI Learning",
        tags: ["AI", "EdTech", "Future of Learning"],
        imageUrl: "/images/blog/ai-education.jpg"
    }
];

export const blogCategories = ["All", "Study Tips", "Notes", "Exam Prep", "AI Learning"];
