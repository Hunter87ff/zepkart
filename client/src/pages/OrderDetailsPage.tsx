import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useAuth } from '../contexts/AuthContext';
import { getOrderById } from '../utils/api';
import type { Order } from '../types/api';
import { Package, Truck, CheckCircle, MapPin, CreditCard, ShoppingBag, Receipt, ArrowLeft } from 'lucide-react';

const statusConfig = {
  delivered: {
    icon: CheckCircle,
    label: 'Delivered',
    color: 'text-success',
    bg: 'bg-green-50',
    border: 'border-green-200',
    desc: 'Package has been delivered successfully.'
  },
  shipped: {
    icon: Truck,
    label: 'Shipped',
    color: 'text-primary',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    desc: 'Package is on its way to you.'
  },
  packed: {
    icon: Package,
    label: 'Packed',
    color: 'text-warning',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    desc: 'Your order has been packed and is ready for shipping.'
  },
  confirmed: {
    icon: CheckCircle,
    label: 'Confirmed',
    color: 'text-success',
    bg: 'bg-green-50',
    border: 'border-green-200',
    desc: 'Order has been confirmed and is being processed.'
  },
  processing: {
    icon: Package,
    label: 'Processing',
    color: 'text-warning',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    desc: 'Your order is being packed.'
  },
  pending: {
    icon: Package,
    label: 'Pending',
    color: 'text-gray-500',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    desc: 'Order received and awaiting confirmation.'
  },
  cancelled: {
    icon: Package,
    label: 'Cancelled',
    color: 'text-danger',
    bg: 'bg-red-50',
    border: 'border-red-200',
    desc: 'This order has been cancelled.'
  },
};

export default function OrderDetailsPage() {
  const { id } = useParams();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      if (!isAuthenticated || !id) return;
      try {
        setLoading(true);
        const data = await getOrderById(id);
        setOrder(data.order);
        setItems(data.items);
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [isAuthenticated, id]);

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

  if (!isAuthenticated || !order) {
    return (
      <>
        <Header />
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 bg-gray-50 text-center">
          <Receipt size={48} className="text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-500 mb-8">We couldn't find the order you're looking for.</p>
          <button 
            onClick={() => navigate('/orders')}
            className="px-8 py-3 bg-primary text-white font-bold rounded-xl transition-all"
          >
            Back to Orders
          </button>
        </div>
        <Footer />
      </>
    );
  }

  const status = (order.status.toLowerCase() as keyof typeof statusConfig) || 'pending';
  const config = statusConfig[status] || statusConfig.pending;
  const StatusIcon = config.icon;

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50">
        <div className="max-w-[1000px] mx-auto px-4 lg:px-6 py-8 w-full">
          <button 
            onClick={() => navigate('/orders')}
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-primary transition-colors mb-6 group transition-all"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to My Orders
          </button>

          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-8">
            <div className="space-y-6">
              {/* Order Status Card */}
              <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                       Order Summary
                       <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest ${config.bg} ${config.color} ${config.border}`}>
                          <StatusIcon size={12} />
                          {config.label}
                       </span>
                    </h1>
                    <p className="text-sm text-gray-500 mt-2 font-mono flex items-center gap-1.5 italic">
                      ID: #{order._id.toUpperCase()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Order Placed</p>
                    <p className="text-md font-bold text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm ${config.bg} ${config.color}`}>
                            <StatusIcon size={24} />
                        </div>
                        <div>
                            <h3 className="text-md font-bold text-gray-900">Current Status: {config.label}</h3>
                            <p className="text-sm text-gray-500">{config.desc}</p>
                        </div>
                    </div>
                </div>
              </section>

              {/* Items Card */}
              <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <ShoppingBag size={20} className="text-primary" />
                  Order Items ({items.length})
                </h2>
                <div className="space-y-6">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex gap-4 group">
                      <div className="w-24 h-24 bg-gray-50 rounded-2xl p-2 shrink-0 border border-gray-100 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <img src={item.product?.image} alt={item.product?.name} className="max-w-full max-h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <h3 className="font-bold text-gray-900 truncate hover:text-primary transition-colors">
                          <Link to={`/product/${item.product?._id}`}>{item.product?.name}</Link>
                        </h3>
                        <div className="flex items-center gap-3 text-sm mt-1">
                          <span className="text-gray-500">Qty: <span className="font-bold text-gray-900">{item.quantity}</span></span>
                          <span className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                          <span className="font-bold text-primary">₹{item.price_at_purchase.toFixed(0)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6 h-fit sticky top-24">
              {/* Payment Details */}
              <section className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                   <CreditCard size={20} className="text-primary" />
                   Payment Details
                </h2>
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-bold text-gray-900">₹{order.amount.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between items-center text-success">
                    <span className="font-medium text-[12px] uppercase">Discount Applied</span>
                    <span className="font-bold">-₹{((order.amount * order.discount) / 100).toFixed(0)} ({order.discount}%)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-bold text-success uppercase tracking-widest text-[10px]">Free Delivery</span>
                  </div>
                  <div className="pt-4 border-t border-gray-50 flex justify-between items-end">
                    <span className="text-lg font-bold text-gray-900">Total Charged</span>
                    <span className="text-2xl font-black text-gray-900">₹{order.total_amount.toFixed(0)}</span>
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section className="bg-gray-900 text-white rounded-3xl p-8 border border-gray-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl rounded-full -mr-16 -mt-16" />
                <h2 className="text-lg font-bold mb-6 flex items-center gap-2 relative">
                   <MapPin size={20} className="text-primary" />
                   Delivery Address
                </h2>
                <div className="relative">
                  <p className="font-bold text-lg mb-1">{order.customerName || 'Home Address'}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    123 Marketplace Street, Tech Hills<br />
                    San Francisco, California 94103<br />
                    United States
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
