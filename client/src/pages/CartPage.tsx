import { useState } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import {
  MapPin,
  Minus,
  Plus,
  Trash2,
  Bookmark,
  PlusCircle,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';

import headphonesImg from '../assets/headphones.png';
import shoesImg from '../assets/shoes.png';

interface CartItem {
  id: number;
  name: string;
  image: string;
  color: string;
  seller: string;
  size?: string;
  price: number;
  originalPrice: number;
  discount: number;
  offersApplied?: number;
  deliveryDate: string;
  stock?: number;
  quantity: number;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Premium Noise Cancelling Wireless Over-Ear Headphones',
    image: headphonesImg,
    color: 'Midnight Black',
    seller: 'TechRetail Pvt Ltd',
    price: 299,
    originalPrice: 399,
    discount: 25,
    offersApplied: 2,
    deliveryDate: 'Nov 25',
    quantity: 1,
  },
  {
    id: 2,
    name: "Men's Speed Running Shoes - Breathable Mesh",
    image: shoesImg,
    color: 'Vibrant Red',
    seller: 'SportGear Official',
    size: '10 US',
    price: 85,
    originalPrice: 120,
    discount: 29,
    deliveryDate: 'Nov 23',
    stock: 2,
    quantity: 1,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [deliveryAddress] = useState('San Francisco, 94103');

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const totalDiscount = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );
  const totalAmount = totalPrice - totalDiscount;
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
                  className="px-4 py-1.5 border border-primary text-primary text-sm font-semibold rounded-lg hover:bg-primary-light transition-colors"
                >
                  CHANGE
                </button>
              </div>

              {/* Cart Items */}
              <div className="bg-white rounded-xl shadow-card divide-y divide-gray-100">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-5">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="shrink-0 w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] bg-gray-50 rounded-xl flex items-center justify-center p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-medium text-gray-900 text-sm sm:text-base leading-snug mb-1">
                              {item.name}
                            </h3>
                            <p className="text-xs text-gray-400 mb-0.5">
                              Color: {item.color}
                              {item.size && ` | Size: ${item.size}`}
                            </p>
                            <p className="text-xs text-gray-400">
                              Seller: {item.seller}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xs text-gray-400">
                              Delivery by{' '}
                              <span className="font-medium text-gray-700">
                                {item.deliveryDate}
                              </span>
                            </p>
                          </div>
                        </div>

                        {item.stock && item.stock <= 3 && (
                          <p className="text-xs text-danger font-semibold mt-1.5">
                            Only {item.stock} left in stock!
                          </p>
                        )}

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mt-3">
                          <span className="text-sm text-gray-400 line-through">
                            ${item.originalPrice.toFixed(2)}
                          </span>
                          <span className="text-lg font-bold text-gray-900">
                            ${item.price.toFixed(2)}
                          </span>
                          <span className="text-sm font-semibold text-success">
                            {item.discount}% Off
                            {item.offersApplied &&
                              ` ${item.offersApplied} offers applied`}
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4 mt-4 flex-wrap">
                          {/* Quantity */}
                          <div className="flex items-center gap-0.5">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-all"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-10 text-center text-sm font-semibold text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:border-gray-300 hover:bg-gray-50 transition-all"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors uppercase tracking-wide">
                            <Bookmark size={14} /> Save for later
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-danger transition-colors uppercase tracking-wide"
                          >
                            <Trash2 size={14} /> Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add from Wishlist */}
              <button
                id="add-from-wishlist"
                className="w-full mt-4 bg-white rounded-xl shadow-card p-4 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-primary hover:bg-primary-light transition-all"
              >
                <PlusCircle size={18} />
                Add more items from wishlist
              </button>
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
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-success">Discount</span>
                    <span className="text-success font-medium">
                      -${totalDiscount.toFixed(2)}
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
                  <span>${totalAmount.toFixed(2)}</span>
                </div>

                <p className="text-sm text-success font-medium mb-5">
                  You will save ${totalDiscount.toFixed(2)} on this order
                </p>

                <button
                  id="place-order"
                  className="w-full py-3.5 bg-yellow hover:bg-yellow-dark text-gray-900 font-bold text-base rounded-xl transition-all duration-250 hover:shadow-lg hover:-translate-y-0.5 uppercase tracking-wide"
                >
                  Place Order
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
