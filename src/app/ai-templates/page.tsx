'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import styles from './page.module.css';
import {
    FileText,
    Copy,
    Check,
    Lock,
    Sparkles,
    ArrowRight,
    Instagram,
    Linkedin,
    Mail,
    MessageCircle,
    Search,
    PenTool,
    Megaphone,
    Target,
    TrendingUp,
    Users
} from 'lucide-react';

// Template categories
const CATEGORIES = [
    { id: 'all', label: 'All Templates', icon: FileText },
    { id: 'social', label: 'Social Media', icon: Instagram },
    { id: 'blog', label: 'Blog & SEO', icon: PenTool },
    { id: 'email', label: 'Email', icon: Mail },
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    { id: 'ads', label: 'Ad Copy', icon: Megaphone }
];

// Free preview templates (8 visible)
const FREE_TEMPLATES = [
    {
        id: 1,
        category: 'social',
        title: 'Viral LinkedIn Hook Generator',
        description: 'Create scroll-stopping opening lines for LinkedIn posts',
        prompt: `You are a LinkedIn viral content expert. Generate 5 powerful hook variations for a post about [TOPIC].

Rules:
- Start with a bold, contrarian statement or surprising statistic
- Use pattern interrupts (one-word sentences, numbered lists)
- Create curiosity gap without clickbait
- Include one that uses a personal failure story hook

Topic: [INSERT YOUR TOPIC]

Format each hook as:
Hook #1: [Hook text]
Why it works: [Brief explanation]`,
        isFree: true
    },
    {
        id: 2,
        category: 'social',
        title: 'Instagram Carousel Script',
        description: 'Educational carousel that drives saves and shares',
        prompt: `Create a 10-slide Instagram carousel about [TOPIC]:

Slide 1 (Hook): Bold statement + promise of value
Slides 2-8 (Content): 
- One key point per slide
- Use simple language (8th grade reading level)
- Include actionable tips
Slide 9 (Summary): Quick recap of all points
Slide 10 (CTA): Clear call-to-action with engagement prompt

Topic: [YOUR TOPIC]
Target audience: [YOUR AUDIENCE]

Make each slide shareable and screenshot-worthy.`,
        isFree: true
    },
    {
        id: 3,
        category: 'blog',
        title: 'SEO Blog Post Outline',
        description: 'Rank-optimized blog structure with semantic keywords',
        prompt: `Create a comprehensive SEO blog post outline for the keyword: "[KEYWORD]"

Include:
1. Title options (3 variations with power words)
2. Meta description (155 characters, include keyword)
3. H2 headings (6-8, keyword variations)
4. H3 subheadings under each H2
5. FAQ section (5 questions based on "People Also Ask")
6. Internal linking suggestions
7. Semantic keywords to include naturally

Target word count: 2000-2500 words
Search intent: [Informational/Commercial/Transactional]`,
        isFree: true
    },
    {
        id: 4,
        category: 'email',
        title: 'Cold Email Sequence (3-Part)',
        description: 'High-converting outreach sequence for B2B leads',
        prompt: `Create a 3-email cold outreach sequence for [YOUR SERVICE] targeting [TARGET AUDIENCE]:

EMAIL 1 - Initial Outreach:
- Subject line: [Pattern interrupt formula]
- Hook: Reference something specific about their business
- Quick pitch: One sentence value prop
- Soft CTA: Question, not ask

EMAIL 2 - Follow-up (Day 3):
- Subject line: Re: original subject
- Add new angle or case study
- Create urgency without being pushy

EMAIL 3 - Breakup (Day 7):
- Subject line: "Closing the loop"
- Reverse psychology CTA
- Leave door open

Keep each email under 100 words. Personalization is key.`,
        isFree: true
    },
    {
        id: 5,
        category: 'whatsapp',
        title: 'WhatsApp Broadcast Campaign',
        description: 'Engagement-focused broadcast for promotions',
        prompt: `Create a WhatsApp broadcast message for [PROMOTION/OFFER]:

Structure:
1. Opening hook (emoji + attention grabber)
2. Clear offer/value (what they get)
3. Social proof (brief testimonial or stat)
4. Urgency element (deadline/scarcity)
5. Clear CTA with reply keyword

Requirements:
- Max 500 characters
- Use line breaks for readability
- Include 2-3 relevant emojis
- Make it feel personal, not promotional

Offer details: [YOUR OFFER]
Target segment: [CUSTOMER TYPE]`,
        isFree: true
    },
    {
        id: 6,
        category: 'social',
        title: 'Twitter/X Thread Framework',
        description: 'Engagement-optimized thread structure',
        prompt: `Create a Twitter/X thread on [TOPIC] with this structure:

Tweet 1 (Hook): 
- Big promise or bold claim
- End with "Thread 🧵"

Tweets 2-8 (Body):
- One insight per tweet
- Use visuals/examples where possible  
- Create "aha moments"

Tweet 9 (Summary):
- Quick recap
- Encourage RT

Tweet 10 (CTA):
- Follow ask
- Relevant plug (subtle)

Rules:
- Max 280 chars per tweet
- Each tweet should stand alone
- No fluff, pure value`,
        isFree: true
    },
    {
        id: 7,
        category: 'ads',
        title: 'Facebook Ad Copy Bundle',
        description: 'Primary text, headlines, and descriptions',
        prompt: `Create Facebook ad copy variations for [PRODUCT/SERVICE]:

PRIMARY TEXT (3 variations):
- Version A: Problem-agitate-solution
- Version B: Story-based testimonial style
- Version C: Direct benefit-focused

HEADLINES (5 variations):
- Keep under 40 characters
- Include numbers when possible
- Create urgency or curiosity

DESCRIPTIONS (3 variations):
- Support the headline
- Add social proof element
- Clear CTA

Audience: [TARGET AUDIENCE]
Offer: [WHAT YOU'RE PROMOTING]
Goal: [CONVERSIONS/AWARENESS/LEADS]`,
        isFree: true
    },
    {
        id: 8,
        category: 'email',
        title: 'Newsletter Welcome Sequence',
        description: '5-email onboarding automation',
        prompt: `Create a 5-email welcome sequence for new subscribers:

EMAIL 1 (Immediate): 
- Deliver promised lead magnet
- Set expectations
- Quick personal intro

EMAIL 2 (Day 2):
- Share your story/mission
- Build connection
- Soft content piece

EMAIL 3 (Day 4):
- Best performing content
- Encourage reply/engagement

EMAIL 4 (Day 7):
- Case study/social proof
- Introduce services subtly

EMAIL 5 (Day 10):
- Direct offer/CTA
- Discount/bonus for new subscribers

Brand voice: [CASUAL/PROFESSIONAL/PLAYFUL]
Newsletter topic: [YOUR NICHE]`,
        isFree: true
    }
];

// Locked templates (shown as preview only)
const LOCKED_TEMPLATES = [
    { id: 9, category: 'social', title: 'YouTube Script Structure', description: 'Hook, story, payoff framework' },
    { id: 10, category: 'social', title: 'Reel/Shorts Script Bundle', description: '5 viral short-form formats' },
    { id: 11, category: 'blog', title: 'Pillar Content Blueprint', description: 'Comprehensive cornerstone articles' },
    { id: 12, category: 'blog', title: 'Listicle Power Formula', description: 'High-traffic list post structure' },
    { id: 13, category: 'email', title: 'Product Launch Sequence', description: '7-email launch campaign' },
    { id: 14, category: 'email', title: 'Re-engagement Campaign', description: 'Win back inactive subscribers' },
    { id: 15, category: 'whatsapp', title: 'Customer Support Scripts', description: 'FAQ auto-response templates' },
    { id: 16, category: 'whatsapp', title: 'Cart Abandonment Flow', description: 'Recovery message sequence' },
    { id: 17, category: 'ads', title: 'Google Ads Copy Set', description: 'Headlines and descriptions' },
    { id: 18, category: 'ads', title: 'Instagram Story Ads', description: 'Swipe-up optimized copy' },
    // More locked templates to show value
    { id: 19, category: 'social', title: 'Personal Brand Content Calendar', description: '30 days of post ideas' },
    { id: 20, category: 'blog', title: 'Comparison Post Template', description: 'X vs Y buying guides' },
    { id: 21, category: 'email', title: 'Abandoned Cart Sequence', description: 'E-commerce recovery emails' },
    { id: 22, category: 'whatsapp', title: 'Appointment Reminder System', description: 'Reduce no-shows by 80%' },
    { id: 23, category: 'ads', title: 'Retargeting Ad Bundle', description: 'Warm audience conversions' },
];

export default function AITemplatesPage() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [expandedTemplate, setExpandedTemplate] = useState<number | null>(null);
    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [unlocked, setUnlocked] = useState(false);

    const filteredFreeTemplates = selectedCategory === 'all'
        ? FREE_TEMPLATES
        : FREE_TEMPLATES.filter(t => t.category === selectedCategory);

    const filteredLockedTemplates = selectedCategory === 'all'
        ? LOCKED_TEMPLATES
        : LOCKED_TEMPLATES.filter(t => t.category === selectedCategory);

    const handleCopy = async (id: number, prompt: string) => {
        await navigator.clipboard.writeText(prompt);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleUnlock = (email: string) => {
        setShowModal(false);
        setUnlocked(true);
    };

    const getCategoryIcon = (categoryId: string) => {
        const cat = CATEGORIES.find(c => c.id === categoryId);
        return cat?.icon || FileText;
    };

    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.container}>
                    {/* Hero */}
                    <div className={styles.hero}>
                        <span className={styles.badge}>
                            <Sparkles size={14} />
                            Free Resource
                        </span>
                        <h1 className={styles.title}>
                            50+ AI Prompts That
                            <span className={styles.gradient}> Actually Work</span>
                        </h1>
                        <p className={styles.subtitle}>
                            Battle-tested templates for social media, blogs, emails, and more.
                            Copy, customize, and create content 10x faster.
                        </p>
                        <div className={styles.stats}>
                            <div className={styles.statItem}>
                                <strong>50+</strong>
                                <span>Templates</span>
                            </div>
                            <div className={styles.statItem}>
                                <strong>6</strong>
                                <span>Categories</span>
                            </div>
                            <div className={styles.statItem}>
                                <strong>10x</strong>
                                <span>Faster</span>
                            </div>
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className={styles.categoryFilter}>
                        {CATEGORIES.map((cat) => {
                            const Icon = cat.icon;
                            return (
                                <button
                                    key={cat.id}
                                    className={`${styles.categoryBtn} ${selectedCategory === cat.id ? styles.active : ''}`}
                                    onClick={() => setSelectedCategory(cat.id)}
                                >
                                    <Icon size={16} />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Free Templates Section */}
                    <div className={styles.templatesSection}>
                        <h2 className={styles.sectionTitle}>
                            <FileText size={20} />
                            Free Templates ({filteredFreeTemplates.length})
                        </h2>
                        <div className={styles.templatesGrid}>
                            {filteredFreeTemplates.map((template) => {
                                const CategoryIcon = getCategoryIcon(template.category);
                                const isExpanded = expandedTemplate === template.id;

                                return (
                                    <div key={template.id} className={styles.templateCard}>
                                        <div className={styles.templateHeader}>
                                            <span className={styles.categoryTag}>
                                                <CategoryIcon size={14} />
                                                {CATEGORIES.find(c => c.id === template.category)?.label}
                                            </span>
                                            <span className={styles.freeBadge}>FREE</span>
                                        </div>
                                        <h3>{template.title}</h3>
                                        <p>{template.description}</p>

                                        {isExpanded && (
                                            <div className={styles.promptBox}>
                                                <pre>{template.prompt}</pre>
                                                <button
                                                    className={styles.copyBtn}
                                                    onClick={() => handleCopy(template.id, template.prompt)}
                                                >
                                                    {copiedId === template.id ? (
                                                        <><Check size={16} /> Copied!</>
                                                    ) : (
                                                        <><Copy size={16} /> Copy Prompt</>
                                                    )}
                                                </button>
                                            </div>
                                        )}

                                        <button
                                            className={styles.expandBtn}
                                            onClick={() => setExpandedTemplate(isExpanded ? null : template.id)}
                                        >
                                            {isExpanded ? 'Hide Template' : 'View Template'}
                                            <ArrowRight size={16} className={isExpanded ? styles.rotated : ''} />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Locked Templates Section */}
                    {!unlocked ? (
                        <div className={styles.lockedSection}>
                            <div className={styles.lockedOverlay}>
                                <Lock size={32} />
                                <h3>Unlock All 50+ Templates</h3>
                                <p>Get instant access to the complete template library</p>
                                <button
                                    className={styles.unlockBtn}
                                    onClick={() => setShowModal(true)}
                                >
                                    <Sparkles size={18} />
                                    Unlock Free Access
                                </button>
                            </div>

                            <div className={styles.lockedGrid}>
                                {filteredLockedTemplates.slice(0, 6).map((template) => {
                                    const CategoryIcon = getCategoryIcon(template.category);
                                    return (
                                        <div key={template.id} className={styles.lockedCard}>
                                            <div className={styles.templateHeader}>
                                                <span className={styles.categoryTag}>
                                                    <CategoryIcon size={14} />
                                                    {CATEGORIES.find(c => c.id === template.category)?.label}
                                                </span>
                                                <Lock size={14} className={styles.lockIcon} />
                                            </div>
                                            <h3>{template.title}</h3>
                                            <p>{template.description}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            {filteredLockedTemplates.length > 6 && (
                                <p className={styles.moreText}>
                                    +{filteredLockedTemplates.length - 6} more templates in this category
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className={styles.successMessage}>
                            <Check size={24} />
                            <span>All templates unlocked! Check your email for the full PDF pack.</span>
                        </div>
                    )}

                    {/* Use Cases Section */}
                    <div className={styles.useCases}>
                        <h3>What You Can Create:</h3>
                        <div className={styles.useCaseGrid}>
                            <div className={styles.useCase}>
                                <TrendingUp size={20} />
                                <span>Viral LinkedIn posts</span>
                            </div>
                            <div className={styles.useCase}>
                                <Target size={20} />
                                <span>High-converting ads</span>
                            </div>
                            <div className={styles.useCase}>
                                <Users size={20} />
                                <span>Engaging newsletters</span>
                            </div>
                            <div className={styles.useCase}>
                                <Search size={20} />
                                <span>SEO blog posts</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lead Capture Modal */}
                <LeadCaptureModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onSuccess={handleUnlock}
                    source="ai-templates"
                    title="Unlock 50+ AI Templates"
                    subtitle="Get instant access to the complete template library"
                    ctaText="Send Me The Templates"
                    benefits={[
                        "50+ ready-to-use AI prompts",
                        "Social, Email, Blog, WhatsApp & Ads",
                        "PDF download for offline use",
                        "Bonus: Content calendar template"
                    ]}
                />
            </main>
            <Footer />
        </>
    );
}
