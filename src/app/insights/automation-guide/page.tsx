import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Clock, User, Share2, Bookmark } from 'lucide-react';

export default function AutomationGuideArticle() {
    return (
        <>
            <Header />
            <main style={{ minHeight: '100vh', background: '#0A0A0B' }}>

                <article style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 2rem' }}>

                    <Link href="/insights" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#10b981',
                        textDecoration: 'none',
                        marginBottom: '2rem'
                    }}>
                        <ArrowLeft size={16} /> Back to Insights
                    </Link>

                    <span style={{
                        display: 'inline-block',
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: '#10b981',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        marginBottom: '1rem'
                    }}>Automation</span>

                    <h1 style={{
                        fontSize: '3rem',
                        fontFamily: 'var(--font-playfair)',
                        fontWeight: 700,
                        color: '#fff',
                        lineHeight: 1.2,
                        marginBottom: '1.5rem'
                    }}>
                        The Complete Guide to Social Media Automation in 2025
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
                            <Clock size={16} /> 12 min read
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <User size={16} /> Marcus Rodriguez, Automation Lead
                        </span>
                    </div>

                    <div style={{ color: '#cbd5e1', fontSize: '1.125rem', lineHeight: 1.8 }}>

                        <p style={{ marginBottom: '1.5rem' }}>
                            Social media management is one of the most time-consuming aspects of running a business. Between creating content, scheduling posts, responding to comments, and analyzing metrics, it can easily consume 20+ hours per week. Here&apos;s how to cut that down to under 5 hours using smart automation.
                        </p>

                        <h2 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-playfair)', margin: '2.5rem 0 1rem' }}>
                            What Can (and Can&apos;t) Be Automated
                        </h2>

                        <p style={{ marginBottom: '1.5rem' }}>
                            Before diving into tools, let&apos;s be clear about boundaries. Automation is powerful, but authenticity still wins on social media.
                        </p>

                        <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '2rem 0 1rem' }}>
                            ✅ Automate These Tasks:
                        </h3>

                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.75rem' }}>Scheduling posts across platforms</li>
                            <li style={{ marginBottom: '0.75rem' }}>Recycling evergreen content</li>
                            <li style={{ marginBottom: '0.75rem' }}>Basic comment moderation (spam filtering)</li>
                            <li style={{ marginBottom: '0.75rem' }}>Cross-posting between platforms</li>
                            <li style={{ marginBottom: '0.75rem' }}>Analytics reporting</li>
                            <li style={{ marginBottom: '0.75rem' }}>First-response DMs for common questions</li>
                        </ul>

                        <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: '2rem 0 1rem' }}>
                            ❌ Keep These Human:
                        </h3>

                        <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '0.75rem' }}>Crisis response and sensitive topics</li>
                            <li style={{ marginBottom: '0.75rem' }}>Personal relationship building</li>
                            <li style={{ marginBottom: '0.75rem' }}>Trend-jacking and real-time content</li>
                            <li style={{ marginBottom: '0.75rem' }}>Complex customer complaints</li>
                        </ul>

                        <h2 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-playfair)', margin: '2.5rem 0 1rem' }}>
                            The Optimal Tech Stack
                        </h2>

                        <p style={{ marginBottom: '1.5rem' }}>
                            After testing dozens of tools, here&apos;s our recommended stack for small to medium businesses:
                        </p>

                        <div style={{
                            background: 'rgba(16, 185, 129, 0.1)',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            borderRadius: '1rem',
                            padding: '1.5rem',
                            margin: '2rem 0'
                        }}>
                            <h4 style={{ color: '#10b981', marginBottom: '1rem' }}>Our Recommended Stack:</h4>
                            <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#a7f3d0' }}>
                                <li><strong>Scheduling:</strong> Buffer or Later</li>
                                <li><strong>Content Creation:</strong> Claude + Canva</li>
                                <li><strong>Automation:</strong> Make.com or Zapier</li>
                                <li><strong>Analytics:</strong> Metricool or Sprout Social</li>
                                <li><strong>Community Management:</strong> Hootsuite</li>
                            </ul>
                        </div>

                        <h2 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-playfair)', margin: '2.5rem 0 1rem' }}>
                            Setting Up Your First Automation Workflow
                        </h2>

                        <p style={{ marginBottom: '1.5rem' }}>
                            Here&apos;s a simple but powerful workflow you can set up today using Make.com:
                        </p>

                        <ol style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong style={{ color: '#fff' }}>Trigger:</strong> New blog post published (via RSS or webhook)
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong style={{ color: '#fff' }}>Action 1:</strong> Send to Claude API to generate 5 social post variations
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong style={{ color: '#fff' }}>Action 2:</strong> Create image with featured image + title overlay
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong style={{ color: '#fff' }}>Action 3:</strong> Schedule posts to Buffer (1 immediate, 4 over next week)
                            </li>
                            <li style={{ marginBottom: '1rem' }}>
                                <strong style={{ color: '#fff' }}>Action 4:</strong> Send summary to your Slack channel
                            </li>
                        </ol>

                        <p style={{ marginBottom: '1.5rem' }}>
                            This single workflow saves approximately 2-3 hours per blog post while ensuring consistent social promotion.
                        </p>

                        <h2 style={{ fontSize: '1.75rem', color: '#fff', fontFamily: 'var(--font-playfair)', margin: '2.5rem 0 1rem' }}>
                            Getting Started
                        </h2>

                        <p style={{ marginBottom: '1.5rem' }}>
                            Don&apos;t try to automate everything at once. Start with one workflow, test it for 2 weeks, refine it, then move to the next. Gradual automation is sustainable automation.
                        </p>

                        <p style={{ marginBottom: '1.5rem' }}>
                            Need help setting up your automation stack? <Link href="/services/ai-automation" style={{ color: '#10b981' }}>Check out our AI Automation services</Link>.
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
