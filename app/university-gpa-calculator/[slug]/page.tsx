// app/university-gpa-calculator/[slug]/page.tsx

import type { Metadata } from 'next';
// Update the import to your new filename
import CalculatorUI from './SLIIT-calculator-ui'; 

// This file is the Server Component for handling metadata
export const metadata: Metadata = {
  title: 'SLIIT GPA Calculator | Accurate & Easy to Use',
  description: 'The most accurate SLIIT GPA Calculator. Instantly calculate your GPA based on the official SLIIT grading system (A+, A, A-, etc.) to track your academic performance.',
  keywords: [
    'SLIIT GPA Calculator',
    'SLIIT GPA',
    'SLIIT CGPA Calculator',
    'Calculate SLIIT GPA',
    'Sri Lanka Institute of Information Technology GPA',
  ],
  authors: [{ name: 's4thm1n4' }],
  openGraph: {
    title: 'SLIIT GPA Calculator | Accurate & Easy to Use',
    description: 'Instantly calculate your GPA with the most accurate tool for SLIIT students.',
  },
};

// --- THIS IS THE FIX ---
// We make the PageProps type more complete to match what Next.js expects.
type PageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// This simple page component passes the slug down to the client component.
export default function Page({ params }: PageProps) {
  return <CalculatorUI slug={params.slug} />;
}