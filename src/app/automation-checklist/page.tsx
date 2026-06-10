'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LeadCaptureModal from '@/components/LeadCaptureModal';
import styles from './page.module.css';
import {
    CheckSquare,
    Square,
    Sparkles,
    ArrowRight,
    TrendingUp,
    Clock,
    DollarSign,
    Megaphone,
    ShoppingCart,
    Settings,
    Headphones,
    Calculator,
    ChevronDown,
    ChevronUp,
    Zap,
    Target,
    Award
} from 'lucide-react';

// Automation checklist items by department
const CHECKLIST_DATA = [
    {
        id: 'marketing',
        title: 'Marketing',
        icon: Megaphone,
        color: '#6366f1',
        items: [
            { id: 'm1', label: 'Email welcome sequence automation', impact: 'high', hoursSaved: 5 },
            { id: 'm2', label: 'Social media scheduling tools', impact: 'medium', hoursSaved: 8 },
            { id: 'm3', label: 'Lead magnet delivery automation', impact: 'high', hoursSaved: 3 },
            { id: 'm4', label: 'Newsletter automation', impact: 'medium', hoursSaved: 4 },
            { id: 'm5', label: 'AI content generation workflow', impact: 'high', hoursSaved: 10 },
            { id: 'm6', label: 'Retargeting pixel setup', impact: 'medium', hoursSaved: 2 },
            { id: 'm7', label: 'UTM tracking automation', impact: 'low', hoursSaved: 1 },
            { id: 'm8', label: 'A/B testing automation', impact: 'medium', hoursSaved: 3 }
        ]
    },
    {
        id: 'sales',
        title: 'Sales',
        icon: ShoppingCart,
        color: '#10b981',
        items: [
            { id: 's1', label: 'CRM lead capture automation', impact: 'high', hoursSaved: 6 },
            { id: 's2', label: 'Follow-up email sequences', impact: 'high', hoursSaved: 8 },
            { id: 's3', label: 'Meeting scheduling (Calendly)', impact: 'medium', hoursSaved: 4 },
            { id: 's4', label: 'Proposal/quote generation', impact: 'medium', hoursSaved: 5 },
            { id: 's5', label: 'Pipeline status notifications', impact: 'low', hoursSaved: 2 },
            { id: 's6', label: 'Contract/e-signature workflow', impact: 'high', hoursSaved: 3 }
        ]
    },
    {
        id: 'operations',
        title: 'Operations',
        icon: Settings,
        color: '#f59e0b',
        items: [
            { id: 'o1', label: 'Task assignment automation', impact: 'medium', hoursSaved: 4 },
            { id: 'o2', label: 'Project status updates', impact: 'medium', hoursSaved: 3 },
            { id: 'o3', label: 'Document approval workflows', impact: 'high', hoursSaved: 5 },
            { id: 'o4', label: 'Inventory alerts', impact: 'medium', hoursSaved: 2 },
            { id: 'o5', label: 'Vendor communication automation', impact: 'low', hoursSaved: 2 },
            { id: 'o6', label: 'Employee onboarding workflow', impact: 'high', hoursSaved: 10 },
            { id: 'o7', label: 'Time tracking automation', impact: 'medium', hoursSaved: 3 },
            { id: 'o8', label: 'Report generation scheduling', impact: 'medium', hoursSaved: 4 }
        ]
    },
    {
        id: 'support',
        title: 'Customer Support',
        icon: Headphones,
        color: '#ec4899',
        items: [
            { id: 'c1', label: 'WhatsApp auto-responder', impact: 'high', hoursSaved: 15 },
            { id: 'c2', label: 'FAQ chatbot implementation', impact: 'high', hoursSaved: 12 },
            { id: 'c3', label: 'Ticket routing automation', impact: 'medium', hoursSaved: 4 },
            { id: 'c4', label: 'CSAT survey automation', impact: 'low', hoursSaved: 2 },
            { id: 'c5', label: 'Order status notifications', impact: 'high', hoursSaved: 6 },
            { id: 'c6', label: 'Appointment reminder system', impact: 'medium', hoursSaved: 5 }
        ]
    },
    {
        id: 'finance',
        title: 'Finance',
        icon: Calculator,
        color: '#8b5cf6',
        items: [
            { id: 'f1', label: 'Invoice generation automation', impact: 'high', hoursSaved: 6 },
            { id: 'f2', label: 'Payment reminder sequences', impact: 'high', hoursSaved: 4 },
            { id: 'f3', label: 'Expense tracking integration', impact: 'medium', hoursSaved: 3 },
            { id: 'f4', label: 'Financial report scheduling', impact: 'medium', hoursSaved: 4 }
        ]
    }
];

export default function AutomationChecklistPage() {
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
    const [expandedSections, setExpandedSections] = useState<Set<string>>(
        new Set(CHECKLIST_DATA.map(d => d.id))
    );
    const [showModal, setShowModal] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const totalItems = CHECKLIST_DATA.reduce((acc, dept) => acc + dept.items.length, 0);
    const checkedCount = checkedItems.size;
    const progress = (checkedCount / totalItems) * 100;

    const calculations = useMemo(() => {
        let totalHoursSaved = 0;
        let automatedItems = 0;
        let highImpactMissing: string[] = [];

        CHECKLIST_DATA.forEach(dept => {
            dept.items.forEach(item => {
                if (checkedItems.has(item.id)) {
                    automatedItems++;
                } else {
                    totalHoursSaved += item.hoursSaved;
                    if (item.impact === 'high') {
                        highImpactMissing.push(item.label);
                    }
                }
            });
        });

        const monthlyHours = totalHoursSaved;
        const yearlyHours = monthlyHours * 12;
        const costPerHour = 500; // ₹500/hour average
        const yearlySavings = yearlyHours * costPerHour;
        const automationScore = Math.round((automatedItems / totalItems) * 100);

        return {
            automatedItems,
            totalItems,
            monthlyHours,
            yearlyHours,
            yearlySavings,
            automationScore,
            highImpactMissing: highImpactMissing.slice(0, 5)
        };
    }, [checkedItems, totalItems]);

    const toggleItem = (itemId: string) => {
        const newChecked = new Set(checkedItems);
        if (newChecked.has(itemId)) {
            newChecked.delete(itemId);
        } else {
            newChecked.add(itemId);
        }
        setCheckedItems(newChecked);
    };

    const toggleSection = (sectionId: string) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(sectionId)) {
            newExpanded.delete(sectionId);
        } else {
            newExpanded.add(sectionId);
        }
        setExpandedSections(newExpanded);
    };

    const handleGetResults = () => {
        setShowModal(true);
    };

    const handleEmailSuccess = (email: string) => {
        setUserEmail(email);
        setShowModal(false);
        setShowResults(true);
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return { label: 'Automation Leader', color: '#10b981' };
        if (score >= 60) return { label: 'Well Automated', color: '#6366f1' };
        if (score >= 40) return { label: 'Getting There', color: '#f59e0b' };
        return { label: 'Automation Opportunity', color: '#ec4899' };
    };

    const formatCurrency = (amount: number) => {
        if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
        if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
        return `₹${amount.toLocaleString()}`;
    };

    return (
        <>
            <Header />
            <main className={styles.main}>
                {!showResults ? (
                    <div className={styles.container}>
                        {/* Hero */}
                        <div className={styles.hero}>
                            <span className={styles.badge}>
                                <Zap size={14} />
                                Interactive Assessment
                            </span>
                            <h1 className={styles.title}>
                                32 Ways to Automate
                                <span className={styles.gradient}> Your Business</span>
                            </h1>
                            <p className={styles.subtitle}>
                                Check off what you already have automated. See how much time and money
                                you&apos;re leaving on the table.
                            </p>
                        </div>

                        {/* Progress Overview */}
                        <div className={styles.progressCard}>
                            <div className={styles.progressHeader}>
                                <div>
                                    <span className={styles.progressLabel}>Your Automation Score</span>
                                    <div className={styles.scoreDisplay}>
                                        <span
                                            className={styles.scoreNumber}
                                            style={{ color: getScoreLabel(calculations.automationScore).color }}
                                        >
                                            {calculations.automationScore}%
                                        </span>
                                        <span className={styles.scoreStatus}>
                                            {getScoreLabel(calculations.automationScore).label}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.progressStats}>
                                    <div className={styles.progressStat}>
                                        <strong>{checkedCount}</strong>
                                        <span>of {totalItems}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressFill}
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {/* Checklist Sections */}
                        <div className={styles.checklistContainer}>
                            {CHECKLIST_DATA.map((dept) => {
                                const Icon = dept.icon;
                                const isExpanded = expandedSections.has(dept.id);
                                const deptChecked = dept.items.filter(i => checkedItems.has(i.id)).length;

                                return (
                                    <div key={dept.id} className={styles.department}>
                                        <button
                                            className={styles.departmentHeader}
                                            onClick={() => toggleSection(dept.id)}
                                            style={{ '--dept-color': dept.color } as React.CSSProperties}
                                        >
                                            <div className={styles.departmentTitle}>
                                                <div className={styles.departmentIcon}>
                                                    <Icon size={20} />
                                                </div>
                                                <span>{dept.title}</span>
                                                <span className={styles.deptCount}>
                                                    {deptChecked}/{dept.items.length}
                                                </span>
                                            </div>
                                            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                        </button>

                                        {isExpanded && (
                                            <div className={styles.departmentItems}>
                                                {dept.items.map((item) => (
                                                    <label
                                                        key={item.id}
                                                        className={`${styles.checkItem} ${checkedItems.has(item.id) ? styles.checked : ''}`}
                                                    >
                                                        <button
                                                            className={styles.checkbox}
                                                            onClick={() => toggleItem(item.id)}
                                                            aria-pressed={checkedItems.has(item.id)}
                                                        >
                                                            {checkedItems.has(item.id) ? (
                                                                <CheckSquare size={20} />
                                                            ) : (
                                                                <Square size={20} />
                                                            )}
                                                        </button>
                                                        <span className={styles.itemLabel}>{item.label}</span>
                                                        <span className={`${styles.impactBadge} ${styles[item.impact]}`}>
                                                            {item.impact}
                                                        </span>
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTA Section */}
                        <div className={styles.ctaCard}>
                            <div className={styles.ctaPreview}>
                                <div className={styles.ctaStat}>
                                    <Clock size={20} />
                                    <span>Potential Time Saved:</span>
                                    <strong>{calculations.monthlyHours} hrs/month</strong>
                                </div>
                                <div className={styles.ctaStat}>
                                    <DollarSign size={20} />
                                    <span>Yearly Value:</span>
                                    <strong>{formatCurrency(calculations.yearlySavings)}</strong>
                                </div>
                            </div>
                            <button className={styles.ctaButton} onClick={handleGetResults}>
                                <Sparkles size={18} />
                                Get Full Analysis & Action Plan
                                <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Results Section */
                    <div className={styles.resultsContainer}>
                        <div className={styles.resultsHeader}>
                            <h1>Your Automation Analysis</h1>
                            <p>Personalized recommendations based on your checklist</p>
                        </div>

                        {/* Score Card */}
                        <div className={styles.scoreCard}>
                            <div className={styles.scoreCircle} style={{ borderColor: getScoreLabel(calculations.automationScore).color }}>
                                <span className={styles.scoreBig}>{calculations.automationScore}%</span>
                            </div>
                            <h2 style={{ color: getScoreLabel(calculations.automationScore).color }}>
                                {getScoreLabel(calculations.automationScore).label}
                            </h2>
                            <p>You have {calculations.automatedItems} of {calculations.totalItems} automations in place</p>
                        </div>

                        {/* Potential Savings */}
                        <div className={styles.savingsGrid}>
                            <div className={styles.savingsCard}>
                                <Clock size={28} />
                                <span className={styles.savingsValue}>{calculations.monthlyHours} hrs</span>
                                <span className={styles.savingsLabel}>Monthly Hours Available</span>
                            </div>
                            <div className={styles.savingsCard}>
                                <TrendingUp size={28} />
                                <span className={styles.savingsValue}>{calculations.yearlyHours} hrs</span>
                                <span className={styles.savingsLabel}>Yearly Time Savings</span>
                            </div>
                            <div className={styles.savingsCard + ' ' + styles.highlight}>
                                <DollarSign size={28} />
                                <span className={styles.savingsValue}>{formatCurrency(calculations.yearlySavings)}</span>
                                <span className={styles.savingsLabel}>Potential Yearly Savings</span>
                            </div>
                        </div>

                        {/* Priority Automations */}
                        {calculations.highImpactMissing.length > 0 && (
                            <div className={styles.prioritySection}>
                                <h3><Target size={20} /> Top Priority Automations</h3>
                                <p>These high-impact automations are missing from your workflow:</p>
                                <ul className={styles.priorityList}>
                                    {calculations.highImpactMissing.map((item, i) => (
                                        <li key={i}>
                                            <Zap size={16} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* CTA */}
                        <div className={styles.resultsCta}>
                            <Award size={32} />
                            <h3>Ready to Automate?</h3>
                            <p>Get a custom automation implementation plan for your business</p>
                            <a
                                href="https://calendly.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.ctaButtonFinal}
                            >
                                <Sparkles size={18} />
                                Book Free Automation Consult
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
                    source="automation-checklist"
                    title="Get Your Full Analysis"
                    subtitle="See your complete automation scorecard and action plan"
                    ctaText="Show My Results"
                    benefits={[
                        "Complete automation score breakdown",
                        "Hours & cost savings calculation",
                        "Priority implementation list",
                        "Custom action plan PDF"
                    ]}
                />
            </main>
            <Footer />
        </>
    );
}
