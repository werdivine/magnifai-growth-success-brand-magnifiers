import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, FileText, CheckCircle2, BarChart3, Clock, Users, Mail } from 'lucide-react';
import styles from './page.module.css';
import { FadeIn } from '@/components/FadeIn';

export const metadata = {
  title: 'Complete Search Everywhere Audit | Free Analysis',
  description: 'Get a 10-section audit covering Technical SEO, AEO, GEO, Local, Content, Authority, and Schema. Delivered in 24 hours.',
  alternates: { canonical: 'https://wemagnifai.com/lead-magnets/search-everywhere-audit' }
};

export default function SearchEverywhereAudit() {
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
              "name": "Search Everywhere Audit",
              "description": "Comprehensive 10-section SEO/AEO/GEO audit delivered in 24 hours.",
              "offers": { "@type": "Offer", "price": 0, "priceCurrency": "USD" }
            })
          }}
        />
        
        <FadeIn>
          <section style={{ padding: '8rem 2rem', textAlign: 'center', background: 'transparent' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', borderRadius: '999px', background: 'rgba(22,163,74,0.12)', border: '1px solid rgba(22,163,74,0.3)', color: '#22c55e', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '2rem' }}>
                <FileText size={16} /> Free Audit
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontFamily: 'var(--font-playfair)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                Complete Search Everywhere Audit<br /><span style={{ color: '#22c55e' }}>10 Sections Delivered</span>
              </h1>
              <p style={{ fontSize: '1.2rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '3rem' }}>
                Technical SEO, AEO, GEO, Local, Content, Authority, Schema, Voice Search, Structured Data, and Competitor Analysis — all in one comprehensive audit.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '1rem', padding: '2rem', marginBottom: '2.5rem' }}>
                <form action="/api/lead" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
                  <input type="hidden" name="source" value="search-everywhere-audit" />
                  <input type="url" name="website" placeholder="Your website URL" required
                    style={{ padding: '1rem 1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.03)', color: '#fff', fontSize: '1rem', outline: 'none' }} />
                  <input type="email" name="email" placeholder="Work email" required
                    style={{ padding: '1rem 1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.03)', color: '#fff', fontSize: '1rem', outline: 'none' }} />
                  <select name="companySize" required
                    style={{ padding: '1rem 1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.03)', color: '#fff', fontSize: '1rem', outline: 'none' }}>
                    <option value="" style={{ background: '#1e293b', color: '#fff' }}>Company size</option>
                    <option value="1-10" style={{ background: '#1e293b', color: '#fff' }}>1-10 employees</option>
                    <option value="11-50" style={{ background: '#1e293b', color: '#fff' }}>11-50 employees</option>
                    <option value="51-200" style={{ background: '#1e293b', color: '#fff' }}>51-200 employees</option>
                    <option value="201+" style={{ background: '#1e293b', color: '#fff' }}>200+ employees</option>
                  </select>
                  <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #22C55E, #16A34A)', color: '#fff', fontWeight: 800, border: 'none', padding: '1rem 2rem', borderRadius: '0.75rem', fontSize: '1rem', cursor: 'pointer' }}>
                    Get My Audit <ArrowRight size={20} />
                  </button>
                </form>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Delivered in 24 hours • 600+ audits completed</p>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.2}>
          <section style={{ padding: '6rem 2rem', background: 'transparent' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontFamily: 'var(--font-playfair)', fontWeight: 700, color: 'var(--foreground)', marginBottom: '3rem', textAlign: 'center' }}>What's Covered</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
                {[
                  { icon: <BarChart3 size={20} />, label: 'Technical SEO' },
                  { icon: <CheckCircle2 size={20} />, label: 'AEO' },
                  { icon: <FileText size={20} />, label: 'GEO' },
                  { icon: <Clock size={20} />, label: 'Local' },
                  { icon: <Users size={20} />, label: 'Authority' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1.25rem', background: 'rgba(var(--foreground-rgb), 0.03)', border: '1px solid rgba(var(--foreground-rgb), 0.08)', borderRadius: '0.75rem' }}>
                    <div style={{ color: '#22c55e' }}>{item.icon}</div>
                    <span style={{ color: 'var(--foreground)', fontSize: '0.85rem', fontWeight: 600 }}>{item.label}</span>
                  </div>
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