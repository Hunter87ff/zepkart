import { useState, useEffect, useRef } from 'react';
import { Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard, { type Product } from '../ProductCard/ProductCard';

// Import product images
import headphonesImg from '../../assets/headphones.png';
import shoesImg from '../../assets/shoes.png';
import laptopImg from '../../assets/laptop.png';
import cameraImg from '../../assets/camera.png';
import smartphoneImg from '../../assets/smartphone.png';

const dealProducts: Product[] = [
  {
    id: 1,
    name: 'Sony Noise Cancelling Headphones',
    image: headphonesImg,
    price: 149,
    originalPrice: 249,
    discount: 40,
    rating: 4.5,
    reviews: 1204,
    badge: '-40%',
    badgeColor: '#ff6161',
    label: 'Free Delivery',
    labelColor: '#388e3c',
  },
  {
    id: 2,
    name: 'Nike Air Zoom Pegasus',
    image: shoesImg,
    price: 89,
    originalPrice: 120,
    discount: 25,
    rating: 4.2,
    reviews: 850,
    badge: '-25%',
    badgeColor: '#ff6161',
    label: 'Best Seller',
    labelColor: '#fb641b',
  },
  {
    id: 3,
    name: 'MacBook Air M2 Chip',
    image: laptopImg,
    price: 999,
    originalPrice: 1199,
    discount: 15,
    rating: 4.8,
    reviews: 2300,
    badge: '-15%',
    badgeColor: '#ff9f00',
    label: 'Few Left',
    labelColor: '#ff9f00',
  },
  {
    id: 4,
    name: 'Polaroid Now I-Type',
    image: cameraImg,
    price: 99,
    originalPrice: 140,
    discount: 30,
    rating: 4.0,
    reviews: 450,
    badge: '-30%',
    badgeColor: '#ff6161',
    label: 'Free Delivery',
    labelColor: '#388e3c',
  },
  {
    id: 5,
    name: 'Samsung Galaxy S23',
    image: smartphoneImg,
    price: 799,
    originalPrice: 899,
    discount: 10,
    rating: 4.6,
    reviews: 3105,
    badge: '-10%',
    badgeColor: '#388e3c',
    label: 'Exchange Offer',
    labelColor: '#fb641b',
  },
  {
    id: 43,
    name: 'Sony Noise Cancelling Headphones',
    image: headphonesImg,
    price: 149,
    originalPrice: 249,
    discount: 40,
    rating: 4.5,
    reviews: 1204,
    badge: '-40%',
    badgeColor: '#ff6161',
    label: 'Free Delivery',
    labelColor: '#388e3c',
  },
];

function useCountdown(targetHours = 14, targetMinutes = 23, targetSeconds = 51) {
  const [time, setTime] = useState({
    hours: targetHours,
    minutes: targetMinutes,
    seconds: targetSeconds,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

export default function DealsOfTheDay() {
  const { hours, minutes, seconds } = useCountdown();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section id="deals-section" className="max-w-350 mx-auto px-4 lg:px-6 py-6">
      <div className="bg-white rounded-2xl shadow-card p-5 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center sm:text-left">
              Deals of the Day
            </h2>
            <div className="flex items-center gap-2 text-sm font-mono bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">
              <Flame size={16} className="text-danger animate-pulse" />
              <div className="flex items-center gap-1.5">
                <span className="bg-gray-900 text-white px-2 py-0.5 rounded text-sm font-bold min-w-[28px] text-center">
                  {pad(hours)}
                </span>
                <span className="text-gray-400 font-bold">:</span>
                <span className="bg-gray-900 text-white px-2 py-0.5 rounded text-sm font-bold min-w-[28px] text-center">
                  {pad(minutes)}
                </span>
                <span className="text-gray-400 font-bold">:</span>
                <span className="bg-gray-900 text-white px-2 py-0.5 rounded text-sm font-bold min-w-[28px] text-center">
                  {pad(seconds)}
                </span>
              </div>
              <span className="text-gray-500 text-[10px] font-bold uppercase tracking-tighter">Left</span>
            </div>
          </div>

          <button
            id="view-all-deals"
            className="w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-sm font-bold rounded-lg transition-all shadow-sm active:scale-95"
          >
            View All Deals
          </button>
        </div>

        {/* Products Scroll */}
        <div className="relative group/scroll">
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-primary opacity-0 group-hover/scroll:opacity-100 transition-opacity duration-200 -translate-x-2"
          >
            <ChevronLeft size={20} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {dealProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant="deal"
              />
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-primary opacity-0 group-hover/scroll:opacity-100 transition-opacity duration-200 translate-x-2"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
