import type { Config } from '@measured/puck'

// Define component types
export type HeroProps = {
    title: string
    subtitle: string
    buttonText: string
    buttonLink: string
}

export type FeaturesProps = {
    heading: string
    features: Array<{
        title: string
        description: string
        icon: string
    }>
}

export type TextBlockProps = {
    content: string
}

export type CTAProps = {
    heading: string
    description: string
    buttonText: string
    buttonLink: string
}

// Puck configuration
export type Props = {
    Hero: HeroProps
    Features: FeaturesProps
    TextBlock: TextBlockProps
    CTA: CTAProps
}

export const config: Config<Props> = {
    components: {
        Hero: {
            fields: {
                title: { type: 'text' },
                subtitle: { type: 'textarea' },
                buttonText: { type: 'text' },
                buttonLink: { type: 'text' },
            },
            defaultProps: {
                title: 'Welcome to Your Site',
                subtitle: 'Build amazing experiences with visual editing',
                buttonText: 'Get Started',
                buttonLink: '#',
            },
            render: ({ title, subtitle, buttonText, buttonLink }) => (
                <div className="hero-section py-20 px-4 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <h1 className="text-5xl font-bold mb-4">{title}</h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">{subtitle}</p>
                    <a
                        href={buttonLink}
                        className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
                    >
                        {buttonText}
                    </a>
                </div>
            ),
        },
        Features: {
            fields: {
                heading: { type: 'text' },
                features: {
                    type: 'array',
                    arrayFields: {
                        title: { type: 'text' },
                        description: { type: 'textarea' },
                        icon: { type: 'text' },
                    },
                    defaultItemProps: {
                        title: 'Feature Title',
                        description: 'Feature description here',
                        icon: '✨',
                    },
                },
            },
            defaultProps: {
                heading: 'Amazing Features',
                features: [
                    {
                        title: 'Fast',
                        description: 'Lightning-fast performance',
                        icon: '⚡',
                    },
                    {
                        title: 'Secure',
                        description: 'Enterprise-grade security',
                        icon: '🔒',
                    },
                    {
                        title: 'Scalable',
                        description: 'Grows with your business',
                        icon: '📈',
                    },
                ],
            },
            render: ({ heading, features }) => (
                <div className="features-section py-16 px-4">
                    <h2 className="text-4xl font-bold text-center mb-12">{heading}</h2>
                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {features.map((feature, idx) => (
                            <div key={idx} className="text-center p-6 rounded-lg border hover:shadow-lg transition">
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ),
        },
        TextBlock: {
            fields: {
                content: { type: 'textarea' },
            },
            defaultProps: {
                content: 'Add your content here...',
            },
            render: ({ content }) => (
                <div className="text-block py-8 px-4 max-w-4xl mx-auto">
                    <p className="text-lg leading-relaxed">{content}</p>
                </div>
            ),
        },
        CTA: {
            fields: {
                heading: { type: 'text' },
                description: { type: 'textarea' },
                buttonText: { type: 'text' },
                buttonLink: { type: 'text' },
            },
            defaultProps: {
                heading: 'Ready to Get Started?',
                description: 'Join thousands of satisfied customers today',
                buttonText: 'Start Now',
                buttonLink: '#',
            },
            render: ({ heading, description, buttonText, buttonLink }) => (
                <div className="cta-section py-16 px-4 bg-gray-50">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl font-bold mb-4">{heading}</h2>
                        <p className="text-xl text-gray-600 mb-8">{description}</p>
                        <a
                            href={buttonLink}
                            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                        >
                            {buttonText}
                        </a>
                    </div>
                </div>
            ),
        },
    },
}
