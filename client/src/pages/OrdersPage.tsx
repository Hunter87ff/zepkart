import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Package, Truck, CheckCircle, ChevronRight, Star } from 'lucide-react';

import headphonesImg from '../assets/headphones.png';
import shoesImg from '../assets/shoes.png';
import laptopImg from '../assets/laptop.png';

interface Order {
  id: string;
  items: {
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  status: 'delivered' | 'shipped' | 'processing';
  date: string;
  total: number;
}

const orders: Order[] = [
  {
    id: 'ZPK-2025-001847',
    items: [
      {
        name: 'Premium Noise Cancelling Wireless Headphones',
        image: headphonesImg,
        price: 299,
        quantity: 1,
      },
    ],
    status: 'delivered',
    date: 'Nov 20, 2025',
    total: 299,
  },
  {
    id: 'ZPK-2025-001832',
    items: [
      {
        name: "Men's Speed Running Shoes",
        image: shoesImg,
        price: 85,
        quantity: 1,
      },
      {
        name: 'MacBook Air M2 Chip',
        image: laptopImg,
        price: 999,
        quantity: 1,
      },
    ],
    status: 'shipped',
    date: 'Nov 18, 2025',
    total: 1084,
  },
  {
    id: 'ZPK-2025-001819',
    items: [
      {
        name: 'MacBook Air M2 Chip',
        image: laptopImg,
        price: 999,
        quantity: 1,
      },
    ],
    status: 'processing',
    date: 'Nov 15, 2025',
    total: 999,
  },
];

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
};

export default function OrdersPage() {
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
                placeholder="Search orders by name or order ID..."
                className="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
              <div className="flex gap-2">
                {['All', 'Delivered', 'Shipped', 'Processing'].map(
                  (filter) => (
                    <button
                      key={filter}
                      className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                        filter === 'All'
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {filter}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {orders.map((order) => {
              const config = statusConfig[order.status];
              const StatusIcon = config.icon;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow-card overflow-hidden hover:shadow-card-hover transition-shadow"
                >
                  {/* Order Header */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-gray-400">Order </span>
                        <span className="font-semibold text-gray-700">
                          #{order.id}
                        </span>
                      </div>
                      <span className="text-gray-300">|</span>
                      <span className="text-gray-500">{order.date}</span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${config.color} ${config.border}`}
                    >
                      <StatusIcon size={14} />
                      {config.label}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div className="divide-y divide-gray-50">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 px-5 py-4"
                      >
                        <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center p-2 shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500 mt-0.5">
                            Qty: {item.quantity} · ₹{item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          {order.status === 'delivered' && (
                            <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark transition-colors">
                              <Star size={14} /> Rate
                            </button>
                          )}
                          <ChevronRight
                            size={18}
                            className="text-gray-300"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer */}
                  <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100 bg-gray-50/30">
                    <span className="text-sm text-gray-500">
                      Total:{' '}
                      <span className="font-bold text-gray-900">
                        ₹{order.total.toFixed(2)}
                      </span>
                    </span>
                    <button className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                      View Details →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
