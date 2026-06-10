'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import styles from '../Tools.module.css';
import {
    Cpu, Zap, Send, Copy, FileText,
    BarChart3, Globe, Mail, CheckCircle2,
    Search, Loader2, Play, Plus, Trash2,
    ChevronRight, ArrowRight, Sparkles, Terminal,
    Database, MailWarning, UserCheck, MessageSquareMore,
    Activity
} from 'lucide-react';

export default function CampaignCommanderV4() {
    const [urlsInput, setUrlsInput] = useState('');
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [showLeadModal, setShowLeadModal] = useState(false);
    const [selectedSequence, setSelectedSequence] = useState<any>(null);

    const logEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const addLog = (msg: string) => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    };

    const handleEnrich = async () => {
        const urlArray = urlsInput.split('\n').map(u => u.trim()).filter(u => u);
        if (urlArray.length === 0) return;

        setLoading(true);
        setLogs([]);
        setLeads([]);
        addLog(`COMMAND_INIT: Processing ${urlArray.length} nodes...`);

        try {
            const res = await fetch('/api/enrich', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ urls: urlArray }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            // Simulate waterfall enrichment for each lead
            for (const lead of data.results) {
                addLog(`PROBE_ACTIVE: Scrutinizing ${lead.url}...`);
                await new Promise(r => setTimeout(r, 800));

                if (lead.status === 'success') {
                    addLog(`SYNC_SUCCESS: Identity Brief generated for ${lead.title}`);
                    setLeads(prev => [lead, ...prev]);
                } else {
                    addLog(`SYNC_ERROR: Domain ${lead.url} is fortified.`);
                }
            }

            addLog(`MISSION_COMPLETE: ${data.results.filter((l: any) => l.status === 'success').length} leads enriched.`);
        } catch (err: any) {
            addLog(`CRITICAL_FAILURE: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // Could add a toast here
    };

    return (
        <>
            <Header />
            <main className={styles.toolContainer}>

                {/* Hero */}
                <div className={styles.hero}>
                    <div className={styles.badge} style={{ background: 'rgba(5, 150, 105, 0.1)', color: '#10b981', borderColor: 'rgba(5, 150, 105, 0.2)' }}>
                        <Play size={14} className="fill-current" />
                        Campaign Commander v4.0
                    </div>
                    <h1 className={styles.title} style={{ fontSize: '4.5rem' }}>Mission Control</h1>
                    <p className={styles.subtitle}>
                        Orchestrate high-volume outreach with Ghost-Writer intelligence. Convert raw URLs into hyper-personalized 3-step sequences in seconds.
                    </p>
                </div>

                <div className={styles.bentoGrid}>

                    {/* Input & Command Logs */}
                    <div className={`${styles.bentoCard} ${styles['span-5']}`}>
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Plus size={18} className="text-emerald-400" /> Lead Ingestion
                            </h4>
                            <div className="text-[10px] font-bold text-gray-600 uppercase">Batch limit: 50</div>
                        </div>

                        <textarea
                            value={urlsInput}
                            onChange={(e) => setUrlsInput(e.target.value)}
                            placeholder="Paste domain list (one per line)...&#10;example.com&#10;google.com"
                            className="w-full h-40 bg-black/40 border border-white/5 rounded-2xl p-6 text-sm text-gray-300 font-mono focus:border-emerald-500/30 highlight-none outline-none transition-all resize-none mb-4"
                        />

                        <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl mb-4">
                            <p className="text-[10px] text-emerald-400 font-black uppercase tracking-tight mb-1 flex items-center gap-1">
                                <Sparkles size={10} /> Neural Protocol
                            </p>
                            <p className="text-[11px] text-gray-500 leading-tight">
                                Paste URLs to trigger the Ghost-Writer engine. I&apos;ll decompile each site&apos;s technical gaps and draft a 3-step conversion sequence.
                            </p>
                        </div>

                        <button
                            onClick={handleEnrich}
                            disabled={loading || !urlsInput}
                            className="w-full py-5 bg-emerald-600 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 hover:bg-emerald-500 transition-all active:scale-95 shadow-2xl shadow-emerald-500/20"
                        >
                            {loading ? <Loader2 size={18} className="animate-spin" /> : <><Terminal size={18} /> INITIALIZE ENRICHMENT</>}
                        </button>

                        <div className="mt-8 bg-black/60 border border-white/5 rounded-2xl overflow-hidden h-48 flex flex-col">
                            <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center gap-2">
                                <Activity size={12} className="text-emerald-500" />
                                <span className="text-[10px] font-black text-gray-500 uppercase">Neural Pipeline Activity</span>
                            </div>
                            <div className="p-4 overflow-y-auto flex-1 font-mono text-[10px] space-y-1 custom-scrollbar">
                                {logs.length === 0 && <div className="text-gray-700 italic">Waiting for command...</div>}
                                {logs.map((log, i) => (
                                    <div key={i} className="text-gray-400">
                                        <span className="text-emerald-500/50 mr-2">{'>'}</span>
                                        {log}
                                    </div>
                                ))}
                                <div ref={logEndRef} />
                            </div>
                        </div>
                    </div>

                    {/* Lead Stream */}
                    <div className={`${styles.bentoCard} ${styles['span-7']}`}>
                        <div className="flex justify-between items-center mb-10">
                            <h4 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Database size={18} className="text-emerald-400" /> Active Leads
                            </h4>
                            <div className="flex gap-2">
                                <button onClick={() => setShowLeadModal(true)} className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                                    <FileText size={14} /> Export CSV
                                </button>
                            </div>
                        </div>

                        {!leads.length && !loading && (
                            <div className="h-96 flex flex-col items-center justify-center grayscale opacity-20 select-none">
                                <Database size={80} className="mb-4" />
                                <p className="text-[10px] font-black uppercase tracking-widest">Awaiting Lead Inflow...</p>
                            </div>
                        )}

                        <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
                            {leads.map((lead, i) => (
                                <div key={i} className="bg-white/5 border border-white/5 rounded-3xl p-6 hover:border-emerald-500/20 transition-all group relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className={`px-3 py-1 rounded-full border text-[9px] font-black uppercase tracking-widest ${lead.priority === 'high' ? 'border-red-500/30 text-red-500 bg-red-500/5' : 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5'
                                            }`}>
                                            P: {lead.priority}
                                        </div>
                                    </div>

                                    <div className="flex gap-6">
                                        <div className="w-16 h-16 bg-black/40 rounded-2xl flex items-center justify-center text-emerald-400 border border-white/10 shrink-0">
                                            <Globe size={28} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-black text-gray-100 mb-1">{lead.title}</h3>
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">{lead.url}</p>

                                            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl mb-6 relative">
                                                <div className="absolute -top-2 left-3 px-2 bg-[#0e0e10] text-[9px] font-black text-emerald-400 uppercase tracking-tighter flex items-center gap-1">
                                                    <Sparkles size={10} /> Ghost-Writer Hook
                                                </div>
                                                <p className="text-[11px] text-emerald-200 leading-tight">
                                                    &quot;{lead.hook}&quot;
                                                </p>
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setSelectedSequence(lead.sequence)}
                                                    className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2"
                                                >
                                                    <MessageSquareMore size={14} /> View Sequence
                                                </button>
                                                <button
                                                    onClick={() => copyToClipboard(lead.hook)}
                                                    className="p-2.5 bg-white/5 border border-white/10 text-gray-400 rounded-xl hover:text-white transition-all"
                                                >
                                                    <Copy size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sequence Viewer Modal */}
                {selectedSequence && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
                        <div className="max-w-4xl w-full bg-[#0a0a0b] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                            <div className="p-10 border-b border-white/5 flex justify-between items-center">
                                <div>
                                    <h2 className="text-3xl font-black mb-1">Ghost-Writer Sequence</h2>
                                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">3-Step High-Intent Outreach Protocol</p>
                                </div>
                                <button onClick={() => setSelectedSequence(null)} className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-all">
                                    <Trash2 size={24} className="text-gray-500" />
                                </button>
                            </div>

                            <div className="p-10 overflow-y-auto max-h-[60vh] custom-scrollbar space-y-10">
                                {[selectedSequence.step1, selectedSequence.step2, selectedSequence.step3].map((step, i) => (
                                    <div key={i} className="relative pl-12 border-l border-white/5">
                                        <div className="absolute -left-4 top-0 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-xs font-black shadow-lg shadow-emerald-600/20">
                                            {i + 1}
                                        </div>
                                        <div className="bg-white/5 border border-white/5 p-8 rounded-3xl">
                                            <div className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Subject: {step.subject}</div>
                                            <div className="text-sm text-gray-400 font-medium leading-relaxed whitespace-pre-wrap">
                                                {step.body}
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(`Subject: ${step.subject}\n\n${step.body}`)}
                                                className="mt-6 flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-all"
                                            >
                                                <Copy size={14} /> Copy full email
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-10 bg-white/5 border-t border-white/5 text-center">
                                <button className="px-10 py-5 bg-emerald-600 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl inline-flex items-center gap-3 hover:bg-emerald-500 transition-all">
                                    <Send size={18} /> Sync to CRM & Send Campaign
                                </button>
                                <p className="mt-4 text-[9px] text-gray-600 font-bold uppercase tracking-widest">CRM Sync requires Phase 4 API Credentials</p>
                            </div>
                        </div>
                    </div>
                )}

            </main>
            <Footer />

            <LeadCaptureModal
                isOpen={showLeadModal}
                onClose={() => setShowLeadModal(false)}
                onSuccess={() => { }}
                source="commander-v4-intelligence-brief"
                title="Intelligence Export"
                subtitle="The raw Ghost-Writer sequence is just the start. Download the full Intelligence Brief including technical SEO fix snippets and the Decision Maker phone waterfall."
                ctaText="Export Intelligence"
            />
        </>
    );
}
