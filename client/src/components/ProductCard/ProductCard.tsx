import { Heart, ShoppingCart, Star } from 'lucide-react';

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  badge?: string;
  badgeColor?: string;
  label?: string;
  labelColor?: string;
}

interface ProductCardProps {
  product: Product;
  variant?: 'deal' | 'recommended';
}

export default function ProductCard({
  product,
  variant = 'recommended',
}: ProductCardProps) {
  const {
    name,
    image,
    price,
    originalPrice,
    rating,
    reviews,
    badge,
    badgeColor,
    label,
    labelColor,
  } = product;

  if (variant === 'deal') {
    return (
      <div className="group bg-white rounded-xl p-4 min-w-[180px] w-[200px] flex-shrink-0 cursor-pointer transition-all duration-250 hover:shadow-card-hover hover:-translate-y-1 border border-gray-100">
        {/* Image */}
        <div className="relative aspect-square mb-3 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50">
          {badge && (
            <span
              className="absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 rounded-md z-10"
              style={{ backgroundColor: badgeColor || '#ff6161' }}
            >
              {badge}
            </span>
          )}
          <img
            src={image}
            alt={name}
            className="max-h-[120px] max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Info */}
        <h3 className="text-sm font-medium text-gray-800 truncate mb-1">
          {name}
        </h3>
        <p
          className="text-xs font-medium mb-1.5"
          style={{ color: labelColor || '#388e3c' }}
        >
          {label || 'Free Delivery'}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">₹{price}</span>
          <span className="text-sm text-gray-400 line-through">
            ₹{originalPrice}
          </span>
        </div>
      </div>
    );
  }

  // Recommended variant
  return (
    <div className="group bg-white rounded-xl overflow-hidden transition-all duration-250 hover:shadow-card-hover hover:-translate-y-1 cursor-pointer border border-gray-100">
      {/* Image */}
      <div className="relative aspect-square p-4 flex items-center justify-center bg-gray-50">
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-gray-300 hover:text-danger transition-colors duration-150 z-10 opacity-0 group-hover:opacity-100">
          <Heart size={16} />
        </button>
        <img
          src={image}
          alt={name}
          className="max-h-[140px] max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Info */}
      <div className="p-3.5">
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 min-h-[40px] leading-snug">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1 bg-success text-white text-[11px] font-semibold px-1.5 py-0.5 rounded">
            {rating} <Star size={10} fill="white" />
          </span>
          <span className="text-xs text-gray-400">
            ({reviews.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-gray-900">${price}</span>
            <span className="text-xs text-gray-400 line-through">
              ₹{originalPrice}
            </span>
          </div>
          <button className="w-8 h-8 rounded-lg bg-primary hover:bg-primary-dark text-white flex items-center justify-center transition-all duration-150 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0">
            <ShoppingCart size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
