import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ROIPage() {
    return (
        <>
            <Header />
            <main style={{ minHeight: '100vh', padding: '8rem 2rem', background: '#020617', color: 'white' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem' }}>ROI Analysis Report</h1>
                    <div style={{ padding: '2rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '2rem' }}>
                            Based on your inputs, here is your detailed breakdown of potential savings through AI automation.
                        </p>
                        {/* Mock Chart Area */}
                        <div style={{ height: '300px', background: 'rgba(0,0,0,0.3)', borderRadius: '0.5rem', display: 'flex', alignItems: 'end', justifyContent: 'space-around', padding: '1rem' }}>
                            <div style={{ width: '40px', height: '40%', background: '#6366f1', borderRadius: '4px' }}></div>
                            <div style={{ width: '40px', height: '60%', background: '#8b5cf6', borderRadius: '4px' }}></div>
                            <div style={{ width: '40px', height: '80%', background: '#ec4899', borderRadius: '4px' }}></div>
                            <div style={{ width: '40px', height: '95%', background: '#10b981', borderRadius: '4px' }}></div>
                        </div>
                        <p style={{ marginTop: '2rem', textAlign: 'center', color: '#cbd5e1' }}>
                            Year 1 Savings Projection: <strong>$124,000</strong>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
