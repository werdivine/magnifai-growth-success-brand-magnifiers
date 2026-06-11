import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, Check, Star, Shield, Zap, Users, BarChart3 } from 'lucide-react';
import styles from './pricing.module.css';
import { FadeIn } from '@/components/FadeIn';

export const metadata = {
  title: 'Pricing | SEO & GEO Services',
  description: 'Transparent pricing for Search Everywhere Optimization. Four tiers from $1,500 to $12,500+ per month.',
  alternates: { canonical: 'https://wemagnifai.com/pricing' }
};

export default function PricingPage() {
  const tiers = [
    {
      name: 'Starter',
      price: '$1,500',
      period: '/mo',
      target: 'Solo operators, 1-2 locations',
      features: [
        'Monthly AI visibility report',
        '25-50 tracked prompts',
        'Baseline competitor share-of-voice',
        'Slack/email monthly summary',
        'Technical SEO audit (quarterly)'
      ],
      featured: false
    },
    {
      name: 'Active',
      price: '$3,500',
      period: '/mo',
      target: 'Mid-market local, SMB',
      features: [
        'Everything in Starter',
        'Schema audit + maintenance',
        'Directory citation seeding',
        'Quarterly prompt-set refresh',
        '1-2 content workstreams per quarter',
        '4-6 platform coverage',
        'Competitor watch'
      ],
      featured: true
    },
    {
      name: 'Full Stack',
      price: '$7,500',
      period: '/mo',
      target: 'Mid-to-upper-mid-market',
      features: [
        'Everything in Active',
        '100-300 prompts tracked',
        'Weekly reporting',
        '4-8 content workstreams per month',
        'Trade publication outreach',
        'Dedicated strategist',
        'Custom dashboards'
      ],
      featured: false
    },
    {
      name: 'Enterprise',
      price: '$12,500+',
      period: '/mo',
      target: 'Multi-location, nationals',
      features: [
        'Everything in Full Stack',
        '500+ prompts tracked',
        'Per-region prompt sets',
        'Multi-language content',
        'Dedicated analyst',
        'Board-deck reporting',
        'Custom integrations'
      ],
      featured: false
    }
  ];

  const faqs = [
    { q: 'What is the minimum commitment?', a: '3 months. Meaningful SEO and AI optimization requires time to show results.' },
    { q: 'Do you offer one-time audits?', a: 'Yes. Contact us for project-based pricing starting at $2,500.' },
    { q: 'Can I upgrade tiers mid-contract?', a: 'Yes. We prorate the difference and adjust scope immediately.' },
    { q: 'Do you work with agencies?', a: 'Yes. Many agencies white-label our SEO/AEO services.' }
  ];

  return (
    <>
      <Header />
      <main className={styles.pricingPage}>
        <FadeIn>
          <section style={{ padding: '6rem 2rem', textAlign: 'center', background: 'transparent' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>
              <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4rem)', fontFamily: 'var(--font-playfair)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '1rem' }}>
                Transparent Pricing
              </h1>
              <p style={{ fontSize: '1.2rem', color: '#94a3b8', lineHeight: 1.7, marginBottom: '3rem' }}>
                Four tiers designed for businesses at every scale. No hidden fees, no mystery pricing.
              </p>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.2}>
          <section style={{ padding: '4rem 2rem', background: 'transparent' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
                {tiers.map((tier, i) => (
                  <div key={i} style={{
                    background: tier.featured ? 'rgba(59,130,246,0.05)' : 'rgba(var(--foreground-rgb), 0.03)',
                    border: tier.featured ? '2px solid rgba(59,130,246,0.3)' : '1px solid rgba(var(--foreground-rgb), 0.08)',
                    borderRadius: '1.25rem',
                    padding: '2rem',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    {tier.featured && (
                      <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg, #3B82F6, #6366F1)', color: '#fff', padding: '0.25rem 1rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700 }}>
                        Most Popular
                      </div>
                    )}
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: tier.featured ? '#3b82f6' : 'var(--foreground)', marginBottom: '0.5rem' }}>{tier.name}</h3>
                    <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1.5rem' }}>{tier.target}</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '1.5rem', fontFamily: 'var(--font-playfair)' }}>
                      {tier.price}<span style={{ fontSize: '1rem', fontWeight: 500 }}>{tier.period}</span>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
                      {tier.features.map((f, j) => (
                        <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem', color: '#94a3b8', fontSize: '0.9rem' }}>
                          <Check size={16} style={{ color: '#3b82f6', marginTop: '0.125rem', flexShrink: 0 }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: tier.featured ? 'linear-gradient(135deg, #3B82F6, #6366F1)' : 'rgba(255,255,255,0.05)', color: '#fff', fontWeight: 700, textDecoration: 'none', padding: '1rem 2rem', borderRadius: '0.75rem', marginTop: '2rem', border: tier.featured ? 'none' : '1px solid rgba(255,255,255,0.12)' }}>
                      Get Started <ArrowRight size={16} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section style={{ padding: '6rem 2rem', background: 'rgba(var(--foreground-rgb), 0.02)' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontFamily: 'var(--font-playfair)', fontWeight: 700, color: 'var(--foreground)', marginBottom: '3rem', textAlign: 'center' }}>FAQ</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {faqs.map((faq, i) => (
                  <details key={i} style={{ background: 'rgba(var(--foreground-rgb), 0.03)', border: '1px solid rgba(var(--foreground-rgb), 0.08)', borderRadius: '1rem', overflow: 'hidden' }}>
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