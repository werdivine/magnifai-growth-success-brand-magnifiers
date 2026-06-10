import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, Download, CheckSquare, Shield, Mail, FileText } from 'lucide-react';
import styles from './page.module.css';
import { FadeIn } from '@/components/FadeIn';

export const metadata = {
  title: 'Free SEO Audit Checklist | 34-Point Framework',
  description: 'Download our 34-point SEO audit checklist used by agencies to uncover technical issues, content gaps, and AI optimization opportunities.',
  alternates: { canonical: 'https://wemagnifai.com/lead-magnets/seo-audit-checklist' }
};

export default function SEOAuditChecklist() {
  return (
    <>
      <Header />
      <main className={styles.leadMagnetPage}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "SEO Audit Checklist",
              "description": "34-point checklist for technical SEO, content, and AI optimization.",
              "offers": {
                "@type": "Offer",
                "price": 0,
                "priceCurrency": "USD"
              }
            })
          }}
        />
        
        <FadeIn>
          <section style={{ padding: '8rem 2rem', textAlign: 'center', background: 'linear-gradient(180deg, rgba(8,8,22,1) 0%, rgba(12,13,29,1) 100%)' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', borderRadius: '999px', background: 'rgba(34,211,238,0.12)', border: '1px solid rgba(34,211,238,0.3)', color: '#22d3ee', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '2rem' }}>
                <Download size={16} /> Free Resource
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontFamily: 'var(--font-playfair)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                The Complete SEO Audit Checklist<br /><span style={{ color: '#22d3ee' }}>(34-Point)</span>
              </h1>
              <p style={{ fontSize: '1.2rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '3rem' }}>
                Audit your site in under 15 minutes. This checklist covers technical SEO, content optimization, and AI search readiness — the same framework we use for enterprise clients.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '1rem', padding: '2rem', marginBottom: '2.5rem' }}>
                <form action="/api/lead" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
                  <input type="hidden" name="source" value="seo-checklist" />
                  <input type="email" name="email" placeholder="Work email" required
                    style={{ padding: '1rem 1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.03)', color: '#fff', fontSize: '1rem', outline: 'none' }} />
                  <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #22D3EE, #6366F1)', color: '#fff', fontWeight: 800, border: 'none', padding: '1rem 2rem', borderRadius: '0.75rem', fontSize: '1rem', cursor: 'pointer', transition: 'all 0.3s ease' }}>
                    Get Checklist <ArrowRight size={20} />
                  </button>
                </form>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Used by 2,400+ growth leaders • No credit card required</p>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.2}>
          <section style={{ padding: '6rem 2rem', background: 'var(--bg-primary)', borderBottom: '1px solid rgba(var(--foreground-rgb), 0.06)' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontFamily: 'var(--font-playfair)', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.75rem', textAlign: 'center' }}>What's Inside the Checklist</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '3rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                34 actionable checks organized by priority and impact.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                {[
                  { icon: <Shield size={24} />, title: 'Technical SEO', items: ['Core Web Vitals', 'Crawl budget', 'XML sitemaps', 'HTTPS check', 'Mobile optimization'] },
                  { icon: <CheckSquare size={24} />, title: 'Content Audit', items: ['Keyword mapping', 'Topic clusters', 'Content gaps', 'Thin content', 'Duplicate pages'] },
                  { icon: <FileText size={24} />, title: 'AI Readiness', items: ['FAQ sections', 'Definition boxes', 'Schema markup', 'Entity signals', 'Citation worthiness'] }
                ].map((section, i) => (
                  <div key={i} style={{ background: 'rgba(var(--foreground-rgb), 0.03)', border: '1px solid rgba(var(--foreground-rgb), 0.08)', borderRadius: '1rem', padding: '1.75rem' }}>
                    <div style={{ color: '#22d3ee', marginBottom: '1rem' }}>{section.icon}</div>
                    <h3 style={{ fontWeight: 700, color: 'var(--foreground)', fontSize: '1.1rem', marginBottom: '1rem', fontFamily: 'var(--font-inter)' }}>{section.title}</h3>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {section.items.map((item, j) => (
                        <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22d3ee' }}></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section style={{ padding: '6rem 2rem', background: 'rgba(var(--foreground-rgb), 0.02)' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontFamily: 'var(--font-playfair)', fontWeight: 700, color: 'var(--foreground)', marginBottom: '1.5rem' }}>FAQ</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { q: "Is this really free?", a: "Yes. We release one actionable resource like this monthly to help growth teams optimize faster." },
                  { q: "What format is the checklist?", a: "PDF with interactive checkboxes. Works on desktop and mobile." },
                  { q: "Will you spam me?", a: "No. You'll get the checklist immediately and occasional emails with similar resources. Unsubscribe anytime." },
                  { q: "How often should I use this?", a: "Monthly for ongoing optimization, or quarterly for audit cycles." }
                ].map((faq, i) => (
                  <details key={i} style={{ background: 'rgba(var(--foreground-rgb), 0.03)', border: '1px solid rgba(var(--foreground-rgb), 0.08)', borderRadius: '1rem', overflow: 'hidden', textAlign: 'left' }}>
                    <summary style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--foreground)', cursor: 'pointer' }}>
                      {faq.q}
                    </summary>
                    <div style={{ padding: '0 1.5rem 1.5rem', color: '#94a3b8', fontSize: '0.95rem' }}>
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>
      </main>
      <Footer />
    </>
  );
}