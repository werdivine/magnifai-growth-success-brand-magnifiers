import styles from './TrustedBy.module.css';

interface TrustedByProps {
    title?: string;
    companies?: { name: string }[];
}

export default function TrustedBy({ title, companies }: TrustedByProps) {
    const defaultLogos = [
        "TechCorp", "DataFlow", "AI Ventures", "Nebula Systems",
        "Vertex", "DeepMindz", "SynthLabs", "Quantum AI"
    ];

    // If companies provided from Puck, extract names, otherwise use default
    const displayLogos = companies?.map(c => c.name) || defaultLogos;
    const displayTitle = title || "Trusted by teams automating the future";

    return (
        <section className={styles.section}>
            <h4 className={styles.title}>{displayTitle}</h4>
            <div className={styles.scroller}>
                {[...displayLogos, ...displayLogos, ...displayLogos].map((logo, i) => (
                    <div key={i} className={styles.logo}>{logo}</div>
                ))}
            </div>
        </section>
    );
}
