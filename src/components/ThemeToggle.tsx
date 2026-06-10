'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div style={{ width: 40, height: 40 }} />;
    }

    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
                background: isDark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(0, 0, 0, 0.07)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0, 0, 0, 0.12)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: isDark ? '#e2e8f0' : '#1e293b',
                transition: 'all 0.2s ease',
                flexShrink: 0,
            }}
            onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = isDark
                    ? 'rgba(139, 92, 246, 0.2)'
                    : 'rgba(139, 92, 246, 0.1)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(139, 92, 246, 0.4)';
                (e.currentTarget as HTMLButtonElement).style.color = '#8B5CF6';
            }}
            onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = isDark
                    ? 'rgba(255, 255, 255, 0.07)'
                    : 'rgba(0, 0, 0, 0.07)';
                (e.currentTarget as HTMLButtonElement).style.borderColor = isDark
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'rgba(0, 0, 0, 0.12)';
                (e.currentTarget as HTMLButtonElement).style.color = isDark ? '#e2e8f0' : '#1e293b';
            }}
        >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
    );
}
