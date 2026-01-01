import FooterPage from '@/components/FooterPage';

export function generateStaticParams() {
    return [
        { slug: 'about' },
        { slug: 'careers' },
        { slug: 'contact' },
    ];
}

export default function Page({ params }: { params: { slug: string } }) {
    return <FooterPage slug={params.slug} />;
}
