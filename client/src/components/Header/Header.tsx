import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ShoppingCart,
  ClipboardList,
  User,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';

const categories = [
  'Mobiles',
  'Fashion',
  'Home & Furniture',
  'Electronics',
  'Appliances',
  'Toys',
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Future: navigate to search results
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-header">
      {/* Top Bar */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
        <div className="flex items-center gap-4 h-[60px]">
          {/* Logo */}
          <Link
            to="/"
            id="header-logo"
            className="flex items-center gap-2 shrink-0"
          >
            <div className="bg-primary text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg">
              <ShoppingCart size={18} />
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">
              Zepkart
            </span>
          </Link>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-[600px] relative"
          >
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden transition-all duration-250 focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(40,116,240,0.1)]">
              <input
                id="search-input"
                type="text"
                placeholder="Search for products, brands and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2.5 text-sm bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-400"
              />
              <button
                id="search-button"
                type="submit"
                className="px-4 py-2.5 bg-primary hover:bg-primary-dark text-white transition-colors duration-150"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/orders"
              id="nav-orders"
              className="flex flex-col items-center px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors duration-150 text-gray-600 hover:text-gray-800"
            >
              <ClipboardList size={20} />
              <span className="text-[10px] font-medium mt-0.5 hidden sm:block">
                Orders
              </span>
            </Link>

            <Link
              to="/cart"
              id="nav-cart"
              className="relative flex flex-col items-center px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors duration-150 text-gray-600 hover:text-gray-800"
            >
              <div className="relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  2
                </span>
              </div>
              <span className="text-[10px] font-medium mt-0.5 hidden sm:block">
                Cart
              </span>
            </Link>

            <button
              id="nav-login"
              onClick={() => navigate('/login')}
              className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-medium transition-colors duration-150 ml-1"
            >
              <User size={16} />
              <span className="hidden sm:inline">Login</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle"
              className="lg:hidden p-2 rounded-lg hover:bg-gray-50 text-gray-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Category Nav */}
      <nav className="border-t border-gray-100 bg-white hidden lg:block">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
          <ul className="flex items-center gap-1">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary-light rounded-md transition-all duration-150"
                >
                  {cat}
                  <ChevronDown size={14} className="opacity-50" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-lg animate-[slideDown_0.2s_ease]">
          <div className="px-4 py-3">
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat}>
                  <button className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary-light rounded-lg transition-all duration-150">
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
