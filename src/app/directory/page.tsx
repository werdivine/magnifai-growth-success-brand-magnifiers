import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BentoGrid, BentoItem } from '@/components/BentoGrid';
import styles from './page.module.css';
import { Search } from 'lucide-react';

export default function Directory() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.searchContainer}>
                    <h1 className={styles.heading}>AI Tool Directory</h1>
                    <div className={styles.inputWrapper}>
                        <div className={styles.icon}><Search size={22} /></div>
                        <input
                            type="text"
                            placeholder="Search 5,000+ AI tools..."
                            className={styles.input}
                        />
                    </div>
                </div>

                <BentoGrid>
                    <BentoItem title="Jasper" description="AI Copywriting Assistant" />
                    <BentoItem title="Midjourney" description="Generative Art & Images" />
                    <BentoItem title="Runway" description="Video Magic Tools" />
                    <BentoItem title="Synthesia" description="AI Video Avatars" />
                    <BentoItem title="Otter.ai" description="Meeting Transcription" />
                    <BentoItem title="Beautiful.ai" description="Smart Presentations" />
                    <BentoItem title="Copy.ai" description="Marketing Copy Generator" />
                    <BentoItem title="Descript" description="Audio/Video Editor" />
                    <BentoItem title="Notion AI" description="Workspace Automation" />
                </BentoGrid>
            </main>
            <Footer />
        </>
    )
}
