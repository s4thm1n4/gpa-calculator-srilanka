import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const siteUrl = 'https://www.gpacalculatorsrilanka.com'; // Updated domain

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // You can add pages to block from crawlers here if needed
      // disallow: '/private/', 
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}