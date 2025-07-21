// app/university-gpa-calculator/[slug]/page.tsx

import type { Metadata } from 'next';
import CalculatorUI from './SLIIT-calculator-ui'; // Your client component

// The metadata can be dynamic or static. Let's make it dynamic.
export async function generateMetadata({ params: paramsPromise }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await paramsPromise; // Await the promise here
  const title = `${slug.toUpperCase()} GPA Calculator | Accurate & Easy to Use`;
  const description = `The most accurate ${slug.toUpperCase()} GPA Calculator. Instantly calculate your GPA based on the official Sri Lankan university grading system.`;

  return {
    title,
    description,
    keywords: [`${slug} GPA Calculator`, `${slug} CGPA`, 'GPA calculator Sri Lanka'],
    authors: [{ name: 's4thm1n4' }],
    openGraph: { title, description },
  };
}

// This page now correctly handles the params promise
export default async function Page({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  // We 'await' the promise to get the simple object
  const { slug } = await paramsPromise;

  // We pass the resolved 'slug' string as a simple prop to the client component
  return <CalculatorUI slug={slug} />;
}