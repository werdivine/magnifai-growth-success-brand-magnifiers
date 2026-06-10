'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Brain, Rocket, Eye, Cpu, Settings, Play, Check } from 'lucide-react';

export default function AutomatedPipelines({ isColumn = false }: { isColumn?: boolean }) {
    const [activeTab, setActiveTab] = useState('data');
    const [simulatedRun, setSimulatedRun] = useState(false);

    // Mock Code Snippets for Editor
    const codeSnippets: Record<string, string> = {
        data: `// 1. Data Ingestion & Schema Extraction
import { DataPipeline } from '@wemagnifai/core';

const pipe = new DataPipeline({
    source: 'leads_lake',
    stream: true
});

pipe.on('data', async (rawLead) => {
    const parsed = await pipe.score(rawLead);
    if (parsed.intentScore > 0.85) {
        await pipe.routeTo('nurture_swarm', parsed);
    }
});`,
        model: `// 2. Autonomous Model Fine-Tuning
import { ModelOptimizer } from '@wemagnifai/models';

export async function optimizeWorkflow(modelId: string) {
    const optimizer = new ModelOptimizer(modelId);
    const metrics = await optimizer.evaluateMetrics();
    
    if (metrics.accuracy < 0.96) {
        await optimizer.tuneHyperparameters({
            learningRate: 5e-5,
            epochs: 3
        });
    }
}`,
        deploy: `// 3. Deployment & Edge Serving
import { deployEdgeFunction } from '@wemagnifai/edge';

export async function POST(req: Request) {
    const config = await req.json();
    
    const deployment = await deployEdgeFunction({
        name: \`agent-\${config.id}\`,
        runtime: 'edge-light',
        env: config.variables
    });
    
    return Response.json({ status: 'live', url: deployment.url });
}`
    };

    const leftColContent = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
            {/* Grid for Line Chart & Code Editor side by side */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.25rem',
                width: '100%'
            }}>
                <div className="liquid-glass" style={{
                    padding: '1.5rem',
                    borderRadius: '16px',
                    background: 'rgba(3, 3, 8, 0.8)',
                    border: '1px solid rgba(6, 182, 212, 0.2)',
                    position: 'relative'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div>
                            <h4 style={{ color: '#fff', fontSize: '0.95rem', fontWeight: 700 }}>AI Model Performance</h4>
                            <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Live evaluation error rates</p>
                        </div>
                        <span style={{
                            background: 'rgba(34, 211, 238, 0.1)',
                            color: '#22d3ee',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            padding: '3px 6px',
                            borderRadius: '6px'
                        }}>Active</span>
                    </div>

                    {/* Simulated SVG Graph */}
                    <div style={{ height: '120px', width: '100%', position: 'relative' }}>
                        <svg width="100%" height="100%" viewBox="0 0 100 30" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path
                                d="M0,25 Q15,8 30,12 T60,5 T90,8 T100,2"
                                fill="none"
                                stroke="url(#chartGlow)"
                                strokeWidth="1.5"
                                className="flowing-path"
                            />
                            <path
                                d="M0,25 Q15,8 30,12 T60,5 T90,8 T100,2 L100,30 L0,30 Z"
                                fill="url(#chartGlow)"
                            />
                        </svg>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', color: '#64748b', fontSize: '0.65rem' }}>
                            <span>Jan</span>
                            <span>Mar</span>
                            <span>May</span>
                            <span>Jul</span>
                            <span>Sep</span>
                            <span>Nov</span>
                        </div>
                    </div>
                </div>

                {/* 2. Code Editor Panel */}
                <div className="liquid-glass" style={{
                    borderRadius: '20px',
                    background: '#04040c',
                    border: '1px solid rgba(255,255,255,0.06)',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '10px 16px',
                        borderBottom: '1px solid rgba(255,255,255,0.08)',
                        background: 'rgba(255,255,255,0.02)'
                    }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} />
                            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
                        </div>
                        <div style={{ display: 'flex', gap: '6px' }}>
                            {['data', 'model', 'deploy'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    style={{
                                        background: activeTab === tab ? 'rgba(255,255,255,0.08)' : 'transparent',
                                        border: 'none',
                                        color: activeTab === tab ? '#fff' : '#64748b',
                                        fontSize: '0.7rem',
                                        padding: '2px 6px',
                                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        textTransform: 'capitalize',
                                        fontWeight: 600
                                    }}
                                >
                                    {tab}.ts
                                </button>
                            ))}
                        </div>
                    </div>
                    <pre style={{
                        margin: 0,
                        padding: '1rem',
                        color: '#a78bfa',
                        fontSize: '0.72rem',
                        overflowX: 'auto',
                        fontFamily: 'JetBrains Mono, monospace'
                    }}>
                        <code>{codeSnippets[activeTab]}</code>
                    </pre>
                </div>
            </div>

            {/* 3. Small Stats row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', width: '100%' }}>
                <div className="liquid-glass" style={{ padding: '1rem', borderRadius: '16px' }}>
                    <div style={{ color: '#22d3ee', fontSize: '1.4rem', fontWeight: 800 }}>1,297x</div>
                    <div style={{ color: '#cbd5e1', fontSize: '0.72rem', fontWeight: 600 }}>Data Processed (MoM)</div>
                </div>
                <div className="liquid-glass" style={{ padding: '1rem', borderRadius: '16px' }}>
                    <div style={{ color: '#34d399', fontSize: '1.4rem', fontWeight: 800 }}>30+</div>
                    <div style={{ color: '#cbd5e1', fontSize: '0.72rem', fontWeight: 600 }}>Active Auto-Workflows</div>
                </div>
            </div>
        </div>
    );

    if (isColumn) {
        return (
            <div className="tech-grid-bg" style={{ 
                width: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1.5rem',
                borderRadius: '20px',
                padding: '2.5rem',
                border: '1px solid rgba(6, 182, 212, 0.4)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(6, 182, 212, 0.1)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #06b6d4, transparent)' }} />
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ padding: '0.5rem', background: 'rgba(6,182,212,0.15)', borderRadius: '10px', color: '#22d3ee', display: 'flex' }}>
                        <Brain size={18} />
                    </div>
                    <div>
                        <h2 style={{
                            fontSize: '1.25rem',
                            fontFamily: 'var(--font-inter)',
                            fontWeight: 800,
                            margin: 0,
                            color: '#fff'
                        }}>
                            Automated AI Pipelines
                        </h2>
                        <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '0.2rem 0 0 0' }}>
                            Live experimental grid parameters
                        </p>
                    </div>
                </div>
                {leftColContent}
            </div>
        );
    }

    return (
        <section id="platform" style={{
            padding: '80px 2rem',
            background: 'radial-gradient(circle at center, #08081a 0%, #030308 100%)',
            position: 'relative',
            overflow: 'hidden',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            {/* Mesh Background Orbs */}
            <div className="orb orb-blue" style={{ top: '20%', left: '-10rem', opacity: 0.2 }} />
            <div className="orb orb-purple" style={{ bottom: '20%', right: '-10rem', opacity: 0.2 }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                {/* Section Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '4px 16px',
                        borderRadius: '9999px',
                        background: 'rgba(139, 92, 246, 0.1)',
                        border: '1px solid rgba(139, 92, 246, 0.2)',
                        marginBottom: '1rem'
                    }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#8b5cf6', display: 'inline-block' }} />
                        <span style={{ color: '#c4b5fd', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>AUTOMATED PIPELINES</span>
                    </div>
                    <h2 className="glow-text" style={{
                        fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
                        fontFamily: 'var(--font-playfair)',
                        fontWeight: 900,
                        lineHeight: 1.1,
                        marginBottom: '1rem'
                    }}>
                        Automated AI Pipelines
                    </h2>
                    <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                        Seamless, Scalable, and Secure AI-as-a-Service workflows configured for complete autonomous execution.
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '2rem',
                    alignItems: 'stretch'
                }}>
                    {leftColContent}

                    {/* RIGHT COLUMN: Pipeline Cards */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem'
                    }}>
                        {[
                            {
                                id: 'ingest',
                                icon: <Database size={20} color="#22d3ee" />,
                                title: 'Data Ingestion & Processing',
                                desc: 'Dynamic scrapers, file listeners, and DB connectors parsing unstructured customer data 24/7.',
                                actionText: 'Configure Stream',
                                color: 'rgba(34, 211, 238, 0.15)'
                            },
                            {
                                id: 'train',
                                icon: <Brain size={20} color="#8b5cf6" />,
                                title: 'Model Training & Optimization',
                                desc: 'Automated parameter tuning, custom fine-tuning pipelines, and semantic routing maps.',
                                actionText: 'Tune Parameters',
                                color: 'rgba(139, 92, 246, 0.15)'
                            },
                            {
                                id: 'deploy',
                                icon: <Rocket size={20} color="#ec4899" />,
                                title: 'Deployment & Serving',
                                desc: 'Edge deployment for LLM endpoints with zero cold starts and dynamic scaling buffers.',
                                actionText: 'Deploy Edge',
                                color: 'rgba(236, 72, 153, 0.15)'
                            },
                            {
                                id: 'analytics',
                                icon: <Eye size={20} color="#10b981" />,
                                title: 'Monitoring & Analytics',
                                desc: 'Full traceability. Real-time cost dashboards, hallucination safeguards, and intent scoring checks.',
                                actionText: 'View Trace Logs',
                                color: 'rgba(16, 185, 129, 0.15)'
                            }
                        ].map((card) => (
                            <div
                                key={card.id}
                                className="liquid-glass"
                                style={{
                                    padding: '1.5rem',
                                    borderRadius: '20px',
                                    display: 'flex',
                                    gap: '1.25rem',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease',
                                    border: '1px solid rgba(255,255,255,0.06)'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateX(0)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '12px',
                                    background: card.color,
                                    flexShrink: 0
                                }}>
                                    {card.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem' }}>{card.title}</h4>
                                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>{card.desc}</p>
                                    <button
                                        onClick={() => {
                                            setSimulatedRun(true);
                                            setTimeout(() => setSimulatedRun(false), 2000);
                                        }}
                                        style={{
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            color: '#e2e8f0',
                                            padding: '6px 14px',
                                            borderRadius: '8px',
                                            fontSize: '0.78rem',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            transition: 'background 0.2s'
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                                    >
                                        {simulatedRun ? <Check size={12} color="#10b981" /> : <Play size={10} />}
                                        {simulatedRun ? 'Completed' : card.actionText}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
