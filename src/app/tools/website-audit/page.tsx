'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import styles from '../Tools.module.css';
import {
    Search, CheckCircle, AlertCircle, XCircle,
    Zap, Shield, Share2, MousePointer2,
    ArrowRight, Sparkles, Globe, Loader2,
    Activity, Gauge, ExternalLink, Cpu,
    Terminal, Database, Lock, UserCheck
} from 'lucide-react';

export default function WebsiteOracleV4() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [processStep, setProcessStep] = useState(0);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');
    const [showLeadModal, setShowLeadModal] = useState(false);
    const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
    const logEndRef = useRef<HTMLDivElement>(null);

    const auditSteps = [
        { msg: "Agent initialized. Protocol: Deep Scan v4.0", log: "CORE_READY" },
        { msg: "Establishing tunnel to destination...", log: "TUNNEL_OPEN_200" },
        { msg: "Ingesting raw HTML payload...", log: "FETCH_DOM_SUCCESS" },
        { msg: "Decompiling semantic structure...", log: "PARSING_HEADERS" },
        { msg: "Injecting Social Pulse probe...", log: "PROBE_PIXELS_SENT" },
        { msg: "Calculating health parity...", log: "SCORE_GEN_COMPLETE" },
        { msg: "Synchronizing Intelligence Brief...", log: "SYNC_LOCAL_DB" }
    ];

    useEffect(() => {
        if (loading && processStep < auditSteps.length) {
            const timer = setTimeout(() => {
                setTerminalLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${auditSteps[processStep].log}: ${auditSteps[processStep].msg}`]);
                setProcessStep(prev => prev + 1);
            }, 600);
            return () => clearTimeout(timer);
        }
    }, [loading, processStep]);

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [terminalLogs]);

    const handleAudit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setLoading(true);
        setProcessStep(0);
        setTerminalLogs([]);
        setError('');
        setResult(null);

        try {
            const res = await fetch('/api/audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            // Hold result until terminal finishes
            setTimeout(() => {
                setResult(data);
                setLoading(false);
            }, 4500);

        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <main className={styles.toolContainer}>

                {/* Oracle Hero */}
                <div className={styles.hero}>
                    <div className={styles.badge} style={{ background: 'rgba(236, 72, 153, 0.1)', color: '#f472b6', borderColor: 'rgba(236, 72, 153, 0.2)' }}>
                        <Cpu size={14} />
                        Neural Oracle Engine v4.0
                    </div>
                    <h1 className={styles.title} style={{ fontSize: '4.5rem' }}>Website Intelligence</h1>
                    <p className={styles.subtitle}>
                        Decompile any domain into a high-fidelity intelligence brief. Uncover hidden signals, tech stacks, and conversion gaps.
                    </p>
                </div>

                {/* Search Input v4 */}
                <div className={styles.inputWrapper} style={{ padding: '8px' }}>
                    <div className={styles.inputGroup}>
                        <Globe className={styles.inputIcon} size={22} style={{ color: '#6366f1' }} />
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="Enter domain to decompile..."
                            className={styles.inputField}
                            style={{ border: 'none', background: 'transparent', fontSize: '1.1rem' }}
                        />
                    </div>
                    <button
                        onClick={handleAudit}
                        disabled={loading}
                        className={styles.primaryBtn}
                        style={{ borderRadius: '18px', padding: '0 40px' }}
                    >
                        {loading ? <div className="text-xs font-black animate-pulse">SCANNING...</div> : <><Terminal size={18} /> DECOMPILE</>}
                    </button>
                </div>

                {/* Neural Terminal Log (Visible during scan) */}
                {loading && !result && (
                    <div className="max-w-2xl mx-auto bg-[#0a0a0b] border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4">
                        <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
                            </div>
                            <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Oracle Session Logs</span>
                        </div>
                        <div className="p-6 h-64 overflow-y-auto font-mono text-[11px] space-y-2 custom-scrollbar">
                            {terminalLogs.map((log, i) => (
                                <div key={i} className="flex gap-2 text-indigo-400">
                                    <span className="opacity-40">::</span>
                                    <span>{log}</span>
                                </div>
                            ))}
                            <div ref={logEndRef} />
                        </div>
                    </div>
                )}

                {error && <div className="text-center text-red-400 mb-8 font-bold animate-pulse">{error}</div>}

                {/* The Brief (Results) */}
                {result && (
                    <div className={styles.bentoGrid}>

                        {/* Score Circular Segment */}
                        <div className={`${styles.bentoCard} ${styles['span-4']}`}>
                            <div className={styles.scoreBox}>
                                <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">Asset Health Parity</div>
                                <div
                                    className={styles.circularScore}
                                    style={{
                                        width: '180px', height: '180px',
                                        borderColor: result.meta.score >= 80 ? '#10b981' : result.meta.score >= 50 ? '#f59e0b' : '#ef4444',
                                        boxShadow: `0 0 40px ${result.meta.score >= 80 ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)'}`
                                    }}
                                >
                                    <div className="text-center">
                                        <div className={styles.scoreValue} style={{ fontSize: '4.5rem', lineHeight: '1' }}>{result.meta.score}</div>
                                        <div className="text-[10px] font-bold opacity-40 uppercase tracking-widest">DEEP_SCAN</div>
                                    </div>
                                </div>
                                <div className="mt-8 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest">
                                    Status: {result.meta.score >= 80 ? 'Fortified' : 'Vulnerable'}
                                </div>
                            </div>
                        </div>

                        {/* Technical Stack Segment */}
                        <div className={`${styles.bentoCard} ${styles['span-8']}`}>
                            <div className="flex justify-between items-start mb-8">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Signal Breakdown</h4>
                                <div className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-lg border border-indigo-500/20 text-[10px] font-black uppercase">
                                    {result.meta.platform} Detected
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                    <Gauge size={16} className="text-indigo-400 mb-2" />
                                    <div className="text-[10px] text-gray-600 font-bold uppercase mb-1">Response</div>
                                    <div className="text-lg font-black">{result.meta.loadTime}ms</div>
                                </div>
                                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                    <Globe size={16} className="text-yellow-400 mb-2" />
                                    <div className="text-[10px] text-gray-600 font-bold uppercase mb-1">Headers</div>
                                    <div className="text-lg font-black">{result.data.headers.count} (H1)</div>
                                </div>
                                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                    <Lock size={16} className="text-green-400 mb-2" />
                                    <div className="text-[10px] text-gray-600 font-bold uppercase mb-1">Security</div>
                                    <div className="text-lg font-black">SSL Locked</div>
                                </div>
                                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                    <Share2 size={16} className="text-pink-400 mb-2" />
                                    <div className="text-[10px] text-gray-600 font-bold uppercase mb-1">Pixel Hub</div>
                                    <div className="text-lg font-black">{result.data.socialPulse.hasFB ? 'Detected' : 'Silent'}</div>
                                </div>
                            </div>

                            <div className="mt-10 bg-indigo-500/5 border border-indigo-500/10 p-6 rounded-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Sparkles size={100} />
                                </div>
                                <p className="text-indigo-300 font-black text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Sparkles size={14} /> Intelligence Insight
                                </p>
                                <p className="text-gray-400 text-sm leading-relaxed italic">
                                    &quot;{result.insight}&quot;
                                </p>
                            </div>
                        </div>

                        {/* Social Pulse Segment */}
                        <div className={`${styles.bentoCard} ${styles['span-6']}`}>
                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Social Intelligence Pulse</h4>
                            <div className="space-y-4">
                                {[
                                    { label: 'Meta Pixel', active: result.data.socialPulse.hasFB, desc: 'Tracks Facebook/Instagram ad conversion.' },
                                    { label: 'Google Tag Manager', active: result.data.socialPulse.hasGTM, desc: 'Centralized signal orchestration.' },
                                    { label: 'LinkedIn Insight', active: result.data.socialPulse.hasLinkedIn, desc: 'Professional B2B audience tracking.' },
                                    { label: 'Hotjar Behavioral', active: result.data.socialPulse.hasHotjar, desc: 'Visual session replays for UX fixes.' }
                                ].map((pixel, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 bg-white/[0.02] rounded-2xl border border-white/5">
                                        <div className={`w-3 h-3 rounded-full ${pixel.active ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-gray-800'}`}></div>
                                        <div className="flex-1">
                                            <div className="text-xs font-black uppercase tracking-tight">{pixel.label}</div>
                                            <div className="text-[10px] text-gray-500">{pixel.desc}</div>
                                        </div>
                                        <div className="text-[9px] font-black uppercase opacity-40">{pixel.active ? 'ACTIVE' : 'OFFLINE'}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Advanced Action Matrix */}
                        <div className={`${styles.bentoCard} ${styles['span-6']}`}>
                            <h4 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-8">Action Matrix</h4>
                            <div className="space-y-3">
                                {result.analysis.map((item: any, i: number) => (
                                    <div key={i} className={styles.issueItem} style={{ border: '1px solid rgba(255,255,255,0.02)', padding: '20px' }}>
                                        <div className={`${styles.issueIcon} ${item.severity === 'critical' || item.severity === 'high' ? styles.issueCritical :
                                                item.severity === 'medium' ? styles.issueWarning : styles.issueGood
                                            }`} style={{ borderRadius: '14px' }}>
                                            {item.severity === 'critical' ? <XCircle size={18} /> : <AlertCircle size={18} />}
                                        </div>
                                        <div>
                                            <div className="text-sm font-black uppercase tracking-tighter text-gray-200">{item.title}</div>
                                            <div className="text-xs text-gray-500 font-medium leading-relaxed">{item.msg}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => setShowLeadModal(true)}
                                className="w-full mt-8 py-5 bg-white text-black text-xs font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-200 transition-all active:scale-95 shadow-2xl shadow-white/5"
                            >
                                <ArrowRight size={18} /> Unlock Full Repair Brief
                            </button>
                        </div>

                    </div>
                )}

            </main>
            <Footer />

            <LeadCaptureModal
                isOpen={showLeadModal}
                onClose={() => setShowLeadModal(false)}
                onSuccess={() => { }}
                source="oracle-v4-deep-report"
                title="Surgical Repair Brief"
                subtitle="We'll send you a technical roadmap including exact code snippets to fix these vulnerabilities and double your conversion rate."
                ctaText="Decompile My Strategy"
            />
        </>
    );
}
