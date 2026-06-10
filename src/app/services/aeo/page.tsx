import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { 
  ArrowRight, Search, TrendingUp, FileText, Link2, BarChart3, 
  Zap, CheckCircle, AlertTriangle, HelpCircle, Globe, 
  Target, Share2
} from 'lucide-react';
import styles from '../services.module.css';
import { FadeIn } from '@/components/FadeIn';

export const metadata = {
  title: 'Answer Engine Optimization (AEO) | WeMagnifAI — AI Citation Mastery',
  description: 'Get cited by ChatGPT, Perplexity, Google AI Overviews, and Claude. Prompt research, competitor mapping, and FAQ optimization for AI visibility.',
};

export default function AEOServicePage() {
  const benefits = [
    { icon: <Share2 size={32} />, title: 'Higher Citation Rates', desc: 'Optimized brands average 37.5% citation rate vs 12% for non-optimized competitors.' },
    { icon: <Target size={32} />, title: '200+ Prompts Tracked', desc: 'Comprehensive prompt mapping across your industry, competitors, and intent variations.' },
    { icon: <Globe size={32} />, title: 'Multi-Platform Coverage', desc: 'ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews citation strategies.' },
  ];

  const problems = [
    { icon: <Search size={24} />, title: 'Zero AI Citations', desc: 'Your brand gets zero mentions when prospects ask AI for recommendations in your niche.' },
    { icon: <AlertTriangle size={24} />, title: 'Competitor Wins', desc: 'AI recommends competitors because they have structured FAQ and entity clarity.' },
    { icon: <TrendingUp size={24} />, title: 'Missing Structured Data', desc: 'No FAQ schema means AI engines cannot extract and cite your answers reliably.' },
  ];

  const aeoProcess = [
    { n: '01', title: 'Prompt Research', desc: 'Discover how buyers ask AI about your industry, products, and problems.' },
    { n: '02', title: 'Competitor Mapping', desc: 'Identify who gets cited instead of you and why they win in AI responses.' },
    { n: '03', title: 'Content Optimization', desc: 'Structure pages with FAQ sections, definition boxes, and citation-worthy answers.' },
    { n: '04', title: 'Monitoring & Iteration', desc: 'Track citation rates weekly and optimize for improved AI visibility.' },
  ];

  const testimonials = [
    { quote: 'We went from 0 citations to being recommended by ChatGPT for our core services. 42 qualified leads in 60 days.', author: 'Rachel Torres', role: 'CMO', org: 'FinEdge Bank' },
    { quote: 'Perplexity now cites our comparison pages. AEO is the new referral channel.', author: 'Michael Park', role: 'Growth Director', org: 'SaaSCoach' },
    { quote: '4.1x more brand mentions in AI responses. Our category authority is solidifying.', author: 'Dana Wu', role: 'CEO', org: 'MarketLogic' },
  ];

  const faqs = [
    { q: 'What is Answer Engine Optimization?', a: 'AEO is optimizing content to appear in AI-generated answers on ChatGPT, Perplexity, Google AI Overviews, and Claude. Focus on featured snippets, FAQ schema, and structured answers.' },
    { q: 'How do you get cited by ChatGPT?', a: 'By creating FAQ-formatted content with clear answers, implementing FAQPage schema, and building entity clarity signals across the web.' },
    { q: 'Do you track competitor citations?', a: 'Yes. We maintain a share-of-voice dashboard showing your citation rate vs competitors on 200+ industry prompts.' },
    { q: 'What content wins in AI answers?', a: 'Direct answers in first 100 words, FAQ sections with schema markup, comparison tables, and conversational tone addressing user questions.' },
    { q: 'How long until citations appear?', a: 'Initial citation improvements in 2-4 weeks. Full visibility can take 60-90 days with consistent optimization.' },
    { q: 'Can you guarantee AI citations?', a: 'We improve citation likelihood through structured optimization, but cannot control AI outputs. We measure and track citation rate improvements.' },
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
      "name": "Answer Engine Optimization (AEO)",
      "provider": {
        "@type": "Organization",
        "name": "WeMagnifAI"
      },
      "description": "Get cited by ChatGPT, Perplexity, Google AI Overviews, and Claude. Prompt research, competitor mapping, and FAQ optimization for AI visibility.",
      "areaServed": "Worldwide"
    }
  };

  return (
    <>
      <Header />
      <main className={styles.servicePage} style={{ '--accent-color': '#3B82F6', '--accent-light': '#60A5FA', '--icon-bg': 'rgba(59,130,246,0.12)', '--icon-color': '#3B82F6' } as React.CSSProperties}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faq) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.service) }}
        />

        <FadeIn>
          <section className={styles.sectionLight} style={{ background: 'linear-gradient(180deg, rgba(8,8,22,1) 0%, rgba(12,13,29,1) 100%)', borderBottom: '1px solid rgba(59,130,246,0.15)' }}>
            <div className={styles.container} style={{ textAlign: 'center', padding: '8rem 2rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', borderRadius: '999px', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)', color: '#3b82f6', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '2rem' }}>
                <Share2 size={16} /> Answer Engine Optimization
              </div>
              <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontFamily: 'var(--font-playfair)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '1.5rem', maxWidth: '900px', marginLeft: 'auto', marginRight: 'auto' }}>
                Get Cited in AI Answers.<br /><span style={{ color: '#3b82f6' }}>Win Recommendations.</span>
              </h1>
              <p style={{ fontSize: '1.3rem', color: '#94a3b8', maxWidth: '650px', lineHeight: 1.7, margin: '0 auto 3rem' }}>
                Answer Engine Optimization earns citations in ChatGPT, Perplexity, Google AI Overviews, and Claude. Get recommended when buyers ask AI for solutions.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #3B82F6, #6366F1)', color: '#fff', fontWeight: 800, textDecoration: 'none', padding: '1rem 2.5rem', borderRadius: '0.875rem', fontSize: '1.05rem', boxShadow: '0 8px 32px rgba(59,130,246,0.3)' }}>
                  Get Free AEO Audit <ArrowRight size={20} />
                </Link>
                <Link href="/tools/aeo-audit" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: '#e2e8f0', fontWeight: 700, textDecoration: 'none', padding: '1rem 2.5rem', borderRadius: '0.875rem', fontSize: '1.05rem' }}>
                  Citation Score Tool <BarChart3 size={20} />
                </Link>
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section style={{ padding: '6rem 2rem', background: 'var(--bg-primary)', borderBottom: '1px solid rgba(var(--foreground-rgb), 0.06)' }}>
            <div className={styles.container}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontFamily: 'var(--font-playfair)', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.75rem', textAlign: 'center' }}>AEO Performance Metrics</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '4rem', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
                Real citation rates from optimized clients.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                {benefits.map((b, i) => (
                  <div key={i} style={{ background: 'rgba(var(--foreground-rgb), 0.03)', border: '1px solid rgba(var(--foreground-rgb), 0.08)', borderRadius: '1.25rem', padding: '2rem', transition: 'all 0.3s ease' }}>
                    <div style={{ width: 56, height: 56, borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(59,130,246,0.12)', color: '#3b82f6', marginBottom: '1.25rem' }}>{b.icon}</div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.75rem', fontFamily: 'var(--font-inter)' }}>{b.title}</h3>
                    <p style={{ color: '#94a3b8', lineHeight: 1.7, fontSize: '0.95rem' }}>{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section style={{ padding: '6rem 2rem', background: 'rgba(var(--foreground-rgb), 0.02)', borderBottom: '1px solid rgba(var(--foreground-rgb), 0.06)' }}>
            <div className={styles.container}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontFamily: 'var(--font-playfair)', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.75rem', textAlign: 'center' }}>Why You Aren't Getting Cited</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '4rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                Competitors are winning AI recommendations while you're invisible.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', maxWidth: '850px', margin: '0 auto' }}>
                {problems.map((p, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1.25rem', padding: '1.5rem', background: 'rgba(var(--foreground-rgb), 0.03)', border: '1px solid rgba(var(--foreground-rgb), 0.08)', borderRadius: '1rem' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(239,68,68,0.12)', color: '#ef4444', flexShrink: 0 }}>{p.icon}</div>
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

        <FadeIn>
          <section style={{ padding: '6rem 2rem', background: 'var(--bg-primary)', borderBottom: '1px solid rgba(var(--foreground-rgb), 0.06)' }}>
            <div className={styles.container}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontFamily: 'var(--font-playfair)', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.75rem', textAlign: 'center' }}>The 4-Step AEO Process</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '4rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                Systematic approach to AI citation optimization.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                {aeoProcess.map((step, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                    <div style={{ width: 72, height: 72, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', background: 'rgba(59,130,246,0.1)', border: '2px solid rgba(59,130,246,0.3)', fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-playfair)', color: '#3b82f6' }}>{step.n}</div>
                    <h3 style={{ fontWeight: 700, color: 'var(--foreground)', fontSize: '1.1rem', marginBottom: '0.75rem', fontFamily: 'var(--font-inter)' }}>{step.title}</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6 }}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section style={{ padding: '6rem 2rem', background: 'rgba(var(--foreground-rgb), 0.02)' }}>
            <div className={styles.container}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontFamily: 'var(--font-playfair)', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.75rem', textAlign: 'center' }}>Citation Wins</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '4rem', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
                Brands getting recommended in AI answers.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                {testimonials.map((t, i) => (
                  <div key={i} style={{ background: 'rgba(var(--foreground-rgb), 0.03)', border: '1px solid rgba(var(--foreground-rgb), 0.08)', borderRadius: '1.25rem', padding: '2rem', position: 'relative' }}>
                    <p style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}>{t.author.split(' ').map(n => n[0]).join('')}</div>
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

        <FadeIn>
          <section id="faq" style={{ padding: '6rem 2rem', background: 'rgba(var(--foreground-rgb), 0.02)', borderBottom: '1px solid rgba(var(--foreground-rgb), 0.06)' }}>
            <div className={styles.container} style={{ maxWidth: '850px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontFamily: 'var(--font-playfair)', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.75rem', textAlign: 'center' }}>AEO FAQ</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '3.5rem' }}>
                Questions about AI citation optimization.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {faqs.map((faq, i) => (
                  <details key={i} style={{ background: 'rgba(var(--foreground-rgb), 0.03)', border: '1px solid rgba(var(--foreground-rgb), 0.08)', borderRadius: '1rem', overflow: 'hidden' }}>
                    <summary style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--foreground)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1rem', fontFamily: 'var(--font-inter)', listStyle: 'none' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <HelpCircle size={20} style={{ color: '#3b82f6', flexShrink: 0 }} />
                        {faq.q}
                      </span>
                      <span style={{ color: '#64748b', fontSize: '0.8rem' }}>+</span>
                    </summary>
                    <div style={{ padding: '0 1.5rem 1.5rem', color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.7 }}>
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section style={{ padding: '7rem 2rem', background: 'linear-gradient(180deg, rgba(8,8,22,1) 0%, rgba(12,13,29,1) 100%)', textAlign: 'center', borderTop: '1px solid rgba(59,130,246,0.15)' }}>
            <div style={{ maxWidth: '650px', margin: '0 auto' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
                <Share2 size={64} style={{ color: '#3b82f6', opacity: 0.8 }} />
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontFamily: 'var(--font-playfair)', fontWeight: 800, color: 'var(--foreground)', marginBottom: '1.25rem' }}>Ready for AI Recommendations?</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
                Get a free AEO audit. We analyze your citation potential and identify why competitors win AI recommendations.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #3B82F6, #6366F1)', color: '#fff', fontWeight: 800, textDecoration: 'none', padding: '1.125rem 2.75rem', borderRadius: '1rem', fontSize: '1.1rem', boxShadow: '0 8px 32px rgba(59,130,246,0.35)' }}>
                  Get Free AEO Audit <ArrowRight size={20} />
                </Link>
                <Link href="/case-studies" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: '#e2e8f0', fontWeight: 700, textDecoration: 'none', padding: '1.125rem 2.75rem', borderRadius: '1rem', fontSize: '1.1rem' }}>
                  View Case Studies <BarChart3 size={20} />
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