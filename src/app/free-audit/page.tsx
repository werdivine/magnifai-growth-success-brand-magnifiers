'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import styles from './page.module.css';
import {
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    Target,
    Zap,
    Clock,
    TrendingUp,
    Sparkles,
    Lightbulb,
    DollarSign,
    Users,
    MessageSquare,
    BarChart3,
    Brain
} from 'lucide-react';

// Audit Questions with weighted scoring
const AUDIT_QUESTIONS = [
    {
        id: 'marketing_channels',
        question: 'Which marketing channels are you currently using?',
        icon: Target,
        options: [
            { label: 'Just word of mouth', score: 1, tag: 'basic' },
            { label: 'Social media (organic only)', score: 2, tag: 'growing' },
            { label: 'Paid ads + Social media', score: 3, tag: 'active' },
            { label: 'Full multi-channel strategy', score: 4, tag: 'advanced' }
        ]
    },
    {
        id: 'content_time',
        question: 'How many hours per week do you spend creating content?',
        icon: Clock,
        options: [
            { label: 'Less than 2 hours', score: 1, tag: 'minimal' },
            { label: '2-5 hours', score: 2, tag: 'moderate' },
            { label: '5-10 hours', score: 3, tag: 'significant' },
            { label: 'More than 10 hours', score: 4, tag: 'heavy' }
        ]
    },
    {
        id: 'lead_gen',
        question: 'How do you currently generate leads?',
        icon: Users,
        options: [
            { label: 'Waiting for referrals', score: 1, tag: 'passive' },
            { label: 'Manual outreach (cold calling/DMs)', score: 2, tag: 'active' },
            { label: 'Website + contact forms', score: 3, tag: 'inbound' },
            { label: 'Automated funnels & campaigns', score: 4, tag: 'automated' }
        ]
    },
    {
        id: 'response_time',
        question: 'How quickly do you respond to leads/inquiries?',
        icon: MessageSquare,
        options: [
            { label: 'Within 24-48 hours', score: 1, tag: 'slow' },
            { label: 'Same day (within hours)', score: 2, tag: 'moderate' },
            { label: 'Within 1 hour', score: 3, tag: 'fast' },
            { label: 'Instant (automated)', score: 4, tag: 'instant' }
        ]
    },
    {
        id: 'ai_usage',
        question: 'How are you currently using AI in your business?',
        icon: Brain,
        options: [
            { label: 'Not using AI yet', score: 4, tag: 'opportunity' },
            { label: 'Just ChatGPT occasionally', score: 3, tag: 'basic' },
            { label: 'Several AI tools integrated', score: 2, tag: 'intermediate' },
            { label: 'Comprehensive AI workflow', score: 1, tag: 'advanced' }
        ]
    },
    {
        id: 'analytics',
        question: 'How do you track marketing performance?',
        icon: BarChart3,
        options: [
            { label: 'I don\'t track metrics', score: 4, tag: 'none' },
            { label: 'Basic social media insights', score: 3, tag: 'basic' },
            { label: 'Google Analytics + some dashboards', score: 2, tag: 'moderate' },
            { label: 'Full analytics stack with ROI tracking', score: 1, tag: 'complete' }
        ]
    },
    {
        id: 'budget',
        question: 'What\'s your monthly marketing budget?',
        icon: DollarSign,
        options: [
            { label: 'Under ₹10,000', score: 1, tag: 'starter' },
            { label: '₹10,000 - ₹50,000', score: 2, tag: 'growing' },
            { label: '₹50,000 - ₹2,00,000', score: 3, tag: 'scaling' },
            { label: 'Over ₹2,00,000', score: 4, tag: 'enterprise' }
        ]
    },
    {
        id: 'goal',
        question: 'What\'s your biggest marketing challenge right now?',
        icon: Lightbulb,
        options: [
            { label: 'Getting more leads', score: 3, tag: 'leads' },
            { label: 'Converting leads to customers', score: 3, tag: 'conversion' },
            { label: 'Creating consistent content', score: 3, tag: 'content' },
            { label: 'Scaling without hiring', score: 3, tag: 'scaling' }
        ]
    }
];

// Recommendations based on answers
const RECOMMENDATIONS: Record<string, { title: string; description: string; impact: string }> = {
    // Content optimization
    'content_time:heavy': {
        title: 'AI Content Automation',
        description: 'You\'re spending 10+ hours on content. AI can reduce this by 70% while maintaining quality.',
        impact: 'Save 7+ hours/week'
    },
    'content_time:significant': {
        title: 'Content Batching with AI',
        description: 'Use AI to batch-create a month\'s content in one session.',
        impact: 'Save 4+ hours/week'
    },
    // Lead generation
    'lead_gen:passive': {
        title: 'Automated Lead Generation',
        description: 'Stop waiting for referrals. Set up AI-powered outreach sequences that work 24/7.',
        impact: '3x more leads'
    },
    'lead_gen:active': {
        title: 'WhatsApp Marketing Automation',
        description: 'Transform manual outreach into automated campaigns with 98% open rates.',
        impact: '5x faster outreach'
    },
    // Response time
    'response_time:slow': {
        title: 'AI Chatbot Integration',
        description: '24-48 hour response = lost leads. An AI chatbot can respond instantly.',
        impact: '40% more conversions'
    },
    'response_time:moderate': {
        title: 'Smart Auto-Responders',
        description: 'Same-day is good, but instant is better. Set up intelligent auto-responses.',
        impact: '25% more conversions'
    },
    // AI opportunity
    'ai_usage:opportunity': {
        title: '🔥 Massive AI Opportunity',
        description: 'You\'re not using AI yet—this is your biggest competitive advantage waiting to happen.',
        impact: '10x efficiency gain possible'
    },
    'ai_usage:basic': {
        title: 'AI Workflow Integration',
        description: 'ChatGPT is just the start. Integrate AI across your entire marketing stack.',
        impact: '50% time savings'
    },
    // Analytics
    'analytics:none': {
        title: 'AI-Powered Analytics Setup',
        description: 'You can\'t improve what you don\'t measure. AI can track and predict performance.',
        impact: 'Data-driven decisions'
    },
    'analytics:basic': {
        title: 'Unified Marketing Dashboard',
        description: 'Consolidate all your metrics into one AI-powered dashboard.',
        impact: 'Clear ROI visibility'
    },
    // Goal-specific
    'goal:leads': {
        title: 'Lead Magnet Funnel',
        description: 'Create high-value lead magnets with AI and automate the capture process.',
        impact: 'Consistent lead flow'
    },
    'goal:conversion': {
        title: 'AI Follow-up Sequences',
        description: 'Most leads need 7+ touches. Automate personalized follow-ups with AI.',
        impact: '2x conversion rate'
    },
    'goal:content': {
        title: 'Content Operating System',
        description: 'Build an AI-powered content engine that produces quality content daily.',
        impact: 'Never run out of content'
    },
    'goal:scaling': {
        title: 'Full Automation Stack',
        description: 'Scale your output without scaling your team using AI agents.',
        impact: '3x output, same team'
    }
};

export default function FreeAuditPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, { score: number; tag: string }>>({});
    const [showModal, setShowModal] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const progress = ((currentQuestion) / AUDIT_QUESTIONS.length) * 100;

    const handleAnswer = (questionId: string, score: number, tag: string) => {
        const newAnswers = { ...answers, [questionId]: { score, tag } };
        setAnswers(newAnswers);

        if (currentQuestion < AUDIT_QUESTIONS.length - 1) {
            setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
        } else {
            // All questions answered, show email gate
            setShowModal(true);
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleEmailSuccess = (email: string) => {
        setUserEmail(email);
        setShowModal(false);
        setShowResults(true);
    };

    const calculateScore = () => {
        const scores = Object.values(answers).map(a => a.score);
        const total = scores.reduce((a, b) => a + b, 0);
        const max = AUDIT_QUESTIONS.length * 4;
        return Math.round((total / max) * 100);
    };

    const getScoreLevel = (score: number) => {
        if (score >= 80) return { label: 'AI Pioneer', color: '#10b981', desc: 'You\'re ahead of 90% of businesses!' };
        if (score >= 60) return { label: 'AI Ready', color: '#6366f1', desc: 'Great foundation with room to grow.' };
        if (score >= 40) return { label: 'AI Opportunity', color: '#f59e0b', desc: 'Significant untapped potential!' };
        return { label: 'AI Goldmine', color: '#ec4899', desc: 'Massive opportunity for transformation!' };
    };

    const getRecommendations = () => {
        const recs: typeof RECOMMENDATIONS[string][] = [];
        Object.entries(answers).forEach(([questionId, { tag }]) => {
            const key = `${questionId}:${tag}`;
            if (RECOMMENDATIONS[key]) {
                recs.push(RECOMMENDATIONS[key]);
            }
        });
        return recs.slice(0, 4); // Top 4 recommendations
    };

    const getEstimatedSavings = () => {
        let hours = 0;
        if (answers['content_time']?.tag === 'heavy') hours += 7;
        if (answers['content_time']?.tag === 'significant') hours += 4;
        if (answers['lead_gen']?.tag === 'active') hours += 5;
        if (answers['response_time']?.score <= 2) hours += 3;
        return hours || 8; // Minimum 8 hours estimate
    };

    const currentQ = AUDIT_QUESTIONS[currentQuestion];
    const Icon = currentQ?.icon || Target;

    return (
        <>
            <Header />
            <main className={styles.main}>
                {!showResults ? (
                    <div className={styles.container}>
                        {/* Hero Section */}
                        {currentQuestion === 0 && Object.keys(answers).length === 0 && (
                            <div className={styles.hero}>
                                <span className={styles.badge}>
                                    <Sparkles size={14} />
                                    Free 2-Minute Assessment
                                </span>
                                <h1 className={styles.title}>
                                    Discover Your Hidden
                                    <span className={styles.gradient}> AI Opportunity</span>
                                </h1>
                                <p className={styles.subtitle}>
                                    Answer 8 quick questions and get a personalized AI readiness score
                                    with actionable recommendations—completely free.
                                </p>
                                <div className={styles.trustBadges}>
                                    <span><CheckCircle size={16} /> 2 Minutes</span>
                                    <span><CheckCircle size={16} /> Personalized Results</span>
                                    <span><CheckCircle size={16} /> Actionable Insights</span>
                                </div>
                            </div>
                        )}

                        {/* Progress Bar */}
                        <div className={styles.progressWrapper}>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <span className={styles.progressText}>
                                {currentQuestion + 1} of {AUDIT_QUESTIONS.length}
                            </span>
                        </div>

                        {/* Question Card */}
                        <div className={styles.questionCard}>
                            <div className={styles.questionIcon}>
                                <Icon size={28} />
                            </div>
                            <h2 className={styles.question}>{currentQ.question}</h2>

                            <div className={styles.options}>
                                {currentQ.options.map((option, i) => (
                                    <button
                                        key={i}
                                        className={`${styles.optionBtn} ${answers[currentQ.id]?.tag === option.tag ? styles.selected : ''
                                            }`}
                                        onClick={() => handleAnswer(currentQ.id, option.score, option.tag)}
                                    >
                                        <span className={styles.optionLabel}>{option.label}</span>
                                        <ArrowRight size={18} className={styles.optionArrow} />
                                    </button>
                                ))}
                            </div>

                            {currentQuestion > 0 && (
                                <button className={styles.backBtn} onClick={handleBack}>
                                    <ArrowLeft size={16} />
                                    Back
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    /* Results Section */
                    <div className={styles.resultsContainer}>
                        <div className={styles.resultsHeader}>
                            <h1>Your AI Marketing Audit Results</h1>
                            <p>Personalized analysis for {userEmail}</p>
                        </div>

                        {/* Score Circle */}
                        <div className={styles.scoreSection}>
                            <div
                                className={styles.scoreCircle}
                                style={{ borderColor: getScoreLevel(calculateScore()).color }}
                            >
                                <span className={styles.scoreNumber}>{calculateScore()}</span>
                                <span className={styles.scoreLabel}>Score</span>
                            </div>
                            <h2 style={{ color: getScoreLevel(calculateScore()).color }}>
                                {getScoreLevel(calculateScore()).label}
                            </h2>
                            <p>{getScoreLevel(calculateScore()).desc}</p>
                        </div>

                        {/* Key Metrics */}
                        <div className={styles.metricsGrid}>
                            <div className={styles.metricCard}>
                                <Clock size={24} />
                                <span className={styles.metricValue}>{getEstimatedSavings()}+ hrs</span>
                                <span className={styles.metricLabel}>Weekly savings potential</span>
                            </div>
                            <div className={styles.metricCard}>
                                <TrendingUp size={24} />
                                <span className={styles.metricValue}>3x</span>
                                <span className={styles.metricLabel}>Lead generation boost</span>
                            </div>
                            <div className={styles.metricCard}>
                                <Zap size={24} />
                                <span className={styles.metricValue}>70%</span>
                                <span className={styles.metricLabel}>Content time reduction</span>
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className={styles.recommendationsSection}>
                            <h3>
                                <Lightbulb size={20} />
                                Your Personalized Recommendations
                            </h3>
                            <div className={styles.recommendationsList}>
                                {getRecommendations().map((rec, i) => (
                                    <div key={i} className={styles.recommendationCard}>
                                        <div className={styles.recHeader}>
                                            <h4>{rec.title}</h4>
                                            <span className={styles.impactBadge}>{rec.impact}</span>
                                        </div>
                                        <p>{rec.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className={styles.ctaSection}>
                            <h3>Ready to Transform Your Marketing?</h3>
                            <p>Book a free 15-minute strategy call to discuss your results.</p>
                            <a
                                href="https://calendly.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.ctaButton}
                            >
                                <Sparkles size={18} />
                                Book Free Strategy Call
                                <ArrowRight size={18} />
                            </a>
                        </div>
                    </div>
                )}

                {/* Lead Capture Modal */}
                <LeadCaptureModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onSuccess={handleEmailSuccess}
                    source="free-audit"
                    title="Unlock Your AI Score"
                    subtitle="Enter your email to see your personalized results and recommendations"
                    ctaText="See My Results"
                    benefits={[
                        "Your AI Opportunity Score (0-100)",
                        "Personalized recommendations",
                        "Estimated time & cost savings",
                        "Priority implementation roadmap"
                    ]}
                />
            </main>
            <Footer />
        </>
    );
}
