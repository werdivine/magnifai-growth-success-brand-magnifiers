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
  title: 'SEO & GEO Services | WeMagnifAI — Rank Everywhere',
  description: 'Search and Generative Engine Optimisation that drives qualified traffic. We build SEO systems that rank in Google, ChatGPT, Perplexity, and AI Overviews.',
};

export default function SEOServicePage() {
  const benefits = [
    { icon: <Globe size={32} />, title: 'Search + AI Visibility', desc: 'Rank in Google and AI-generated answers simultaneously. One strategy, two discovery channels.' },
    { icon: <Target size={32} />, title: 'Intent-Aimed Content', desc: 'Every piece targets a specific buyer moment — not vanity metrics or keyword stuffing.' },
    { icon: <Zap size={32} />, title: 'Technical Excellence', desc: 'Core Web Vitals, crawlability, and schema done once — not patched monthly.' },
  ];

  const problems = [
    { icon: <TrendingUp size={24} />, title: 'Vanity Rankings', desc: 'Ranking for high-volume keywords that bring zero qualified traffic or conversions.' },
    { icon: <AlertTriangle size={24} />, title: 'SaaS Floor Updates', desc: 'Every algorithm update wipes out months of work because content lacks real topical depth.' },
    { icon: <RefreshCw size={24} />, title: 'Agency Churn', desc: 'Monthly retainers for 5 articles when you need 50, with zero content architecture.' },
    { icon: <Search size={24} />, title: 'AI Blindness', desc: 'Ignoring Generative Engine Optimisation while competitors get cited in ChatGPT and Perplexity.' },
  ];

  const pillars = [
    { n: '01', title: 'Technical Foundation', desc: 'Core Web Vitals, crawl budget optimisation, index coverage, and XML sitemap hygiene.' },
    { n: '02', title: 'Content Architecture', desc: 'Topic clusters, keyword mapping, and content calendars built around buyer intent.' },
    { n: '03', title: 'Entity & GEO Layer', desc: 'Schema markup, FAQ optimisation, and structured data to rank in AI-generated answers.' },
    { n: '04', title: 'Digital PR & Links', desc: 'Resource link acquisition, digital PR campaigns, and editorial guest placements.' },
    { n: '05', title: 'Programmatic Scale', desc: 'AI-assisted content production targeting long-tail clusters — 50–500 pages per quarter.' },
    { n: '06', title: 'Analytics & Attribution', desc: 'Ranking dashboards, traffic-to-lead attribution, and ROI reporting every 30 days.' },
    { n: '07', title: 'Continuous Optimisation', desc: 'Algorithm response, competitive gap analysis, and content decay monitoring.' },
  ];

  const process = [
    { n: '01', title: 'Audit & Baseline', desc: 'Full technical, content, and backlink audit with competitor benchmarking and gap analysis.' },
    { n: '02', title: 'Strategy Blueprint', desc: 'Keyword research, topic architecture, 12-month ranking roadmap, and GEO layer design.' },
    { n: '03', title: 'Execution Sprints', desc: 'Content production, technical fixes, and link acquisition in monthly or quarterly sprints.' },
    { n: '04', title: 'Measure & Iterate', desc: 'Monthly reporting, strategy refinement, and continuous optimisation based on performance data.' },
  ];

  const testimonials = [
    { quote: 'Our organic pipeline grew from 12 to 89 leads per month in 7 months. The technical fixes alone unlocked 300% more crawl budget.', author: 'Sarah Chen', role: 'CMO', org: 'TechFlow SaaS' },
    { quote: 'We now appear in Perplexity answers for 14 of our core service pages. The GEO layer doubled our branded search impressions.', author: 'Marcus Webb', role: 'Growth Lead', org: 'Apex Consulting' },
    { quote: 'Programmatic SEO pages brought in 4,200 visitors in the first month. Lead quality was higher than our paid campaigns.', author: 'Priya Sharma', role: 'VP Marketing', org: 'DataBridge' },
  ];

  const faqs = [
    { q: 'How long does SEO take to show results?', a: 'Technical and foundational improvements can show measurable movement in 4–8 weeks. Significant ranking improvements typically take 3–6 months, with sustained growth compounding from there.' },
    { q: 'What is Generative Engine Optimisation (GEO)?', a: 'GEO is the practice of optimising content so AI engines like ChatGPT, Perplexity, and Google AI Overviews can surface your brand in generated answers. We layer this on top of traditional SEO.' },
    { q: 'Do you guarantee first-page rankings?', a: 'No ethical SEO agency can guarantee specific rankings — search engines do not permit this. We guarantee process excellence, transparency, and measurable improvements in traffic and visibility over time.' },
    { q: 'What is your minimum contract commitment?', a: 'Our minimum engagement is 3 months. Meaningful SEO requires technical setup, content production, and link acquisition cycles that cannot be rushed.' },
    { q: 'How does programmatic SEO work?', a: 'We use AI-assisted research and writing at scale — targeting long-tail keyword clusters with unique, indexed pages. Each page targets a specific query intent, building compounding coverage.' },
    { q: 'Do you handle technical SEO separately?', a: 'Technical SEO is always Phase 1, regardless of content scope. We fix crawlability, Core Web Vitals, and schema before any content production begins.' },
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
      "name": "SEO & GEO Services",
      "provider": {
        "@type": "Organization",
        "name": "WeMagnifAI"
      },
      "description": "Search and Generative Engine Optimisation that drives qualified traffic. We build SEO systems that rank in Google, ChatGPT, Perplexity, and AI Overviews.",
      "areaServed": "Worldwide"
    }
  };

  return (
    <>
      <Header />
      <main className={styles.servicePage} style={{ '--accent-color': '#22D3EE', '--accent-light': '#67E8F9', '--icon-bg': 'rgba(34,211,238,0.12)', '--icon-color': '#22D3EE' } as React.CSSProperties}>
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
          <section className={styles.sectionLight} style={{ background: 'linear-gradient(180deg, rgba(8,8,22,1) 0%, rgba(12,13,29,1) 100%)', borderBottom: '1px solid rgba(34,211,238,0.15)' }}>
            <div className={styles.container} style={{ textAlign: 'center', padding: '8rem 2rem' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1.25rem',
                borderRadius: '999px',
                background: 'rgba(34,211,238,0.12)',
                border: '1px solid rgba(34,211,238,0.3)',
                color: '#22d3ee',
                fontWeight: 700,
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: '2rem'
              }}>
                <Search size={16} /> SEO &amp; GEO Optimisation
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
                Rank Everywhere.<br /><span style={{ color: '#22d3ee' }}>AI Search Included.</span>
              </h1>
              <p style={{
                fontSize: '1.3rem',
                color: '#94a3b8',
                maxWidth: '650px',
                lineHeight: 1.7,
                margin: '0 auto 3rem'
              }}>
                Modern SEO isn&apos;t just Google. We optimise for traditional search and Generative Engine Optimisation — so you appear in ChatGPT, Perplexity, and Google AI Overviews.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: 'linear-gradient(135deg, #22D3EE, #6366F1)',
                  color: '#fff', fontWeight: 800, textDecoration: 'none',
                  padding: '1rem 2.5rem', borderRadius: '0.875rem', fontSize: '1.05rem',
                  boxShadow: '0 8px 32px rgba(34,211,238,0.3)'
                }}>
                  Start SEO Strategy <ArrowRight size={20} />
                </Link>
                <Link href="/tools/seo-audit" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#e2e8f0', fontWeight: 700, textDecoration: 'none',
                  padding: '1rem 2.5rem', borderRadius: '0.875rem', fontSize: '1.05rem'
                }}>
                  Free SEO Audit <BarChart3 size={20} />
                </Link>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* 2. BENEFITS */}
        <FadeIn>
          <section style={{ padding: '6rem 2rem', background: 'var(--bg-primary)', borderBottom: '1px solid rgba(var(--foreground-rgb), 0.06)' }}>
            <div className={styles.container}>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700, color: 'var(--foreground)',
                marginBottom: '0.75rem', textAlign: 'center'
              }}>What Differentiates Our Approach</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '4rem', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
                A hybrid SEO model built for the AI-first web.
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
                      background: 'rgba(34,211,238,0.12)', color: '#22d3ee',
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
              }}>Why Most SEO Projects Fail</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '4rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                We see these failures weekly. Here&apos;s what we fix.
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
          <section style={{ padding: '6rem 2rem', background: 'var(--bg-primary)', borderBottom: '1px solid rgba(var(--foreground-rgb), 0.06)' }}>
            <div className={styles.container}>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700, color: 'var(--foreground)',
                marginBottom: '0.75rem', textAlign: 'center'
              }}>The 7-Pillar SEO Framework</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '4rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                A repeatable system for compounding organic visibility across search and AI channels.
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
                      background: 'linear-gradient(135deg, #22d3ee, #6366f1)',
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
              }}>From Zero to Ranked in 4 Steps</h2>
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
                    {i < process.length - 1 && (
                      <div style={{
                        position: 'absolute',
                        top: '4.5rem', right: -'10%',
                        width: '20%', height: '2px',
                        background: 'linear-gradient(90deg, rgba(34,211,238,0.4), rgba(99,102,241,0.4))',
                        display: 'none'
                      }} className="step-connector" />
                    )}
                    <div style={{
                      width: 72, height: 72, borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 1.5rem',
                      background: 'rgba(34,211,238,0.1)',
                      border: '2px solid rgba(34,211,238,0.3)',
                      fontSize: '1.5rem', fontWeight: 800,
                      fontFamily: 'var(--font-playfair)',
                      color: '#22d3ee'
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
          <section style={{ padding: '6rem 2rem', background: 'var(--bg-primary)' }}>
            <div className={styles.container}>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontFamily: 'var(--font-playfair)',
                fontWeight: 700, color: 'var(--foreground)',
                marginBottom: '0.75rem', textAlign: 'center'
              }}>Measurable Results</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '4rem', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
                Client outcomes speak louder than agency promises.
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
                    <MessageSquare size={20} style={{ color: '#22d3ee', marginBottom: '1rem', opacity: 0.7 }} />
                    <p style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #22d3ee, #6366f1)',
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
                        <HelpCircle size={20} style={{ color: '#22d3ee', flexShrink: 0 }} />
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
            background: 'linear-gradient(180deg, rgba(8,8,22,1) 0%, rgba(12,13,29,1) 100%)',
            textAlign: 'center',
            borderTop: '1px solid rgba(34,211,238,0.15)'
          }}>
            <div style={{ maxWidth: '650px', margin: '0 auto' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
                <Search size={64} style={{ color: '#22d3ee', opacity: 0.8 }} />
              </div>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontFamily: 'var(--font-playfair)',
                fontWeight: 800, color: 'var(--foreground)',
                marginBottom: '1.25rem'
              }}>Ready to Own Your Search Category?</h2>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '1.1rem',
                lineHeight: 1.7,
                marginBottom: '2.5rem'
              }}>
                Book a free SEO strategy call. We&apos;ll audit your current rankings, map your competitive gaps, and show you exactly where traffic is leaking.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  background: 'linear-gradient(135deg, #22D3EE, #6366F1)',
                  color: '#fff', fontWeight: 800, textDecoration: 'none',
                  padding: '1.125rem 2.75rem', borderRadius: '1rem', fontSize: '1.1rem',
                  boxShadow: '0 8px 32px rgba(34,211,238,0.35)'
                }}>
                  Book Free Consult <ArrowRight size={20} />
                </Link>
                <Link href="/tools/seo-audit" style={{
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
