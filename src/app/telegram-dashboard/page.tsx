'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type TabId = 'overview' | 'leads' | 'groups' | 'content' | 'console' | 'settings';

const TABS: { id: TabId; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'leads', label: 'Leads', icon: '👤' },
    { id: 'groups', label: 'Groups', icon: '💬' },
    { id: 'content', label: 'Content Queue', icon: '✏️' },
    { id: 'console', label: 'Terminal Logs', icon: '💻' },
    { id: 'settings', label: 'Engine Settings', icon: '⚙️' },
];

const DEMO_LEADS = [
    { id: 1, name: 'Arjun Mehta', handle: '@arjunm_biz', group: 'AI Founders India', score: 94, status: 'replied', dm_step: 3, bio: 'SaaS founder | B2B growth | ex-Flipkart' },
    { id: 2, name: 'Sarah T.', handle: '@saraht_growth', group: 'Growth Hackers UK', score: 88, status: 'dm_sent', dm_step: 2, bio: 'Head of Growth @ Series-A SaaS | PLG obsessed' },
    { id: 3, name: 'Rahul K.', handle: '@rahulk_martech', group: 'MarTech India', score: 82, status: 'dm_sent', dm_step: 1, bio: 'MarTech consultant · helping brands automate CX' },
    { id: 4, name: 'Marcus F.', handle: '@marcusf_agency', group: 'Agency Owners EU', score: 76, status: 'queued', dm_step: 0, bio: 'Digital agency owner | SEO + Paid | 40+ clients' },
    { id: 5, name: 'Priya S.', handle: '@priyas_startup', group: 'Startup Ecosystem IN', score: 71, status: 'queued', dm_step: 0, bio: 'Co-founder, SaaS startup | female founder' },
];

const DEMO_GROUPS = [
    { id: 1, name: 'AI Founders India', members: 12400, posts_today: 3, leads_scraped: 284, status: 'active', last_post: '2h ago' },
    { id: 2, name: 'Growth Hackers UK', members: 8700, posts_today: 2, leads_scraped: 197, status: 'active', last_post: '4h ago' },
    { id: 3, name: 'MarTech India', members: 6200, posts_today: 2, leads_scraped: 143, status: 'active', last_post: '3h ago' },
    { id: 4, name: 'B2B SaaS Founders', members: 21000, posts_today: 1, leads_scraped: 312, status: 'active', last_post: '6h ago' },
];

const DEMO_CONTENT = [
    { id: 1, group: 'AI Founders India', content: '🤖 Most AI agencies are selling services. The smartest ones are building systems that sell for them. Here\'s the 3-step AI growth stack we\'re deploying for 6-figure B2B brands right now...', status: 'published', engagements: 47, posted_at: '2h ago' },
    { id: 2, group: 'Growth Hackers UK', content: '📊 Unpopular truth: your funnel isn\'t broken. Your targeting is. We analysed 89 B2B funnels this quarter. The #1 problem wasn\'t the offer — it was going after the wrong Telegram groups entirely.', status: 'published', engagements: 34, posted_at: '4h ago' },
    { id: 3, group: 'MarTech India', content: '🎯 The MarTech stack that\'s printing pipeline for Indian B2B brands: → Telegram scraper for warm leads → GPT-4o for personalised DMs → WhatsApp for follow-up → HubSpot for CRM.', status: 'published', engagements: 28, posted_at: '3h ago' },
];

const DEMO_ANALYTICS = {
    totals: {
        groups_discovered: 47,
        groups_joined: 6,
        posts_published: 231,
        leads_scraped: 1284,
        dms_sent: 612,
        replies_received: 74,
        estimated_pipeline: 142000
    }
};

function StatusBadge({ status }: { status: string }) {
    const map: Record<string, { bg: string; color: string; label: string }> = {
        replied: { bg: 'rgba(16,185,129,0.15)', color: '#10b981', label: 'Replied' },
        dm_sent: { bg: 'rgba(99,102,241,0.15)', color: '#818cf8', label: 'DM Sent' },
        queued: { bg: 'rgba(245,158,11,0.15)', color: '#fbbf24', label: 'Queued' },
        scraped: { bg: 'rgba(100,116,139,0.15)', color: '#94a3b8', label: 'Scraped' },
        active: { bg: 'rgba(16,185,129,0.15)', color: '#10b981', label: 'Active' },
        paused: { bg: 'rgba(245,158,11,0.15)', color: '#fbbf24', label: 'Paused' },
        published: { bg: 'rgba(16,185,129,0.15)', color: '#10b981', label: 'Published' },
        scheduled: { bg: 'rgba(99,102,241,0.15)', color: '#818cf8', label: 'Scheduled' },
        new: { bg: 'rgba(14,165,233,0.15)', color: '#38bdf8', label: 'New' },
    };
    const s = map[status] ?? { bg: 'rgba(100,116,139,0.15)', color: '#94a3b8', label: status };
    return (
        <span style={{
            background: s.bg, color: s.color,
            padding: '0.25rem 0.65rem', borderRadius: '0.5rem',
            fontSize: '0.72rem', fontWeight: 800, whiteSpace: 'nowrap',
            border: `1px solid ${s.color}25`
        }}>
            {s.label}
        </span>
    );
}

function ScoreBadge({ score }: { score: number }) {
    const color = score >= 80 ? '#10b981' : score >= 65 ? '#f59e0b' : '#94a3b8';
    return (
        <span style={{
            color, fontWeight: 900, fontSize: '0.85rem',
            display: 'inline-flex', alignItems: 'center', gap: '0.2rem',
            background: `${color}10`, padding: '0.15rem 0.4rem', borderRadius: '0.35rem',
            border: `1px solid ${color}20`
        }}>
            🔥 {score}
        </span>
    );
}

interface LogEntry {
    level: string;
    message: string;
    timestamp: string;
}

function TerminalConsole({ logs, onClear, filter, setFilter }: { 
    logs: LogEntry[]; 
    onClear: () => void;
    filter: 'all' | 'error' | 'info';
    setFilter: (f: 'all' | 'error' | 'info') => void;
}) {
    const consoleEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const filteredLogs = logs.filter(log => {
        if (filter === 'all') return true;
        return log.level === filter;
    });

    const formatMessage = (msg: string) => {
        // Highlight terms
        let formatted = msg;
        const replacements = [
            { pattern: /(Searching groups|Searching)/gi, color: '#38bdf8' },
            { pattern: /(Found \d+ qualifying|Found \d+)/gi, color: '#10b981' },
            { pattern: /(Group discovery complete|complete|success|saved)/gi, color: '#10b981' },
            { pattern: /(Failed|Error|Fatal)/gi, color: '#ef4444' },
            { pattern: /(Running module:|Starting scheduled task:)/gi, color: '#a78bfa' },
            { pattern: /(Scheduler heartbeat)/gi, color: '#64748b' }
        ];
        
        return (
            <span style={{ wordBreak: 'break-all' }}>
                {msg.split(' ').map((word, idx) => {
                    let style: React.CSSProperties = {};
                    for (const r of replacements) {
                        if (r.pattern.test(word)) {
                            style = { color: r.color, fontWeight: 'bold' };
                            break;
                        }
                    }
                    return <span key={idx} style={style}>{word} </span>;
                })}
            </span>
        );
    };

    return (
        <div style={{
            background: '#040509',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '1rem', overflow: 'hidden',
            boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.8), 0 20px 40px rgba(0,0,0,0.5)',
            fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
            fontSize: '0.825rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', height: '420px'
        }}>
            {/* Header bar */}
            <div style={{
                background: 'rgba(255,255,255,0.03)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                padding: '0.75rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fbbf24' }}></div>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div>
                    <span style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 800, marginLeft: '0.5rem', letterSpacing: '0.05em' }}>
                        wemagnifai@engine:~
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {(['all', 'info', 'error'] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            style={{
                                padding: '0.2rem 0.5rem', fontSize: '0.7rem',
                                background: filter === f ? 'rgba(99,102,241,0.2)' : 'transparent',
                                border: `1px solid ${filter === f ? '#6366f1' : 'transparent'}`,
                                borderRadius: '0.25rem', color: filter === f ? '#fff' : '#64748b',
                                cursor: 'pointer', textTransform: 'uppercase', fontWeight: 800
                            }}
                        >
                            {f}
                        </button>
                    ))}
                    <button
                        onClick={onClear}
                        style={{
                            padding: '0.2rem 0.5rem', fontSize: '0.7rem',
                            background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '0.25rem', color: '#94a3b8', cursor: 'pointer', fontWeight: 800
                        }}
                    >
                        CLEAR
                    </button>
                </div>
            </div>

            {/* Scrollable log contents */}
            <div style={{
                padding: '1.25rem', overflowY: 'auto', flex: 1,
                display: 'flex', flexDirection: 'column', gap: '0.4rem',
                lineHeight: 1.5, scrollBehavior: 'smooth'
            }}>
                {filteredLogs.length > 0 ? (
                    filteredLogs.map((log, index) => {
                        const isErr = log.level === 'error' || log.level === 'warn';
                        const timeColor = '#475569';
                        const levelColor = log.level === 'error' ? '#ef4444' : log.level === 'warn' ? '#f59e0b' : '#a78bfa';
                        
                        return (
                            <div key={index} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                <span style={{ color: timeColor, flexShrink: 0 }}>[{log.timestamp}]</span>
                                <span style={{ color: levelColor, textTransform: 'uppercase', fontWeight: 'bold', flexShrink: 0, minWidth: '42px' }}>
                                    {log.level}
                                </span>
                                <span style={{ color: isErr ? '#fca5a5' : '#e2e8f0' }}>
                                    {formatMessage(log.message)}
                                </span>
                            </div>
                        );
                    })
                ) : (
                    <div style={{ color: '#475569', textAlign: 'center', padding: '4rem 0', fontStyle: 'italic' }}>
                        --- End of buffer or no logs matching filters ---
                    </div>
                )}
                <div ref={consoleEndRef} />
            </div>
        </div>
    );
}

export default function TelegramDashboard() {
    const [activeTab, setActiveTab] = useState<TabId>('overview');
    const [useDemoMode, setUseDemoMode] = useState<boolean>(false);
    
    // Live database states
    const [liveLeads, setLiveLeads] = useState<any[]>([]);
    const [liveGroups, setLiveGroups] = useState<any[]>([]);
    const [liveContacts, setLiveContacts] = useState<any[]>([]);
    const [liveAnalytics, setLiveAnalytics] = useState<any>(null);
    const [loadingLive, setLoadingLive] = useState<boolean>(true);
    
    // Live logs states
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [logFilter, setLogFilter] = useState<'all' | 'error' | 'info'>('all');
    
    // Trigger / Scheduler states
    const [activeJob, setActiveJob] = useState<{ name: string; startTime: string } | null>(null);
    const [isTriggering, setIsTriggering] = useState<boolean>(false);
    const [schedulerStatus, setSchedulerStatus] = useState<'active' | 'paused'>('active');
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    
    // Settings form states
    const [settings, setSettings] = useState({
        niche: '',
        target_keywords: [] as string[],
        daily_dm_limit: 25,
        daily_post_limit: 15,
        daily_group_join_limit: 10,
        cta_message: '',
        lead_score_threshold: 5,
        human_delay_min_seconds: 45,
        human_delay_max_seconds: 180,
        min_group_members: 200,
        max_group_members: 50000,
    });
    const [keywordInput, setKeywordInput] = useState<string>('');
    const [savingSettings, setSavingSettings] = useState<boolean>(false);

    // Outreach Assistant & Exporter states
    const [selectedLead, setSelectedLead] = useState<any | null>(null);
    const [showOutreachModal, setShowOutreachModal] = useState<boolean>(false);
    const [generatingOutreach, setGeneratingOutreach] = useState<boolean>(false);
    const [outreachCopy, setOutreachCopy] = useState<{
        whatsapp: string;
        linkedin: string;
        email_subject: string;
        email_body: string;
    } | null>(null);
    const [outreachTab, setOutreachTab] = useState<'whatsapp' | 'linkedin' | 'email'>('whatsapp');

    const handleGenerateOutreach = async (lead: any) => {
        setSelectedLead(lead);
        setShowOutreachModal(true);
        setGeneratingOutreach(true);
        setOutreachCopy(null);

        try {
            const res = await fetch('/api/generate-outreach', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    first_name: lead.first_name || lead.name,
                    last_name: lead.last_name,
                    bio: lead.bio,
                    source_group: lead.source_group || lead.group,
                    username: lead.username || lead.handle?.replace('@', '')
                })
            });
            if (!res.ok) throw new Error('Outreach generation failed');
            const data = await res.json();
            if (data.success && data.outreach) {
                setOutreachCopy(data.outreach);
            } else {
                showToast(data.error || 'Failed to generate outreach copy.', 'error');
            }
        } catch (err: any) {
            console.error('Error generating outreach:', err);
            showToast('Failed to connect to outreach generator endpoint.', 'error');
        } finally {
            setGeneratingOutreach(false);
        }
    };

    const downloadTelegramLeadsCSV = () => {
        const headers = ['ID', 'Username', 'Name', 'Bio', 'Phone', 'Score', 'Source Group', 'Status', 'DM Step', 'Discovered At'];
        const csvContent = [
            headers.join(','),
            ...leads.map(l => [
                `"${(l.id || '').toString().replace(/"/g, '""')}"`,
                `"${(l.username || l.handle || '').replace(/"/g, '""')}"`,
                `"${([l.first_name, l.last_name].filter(Boolean).join(' ') || l.name || 'Anonymous').replace(/"/g, '""')}"`,
                `"${(l.bio || '').replace(/"/g, '""').replace(/\n/g, ' ').replace(/\r/g, '')}"`,
                `"${(l.phone || '').replace(/"/g, '""')}"`,
                l.score || 0,
                `"${(l.group || l.source_group || '').replace(/"/g, '""')}"`,
                `"${(l.status || '').replace(/"/g, '""')}"`,
                l.dm_step !== undefined ? l.dm_step : (l.dm_sequence_step !== undefined ? l.dm_sequence_step : 0),
                `"${(l.discovered_at || '').replace(/"/g, '""')}"`
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `telegram-leads-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        showToast('Leads CSV exported successfully!', 'success');
    };

    // Fetch DB databases and analytics
    const fetchLiveData = async () => {
        try {
            const res = await fetch('/api/telegram-data');
            if (!res.ok) throw new Error('Failed to fetch telegram data');
            const data = await res.json();
            if (data.success) {
                setLiveLeads(data.leads || []);
                setLiveGroups(data.groups || []);
                setLiveContacts(data.contacts || []);
                setLiveAnalytics(data.analytics || null);
            }
        } catch (err) {
            console.error('Error fetching live data:', err);
        } finally {
            setLoadingLive(false);
        }
    };

    // Fetch Engine Logs
    const fetchLogs = async () => {
        try {
            const res = await fetch('/api/telegram-logs');
            if (!res.ok) throw new Error('Failed to fetch logs');
            const data = await res.json();
            if (data.success) {
                setLogs(data.logs || []);
            }
        } catch (err) {
            console.error('Error fetching logs:', err);
        }
    };

    // Fetch Active Action Jobs
    const fetchActiveJob = async () => {
        try {
            const res = await fetch('/api/telegram-action');
            if (!res.ok) throw new Error('Failed to fetch active job');
            const data = await res.json();
            if (data.success) {
                setActiveJob(data.activeJob);
            }
        } catch (err) {
            console.error('Error fetching active job:', err);
        }
    };

    // Fetch Bot Settings
    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/telegram-settings');
            if (!res.ok) throw new Error('Failed to fetch settings');
            const data = await res.json();
            if (data.success && data.settings) {
                setSettings(data.settings);
                setKeywordInput(data.settings.target_keywords.join(', '));
            }
        } catch (err) {
            console.error('Error fetching settings:', err);
        }
    };

    // Run a manual background job
    const triggerAction = async (actionName: string) => {
        setIsTriggering(true);
        showToast(`Starting '${actionName}' task in background...`, 'success');
        try {
            const res = await fetch('/api/telegram-action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: actionName })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setActiveJob(data.job);
                showToast(`Background process launched! Logs will stream below.`, 'success');
                // Poll logs immediately
                setTimeout(fetchLogs, 1000);
            } else {
                showToast(data.error || 'Failed to start action.', 'error');
            }
        } catch (err) {
            console.error('Error triggering action:', err);
            showToast('Connection error. Failed to trigger background task.', 'error');
        } finally {
            setIsTriggering(false);
        }
    };

    // Save Bot Settings
    const handleSaveSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        setSavingSettings(true);
        
        // Parse keywords
        const keywordsArray = keywordInput
            .split(',')
            .map(kw => kw.trim())
            .filter(kw => kw.length > 0);

        const updated = {
            ...settings,
            target_keywords: keywordsArray
        };

        try {
            const res = await fetch('/api/telegram-settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updated)
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setSettings(updated);
                showToast('Settings saved successfully and synced to engine config!', 'success');
            } else {
                showToast(data.error || 'Failed to save settings.', 'error');
            }
        } catch (err) {
            console.error('Error saving settings:', err);
            showToast('Connection error. Failed to save configuration.', 'error');
        } finally {
            setSavingSettings(false);
        }
    };

    const showToast = (message: string, type: 'success' | 'error') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    // Initial loads and interval setups
    useEffect(() => {
        fetchLiveData();
        fetchLogs();
        fetchActiveJob();
        fetchSettings();

        const liveInterval = setInterval(fetchLiveData, 15000); // data files refresh
        const logsInterval = setInterval(() => {
            fetchLogs();
            fetchActiveJob();
        }, 3000); // logs & jobs refresh quickly

        return () => {
            clearInterval(liveInterval);
            clearInterval(logsInterval);
        };
    }, []);

    // Resolve which data sources are in use
    const leads = useDemoMode ? DEMO_LEADS : liveLeads;
    const groups = useDemoMode ? DEMO_GROUPS : liveGroups;
    const analytics = useDemoMode ? DEMO_ANALYTICS : liveAnalytics;

    return (
        <>
            <Header />
            {/* Custom global styles injected for scrollbar transitions and animations */}
            <style jsx global>{`
                :root {
                    --bg-primary: #08090d;
                    --bg-secondary: #0e111a;
                    --bg-tertiary: rgba(18, 22, 35, 0.65);
                    --glass-border: rgba(255, 255, 255, 0.06);
                    --accent-glow: 0 0 25px rgba(99, 102, 241, 0.15);
                }
                
                ::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                ::-webkit-scrollbar-track {
                    background: rgba(255,255,255,0.02);
                }
                ::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.1);
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: rgba(255,255,255,0.2);
                }

                @keyframes pulse-border {
                    0% { border-color: rgba(99,102,241,0.2); }
                    50% { border-color: rgba(99,102,241,0.5); }
                    100% { border-color: rgba(99,102,241,0.2); }
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                @keyframes scaleIn {
                    0% { transform: scale(0.95); opacity: 0; }
                    100% { transform: scale(1); opacity: 1; }
                }

                @keyframes fadeIn {
                    0% { opacity: 0; transform: translateY(10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }

                .running-border {
                    animation: pulse-border 2s infinite;
                    border: 1px solid rgba(99,102,241,0.2);
                }
            `}</style>

            <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '80px', color: '#f8fafc' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.5rem' }}>

                    {/* Mode Toggle Banner */}
                    <div style={{
                        background: useDemoMode ? 'rgba(99, 102, 241, 0.04)' : 'rgba(16, 185, 129, 0.03)',
                        border: `1px solid ${useDemoMode ? 'rgba(99, 102, 241, 0.2)' : 'rgba(16, 185, 129, 0.2)'}`,
                        backdropFilter: 'blur(10px)',
                        borderRadius: '1rem', padding: '1.25rem 1.75rem',
                        marginBottom: '2rem', display: 'flex', justifyContent: 'space-between',
                        alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
                        boxShadow: useDemoMode ? '0 10px 30px rgba(99,102,241,0.05)' : '0 10px 30px rgba(16,185,129,0.03)'
                    }}>
                        <div>
                            <span style={{
                                fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase',
                                color: useDemoMode ? '#818cf8' : '#10b981', letterSpacing: '0.08em',
                                display: 'inline-flex', alignItems: 'center', gap: '0.4rem'
                            }}>
                                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: useDemoMode ? '#818cf8' : '#10b981' }} />
                                {useDemoMode ? 'DEMO SANDBOX ACTIVE (MOCK DATA)' : '📡 LIVE TG ENGINE CONNECTION ACTIVE'}
                            </span>
                            <p style={{ color: '#94a3b8', margin: '0.35rem 0 0', fontSize: '0.825rem', lineHeight: 1.4 }}>
                                {useDemoMode 
                                    ? 'Currently showcasing simulated analytics, leads, and events. Changes will not impact real files.' 
                                    : 'Linked directly to groups_db.json, leads_db.json, and engine.log in the telegram-engine workspace.'}
                            </p>
                        </div>
                        <button 
                            onClick={() => setUseDemoMode(!useDemoMode)}
                            style={{
                                padding: '0.6rem 1.2rem', 
                                background: useDemoMode ? 'rgba(99, 102, 241, 0.12)' : 'rgba(16, 185, 129, 0.08)',
                                color: useDemoMode ? '#a5b4fc' : '#34d399', 
                                border: `1px solid ${useDemoMode ? '#6366f1' : '#10b981'}`,
                                borderRadius: '0.6rem', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer',
                                transition: 'all 0.2s', letterSpacing: '0.02em'
                            }}
                        >
                            {useDemoMode ? '🔗 Connect Live Engine' : '🧪 View Demo Sandbox'}
                        </button>
                    </div>

                    {/* Page Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.25rem' }}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
                                <h1 style={{ color: '#fff', margin: 0, fontSize: '1.75rem', fontWeight: 900, letterSpacing: '-0.02em' }}>
                                    Telegram Growth Console
                                </h1>
                                <span style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                                    background: schedulerStatus === 'active' ? 'rgba(16,185,129,0.08)' : 'rgba(245,158,11,0.08)',
                                    border: `1px solid ${schedulerStatus === 'active' ? 'rgba(16,185,129,0.2)' : 'rgba(245,158,11,0.2)'}`,
                                    color: schedulerStatus === 'active' ? '#34d399' : '#fbbf24',
                                    padding: '0.3rem 0.85rem', borderRadius: '2rem',
                                    fontSize: '0.75rem', fontWeight: 800,
                                }}>
                                    <span style={{
                                        width: '6px', height: '6px', borderRadius: '50%',
                                        background: schedulerStatus === 'active' ? '#10b981' : '#fbbf24',
                                    }} />
                                    {schedulerStatus === 'active' ? 'Scheduler Running' : 'Scheduler Suspended'}
                                </span>
                            </div>
                            <p style={{ color: '#64748b', margin: '0.4rem 0 0', fontSize: '0.875rem' }}>
                                {useDemoMode 
                                    ? 'Showing static dashboard mockup data' 
                                    : `System initialized · ${liveGroups.length} groups discovered · ${liveLeads.length} leads generated`}
                            </p>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button
                                onClick={() => setSchedulerStatus(s => s === 'active' ? 'paused' : 'active')}
                                style={{
                                    padding: '0.65rem 1.25rem',
                                    background: schedulerStatus === 'active' ? 'rgba(245,158,11,0.08)' : 'rgba(16,185,129,0.08)',
                                    border: `1px solid ${schedulerStatus === 'active' ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)'}`,
                                    color: schedulerStatus === 'active' ? '#fbbf24' : '#34d399',
                                    borderRadius: '0.75rem', fontWeight: 800, cursor: 'pointer',
                                    fontSize: '0.85rem', transition: 'all 0.2s'
                                }}
                            >
                                {schedulerStatus === 'active' ? '⏸ Suspend Scheduler' : '▶ Activate Scheduler'}
                            </button>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div style={{
                        display: 'flex', gap: '0.25rem',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '1rem', padding: '0.4rem',
                        marginBottom: '2rem', overflowX: 'auto',
                    }}>
                        {TABS.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    padding: '0.6rem 1.2rem',
                                    background: activeTab === tab.id ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'transparent',
                                    border: 'none', borderRadius: '0.75rem',
                                    color: activeTab === tab.id ? '#fff' : '#64748b',
                                    fontWeight: 750, fontSize: '0.85rem', cursor: 'pointer',
                                    whiteSpace: 'nowrap', transition: 'all 0.15s',
                                }}
                            >
                                <span style={{ fontSize: '0.95rem' }}>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Active Job Floating Status bar */}
                    {activeJob && (
                        <div className="running-border" style={{
                            background: 'rgba(99, 102, 241, 0.05)',
                            borderRadius: '1rem', padding: '1rem 1.5rem',
                            marginBottom: '2rem', display: 'flex', justifyContent: 'space-between',
                            alignItems: 'center', boxShadow: 'var(--accent-glow)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{
                                    width: '8px', height: '8px', borderRadius: '50%',
                                    background: '#6366f1', display: 'inline-block',
                                    boxShadow: '0 0 10px #6366f1'
                                }} />
                                <span style={{ fontSize: '0.85rem', color: '#a5b4fc', fontWeight: 'bold' }}>
                                    BOT TASK ACTIVE: <span style={{ textTransform: 'uppercase', color: '#fff' }}>{activeJob.name}</span>
                                </span>
                            </div>
                            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                Running since: {new Date(activeJob.startTime).toLocaleTimeString()}
                            </span>
                        </div>
                    )}

                    {/* Tab Views */}
                    
                    {/* 1. OVERVIEW VIEW */}
                    {activeTab === 'overview' && (
                        <div>
                            {/* Metrics Grid */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                                gap: '1.25rem', marginBottom: '2rem',
                            }}>
                                {[
                                    { label: 'Leads Found', value: leads.length, desc: 'Scraped from channels', color: '#6366f1', icon: '👤' },
                                    { label: 'Discovered Channels', value: groups.length, desc: 'Target groups found', color: '#38bdf8', icon: '💬' },
                                    { label: 'DMs Sent', value: analytics?.totals?.dms_sent || 0, desc: 'Outreach sequences', color: '#c084fc', icon: '📨' },
                                    { label: 'Replies Received', value: analytics?.totals?.replies_received || 0, desc: 'Warm replies tracked', color: '#fbbf24', icon: '💬' },
                                    { label: 'Published Posts', value: analytics?.totals?.posts_published || 0, desc: 'Group postings', color: '#f472b6', icon: '✏️' },
                                    { label: 'Estimated Pipeline', value: `£${(analytics?.totals?.estimated_pipeline || 0).toLocaleString()}`, desc: 'Qualified value', color: '#34d399', icon: '💰' },
                                ].map((m, i) => (
                                    <div key={i} style={{
                                        background: 'var(--bg-tertiary)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '1.25rem', padding: '1.5rem',
                                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
                                        backdropFilter: 'blur(12px)',
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                            <span style={{ fontSize: '1.5rem' }}>{m.icon}</span>
                                            <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>live</span>
                                        </div>
                                        <div style={{ color: '#fff', fontSize: '1.85rem', fontWeight: 900, letterSpacing: '-0.03em' }}>{m.value}</div>
                                        <div style={{ color: m.color, fontSize: '0.85rem', fontWeight: 800, margin: '0.2rem 0 0.1rem' }}>{m.label}</div>
                                        <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 700 }}>{m.desc}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Main split dashboard view */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start', flexWrap: 'wrap' } as React.CSSProperties}>
                                
                                {/* Trigger controls panel */}
                                <div style={{
                                    background: 'var(--bg-tertiary)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '1.25rem', padding: '1.75rem',
                                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
                                    backdropFilter: 'blur(12px)',
                                }}>
                                    <h3 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 800, margin: '0 0 0.35rem' }}>
                                        Manual Tasks Control Panel
                                    </h3>
                                    <p style={{ color: '#64748b', fontSize: '0.825rem', margin: '0 0 1.5rem', lineHeight: 1.4 }}>
                                        Execute Telegram bot modules in the background on-demand. Buttons will be locked while a job runs.
                                    </p>

                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                                        {[
                                            { action: 'discover', label: '1. Discover Groups', icon: '🔍', desc: 'Find target chats' },
                                            { action: 'join', label: '2. Join Groups', icon: '🔗', desc: 'Join best scoring' },
                                            { action: 'scrape', label: '3. Scrape Leads', icon: '👥', desc: 'Extract chat members' },
                                            { action: 'reply', label: '4. Check Replies', icon: '💬', desc: 'Process prospect DMs' },
                                            { action: 'dm', label: '5. Send DMs', icon: '📨', desc: 'Send outreach text' },
                                            { action: 'post', label: '6. Post Content', icon: '✏️', desc: 'Post content updates' },
                                            { action: 'analytics', label: '7. Sync Analytics', icon: '📊', desc: 'Fetch latest stats' },
                                        ].map(c => (
                                            <button
                                                key={c.action}
                                                disabled={activeJob !== null || isTriggering || useDemoMode}
                                                onClick={() => triggerAction(c.action)}
                                                style={{
                                                    padding: '1rem',
                                                    background: 'rgba(255,255,255,0.02)',
                                                    border: '1px solid rgba(255,255,255,0.06)',
                                                    borderRadius: '0.85rem',
                                                    color: '#fff', cursor: (activeJob || useDemoMode) ? 'not-allowed' : 'pointer',
                                                    textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.2rem',
                                                    opacity: (activeJob || useDemoMode) ? 0.4 : 1,
                                                    transition: 'all 0.2s',
                                                }}
                                                onMouseOver={(e) => {
                                                    if (!activeJob && !useDemoMode) e.currentTarget.style.border = '1px solid rgba(99,102,241,0.4)';
                                                }}
                                                onMouseOut={(e) => {
                                                    if (!activeJob && !useDemoMode) e.currentTarget.style.border = '1px solid rgba(255,255,255,0.06)';
                                                }}
                                            >
                                                <span style={{ fontSize: '0.85rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                                    {c.icon} {c.label}
                                                </span>
                                                <span style={{ color: '#64748b', fontSize: '0.72rem' }}>{c.desc}</span>
                                            </button>
                                        ))}
                                    </div>
                                    
                                    {useDemoMode && (
                                        <p style={{ color: '#f59e0b', fontSize: '0.75rem', marginTop: '1.25rem', fontWeight: 700 }}>
                                            ⚠️ Control panel is locked in Sandbox mode. Switch to Live Engine to run processes.
                                        </p>
                                    )}
                                </div>

                                {/* Mini Live Terminal */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <h3 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 800, margin: 0 }}>
                                            Live Console Output
                                        </h3>
                                        <button 
                                            onClick={() => setActiveTab('console')}
                                            style={{
                                                background: 'transparent', border: 'none', color: '#6366f1',
                                                fontSize: '0.8rem', fontWeight: 800, cursor: 'pointer'
                                            }}
                                        >
                                            View Fullscreen ↗
                                        </button>
                                    </div>
                                    <TerminalConsole 
                                        logs={logs} 
                                        onClear={() => setLogs([])} 
                                        filter={logFilter} 
                                        setFilter={setLogFilter} 
                                    />
                                </div>

                            </div>
                        </div>
                    )}

                    {/* 2. LEADS VIEW */}
                    {activeTab === 'leads' && (
                        <div>
                            {leads.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                                            Showing <span style={{ color: '#818cf8', fontWeight: 800 }}>{leads.length}</span> qualified leads from your scraped groups.
                                        </span>
                                        <button
                                            onClick={downloadTelegramLeadsCSV}
                                            style={{
                                                padding: '0.5rem 1rem',
                                                background: 'rgba(16, 185, 129, 0.1)',
                                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                                borderRadius: '0.6rem',
                                                color: '#34d399',
                                                fontSize: '0.78rem',
                                                fontWeight: 800,
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.4rem',
                                                transition: 'all 0.2s'
                                            }}
                                            onMouseOver={e => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'}
                                            onMouseOut={e => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'}
                                        >
                                            📥 Export CSV
                                        </button>
                                    </div>
                                    
                                    <div style={{
                                        background: 'var(--bg-tertiary)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '1.25rem', overflow: 'hidden',
                                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
                                        backdropFilter: 'blur(12px)',
                                    }}>
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: '2fr 1.2fr 0.6fr 0.8fr 0.6fr 1fr',
                                            padding: '1.1rem 1.5rem',
                                            borderBottom: '1px solid var(--glass-border)',
                                            gap: '1rem', background: 'rgba(255,255,255,0.01)'
                                        }}>
                                            {['Lead Details', 'Source Group', 'Score', 'Status', 'Step', 'Actions'].map(h => (
                                                <span key={h} style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: 850, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</span>
                                            ))}
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            {leads.map((lead, idx) => {
                                                const name = lead.name || [lead.first_name, lead.last_name].filter(Boolean).join(' ') || 'Anonymous User';
                                                const handle = lead.handle || (lead.username ? `@${lead.username}` : 'No username');
                                                const score = lead.score || 0;
                                                const status = lead.status || 'scraped';
                                                const step = lead.dm_step !== undefined ? lead.dm_step : (lead.dm_sequence_step !== undefined ? lead.dm_sequence_step : 0);
                                                const group = lead.group || lead.source_group || 'Unknown';
                                                const bio = lead.bio || 'No bio available';

                                                return (
                                                    <div key={lead.id || idx} style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: '2fr 1.2fr 0.6fr 0.8fr 0.6fr 1fr',
                                                        padding: '1.1rem 1.5rem', gap: '1rem',
                                                        borderBottom: '1px solid rgba(255,255,255,0.03)',
                                                        alignItems: 'center',
                                                    }}>
                                                        <div>
                                                            <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>{name}</div>
                                                            <div style={{ color: '#6366f1', fontSize: '0.78rem', marginTop: '0.1rem', fontWeight: 650 }}>{handle}</div>
                                                            <div style={{ 
                                                                color: '#64748b', fontSize: '0.75rem', marginTop: '0.35rem', 
                                                                lineHeight: 1.4, maxWidth: '300px', overflow: 'hidden', 
                                                                textOverflow: 'ellipsis', whiteSpace: 'nowrap' 
                                                            }} title={bio}>
                                                                {bio}
                                                            </div>
                                                        </div>
                                                        <div style={{ color: '#e2e8f0', fontSize: '0.825rem', fontWeight: 650 }}>{group}</div>
                                                        <div><ScoreBadge score={score} /></div>
                                                        <div><StatusBadge status={status} /></div>
                                                        <div style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 800 }}>{step}/3</div>
                                                        <div>
                                                            <button
                                                                onClick={() => handleGenerateOutreach(lead)}
                                                                style={{
                                                                    padding: '0.45rem 0.85rem',
                                                                    background: 'rgba(99, 102, 241, 0.15)',
                                                                    border: '1px solid rgba(99, 102, 241, 0.3)',
                                                                    borderRadius: '0.5rem',
                                                                    color: '#818cf8',
                                                                    fontSize: '0.72rem',
                                                                    fontWeight: 800,
                                                                    cursor: 'pointer',
                                                                    display: 'inline-flex',
                                                                    alignItems: 'center',
                                                                    gap: '0.35rem',
                                                                    transition: 'all 0.2s'
                                                                }}
                                                                onMouseOver={e => {
                                                                    e.currentTarget.style.background = 'rgba(99, 102, 241, 0.25)';
                                                                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.5)';
                                                                }}
                                                                onMouseOut={e => {
                                                                    e.currentTarget.style.background = 'rgba(99, 102, 241, 0.15)';
                                                                    e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
                                                                }}
                                                            >
                                                                ⚡ Outreach
                                                            </button>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div style={{
                                    background: 'var(--bg-tertiary)',
                                    border: '1px dashed var(--glass-border)',
                                    borderRadius: '1.25rem', padding: '4rem 2rem',
                                    textAlign: 'center', color: '#64748b'
                                }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
                                    <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.5rem' }}>No qualified leads found</h4>
                                    <p style={{ fontSize: '0.875rem', maxWidth: '420px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                                        The lead database is currently empty. Run **Group Discovery** and then **Lead Scraper** from the Control Panel to extract active participants.
                                    </p>
                                    <button 
                                        disabled={activeJob !== null || useDemoMode}
                                        onClick={() => triggerAction('discover')}
                                        style={{
                                            padding: '0.65rem 1.25rem', background: '#6366f1', border: 'none',
                                            borderRadius: '0.6rem', color: '#fff', fontWeight: 800, cursor: 'pointer'
                                        }}
                                    >
                                        Run Discovery Now
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 3. GROUPS VIEW */}
                    {activeTab === 'groups' && (
                        <div>
                            {groups.length > 0 ? (
                                <div style={{
                                    background: 'var(--bg-tertiary)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '1.25rem', overflow: 'hidden',
                                    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
                                    backdropFilter: 'blur(12px)',
                                }}>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                                        padding: '1.1rem 1.5rem',
                                        borderBottom: '1px solid var(--glass-border)',
                                        gap: '1rem', background: 'rgba(255,255,255,0.01)'
                                    }}>
                                        {['Group Name & Details', 'Estimated Members', 'Discovered For Keyword', 'Relevance Score', 'Joined Status'].map(h => (
                                            <span key={h} style={{ color: '#64748b', fontSize: '0.72rem', fontWeight: 850, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</span>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        {groups.map((g, idx) => {
                                            const name = g.title || g.name || 'Unknown Group';
                                            const handle = g.username ? `@${g.username}` : 'Private Group';
                                            const members = g.members || 0;
                                            const keyword = g.keyword_matched || 'N/A';
                                            const score = g.score || 0;
                                            const joined = g.joined || false;

                                            return (
                                                <div key={g.id || idx} style={{
                                                    display: 'grid',
                                                    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                                                    padding: '1.1rem 1.5rem', gap: '1rem',
                                                    borderBottom: '1px solid rgba(255,255,255,0.03)',
                                                    alignItems: 'center',
                                                }}>
                                                    <div>
                                                        <div style={{ color: '#fff', fontWeight: 700, fontSize: '0.9rem' }}>{name}</div>
                                                        <div style={{ color: '#38bdf8', fontSize: '0.78rem', marginTop: '0.1rem', fontWeight: 650 }}>{handle}</div>
                                                        {g.about && (
                                                            <div style={{ 
                                                                color: '#64748b', fontSize: '0.75rem', marginTop: '0.35rem', 
                                                                lineHeight: 1.4, maxWidth: '300px', overflow: 'hidden', 
                                                                textOverflow: 'ellipsis', whiteSpace: 'nowrap' 
                                                            }}>
                                                                {g.about}
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700 }}>
                                                        {members > 0 ? members.toLocaleString() : 'Pending'}
                                                    </div>
                                                    <div style={{ color: '#cbd5e1', fontSize: '0.825rem', fontStyle: 'italic' }}>"{keyword}"</div>
                                                    <div><ScoreBadge score={score} /></div>
                                                    <div><StatusBadge status={joined ? 'active' : 'paused'} /></div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <div style={{
                                    background: 'var(--bg-tertiary)',
                                    border: '1px dashed var(--glass-border)',
                                    borderRadius: '1.25rem', padding: '4rem 2rem',
                                    textAlign: 'center', color: '#64748b'
                                }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
                                    <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.5rem' }}>No target groups discovered yet</h4>
                                    <p style={{ fontSize: '0.875rem', maxWidth: '420px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                                        You haven't run any discovery tasks yet. Start group discovery to search for Telegram communities relating to your marketing keywords.
                                    </p>
                                    <button 
                                        disabled={activeJob !== null || useDemoMode}
                                        onClick={() => triggerAction('discover')}
                                        style={{
                                            padding: '0.65rem 1.25rem', background: '#6366f1', border: 'none',
                                            borderRadius: '0.6rem', color: '#fff', fontWeight: 800, cursor: 'pointer'
                                        }}
                                    >
                                        Start Group Discovery
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 4. CONTENT VIEW */}
                    {activeTab === 'content' && (
                        <div>
                            {useDemoMode ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {DEMO_CONTENT.map(c => (
                                        <div key={c.id} style={{
                                            background: 'var(--bg-tertiary)',
                                            border: '1px solid var(--glass-border)',
                                            borderRadius: '1.25rem', padding: '1.5rem',
                                        }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                                                <div>
                                                    <div style={{ color: '#fff', fontWeight: 800, fontSize: '0.9rem' }}>{c.group}</div>
                                                    <div style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.15rem' }}>Posted {c.posted_at}</div>
                                                </div>
                                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                                    <span style={{ color: '#64748b', fontSize: '0.8rem' }}>👍 {c.engagements} engagements</span>
                                                    <StatusBadge status={c.status} />
                                                </div>
                                            </div>
                                            <p style={{ color: '#cbd5e1', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>{c.content}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{
                                    background: 'var(--bg-tertiary)',
                                    border: '1px dashed var(--glass-border)',
                                    borderRadius: '1.25rem', padding: '4rem 2rem',
                                    textAlign: 'center', color: '#64748b'
                                }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✏️</div>
                                    <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 800, margin: '0 0 0.5rem' }}>No generated posts in queue</h4>
                                    <p style={{ fontSize: '0.875rem', maxWidth: '420px', margin: '0 auto 1.5rem', lineHeight: 1.5 }}>
                                        Content generation runs automatically on schedule, drafting personalized marketing copy with GPT-4o targeting your joined groups.
                                    </p>
                                    <button 
                                        disabled={activeJob !== null || useDemoMode}
                                        onClick={() => triggerAction('post')}
                                        style={{
                                            padding: '0.65rem 1.25rem', background: '#6366f1', border: 'none',
                                            borderRadius: '0.6rem', color: '#fff', fontWeight: 800, cursor: 'pointer'
                                        }}
                                    >
                                        Run Generator & Poster
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 5. FULL TERMINAL LOGS VIEW */}
                    {activeTab === 'console' && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                                <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                                    Displaying latest <span style={{ color: '#6366f1', fontWeight: 'bold' }}>{logs.length}</span> log lines from `engine.log`
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        disabled={activeJob !== null || useDemoMode}
                                        onClick={() => triggerAction('discover')}
                                        style={{
                                            padding: '0.45rem 1rem', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)',
                                            borderRadius: '0.5rem', color: '#a5b4fc', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer'
                                        }}
                                    >
                                        Test Group Search
                                    </button>
                                    <button
                                        disabled={activeJob !== null || useDemoMode}
                                        onClick={() => triggerAction('analytics')}
                                        style={{
                                            padding: '0.45rem 1rem', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)',
                                            borderRadius: '0.5rem', color: '#34d399', fontSize: '0.78rem', fontWeight: 800, cursor: 'pointer'
                                        }}
                                    >
                                        Test Analytics sync
                                    </button>
                                </div>
                            </div>
                            
                            <div style={{ height: '620px', display: 'flex', flexDirection: 'column' }}>
                                <TerminalConsole 
                                    logs={logs} 
                                    onClear={() => setLogs([])} 
                                    filter={logFilter} 
                                    setFilter={setLogFilter} 
                                />
                            </div>
                        </div>
                    )}

                    {/* 6. SETTINGS VIEW */}
                    {activeTab === 'settings' && (
                        <form onSubmit={handleSaveSettings} style={{
                            background: 'var(--bg-tertiary)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '1.25rem', padding: '2rem',
                            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem',
                            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
                            backdropFilter: 'blur(12px)',
                        }}>
                            {/* Targeting Config */}
                            <div>
                                <h3 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 800, margin: '0 0 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem' }}>
                                    🎯 Marketing Targeting
                                </h3>
                                
                                <label style={labelStyle}>
                                    Target Niche Focus
                                    <input 
                                        value={settings.niche} 
                                        onChange={e => setSettings(s => ({ ...s, niche: e.target.value }))} 
                                        style={inputStyle} 
                                        placeholder="e.g. AI Growth Agency"
                                    />
                                </label>

                                <label style={labelStyle}>
                                    Search Keywords (comma-separated)
                                    <textarea 
                                        value={keywordInput} 
                                        onChange={e => setKeywordInput(e.target.value)} 
                                        style={{ ...inputStyle, minHeight: '75px', resize: 'vertical' }} 
                                        placeholder="AI agency, SaaS founders, growth hacking..."
                                    />
                                    <span style={{ color: '#64748b', fontSize: '0.72rem', marginTop: '0.25rem', display: 'block', lineHeight: 1.3 }}>
                                        Keywords the engine searches Telegram for to find marketing groups.
                                    </span>
                                </label>

                                <label style={labelStyle}>
                                    Post Call-To-Action (CTA) message
                                    <textarea 
                                        value={settings.cta_message} 
                                        onChange={e => setSettings(s => ({ ...s, cta_message: e.target.value }))} 
                                        style={{ ...inputStyle, minHeight: '75px', resize: 'vertical' }} 
                                        placeholder="We help brands scale using custom AI automation -> wemagnifai.com"
                                    />
                                </label>
                            </div>

                            {/* Limits & Delays Config */}
                            <div>
                                <h3 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 800, margin: '0 0 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.5rem' }}>
                                    ⚡ Safety & Limits
                                </h3>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                                    <label style={labelStyle}>
                                        Daily DM Limit
                                        <input 
                                            type="number" 
                                            value={settings.daily_dm_limit} 
                                            min={5} max={100}
                                            onChange={e => setSettings(s => ({ ...s, daily_dm_limit: Number(e.target.value) }))} 
                                            style={inputStyle} 
                                        />
                                    </label>
                                    <label style={labelStyle}>
                                        Daily Post Limit
                                        <input 
                                            type="number" 
                                            value={settings.daily_post_limit} 
                                            min={3} max={50}
                                            onChange={e => setSettings(s => ({ ...s, daily_post_limit: Number(e.target.value) }))} 
                                            style={inputStyle} 
                                        />
                                    </label>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                                    <label style={labelStyle}>
                                        Min Group Members
                                        <input 
                                            type="number" 
                                            value={settings.min_group_members} 
                                            onChange={e => setSettings(s => ({ ...s, min_group_members: Number(e.target.value) }))} 
                                            style={inputStyle} 
                                        />
                                    </label>
                                    <label style={labelStyle}>
                                        Max Group Members
                                        <input 
                                            type="number" 
                                            value={settings.max_group_members} 
                                            onChange={e => setSettings(s => ({ ...s, max_group_members: Number(e.target.value) }))} 
                                            style={inputStyle} 
                                        />
                                    </label>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                                    <label style={labelStyle}>
                                        Min Delay (seconds)
                                        <input 
                                            type="number" 
                                            value={settings.human_delay_min_seconds} 
                                            onChange={e => setSettings(s => ({ ...s, human_delay_min_seconds: Number(e.target.value) }))} 
                                            style={inputStyle} 
                                        />
                                    </label>
                                    <label style={labelStyle}>
                                        Max Delay (seconds)
                                        <input 
                                            type="number" 
                                            value={settings.human_delay_max_seconds} 
                                            onChange={e => setSettings(s => ({ ...s, human_delay_max_seconds: Number(e.target.value) }))} 
                                            style={inputStyle} 
                                        />
                                    </label>
                                </div>

                                <label style={labelStyle}>
                                    Min Lead Score to outreach
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.4rem' }}>
                                        <input 
                                            type="range" min={0} max={95} step={5} 
                                            value={settings.lead_score_threshold} 
                                            onChange={e => setSettings(s => ({ ...s, lead_score_threshold: Number(e.target.value) }))} 
                                            style={{ flex: 1, accentColor: '#6366f1' }} 
                                        />
                                        <span style={{ color: '#818cf8', fontWeight: 900, minWidth: '2.5rem', textAlign: 'right' }}>
                                            {settings.lead_score_threshold}
                                        </span>
                                    </div>
                                </label>

                                <button 
                                    type="submit" 
                                    disabled={savingSettings}
                                    style={{
                                        padding: '0.85rem 1.5rem',
                                        border: 'none', borderRadius: '0.75rem',
                                        background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                                        color: '#fff', fontWeight: 800, cursor: 'pointer',
                                        marginTop: '0.5rem', width: '100%',
                                        boxShadow: '0 4px 15px rgba(99,102,241,0.25)',
                                        transition: 'all 0.2s',
                                        opacity: savingSettings ? 0.6 : 1
                                    }}
                                >
                                    {savingSettings ? 'Saving Settings...' : 'Save & Sync Configuration'}
                                </button>
                            </div>
                        </form>
                    )}

                </div>
            </main>
            
            {/* Toast System Alert */}
            {toast && (
                <div style={{
                    position: 'fixed', right: '1.5rem', bottom: '1.5rem',
                    background: toast.type === 'success' ? '#10b981' : '#ef4444',
                    border: `1px solid ${toast.type === 'success' ? '#059669' : '#dc2626'}`,
                    color: '#fff', padding: '1rem 1.5rem',
                    borderRadius: '0.85rem', fontWeight: 800, fontSize: '0.875rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.45)', zIndex: 1000,
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    animation: 'fadeIn 0.2s ease-out'
                }}>
                    <span>{toast.type === 'success' ? '⚡' : '❌'}</span>
                    {toast.message}
                </div>
            )}

            {/* Outreach Modal */}
            {showOutreachModal && selectedLead && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(5, 5, 8, 0.85)',
                    backdropFilter: 'blur(12px)',
                    zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '1.5rem',
                }}>
                    <div style={{
                        background: 'var(--bg-tertiary)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '1.5rem', width: '100%', maxWidth: '640px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), var(--accent-glow)',
                        display: 'flex', flexDirection: 'column', maxHeight: '90vh',
                        overflow: 'hidden', animation: 'scaleIn 0.2s ease-out'
                    }}>
                        {/* Modal Header */}
                        <div style={{
                            padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'
                        }}>
                            <div>
                                <span style={{
                                    fontSize: '0.75rem', fontWeight: 900, textTransform: 'uppercase',
                                    color: '#818cf8', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '0.35rem'
                                }}>
                                    ⚡ Client Outreach Assistant
                                </span>
                                <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 800, margin: '0.25rem 0 0.1rem' }}>
                                    {selectedLead.name || [selectedLead.first_name, selectedLead.last_name].filter(Boolean).join(' ') || 'Anonymous User'}
                                </h3>
                                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.25rem' }}>
                                    <span style={{ color: '#6366f1', fontSize: '0.8rem', fontWeight: 600 }}>
                                        {selectedLead.handle || (selectedLead.username ? `@${selectedLead.username}` : 'No username')}
                                    </span>
                                    <span style={{ color: '#64748b', fontSize: '0.8rem' }}>•</span>
                                    <span style={{ color: '#e2e8f0', fontSize: '0.8rem' }}>
                                        {selectedLead.group || selectedLead.source_group || 'Unknown Group'}
                                    </span>
                                    <span style={{ marginLeft: '0.25rem' }}>
                                        <ScoreBadge score={selectedLead.score || 0} />
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowOutreachModal(false)}
                                style={{
                                    background: 'rgba(255,255,255,0.02)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    color: '#94a3b8', width: '32px', height: '32px', borderRadius: '50%',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    cursor: 'pointer', transition: 'all 0.2s', fontSize: '1.2rem', fontWeight: 'bold'
                                }}
                                onMouseOver={e => e.currentTarget.style.color = '#fff'}
                                onMouseOut={e => e.currentTarget.style.color = '#94a3b8'}
                            >
                                &times;
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            {/* Lead Bio Summary */}
                            <div style={{
                                background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.04)',
                                borderRadius: '0.75rem', padding: '1rem', fontSize: '0.85rem', color: '#cbd5e1'
                            }}>
                                <span style={{ color: '#64748b', fontWeight: 800, fontSize: '0.72rem', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                                    Lead Bio
                                </span>
                                {selectedLead.bio || 'No biography details found for this lead. AI will generate general high-converting hook.'}
                            </div>

                            {/* Outreach Tab Selectors */}
                            <div style={{
                                display: 'flex', gap: '0.25rem', background: 'rgba(255,255,255,0.02)',
                                border: '1px solid rgba(255,255,255,0.04)', borderRadius: '0.75rem', padding: '0.3rem'
                            }}>
                                {([
                                    { id: 'whatsapp', label: 'WhatsApp / Telegram', icon: '💬' },
                                    { id: 'linkedin', label: 'LinkedIn Note', icon: '💼' },
                                    { id: 'email', label: 'Cold Email', icon: '✉️' }
                                ] as const).map(tab => (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setOutreachTab(tab.id)}
                                        style={{
                                            flex: 1, padding: '0.5rem', borderRadius: '0.5rem',
                                            background: outreachTab === tab.id ? 'rgba(99,102,241,0.15)' : 'transparent',
                                            border: outreachTab === tab.id ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                                            color: outreachTab === tab.id ? '#fff' : '#64748b',
                                            fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem',
                                            transition: 'all 0.15s'
                                        }}
                                    >
                                        <span>{tab.icon}</span>
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* Loading State or Copy Display */}
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                                {generatingOutreach ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', gap: '1rem' }}>
                                        <div style={{
                                            width: '36px', height: '36px',
                                            border: '3px solid rgba(99,102,241,0.1)',
                                            borderTopColor: '#6366f1',
                                            borderRadius: '50%',
                                            animation: 'spin 1s linear infinite'
                                        }} />
                                        <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 650 }}>
                                            AI Assistant generating bespoke outreach messages...
                                        </span>
                                    </div>
                                ) : outreachCopy ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        {outreachTab === 'email' && (
                                            <div>
                                                <label style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                                                    Subject Line
                                                </label>
                                                <div style={{
                                                    background: 'rgba(255,255,255,0.01)',
                                                    border: '1px solid rgba(255,255,255,0.06)',
                                                    borderRadius: '0.5rem', padding: '0.65rem 0.85rem',
                                                    color: '#fff', fontSize: '0.85rem', fontWeight: 700,
                                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                                                }}>
                                                    <span>{outreachCopy.email_subject}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(outreachCopy.email_subject);
                                                            showToast('Subject line copied!', 'success');
                                                        }}
                                                        style={{
                                                            background: 'transparent', border: 'none', color: '#6366f1',
                                                            fontSize: '0.75rem', fontWeight: 800, cursor: 'pointer'
                                                        }}
                                                    >
                                                        Copy
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                                                <label style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>
                                                    Message Body
                                                </label>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const text = outreachTab === 'email' ? outreachCopy.email_body : (outreachTab === 'linkedin' ? outreachCopy.linkedin : outreachCopy.whatsapp);
                                                        navigator.clipboard.writeText(text);
                                                        showToast('Outreach message body copied!', 'success');
                                                    }}
                                                    style={{
                                                        background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                                                        borderRadius: '0.35rem', padding: '0.25rem 0.5rem', color: '#818cf8',
                                                        fontSize: '0.72rem', fontWeight: 800, cursor: 'pointer', transition: 'all 0.15s'
                                                    }}
                                                    onMouseOver={e => e.currentTarget.style.background = 'rgba(99,102,241,0.2)'}
                                                    onMouseOut={e => e.currentTarget.style.background = 'rgba(99,102,241,0.1)'}
                                                >
                                                    📋 Copy Text
                                                </button>
                                            </div>
                                            <textarea
                                                readOnly
                                                value={outreachTab === 'email' ? outreachCopy.email_body : (outreachTab === 'linkedin' ? outreachCopy.linkedin : outreachCopy.whatsapp)}
                                                style={{
                                                    width: '100%', minHeight: '140px', boxSizing: 'border-box',
                                                    background: '#040509', border: '1px solid rgba(255,255,255,0.06)',
                                                    borderRadius: '0.75rem', padding: '1rem', color: '#cbd5e1',
                                                    fontSize: '0.85rem', lineHeight: 1.5, fontFamily: 'inherit',
                                                    outline: 'none', resize: 'vertical'
                                                }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div style={{ color: '#ef4444', textAlign: 'center', padding: '2rem 0', fontSize: '0.85rem', fontWeight: 650 }}>
                                        ⚠️ Failed to load copy. Click the refresh button below to retry.
                                    </div>
                                )}
                            </div>

                            {/* Advice Tip Card */}
                            <div style={{
                                background: 'rgba(99,102,241,0.03)',
                                border: '1px solid rgba(99,102,241,0.1)',
                                borderRadius: '0.75rem', padding: '1rem',
                                display: 'flex', gap: '0.75rem', alignItems: 'flex-start'
                            }}>
                                <span style={{ fontSize: '1.25rem' }}>💡</span>
                                <div>
                                    <span style={{ color: '#a5b4fc', fontWeight: 800, fontSize: '0.78rem', display: 'block', marginBottom: '0.15rem' }}>
                                        B2B Outreach Playbook Tip
                                    </span>
                                    <p style={{ color: '#94a3b8', fontSize: '0.75rem', margin: 0, lineHeight: 1.45 }}>
                                        {selectedLead.score >= 80 
                                            ? "This lead has a very high quality score! They matched multiple target keywords. Mention a specific case study in their niche and offer a personalized Loom audit."
                                            : "This lead is warm but requires relationship building. Start by asking an open question about their current system setup before pitching WeMagnifAI services directly."}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div style={{
                            padding: '1.25rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)',
                            display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', background: 'rgba(255,255,255,0.01)'
                        }}>
                            <button
                                type="button"
                                onClick={() => handleGenerateOutreach(selectedLead)}
                                disabled={generatingOutreach}
                                style={{
                                    padding: '0.65rem 1.25rem', background: 'transparent',
                                    border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.6rem',
                                    color: '#cbd5e1', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer',
                                    transition: 'all 0.2s', opacity: generatingOutreach ? 0.5 : 1
                                }}
                                onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                                onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                            >
                                🔄 Regenerate AI Copy
                            </button>
                            <button
                                type="button"
                                onClick={() => setShowOutreachModal(false)}
                                style={{
                                    padding: '0.65rem 1.5rem', background: '#6366f1',
                                    border: 'none', borderRadius: '0.6rem',
                                    color: '#fff', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(99,102,241,0.2)', transition: 'all 0.2s'
                                }}
                                onMouseOver={e => e.currentTarget.style.background = '#4f46e5'}
                                onMouseOut={e => e.currentTarget.style.background = '#6366f1'}
                            >
                                Done
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}

const labelStyle: React.CSSProperties = {
    display: 'block', color: '#94a3b8',
    marginBottom: '1.25rem', fontWeight: 700, fontSize: '0.825rem',
};

const inputStyle: React.CSSProperties = {
    width: '100%', marginTop: '0.45rem',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '0.75rem', padding: '0.85rem 1.1rem',
    color: '#fff', boxSizing: 'border-box', fontSize: '0.85rem',
    outline: 'none', transition: 'border-color 0.2s'
};
