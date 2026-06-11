import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  ArrowRight, Search, TrendingUp, FileText, Link2, BarChart3, 
  Zap, CheckCircle, AlertTriangle, HelpCircle, Globe, 
  Target, RefreshCw, MessageSquare
} from 'lucide-react';
import styles from '../services.module.css';
import { FadeIn } from '@/components/FadeIn';

export const metadata = {
  title: 'GEO Services | WeMagnifAI — Get Cited by AI',
  description: 'Generative Engine Optimization that ranks your brand in ChatGPT, Perplexity, and Google AI Overviews. Get cited as an authoritative source in AI-generated answers.',
};

export default function GEOServicePage() {
  const benefits = [
    { icon: <Globe size={32} />, title: 'AI Citation Visibility', desc: 'Rank in ChatGPT, Perplexity, and Google AI Overviews — the new discovery layer for B2B buyers.' },
    { icon: <Target size={32} />, title: 'Source-Aimed Content', desc: 'Content structured for LLM extraction — clear entities, cited stats, and authoritative signals.' },
    { icon: <Zap size={32} />, title: 'Entity Optimization', desc: 'Structured data, topic depth, and semantic markup that AI engines trust and cite.' },
  ];

  const problems = [
    { icon: <TrendingUp size={24} />, title: 'Answer Blindness', desc: 'Ignoring AI-generated answers while competitors get cited in ChatGPT and Perplexity.' },
    { icon: <AlertTriangle size={24} />, title: 'No AI Strategy', desc: 'Traditional SEO content fails in AI contexts because it lacks cited entities and structured facts.' },
    { icon: <RefreshCw size={24} />, title: 'Unoptimised Entities', desc: 'Missing schema, unclear sources, and unparseable content blocks that AI skips.' },
    { icon: <Search size={24} />, title: 'Citation Gap', desc: 'Zero visibility in AI search means zero consideration in the new research workflow.' },
  ];

  const pillars = [
    { n: '01', title: 'Entity Architecture', desc: 'Clear author bios, cited sources, and structured facts that AI can extract and trust.' },
    { n: '02', title: 'Semantic Depth', desc: 'Topic clusters with cited stats, definitions, and authoritative references per entity.' },
    { n: '03', title: 'Citation Structure', desc: 'FAQ optimization, Q&A markup, and content patterns that trigger AI citations.' },
    { n: '04', title: 'Trust Signals', desc: 'E-E-A-T reinforcement through credentials, citations, and verified source links.' },
    { n: '05', title: 'AI Testing', desc: 'Weekly prompt testing across ChatGPT, Perplexity, and Gemini to track citation emergence.' },
    { n: '06', title: 'Citation Scale', desc: 'Programmatic GEO pages targeting AI citation gaps with 20-100 pages per quarter.' },
    { n: '07', title: 'AI Monitoring', desc: 'Track when your pages get cited, by which models, and for which queries in real-time.' },
  ];

  const process = [
    { n: '01', title: 'AI Audit & Baseline', desc: 'Citation audit across ChatGPT, Perplexity, and AI Overviews with competitive gap analysis.' },
    { n: '02', title: 'Entity Blueprint', desc: 'Knowledge graph design, source mapping, and 12-month GEO roadmap.' },
    { n: '03', title: 'Content Execution', desc: 'Citation-ready content production, schema deployment, and trust signal implementation.' },
    { n: '04', title: 'Monitor & Scale', desc: 'Weekly citation tracking, prompt iteration, and GEO expansion based on results.' },
  ];

  const testimonials = [
    { quote: 'We now appear in ChatGPT answers for 23 of our core topics. Pipeline increased 40% in 3 months.', author: 'Alex Rivera', role: 'Head of Growth', org: 'Nexus AI' },
    { quote: 'The citation layer doubled our unprompted mentions in LLM responses. Brand awareness grew without ads.', author: 'Dana Kim', role: 'CMO', org: 'QuantumStack' },
    { quote: 'GEO strategy delivered 15x citation lift in Perplexity. Competitors now cite us as the source.', author: 'James Liu', role: 'Founder', org: 'SynthFlow' },
  ];

  const faqs = [
    { q: 'How long does GEO take to show results?', a: 'Initial citation tests can show within 2-4 weeks. Measurable citation growth typically takes 2-4 months as AI models index your content.' },
    { q: 'What is Generative Engine Optimization (GEO)?', a: 'GEO optimizes content to be cited by AI engines like ChatGPT, Perplexity, and Google AI Overviews. Unlike SEO (blue links), GEO targets AI-generated answers.' },
    { q: 'Can you guarantee AI citations?', a: 'No — AI models are unpredictable and constantly evolving. We guarantee optimization quality, transparency, and measurable citation growth over time.' },
    { q: 'What is your minimum contract commitment?', a: 'Our minimum engagement is 3 months. Meaningful GEO requires entity setup, content production, and citation monitoring cycles.' },
    { q: 'How does programmatic GEO scale?', a: 'We target long-tail AI citation gaps with unique, structured content. Each page targets a specific question entity LLMs can cite.' },
    { q: 'Do you handle technical GEO separately?', a: 'Entity/GEO optimization is always Phase 1. We fix schema, trust signals, and structured data before content production begins.' },
  ];

  const schemas = {
    faq: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.a
        }
      }))
    },
    service: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Generative Engine Optimization (GEO)",
      "provider": {
        "@type": "Organization",
        "name": "WeMagnifAI"
      },
      "description": "Generative Engine Optimization that ranks your brand in ChatGPT, Perplexity, and Google AI Overviews. Get cited as an authoritative source in AI-generated answers.",
      "areaServed": "Worldwide"
    }
  };

  return (
    <>
      <Header />
      <main className={styles.servicePage} style={{ '--accent-color': '#8B5CF6', '--accent-light': '#A78BFA', '--icon-bg': 'rgba(139,92,246,0.12)', '--icon-color': '#8B5CF6' } as React.CSSProperties}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.service) }}
        />

        {/* 1. HERO */}
        <FadeIn>
          <section className={styles.sectionLight} style={{ background: 'transparent', borderBottom: '1px solid rgba(139,92,246,0.15)' }}>
            <div className={styles.container} style={{ textAlign: 'center', padding: '8rem 2rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1.25rem',
                borderRadius: '999px',
                background: 'rgba(139,92,246,0.12)',
                border: '1px solid rgba(139,92,246,0.3)',
                color: '#8b5cf6',
                fontWeight: 700,
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '2rem'
              }}>
                <Search size={16} /> GEO Services
              </div>
              <h1 style={{
                fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                fontFamily: 'var(--font-playfair)',
                fontWeight: 800,
                color: '#fff',
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                maxWidth: '900px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}>
                Get Cited by AI.<br /><span style={{ color: '#8b5cf6' }}>Own the Answers.</span>
              </h1>
              <p style={{
                fontSize: '1.3rem',
                color: '#94a3b8',
                maxWidth: '650px',
                lineHeight: 1.7,
                margin: '0 auto 3rem'
              }}>
                Generative Engine Optimization ranks your brand in ChatGPT, Perplexity, and Google AI Overviews. Appear as the authoritative source in AI-generated answers.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
                  color: '#fff', fontWeight: 800, textDecoration: 'none',
                  padding: '1rem 2.5rem', borderRadius: '0.875rem', fontSize: '1.05rem',
                  boxShadow: '0 8px 32px rgba(139,92,246,0.3)'
                }}>
                  Start GEO Strategy <ArrowRight size={20} />
                </Link>
                <Link href="/tools/geo-audit" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#e2e8f0', fontWeight: 700, textDecoration: 'none',
                  padding: '1rem 2.5rem', borderRadius: '0.875rem', fontSize: '1.05rem'
                }}>
                  Free GEO Audit <BarChart3 size={20} />
                </Link>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* 2. BENEFITS */}
        <FadeIn>
          <section style={{ padding: '6rem 2rem', background: 'transparent', borderBottom: '1px solid rgba(var(--foreground-rgb), 0.06)' }}>
            <div className={styles.container}>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700, color: 'var(--foreground)',
                marginBottom: '0.75rem', textAlign: 'center'
              }}>Why GEO Matters</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '4rem', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
                The AI search layer is the new discovery channel.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2rem'
              }}>
                {benefits.map((b, i) => (
                  <div key={i} style={{
                    background: 'rgba(var(--foreground-rgb), 0.03)',
                    border: '1px solid rgba(var(--foreground-rgb), 0.08)',
                    borderRadius: '1.25rem',
                    padding: '2rem',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: '1rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(139,92,246,0.12)', color: '#8b5cf6',
                      marginBottom: '1.25rem'
                    }}>{b.icon}</div>
                    <h3 style={{
                      fontSize: '1.2rem', fontWeight: 700, color: 'var(--foreground)',
                      marginBottom: '0.75rem', fontFamily: 'var(--font-inter)'
                    }}>{b.title}</h3>
                    <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.95rem' }}>{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* 3. PAIN POINTS */}
        <FadeIn>
          <section style={{ padding: '6rem 2rem', background: 'rgba(var(--foreground-rgb), 0.02)', borderBottom: '1px solid rgba(var(--foreground-rgb), 0.06)' }}>
            <div className={styles.container}>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700, color: 'var(--foreground)',
                marginBottom: '0.75rem', textAlign: 'center'
              }}>Why Most Brands Get Ignored by AI</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '4rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                We see these failures weekly. Here's what we fix.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
                {problems.map((p, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '1.25rem',
                    padding: '1.5rem',
                    background: 'rgba(var(--foreground-rgb), 0.03)',
                    border: '1px solid rgba(var(--foreground-rgb), 0.08)',
                    borderRadius: '1rem'
                  }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: '0.75rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'rgba(239,68,68,0.12)', color: '#ef4444',
                      flexShrink: 0
                    }}>{p.icon}</div>
                    <div>
                      <h3 style={{ fontWeight: 700, color: 'var(--foreground)', fontSize: '1.05rem', marginBottom: '0.35rem' }}>{p.title}</h3>
                      <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* 4. SOLUTION / 7-PILLAR */}
        <FadeIn>
          <section style={{ padding: '6rem 2rem', background: 'transparent', borderBottom: '1px solid rgba(var(--foreground-rgb), 0.06)' }}>
            <div className={styles.container}>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700, color: 'var(--foreground)',
                marginBottom: '0.75rem', textAlign: 'center'
              }}>The 7-Pillar GEO Framework</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '4rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                A repeatable system for compounding AI citation visibility.
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem'
              }}>
                {pillars.map((p, i) => (
                  <div key={i} style={{
                    padding: '1.75rem',
                    background: 'rgba(var(--foreground-rgb), 0.03)',
                    border: '1px solid rgba(var(--foreground-rgb), 0.08)',
                    borderRadius: '1rem',
                    position: 'relative'
                  }}>
                    <div style={{
                      fontSize: '2.5rem', fontWeight: 800,
                      fontFamily: 'var(--font-playfair)',
                      background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      marginBottom: '0.75rem',
                      lineHeight: 1
                    }}>{p.n}</div>
                    <h3 style={{ fontWeight: 700, color: 'var(--foreground)', fontSize: '1.05rem', marginBottom: '0.5rem', fontFamily: 'var(--font-inter)' }}>{p.title}</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.6 }}>{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* 5. 4-STEP PROCESS */}
        <FadeIn>
          <section style={{ padding: '6rem 2rem', background: 'rgba(var(--foreground-rgb), 0.02)', borderBottom: '1px solid rgba(var(--foreground-rgb), 0.06)' }}>
            <div className={styles.container}>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700, color: 'var(--foreground)',
                marginBottom: '3rem', textAlign: 'center'
              }}>From Zero to AI-Cited in 4 Steps</h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1.5rem',
                position: 'relative'
              }}>
                {process.map((step, i) => (
                  <div key={i} style={{
                    textAlign: 'center',
                    padding: '2rem 1rem',
                    position: 'relative'
                  }}>
                    <div style={{
                      width: 72, height: 72, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 1.5rem',
                      background: 'rgba(139,92,246,0.1)',
                      border: '2px solid rgba(139,92,246,0.3)',
                      fontSize: '1.5rem', fontWeight: 800,
                      fontFamily: 'var(--font-playfair)',
                      color: '#8b5cf6'
                    }}>{step.n}</div>
                    <h3 style={{ fontWeight: 700, color: 'var(--foreground)', fontSize: '1.1rem', marginBottom: '0.75rem', fontFamily: 'var(--font-inter)' }}>{step.title}</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* 6. TESTIMONIALS */}
        <FadeIn>
          <section style={{ padding: '6rem 2rem', background: 'transparent' }}>
            <div className={styles.container}>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700, color: 'var(--foreground)',
                marginBottom: '0.75rem', textAlign: 'center'
              }}>Citation Results</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '4rem', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
                Real citations from real AI engines.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                {testimonials.map((t, i) => (
                  <div key={i} style={{
                    background: 'rgba(var(--foreground-rgb), 0.03)',
                    border: '1px solid rgba(var(--foreground-rgb), 0.08)',
                    borderRadius: '1.25rem',
                    padding: '2rem',
                    position: 'relative'
                  }}>
                    <MessageSquare size={20} style={{ color: '#8b5cf6', marginBottom: '1rem', opacity: 0.7 }} />
                    <p style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: 700, fontSize: '0.85rem'
                      }}>{t.author.split(' ').map(n => n[0]).join('')}</div>
                      <div>
                        <div style={{ color: 'var(--foreground)', fontWeight: 700, fontSize: '0.9rem' }}>{t.author}</div>
                        <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{t.role}, {t.org}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* 7. FAQ */}
        <FadeIn>
          <section id="faq" style={{ padding: '6rem 2rem', background: 'rgba(var(--foreground-rgb), 0.02)', borderBottom: '1px solid rgba(var(--foreground-rgb), 0.06)' }}>
            <div className={styles.container} style={{ maxWidth: '850px', margin: '0 auto' }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700, color: 'var(--foreground)',
                marginBottom: '0.75rem', textAlign: 'center'
              }}>Frequently Asked Questions</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '3.5rem' }}>
                Straight answers — no sales deflection.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {faqs.map((faq, i) => (
                  <details key={i} style={{
                    background: 'rgba(var(--foreground-rgb), 0.03)',
                    border: '1px solid rgba(var(--foreground-rgb), 0.08)',
                    borderRadius: '1rem',
                    overflow: 'hidden'
                  }}>
                    <summary style={{
                      padding: '1.25rem 1.5rem',
                      fontWeight: 700,
                      color: 'var(--foreground)',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '1rem',
                      fontFamily: 'var(--font-inter)',
                      listStyle: 'none'
                    }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <HelpCircle size={20} style={{ color: '#8b5cf6', flexShrink: 0 }} />
                        {faq.q}
                      </span>
                      <span style={{ color: '#64748b', fontSize: '0.8rem' }}>+</span>
                    </summary>
                    <div style={{
                      padding: '0 1.5rem 1.5rem',
                      color: '#94a3b8',
                      fontSize: '0.95rem',
                      lineHeight: 1.7
                    }}>
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* 8. FINAL CTA */}
        <FadeIn>
          <section style={{
            padding: '7rem 2rem',
            background: 'transparent',
            textAlign: 'center',
            borderTop: '1px solid rgba(139,92,246,0.15)'
          }}>
            <div style={{ maxWidth: '650px', margin: '0 auto' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
                <Search size={64} style={{ color: '#8b5cf6', opacity: 0.8 }} />
              </div>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontFamily: 'var(--font-playfair)',
                fontWeight: 800, color: 'var(--foreground)',
                marginBottom: '1.25rem'
              }}>Ready to Own AI Search?</h2>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '1.1rem',
                lineHeight: 1.7,
                marginBottom: '2.5rem'
              }}>
                Book a free GEO strategy call. We'll test your brand mentions in ChatGPT, Perplexity, and Google AI Overviews — and show you exactly where citations are missing.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
                  color: '#fff', fontWeight: 800, textDecoration: 'none',
                  padding: '1.125rem 2.75rem', borderRadius: '1rem', fontSize: '1.1rem',
                  boxShadow: '0 8px 32px rgba(139,92,246,0.35)'
                }}>
                  Book Free Consult <ArrowRight size={20} />
                </Link>
                <Link href="/tools/geo-audit" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#e2e8f0', fontWeight: 700, textDecoration: 'none',
                  padding: '1.125rem 2.75rem', borderRadius: '1rem', fontSize: '1.1rem'
                }}>
                  Get Free Audit <BarChart3 size={20} />
                </Link>
              </div>
            </div>
          </section>
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}
