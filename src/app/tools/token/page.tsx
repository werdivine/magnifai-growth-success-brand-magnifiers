import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TokenPage() {
    return (
        <>
            <Header />
            <main style={{ minHeight: '100vh', padding: '8rem 2rem', background: '#020617', color: 'white' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem' }}>Advanced Token Analytics</h1>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '1rem' }}>
                            <h3>GPT-4o</h3>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6366f1' }}>$35.00</div>
                            <p style={{ color: '#94a3b8' }}>per 1M tokens</p>
                        </div>
                        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '1rem' }}>
                            <h3>Claude 3.5</h3>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ec4899' }}>$3.00</div>
                            <p style={{ color: '#94a3b8' }}>per 1M tokens</p>
                        </div>
                        <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '1rem' }}>
                            <h3>Llama 3</h3>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>$0.15</div>
                            <p style={{ color: '#94a3b8' }}>Self-hosted est.</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
