import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { getProductById } from '../utils/api';
import { useCart } from '../contexts/CartContext';
import apiClient from '../utils/api-client';
import type { Product } from '../types/api';
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

const IconMap = {
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  ShoppingCart,
  Zap,
  Heart,
  Share2,
  Check
};

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = async (goToCart = false) => {
    if (!id) return;
    try {
      setAddingToCart(true);
      await addToCart(id, 1);
      if (goToCart) {
        navigate('/cart');
      } else {
        alert('Product added to cart!');
      }
    } catch (err: any) {
      console.error('Failed to add to cart:', err);
      if (err.status === 401) {
        navigate('/login', { state: { from: { pathname: `/product/${id}` } } });
      } else {
        alert(err.message || 'Failed to add to cart');
      }
    } finally {
      setAddingToCart(false);
    }
  };

  const handleToggleWishlist = async () => {
    if (!id) return;
    try {
        if (isWishlisted) {
            await apiClient.delete(`/wishlist/products/${id}`);
            setIsWishlisted(false);
        } else {
            await apiClient.post(`/wishlist/products/${id}`);
            setIsWishlisted(true);
        }
    } catch (err: any) {
        console.error('Wishlist toggle failed:', err);
        if (err.response?.status === 401) {
            navigate('/login', { state: { from: { pathname: `/product/${id}` } } });
        }
    }
  };

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      try {
        setLoading(true);
        const [productData, wishlistRes] = await Promise.all([
            getProductById(id),
            apiClient.get('/wishlist').catch(() => ({ data: { data: { products: [] } } }))
        ]);
        setProduct(productData);
        const wishlistProducts = wishlistRes.data.data.products || [];
        setIsWishlisted(wishlistProducts.some((p: any) => p._id === id));
      } catch (err: any) {
        console.error('Failed to fetch product:', err);
        setError(err.message || 'Product not found');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-500 mb-6">{error || 'Product not found'}</p>
          <Link to="/" className="px-6 py-2 bg-primary text-white rounded-lg font-bold">
            Back to Home
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image || ''];
  const discountPercent = product.discount?.[0] || 0;
  const originalPrice = product.mrp || Math.round(product.price / (1 - discountPercent / 100));

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
              <span className="hover:text-primary cursor-pointer">{product.categories?.[0] || 'Uncategorized'}</span>
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
                        className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 flex items-center justify-center p-1.5 bg-gray-50 transition-all shrink-0 ${
                          selectedImage === idx ? 'border-primary shadow-sm' : 'border-transparent hover:border-gray-200'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-contain" />
                      </button>
                    ))}
                  </div>
                  
                  {/* Main Image */}
                  <div className="flex-1 aspect-[1/1] sm:aspect-[4/5] md:aspect-square lg:aspect-[4/5] bg-gray-50 rounded-2xl flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden group shadow-sm border border-gray-100">
                    <button 
                      onClick={handleToggleWishlist}
                      className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all z-10 ${
                        isWishlisted ? 'text-rose-500' : 'text-gray-300 hover:text-rose-500'
                      }`}
                    >
                      <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                    </button>
                    <button className="absolute top-16 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-400 hover:text-primary transition-all z-10">
                      <Share2 size={18} />
                    </button>
                    <img 
                      src={images[selectedImage]} 
                      alt={product.name} 
                      className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Buy Buttons - Desktop */}
                <div className="hidden lg:flex gap-4 mt-8">
                  <button 
                    onClick={() => handleAddToCart(false)}
                    disabled={addingToCart || product.stock === 0}
                    className="flex-1 py-4 bg-yellow hover:bg-yellow-dark text-gray-900 font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 uppercase tracking-wide disabled:opacity-50"
                  >
                    <ShoppingCart size={20} /> {addingToCart ? 'Adding...' : 'Add to Cart'}
                  </button>
                  <button 
                    onClick={() => handleAddToCart(true)}
                    disabled={addingToCart || product.stock === 0}
                    className="flex-1 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 uppercase tracking-wide disabled:opacity-50"
                  >
                    <Zap size={20} /> Buy Now
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:w-[55%] pb-10">
              <div className="mb-6">
                <span className="text-sm font-semibold text-primary mb-2 block uppercase tracking-wider">
                  {typeof product.store === 'object' ? product.store.name : 'Zepkart Assured'}
                </span>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {product.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1.5 bg-success text-white px-2 py-0.5 rounded text-sm font-bold">
                    {product.rating} <Star size={14} fill="currentColor" />
                  </div>
                  <span className="text-sm font-medium text-gray-400">
                    {product.rating_count.toLocaleString()} Ratings
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                  {discountPercent > 0 && (
                    <>
                      <span className="text-lg text-gray-400 line-through">₹{originalPrice}</span>
                      <span className="text-lg font-bold text-success">{discountPercent}% off</span>
                    </>
                  )}
                </div>
                
                {/* Stock Status */}
                {(() => {
                  const stock = product.stock;
                  let stockInfo = { text: "In Stock", color: "text-success", dot: "bg-success", bg: "bg-success/5", border: "border-success/20" };
                  
                  if (stock === 0) {
                    stockInfo = { text: "Out of Stock", color: "text-danger", dot: "bg-danger", bg: "bg-danger/5", border: "border-danger/20" };
                  } else if (stock <= 10) {
                    stockInfo = { text: `Hurry, only ${stock} items left!`, color: "text-danger", dot: "bg-danger", bg: "bg-danger/5", border: "border-danger/20" };
                  } else if (stock <= 50) {
                    stockInfo = { text: `${stock} items available`, color: "text-warning", dot: "bg-warning", bg: "bg-warning/5", border: "border-warning/20" };
                  } else {
                    stockInfo = { text: `${stock} items available`, color: "text-success", dot: "bg-success", bg: "bg-success/5", border: "border-success/20" };
                  }

                  return (
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-6 border ${stockInfo.bg} ${stockInfo.border}`}>
                      <div className={`w-2 h-2 rounded-full ${stockInfo.dot} ${stock !== 0 ? 'animate-pulse' : ''}`}></div>
                      <span className={`text-sm font-bold ${stockInfo.color}`}>{stockInfo.text}</span>
                    </div>
                  );
                })()}

                {/* Offers */}
                {product.misc?.offers && product.misc.offers.length > 0 && (
                  <div className="bg-success-light/30 rounded-xl p-4 mb-8">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                      Available Offers
                    </h3>
                    <ul className="space-y-2">
                      {product.misc.offers.map((offer, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-700">
                          <Check size={16} className="text-success shrink-0" />
                          <span>{offer}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Service Highlights */}
                {product.misc?.service_highlights && product.misc.service_highlights.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    {product.misc.service_highlights.map((item, i) => {
                      const IconComponent = (IconMap as any)[item.icon] || Truck;
                      return (
                        <div key={i} className="flex flex-col items-center p-3 rounded-xl bg-gray-50 text-center border border-gray-100">
                          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary mb-2 shadow-sm">
                            <IconComponent size={20} />
                          </div>
                          <span className="text-xs font-bold text-gray-900">{item.text}</span>
                          {item.subtext && <span className="text-[10px] text-gray-400">{item.subtext}</span>}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Product Description</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 whitespace-pre-line">
                    {product.description}
                  </p>
                  {product.misc && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Specifications</h4>
                      <dl className="grid grid-cols-2 gap-2 text-sm">
                        {product.sku && (
                          <>
                            <dt className="text-gray-500">SKU</dt>
                            <dd className="font-medium text-gray-900">{product.sku}</dd>
                          </>
                        )}
                        {product.misc.warranty && (
                          <>
                            <dt className="text-gray-500">Warranty</dt>
                            <dd className="font-medium text-gray-900">{product.misc.warranty}</dd>
                          </>
                        )}
                      </dl>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Fixed CTA */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3 z-40 flex gap-3">
          <button 
            onClick={() => handleAddToCart(false)}
            disabled={addingToCart || product.stock === 0}
            className="flex-1 py-3 border border-gray-200 text-gray-900 font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:bg-gray-50 disabled:opacity-50"
          >
            <ShoppingCart size={20} /> {addingToCart ? '...' : 'Add to Cart'}
          </button>
          <button 
            onClick={() => handleAddToCart(true)}
            disabled={addingToCart || product.stock === 0}
            className="flex-1 py-3 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:bg-primary-dark disabled:opacity-50"
          >
            <Zap size={20} /> Buy Now
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
