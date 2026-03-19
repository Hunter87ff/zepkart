import { useState, useEffect } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import { getProducts } from '../../utils/api';
import type { Product } from '../../types/api';

export default function RecommendedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommended() {
      try {
        const data = await getProducts({ limit: 10, sort: 'rating' });
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch recommended products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecommended();
  }, []);

  return (
    <section id="recommended-section" className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6 pb-10">
      <div className="mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Recommended for You
        </h2>
        <div className="w-12 h-1 bg-primary rounded-full mt-2" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {loading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="aspect-[4/5] bg-gray-50 animate-pulse rounded-xl" />
          ))
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id || product._id}
              product={product}
              variant="recommended"
            />
          ))
        )}
      </div>
    </section>
  );
}
