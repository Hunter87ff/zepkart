import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full text-center">
          {/* 404 Visual */}
          <div className="relative mb-8">
            <h1 className="text-[150px] font-black text-primary/5 select-none leading-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center rotate-12 border border-gray-100">
                <Search className="text-primary" size={48} />
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-10 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back to something more useful.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/" 
              className="flex-1 px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Home size={20} />
              Go to Homepage
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="flex-1 px-6 py-3.5 bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-700 font-bold rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <ArrowLeft size={20} />
              Go Back
            </button>
          </div>

          {/* Suggested Links */}
          <div className="mt-12 pt-8 border-t border-gray-200/60">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
              Try searching for
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Electronics', 'Fashion', 'Home & Kitchen', 'Offers'].map((tag) => (
                <Link 
                  key={tag}
                  to={`/search?q=${encodeURIComponent(tag)}`}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-medium rounded-full transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
