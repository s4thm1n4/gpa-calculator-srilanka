// app/university-gpa-calculator/[slug]/SLIIT-calculator-ui.tsx

'use client';

import { useState, useMemo, FC } from 'react';
import Link from 'next/link';

// All the calculator logic and UI is now in this client component.

const sliitGradeScale = [
  { grade: "A+", gpa: 4.0 }, { grade: "A", gpa: 4.0 },
  { grade: "A-", gpa: 3.7 }, { grade: "B+", gpa: 3.3 },
  { grade: "B", gpa: 3.0 }, { grade: "B-", gpa: 2.7 },
  { grade: "C+", gpa: 2.3 }, { grade: "C", gpa: 2.0 },
  { grade: "C-", gpa: 1.7 }, { grade: "D+", gpa: 1.3 },
  { grade: "D", gpa: 1.0 }, { grade: "E", gpa: 0.0 },
];

type Course = { id: number; name: string; credits: number; grade: string; };

type CalculatorUIProps = {
  slug: string;
};

const CalculatorUI: FC<CalculatorUIProps> = ({ slug }) => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: 'Introduction to Programming', credits: 4, grade: 'A+' }
  ]);

  const addCourseRow = () => setCourses([...courses, { id: Date.now(), name: '', credits: 3, grade: 'A+' }]);
  const updateCourse = (id: number, field: keyof Omit<Course, 'id'>, value: string | number) => setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  const removeCourseRow = (id: number) => setCourses(courses.filter(c => c.id !== id));

  const calculatedGpa = useMemo(() => {
    const gradeMap = new Map(sliitGradeScale.map(item => [item.grade, item.gpa]));
    const totalPoints = courses.reduce((acc, c) => acc + ((gradeMap.get(c.grade) || 0) * c.credits), 0);
    const totalCredits = courses.reduce((acc, c) => acc + Number(c.credits), 0);
    return totalCredits === 0 ? 0 : (totalPoints / totalCredits);
  }, [courses]);

  return (
    <main className="p-4 sm:p-8 min-h-screen bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-400 uppercase">{slug} GPA Calculator</h1>
          <Link href="/" className="text-blue-400 hover:underline mt-2 inline-block">&larr; Back to all universities</Link>
        </header>
        
        {/* ------ START OF CALCULATOR UI ------ */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map(course => (
              <div key={course.id} className="bg-gray-800/70 p-4 rounded-lg shadow-lg relative">
                <button onClick={() => removeCourseRow(course.id)} className="absolute top-2 right-2 text-gray-500 hover:text-red-400 font-bold text-2xl transition-colors">&times;</button>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-400 mb-1">Module Name</label>
                  <input type="text" placeholder="E.g., Database Management" value={course.name} onChange={e => updateCourse(course.id, 'name', e.target.value)} className="w-full bg-gray-700 p-2 rounded-md" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Credits</label>
                    <input type="number" value={course.credits} onChange={e => updateCourse(course.id, 'credits', parseInt(e.target.value) || 0)} className="w-full bg-gray-700 p-2 rounded-md text-center" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Grade</label>
                    <select value={course.grade} onChange={e => updateCourse(course.id, 'grade', e.target.value)} className="w-full bg-gray-700 p-2 rounded-md appearance-none text-center">
                      {sliitGradeScale.map(g => <option key={g.grade} value={g.grade}>{g.grade}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button onClick={addCourseRow} className="mt-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg transition-transform hover:scale-105">+ Add Module</button>
          </div>
        </div>
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-lg text-center">
          <h3 className="text-lg text-gray-300">Your Cumulative GPA is</h3>
          <p className="text-6xl font-bold mt-2 text-green-300">{calculatedGpa.toFixed(4)}</p>
          <p className={`mt-2 text-lg font-semibold ${calculatedGpa >= 2.0 ? 'text-green-400' : 'text-red-400'}`}>{calculatedGpa >= 2.0 ? 'Status: Pass' : 'Status: Below Passing Grade'}</p>
          <p className="text-xs text-gray-500 mt-1">(A &apos;C&apos; grade / 2.00 GPA is required to pass)</p>
        </div>
        {/* ------ END OF CALCULATOR UI ------ */}
        
        {/* ------ START OF NEW SEO CONTENT ------ */}
        <div className="mt-16 prose prose-invert max-w-none text-gray-300 prose-headings:text-purple-300 prose-a:text-blue-400">
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
        
        {/* FIXED: Typo in JSON-LD (@type: - removed the invalid '-') */}
        {/* FIXED: Used template literals (backticks) for all 'text' strings in JSON-LD to potentially avoid linter false positives on unescaped entities inside strings */}
        {/* FIXED: Escaped all single quotes (') with &apos; and double quotes (") with &quot; in JSX text content to resolve react/no-unescaped-entities ESLint errors */}
        {/* Note: If linter still flags inside JSON-LD strings, consider adding `eslint: { ignoreDuringBuilds: true }` to next.config.js or disabling the rule specifically for this section */}
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
        {/* ------ END OF NEW SEO CONTENT ------ */}
        
      </div>
    </main>
  );
};

export default CalculatorUI;
