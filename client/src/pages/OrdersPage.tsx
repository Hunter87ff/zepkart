import { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { useAuth } from '../contexts/AuthContext';
import { getOrders } from '../utils/api';
import type { Order } from '../types/api';
import { Package, Truck, CheckCircle, ChevronRight, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const statusConfig = {
  delivered: {
    icon: CheckCircle,
    label: 'Delivered',
    color: 'text-success',
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  shipped: {
    icon: Truck,
    label: 'Shipped',
    color: 'text-primary',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  processing: {
    icon: Package,
    label: 'Processing',
    color: 'text-warning',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  pending: {
    icon: Package,
    label: 'Pending',
    color: 'text-gray-500',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
  },
  cancelled: {
    icon: Package,
    label: 'Cancelled',
    color: 'text-danger',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
};

export default function OrdersPage() {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    async function fetchOrders() {
      if (!isAuthenticated) return;
      try {
        setLoading(true);
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, [isAuthenticated]);

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
              <ShoppingBag size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your orders</h2>
            <p className="text-gray-500 mb-8">Login to see your order history and track your deliveries.</p>
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

  const filteredOrders = filter === 'All' 
    ? orders 
    : orders.filter(o => o.status.toLowerCase() === filter.toLowerCase());

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
            <p className="text-sm text-gray-500 mt-1">
              Track, return, or buy things again
            </p>
          </div>

          {/* Search & Filters */}
          <div className="bg-white rounded-xl shadow-card p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="order-search"
                type="text"
                placeholder="Search orders..."
                className="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
              <div className="flex gap-2">
                {['All', 'Delivered', 'Shipped', 'Processing'].map(
                  (f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                        filter === f
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {f}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl shadow-card">
                    <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-400 font-medium">No orders found.</p>
                </div>
            ) : (
                filteredOrders.map((order) => {
                const status = (order.status.toLowerCase() as keyof typeof statusConfig) || 'pending';
                const config = statusConfig[status] || statusConfig.pending;
                const StatusIcon = config.icon;

                return (
                    <div
                    key={order._id}
                    className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-card-hover transition-shadow"
                    >
                    {/* Order Header */}
                    <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50/50">
                        <div className="flex items-center gap-4 text-sm">
                        <div>
                            <span className="text-gray-400">Order </span>
                            <span className="font-semibold text-gray-700 font-mono text-xs">
                            #{order._id.slice(-8).toUpperCase()}
                            </span>
                        </div>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                        </div>
                        <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.color} ${config.border}`}
                        >
                        <StatusIcon size={14} />
                        {config.label}
                        </span>
                    </div>

                    {/* Order Items Summary */}
                    <div className="px-5 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-gray-50 rounded-lg">
                                    <ShoppingBag size={24} className="text-gray-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">₹{order.total_amount.toFixed(0)}</p>
                                    <p className="text-xs text-gray-500">Total Items: {order.items?.length || 1}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => navigate(`/orders/${order._id}`)}
                                className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                            >
                                View Details <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                    </div>
                );
                })
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
