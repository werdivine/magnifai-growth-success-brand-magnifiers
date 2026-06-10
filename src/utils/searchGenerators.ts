export const generateSearchQueries = (niche: string, city: string) => {
    const n = niche.trim();
    const c = city.trim();

    return [
        {
            id: 'google_maps',
            platform: 'Google Maps',
            label: 'Local Business Sourcing',
            category: 'local',
            description: 'Find physical businesses with high-intent for digital services.',
            url: `https://www.google.com/maps/search/${n}+in+${c}`,
            icon: 'MapPin',
            strength: 'High'
        },
        {
            id: 'linkedin_decision_makers',
            platform: 'LinkedIn Professional',
            label: 'Decision Maker Infiltration',
            category: 'professional',
            description: 'Laser-target Owners, Founders, and CEOs specifically in the niche.',
            url: `https://www.google.com/search?q=site:linkedin.com/in/+"Owner"+OR+"Founder"+OR+"CEO"+"${n}"+"${c}"`,
            icon: 'Linkedin',
            strength: 'Maximum'
        },
        {
            id: 'email_harvest',
            platform: 'Direct Outreach',
            label: 'Email Discovery Protocol',
            category: 'direct',
            description: 'Find public email addresses on niche-specific contact pages.',
            url: `https://www.google.com/search?q=site:*.com+"${n}"+"${c}"+(email|contact|@gmail.com|@hotmail.com)`,
            icon: 'Mail',
            strength: 'Medium'
        },
        {
            id: 'instagram_influencers',
            platform: 'Social Intelligence',
            label: 'Social Presence Scan',
            category: 'social',
            description: 'Identify the niche leaders on Instagram for DM outreach.',
            url: `https://www.google.com/search?q=site:instagram.com+"${n}"+"${c}"+"DM for Collab"`,
            icon: 'Instagram',
            strength: 'High'
        },
        {
            id: 'twitter_x_intel',
            platform: 'X (Twitter)',
            label: 'Growth Mindset Sourcing',
            category: 'social',
            description: 'Find tech-forward business owners active on X.',
            url: `https://www.google.com/search?q=site:x.com+"${n}"+"${c}"`,
            icon: 'Twitter',
            strength: 'Low'
        },
        {
            id: 'legal_biz_records',
            platform: 'Business Records',
            label: 'Verified Entity Search',
            category: 'legal',
            description: 'Confirm business legitimacy via official record indexes.',
            url: `https://www.google.com/search?q=intitle:"index of"+legal+records+"${n}"+"${c}"`,
            icon: 'FileText',
            strength: 'High'
        }
    ];
};
