// app/university-gpa-calculator/ousl/page.tsx

import type { Metadata } from 'next';
import CalculatorUI from './OUSL-calculator-ui'; // Import the new OUSL UI component

export const metadata: Metadata = {
  title: 'OUSL GPA Calculator - (Open University Of Sri Lanka)',
  description: 'The most accurate Open University (OUSL) GPA Calculator. Instantly calculate your GPA based on the official Sri Lankan university grading system.',
  keywords: ['OUSL GPA Calculator', 'OUSL CGPA', 'GPA calculator Sri Lanka', 'Open University GPA'],
  authors: [{ name: 's4thm1n4' }],
  openGraph: {
    title: 'Open University GPA Calculator - OUSL',
    description: 'The most accurate Open University (OUSL) GPA Calculator. Instantly calculate your GPA based on the official Sri Lankan university grading system.',
  },
  
};

export default function Page() {
  return <CalculatorUI />;
}