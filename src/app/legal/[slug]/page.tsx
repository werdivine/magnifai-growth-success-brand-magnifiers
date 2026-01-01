import FooterPage from '@/components/FooterPage';

export function generateStaticParams() {
    return [
        { slug: 'privacy' },
        { slug: 'terms' },
        { slug: 'cookies' },
        { slug: 'security' },
    ];
}

export default function Page({ params }: { params: { slug: string } }) {
    return <FooterPage slug={params.slug} />;
}
