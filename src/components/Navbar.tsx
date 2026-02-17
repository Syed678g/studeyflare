"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, BookOpen } from "lucide-react";
import Button from "./Button";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ""}`}>
            <div className={styles.container}>
                {/* Logo */}
                <Link href="/" className={styles.logo}>
                    <div className={styles.iconWrapper}>
                        <BookOpen size={24} color="white" />
                    </div>
                    <span>Studyflare</span>
                </Link>

                {/* Desktop Navigation */}
                <div className={styles.desktopNav}>
                    <Link href="/" className={styles.navLink}>Home</Link>
                    <Link href="/notes" className={styles.navLink}>Notes</Link>
                    <Link href="/quiz" className={styles.navLink}>Quiz</Link>
                    <Link href="/ai-helper" className={styles.navLink}>AI Helper</Link>
                </div>

                {/* CTA Button */}
                <div className={styles.ctaWrapper}>
                    <Button variant="primary" size="sm">Get Started</Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button className={styles.mobileToggle} onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ""}`}>
                <Link href="/" className={styles.mobileLink} onClick={toggleMobileMenu}>Home</Link>
                <Link href="/notes" className={styles.mobileLink} onClick={toggleMobileMenu}>Notes</Link>
                <Link href="/quiz" className={styles.mobileLink} onClick={toggleMobileMenu}>Quiz</Link>
                <Link href="/ai-helper" className={styles.mobileLink} onClick={toggleMobileMenu}>AI Helper</Link>
                <div className={styles.mobileCta}>
                    <Button variant="primary" fullWidth onClick={toggleMobileMenu}>Get Started</Button>
                </div>
            </div>
        </nav>
    );
}
