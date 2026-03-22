import { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { createOrder } from '../utils/api';
import {
  MapPin,
  Minus,
  Plus,
  Trash2,
  Bookmark,
  PlusCircle,
  ShieldCheck,
  RotateCcw,
  ShoppingCart,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { 
    items: cartItems, 
    savedItems,
    subtotal, 
    loading, 
    updateQuantity: handleUpdateQuantity, 
    removeFromCart: handleRemoveItem, 
    toggleSaveForLater: handleToggleSave,
    refreshCart 
  } = useCart();
  
  const deliveryAddress = user?.address?.city 
    ? `${user.address.city}, ${user.address.pincode}` 
    : 'Select Address';
    
  const [placing, setPlacing] = useState(false);

  const handlePlaceOrder = async () => {
    setPlacing(true);
    try {
      await createOrder();
      await refreshCart();
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (error: any) {
      console.error('Failed to place order:', error);
      alert(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  if (authLoading || (loading && isAuthenticated)) {
    return (
      <>
        <Header />
        <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <Header />
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 bg-gray-50">
          <div className="bg-white p-8 rounded-2xl shadow-card text-center max-w-md">
            <div className="w-20 h-20 bg-primary-light/30 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
              <ShoppingCart size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Missing Cart items?</h2>
            <p className="text-gray-500 mb-8">Login to see the items you added previously or to start shopping.</p>
            <button 
              onClick={() => navigate('/login')}
              className="w-full py-3 bg-yellow hover:bg-yellow-dark text-gray-900 font-bold rounded-xl transition-all shadow-md active:scale-95 uppercase tracking-wide"
            >
              Login
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (cartItems.length === 0 && savedItems.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 bg-gray-50">
           <div className="bg-white p-8 rounded-2xl shadow-card text-center max-w-md">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
              <ShoppingCart size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty!</h2>
            <p className="text-gray-500 mb-8">Explore our products and add some items to your cart.</p>
            <Link 
              to="/"
              className="inline-block px-10 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all shadow-md active:scale-95 uppercase tracking-wide"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const totalMRP = cartItems.reduce((sum, item) => {
      const discountPercent = item.product.discount?.[0] || 0;
      const mrp = item.product.mrp || Math.round(item.product.price / (1 - discountPercent / 100));
      return sum + (mrp * item.quantity);
  }, 0);
  const totalDiscount = totalMRP - subtotal;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column - Cart Items */}
            <div className="flex-1">
              {/* Delivery Address */}
              <div className="bg-white rounded-xl shadow-card p-4 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-gray-400" />
                  <div>
                    <span className="text-sm text-gray-500">Deliver to: </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {deliveryAddress}
                    </span>
                  </div>
                </div>
                <button
                  id="change-address"
                  onClick={() => navigate('/profile')}
                  className="px-4 py-1.5 border border-primary text-primary text-sm font-semibold rounded-lg hover:bg-primary-light transition-colors"
                >
                  CHANGE
                </button>
              </div>

              {/* Cart Items */}
              {cartItems.length > 0 ? (
                <div className="bg-white rounded-xl shadow-card divide-y divide-gray-100 overflow-hidden">
                  {cartItems.map((item) => {
                    const discountPercent = item.product.discount?.[0] || 0;
                    const mrp = item.product.mrp || Math.round(item.product.price / (1 - discountPercent / 100));
                    
                    return (
                      <div key={item._id} className="p-5">
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <div className="shrink-0 w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] bg-gray-50 rounded-xl flex items-center justify-center p-2">
                            <img
                              src={item.product.image || (item.product.images && item.product.images[0])}
                              alt={item.product.name}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-medium text-gray-900 text-sm sm:text-base leading-snug mb-1">
                                  <Link to={`/product/${item.product._id}`} className="hover:text-primary">
                                      {item.product.name}
                                  </Link>
                                </h3>
                                <p className="text-xs text-gray-400">
                                  Seller: {typeof item.product.store === 'object' ? item.product.store.name : 'Verified Seller'}
                                </p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-xs text-gray-400">
                                  Delivery within{' '}
                                  <span className="font-medium text-gray-700">
                                    2-4 Days
                                  </span>
                                </p>
                              </div>
                            </div>

                            {item.product.stock < 10 && item.product.stock > 0 && (
                              <p className="text-xs text-danger font-semibold mt-1.5">
                                Only {item.product.stock} left in stock!
                              </p>
                            )}

                            {/* Price */}
                            <div className="flex items-baseline gap-2 mt-3">
                              <span className="text-sm text-gray-400 line-through">
                                ₹{mrp.toFixed(0)}
                              </span>
                              <span className="text-lg font-bold text-gray-900">
                                ₹{item.product.price.toFixed(0)}
                              </span>
                              {discountPercent > 0 && (
                                  <span className="text-sm font-semibold text-success">
                                      {discountPercent}% Off
                                  </span>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-4 mt-4 flex-wrap">
                              {/* Quantity */}
                              <div className="flex items-center gap-0.5">
                                <button
                                  onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)}
                                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-all disabled:opacity-30"
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="w-10 text-center text-sm font-semibold text-gray-800">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}
                                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-all"
                                >
                                  <Plus size={14} />
                                </button>
                              </div>

                              <button 
                                  onClick={() => handleToggleSave(item.product._id)}
                                  className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors uppercase tracking-wide"
                              >
                                <Bookmark size={14} /> Save for later
                              </button>
                              <button
                                onClick={() => handleRemoveItem(item.product._id)}
                                className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-danger transition-colors uppercase tracking-wide"
                              >
                                <Trash2 size={14} /> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-card p-12 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                        <ShoppingCart size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Your cart is empty</h3>
                    <p className="text-gray-500 text-sm mb-6">But you have items saved for later below!</p>
                </div>
              )}

              {/* Add from Wishlist */}
              <button
                id="add-from-wishlist"
                className="w-full mt-4 bg-white rounded-xl shadow-card p-4 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-primary hover:bg-primary-light transition-all"
                onClick={() => navigate('/')}
              >
                <PlusCircle size={18} />
                Continue Shopping
              </button>

              {/* Saved Items */}
              {savedItems.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Bookmark size={20} className="text-primary" />
                    Saved for Later ({savedItems.length})
                  </h3>
                  <div className="bg-white rounded-xl shadow-card divide-y divide-gray-100 overflow-hidden">
                    {savedItems.map((item) => (
                      <div key={item._id} className="p-5 opacity-80 hover:opacity-100 transition-opacity">
                        <div className="flex gap-4">
                          <div className="shrink-0 w-[80px] h-[80px] bg-gray-50 rounded-lg flex items-center justify-center p-2">
                            <img
                              src={item.product.image || (item.product.images && item.product.images[0])}
                              alt={item.product.name}
                              className="max-w-full max-h-full object-contain grayscale-[0.5]"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-700 text-sm truncate">
                              {item.product.name}
                            </h4>
                            <div className="flex items-baseline gap-2 mt-1">
                              <span className="text-base font-bold text-gray-900">
                                ₹{item.product.price.toFixed(0)}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mt-3">
                              <button
                                onClick={() => handleToggleSave(item.product._id)}
                                className="text-xs font-bold text-primary uppercase tracking-widest hover:underline"
                              >
                                Move to cart
                              </button>
                              <button
                                onClick={() => handleRemoveItem(item.product._id)}
                                className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-danger"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Price Details */}
            <div className="lg:w-[340px] shrink-0">
              <div className="bg-white rounded-xl shadow-card p-5 sticky top-[80px]">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-5">
                  Price Details
                </h3>

                <div className="space-y-3.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Price ({totalItems} items)
                    </span>
                    <span className="text-gray-900 font-medium">
                      ₹{totalMRP.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-success">Discount</span>
                    <span className="text-success font-medium">
                      -₹{totalDiscount.toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Charges</span>
                    <span className="text-success font-semibold">FREE</span>
                  </div>
                </div>

                <div className="border-t border-dashed border-gray-200 my-4" />

                <div className="flex justify-between text-base font-bold text-gray-900 mb-3">
                  <span>Total Amount</span>
                  <span>₹{subtotal.toFixed(0)}</span>
                </div>

                <p className="text-sm text-success font-medium mb-5">
                  You will save ₹{totalDiscount.toFixed(0)} on this order
                </p>

                <button
                  id="place-order"
                  onClick={handlePlaceOrder}
                  disabled={placing}
                  className="w-full py-3.5 bg-yellow hover:bg-yellow-dark text-gray-900 font-bold text-base rounded-xl transition-all duration-250 hover:shadow-lg hover:-translate-y-0.5 uppercase tracking-wide disabled:opacity-50"
                >
                  {placing ? 'Placing Order...' : 'Place Order'}
                </button>

                <div className="flex items-center justify-center gap-5 mt-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <ShieldCheck size={14} /> Safe & Secure
                  </span>
                  <span className="flex items-center gap-1">
                    <RotateCcw size={14} /> 100% Return
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
