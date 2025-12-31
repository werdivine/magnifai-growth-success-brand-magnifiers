import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SEOPage() {
    return (
        <>
            <Header />
            <main style={{ minHeight: '100vh', padding: '8rem 2rem', background: '#020617', color: 'white' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem' }}>Niche Keyword Report</h1>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '2rem' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '1px solid #334155' }}>
                                <th style={{ padding: '1rem' }}>Keyword</th>
                                <th style={{ padding: '1rem' }}>Volume</th>
                                <th style={{ padding: '1rem' }}>KD %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <td style={{ padding: '1rem', color: '#e2e8f0' }}>ai automation agency pricing {i}</td>
                                    <td style={{ padding: '1rem', color: '#94a3b8' }}>{1000 * i}</td>
                                    <td style={{ padding: '1rem', color: '#4ade80', fontWeight: 'bold' }}>{10 + i}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <Footer />
        </>
    );
}
