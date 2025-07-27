'use client';

import { useState, useMemo, FC } from 'react';
import Link from 'next/link';

// Generic Grade Scale
const genericGradeScale = [
  { grade: "A+", gpa: 4.0, range: "90-100" },
  { grade: "A", gpa: 4.0, range: "80-89" },
  { grade: "A-", gpa: 3.7, range: "75-79" },
  { grade: "B+", gpa: 3.3, range: "70-74" },
  { grade: "B", gpa: 3.0, range: "65-69" },
  { grade: "B-", gpa: 2.7, range: "60-64" },
  { grade: "C+", gpa: 2.3, range: "55-59" },
  { grade: "C", gpa: 2.0, range: "50-54" },
  { grade: "C-", gpa: 1.7, range: "45-49" },
  { grade: "D", gpa: 1.0, range: "40-44" },
  { grade: "E", gpa: 0.0, range: "0-39" },
];

type Course = {
  id: number;
  name: string;
  credits: number;
  grade: string;
};

// Circular Progress Component
const CircularGPAMeter: FC<{ gpa: number; size?: number }> = ({ gpa, size = 140 }) => {
    const radius = (size - 20) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = (gpa / 4.0) * 100;

    const getGpaColor = (gpa: number) => {
        if (gpa >= 3.7) return '#10b981';
        if (gpa >= 3.0) return '#06b6d4';
        if (gpa >= 2.0) return '#f59e0b';
        return '#ef4444';
    };

    const getGpaGradient = (gpa: number) => {
        if (gpa >= 3.7) return 'from-emerald-400 to-green-500';
        if (gpa >= 3.0) return 'from-cyan-400 to-blue-500';
        if (gpa >= 2.0) return 'from-amber-400 to-orange-500';
        return 'from-rose-400 to-red-500';
    };

    return (
        <div className="relative flex items-center justify-center">
            <svg width={size} height={size} className="transform -rotate-90">
                <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth="10" fill="none" />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={getGpaColor(gpa)}
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: circumference - (progress / 100) * circumference,
                        transition: 'stroke-dashoffset 0.5s ease-out',
                    }}
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
                <span className={`text-3xl font-bold bg-gradient-to-r ${getGpaGradient(gpa)} bg-clip-text text-transparent`}>
                    {gpa.toFixed(2)}
                </span>
                <span className="text-sm text-slate-500">GPA</span>
            </div>
        </div>
    );
};


const CalculatorUI: FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', credits: 3, grade: 'A+' }
  ]);

  const addCourseRow = () => {
    setCourses([...courses, { id: Date.now(), name: '', credits: 3, grade: 'A+' }]);
  };

  const updateCourse = (id: number, field: keyof Omit<Course, 'id'>, value: string | number) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const removeCourseRow = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const calculatedGpa = useMemo(() => {
    const gradeMap = new Map(genericGradeScale.map(item => [item.grade, item.gpa]));
    const totalPoints = courses.reduce((acc, c) => acc + ((gradeMap.get(c.grade) || 0) * c.credits), 0);
    const totalCredits = courses.reduce((acc, c) => acc + Number(c.credits), 0);
    return totalCredits === 0 ? 0 : Number((totalPoints / totalCredits).toFixed(2));
  }, [courses]);

  const totalCredits = courses.reduce((acc, c) => acc + Number(c.credits), 0);
    const namedCourses = courses.filter(c => c.name.trim() !== '');


  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wide drop-shadow-lg">
            OUSL GPA Calculator
          </h1>
          <p className="text-cyan-100 text-lg mt-2 font-medium">
            Open University of Sri Lanka
          </p>
          <Link href="/" className="inline-block mt-4 px-6 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-all backdrop-blur-md border border-white/30">
            ← Back to all universities
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
              <div className="bg-gradient-to-r from-slate-800 to-blue-900 p-6 text-white">
                <h2 className="text-3xl font-bold">OUSL GPA Calculator</h2>
                <p className="text-slate-300 mt-1">Calculate your GPA for the Open University of Sri Lanka.</p>
              </div>

              <div className="p-6 text-slate-800">
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <table className="min-w-full w-full text-sm text-slate-800 border-collapse">
                      <thead>
                        <tr className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                          <th className="text-left py-3 pl-6 rounded-l-lg font-semibold">Module Name</th>
                          <th className="w-24 text-center py-3 font-semibold">Credits</th>
                          <th className="w-28 text-center py-3 font-semibold">Grade</th>
                          <th className="w-16 text-center py-3 pr-6 rounded-r-lg font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {courses.map((course, index) => (
                          <tr key={course.id} className="hover:bg-blue-50 transition-colors duration-200">
                            <td className="py-4 pl-6 pr-4">
                              <input
                                type="text"
                                placeholder={`Enter module ${index + 1} name`}
                                value={course.name}
                                onChange={e => updateCourse(course.id, 'name', e.target.value)}
                                className="w-full rounded-lg border-2 px-4 py-2 transition-all duration-200 bg-white border-slate-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20"
                              />
                            </td>
                            <td className="py-4 text-center">
                              <select
                                value={course.credits}
                                onChange={e => updateCourse(course.id, 'credits', Number(e.target.value))}
                                className="w-20 rounded-lg border-2 px-2 py-2 text-center transition-all duration-200 bg-white border-slate-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20"
                              >
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 16].map(n => (
                                  <option key={n} value={n}>{n}</option>
                                ))}
                              </select>
                            </td>
                            <td className="py-4 text-center">
                              <select
                                value={course.grade}
                                onChange={e => updateCourse(course.id, 'grade', e.target.value)}
                                className="w-24 rounded-lg border-2 px-2 py-2 text-center bg-white border-slate-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 transition-all duration-200"
                              >
                                {genericGradeScale.map(g => (
                                  <option key={g.grade} value={g.grade}>{g.grade}</option>
                                ))}
                              </select>
                            </td>
                            <td className="py-4 pr-6 text-center">
                              <button
                                onClick={() => removeCourseRow(course.id)}
                                aria-label="Remove course"
                                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 text-red-500 hover:bg-red-100 hover:text-red-600"
                              >
                                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                  <circle cx="9" cy="9" r="8"></circle>
                                  <path d="M6 9h6"></path>
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  <div className="mt-6 flex justify-center">
                      <button
                        onClick={addCourseRow}
                        className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 font-medium shadow-lg shadow-cyan-500/25 hover:scale-105"
                      >
                        <span className="text-xl">+</span>
                        <span>Add Module</span>
                      </button>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200 mt-8">
                    <h3 className="text-xl font-bold text-slate-700 text-center mb-4">Your Results</h3>
                    <div className="flex justify-center">
                        <CircularGPAMeter gpa={calculatedGpa} />
                    </div>
                     <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                            <div className="text-2xl font-bold text-blue-600">{namedCourses.length}</div>
                            <div className="text-sm text-slate-600">Modules</div>
                        </div>
                         <div className="text-center p-4 bg-white rounded-xl border border-slate-200">
                            <div className="text-2xl font-bold text-green-600">{totalCredits}</div>
                            <div className="text-sm text-slate-600">Credits</div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100 lg:sticky lg:top-6">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                <h2 className="text-xl font-bold">Official OUSL Scale</h2>
                <p className="text-indigo-100 text-sm">General Grading System</p>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {genericGradeScale.map(grade => (
                    <div key={grade.grade} className="flex justify-between items-center py-3 px-4 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="font-bold text-slate-800 text-lg">{grade.grade}</span>
                      <span className="text-slate-600 font-semibold">{grade.gpa.toFixed(1)}</span>
                      <span className="text-sm text-slate-500 bg-white px-2 py-1 rounded-md">{grade.range}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* NEW CONTENT SECTION */}
        <div className="mt-12">
            <ContentSection />
        </div>
      </div>
    </main>
  );
};

// New Content Section Component
const ContentSection = () => {
    const gradingData = [
        { range: "85 – 100", grade: "A+", gpv: "4.00" },
        { range: "70 – 84", grade: "A", gpv: "4.00" },
        { range: "65 – 69", grade: "A-", gpv: "3.70" },
        { range: "60 – 64", grade: "B+", gpv: "3.30" },
        { range: "55 – 59", grade: "B", gpv: "3.00" },
        { range: "50 – 54", grade: "B-", gpv: "2.70" },
        { range: "45 – 49", grade: "C+", gpv: "2.30" },
        { range: "40 – 44", grade: "C", gpv: "2.00" },
        { range: "35 – 39", grade: "C-", gpv: "1.70" },
        { range: "30 – 34", grade: "D+", gpv: "1.30" },
        { range: "20 – 29", grade: "D", gpv: "1.00" },
        { range: "0 – 19", grade: "E", gpv: "0.00" },
    ];

    const degreeClasses = [
        { class: "First Class", gpa: "≥ 3.70" },
        { class: "Second Class – Upper Division", gpa: "3.30 – 3.69" },
        { class: "Second Class – Lower Division", gpa: "3.00 – 3.29" },
        { class: "Pass", gpa: "2.00 – 2.99" },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100 p-6 sm:p-8 lg:p-10">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-800 mb-2 text-center">Everything You Need to Know About the OUSL GPA</h2>
                <p className="text-lg text-slate-600 mb-10 text-center">Master your academic performance at The Open University of Sri Lanka (OUSL) with this definitive guide to GPA calculations, grading scales, and degree classifications.</p>

                <h3 className="text-2xl font-bold text-slate-700 mt-8 mb-4 border-b pb-2">🎯 Academic Journey Navigation</h3>
                <p className="text-slate-600 leading-relaxed mb-4">The OUSL GPA Calculator lets you enter course grades and credit values to see your current Grade Point Average instantly. Tracking your GPA helps you:</p>
                <ul className="list-disc list-inside space-y-2 mb-4 pl-4 text-slate-600">
                    <li>Monitor semester-by-semester progress,</li>
                    <li>Identify courses that need extra attention, and</li>
                    <li>Plan realistically for honours, scholarships and postgraduate study.</li>
                </ul>

                <h3 className="text-2xl font-bold text-slate-700 mt-8 mb-4 border-b pb-2">📈 Academic Performance Impact</h3>
                <p className="text-slate-600 leading-relaxed">At OUSL, GPA is the single metric used to award classes (First, Second-Upper, Second-Lower or Pass) across all bachelor’s programmes. Employers and scholarship panels rely on these classes to judge academic strength, so maintaining a strong GPA directly affects career and study opportunities¹.</p>

                <h3 className="text-2xl font-bold text-slate-700 mt-8 mb-4 border-b pb-2">Key Concepts & Calculations</h3>
                <h4 className="text-xl font-semibold text-slate-700 mt-6 mb-2">🤔 What Is a Grade Point Average?</h4>
                <p className="text-slate-600 leading-relaxed mb-4">GPA is the credit-weighted mean of the Grade Point Values (GPVs) earned across the courses that count toward your qualification. It runs from 0.00 to a maximum of 4.00².</p>
                
                <h4 className="text-xl font-semibold text-slate-700 mt-6 mb-2">🧮 How Is Your GPA Calculated?</h4>
                <p className="text-slate-600 leading-relaxed mb-4">The standard formula is:</p>
                <div className="bg-slate-100 p-4 rounded-lg text-center font-mono text-sm sm:text-base my-4 text-slate-800">
                    GPA = (Sum of [GPV × Credits] for all courses) / (Total Credits)
                </div>
                <p className="text-slate-600 leading-relaxed">GPV values come from the official grading scale below. Our calculator automates every step—just input your letter grade (or mark) and credit weight.</p>

                <h4 className="text-xl font-semibold text-slate-700 mt-6 mb-4">📋 Official OUSL Grading Scale</h4>
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mark Range</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Letter Grade</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade Point Value</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {gradingData.map(item => (
                                <tr key={item.range}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.range}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.grade}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.gpv}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-sm text-slate-500 mt-2">Grades of C (40%) or better are generally required to pass a course; lower grades earn credit only where a specific programme regulation permits².</p>


                <h4 className="text-xl font-semibold text-slate-700 mt-6 mb-4">⚖️ Degree Classes & GPA Thresholds</h4>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg my-4">
                    <p className="font-bold text-blue-800">All undergraduate degrees follow the national University Grants Commission benchmarks¹:</p>
                    <ul className="list-none mt-2 space-y-1">
                        {degreeClasses.map(item => (
                            <li key={item.class} className="flex justify-between">
                                <span className="text-blue-700">{item.class}</span>
                                <span className="font-mono text-blue-800">{item.gpa}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="text-sm text-slate-500 mt-2">Note: Faculties may impose extra conditions (e.g., minimum grades in research projects). Always check your programme handbook.</p>

                <h3 className="text-2xl font-bold text-slate-700 mt-8 mb-4 border-b pb-2">⚙️ Weighted GPA Practices at OUSL</h3>
                <p className="text-slate-600 leading-relaxed mb-4">OUSL does not re-weight entire academic years the way some universities do. Instead, many programmes calculate GPA from a defined block of higher-level credits, which naturally emphasises later study:</p>
                <ul className="list-disc list-inside space-y-2 mb-4 pl-4 text-slate-600">
                    <li><b>Faculty of Engineering Technology:</b> GPA is based on the best 90 credits selected in order: compulsory level-5/6/7 courses, then highest GPV electives, then required level-4 courses³.</li>
                    <li><b>Faculty of Natural Sciences:</b> GPA uses all level-3, 4 and 5 courses taken, but degree-class rules require specific credit distributions and minimum grades⁴.</li>
                </ul>
                <p className="text-slate-600 leading-relaxed">Your GPA calculator therefore asks you to tag each course with its level so it can mirror the exact regulation.</p>


                <h3 className="text-2xl font-bold text-slate-700 mt-8 mb-4 border-b pb-2">❓ Frequently Asked Questions</h3>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-slate-800">What is considered a “good” GPA at OUSL?</h4>
                        <p className="text-slate-600 mt-1">Anything above 3.30 secures at least a Second-Upper, while 3.70+ earns First Class status¹.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800">Does OUSL use WGPA like SLIIT?</h4>
                        <p className="text-slate-600 mt-1">No. OUSL bases honours purely on the standard GPA, although some faculties limit calculations to upper-level credits for fairness³.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800">How can I find credit values for my courses?</h4>
                        <p className="text-slate-600 mt-1">Credit weights are listed in your faculty guidebook or course outline on LMS.</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800">Are “Pass/Fail” courses counted in GPA?</h4>
                        <p className="text-slate-600 mt-1">No. Only graded courses with a GPV contribute to the numerator and denominator of the GPA².</p>
                    </div>
                    <div>
                        <h4 className="font-semibold text-slate-800">How often is GPA updated?</h4>
                        <p className="text-slate-600 mt-1">After every examination board ratifies results. Log into the myOUSL portal to view the official figure.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default CalculatorUI;
