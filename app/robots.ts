// app/robots.ts

import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // This rule applies to all crawlers
      allow: '/',      // This allows them to crawl everything on your site
    },
  }
}