'use client';

import { useState, useMemo, FC } from 'react';
import Link from 'next/link';

// Enhanced grade scale with ranges
const sliitGradeScale = [
  { grade: "A+", gpa: 4.0, range: "90-100" }, 
  { grade: "A", gpa: 4.0, range: "80-89" },
  { grade: "A-", gpa: 3.7, range: "75-79" }, 
  { grade: "B+", gpa: 3.3, range: "70-74" },
  { grade: "B", gpa: 3.0, range: "65-69" }, 
  { grade: "B-", gpa: 2.7, range: "60-64" },
  { grade: "C+", gpa: 2.3, range: "55-59" }, 
  { grade: "C", gpa: 2.0, range: "45-54" },
  { grade: "C-", gpa: 1.7, range: "40-44" }, 
  { grade: "D+", gpa: 1.3, range: "35-39" },
  { grade: "D", gpa: 1.0, range: "30-34" }, 
  { grade: "E", gpa: 0.0, range: "0-29" },
];

// Pre-populated course data for different modes
const courseTemplates = {
  Y1S1N: [
    { name: "Introduction to Programming", credits: 4 },
    { name: "Data Communication and Networking", credits: 4 },
    { name: "Mathematics for Computing", credits: 4 },
    { name: "Fundamentals of Computing", credits: 4 }
  ],
  Y1S1O: [
    { name: "Introduction to Programming", credits: 4 },
    { name: "Information and Communication Systems", credits: 4 },
    { name: "Mathematics for Computing", credits: 4 },
    { name: "Communication Skills", credits: 3 }
  ],
  Y1S2N: [
    { name: "Discrete Mathematics", credits: 4 },
    { name: "Data Structures and Algorithms", credits: 4 },
    { name: "Object Oriented Programming", credits: 4 },
    { name: "Technical Writing", credits: 4 }
  ],
  Y1S2O: [
    { name: "Object Oriented Concepts", credits: 2 },
    { name: "Software Project Management", credits: 3 },
    { name: "English for Academic Purposes", credits: 3 },
    { name: "Information Systems Development Methodologies", credits: 4 },
    { name: "Internet and Web Technologies", credits: 4 }
  ],
  Y2S1O: [
    { name: "Software Engineering", credits: 4 },
    { name: "Object Oriented Programming", credits: 4 },
    { name: "Database Management Systems", credits: 4 },
    { name: "Computer Networks", credits: 4 },
    { name: "Operating Systems and System Administration", credits: 4 }
  ],
  Y2S2O: [
    { name: "Mobile Application Development", credits: 4 },
    { name: "Data Structures and Algorithms", credits: 4 },
    { name: "Individual Project", credits: 4 },
    { name: "Professional Skills", credits: 2 },
    { name: "Professional Aptitude and Skills", credits: 3 }
  ]
};

type Course = { 
  id: number; 
  name: string; 
  credits: number; 
  grade: string; 
};

type CalculatorUIProps = {
  slug: string;
};

// Enhanced Circular Progress Component for GPA Meter
const CircularGPAMeter: FC<{ gpa: number; size?: number }> = ({ gpa, size = 120 }) => {
  const radius = (size - 40) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (gpa / 4.0) * 100;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

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
      {/* Scale indicators */}
      <div className="absolute inset-0">
        {[0, 1, 2, 3, 4].map(value => {
          const angle = (value / 4) * 270 - 135; // 270 degree arc starting from bottom-left
          const x = Math.cos((angle * Math.PI) / 180) * (radius + 15) + size / 2;
          const y = Math.sin((angle * Math.PI) / 180) * (radius + 15) + size / 2;
          return (
            <div
              key={value}
              className="absolute text-xs font-medium text-slate-500"
              style={{
                left: x - 8,
                top: y - 8,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {value.toFixed(1)}
            </div>
          );
        })}
      </div>

      <svg width={size} height={size} className="transform -rotate-[135deg]">
        {/* Background arc */}
        <path
          d={`M ${size/2 - radius} ${size/2} A ${radius} ${radius} 0 1 1 ${size/2 + radius * Math.cos(Math.PI * 3/4)} ${size/2 + radius * Math.sin(Math.PI * 3/4)}`}
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        {/* Progress arc */}
        <path
          d={`M ${size/2 - radius} ${size/2} A ${radius} ${radius} 0 1 1 ${size/2 + radius * Math.cos(Math.PI * 3/4)} ${size/2 + radius * Math.sin(Math.PI * 3/4)}`}
          stroke={getGpaColor(gpa)}
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: circumference * 0.75, // 270 degree arc
            strokeDashoffset: circumference * 0.75 - (progress / 100) * circumference * 0.75,
            transition: 'stroke-dashoffset 1s ease-out, stroke 0.3s ease-in-out',
          }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className={`text-3xl font-bold bg-gradient-to-r ${getGpaGradient(gpa)} bg-clip-text text-transparent`}>
          {gpa.toFixed(2)}
        </div>
        <div className="text-xs text-slate-500 mt-1 font-medium">CGPA</div>
        <div className="text-xs text-slate-400">of 4.0</div>
      </div>
    </div>
  );
};

const CalculatorUI: FC<CalculatorUIProps> = ({ slug }) => {
  const [mode, setMode] = useState<string>('custom');
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', credits: 3, grade: 'A+' }
  ]);

  const switchMode = (newMode: string) => {
    setMode(newMode);
    if (newMode === 'custom') {
      setCourses([{ id: 1, name: '', credits: 3, grade: 'A+' }]);
    } else {
      const template = courseTemplates[newMode as keyof typeof courseTemplates];
      setCourses(template.map((course, index) => ({
        id: index + 1,
        name: course.name,
        credits: course.credits,
        grade: 'A+'
      })));
    }
  };

  const addCourseRow = () => {
    if (mode === 'custom') {
      setCourses([...courses, { id: Date.now(), name: '', credits: 3, grade: 'A+' }]);
    }
  };

  const updateCourse = (id: number, field: keyof Omit<Course, 'id'>, value: string | number) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const removeCourseRow = (id: number) => {
    if (mode === 'custom' && courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const calculatedGpa = useMemo(() => {
    const gradeMap = new Map(sliitGradeScale.map(item => [item.grade, item.gpa]));
    const totalPoints = courses.reduce((acc, c) => acc + ((gradeMap.get(c.grade) || 0) * c.credits), 0);
    const totalCredits = courses.reduce((acc, c) => acc + Number(c.credits), 0);
    return totalCredits === 0 ? 0 : Number((totalPoints / totalCredits).toFixed(2));
  }, [courses]);

  const getGpaColor = (gpa: number) => {
    if (gpa >= 3.7) return 'text-emerald-400';
    if (gpa >= 3.0) return 'text-cyan-400';  
    if (gpa >= 2.0) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getGpaStatus = (gpa: number) => {
    if (gpa >= 3.7) return "Dean's List";
    if (gpa >= 3.0) return 'Excellent';
    if (gpa >= 2.0) return 'Pass';
    return 'Below Pass Grade';
  };

  const totalCredits = courses.reduce((acc, c) => acc + Number(c.credits), 0);
  const namedCourses = courses.filter(c => c.name.trim() !== '');

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 py-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30">
                <span className="text-3xl">🎓</span>
              </div>
              <div>
                <h1 className="text-5xl sm:text-6xl font-bold text-white uppercase tracking-wide drop-shadow-lg">
                  {slug} GPA Calculator
                </h1>
                <p className="text-cyan-100 text-xl mt-3 font-medium">Smart Academic Performance Calculator</p>
              </div>
            </div>
            <p className="text-cyan-50 max-w-4xl mx-auto text-lg leading-relaxed font-light">
              Calculate your CGPA with precision. Track your academic progress with our intelligent calculator designed specifically for SLIIT students.
            </p>
            <Link href="/" className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-all duration-300 backdrop-blur-md border border-white/30">
              <span>←</span> Back to all universities
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 -mt-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Calculator Section - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100">
              
              {/* Calculator Header */}
              <div className="bg-gradient-to-r from-slate-800 to-blue-900 p-8 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">GPA Calculator</h2>
                    <p className="text-slate-300 mt-1">Enter your academic information below</p>
                  </div>
                </div>
              </div>

              <div className="p-8 text-slate-800">
                {/* Mode Selection */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-blue-600">📚</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-700">Select Calculation Mode</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { key: 'custom', label: 'Custom', description: 'Add your own', icon: '✏️' },
                      { key: 'Y1S1N', label: 'Y1S1 New', description: 'New Syllabus', icon: '📖' },
                      { key: 'Y1S1O', label: 'Y1S1 Old', description: 'Old Syllabus', icon: '📚' },
                      { key: 'Y1S2N', label: 'Y1S2 New', description: 'New Syllabus', icon: '📖' },
                      { key: 'Y1S2O', label: 'Y1S2 Old', description: 'Old Syllabus', icon: '📚' },
                      { key: 'Y2S1O', label: 'Y2S1 Old', description: 'Old Syllabus', icon: '📚' },
                      { key: 'Y2S2O', label: 'Y2S2 Old', description: 'Old Syllabus', icon: '📚' }
                    ].map(modeOption => (
                      <button
                        key={modeOption.key}
                        onClick={() => switchMode(modeOption.key)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-sm font-medium group hover:scale-105 ${
                          mode === modeOption.key
                            ? 'bg-gradient-to-br from-cyan-500 to-blue-600 border-cyan-400 text-white shadow-lg shadow-cyan-500/25'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 hover:border-blue-300 hover:shadow-md'
                        }`}
                      >
                        <div className="text-lg mb-2">{modeOption.icon}</div>
                        <div className="font-bold">{modeOption.label}</div>
                        <div className="text-xs opacity-75 mt-1">{modeOption.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Course Input Section */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600">📝</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-700">Course Information</h3>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <div className="overflow-x-auto">
                      <table className="min-w-[420px] w-full text-sm text-slate-800 border-collapse">
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
                                  disabled={mode !== 'custom'}
                                  onChange={e => updateCourse(course.id, 'name', e.target.value)}
                                  className={`w-full rounded-lg border-2 px-4 py-2 transition-all duration-200 ${
                                    mode !== 'custom'
                                      ? 'bg-slate-100 text-slate-500 border-slate-300 cursor-not-allowed'
                                      : 'bg-white border-slate-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20'
                                  }`}
                                />
                              </td>
                              <td className="py-4 text-center">
                                <select
                                  value={course.credits}
                                  disabled={mode !== 'custom'}
                                  onChange={e => updateCourse(course.id, 'credits', Number(e.target.value))}
                                  className={`w-20 rounded-lg border-2 px-2 py-2 text-center transition-all duration-200 ${
                                    mode !== 'custom'
                                      ? 'bg-slate-100 text-slate-500 border-slate-300 cursor-not-allowed'
                                      : 'bg-white border-slate-300 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20'
                                  }`}
                                >
                                  {[1, 2, 3, 4, 5, 6].map(n => (
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
                                  {sliitGradeScale.map(g => (
                                    <option key={g.grade} value={g.grade}>{g.grade}</option>
                                  ))}
                                </select>
                              </td>
                              <td className="py-4 pr-6 text-center">
                                <button
                                  onClick={() => removeCourseRow(course.id)}
                                  disabled={mode !== 'custom'}
                                  aria-label="Remove course"
                                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                                    mode !== 'custom'
                                      ? 'text-slate-400 cursor-not-allowed'
                                      : 'text-red-500 hover:bg-red-100 hover:text-red-600'
                                  }`}
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
                    </div>

                    {mode === 'custom' && (
                      <div className="mt-6 flex justify-center">
                        <button
                          onClick={addCourseRow}
                          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 font-medium shadow-lg shadow-cyan-500/25 hover:scale-105"
                        >
                          <span className="text-xl">+</span>
                          Add Module
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Results Section */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-200">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-purple-600">📊</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-700">Calculation Results</h3>
                  </div>
                  
                  <div className="grid sm:grid-cols-3 gap-6 mb-8">
                    <div className="text-center p-6 bg-white rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition-shadow duration-300">
                      <div className="text-3xl font-bold text-blue-600">{namedCourses.length}</div>
                      <div className="text-sm text-slate-600 font-medium mt-1">Total Modules</div>
                    </div>
                    <div className="text-center p-6 bg-white rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition-shadow duration-300">
                      <div className="text-3xl font-bold text-green-600">{totalCredits}</div>
                      <div className="text-sm text-slate-600 font-medium mt-1">Total Credits</div>
                    </div>
                    <div className="flex items-center justify-center p-6 bg-white rounded-xl shadow-md border border-blue-100 hover:shadow-lg transition-shadow duration-300">
                      <CircularGPAMeter gpa={calculatedGpa} size={110} />
                    </div>
                  </div>

                  <div className="text-center p-8 bg-white rounded-2xl border-l-4 border-cyan-500 shadow-md">
                    <div className="text-lg text-slate-600 mb-3 font-medium">Academic Status</div>
                    <div className={`text-3xl font-bold ${getGpaColor(calculatedGpa)} mb-3`}>
                      {getGpaStatus(calculatedGpa)}
                    </div>
                    <div className="text-sm text-slate-500 flex items-center justify-center gap-2">
                      <span className={calculatedGpa >= 2.0 ? 'text-green-600' : 'text-red-600'}>
                        {calculatedGpa >= 2.0 ? '✅' : '⚠️'}
                      </span>
                      {calculatedGpa >= 2.0 ? 'Meeting graduation requirements' : 'Below minimum passing grade'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Grading Scale Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-100 sticky top-6">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-lg">📋</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">SLIIT Grading Scale</h2>
                    <p className="text-indigo-100 text-sm">SLIIT Official Scale</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {sliitGradeScale.map(grade => (
                    <div key={grade.grade} className="flex justify-between items-center py-3 px-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl hover:from-slate-100 hover:to-blue-100 transition-all duration-200 border border-slate-200">
                      <span className="font-bold text-slate-800 text-lg">{grade.grade}</span>
                      <span className="text-slate-600 font-semibold">{grade.gpa.toFixed(1)}</span>
                      <span className="text-sm text-slate-500 bg-white px-2 py-1 rounded-md">{grade.range}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl border-2 border-cyan-200">
                  <div className="text-center">
                    <div className="font-bold text-slate-700 mb-2 flex items-center justify-center gap-2">
                      <span className="text-green-500">✅</span>
                      Pass Requirement
                    </div>
                    <div className="text-sm text-slate-600">Minimum &quot;C&quot; grade (2.0 GPA) required for graduation</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* All your existing SEO content remains exactly the same */}


        {/* All your existing SEO content remains exactly the same */}
        <div className="mt-16 prose prose-slate max-w-none text-slate-700 prose-headings:text-slate-800 prose-a:text-blue-600">
          <p className="text-lg leading-relaxed">
            Navigating your academic journey at the Sri Lanka Institute of Information Technology (SLIIT) requires a clear understanding of your performance. Our SLIIT GPA Calculator is a vital tool designed to help you instantly calculate your Grade Point Average. By simply entering your course grades and credit points, you can get an accurate assessment of your current academic standing, track your semester GPA, and plan effectively for future scholarships and graduate programs.
          </p>
          
          <h2>How Does the SLIIT GPA Calculator Help Your Academic Performance?</h2>
          <p>
            Understanding your Grade Point Average (GPA) is more than just a number; it&apos;s a key indicator of your academic performance at SLIIT. Your GPA plays a critical role in your eligibility for honours, scholarships, and even future employment opportunities. This calculator helps you stay on top of your grades, allowing you to make informed decisions about your study habits, course load, and academic goals. By tracking your cumulative GPA, you can identify areas for improvement and take proactive steps to boost your score.
          </p>

          <h3>What is a Grade Point Average (GPA)?</h3>
          <p>
            A Grade Point Average is a standard metric used to measure a student&apos;s academic achievement over a specific period, such as a semester or an entire degree program. Each letter grade you receive for a course (like A+, B, or C) corresponds to a numerical grade point. The GPA is a weighted average of these points, calculated based on the number of credits each course is worth. It provides a comprehensive summary of your overall performance, making it easier for the institution and potential employers to assess your capabilities.
          </p>
          
          <h3>How is Your GPA Calculated at SLIIT?</h3>
          <p>
            Calculating your GPA at SLIIT follows a straightforward formula. First, you need to convert the letter grade for each subject into its corresponding grade point value according to the official SLIIT grading scale. Then, for each course, you multiply this grade point by the number of credit points (or credit hours) assigned to that course. The sum of these values is then divided by the total number of credits you&apos;ve taken.
          </p>
          <p>The formula is: <strong>GPA = Σ (Grade Points × Course Credits) / Total Course Credits</strong></p>
          <p>
            This tool automates the entire process. You simply need to add your module names, select your letter grade from the dropdown menu, and input the correct credits for each. The calculator handles the conversion and computation, giving you your precise semester GPA or cumulative GPA instantly.
          </p>

          <h3>What is the Official SLIIT Grading Scale?</h3>
          <p>
            SLIIT uses a 12-grade system to assess student performance. Each grade has a specific grade point and corresponding marks range. The pass grade for a module is a &quot;C&quot;. Understanding this scale is essential for accurately calculating your GPA and interpreting your academic transcript.
          </p>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b p-2">Grade</th>
                <th className="border-b p-2">Grade Point</th>
                <th className="border-b p-2">Marks Range</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="border-b p-2">A+</td><td className="border-b p-2">4.0</td><td className="border-b p-2">90-100</td></tr>
              <tr><td className="border-b p-2">A</td><td className="border-b p-2">4.0</td><td className="border-b p-2">80-89</td></tr>
              <tr><td className="border-b p-2">A-</td><td className="border-b p-2">3.7</td><td className="border-b p-2">75-79</td></tr>
              <tr><td className="border-b p-2">B+</td><td className="border-b p-2">3.3</td><td className="border-b p-2">70-74</td></tr>
              <tr><td className="border-b p-2">B</td><td className="border-b p-2">3.0</td><td className="border-b p-2">65-69</td></tr>
              <tr><td className="border-b p-2">B-</td><td className="border-b p-2">2.7</td><td className="border-b p-2">60-64</td></tr>
              <tr><td className="border-b p-2">C+</td><td className="border-b p-2">2.3</td><td className="border-b p-2">55-59</td></tr>
              <tr><td className="border-b p-2">C</td><td className="border-b p-2">2.0</td><td className="border-b p-2">45-54</td></tr>
              <tr><td className="border-b p-2">C-</td><td className="border-b p-2">1.7</td><td className="border-b p-2">40-44</td></tr>
              <tr><td className="border-b p-2">D+</td><td className="border-b p-2">1.3</td><td className="border-b p-2">35-39</td></tr>
              <tr><td className="border-b p-2">D</td><td className="border-b p-2">1.0</td><td className="border-b p-2">30-34</td></tr>
              <tr><td className="border-b p-2">E</td><td className="border-b p-2">0.0</td><td className="border-b p-2">0-29</td></tr>
            </tbody>
          </table>

          <h3>What is a Weighted GPA (WGPA) at SLIIT?</h3>
          <p>
            Beyond the standard semester GPA, SLIIT also uses a Weighted Grade Point Average (WGPA) to determine final class honours. The WGPA calculation gives different weights to your academic performance in different years of study. This means that your grades in the final years of your degree have a greater impact on your final classification.
          </p>
          <p>The weighting factor assigned varies by faculty:</p>
          <ul>
            <li><strong>Faculty of Computing:</strong> 1st Year (0%), 2nd Year (20%), 3rd Year (30%), 4th Year (50%)</li>
            <li><strong>School of Business:</strong> 1st Year (10%), 2nd Year (20%), 3rd Year (30%), 4th Year (40%)</li>
            <li><strong>Faculty of Engineering:</strong> 1st Year (10%), 2nd Year (20%), 3rd Year (30%), 4th Year (40%)</li>
          </ul>
          <p>
            This system emphasizes sustained academic improvement and rewards strong performance in higher-level courses. Our tool helps you calculate your unweighted GPA, which is the foundational metric for each semester&apos;s WGPA calculation.
          </p>

          <hr/>

          <h2 id="faq">Frequently Asked Questions (FAQ) about the SLIIT GPA Calculator</h2>
          
          <h3>1. What is considered a good GPA at SLIIT?</h3>
          <p>A &quot;good&quot; GPA is subjective, but generally, a cumulative GPA of 3.0 or higher is considered strong. To be eligible for academic honours like a First Class, students typically need a much higher GPA, often above 3.7, depending on the faculty&apos;s WGPA calculation.</p>

          <h3>2. Is this an official SLIIT GPA Calculator?</h3>
          <p>This is an unofficial tool designed to help students calculate their GPA based on the official SLIIT grading system. For your official GPA and academic transcript, you should always consult the Student System or contact the Registrar&apos;s Office at SLIIT.</p>

          <h3>3. How do I find the number of credits for my subjects?</h3>
          <p>The number of credit points for each module or unit of study is listed in your course handbook, which is usually available on the university&apos;s student portal (Courseweb). You can also find this information on your academic transcript or by making an enquiry with your Academic Advisor.</p>

          <h3>4. Does this calculator handle both weighted and unweighted GPA?</h3>
          <p>This tool is primarily an unweighted GPA calculator. It accurately computes your semester GPA (SGPA) and cumulative GPA (CGPA) based on your grades and credits. You can use these calculated semester GPAs to manually compute your Weighted GPA (WGPA) using the faculty-specific percentages.</p>

          <h3>5. What do I do if I have an &apos;Incomplete&apos; grade?</h3>
          <p>An &apos;Incomplete&apos; (I) grade is temporary and does not have a grade point value, so it is not included in the GPA calculation until a final letter grade is assigned. Once your professor submits the final grade, you can add it to the calculator to update your academic performance score.</p>
          
          <h3>6. How are &apos;Pass&apos;/&apos;Fail&apos; courses treated in the GPA calculation?</h3>
          <p>Courses graded on a Pass/Fail basis are typically not included in the GPA calculation. While a &apos;Pass&apos; grade earns you the credits for the course, it does not affect your grade point average. A &apos;Fail&apos; grade also does not affect the GPA but results in no credits earned.</p>
          
          <h3>7. Can I use this calculator for high school or other colleges?</h3>
          <p>This calculator is specifically calibrated for the SLIIT grading scale. While the basic formula is similar, other institutions, high schools, or public schools may use different grading scales (e.g., a 5.0 scale for AP/IB classes). It is always best to use a calculator designed for your specific school&apos;s system.</p>

          <h3>8. What is the difference between GPA, CGPA, and SGPA?</h3>
          <p>SGPA (Semester Grade Point Average) is your GPA for a single semester. GPA can refer to either SGPA or CGPA. CGPA (Cumulative Grade Point Average) is the overall GPA for all the semesters you have completed so far in your academic program.</p>
          
          <h3>9. How can regular class attendance and better study habits help my GPA?</h3>
          <p>Regular class attendance ensures you don&apos;t miss key information and can actively participate in discussions. Effective study habits, such as consistent review, time management, and utilizing academic resources like the library and writing centres, directly contribute to better marks on assessments and exams, which in turn raises your course grade and overall GPA.</p>
          
          <h3>10. Where can I find official support for my grades at SLIIT?</h3>
          <p>For any official enquiry about your grades, academic transcript, or GPA calculation, you should contact SLIIT&apos;s Academic Advising or the Registrar&apos;s Office. They are the primary sources for official results and academic support.</p>
        </div>
        
        {/* JSON-LD Schema - Keep exactly as it is */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is considered a good GPA at SLIIT?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `A 'good' GPA is subjective, but generally, a cumulative GPA of 3.0 or higher is considered strong. To be eligible for academic honours like a First Class, students typically need a much higher GPA, often above 3.7, depending on the faculty's WGPA calculation.`
                }
              },
              {
                "@type": "Question",
                "name": "Is this an official SLIIT GPA Calculator?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `This is an unofficial tool designed to help students calculate their GPA based on the official SLIIT grading system. For your official GPA and academic transcript, you should always consult the Student System or contact the Registrar's Office at SLIIT.`
                }
              },
              {
                "@type": "Question",
                "name": "How do I find the number of credits for my subjects?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `The number of credit points for each module or unit of study is listed in your course handbook, which is usually available on the university's student portal (Courseweb). You can also find this information on your academic transcript or by making an enquiry with your Academic Advisor.`
                }
              },
              {
                "@type": "Question",
                "name": "Does this calculator handle both weighted and unweighted GPA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `This tool is primarily an unweighted GPA calculator. It accurately computes your semester GPA (SGPA) and cumulative GPA (CGPA) based on your grades and credits. You can use these calculated semester GPAs to manually compute your Weighted GPA (WGPA) using the faculty-specific percentages.`
                }
              },
              {
                "@type": "Question",
                "name": "What do I do if I have an 'Incomplete' grade?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `An 'Incomplete' (I) grade is temporary and does not have a grade point value, so it is not included in the GPA calculation until a final letter grade is assigned. Once your professor submits the final grade, you can add it to the calculator to update your academic performance score.`
                }
              },
              {
                "@type": "Question",
                "name": "How are 'Pass'/'Fail' courses treated in the GPA calculation?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Courses graded on a Pass/Fail basis are typically not included in the GPA calculation. While a 'Pass' grade earns you the credits for the course, it does not affect your grade point average. A 'Fail' grade also does not affect the GPA but results in no credits earned.`
                }
              },
              {
                "@type": "Question",
                "name": "Can I use this calculator for high school or other colleges?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `This calculator is specifically calibrated for the SLIIT grading scale. While the basic formula is similar, other institutions, high schools, or public schools may use different grading scales (e.g., a 5.0 scale for AP/IB classes). It is always best to use a calculator designed for your specific school's system.`
                }
              },
              {
                "@type": "Question",
                "name": "What is the difference between GPA, CGPA, and SGPA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `SGPA (Semester Grade Point Average) is your GPA for a single semester. GPA can refer to either SGPA or CGPA. CGPA (Cumulative Grade Point Average) is the overall GPA for all the semesters you have completed so far in your academic program.`
                }
              },
              {
                "@type": "Question",
                "name": "How can regular class attendance and better study habits help my GPA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `Regular class attendance ensures you don't miss key information and can actively participate in discussions. Effective study habits, such as consistent review, time management, and utilizing academic resources like the library and writing centres, directly contribute to better marks on assessments and exams, which in turn raises your course grade and overall GPA.`
                }
              },
              {
                "@type": "Question",
                "name": "Where can I find official support for my grades at SLIIT?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `For any official enquiry about your grades, academic transcript, or GPA calculation, you should contact SLIIT's Academic Advising or the Registrar's Office. They are the primary sources for official results and academic support.`
                }
              }
            ]
          })}}
        />
      </div>
    </main>
  );
};

export default CalculatorUI;
