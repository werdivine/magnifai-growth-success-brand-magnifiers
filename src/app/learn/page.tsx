import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';
import Link from 'next/link';
import { BookOpen, PenTool, Calculator, FileText, ArrowRight, Brain, Zap } from 'lucide-react';

export default function ResourceLibrary() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.header}>
                    <h1 className={styles.title}>The Growth Library</h1>
                    <p className={styles.subtitle}>Curated frameworks, tools, and guides to help you deploy AI without the hype.</p>
                </div>

                <div className={styles.grid}>
                    {/* PILLAR 1 */}
                    <div className={styles.card}>
                        <span className={`${styles.cardTag} ${styles.tagGuide}`}>Pillar Guide</span>
                        <div className={styles.cardIcon}><BookOpen size={24} /></div>
                        <h3 className={styles.cardTitle}>AI Implementation Roadmap</h3>
                        <p className={styles.cardDesc}>The exact 4-phase framework we use to take companies from &quot;zero&quot; to &quot;AI-powered&quot; in 90 days.</p>
                        <Link href="/resources/ai-implementation-guide" className={styles.cardLink}>
                            Read Guide <ArrowRight size={18} />
                        </Link>
                    </div>

                    {/* TOOL 1 */}
                    <div className={styles.card}>
                        <span className={`${styles.cardTag} ${styles.tagTool}`}>Interactive Tool</span>
                        <div className={styles.cardIcon}><Brain size={24} /></div>
                        <h3 className={styles.cardTitle}>AI Readiness Assessment</h3>
                        <p className={styles.cardDesc}>Is your business actually ready for AI? Take this 12-question quiz to find your maturity score.</p>
                        <Link href="/tools/readiness-quiz" className={styles.cardLink}>
                            Take Quiz <ArrowRight size={18} />
                        </Link>
                    </div>

                    {/* TOOL 2 */}
                    <div className={styles.card}>
                        <span className={`${styles.cardTag} ${styles.tagTool}`}>Calculator</span>
                        <div className={styles.cardIcon}><Calculator size={24} /></div>
                        <h3 className={styles.cardTitle}>Automation ROI Calculator</h3>
                        <p className={styles.cardDesc}>Stop guessing. Calculate exactly how much manual tasks are costing your bottom line.</p>
                        <Link href="/#roi-calculator" className={styles.cardLink}>
                            Calculate Savings <ArrowRight size={18} />
                        </Link>
                    </div>

                    {/* PILLAR 2 (Placeholder) */}
                    <div className={styles.card}>
                        <span className={`${styles.cardTag} ${styles.tagGuide}`}>Playbook</span>
                        <div className={styles.cardIcon}><Zap size={24} /></div>
                        <h3 className={styles.cardTitle}>Automation Workflows</h3>
                        <p className={styles.cardDesc}>100+ copy-paste workflow blueprints for Marketing, Sales, and Ops. (Zapier & Make compatible).</p>
                        <span style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 'auto' }}>Coming Soon</span>
                    </div>

                    {/* TEMPLATE (Placeholder) */}
                    <div className={styles.card}>
                        <span className={`${styles.cardTag} ${styles.tagTemplate}`}>Template</span>
                        <div className={styles.cardIcon}><FileText size={24} /></div>
                        <h3 className={styles.cardTitle}>Prompts Library</h3>
                        <p className={styles.cardDesc}>The top 50 prompts we use for content creation, coding, and strategy.</p>
                        <span style={{ color: '#64748b', fontSize: '0.9rem', marginTop: 'auto' }}>Coming Soon</span>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
