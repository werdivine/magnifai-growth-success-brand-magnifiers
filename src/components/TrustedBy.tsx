import styles from './TrustedBy.module.css';

export default function TrustedBy() {
    const logos = [
        "TechCorp", "DataFlow", "AI Ventures", "Nebula Systems",
        "Vertex", "DeepMindz", "SynthLabs", "Quantum AI"
    ];

    return (
        <section className={styles.section}>
            <h4 className={styles.title}>Trusted by teams automating the future</h4>
            <div className={styles.scroller}>
                {[...logos, ...logos, ...logos].map((logo, i) => (
                    <div key={i} className={styles.logo}>{logo}</div>
                ))}
            </div>
        </section>
    );
}
