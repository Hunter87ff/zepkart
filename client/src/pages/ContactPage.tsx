import Layout from '../components/Layout/Layout';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  return (
    <Layout bgWhite>
      <div className="max-w-[1200px] mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Have questions or need assistance? Our support team is here to help you 24/7.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary shrink-0 border border-gray-100">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                <p className="text-sm text-gray-500">support@zepkart.com</p>
                <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours.</p>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-success shrink-0 border border-gray-100">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Call Us</h3>
                <p className="text-sm text-gray-500">1800-123-4567</p>
                <p className="text-sm text-gray-500 mt-1">Mon-Sat, 9am to 6pm.</p>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-yellow-dark shrink-0 border border-gray-100">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Our Office</h3>
                <p className="text-sm text-gray-500">123 E-commerce Hub, Tech City, India - 560001</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl border border-gray-100 p-8 md:p-10 shadow-xl shadow-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <MessageSquare className="text-primary" /> Send us a Message
              </h2>
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Subject</label>
                  <select className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all appearance-none">
                    <option>General Inquiry</option>
                    <option>Order Status</option>
                    <option>Payment Issue</option>
                    <option>Returns & Refunds</option>
                    <option>Business Collaboration</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all resize-none"
                  ></textarea>
                </div>

                <button className="w-full md:w-auto px-10 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20 active:scale-95">
                  <Send size={18} /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
