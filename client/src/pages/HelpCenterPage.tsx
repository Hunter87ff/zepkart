import Layout from '../components/Layout/Layout';
import { Mail, MessageSquare, Phone, Clock, Search, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const helpCategories = [
  { 
    title: 'Orders & Shipping', 
    desc: 'Track orders, shipping status, and delivery dates.',
    icon: Search,
    links: ['Track Order', 'Change Delivery Address', 'Shipping Charges']
  },
  { 
    title: 'Returns & Refunds', 
    desc: 'Manage your returns, refunds, and exchanges.',
    icon: MessageSquare,
    links: ['Return Policy', 'How to return?', 'Refund status']
  },
  { 
    title: 'Payment & Billing', 
    desc: 'Invoices, payment methods, and billing issues.',
    icon: ExternalLink,
    links: ['Payment modes', 'Zepkart Wallet', 'Taxes & GST']
  }
];

export default function HelpCenterPage() {
  return (
    <Layout bgWhite>
      {/* Hero Search */}
      <div className="bg-primary pt-16 pb-24 text-center text-white relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 relative z-10">
          <h1 className="text-4xl font-bold mb-6">How can we help you?</h1>
          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search help articles..."
              className="w-full px-16 py-5 rounded-3xl bg-white text-gray-900 shadow-xl outline-none text-lg placeholder:text-gray-400 border-4 border-transparent focus:border-primary-light transition-all"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8 text-sm">
            <span className="text-white/80">Popular:</span>
            {['Track order', 'Return policy', 'Payment issues', 'Refund status'].map((tag, i) => (
              <button key={i} className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/20">
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50" />
      </div>

      <div className="max-w-[1200px] mx-auto px-4 -mt-12 mb-20 relative z-20">
        <div className="grid md:grid-cols-3 gap-6">
          {helpCategories.map((cat, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-200 border border-gray-100 hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <cat.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{cat.title}</h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">{cat.desc}</p>
              <ul className="space-y-3">
                {cat.links.map((link, j) => (
                  <li key={j}>
                    <Link to="/faq" className="text-sm font-semibold text-gray-700 hover:text-primary flex items-center gap-2 transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Strip */}
        <div className="mt-16 bg-gray-50 rounded-3xl border border-gray-100 p-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">Still need help? Contact us</h2>
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto text-primary">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Email Support</h3>
                <p className="text-sm text-gray-500">support@zepkart.com</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto text-success">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Call Support</h3>
                <p className="text-sm text-gray-500">1800-123-4567</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto text-yellow-dark">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">24/7 Availability</h3>
                <p className="text-sm text-gray-500">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
