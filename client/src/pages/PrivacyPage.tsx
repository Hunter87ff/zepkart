import Layout from '../components/Layout/Layout';
import { Eye, Lock, Shield, Bell, Database } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <Layout bgWhite>
      <div className="max-w-[900px] mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center text-success mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-500">Last Updated: March 16, 2026</p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Eye className="text-success" size={24} /> Information We Collect
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">Personal Data</h3>
                <p className="text-sm text-gray-500">Name, email address, phone number, and shipping address provided by you.</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">Usage Data</h3>
                <p className="text-sm text-gray-500">Information on how you interact with our website, including device and browser details.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Shield className="text-success" size={24} /> How We Use Your Data
            </h2>
            <ul className="space-y-4">
              {[
                'To process and deliver your orders efficiently.',
                'To provide customer support and respond to inquiries.',
                'To improve our website functionality and user experience.',
                'To send you updates and promotional offers (if opted-in).'
              ].map((item, i) => (
                <li key={i} className="flex gap-4 p-4 rounded-xl bg-gray-50/50 border border-gray-100">
                  <div className="w-2 h-2 rounded-full bg-success mt-1.5 shrink-0" />
                  <p className="text-gray-600">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Database className="text-success" size={24} /> Data Protection
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We implement a variety of security measures to maintain the safety of your personal information. Your data is stored on secure servers and is only accessible by a limited number of persons who have special access rights to such systems.
            </p>
          </section>

          <div className="bg-success/5 p-8 rounded-3xl border border-success/10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-success shrink-0">
              <Bell size={28} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Stay Informed</h3>
              <p className="text-sm text-gray-600">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
