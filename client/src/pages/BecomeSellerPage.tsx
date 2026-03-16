import Layout from '../components/Layout/Layout';
import { CheckCircle, Rocket, ShieldCheck, PieChart, Users } from 'lucide-react';

export default function BecomeSellerPage() {
  return (
    <Layout bgWhite>
      <div className="max-w-[1200px] mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              Grow Your Business with <span className="text-primary">Zepkart</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
              Join thousands of successful sellers and reach millions of customers across the country with our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-95">
                Start Selling Now
              </button>
              <button className="px-8 py-4 border-2 border-gray-100 hover:border-primary/20 hover:bg-primary/5 text-gray-700 font-bold rounded-2xl transition-all">
                View Seller Guide
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="bg-primary/5 rounded-3xl p-8 lg:p-12 border border-primary/10">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                  <Users className="text-primary mx-auto mb-2" size={24} />
                  <div className="text-2xl font-bold text-gray-900">10M+</div>
                  <div className="text-xs text-gray-500">Active Buyers</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                  <PieChart className="text-success mx-auto mb-2" size={24} />
                  <div className="text-2xl font-bold text-gray-900">24/7</div>
                  <div className="text-xs text-gray-500">Sales Support</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                  <Rocket className="text-yellow-dark mx-auto mb-2" size={24} />
                  <div className="text-2xl font-bold text-gray-900">₹0</div>
                  <div className="text-xs text-gray-500">Listing Fees</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                  <ShieldCheck className="text-danger mx-auto mb-2" size={24} />
                  <div className="text-2xl font-bold text-gray-900">Safe</div>
                  <div className="text-xs text-gray-500">Secure Payments</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Register', desc: 'Create your account and complete your seller profile.' },
              { step: '2', title: 'Add Products', desc: 'List your products with clear images and descriptions.' },
              { step: '3', title: 'Receive Orders', desc: 'Get notified when customers purchase your items.' },
              { step: '4', title: 'Get Paid', desc: 'Secure payments transferred directly to your bank.' }
            ].map((item, i) => (
              <div key={i} className="relative p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                <div className="w-10 h-10 bg-primary text-white font-bold rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                  {item.step}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-gray-900 rounded-3xl p-10 md:p-16 text-white text-center">
          <h2 className="text-3xl font-bold mb-6">Why Sell on Zepkart?</h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            We provide all the tools you need to grow your business, from logistics and marketing to secure payments and analytics.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {[
              'Lowest commission rates in the industry',
              'Easy listing and cataloging tools',
              'Fast and reliable shipping network',
              'Personalized growth manager',
              'Real-time business analytics',
              'Regular training and webinars'
            ].map((benefit, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                  <CheckCircle className="text-success" size={16} />
                </div>
                <span className="text-gray-200 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
