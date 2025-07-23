import Link from 'next/link';

const Header = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg font-bold">G</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-slate-800">GPA Calculator Sri Lanka</h1>
              <p className="text-xs text-slate-500">Accurate GPA & CGPA Calculation</p>
            </div>
            
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              href="/#universities" 
              className="hidden sm:block text-slate-600 hover:text-blue-600 transition-colors font-medium"
            >
              Universities
            </Link>
            <Link 
              href="/#calculator" 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 font-medium text-sm"
            >
              Quick Calculate
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;