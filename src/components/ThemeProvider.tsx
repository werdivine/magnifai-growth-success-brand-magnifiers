'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Force Dark Mode by default as per strict user requirement
        // We ignore localStorage 'light' preference to ensure the premium experience first
        setTheme('dark');
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Update DOM - set on html element for CSS :root selectors to work
        document.documentElement.setAttribute('data-theme', theme);
        // Persist
        localStorage.setItem('theme', theme);
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    // Prevent hydration mismatch by rendering nothing until mounted on client
    // OR render a placeholder. For themes, rendering children is usually fine 
    // but we might get a flash of wrong theme. 
    // To prevent flash, we render children but the effect above handles the attribute quickly.

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
