import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
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
            <p className="text-slate-300 mb-4">
              The most comprehensive and accurate GPA calculator for Sri Lankan university students. Calculate your SGPA, CGPA, and track your academic progress with precision.
            </p>
            <p className="text-slate-400 text-sm">
              © 2024 GPA Calculator Sri Lanka. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/generic-gpa-calculator" className="hover:text-white transition-colors">Generic Calculator</Link></li>
              <li><Link href="/university-gpa-calculator/sliit" className="hover:text-white transition-colors">SLIIT Calculator</Link></li>
              <li><a href="#universities" className="hover:text-white transition-colors">All Universities</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Quick Calculate</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Universities</h4>
            <ul className="space-y-2 text-slate-300">
              <li><span className="text-green-400">✓</span> SLIIT</li>
              <li><span className="text-yellow-400">⏳</span> University of Colombo</li>
              <li><span className="text-yellow-400">⏳</span> University of Moratuwa</li>
              <li><span className="text-yellow-400">⏳</span> University of Peradeniya</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400 text-sm">
            Made with ❤️ for Sri Lankan students. Calculate your GPA with confidence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;