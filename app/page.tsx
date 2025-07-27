'use client';

import { useState, useMemo, FC } from 'react';
import Link from 'next/link';

// Grade scale for generic calculator
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

// University data
const universities = [
  {
    name: "SLIIT",
    fullName: "Sri Lanka Institute of Information Technology",
    slug: "sliit",
    logo: "🏛️",
    color: "blue",
    description: "Faculty of Computing GPA Calculator with official curriculum",
    features: ["9+ Programs", "Both Syllabuses", "Pre-loaded Modules"],
    status: "available"
  },
    {
    name: "OUSL",
    fullName: "Open University of Sri Lanka",
    slug: "ousl",
    logo: "📖",
    color: "green",
    description: "A general GPA calculator for OUSL students.",
    features: ["All Faculties", "SGPA & CGPA", "Flexible"],
    status: "available"
  },
  {
    name: "University of Colombo",
    fullName: "University of Colombo",
    slug: "university-of-colombo",
    logo: "🎓",
    color: "green",
    description: "Official GPA calculator for UOC students",
    features: ["All Faculties", "SGPA & CGPA", "Grade Conversion"],
    status: "coming-soon"
  },
  {
    name: "University of Moratuwa",
    fullName: "University of Moratuwa",
    slug: "university-of-moratuwa", 
    logo: "⚙️",
    color: "purple",
    description: "Engineering & IT focused GPA calculator",
    features: ["Engineering", "IT Faculty", "Research Programs"],
    status: "coming-soon"
  },
  {
    name: "University of Peradeniya",
    fullName: "University of Peradeniya",
    slug: "university-of-peradeniya",
    logo: "🌿", 
    color: "emerald",
    description: "Comprehensive GPA calculator for all faculties",
    features: ["Medical Faculty", "Engineering", "Arts & Science"],
    status: "coming-soon"
  },
  {
    name: "NSBM",
    fullName: "NSBM Green University",
    slug: "nsbm",
    logo: "🌱",
    color: "teal",
    description: "Business & computing GPA calculator",
    features: ["Business School", "Computing", "Engineering"],
    status: "coming-soon"
  },
  {
    name: "IIT",
    fullName: "Informatics Institute of Technology",
    slug: "iit",
    logo: "💻",
    color: "indigo",
    description: "IT & business focused GPA calculator",
    features: ["IT Programs", "Business", "Westminster Degree"],
    status: "coming-soon"
  }
];

type Course = {
  id: number;
  name: string;
  credits: number;
  grade: string;
};

// Enhanced Circular Progress Component
const CircularGPAMeter: FC<{ gpa: number; size?: number }> = ({ gpa, size = 80 }) => {
  const radius = (size - 16) / 2; // Adjusted for stroke width
  const circumference = 2 * Math.PI * radius;
  
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
  
  const strokeDashoffset = circumference - (gpa / 4.0) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getGpaColor(gpa)}
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
            transition: 'stroke-dashoffset 1s ease-out, stroke 0.3s ease-in-out',
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${getGpaGradient(gpa)} bg-clip-text text-transparent`}>
          {gpa.toFixed(2)}
        </div>
        <div className="text-xs text-slate-500 mt-1 font-medium">GPA</div>
      </div>
    </div>
  );
};

const HomePage: FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', credits: 3, grade: 'A+' },
    { id: 2, name: '', credits: 3, grade: 'A+' },
    { id: 3, name: '', credits: 3, grade: 'A+' }
  ]);

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), name: '', credits: 3, grade: 'A+' }]);
  };

  const updateCourse = (id: number, field: keyof Omit<Course, 'id'>, value: string | number) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const removeCourse = (id: number) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };
  
  const summary = useMemo(() => {
    const gradeMap = new Map(genericGradeScale.map(item => [item.grade, item.gpa]));
    
    const validCourses = courses.filter(c => c.name.trim() !== '');
    const totalCourses = validCourses.length;
    const totalCredits = courses.reduce((acc, c) => acc + Number(c.credits), 0);

    const totalPoints = courses.reduce((acc, c) => {
        const point = gradeMap.get(c.grade) || 0;
        return acc + (point * c.credits);
    }, 0);
    
    const gpa = totalCredits === 0 ? 0 : Number((totalPoints / totalCredits).toFixed(2));

    let performanceText = "Enter course names to begin";
    if (totalCourses > 0) {
        if (gpa >= 3.7) performanceText = "Excellent Performance";
        else if (gpa >= 3.0) performanceText = "Good Standing";
        else if (gpa >= 2.0) performanceText = "Satisfactory";
        else performanceText = "Needs Improvement";
    }
    
    return { totalCourses, totalCredits, gpa, performanceText };
  }, [courses]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      
      {/* Navigation Header */}
    

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/30">
                <span className="text-2xl sm:text-3xl">🎓</span>
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  GPA Calculator<br />
                  <span className="text-cyan-200">Sri Lanka</span>
                </h1>
                <h2 className="text-cyan-100 text-lg sm:text-xl mt-2 font-medium">
                  Accurate University GPA Calculator for All Sri Lankan Students
                </h2>
              </div>
            </div>
            
            <p className="text-cyan-50 max-w-4xl mx-auto text-base sm:text-lg leading-relaxed font-light">
              Understanding your academic performance is crucial for success. Our GPA Calculator for Sri Lanka is an essential tool designed to help any student calculate their Grade Point Average with precision. Whether you need to find your semester GPA (SGPA) or your overall cumulative GPA (CGPA), this tool simplifies the process.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <a 
                href="#calculator" 
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg"
              >
                Start Calculating →
              </a>
              <a 
                href="#universities" 
                className="bg-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/30 transition-all duration-300 backdrop-blur-md border border-white/30"
              >
                University Tools
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-8 sm:py-12 relative -mt-8 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Generic Calculator */}
            <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-800 to-blue-900 p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center">
                    <span className="text-lg">⚡</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Quick GPA Calculator</h2>
                    <p className="text-slate-300 text-sm">For any Sri Lankan university</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-slate-600 text-sm mb-4">
                  Generic university GPA calculator that works for most Sri Lankan institutions. Perfect for quick calculations.
                </p>
                
                <Link href="/generic-gpa-calculator" className="block w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-center py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-300">
                  Use Generic Calculator
                </Link>
              </div>
            </div>

            {/* University Specific */}
            <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-300 rounded-xl flex items-center justify-center">
                    <span className="text-lg">🏛️</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">University-Specific Tools</h2>
                    <p className="text-purple-100 text-sm">Official curriculum & grading</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-slate-600 text-sm mb-4">
                  Dedicated calculators built specifically for each university with official curriculum data and grading scales.
                </p>
                
                <a href="#universities" className="block w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-center py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300">
                  View University Tools
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* University-Specific Calculators */}
      <section id="universities" className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full border border-blue-200 mb-4">
              <span className="text-blue-600">🏛️</span>
              <span className="text-sm font-semibold text-blue-700">University Tools</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              University GPA Calculator Tools
            </h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg">
              Specialized GPA calculators built specifically for each Sri Lankan university with official curriculum data, grading scales, and semester structures.
            </p>
          </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.map((university, index) => {
            const getUniversityColors = (color: string) => {
              const colorMap = {
                'blue': { header: 'bg-gradient-to-br from-blue-500 to-blue-600', button: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700' },
                'green': { header: 'bg-gradient-to-br from-green-500 to-green-600', button: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' },
                'purple': { header: 'bg-gradient-to-br from-purple-500 to-purple-600', button: 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700' },
                'emerald': { header: 'bg-gradient-to-br from-emerald-500 to-emerald-600', button: 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700' },
                'teal': { header: 'bg-gradient-to-br from-teal-500 to-teal-600', button: 'bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700' },
                'indigo': { header: 'bg-gradient-to-br from-indigo-500 to-indigo-600', button: 'bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700' }
              };
              return colorMap[color as keyof typeof colorMap] || colorMap.blue;
            };
            const colors = getUniversityColors(university.color);
            return (
              <div key={university.slug} className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className={`${colors.header} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-8 -mt-8"></div>
                  <div className="relative z-10">
                    <div className="text-3xl mb-3">{university.logo}</div>
                    <h3 className="text-xl font-bold mb-1">{university.name}</h3>
                    <p className="text-xs opacity-90">{university.fullName}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-slate-600 text-sm mb-4">{university.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {university.features.map((feature, i) => (
                      <span key={i} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">{feature}</span>
                    ))}
                  </div>
                  {university.status === 'available' ? (
                    <Link href={`/university-gpa-calculator/${university.slug}`} className={`block w-full ${colors.button} text-white text-center py-3 rounded-lg font-semibold transition-all duration-300`}>
                      Calculate GPA →
                    </Link>
                  ) : (
                    <div className="text-center">
                      <div className="bg-slate-100 text-slate-500 py-3 rounded-lg font-semibold mb-2">Coming Soon</div>
                      <p className="text-xs text-slate-500">We&apos;re building this calculator</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </section>

      {/* Quick Calculator Section */}
      <section id="calculator" className="py-12 sm:py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full border border-green-200 mb-4">
              <span className="text-green-600">⚡</span>
              <span className="text-sm font-semibold text-green-700">Quick Calculator</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              Calculate Your GPA Instantly
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Use our generic GPA calculator for quick calculations. Perfect for any Sri Lankan university using the standard 4.0 grading scale.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl border border-blue-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                <h3 className="text-xl font-bold">University GPA Calculator</h3>
                <p className="text-emerald-200 text-sm mt-1">Add your courses and grades to calculate CGPA</p>
            </div>
            
            <div className="p-6">
              {/* Course Information Table */}
              <div className="mb-6">
                <div className="overflow-hidden rounded-lg">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Course Name</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700 w-24">Credits</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700 w-28">Grade</th>
                        <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700 w-20">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {/* --- START OF FUNCTIONAL CODE --- */}
                      {courses.map((course, index) => (
                        <tr key={course.id} className="hover:bg-slate-50 transition-colors duration-200">
                          <td className="px-4 py-3">
                            <input 
                              placeholder={`Course ${index + 1} name`} 
                              className="w-full rounded-lg border-2 px-4 py-2 transition-all duration-200 bg-white border-slate-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 text-slate-900 placeholder:text-slate-500" 
                              type="text" 
                              value={course.name}
                              onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                            />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <select 
                              className="w-full rounded-lg border-2 px-3 py-2 transition-all duration-200 bg-white border-slate-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 text-slate-900 text-center"
                              value={course.credits}
                              onChange={(e) => updateCourse(course.id, 'credits', Number(e.target.value))}
                            >
                              {Array.from({length: 8}, (_, i) => <option key={i+1} value={i+1}>{i+1}</option>)}
                            </select>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <select 
                              className="w-full rounded-lg border-2 px-3 py-2 transition-all duration-200 bg-white border-slate-300 focus:border-green-500 focus:ring-4 focus:ring-green-500/20 text-slate-900 text-center"
                              value={course.grade}
                              onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                            >
                              {genericGradeScale.map(g => <option key={g.grade} value={g.grade}>{g.grade}</option>)}
                            </select>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button 
                              onClick={() => removeCourse(course.id)}
                              className="w-8 h-8 text-red-500 hover:bg-red-100 rounded-lg transition-colors duration-200 flex items-center justify-center font-bold mx-auto disabled:text-slate-400 disabled:hover:bg-transparent"
                              disabled={courses.length <= 1}
                            >
                              ×
                            </button>
                          </td>
                        </tr>
                      ))}
                      {/* --- END OF FUNCTIONAL CODE --- */}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={addCourse}
                  className="flex items-center gap-2 px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200 font-medium border border-green-200 hover:border-green-300"
                >
                  <span className="text-lg">+</span> Add Course
                </button>
                <Link href="/generic-gpa-calculator" className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200 font-medium">
                  Use Full Calculator →
                </Link>
              </div>

              {/* Calculation Results */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-4">Calculation Results</h4>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                      <div className="text-2xl font-bold text-slate-700">{summary.totalCourses}</div>
                      <div className="text-sm text-slate-600 font-medium">Courses</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                      <div className="text-2xl font-bold text-blue-600">{summary.totalCredits}</div>
                      <div className="text-sm text-slate-600 font-medium">Credits</div>
                    </div>
                    <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                      <CircularGPAMeter gpa={summary.gpa} size={80} />
                    </div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border-l-4 border-green-500 shadow-sm">
                    <div className="text-lg font-semibold text-slate-700">
                      Your CGPA: <span className="text-2xl text-green-600 font-bold">{summary.gpa.toFixed(2)}</span> / 4.0
                    </div>
                    <div className="text-sm text-slate-500 mt-1 font-medium">{summary.performanceText}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How GPA Calculator Helps */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
              How Can a GPA Calculator Help You Succeed in a Sri Lankan University?
            </h2>
            <p className="text-slate-600 max-w-4xl mx-auto text-lg leading-relaxed">
              For any student in Sri Lanka, the Grade Point Average (GPA) is the primary metric of academic performance. It&apos;s more than just a number on your transcript; it&apos;s a reflection of your hard work and dedication. Using a reliable GPA calculator gives you a clear, real-time view of your academic progress.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Track Progress</h3>
              <p className="text-slate-600">
                Monitor how each course grade impacts your overall score, helping you set realistic goals for achieving First Class, Second Class Honours, or maintaining good standing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-green-600 text-xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Set Goals</h3>
              <p className="text-slate-600">
                Identify which subjects need more attention and understand the direct link between your effort and academic results.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-purple-600 text-xl">🚀</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Plan Future</h3>
              <p className="text-slate-600">
                Take control of your education and plan effectively for scholarships, graduate programs, and future career opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GPA Explanation */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">What Exactly is a Grade Point Average (GPA)?</h2>
            
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              A Grade Point Average is a standardized number that represents your average academic score for all the courses you have completed. Every letter grade (like A, B, or C) you receive from your institution is assigned a numerical value, known as a grade point. For example, an &apos;A&apos; grade might be worth 4.0 points.
            </p>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 mb-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">How Do You Calculate Your Cumulative GPA?</h3>
              <p className="text-slate-700 mb-4">
                Calculating your Cumulative Grade Point Average (CGPA) follows a logical formula:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  <div>
                    <strong>Calculate Quality Points:</strong> For every subject, multiply the grade point value by the number of credits. Example: A (4.0 points) × 3 credits = 12 quality points.
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  <div>
                    <strong>Calculate Final GPA:</strong> Sum all quality points and divide by total credit hours.
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-800">CGPA = Total Quality Points ÷ Total Credit Hours</div>
                </div>
              </div>
            </div>

            <p className="text-slate-600">
              Our calculator automates this entire process, removing the chance of manual error and providing you with an instant result.
            </p>
          </div>
        </div>
      </section>

      {/* Grading Scale Importance */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-6">
                Why is Understanding the Grading Scale So Important?
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Every university in Sri Lanka has its own unique grading scale. While most are based on a 4.0 system, the specific marks range for each letter grade can differ. For instance, at an institution like SLIIT, an &apos;A+&apos; and an &apos;A&apos; both correspond to a 4.0 grade point, but they represent different percentage marks (90-100 and 80-89, respectively).
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                Knowing your university&apos;s specific grading system is essential for an accurate GPA calculation. When using any GPA calculator, always ensure it aligns with your institution&apos;s official scale.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-blue-100">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Standard Sri Lankan Grading Scale</h3>
              <div className="space-y-2">
                {genericGradeScale.slice(0, 8).map(grade => (
                  <div key={grade.grade} className="flex justify-between items-center py-2 px-3 bg-slate-50 rounded-lg">
                    <span className="font-semibold text-slate-800">{grade.grade}</span>
                    <span className="text-slate-600">{grade.gpa.toFixed(1)}</span>
                    <span className="text-sm text-slate-500">{grade.range}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-700 text-center">
                  <strong>Pass Grade:</strong> Minimum &quot;C&quot; grade (2.0 GPA) typically required
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weighted vs Unweighted GPA */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              What is the Difference Between Weighted GPA and Unweighted GPA?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-indigo-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <span className="text-indigo-600">📊</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800">Unweighted GPA</h3>
              </div>
              <p className="text-slate-600 mb-4">
                The most common type, calculated on a standard 0 to 4.0 scale where each course&apos;s grade point is not affected by its difficulty. An &apos;A&apos; is always worth 4.0 points, regardless of course level.
              </p>
              <div className="text-sm text-indigo-700 bg-indigo-50 p-3 rounded-lg">
                Most widely used for university admissions and scholarships
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border border-purple-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-purple-600">⚖️</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800">Weighted GPA</h3>
              </div>
              <p className="text-slate-600 mb-4">
                Gives more weight to challenging courses. An &apos;A&apos; in an advanced course might be worth 5.0 points instead of 4.0. Some Sri Lankan universities use weighted GPA for final honours calculation.
              </p>
              <div className="text-sm text-purple-700 bg-purple-50 p-3 rounded-lg">
                Used for final degree classification and honours determination
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200">
            <p className="text-slate-600 text-center">
              <strong>Note:</strong> Our tool focuses on calculating your unweighted GPA, which is the fundamental building block for any further assessment.
            </p>
          </div>
        </div>
      </section>

      {/* Improvement Tips */}
      <section className="py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              How Can You Improve Your Academic Performance?
            </h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg">
              Improving your GPA requires a strategic approach to your studies. Here are some proven methods:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl">⏰</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Time Management</h3>
              <p className="text-slate-600 text-sm">
                Create a study schedule and stick to it. Allocate sufficient time for each subject, especially challenging ones.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-100 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-xl">📚</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Regular Attendance</h3>
              <p className="text-slate-600 text-sm">
                Attend all lectures, labs, and studios. Receive information directly from professors and ask questions in real-time.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-purple-600 text-xl">🎯</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Academic Support</h3>
              <p className="text-slate-600 text-sm">
                Utilize writing centres, library services, and academic advising to improve study habits and assessment scores.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-orange-100 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-orange-600 text-xl">💬</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Communication</h3>
              <p className="text-slate-600 text-sm">
                If struggling with a course, communicate with professors or advisors early for guidance and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full border border-yellow-200 mb-4">
              <span className="text-yellow-600">❓</span>
              <span className="text-sm font-semibold text-yellow-700">FAQ</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-4">
              Frequently Asked Questions about GPA Calculation in Sri Lanka
            </h2>
            <p className="text-slate-600">Everything you need to know about calculating your GPA</p>
          </div>

          <div className="space-y-4">
            {[
              { question: "What is the difference between SGPA and CGPA?", answer: "SGPA stands for Semester Grade Point Average, which is your GPA for a single semester only. CGPA, or Cumulative Grade Point Average, is the overall GPA for all the semesters you have completed in your degree program. The CGPA gives a long-term view of your academic performance." },
              { question: "How are 'Pass' or 'Fail' grades treated in a GPA calculation?", answer: "Typically, courses taken on a Pass/Fail basis are not included in the GPA calculation. A 'Pass' grade will earn you the course credits, but it won't affect your GPA. A 'Fail' grade in such a course also doesn't affect the GPA but results in no credits earned. However, for standard courses, a 'Fail' (often an 'E' grade) will be assigned 0 grade points and will significantly lower your GPA." },
              { question: "What happens if I have an 'Incomplete' grade on my transcript?", answer: "An 'Incomplete' (I) grade is a temporary placeholder and does not have a numerical grade point value. Therefore, it is excluded from your GPA calculation until a final letter grade is assigned by your professor. Once the final grade is submitted, you can update your calculation." },
              { question: "Why is my official GPA different from the one I calculated?", answer: "Discrepancies can occur for several reasons. You might be using an incorrect grading scale, have the wrong credit points for a course, or your institution may have specific policies regarding grade assessment that are not accounted for. For your official GPA, always refer to your academic transcript provided by the Registrar's Office." },
              { question: "Does this GPA calculator work for all Sri Lankan universities?", answer: "This tool is designed as a universal GPA calculator for Sri Lanka. However, since grading scales can vary slightly between institutions like the University of Colombo, University of Peradeniya, SLIIT, or NSBM, it's crucial to ensure the grade points you are using match your specific university's official scale for an accurate result." },
              { question: "What is a \"good\" GPA in Sri Lanka?", answer: "While this varies by institution and field of study, a cumulative GPA above 3.0 is generally considered good. A GPA above 3.5 is considered very good and makes you a strong candidate for scholarships and honours. A GPA above 3.7 often puts you in the category for a First Class Honours distinction." },
              { question: "How important is GPA for getting into graduate programs or finding a job?", answer: "Your GPA is a very important factor for both. Many graduate programs have minimum GPA requirements for admission. Similarly, many employers, especially for entry-level positions, use GPA as a screening tool to assess a candidate's discipline, competence, and ability to succeed in a challenging environment." },
              { question: "Where can I find the official number of credits for my courses?", answer: "The official number of credit points or credit hours for each unit of study can be found in your student handbook, the university's online course catalog, or on your official academic history available through the student portal. If in doubt, an enquiry with your Academic Advisor is the best course of action." },
              { question: "Can I use this tool to convert my GPA to a percentage?", answer: "There is no universal, official formula for converting a GPA back to a percentage, as the GPA scale is not linear. Any conversion would be a rough estimate. This tool focuses on providing your accurate GPA based on the 4.0 scale, which is the standard academic metric used by universities." },
              { question: "Can I calculate my GPA if I have a 'Withdrawn Fail' (WF) grade?", answer: "A 'Withdrawn Fail' (WF) grade is typically treated the same as a 'Fail' ('E') grade in GPA calculations. It is assigned 0 grade points and is included in the total credit hours, which will negatively impact your overall GPA. A 'Withdrawn Without Penalty' (W) is usually excluded." }
            ].map((faq, index) => (
              <details key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden group">
                <summary className="p-6 cursor-pointer hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-sm font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 group-open:text-blue-600 transition-colors">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="w-6 h-6 flex items-center justify-center">
                      <span className="text-slate-400 group-open:rotate-180 transition-transform">▼</span>
                    </div>
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <div className="pl-10">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
  
    </main>
  );
};

export default HomePage;
