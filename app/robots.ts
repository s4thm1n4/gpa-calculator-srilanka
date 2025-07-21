// app/robots.ts

import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Example: disallowing a private area
    },
    sitemap: 'https://gpa-calculator-srilanka.vercel.app/sitemap.xml', // Change to your final domain
  }
}