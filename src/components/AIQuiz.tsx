'use client';

import { useState } from 'react';
import Section from './Section';
import styles from './AIQuiz.module.css';
import clsx from 'clsx';

const QUESTIONS = [
    {
        question: 'How many hours per week does your team spend on repetitive tasks?',
        options: ['Less than 5 hours', '5-15 hours', '15-30 hours', 'More than 30 hours'],
        scores: [1, 2, 3, 4],
    },
    {
        question: 'Are you currently using any AI tools in your business?',
        options: ['No, not yet', 'Just ChatGPT for basics', 'A few integrated tools', 'Comprehensive AI stack'],
        scores: [4, 3, 2, 1],
    },
    {
        question: 'What is your biggest operational bottleneck?',
        options: ['Content creation', 'Lead generation', 'Customer support', 'Data analysis'],
        scores: [3, 3, 3, 3],
    },
    {
        question: 'How would you rate your team&apos;s AI/automation literacy?',
        options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
        scores: [4, 3, 2, 1],
    },
    {
        question: 'What is your monthly budget for tools and automation?',
        options: ['Under $500', '$500-$2,000', '$2,000-$10,000', 'Over $10,000'],
        scores: [1, 2, 3, 4],
    },
];

export default function AIQuiz() {
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState<number[]>([]);
    const [email, setEmail] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleAnswer = (optionIndex: number) => {
        const newAnswers = [...answers, QUESTIONS[currentQ].scores[optionIndex]];
        setAnswers(newAnswers);

        if (currentQ < QUESTIONS.length - 1) {
            setCurrentQ(currentQ + 1);
        } else {
            setShowResult(true);
        }
    };

    const calculateScore = () => {
        const total = answers.reduce((a, b) => a + b, 0);
        const max = QUESTIONS.length * 4;
        return Math.round((total / max) * 100);
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return 'AI Leader';
        if (score >= 60) return 'AI Ready';
        if (score >= 40) return 'AI Curious';
        return 'AI Beginner';
    };

    const getScoreDescription = (score: number) => {
        if (score >= 80) return 'You&apos;re ahead of 90% of businesses. Let&apos;s accelerate your advantage.';
        if (score >= 60) return 'Great foundation! Small optimizations can yield big results.';
        if (score >= 40) return 'Significant opportunity awaits. AI could transform your operations.';
        return 'Perfect timing to start. We can help you leapfrog the competition.';
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            console.log('Quiz lead:', { email, score: calculateScore(), answers });
            setSubmitted(true);
        }
    };

    const progress = ((currentQ + (showResult ? 1 : 0)) / QUESTIONS.length) * 100;

    return (
        <Section theme="dark" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.eyebrow}>Free Assessment</span>
                    <h2 className={styles.title}>AI Readiness Quiz</h2>
                    <p className={styles.subtitle}>Discover your automation potential in 60 seconds</p>
                </div>

                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                </div>

                {!showResult ? (
                    <div className={styles.question}>
                        <p className={styles.questionText}>
                            {currentQ + 1}. {QUESTIONS[currentQ].question}
                        </p>
                        <div className={styles.options}>
                            {QUESTIONS[currentQ].options.map((option, i) => (
                                <button
                                    key={i}
                                    className={styles.option}
                                    onClick={() => handleAnswer(i)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className={styles.result}>
                        <div className={styles.scoreCircle}>
                            <span className={styles.scoreNumber}>{calculateScore()}</span>
                        </div>
                        <h3 className={styles.scoreLabel}>{getScoreLabel(calculateScore())}</h3>
                        <p className={styles.scoreDescription}>{getScoreDescription(calculateScore())}</p>

                        {!submitted ? (
                            <div className={styles.emailGate}>
                                <p>Enter your email to get your personalized AI roadmap:</p>
                                <form onSubmit={handleEmailSubmit} className={styles.emailForm}>
                                    <input
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={styles.emailInput}
                                        required
                                    />
                                    <button type="submit" className={styles.submitBtn}>
                                        Get My Roadmap
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className={styles.emailGate}>
                                <p style={{ color: '#10b981' }}>✓ Check your inbox for your personalized AI roadmap!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Section>
    );
}
