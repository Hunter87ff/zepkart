import Layout from '../components/Layout/Layout';
import { ShoppingCart, Users, Award, ShieldCheck, Zap, RotateCcw } from 'lucide-react';

export default function AboutPage() {
  return (
    <Layout bgWhite>
      <div className="max-w-[1000px] mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">About Zepkart</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Revolutionizing the way you shop. We bring the world's best products to your doorstep with lightning-fast delivery and unmatched service.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At Zepkart, our mission is to provide a seamless and enjoyable shopping experience for everyone, everywhere. We believe that quality products should be accessible, affordable, and delivered with care.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Founded in 2024, Zepkart has grown from a small startup to one of the most trusted names in e-commerce. We are driven by innovation, customer satisfaction, and a commitment to excellence in everything we do.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 text-center">
              <Users className="text-primary mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-gray-900">10M+</div>
              <div className="text-sm text-gray-500">Happy Customers</div>
            </div>
            <div className="bg-success/5 p-6 rounded-2xl border border-success/10 text-center">
              <ShoppingCart className="text-success mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-gray-900">50M+</div>
              <div className="text-sm text-gray-500">Products Sold</div>
            </div>
            <div className="bg-yellow/5 p-6 rounded-2xl border border-yellow/10 text-center">
              <Award className="text-yellow-dark mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-gray-900">100+</div>
              <div className="text-sm text-gray-500">Quality Awards</div>
            </div>
            <div className="bg-danger/5 p-6 rounded-2xl border border-danger/10 text-center">
              <Zap className="text-danger mx-auto mb-3" size={32} />
              <div className="text-2xl font-bold text-gray-900">20+</div>
              <div className="text-sm text-gray-500">Cities Served</div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-3xl p-10 md:p-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <ShieldCheck className="text-primary" size={28} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Secure Shopping</h3>
              <p className="text-sm text-gray-500">Every transaction is protected by industry-leading security standards.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <Zap className="text-yellow-dark" size={28} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-sm text-gray-500">Our logistics network ensures your products reach you in record time.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <RotateCcw className="text-success" size={28} />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-sm text-gray-500">Not satisfied? Our hassle-free return policy has got you covered.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
