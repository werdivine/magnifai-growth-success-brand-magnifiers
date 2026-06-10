'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import styles from '../Tools.module.css';
import {
    Search, MapPin, Linkedin, Mail, Instagram, Twitter,
    Lock, ExternalLink, Target, LayoutGrid, Cpu,
    Sparkles, BrainCircuit, Fingerprint, Globe, Download,
    Layers
} from 'lucide-react';

interface LeadResult {
    title: string;
    link: string;
    snippet: string;
    source: string;
    emails?: string[];
    status?: string;
}

export default function LeadInfiltratorV4() {
    const [niche, setNiche] = useState('');
    const [city, setCity] = useState('');
    const [mode, setMode] = useState<'conventional' | 'neural'>('conventional');
    const [results, setResults] = useState<LeadResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showLeadModal, setShowLeadModal] = useState(false);
    const [unlocked, setUnlocked] = useState(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!niche || !city) return;

        setIsSearching(true);
        setResults([]);

        try {
            const response = await fetch('/api/lead-search', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ niche, city, mode })
            });
            
            if (!response.ok) throw new Error('Search failed');
            
            const data = await response.json();
            if (data.success) {
                setResults(data.results);
            }
        } catch (error) {
            console.error('Search error:', error);
            // Fallback to empty or error state
        } finally {
            setIsSearching(false);
        }
    };

    const downloadCSV = () => {
        const headers = ['Title', 'URL', 'Snippet', 'Emails', 'Status'];
        const csvContent = [
            headers.join(','),
            ...results.map(r => [
                `"${r.title.replace(/"/g, '""')}"`,
                `"${r.link}"`,
                `"${r.snippet.replace(/"/g, '""')}"`,
                `"${(r.emails || []).join('; ')}"`,
                r.status
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `leads-${niche}-${city}.csv`;
        a.click();
    };

    return (
        <>
            <Header />
            <main className={styles.toolContainer}>

                {/* Hero */}
                <div className={`${styles.hero} global-wave-bg`}>
                    <div className={styles.badge} style={{ background: 'rgba(99, 102, 241, 0.1)', color: '#818cf8', borderColor: 'rgba(99, 102, 241, 0.2)' }}>
                        <Fingerprint size={14} />
                        Identity Infiltration v5.0 (Live)
                    </div>
                    <h1 className={styles.title} style={{ fontSize: '4.5rem' }}>Lead Infiltrator</h1>
                    <p className={styles.subtitle}>
                        Deconstruct public data silos. Deploy neural search to find high-intent decision makers before your competition even wakes up.
                    </p>
                </div>

                {/* Search Architecture v4 */}
                <div className="max-w-4xl mx-auto mb-20">
                    <div className="flex justify-center gap-4 mb-8">
                        <button
                            onClick={() => setMode('conventional')}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${mode === 'conventional' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'bg-white/5 text-gray-500 border border-white/5 hover:bg-white/10'}`}
                        >
                            <Target size={14} /> Conventional
                        </button>
                        <button
                            onClick={() => setMode('neural')}
                            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${mode === 'neural' ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/20' : 'bg-white/5 text-gray-500 border border-white/5 hover:bg-white/10'}`}
                        >
                            <BrainCircuit size={14} /> Neural Mode
                        </button>
                    </div>

                    <div className={styles.inputWrapper} style={{ padding: '12px' }}>
                        <div className={styles.inputGroup}>
                            <Layers className={styles.inputIcon} size={20} style={{ color: '#6366f1' }} />
                            <input
                                type="text"
                                value={niche}
                                onChange={(e) => setNiche(e.target.value)}
                                placeholder="Target Industry/Niche..."
                                className={styles.inputField}
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <MapPin className={styles.inputIcon} size={20} style={{ color: '#ec4899' }} />
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Target Territory/City..."
                                className={styles.inputField}
                            />
                        </div>
                        <button
                            onClick={handleSearch}
                            disabled={isSearching}
                            className={styles.primaryBtn}
                            style={{ borderRadius: '16px', minWidth: '180px' }}
                        >
                            {isSearching ? <div className="text-xs font-black animate-pulse">SCANNING...</div> : <><Search size={18} /> INITIALIZE</>}
                        </button>
                    </div>
                </div>

                {/* Dashboard results */}
                {results.length > 0 && (
                    <div className={styles.bentoGrid}>
                        <div className={styles['span-12']}>
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                                <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.3em] flex items-center gap-3">
                                    <LayoutGrid size={20} className="text-indigo-400" />
                                    Live Infiltration Results
                                </h2>
                                <div className="flex gap-4">
                                    <button onClick={downloadCSV} className="text-[10px] font-bold text-green-400 bg-green-500/5 px-3 py-1 rounded-full border border-green-500/10 flex items-center gap-2 hover:bg-green-500/10">
                                        <Download size={12} /> Export CSV
                                    </button>
                                    <div className="text-[10px] font-bold text-indigo-400 bg-indigo-500/5 px-3 py-1 rounded-full border border-indigo-500/10">
                                        Found: {results.length} Entities
                                    </div>
                                </div>
                            </div>
                        </div>

                        {results.map((result, i) => {
                            const isLocked = i >= 5 && !unlocked;

                            return (
                                <div
                                    key={i}
                                    className={`${styles.bentoCard} ${styles['span-4']} ${isLocked ? 'opacity-40 grayscale pointer-events-none' : ''}`}
                                    style={{ padding: '30px' }}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-indigo-400 border border-white/10 shadow-xl">
                                            <Globe size={20} />
                                        </div>
                                        {result.emails && result.emails.length > 0 && (
                                            <div className="text-[9px] font-black px-2 py-1 rounded-full border border-green-500/30 text-green-500 bg-green-500/5 uppercase tracking-widest">
                                                Email Found
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-black mb-2 line-clamp-2" title={result.title}>{result.title}</h3>
                                    <a href={result.link} target="_blank" className="text-[10px] text-indigo-400 font-bold mb-4 tracking-widest uppercase truncate block hover:underline">{result.link}</a>

                                    <p className="text-xs text-gray-400 leading-relaxed mb-6 line-clamp-3">
                                        {result.snippet}
                                    </p>

                                    {result.emails && result.emails.length > 0 && (
                                        <div className="bg-green-500/5 border border-green-500/10 p-3 rounded-lg mb-4">
                                            <div className="flex items-center gap-2 text-[10px] text-green-400 font-mono mb-1">
                                                <Mail size={12} /> DIRECT CONTACT
                                            </div>
                                            {result.emails.map(email => (
                                                <div key={email} className="text-[11px] text-gray-300 font-mono">{email}</div>
                                            ))}
                                        </div>
                                    )}

                                    {isLocked ? (
                                        <button
                                            onClick={() => setShowLeadModal(true)}
                                            className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10"
                                        >
                                            <Lock size={12} /> Unlock
                                        </button>
                                    ) : (
                                        <a
                                            href={result.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-white/5"
                                        >
                                            <ExternalLink size={12} /> Visit Site
                                        </a>
                                    )}
                                </div>
                            );
                        })}

                        {/* Upsell for full access */}
                        {!unlocked && results.length > 5 && (
                            <div className={`${styles.bentoCard} ${styles['span-12']} text-center py-12 bg-gradient-to-br from-indigo-500/5 to-transparent`}>
                                <h3 className="text-2xl font-black mb-4">Unlock All {results.length} Leads?</h3>
                                <button
                                    onClick={() => setShowLeadModal(true)}
                                    className="px-8 py-4 bg-indigo-600 text-white text-xs font-black uppercase tracking-[0.2em] rounded-xl inline-flex items-center gap-3 hover:bg-indigo-500 transition-all active:scale-95 shadow-2xl shadow-indigo-500/20"
                                >
                                    <Sparkles size={16} /> Upgrade to Pro
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Idle Monitor */}
                {!results.length && !isSearching && (
                    <div className="mt-32 flex flex-col items-center opacity-30 select-none grayscale">
                        <div className="relative mb-8">
                            <Target size={100} className="animate-[pulse_4s_infinite]" />
                            <div className="absolute inset-0 bg-white/10 blur-3xl rounded-full"></div>
                        </div>
                        <div className="font-mono text-[10px] font-bold tracking-[0.4em] uppercase">Monitor_Searching_Parameters_Identity_0x2</div>
                    </div>
                )}

            </main>
            <Footer />

            <LeadCaptureModal
                isOpen={showLeadModal}
                onClose={() => setShowLeadModal(false)}
                onSuccess={() => setUnlocked(true)}
                source="infiltrator-v5-pro-access"
                title="Unlock Full Data Stream"
                subtitle="You've hit the free tier limit. Join the Beta to unlock unlimited scraping and email enrichment."
                ctaText="Unlock Full Access"
            />
        </>
    );
}

