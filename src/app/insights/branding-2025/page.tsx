import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Share2, Bookmark } from 'lucide-react';

export default function BrandingArticle() {
    return (
        <>
            <Header />
            <main style={{ minHeight: '100vh', background: '#0A0A0B' }}>

                <article style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 2rem' }}>

                    <Link href="/insights" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#ec4899',
                        textDecoration: 'none',
                        marginBottom: '2rem'
                    }}>
                        <ArrowLeft size={16} /> Back to Insights
                    </Link>

                    <span style={{
                        display: 'inline-block',
                        background: 'rgba(236, 72, 153, 0.1)',
                        color: '#ec4899',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        marginBottom: '1rem'
                    }}>Branding</span>

                    <h1 style={{
                        fontSize: '3rem',
                        fontFamily: 'var(--font-playfair)',
                        fontWeight: 700,
                        color: '#fff',
                        lineHeight: 1.2,
                        marginBottom: '1.5rem'
                    }}>
                        Building a Brand That Stands Out in 2025
                    </h1>

                    <div style={{
                        display: 'flex',
                        gap: '1.5rem',
                        color: '#94a3b8',
                        fontSize: '0.9rem',
                        marginBottom: '3rem',
                        paddingBottom: '2rem',
                        borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Clock size={16} /> 6 min read
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <User size={16} /> Elena Vance, Creative Director
                        </span>
                    </div>

                    <div style={{ color: '#cbd5e1', fontSize: '1.125rem', lineHeight: 1.8 }}>

                        <p style={{ marginBottom: '1.5rem' }}>
                            In a world where every business has access to the same AI tools, design templates, and marketing playbooks, standing out has never been harder—or more important. The brands that win in 2025 won&apos;t be the ones with the biggest budgets. They&apos;ll be the ones with the clearest identities.
                        </p>

                        <h2 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-playfair)', margin: '2.5rem 0 1rem' }}>
                            The Authenticity Paradox
                        </h2>

                        <p style={{ marginBottom: '1.5rem' }}>
                            Everyone talks about &quot;authenticity&quot; in branding, but most businesses get it wrong. They think authenticity means oversharing or being casual. But true brand authenticity is about consistency between your values, your messaging, and your actions.
                        </p>

                        <div style={{
                            background: 'rgba(236, 72, 153, 0.1)',
                            border: '1px solid rgba(236, 72, 153, 0.3)',
                            borderRadius: '1rem',
                            padding: '1.5rem',
                            margin: '2rem 0'
                        }}>
                            <strong style={{ color: '#ec4899' }}>The Core Question:</strong>
                            <p style={{ margin: '0.5rem 0 0', color: '#f9a8d4' }}>
                                If your brand disappeared tomorrow, what would the market be missing? If you can&apos;t answer this clearly, your brand isn&apos;t differentiated enough.
                            </p>
                        </div>

                        <h2 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-playfair)', margin: '2.5rem 0 1rem' }}>
                            The 5 Pillars of a Memorable Brand
                        </h2>

                        <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '2rem 0 1rem' }}>
                            1. A Polarizing Point of View
                        </h3>

                        <p style={{ marginBottom: '1.5rem' }}>
                            The best brands stand for something specific—so specific that it repels the wrong customers while magnetically attracting the right ones. If nobody disagrees with your brand, it&apos;s too bland.
                        </p>

                        <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '2rem 0 1rem' }}>
                            2. Visual Distinctiveness
                        </h3>

                        <p style={{ marginBottom: '1.5rem' }}>
                            Your audience should be able to identify your content without seeing your logo. Color palette, typography, imagery style, and layout patterns should be instantly recognizable and consistently applied.
                        </p>

                        <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '2rem 0 1rem' }}>
                            3. Voice Consistency
                        </h3>

                        <p style={{ marginBottom: '1.5rem' }}>
                            Whether it&apos;s a tweet, an email, or a customer service response, your brand should sound like one person. Define your voice (formal, playful, provocative?) and use it everywhere.
                        </p>

                        <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '2rem 0 1rem' }}>
                            4. Story Over Features
                        </h3>

                        <p style={{ marginBottom: '1.5rem' }}>
                            People don&apos;t buy products—they buy the transformation those products promise. Your brand story should center the customer as the hero and your product as the guide that helps them succeed.
                        </p>

                        <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '2rem 0 1rem' }}>
                            5. Community Building
                        </h3>

                        <p style={{ marginBottom: '1.5rem' }}>
                            The strongest brands don&apos;t just have customers—they have communities. Create spaces (online or offline) where your audience can connect with each other, not just with you.
                        </p>

                        <h2 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-playfair)', margin: '2.5rem 0 1rem' }}>
                            Your Next Steps
                        </h2>

                        <ol style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.75rem' }}>Audit your current brand touchpoints for consistency</li>
                            <li style={{ marginBottom: '0.75rem' }}>Define 3-5 core values that drive every decision</li>
                            <li style={{ marginBottom: '0.75rem' }}>Create a brand voice guide with examples</li>
                            <li style={{ marginBottom: '0.75rem' }}>Identify what makes you genuinely different (not just &quot;better quality&quot;)</li>
                        </ol>

                        <p style={{ marginBottom: '1.5rem' }}>
                            Ready to build a brand that commands attention? <Link href="/services/creative" style={{ color: '#ec4899' }}>Explore our Creative Design services</Link>.
                        </p>
                    </div>

                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        marginTop: '3rem',
                        paddingTop: '2rem',
                        borderTop: '1px solid rgba(255,255,255,0.1)'
                    }}>
                        <button style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#fff',
                            padding: '0.75rem 1.25rem',
                            borderRadius: '0.5rem',
                            cursor: 'pointer'
                        }}>
                            <Share2 size={16} /> Share
                        </button>
                        <button style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#fff',
                            padding: '0.75rem 1.25rem',
                            borderRadius: '0.5rem',
                            cursor: 'pointer'
                        }}>
                            <Bookmark size={16} /> Save
                        </button>
                    </div>

                </article>

            </main>
            <Footer />
        </>
    );
}
