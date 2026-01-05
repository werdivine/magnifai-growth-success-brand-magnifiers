'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import Section from '@/components/Section';
import ROICalculator from '@/components/ROICalculator';
import AIQuiz from '@/components/AIQuiz';
import PromptCarousel from '@/components/PromptCarousel';
import MagazineGrid from '@/components/MagazineGrid';
import ResourceFeed from '@/components/ResourceFeed';
import IntelligenceBrief from '@/components/IntelligenceBrief';

export type InteractiveComponentProps = SliceComponentProps<Content.InteractiveComponentSlice>;

const InteractiveComponentSlice = ({ slice }: InteractiveComponentProps) => {
    // Use type assertions to work around stale Prismic type definitions
    const primary = slice.primary as any;
    const componentType = primary.component;

    switch (componentType) {
        case 'roi_calculator':
            return (
                <Section theme="light">
                    <h2 style={{ textAlign: 'center', fontSize: '3.5rem', fontFamily: 'var(--font-playfair)', color: '#000', marginBottom: '1rem', lineHeight: 1 }}>{String(primary.title_override || "Calculate Your Upside")}</h2>
                    <p style={{ textAlign: 'center', color: '#475569', fontSize: '1.25rem', marginBottom: '3rem' }}>Don&apos;t guess. Use our proprietary models to project your automation ROI.</p>
                    <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', padding: '3rem', borderRadius: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }}>
                        <ROICalculator />
                    </div>
                </Section>
            );
        case 'ai_quiz':
            // AIQuiz has its own Section wrapper
            return <AIQuiz />;
        case 'prompt_carousel':
            // PromptCarousel has its own Section wrapper
            return <PromptCarousel />;
        case 'magazine_grid':
            // MagazineGrid has its own Section wrapper
            return <MagazineGrid />;
        case 'resource_feed':
            return (
                <Section theme="dark">
                    <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '0rem' }}>The Sovereign Archives</h2>
                    <p style={{ textAlign: 'center', color: '#94a3b8', marginBottom: '3rem' }}>
                        Specialized internal tooling, prompt libraries, and deployment frameworks.
                    </p>
                    <ResourceFeed />
                </Section>
            );
        case 'intelligence_brief':
            return (
                <Section theme="dark">
                    <IntelligenceBrief />
                </Section>
            );
        default:
            return null;
    }
};

export default InteractiveComponentSlice;
