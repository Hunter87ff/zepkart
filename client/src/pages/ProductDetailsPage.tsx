import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { 
  Star, 
  ShoppingCart, 
  Zap, 
  Heart, 
  Share2, 
  ShieldCheck, 
  RotateCcw, 
  Truck,
  Check,
  ChevronRight
} from 'lucide-react';

import headphonesImg from '../assets/headphones.png';
import shoesImg from '../assets/shoes.png';

// Mock products data
const products = [
  {
    id: 1,
    name: 'Premium Noise Cancelling Wireless Over-Ear Headphones',
    image: headphonesImg,
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.8,
    reviews: 1250,
    description: 'Experience world-class noise cancellation with these premium wireless headphones. Featuring up to 30 hours of battery life, touch controls, and crystal-clear sound quality.',
    features: [
      'Industry-leading noise cancellation',
      '30-hour battery life',
      'Touch sensor controls',
      'Quick charge (10 min for 5 hours playback)',
      'Superior call quality'
    ],
    category: 'Electronics',
    stock: 15,
    brand: 'SonicMaster'
  },
  {
    id: 2,
    name: "Men's Speed Running Shoes - Breathable Mesh",
    image: shoesImg,
    price: 85,
    originalPrice: 120,
    discount: 29,
    rating: 4.5,
    reviews: 850,
    description: 'Lightweight and breathable running shoes designed for speed and comfort. Perfect for daily runs and intense workouts.',
    features: [
      'Breathable mesh upper',
      'Responsive cushioning',
      'Durable rubber outsole',
      'Lightweight design',
      'Supportive fit'
    ],
    category: 'Footwear',
    stock: 5,
    brand: 'FitRun'
  }
];

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Find product or use default
  const product = products.find(p => p.id === Number(id)) || products[0];

  const images = [product.image, product.image, product.image]; // Mock multiple images

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-3">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight size={12} />
              <span className="hover:text-primary cursor-pointer">{product.category}</span>
              <ChevronRight size={12} />
              <span className="text-gray-900 font-medium truncate">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-8">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Column - Images */}
            <div className="lg:w-[45%]">
              <div className="sticky top-[100px]">
                <div className="flex flex-col-reverse md:flex-row gap-4">
                  {/* Thumbnails */}
                  <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 flex items-center justify-center p-2 bg-gray-50 transition-all ${
                          selectedImage === idx ? 'border-primary' : 'border-transparent hover:border-gray-200'
                        }`}
                      >
                        <img src={img} alt="" className="max-w-full max-h-full object-contain" />
                      </button>
                    ))}
                  </div>
                  
                  {/* Main Image */}
                  <div className="flex-1 aspect-square bg-gray-50 rounded-2xl flex items-center justify-center p-8 relative overflow-hidden group">
                    <button 
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all ${
                        isWishlisted ? 'text-danger' : 'text-gray-300 hover:text-danger'
                      }`}
                    >
                      <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                    </button>
                    <button className="absolute top-16 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-primary transition-all">
                      <Share2 size={18} />
                    </button>
                    <img 
                      src={images[selectedImage]} 
                      alt={product.name} 
                      className="max-w-full max-h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Buy Buttons - Desktop */}
                <div className="hidden lg:flex gap-4 mt-8">
                  <button className="flex-1 py-4 bg-yellow hover:bg-yellow-dark text-gray-900 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 uppercase tracking-wide">
                    <ShoppingCart size={20} /> Add to Cart
                  </button>
                  <button className="flex-1 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 uppercase tracking-wide">
                    <Zap size={20} /> Buy Now
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:w-[55%] pb-10">
              <div className="mb-6">
                <span className="text-sm font-semibold text-primary mb-2 block uppercase tracking-wider">{product.brand}</span>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {product.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1.5 bg-success text-white px-2 py-0.5 rounded text-sm font-bold">
                    {product.rating} <Star size={14} fill="currentColor" />
                  </div>
                  <span className="text-sm font-medium text-gray-400">
                    {product.reviews.toLocaleString()} Ratings & {Math.floor(product.reviews/5)} Reviews
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                  <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                  <span className="text-lg font-bold text-success">{product.discount}% off</span>
                </div>
                
                {product.stock <= 5 && (
                  <p className="text-sm font-bold text-danger mb-6">Hurry, only {product.stock} left!</p>
                )}

                {/* Offers */}
                <div className="bg-success-light/30 rounded-xl p-4 mb-8">
                  <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    Available Offers
                  </h3>
                  <ul className="space-y-2">
                    {[
                      'Bank Offer 10% off on HDFC Bank Credit Cards, up to ₹1,250',
                      'Special Price Get extra 15% off (price inclusive of cashback/coupon)',
                      'Partner Offer Sign up for Zepkart Pay Later and get ₹100 Gift Card'
                    ].map((offer, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-700">
                        <Check size={16} className="text-success shrink-0" />
                        <span>{offer}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Service Highlights */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  {[
                    { icon: Truck, text: 'Free Delivery', sub: 'by Tomorrow' },
                    { icon: ShieldCheck, text: '1 Year Warranty', sub: 'Brand Assured' },
                    { icon: RotateCcw, text: '7 Days Return', sub: 'Hassle-free' },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center p-3 rounded-xl bg-gray-50 text-center border border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary mb-2 shadow-sm">
                        <item.icon size={20} />
                      </div>
                      <span className="text-xs font-bold text-gray-900">{item.text}</span>
                      <span className="text-[10px] text-gray-400">{item.sub}</span>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Product Description</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {product.description}
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Fixed CTA */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3 z-40 flex gap-3">
          <button className="flex-1 py-3 border border-gray-200 text-gray-900 font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:bg-gray-50">
            <ShoppingCart size={20} /> Add to Cart
          </button>
          <button className="flex-1 py-3 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:bg-primary-dark">
            <Zap size={20} /> Buy Now
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
