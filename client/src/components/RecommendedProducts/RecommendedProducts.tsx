import ProductCard, { type Product } from '../ProductCard/ProductCard';

import watchImg from '../../assets/watch.png';
import shoesImg from '../../assets/shoes.png';
import backpackImg from '../../assets/backpack.png';
import smartwatchImg from '../../assets/smartwatch.png';
import skincareImg from '../../assets/skincare.png';

const recommendedProducts: Product[] = [
  {
    id: 101,
    name: 'Classic Leather Wristwatch for Men',
    image: watchImg,
    price: 120,
    originalPrice: 199,
    discount: 40,
    rating: 4.5,
    reviews: 1204,
  },
  {
    id: 102,
    name: 'Urban Streetwear Running Shoes',
    image: shoesImg,
    price: 65,
    originalPrice: 89,
    discount: 27,
    rating: 4.2,
    reviews: 850,
  },
  {
    id: 103,
    name: 'Waterproof Travel Backpack 20L',
    image: backpackImg,
    price: 45,
    originalPrice: 60,
    discount: 25,
    rating: 4.8,
    reviews: 2300,
  },
  {
    id: 104,
    name: 'Smart Fitness Tracker Watch Series 5',
    image: smartwatchImg,
    price: 199,
    originalPrice: 250,
    discount: 20,
    rating: 4.0,
    reviews: 450,
  },
  {
    id: 105,
    name: 'Organic Facial Cleanser 100ml',
    image: skincareImg,
    price: 25,
    originalPrice: 32,
    discount: 22,
    rating: 4.9,
    reviews: 3105,
  },
];

export default function RecommendedProducts() {
  return (
    <section id="recommended-section" className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6 pb-10">
      <div className="mb-5">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Recommended for You
        </h2>
        <div className="w-12 h-1 bg-primary rounded-full mt-2" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {recommendedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant="recommended"
          />
        ))}
      </div>
    </section>
  );
}
