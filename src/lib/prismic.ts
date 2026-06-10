import * as prismic from '@prismicio/client'
import * as prismicNext from '@prismicio/next'

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || 'wemagnifai-growth-seo-brand-marketing'

/**
 * Creates a Prismic client for the project's repository.
 *
 * @param config - Configuration for the Prismic client.
 * @returns A Prismic client instance.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    routes: [
      {
        type: 'homepage',
        path: '/',
      },
      {
        type: 'page',
        path: '/:uid',
      },
      {
        type: 'blog_post',
        path: '/blog/:uid',
      },
    ],
    ...config,
  })

  return client
}
