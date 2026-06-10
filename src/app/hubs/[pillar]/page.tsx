import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getBlogPosts } from '@/lib/blog';
import { ArrowRight, Tag } from 'lucide-react';

const PILLARS = {
    'ai-automation': {
        title: 'AI Automation Systems',
        description: 'Comprehensive guides on integrating Make.com, Zapier, and custom AI agents to automate business operations.',
        categories: ['Automation', 'Engineering', 'Tools']
    },
    'geo-search': {
        title: 'Generative Engine Optimization (GEO)',
        description: 'Master AI Search. Learn how to rank in ChatGPT, Perplexity, and Google SGE (AI Overviews).',
        categories: ['Strategy', 'SEO']
    },
    'brand-magnification': {
        title: 'Brand Magnification & PR',
        description: 'Topical authority, digital PR, and viral growth strategies for B2B and B2C brands.',
        categories: ['Growth', 'Social']
    }
};

export function generateStaticParams() {
    return Object.keys(PILLARS).map((pillar) => ({
        pillar,
    }));
}

export default async function PillarHub({ params }: { params: Promise<{ pillar: string }> }) {
    const { pillar } = await params;
    
    if (!PILLARS[pillar as keyof typeof PILLARS]) {
        notFound();
    }
    
    const pillarData = PILLARS[pillar as keyof typeof PILLARS];
    const allPosts = getBlogPosts();
    
    // Filter posts that match any of the pillar's categories
    const clusterPosts = allPosts.filter(post => 
        pillarData.categories.includes(post.category) || 
        post.title.toLowerCase().includes(pillar.split('-')[0])
    );

    return (
        <div style={{ backgroundColor: 'var(--background)' }}>
            <Header />
            <main style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '60px', maxWidth: '1200px', margin: '0 auto', padding: '120px 20px 60px' }}>
                <div style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '3rem', marginBottom: '1rem', color: 'var(--foreground)' }}>
                        {pillarData.title}
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto' }}>
                        {pillarData.description}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                    {clusterPosts.map(post => (
                        <Link href={`/insights/${post.slug}`} key={post.id} style={{
                            display: 'block',
                            background: 'var(--surface)',
                            border: '1px solid var(--border)',
                            borderRadius: '1rem',
                            padding: '2rem',
                            textDecoration: 'none',
                            color: 'inherit',
                            transition: 'transform 0.2s, box-shadow 0.2s'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 600 }}>
                                <Tag size={14} /> {post.category}
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontFamily: 'var(--font-playfair)' }}>{post.title}</h3>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                {post.excerpt}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--foreground)', fontWeight: 600 }}>
                                Read Strategy <ArrowRight size={16} />
                            </div>
                        </Link>
                    ))}
                    {clusterPosts.length === 0 && (
                        <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)' }}>More strategies coming soon to this hub.</p>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
