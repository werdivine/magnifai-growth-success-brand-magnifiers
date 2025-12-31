import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Share2, Bookmark } from 'lucide-react';

export default function AIMarketingArticle() {
    return (
        <>
            <Header />
            <main style={{ minHeight: '100vh', background: '#0A0A0B' }}>

                {/* HERO */}
                <article style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 2rem' }}>

                    {/* Back Link */}
                    <Link href="/insights" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#6366f1',
                        textDecoration: 'none',
                        marginBottom: '2rem'
                    }}>
                        <ArrowLeft size={16} /> Back to Insights
                    </Link>

                    {/* Category */}
                    <span style={{
                        display: 'inline-block',
                        background: 'rgba(99, 102, 241, 0.1)',
                        color: '#6366f1',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        marginBottom: '1rem'
                    }}>AI Strategy</span>

                    {/* Title */}
                    <h1 style={{
                        fontSize: '3rem',
                        fontFamily: 'var(--font-playfair)',
                        fontWeight: 700,
                        color: '#fff',
                        lineHeight: 1.2,
                        marginBottom: '1.5rem'
                    }}>
                        How AI is Revolutionizing Small Business Marketing in 2025
                    </h1>

                    {/* Meta */}
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
                            <Clock size={16} /> 8 min read
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <User size={16} /> Sarah Chen, Marketing Director
                        </span>
                    </div>

                    {/* Content */}
                    <div style={{ color: '#cbd5e1', fontSize: '1.125rem', lineHeight: 1.8 }}>

                        <p style={{ marginBottom: '1.5rem' }}>
                            The landscape of small business marketing has fundamentally shifted. What once required teams of specialists and enterprise-level budgets can now be accomplished by a solo entrepreneur with the right AI tools. But here&apos;s what most people get wrong: it&apos;s not about replacing human creativity—it&apos;s about amplifying it.
                        </p>

                        <h2 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-playfair)', margin: '2.5rem 0 1rem' }}>
                            The Three Pillars of AI-Powered Marketing
                        </h2>

                        <p style={{ marginBottom: '1.5rem' }}>
                            After working with over 200 small businesses on their AI transformation journeys, we&apos;ve identified three key areas where AI delivers the highest ROI:
                        </p>

                        <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '2rem 0 1rem' }}>
                            1. Content Generation at Scale
                        </h3>

                        <p style={{ marginBottom: '1.5rem' }}>
                            The average small business needs to produce 15-20 pieces of content per week to stay competitive. Blog posts, social media updates, email newsletters, ad copy—the demands are relentless. AI tools like Claude and GPT-4 can now handle 80% of this workload, freeing your team to focus on strategy and high-impact creative decisions.
                        </p>

                        <div style={{
                            background: 'rgba(99, 102, 241, 0.1)',
                            border: '1px solid rgba(99, 102, 241, 0.3)',
                            borderRadius: '1rem',
                            padding: '1.5rem',
                            margin: '2rem 0'
                        }}>
                            <strong style={{ color: '#6366f1' }}>Pro Tip:</strong>
                            <p style={{ margin: '0.5rem 0 0', color: '#c7d2fe' }}>
                                Train your AI on your brand voice using 10-15 examples of your best content. This creates a custom &quot;voice model&quot; that produces on-brand content every time.
                            </p>
                        </div>

                        <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '2rem 0 1rem' }}>
                            2. Personalization Without the Creep Factor
                        </h3>

                        <p style={{ marginBottom: '1.5rem' }}>
                            Modern consumers expect personalization but are wary of feeling &quot;watched.&quot; AI enables what we call &quot;contextual personalization&quot;—adapting your messaging based on behavior patterns without crossing privacy lines. This includes dynamic email content, personalized product recommendations, and tailored landing pages.
                        </p>

                        <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '2rem 0 1rem' }}>
                            3. Predictive Analytics for Budget Optimization
                        </h3>

                        <p style={{ marginBottom: '1.5rem' }}>
                            Stop guessing where to spend your ad budget. AI-powered analytics tools can now predict which channels will deliver the best ROAS for your specific business, audience, and product mix. We&apos;ve seen clients reduce wasted ad spend by 40% within the first month of implementation.
                        </p>

                        <h2 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-playfair)', margin: '2.5rem 0 1rem' }}>
                            Getting Started: The 30-Day AI Marketing Sprint
                        </h2>

                        <p style={{ marginBottom: '1.5rem' }}>
                            If you&apos;re new to AI marketing, don&apos;t try to transform everything at once. Here&apos;s our recommended 30-day sprint:
                        </p>

                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#fff' }}>Week 1:</strong> Audit your current content workflow and identify repetitive tasks</li>
                            <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#fff' }}>Week 2:</strong> Implement one AI writing tool for blog and social content</li>
                            <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#fff' }}>Week 3:</strong> Set up automated email sequences with personalization</li>
                            <li style={{ marginBottom: '0.75rem' }}><strong style={{ color: '#fff' }}>Week 4:</strong> Connect analytics and begin A/B testing AI-generated vs. human content</li>
                        </ul>

                        <h2 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-playfair)', margin: '2.5rem 0 1rem' }}>
                            The Bottom Line
                        </h2>

                        <p style={{ marginBottom: '1.5rem' }}>
                            AI isn&apos;t coming for your marketing job—it&apos;s coming to make you exponentially better at it. The businesses that thrive in 2025 will be those that learn to work <em>with</em> AI, treating it as a powerful collaborator rather than a threat.
                        </p>

                        <p style={{ marginBottom: '1.5rem' }}>
                            Ready to start your AI marketing transformation? <Link href="/contact" style={{ color: '#6366f1' }}>Book a free strategy call</Link> with our team.
                        </p>
                    </div>

                    {/* Share/Actions */}
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
