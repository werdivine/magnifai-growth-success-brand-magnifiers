import { MetadataRoute } from 'next'
import { POPULAR_NICHES, POPULAR_CITIES } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wemagnifai.com'
  
  const routes = [
    '',
    '/leads',
    '/tools/lead-finder',
    '/contact',
    '/agency',
    '/pricing',
    '/services/seo',
    '/services/aeo',
    '/services/geo',
    '/services/brand-strategy',
    '/services/development',
    '/services/ai-automation',
    '/services/creative',
    '/lead-magnets/seo-audit-checklist',
    '/lead-magnets/aeo-visibility-score',
    '/lead-magnets/geo-quick-check',
    '/lead-magnets/search-everywhere-audit',
    '/lead-magnets/ai-prompt-library',
    '/tools/website-audit',
    '/tools/seo-audit',
    '/tools/aeo-audit',
    '/tools/geo-audit',
    '/tools/roi',
    '/compare',
    '/telegram-growth',
    '/growth-stack',
    '/prompts',
    '/directory',
    '/resources',
    '/playbooks',
    '/blog',
    '/case-studies',
    '/glossary',
    '/whatsapp-calculator',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1,
  }))

  const leadRoutes: MetadataRoute.Sitemap = []
  
  for (const niche of POPULAR_NICHES.slice(0, 5)) {
    for (const city of POPULAR_CITIES.slice(0, 10)) {
        leadRoutes.push({
            url: `${baseUrl}/leads/${encodeURIComponent(niche)}/${encodeURIComponent(city)}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })
    }
  }

  return [...routes, ...leadRoutes]
}