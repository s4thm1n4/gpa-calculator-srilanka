// app/university-gpa-calculator/[slug]/page.tsx

'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// SLIIT Grade Scale
const sliitGradeScale = [
  { grade: "A+", gpa: 4.0 }, { grade: "A", gpa: 4.0 },
  { grade: "A-", gpa: 3.7 }, { grade: "B+", gpa: 3.3 },
  { grade: "B", gpa: 3.0 }, { grade: "B-", gpa: 2.7 },
  { grade: "C+", gpa: 2.3 }, { grade: "C", gpa: 2.0 },
  { grade: "C-", gpa: 1.7 }, { grade: "D+", gpa: 1.3 },
  { grade: "D", gpa: 1.0 }, { grade: "E", gpa: 0.0 },
];

// This defines the structure for a single course row
type Course = {
  id: number;
  name: string;
  credits: number;
  grade: string;
};

export default function CalculatorPage({ params }: { params: { slug: string } }) {
  // State to hold the list of courses
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: 'Introduction to Programming', credits: 4, grade: 'A+' }
  ]);

  // All the functions (addCourseRow, updateCourse, removeCourseRow) remain exactly the same.
  const addCourseRow = () => {
    setCourses([...courses, { id: Date.now(), name: '', credits: 3, grade: 'A+' }]);
  };

  const updateCourse = (id: number, field: keyof Omit<Course, 'id'>, value: string | number) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };
    
  const removeCourseRow = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  // The GPA calculation logic also remains exactly the same.
  const calculatedGpa = useMemo(() => {
    const gradeMap = new Map(sliitGradeScale.map(item => [item.grade, item.gpa]));
    const totalPoints = courses.reduce((acc, course) => {
      const point = gradeMap.get(course.grade) || 0;
      return acc + (point * course.credits);
    }, 0);
    const totalCredits = courses.reduce((acc, course) => acc + Number(course.credits), 0);
    if (totalCredits === 0) return 0;
    return (totalPoints / totalCredits);
  }, [courses]);

  return (
    <main className="p-4 sm:p-8 min-h-screen bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-400 uppercase">
            {params.slug} GPA Calculator
          </h1>
          <Link href="/" className="text-blue-400 hover:underline mt-2 inline-block">
            &larr; Back to all universities
          </Link>
        </header>

        {/* --- NEW: Calculator Form Area with Vertical Card Layout --- */}
        <div className="space-y-6">
          {/* We now map over the courses to create a responsive grid of cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-gray-800/70 p-4 rounded-lg shadow-lg relative">
                {/* Remove button positioned at the top-right of the card */}
                <button onClick={() => removeCourseRow(course.id)} 
                  className="absolute top-2 right-2 text-gray-500 hover:text-red-400 font-bold text-2xl transition-colors">
                  &times;
                </button>
                
                {/* Module Name - stacked vertically */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Module Name</label>
                  <input type="text" placeholder="E.g., Database Management" value={course.name}
                    onChange={e => updateCourse(course.id, 'name', e.target.value)}
                    className="w-full bg-gray-700 p-2 rounded-md" />
                </div>

                {/* Credits and Grade - side-by-side in their own grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Credits</label>
                    <input type="number" value={course.credits}
                      onChange={e => updateCourse(course.id, 'credits', parseInt(e.target.value) || 0)}
                      className="w-full bg-gray-700 p-2 rounded-md text-center" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Grade</label>
                    <select value={course.grade} onChange={e => updateCourse(course.id, 'grade', e.target.value)}
                      className="w-full bg-gray-700 p-2 rounded-md appearance-none text-center">
                        {sliitGradeScale.map(g => <option key={g.grade} value={g.grade}>{g.grade}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Module Button */}
          <div className="text-center">
            <button onClick={addCourseRow} className="mt-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg transition-transform hover:scale-105">
              + Add Module
            </button>
          </div>
        </div>
        {/* --- END of new form area --- */}


        {/* Results Section (No changes here) */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-lg text-center">
          <h3 className="text-lg text-gray-300">Your Cumulative GPA is</h3>
          <p className="text-6xl font-bold mt-2 text-green-300">
            {calculatedGpa.toFixed(4)}
          </p>
          <p className={`mt-2 text-lg font-semibold ${calculatedGpa >= 2.0 ? 'text-green-400' : 'text-red-400'}`}>
            {calculatedGpa >= 2.0 ? 'Status: Pass' : 'Status: Below Passing Grade'}
          </p>
          <p className="text-xs text-gray-500 mt-1">(A &apos;C&apos; grade / 2.00 GPA is required to pass)</p>        </div>
      </div>
    </main>
  );
}