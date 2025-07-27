'use client';

import Link from 'next/link';
import { universities } from '@/lib/universities'; // Reuse the dynamic list

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-lg font-bold">G</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">GPA Calculator Sri Lanka</h3>
                <p className="text-slate-400 text-sm">Accurate academic performance calculation</p>
              </div>
            </div>
            <p className="text-slate-300">
              The most comprehensive and accurate GPA calculator for Sri Lankan university students. Calculate your SGPA, CGPA, and track your academic progress with precision.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-200 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Calculators (Dynamic) */}
          <div>
            <h4 className="font-semibold mb-4 text-slate-200 uppercase tracking-wider text-sm">Calculators</h4>
            <ul className="space-y-2 text-slate-300">
              {universities.map(uni => (
                <li key={uni.id}>
                  <Link href={`/university-gpa-calculator/${uni.id}`} className="hover:text-white transition-colors">
                    <span className="text-green-400">✓</span> {uni.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="mt-10 pt-8 border-t border-slate-700">
            <div className="bg-yellow-100/10 border border-yellow-400/30 text-yellow-200 rounded-lg p-4 text-center">
                <h4 className="font-bold text-lg mb-2">⚠️ Important Disclaimer</h4>
                <p className="text-sm">
                    This website is NOT official and is NOT affiliated with any university. This is a personal project created for educational and non-commercial purposes only. All GPA calculations are based on publicly available information and should be verified with official academic records.
                </p>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-700 text-center">
          <p className="text-slate-400 text-sm">
            &copy; {currentYear} GPA Calculator Sri Lanka. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
