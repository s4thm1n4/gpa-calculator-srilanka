import { MetadataRoute } from 'next'

// University data for generating dynamic pages
const universities = [
  { name: "SLIIT", slug: "sliit", status: "available" },
  { name: "University of Colombo", slug: "university-of-colombo", status: "coming-soon" },
  { name: "University of Moratuwa", slug: "university-of-moratuwa", status: "coming-soon" },
  { name: "University of Peradeniya", slug: "university-of-peradeniya", status: "coming-soon" },
  { name: "NSBM", slug: "nsbm", status: "coming-soon" },
  { name: "IIT", slug: "iit", status: "coming-soon" }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = 'https://www.gpacalculatorsrilanka.com'; // Updated domain

  // Generate sitemap entries for available university calculators
  const universityPages = universities
    .filter(university => university.status === 'available')
    .map(university => ({
      url: `${siteUrl}/university-gpa-calculator/${university.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as 'monthly',
      priority: 0.9,
    }));

  // List of static pages
  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly' as 'yearly',
      priority: 1,
    },
    {
      url: `${siteUrl}/generic-gpa-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as 'monthly',
      priority: 0.8,
    }
  ];

  return [
    ...staticPages,
    ...universityPages
  ];
}