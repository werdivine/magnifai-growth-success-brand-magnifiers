import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, BarChart3, CheckCircle, Search, Brain, Zap } from 'lucide-react';
import styles from './page.module.css';
import { FadeIn } from '@/components/FadeIn';

export const metadata = {
  title: 'AEO Visibility Score | Check Your AI Citation Potential',
  description: 'Get your AI citation potential score (0-100). See how you appear in ChatGPT, Perplexity, and Google AI Overviews.',
  alternates: { canonical: 'https://wemagnifai.com/lead-magnets/aeo-visibility-score' }
};

export default function AEOVisibilityScore() {
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
              "name": "AEO Visibility Score Tool",
              "description": "AI citation potential score calculator for ChatGPT, Perplexity, Google AI Overviews.",
              "offers": { "@type": "Offer", "price": 0, "priceCurrency": "USD" }
            })
          }}
        />
        
        <FadeIn>
          <section style={{ padding: '8rem 2rem', textAlign: 'center', background: 'transparent' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.25rem', borderRadius: '999px', background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.3)', color: '#3b82f6', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '2rem' }}>
                <BarChart3 size={16} /> Free Assessment
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontFamily: 'var(--font-playfair)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                Your AI Citation Potential<br /><span style={{ color: '#3b82f6' }}>Score (0-100)</span>
              </h1>
              <p style={{ fontSize: '1.2rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '3rem' }}>
                Discover how often AI recommends your brand. Get 5 prioritized fixes to increase citations in ChatGPT, Perplexity, and Google AI Overviews.
              </p>
              <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '1rem', padding: '2rem', marginBottom: '2.5rem' }}>
                <form action="/api/lead" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto' }}>
                  <input type="hidden" name="source" value="aeo-score" />
                  <input type="url" name="website" placeholder="Your website URL" required
                    style={{ padding: '1rem 1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.03)', color: '#fff', fontSize: '1rem', outline: 'none' }} />
                  <input type="email" name="email" placeholder="Work email" required
                    style={{ padding: '1rem 1.25rem', borderRadius: '0.75rem', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.03)', color: '#fff', fontSize: '1rem', outline: 'none' }} />
                  <button type="submit" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #3B82F6, #6366F1)', color: '#fff', fontWeight: 800, border: 'none', padding: '1rem 2rem', borderRadius: '0.75rem', fontSize: '1rem', cursor: 'pointer' }}>
                    Get My Score <ArrowRight size={20} />
                  </button>
                </form>
              </div>
              <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Takes 60 seconds • Used by 1,800+ growth teams</p>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.2}>
          <section style={{ padding: '6rem 2rem', background: 'transparent' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontFamily: 'var(--font-playfair)', fontWeight: 700, color: 'var(--foreground)', marginBottom: '0.75rem', textAlign: 'center' }}>What You Get</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', textAlign: 'center', marginBottom: '3rem' }}>
                Immediate insights + prioritized action plan.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                {[
                  { icon: <Search size={24} />, title: 'Citation Rate', value: '37.5%', desc: 'Average for optimized brands' },
                  { icon: <CheckCircle size={24} />, title: 'AI Platforms', value: '5+', desc: 'ChatGPT, Perplexity, Gemini, Claude, Google AI Overviews' },
                  { icon: <Zap size={24} />, title: 'Implementation', value: '5', desc: 'Prioritized fixes you can implement immediately' }
                ].map((item, i) => (
                  <div key={i} style={{ background: 'rgba(var(--foreground-rgb), 0.03)', border: '1px solid rgba(var(--foreground-rgb), 0.08)', borderRadius: '1rem', padding: '1.75rem', textAlign: 'center' }}>
                    <div style={{ color: '#3b82f6', marginBottom: '1rem' }}>{item.icon}</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-playfair)', color: '#3b82f6', marginBottom: '0.5rem' }}>{item.value}</div>
                    <h3 style={{ fontWeight: 700, color: 'var(--foreground)', fontSize: '1rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.desc}</p>
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