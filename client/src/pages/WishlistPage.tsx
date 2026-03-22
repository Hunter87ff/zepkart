import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import apiClient from '../utils/api-client';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function WishlistPage() {
    const { isAuthenticated, loading: authLoading } = useAuth();
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        if (!isAuthenticated) return;
        try {
            setLoading(true);
            const res = await apiClient.get('/wishlist');
            setProducts(res.data.data.products || []);
        } catch (error) {
            console.error('Failed to fetch wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, [isAuthenticated]);

    const handleRemove = async (productId: string) => {
        try {
            await apiClient.delete(`/wishlist/products/${productId}`);
            setProducts(products.filter(p => p._id !== productId));
        } catch (error) {
            console.error('Failed to remove from wishlist:', error);
        }
    };

    const handleAddToCart = async (productId: string) => {
        try {
            await addToCart(productId, 1);
            // Optionally remove from wishlist after adding to cart?
            // User usually expects it to stay unless they manually remove it, 
            // but let's keep it simple.
        } catch (error) {
            console.error('Failed to add to cart:', error);
        }
    };

    if (authLoading || (loading && isAuthenticated)) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Header />
                <main className="flex-1 flex items-center justify-center p-4">
                    <div className="bg-white p-10 rounded-3xl shadow-card text-center max-w-md border border-gray-100">
                        <div className="w-20 h-20 bg-primary-light/30 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                            <Heart size={40} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">My Wishlist</h2>
                        <p className="text-gray-500 mb-8">Login to see the items you've saved for later or to start adding favorites.</p>
                        <button 
                            onClick={() => navigate('/login')}
                            className="w-full py-4 bg-primary text-white font-bold rounded-2xl transition-all shadow-md active:scale-95 uppercase tracking-wide"
                        >
                            Login Now
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1 max-w-[1200px] mx-auto px-4 lg:px-6 py-8 w-full">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 shadow-sm border border-rose-100">
                        <Heart size={24} fill="currentColor" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Wishlist</h1>
                        <p className="text-sm text-gray-500">{products.length} {products.length === 1 ? 'item' : 'items'} saved</p>
                    </div>
                </div>

                {products.length === 0 ? (
                    <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                            <Heart size={48} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Empty Wishlist?</h2>
                        <p className="text-gray-500 mb-8 max-w-xs mx-auto">You haven't added any items to your wishlist yet. Explore our products and save what you love!</p>
                        <Link 
                            to="/"
                            className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary/20 active:scale-95"
                        >
                            Start Shopping <ArrowRight size={18} />
                        </Link>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <div key={product._id} className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col">
                                <div className="relative aspect-square p-6 bg-gray-50/50 flex items-center justify-center group-hover:bg-white transition-colors">
                                    <img 
                                        src={product.images?.[0] || product.image || 'https://placehold.co/400x400?text=Product'} 
                                        alt={product.name}
                                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <button 
                                        onClick={() => handleRemove(product._id)}
                                        className="absolute top-4 right-4 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-400 hover:text-rose-500 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <div className="p-5 flex-1 flex flex-col">
                                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
                                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                                    </h3>
                                    
                                    <div className="flex items-center gap-2 mt-auto mb-5">
                                        <span className="text-xl font-black text-gray-900">₹{product.price.toFixed(0)}</span>
                                        {product.discount?.[0] > 0 && (
                                            <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">
                                                {product.discount[0]}% OFF
                                            </span>
                                        )}
                                    </div>

                                    <button 
                                        onClick={() => handleAddToCart(product._id)}
                                        className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md shadow-primary/10"
                                    >
                                        <ShoppingCart size={16} /> Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
