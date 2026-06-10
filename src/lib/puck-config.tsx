/* eslint-disable react/display-name */
import type { Config } from '@measured/puck'
import { FadeIn } from '@/components/FadeIn';
import HomeHero from '@/components/HomeHero'
import StatsCounter from '@/components/StatsCounter'
import TrustedByComponent from '@/components/TrustedBy'
import TestimonialsComponent from '@/components/Testimonials'
import ServicesGrid from '@/components/ServicesGrid'
import { BentoGrid as BentoGridComponent, BentoItem as BentoItemComponent } from '@/components/BentoGrid'
import { Bot, Zap, Globe, Database } from 'lucide-react'
import ProblemSectionComponent from '@/components/ProblemSection'
import ValuePropComponent from '@/components/ValueProp'
import FAQComponent from '@/components/FAQ'
import MagazineGridComponent from '@/components/MagazineGrid'
import LeadMagnetComponent from '@/components/LeadMagnet'
import LeadCaptureComponent from '@/components/LeadCapture'
import InlineCTAComponent from '@/components/InlineCTA'
import ROICalculatorComponent from '@/components/ROICalculator'
import PromptCarouselComponent from '@/components/PromptCarousel'
import Section from '@/components/Section'
import BookingWidgetComponent from '@/components/BookingWidget'
import IntelligenceBriefComponent from '@/components/IntelligenceBrief'
import ResourceFeedComponent from '@/components/ResourceFeed'
import AIQuizComponent from '@/components/AIQuiz'
import FreeEbookSectionComponent from '@/components/FreeEbookSection'
import TelegramTeaserComponent from '@/components/TelegramTeaser'

// Define component types
export type HeroProps = {
    badgeText: string
    title: string
    description: string
    primaryCtaText: string
    primaryCtaLink: string
    secondaryCtaText: string
    secondaryCtaLink: string
}

export type StatsProps = {
    items: Array<{ value: string; label: string }>
}

export type BentoGridProps = {
    title: string
    subtitle: string
    items: Array<{
        title: string
        description: string
        iconName: 'Bot' | 'Zap' | 'Globe' | 'Database'
        span: 1 | 2
    }>
}

export type TrustedByProps = {
    title: string
    companies: Array<{ name: string }>
}

export type ServicesProps = {
    eyebrow: string
    title: string
    subtitle: string
    items: Array<{
        title: string
        description: string
        iconName: 'Palette' | 'Megaphone' | 'Bot' | 'Code'
        link: string
    }>
}

export type TestimonialsProps = {
    title: string
    reviews: Array<{
        text: string
        name: string
        role: string
    }>
}

// Puck configuration
export type Props = {
    Hero: HeroProps
    Stats: StatsProps
    BentoGrid: BentoGridProps
    TrustedBy: TrustedByProps
    Services: ServicesProps
    Testimonials: TestimonialsProps
    ProblemSection: {}
    ValueProp: {}
    FAQ: {}
    MagazineGrid: {}
    LeadMagnet: {}
    LeadCapture: {}
    InlineCTA: {
        variant: 'audit' | 'consultation' | 'newsletter'
    }
    ROICalculator: {}
    PromptCarousel: {}
    BookingWidget: {}
    IntelligenceBrief: {}
    ResourceFeed: {}
    AIQuiz: {}
    LeadMagnetGuide: {}
    TelegramTeaser: {}
}

// Helper for icons
const IconMap: Record<string, any> = { Bot, Zap, Globe, Database }

export const config: Config<Props> = {
    components: {
        Hero: {
            fields: {
                badgeText: { type: 'text' },
                title: { type: 'textarea' },
                description: { type: 'textarea' },
                primaryCtaText: { type: 'text' },
                primaryCtaLink: { type: 'text' },
                secondaryCtaText: { type: 'text' },
                secondaryCtaLink: { type: 'text' },
            },
            defaultProps: {
                badgeText: 'v2.0.0 Now Live',
                title: 'The Growth Engine\nFor Scaling Agencies',
                description: 'Stop relying on luck. We build automated AI pipelines that target, nurture, and close your ideal clients.',
                primaryCtaText: 'Start Growth Engine',
                primaryCtaLink: '/book',
                secondaryCtaText: 'View System Architecture',
                secondaryCtaLink: '/case-studies',
            },
            render: ({ badgeText, title, description, primaryCtaText, primaryCtaLink, secondaryCtaText, secondaryCtaLink }) => (
                <FadeIn>
                    <HomeHero 
                        badgeText={badgeText} 
                        title={title} 
                        description={description} 
                        primaryCtaText={primaryCtaText} 
                        primaryCtaLink={primaryCtaLink} 
                        secondaryCtaText={secondaryCtaText} 
                        secondaryCtaLink={secondaryCtaLink} 
                    />
                </FadeIn>
            ),
        },
        Stats: {
            fields: {
                items: {
                    type: 'array',
                    arrayFields: {
                        value: { type: 'text' },
                        label: { type: 'text' },
                    },
                    defaultItemProps: { value: '100+', label: 'Clients' }
                }
            },
            defaultProps: {
                items: [
                    { value: "4x", label: "Faster Execution" },
                    { value: "98%", label: "Open Rates" },
                    { value: "24/7", label: "AI Operation" },
                    { value: "< 7 Days", label: "To Launch" }
                ]
            },
            render: ({ items }) => (
                <FadeIn>
                    <Section variant="void">
                        <div className="orb orb-blue" style={{ bottom: '-10rem', left: '10%', opacity: 0.1 }} />
                        <StatsCounter items={items} />
                    </Section>
                </FadeIn>
            )
        },
        TrustedBy: {
            fields: {
                title: { type: 'text' },
                companies: {
                    type: 'array',
                    arrayFields: { name: { type: 'text' } },
                    defaultItemProps: { name: 'Company Name' }
                }
            },
            defaultProps: {
                title: 'Trusted by teams automating the future',
                companies: [{ name: 'TechCorp' }, { name: 'DataFlow' }, { name: 'AI Ventures' }, { name: 'Nebula Systems' }]
            },
            render: ({ title, companies }) => (
                <FadeIn>
                    <Section variant="mesh" className="section-mesh">
                        <TrustedByComponent title={title} companies={companies} />
                    </Section>
                </FadeIn>
            )
        },
        BentoGrid: {
            fields: {
                title: { type: 'text' },
                subtitle: { type: 'textarea' },
                items: {
                    type: 'array',
                    arrayFields: {
                        title: { type: 'text' },
                        description: { type: 'textarea' },
                        iconName: { type: 'select', options: [{ label: 'Bot', value: 'Bot' }, { label: 'Zap', value: 'Zap' }, { label: 'Globe', value: 'Globe' }, { label: 'Database', value: 'Database' }] },
                        span: { type: 'select', options: [{ label: '1 Column', value: 1 }, { label: '2 Columns', value: 2 }] }
                    },
                    defaultItemProps: { title: 'Feature', description: 'Description', iconName: 'Zap', span: 1 }
                }
            },
            defaultProps: {
                title: 'System Architecture',
                subtitle: 'A modular, scalable ecosystem designed for complete market dominance.',
                items: [
                    { title: 'AI Agents Swarm', description: 'Autonomous agents that handle outreach 24/7.', iconName: 'Bot', span: 2 },
                    { title: 'Visual Intelligence', description: 'Generative UI adapting in real-time.', iconName: 'Zap', span: 1 },
                ]
            },
            render: ({ title, subtitle, items }) => (
                <FadeIn>
                    <Section variant="void">
                        <div className="orb orb-purple" style={{ top: '20%', left: '-10rem', opacity: 0.1 }} />
                        <div className="orb orb-blue" style={{ bottom: '20%', right: '-10rem', opacity: 0.1 }} />
                        <h2 className="glow-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', textAlign: 'center', marginBottom: '1.5rem' }}>{title}</h2>
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '5rem', maxWidth: '700px', margin: '0 auto 5rem', fontSize: '1.25rem' }}>{subtitle}</p>
                        <BentoGridComponent>
                            {items.map((item, i) => {
                                const Icon = IconMap[item.iconName] || Zap;
                                return (
                                    <BentoItemComponent
                                        key={i}
                                        title={item.title}
                                        description={item.description}
                                        icon={<Icon size={32} />}
                                        span={item.span}
                                    />
                                )
                            })}
                        </BentoGridComponent>
                    </Section>
                </FadeIn>
            )
        },
        Services: {
            fields: {
                eyebrow: { type: 'text' },
                title: { type: 'text' },
                subtitle: { type: 'textarea' },
                items: {
                    type: 'array',
                    arrayFields: {
                        title: { type: 'text' },
                        description: { type: 'textarea' },
                        iconName: { type: 'select', options: [{ label: 'Palette', value: 'Palette' }, { label: 'Megaphone', value: 'Megaphone' }, { label: 'Bot', value: 'Bot' }, { label: 'Code', value: 'Code' }] },
                        link: { type: 'text' }
                    },
                    defaultItemProps: { title: 'Service', description: 'Description', iconName: 'Code', link: '#' }
                }
            },
            defaultProps: {
                eyebrow: 'WHAT WE DO',
                title: 'Services Built for Growth',
                subtitle: 'Full-stack creative and technical solutions.',
                items: []
            },
            render: ({ eyebrow, title, subtitle, items }) => (
                <FadeIn>
                    <Section variant="mesh">
                         <div className="orb orb-purple" style={{ top: '50%', right: '-10rem', opacity: 0.1 }} />
                        <ServicesGrid
                            eyebrow={eyebrow}
                            title={title}
                            subtitle={subtitle}
                            items={items?.map(item => ({
                                ...item,
                                href: (item as any).href || item.link || '#'
                            }))}
                        />
                    </Section>
                </FadeIn>
            )
        },
        Testimonials: {
            fields: {
                title: { type: 'text' },
                reviews: {
                    type: 'array',
                    arrayFields: {
                        text: { type: 'textarea' },
                        name: { type: 'text' },
                        role: { type: 'text' }
                    },
                    defaultItemProps: { text: "Great result!", name: "Client Name", role: "CEO" }
                }
            },
            defaultProps: {
                title: 'Success Stories',
                reviews: [
                    { text: "The ROI calculator alone saved us 40 hours of implementation time.", name: "Sarah Jenkins", role: "CTO at TechFlow" },
                ]
            },
            render: ({ title, reviews }) => (
                <FadeIn>
                    <Section variant="void">
                         <div className="orb orb-purple" style={{ top: '-50px', left: '10%', opacity: 0.1 }} />
                        <TestimonialsComponent title={title} reviews={reviews} />
                    </Section>
                </FadeIn>
            )
        },
        ProblemSection: {
            render: () => (
                <FadeIn>
                    <Section variant="neon">
                        <ProblemSectionComponent />
                    </Section>
                </FadeIn>
            )
        },
        ValueProp: {
            render: () => (
                <FadeIn>
                    <Section variant="void">
                        <ValuePropComponent />
                    </Section>
                </FadeIn>
            )
        },
        FAQ: {
             render: () => (
                <FadeIn>
                    <Section variant="midnight">
                        <FAQComponent />
                    </Section>
                </FadeIn>
            )
        },
        MagazineGrid: {
             render: () => (
                <FadeIn>
                    <Section variant="mesh">
                         <div className="orb orb-blue" style={{ top: '20%', right: '0', opacity: 0.05 }} />
                        <MagazineGridComponent />
                    </Section>
                </FadeIn>
            )
        },
        LeadMagnet: {
             render: () => (
                <FadeIn>
                    <Section variant="void">
                        <LeadMagnetComponent />
                    </Section>
                </FadeIn>
            )
        },
        LeadCapture: {
             render: () => (
                <FadeIn>
                    <Section variant="midnight">
                         <div className="liquid-glass" style={{ padding: '4rem', borderRadius: '2rem' }}>
                            <LeadCaptureComponent />
                        </div>
                    </Section>
                </FadeIn>
            )
        },
        InlineCTA: {
            fields: {
                variant: {
                    type: 'radio',
                    options: [
                        { label: 'Audit (Green)', value: 'audit' },
                        { label: 'Consultation (Calendar)', value: 'consultation' },
                        { label: 'Newsletter (Purple)', value: 'newsletter' }
                    ]
                } as any
            },
            defaultProps: {
                variant: 'audit'
            },
            render: ({ variant }) => <FadeIn><InlineCTAComponent variant={variant} /></FadeIn>
        },
        ROICalculator: {
            render: () => (
                <FadeIn>
                    <Section variant="void">
                        <div className="orb orb-purple" style={{ top: '10%', left: '10%', opacity: 0.1 }} />
                        <h2 className="glow-text" style={{ textAlign: 'center', fontSize: '4.5rem', marginBottom: '1.5rem' }}>Calculate Your Upside</h2>
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.35rem', marginBottom: '4rem', maxWidth: '800px', margin: '0 auto 4rem' }}>Don&apos;t guess. Use our proprietary models to project your automation ROI.</p>
                        <div className="liquid-glass" style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem', borderRadius: '2rem' }}>
                            <ROICalculatorComponent />
                        </div>
                    </Section>
                </FadeIn>
            )
        },
        PromptCarousel: {
            render: () => <FadeIn><PromptCarouselComponent /></FadeIn>
        },
        BookingWidget: {
            render: () => (
                <FadeIn>
                    <Section variant="midnight">
                        <div className="orb orb-blue" style={{ bottom: '-100px', right: '10%', opacity: 0.1 }} />
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
                            <BookingWidgetComponent />
                        </div>
                    </Section>
                </FadeIn>
            )
        },
        IntelligenceBrief: {
            render: () => (
                <FadeIn>
                    <Section variant="void">
                         <div className="orb orb-purple" style={{ top: '20%', left: '5%', opacity: 0.1 }} />
                         <div className="orb orb-blue" style={{ bottom: '20%', right: '5%', opacity: 0.1 }} />
                        <IntelligenceBriefComponent />
                    </Section>
                </FadeIn>
            )
        },
        ResourceFeed: {
            render: () => (
                <FadeIn>
                    <Section variant="midnight">
                        <h2 className="glow-text" style={{ textAlign: 'center', fontSize: '3.5rem', marginBottom: '1rem' }}>The Sovereign Archives</h2>
                        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem', fontSize: '1.2rem' }}>
                            Specialized internal tooling, prompt libraries, and deployment frameworks.
                        </p>
                        <ResourceFeedComponent />
                    </Section>
                </FadeIn>
            )
        },
        AIQuiz: {
            render: () => <FadeIn><AIQuizComponent /></FadeIn>
        },
        LeadMagnetGuide: {
            render: () => <FadeIn><FreeEbookSectionComponent /></FadeIn>
        },
        TelegramTeaser: {
            render: () => (
                <FadeIn>
                    <Section variant="void">
                        <TelegramTeaserComponent />
                    </Section>
                </FadeIn>
            )
        }
    },
}
