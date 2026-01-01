import FooterPage from '@/components/FooterPage';

export function generateStaticParams() {
    return [
        { slug: 'agency' },
        { slug: 'consulting' },
        { slug: 'automation' },
        { slug: 'design' },
    ];
}

export default function Page({ params }: { params: { slug: string } }) {
    return <FooterPage slug={params.slug} />;
}
