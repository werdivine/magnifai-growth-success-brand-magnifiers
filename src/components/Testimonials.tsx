import styles from './Testimonials.module.css';

export default function Testimonials() {
    const reviews = [
        { text: "The ROI calculator alone saved us 40 hours of implementation time. The gated content is gold.", name: "Sarah Jenkins", role: "CTO at TechFlow" },
        { text: "WeMagnifAI is the only agency I trust. Their 'Agency Grade' results are a game changer.", name: "Mike Ross", role: "Founder, ScaleAI" },
        { text: "Detailed breakdowns and actual code snippets in the paid reports. Worth every penny.", name: "Elena K.", role: "Lead Engineer" },
    ];

    return (
        <section className={styles.section}>
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem', color: 'white' }}>Success Stories</h2>
            <div className={styles.scroller}>
                {reviews.map((r, i) => (
                    <div key={i} className={styles.card}>
                        <p className={styles.text}>&ldquo;{r.text}&rdquo;</p>
                        <div className={styles.author}>
                            <div className={styles.avatar}></div>
                            <div>
                                <span className={styles.name}>{r.name}</span>
                                <span className={styles.role}>{r.role}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
