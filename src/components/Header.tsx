'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import ThemeToggle from './ThemeToggle';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>
                        <Image src="/images/logo-icon.png" alt="WeMagnifAI" fill style={{ objectFit: 'contain' }} />
                    </div>
                    <span className={styles.logoText}>WeMagnifAI</span>
                </Link>

                <nav className={styles.nav}>
                    <Link href="/directory" className={styles.link}>Directory</Link>
                    <Link href="/resources" className={styles.link}>Resources</Link>
                    <Link href="/agency" className={styles.link}>Agency</Link>
                </nav>

                <div className={styles.actions}>
                    <ThemeToggle />
                    <Link href="/login" className={styles.loginBtn}>Login</Link>
                    <Link href="/submit" className={styles.submitBtn}>Submit Tool</Link>

                    <button
                        className={styles.mobileMenuBtn}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className={styles.mobileMenu}>
                    <Link href="/directory" onClick={() => setMobileMenuOpen(false)}>Directory</Link>
                    <Link href="/resources" onClick={() => setMobileMenuOpen(false)}>Resources</Link>
                    <Link href="/agency" onClick={() => setMobileMenuOpen(false)}>Agency</Link>
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                    <Link href="/submit" onClick={() => setMobileMenuOpen(false)}>Submit Tool</Link>
                </div>
            )}
        </header>
    )
}
