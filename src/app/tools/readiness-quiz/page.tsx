'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GatedAccess from '@/components/GatedAccess';
import styles from './page.module.css';
import { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, ClipboardList } from 'lucide-react';

const QUESTIONS = [
    {
        id: 1,
        text: "How do you currently handle repetitive tasks (e.g., data entry, email follow-ups)?",
        options: [
            { text: "We do them manually.", score: 0 },
            { text: "We outsource them to VAs/Contractors.", score: 5 },
            { text: "We have some basic automations (Zapier).", score: 10 },
            { text: "We use custom AI agents/scripts.", score: 20 }
        ]
    },
    {
        id: 2,
        text: "Where is your company data stored?",
        options: [
            { text: "Scattered across spreadsheets and emails.", score: 0 },
            { text: "Central drive (Google/OneDrive) but disorganized.", score: 5 },
            { text: "In structured databases/CRMs (Salesforce, Hubspot).", score: 10 },
            { text: "Centralized Data Warehouse with API access.", score: 20 }
        ]
    },
    {
        id: 3,
        text: "What is your primary goal with AI?",
        options: [
            { text: "Just curious / Don't want to miss out.", score: 0 },
            { text: "Save time on content creation.", score: 5 },
            { text: "Reduce operational costs.", score: 10 },
            { text: "Scale revenue without hiring.", score: 20 }
        ]
    },
    {
        id: 4,
        text: "Do you have a dedicated technical person on your team?",
        options: [
            { text: "No, we are non-technical.", score: 0 },
            { text: "We have a freelancer on call.", score: 5 },
            { text: "Yes, we have an IT/Ops person.", score: 10 },
            { text: "Yes, we have a developer/engineer.", score: 20 }
        ]
    },
    {
        id: 5,
        text: "What is your budget for AI implementation?",
        options: [
            { text: "$0 - looking for free tools.", score: 0 },
            { text: "$100-$500/month.", score: 5 },
            { text: "$500-$5k/month.", score: 10 },
            { text: "$5k+/month.", score: 20 }
        ]
    }
];

export default function ReadinessQuiz() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<number[]>(new Array(QUESTIONS.length).fill(-1));
    const [isFinished, setIsFinished] = useState(false);
    const [isGatedOpen, setIsGatedOpen] = useState(false);
    const [showResults, setShowResults] = useState(false);

    const handleOptionClick = (score: number) => {
        const newAnswers = [...answers];
        newAnswers[currentStep] = score;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentStep < QUESTIONS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsFinished(true);
            setIsGatedOpen(true);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const calculateScore = () => {
        return answers.reduce((a, b) => a + b, 0);
    };

    const getResult = (score: number) => {
        if (score < 30) return { level: "Explorer", desc: "You're just starting. Focus on free tools (ChatGPT, Claude) and basic SOP documentation before automating." };
        if (score < 60) return { level: "Adopter", desc: "You're ready for 'Low-Code' automation. Tools like Zapier and Make.com will give you huge ROI immediately." };
        return { level: "Innovator", desc: "You're ready for Custom Agents. You have the data and infrastructure to build proprietary AI tools." };
    };

    const totalScore = calculateScore();
    const result = getResult(totalScore);
    const progress = ((currentStep + 1) / QUESTIONS.length) * 100;

    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.container}>
                    {!showResults ? (
                        <>
                            <div className={styles.header}>
                                <h1 className={styles.title}>AI Readiness Assessment</h1>
                                <p className={styles.subtitle}>Discover your AI Maturity Score and get a personalized roadmap.</p>
                            </div>

                            <div className={styles.card}>
                                <div className={styles.progressBar}>
                                    <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
                                </div>

                                <div className={styles.question}>
                                    <h2 className={styles.questionText}>{QUESTIONS[currentStep].text}</h2>
                                    <div className={styles.options}>
                                        {QUESTIONS[currentStep].options.map((option, idx) => (
                                            <button
                                                key={idx}
                                                className={`${styles.optionBtn} ${answers[currentStep] === option.score ? styles.selected : ''}`}
                                                onClick={() => handleOptionClick(option.score)}
                                            >
                                                {option.text}
                                                {answers[currentStep] === option.score && <Check size={20} />}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.actions}>
                                    <button
                                        className={`${styles.navBtn} ${styles.prevBtn}`}
                                        onClick={handlePrev}
                                        disabled={currentStep === 0}
                                    >
                                        <ChevronLeft size={20} style={{ display: 'inline', verticalAlign: 'middle' }} /> Previous
                                    </button>
                                    <button
                                        className={`${styles.navBtn} ${styles.nextBtn}`}
                                        onClick={handleNext}
                                        disabled={answers[currentStep] === -1}
                                    >
                                        {currentStep === QUESTIONS.length - 1 ? 'Get My Score' : 'Next'} <ChevronRight size={20} style={{ display: 'inline', verticalAlign: 'middle' }} />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className={styles.results}>
                            <div className={styles.card}>
                                <h2 className={styles.title}>Your AI Maturity Score</h2>
                                <div className={styles.scoreCircle}>
                                    <span className={styles.scoreValue}>{totalScore}</span>
                                    <span className={styles.scoreLabel}>/ 100</span>
                                </div>

                                <h3>Level: {result.level}</h3>

                                <p className={styles.recommendation}>
                                    {result.desc}
                                </p>

                                <button className={styles.ctaBtn} onClick={() => window.location.href = '/resources/ai-implementation-guide'}>
                                    <ClipboardList size={20} style={{ marginRight: 8 }} />
                                    View Recommended Roadmap
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />

            <GatedAccess
                isOpen={isGatedOpen}
                onClose={() => setIsGatedOpen(false)}
                onUnlock={(email) => {
                    setIsGatedOpen(false);
                    setShowResults(true);
                }}
                resourceName="Readiness Score"
                title="Unlock Your Strategy"
            />
        </>
    );
}
