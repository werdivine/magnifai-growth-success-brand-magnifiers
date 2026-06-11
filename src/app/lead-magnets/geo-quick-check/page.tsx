import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, Search, CheckCircle, AlertTriangle, HelpCircle, Brain } from 'lucide-react';
import styles from './page.module.css';
import { FadeIn } from '@/components/FadeIn';

export const metadata = {
  title: 'GEO Quick Check | Are You Ready for AI Search?',
  description: 'Take our 8-question quiz to see if your brand is optimized for Google AI Overviews, ChatGPT, and Perplexity.',
  alternates: { canonical: 'https://wemagnifai.com/lead-magnets/geo-quick-check' }
};

export default function GEOQuickCheck() {
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
              "name": "GEO Quick Check Quiz",
              "description": "8-question assessment for AI search optimization readiness.",
              "offers": { "@type": "Offer", "price": 0, "priceCurrency": "USD" }
            })
          }}
        />
        
        <FadeIn>
          <section style={{ padding: '8rem 2rem', textAlign: 'center', background: 'transparent' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', borderRadius: '999px', background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)', color: '#8b5cf6', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '2rem' }}>
                <Brain size={16} /> Quick Assessment
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontFamily: 'var(--font-playfair)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                Quick GEO Check<br /><span style={{ color: '#8b5cf6' }}>8 Questions</span>
              </h1>
              <p style={{ fontSize: '1.2rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '3rem' }}>
                Take our 8-question quiz to see if your brand is ready for AI search. Get your score and a personalized report in under 2 minutes.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '1rem', padding: '2rem', marginBottom: '2.5rem' }}>
                <form action="/api/lead" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
                  <input type="hidden" name="source" value="geo-check" />
                  <input type="email" name="email" placeholder="Work email" required
                    style={{ padding: '1rem 1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.03)', color: '#fff', fontSize: '1rem', outline: 'none' }} />
                  <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #8B5CF6, #A855F7)', color: '#fff', fontWeight: 800, border: 'none', padding: '1rem 2rem', borderRadius: '0.75rem', fontSize: '1rem', cursor: 'pointer' }}>
                    Start Quiz <ArrowRight size={20} />
                  </button>
                </form>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Takes 90 seconds • 3,200+ assessments completed</p>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.2}>
          <section style={{ padding: '6rem 2rem', background: 'transparent' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontFamily: 'var(--font-playfair)', fontWeight: 700, color: 'var(--foreground)', marginBottom: '3rem', textAlign: 'center' }}>The 8 Questions</h2>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                {[
                  'Do you have FAQ sections on key pages?',
                  'Is your content parseable without JavaScript?',
                  'Do you use definition boxes in first 150 words?',
                  'Have you implemented FAQPage schema?',
                  'Do you have comparison tables?',
                  'Is your brand entity clear to AI?',
                  'Do you have authority backlinks?',
                  'Have you optimized for featured snippets?'
                ].map((q, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.25rem', background: 'rgba(var(--foreground-rgb), 0.03)', border: '1px solid rgba(var(--foreground-rgb), 0.08)', borderRadius: '0.75rem' }}>
                    <span style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(139,92,246,0.2)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>{i + 1}</span>
                    <span style={{ color: 'var(--foreground)', fontSize: '0.95rem' }}>{q}</span>
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