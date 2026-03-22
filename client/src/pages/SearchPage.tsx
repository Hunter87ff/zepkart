import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ProductCard from '../components/ProductCard/ProductCard';
import { getProducts } from '../utils/api';
import type { Product } from '../types/api';
import { Search } from 'lucide-react';

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchResults() {
            setLoading(true);
            try {
                const data = await getProducts({ q: query });
                setProducts(data);
            } catch (error) {
                console.error('Search failed:', error);
            } finally {
                setLoading(false);
            }
        }
        if (query) {
            fetchResults();
        } else {
            setProducts([]);
            setLoading(false);
        }
    }, [query]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-1 max-w-[1400px] mx-auto px-4 lg:px-6 py-8 w-full">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Search className="text-primary" size={24} />
                        {query ? `Search results for "${query}"` : 'Search Products'}
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {loading ? 'Searching...' : `${products.length} products found`}
                    </p>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="aspect-[4/5] bg-white animate-pulse rounded-xl border border-gray-100" />
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {products.map((product) => (
                            <ProductCard key={product.id || product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search size={32} className="text-gray-300" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">No products found</h2>
                        <p className="text-gray-500 mt-2 max-w-md mx-auto">
                            We couldn't find any products matching your search. Try different keywords or check out our recommended products.
                        </p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
