import Layout from '../components/Layout/Layout';
import { RotateCcw, AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

export default function ReturnPolicyPage() {
  return (
    <Layout bgWhite>
      <div className="max-w-[1000px] mx-auto px-4 py-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
            <RotateCcw size={28} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Return & Cancellation Policy</h1>
        </div>

        <div className="prose prose-gray max-w-none">
          <p className="text-xl text-gray-500 mb-12 leading-relaxed">
            We want you to be completely satisfied with your purchase. If you're not happy with an item, our easy return policy is here to help.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-danger/5 p-8 rounded-3xl border border-danger/10">
              <AlertCircle className="text-danger mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">7-Day Window</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Most products can be returned within 7 days of delivery. The item must be unused, in its original packaging, and with all tags attached.
              </p>
            </div>
            <div className="bg-success/5 p-8 rounded-3xl border border-success/10">
              <CheckCircle className="text-success mb-4" size={32} />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Full Refund</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Once we receive and verify the returned item, a full refund will be processed to your original payment method within 5-7 business days.
              </p>
            </div>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Cancellation Policy</h2>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <ul className="space-y-4">
                <li className="flex gap-3 text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>You can cancel your order anytime before it has been shipped.</span>
                </li>
                <li className="flex gap-3 text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>For prepaid orders, the refund will be initiated immediately upon cancellation.</span>
                </li>
                <li className="flex gap-3 text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>Once an order is shipped, it cannot be cancelled but can be returned after delivery.</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="bg-primary/5 p-10 rounded-3xl text-center">
            <HelpCircle className="text-primary mx-auto mb-4" size={40} />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Need help with a return?</h2>
            <p className="text-gray-500 mb-8 max-w-lg mx-auto">
              Our support team is available 24/7 to guide you through the return or cancellation process.
            </p>
            <button className="px-10 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
              Contact Support
            </button>
          </section>
        </div>
      </div>
    </Layout>
  );
}
