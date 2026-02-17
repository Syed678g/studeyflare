import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Studyflare - Free Notes, Quizzes & AI Homework Help",
    template: "%s | Studyflare",
  },
  description: "Join thousands of students. Access free study notes, take practice quizzes, and get instant homework help with our AI tutor. For Class 6-12 and beyond.",
  keywords: ["study notes", "free quizzes", "AI homework helper", "exam preparation", "class 10 notes", "class 12 notes", "education"],
  authors: [{ name: "Studyflare Team" }],
  creator: "Studyflare",
  metadataBase: new URL("https://studyflare.com"), // Replace with actual domain in production
  openGraph: {
    title: "Studyflare - Learn Faster, Study Smarter",
    description: "Free Notes, Quizzes & AI Homework Help for students worldwide.",
    url: "https://studyflare.com",
    siteName: "Studyflare",
    images: [
      {
        url: "/og-image.jpg", // Needs to be added to public
        width: 1200,
        height: 630,
        alt: "Studyflare Education Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studyflare - Free Education Platform",
    description: "Master your studies with smart notes and AI support.",
    images: ["/og-image.jpg"], // Needs to be added to public
  },
  robots: {
    index: true,
    follow: true,
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ... existing imports

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable}`}>
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
