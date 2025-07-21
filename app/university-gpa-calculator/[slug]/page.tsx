// app/university-gpa-calculator/[slug]/page.tsx

import type { Metadata } from 'next';
import CalculatorUI from './SLIIT-calculator-ui'; // Import our new client component

// This file is now a Server Component, so we can export metadata.
export const metadata: Metadata = {
  title: 'SLIIT GPA Calculator | Accurate & Easy to Use',
  description: 'The most accurate SLIIT GPA Calculator. Instantly calculate your GPA based on the official SLIIT grading system (A+, A, A-, etc.) to track your academic performance.',
};

type PageProps = {
  params: { slug: string };
};

// This simple page component passes the slug down to the client UI component.
export default function Page({ params }: PageProps) {
  return <CalculatorUI slug={params.slug} />;
}