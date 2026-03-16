import Layout from '../components/Layout/Layout';
import { Truck, Clock, ShieldCheck, Globe, Info } from 'lucide-react';

export default function ShippingPage() {
  return (
    <Layout bgWhite>
      <div className="max-w-[1000px] mx-auto px-4 py-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <Truck size={28} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Shipping Information</h1>
        </div>

        <div className="prose prose-gray max-w-none">
          <p className="text-xl text-gray-500 mb-12 leading-relaxed">
            We strive to deliver your products in the fastest time possible. Learn more about our shipping rates, delivery times, and policies.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <Clock className="text-primary mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Delivery Time</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Most orders are processed within 24 hours. Standard delivery takes 2-5 business days depending on your location. Express delivery options are available for selected cities.
              </p>
            </div>
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
              <ShieldCheck className="text-success mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Safe Delivery</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Our delivery partners follow all safety protocols. Every package is sanitized and handled with care to ensure it reaches you in perfect condition.
              </p>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Info className="text-primary" size={24} /> Shipping Charges
            </h2>
            <div className="overflow-hidden border border-gray-100 rounded-2xl">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-bold">
                  <tr>
                    <th className="px-6 py-4">Order Value</th>
                    <th className="px-6 py-4">Shipping Fee</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-6 py-4 text-sm">Below ₹499</td>
                    <td className="px-6 py-4 text-sm font-bold text-danger">₹40</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm">₹499 and Above</td>
                    <td className="px-6 py-4 text-sm font-bold text-success">FREE</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Globe className="text-primary" size={24} /> International Shipping
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Currently, Zepkart only ships within India. We are working hard to expand our services to more countries soon. Stay tuned for updates!
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
