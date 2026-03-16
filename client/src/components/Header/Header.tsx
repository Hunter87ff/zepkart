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
    "For You", //default selected
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
            console.log('Searching for:', searchQuery);
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white shadow-header w-full overflow-x-hidden">
            {/* Main Header Container */}
            <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
                {/* Desktop and Mobile layout wrapper */}
                <div className="flex flex-col lg:flex-row lg:items-center py-2 lg:py-0 lg:h-16 gap-3 lg:gap-4">
                    
                    {/* Row 1: Mobile Header (Logo & Actions) / Desktop Part 1 */}
                    <div className="flex items-center justify-between lg:justify-start gap-4 h-12 lg:h-auto">
                        {/* Mobile Menu Toggle */}
                        <button
                            id="mobile-menu-toggle"
                            className="lg:hidden p-1.5 -ml-1.5 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        {/* Logo */}
                        <Link
                            to="/"
                            id="header-logo"
                            className="flex items-center gap-2 shrink-0 mr-auto lg:mr-4"
                        >
                            <div className="bg-primary text-white w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg">
                                <ShoppingCart size={18} />
                            </div>
                            <span className="text-xl font-bold text-gray-800">
                                Zepkart
                            </span>
                        </Link>

                        {/* Mobile Actions - shown only on small screens next to logo */}
                        <div className="flex items-center gap-1 lg:hidden">
                            <Link
                                to="/cart"
                                className="relative p-2 text-gray-600 hover:text-primary transition-colors"
                            >
                                <ShoppingCart size={22} />
                                <span className="absolute top-1 right-1 bg-accent text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    2
                                </span>
                            </Link>
                            <button
                                onClick={() => navigate('/login')}
                                className="p-2 text-gray-600 hover:text-primary transition-colors"
                            >
                                <User size={22} />
                            </button>
                        </div>
                    </div>

                    {/* Search Bar - Responsive positioning */}
                    <form
                        onSubmit={handleSearch}
                        className="flex-1 w-full order-3 lg:order-none"
                    >
                        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg overflow-hidden transition-all duration-250 focus-within:border-primary focus-within:bg-white focus-within:shadow-[0_0_0_3px_rgba(40,116,240,0.1)]">
                            <div className="pl-3 text-gray-400 lg:hidden">
                                <Search size={18} />
                            </div>
                            <input
                                id="search-input"
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="flex-1 px-3 lg:px-4 py-2 lg:py-2.5 text-sm bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-400"
                            />
                            <button
                                id="search-button"
                                type="submit"
                                className="hidden lg:block px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-medium transition-colors"
                            >
                                Search
                            </button>
                            <button
                                type="submit"
                                className="lg:hidden p-2.5 text-primary"
                            >
                                <Search size={20} />
                            </button>
                        </div>
                    </form>

                    {/* Desktop Actions - Hidden on mobile, moved to sidebar or top row icons */}
                    <div className="hidden lg:flex items-center gap-2 ml-auto">
                        <Link
                            to="/orders"
                            id="nav-orders"
                            className="flex flex-col items-center px-3 py-1.5 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-primary transition-all"
                        >
                            <ClipboardList size={20} />
                            <span className="text-[10px] font-semibold mt-0.5">Orders</span>
                        </Link>

                        <Link
                            to="/cart"
                            id="nav-cart"
                            className="relative flex flex-col items-center px-3 py-1.5 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-primary transition-all"
                        >
                            <div className="relative">
                                <ShoppingCart size={20} />
                                <span className="absolute -top-1.5 -right-1.5 bg-accent text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                                    2
                                </span>
                            </div>
                            <span className="text-[10px] font-semibold mt-0.5">Cart</span>
                        </Link>

                        <button
                            id="nav-login"
                            onClick={() => navigate('/login')}
                            className="ml-2 flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-semibold transition-all shadow-sm active:scale-95"
                        >
                            <User size={16} />
                            <span>Login</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop Category Nav */}
            <nav className="border-t border-gray-100 bg-white hidden lg:block overflow-x-auto">
                <div className="max-w-[1400px] mx-auto px-4 lg:px-6">
                    <ul className="flex items-center gap-1">
                        {categories.map((cat) => (
                            <li key={cat}>
                                <button
                                    className="flex items-center gap-1 px-4 py-3 text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary-50 rounded-none border-b-2 border-transparent hover:border-primary transition-all"
                                >
                                    {cat}
                                    <ChevronDown size={14} className="opacity-50" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Mobile Sidebar Menu Overlay */}
            {mobileMenuOpen && (
                <div 
                    className="fixed inset-0 z-[60] lg:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
                    <aside 
                        className="absolute top-0 left-0 bottom-0 w-[280px] bg-white shadow-2xl flex flex-col animate-[slideIn_0.3s_ease-out]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-primary text-white">
                            <div className="flex items-center gap-2">
                                <User size={20} />
                                <span className="font-semibold">Guest User</span>
                            </div>
                            <button onClick={() => setMobileMenuOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-4 space-y-4">
                                <div>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Shop By Category</h3>
                                    <ul className="space-y-1">
                                        {categories.map((cat) => (
                                            <li key={cat}>
                                                <button className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:text-primary hover:bg-primary-50 rounded-lg transition-all flex items-center justify-between">
                                                    {cat}
                                                    <ChevronDown size={16} className="-rotate-90 opacity-40" />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                
                                <div className="pt-4 border-t border-gray-100">
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Account & Orders</h3>
                                    <ul className="space-y-1">
                                        <li>
                                            <Link to="/orders" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                                                <ClipboardList size={20} className="text-gray-400" />
                                                My Orders
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/cart" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg">
                                                <ShoppingCart size={20} className="text-gray-400" />
                                                My Cart
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-4 border-t border-gray-100 pb-8">
                            <button 
                                onClick={() => navigate('/login')}
                                className="w-full py-3 bg-primary text-white rounded-xl font-bold shadow-md shadow-primary/20 active:scale-[0.98] transition-all"
                            >
                                Login / Signup
                            </button>
                        </div>
                    </aside>
                </div>
            )}
        </header>
    );
}
