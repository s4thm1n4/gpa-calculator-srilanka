// app/page.tsx

import Link from 'next/link';
import { universities } from '../lib/universities'; // Import our list from the lib file

export default function HomePage() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-gray-50 p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-800">
          University GPA Calculator Sri Lanka
        </h1>
        <p className="text-xl text-gray-600 mt-4">
          Select your university to get started.
        </p>
      </header>
      
      <div className="w-full max-w-md grid grid-cols-1 gap-4">
        {/* This code maps over our list and creates a link for each university */}
        {universities.map(uni => (
          <Link 
            key={uni.id} 
            href={`/university-gpa-calculator/${uni.id}`}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200"
          >
            <h2 className="text-2xl font-semibold text-blue-700">{uni.name}</h2>
          </Link>
        ))}
      </div>
    </main>
  );
}