import Link from 'next/link';

export default function NotFound() {
    return (
        <div style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'black',
            color: 'white'
        }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Page Not Found</h2>
            <Link href="/" style={{
                padding: '0.75rem 1.5rem',
                background: 'white',
                color: 'black',
                borderRadius: '999px',
                textDecoration: 'none',
                fontWeight: 'bold'
            }}>
                Return Home
            </Link>
        </div>
    )
}
