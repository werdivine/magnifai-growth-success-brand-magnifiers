'use client';
import { useState } from 'react';
import styles from './FAQ.module.css';
import { Plus, Minus } from 'lucide-react';

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqs = [
        { q: "Is the directory free?", a: "Yes, the basic directory is free to browse. We charge for premium tool listings and agency services." },
        { q: "How do you verify tools?", a: "Our team manually tests every submission for 4+ hours before listing." },
        { q: "Can I get a custom agent?", a: "Absolutely. Check out our Agency page to book a consultation for bespoke development." },
        { q: "Do you offer implementation support?", a: "Yes! Our agency team provides full implementation, training, and ongoing optimization for all automation solutions." },
        { q: "What's your typical ROI timeline?", a: "Most clients see measurable efficiency gains within 2-4 weeks. Full ROI typically realized within 90 days." },
        { q: "Can you integrate with our existing tools?", a: "We work with 200+ platforms including CRMs, marketing tools, and custom APIs. If it has an API, we can connect it." },
        { q: "What if I'm not technical?", a: "Perfect! Our solutions are designed for business owners, not developers. We handle all technical implementation." }
    ];

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: 'white' }}>Common Questions</h2>
                {faqs.map((faq, i) => (
                    <div key={i} className={styles.item}>
                        <button className={styles.question} onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                            {faq.q}
                            {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                        </button>
                        <div className={`${styles.answer} ${openIndex === i ? styles.open : ''}`}>
                            {faq.a}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
