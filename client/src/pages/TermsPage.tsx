import Layout from '../components/Layout/Layout';
import { Shield, FileText, Scale, Info } from 'lucide-react';

export default function TermsPage() {
  return (
    <Layout bgWhite>
      <div className="max-w-[900px] mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
            <Scale size={32} />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms & Conditions</h1>
          <p className="text-gray-500">Last Updated: March 16, 2026</p>
        </div>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Info className="text-primary" size={24} /> 1. Introduction
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Welcome to Zepkart. These Terms and Conditions govern your use of our website and services. By accessing or using Zepkart, you agree to be bound by these terms. If you do not agree with any part of these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Shield className="text-primary" size={24} /> 2. User Accounts
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              To use certain features of the service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>You must provide accurate and complete information.</li>
              <li>You must be at least 18 years old to create an account.</li>
              <li>You are responsible for keeping your password secure.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <FileText className="text-primary" size={24} /> 3. Intellectual Property
            </h2>
            <p className="text-gray-600 leading-relaxed">
              All content on Zepkart, including text, graphics, logos, images, and software, is the property of Zepkart or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works from any part of our services without prior written consent.
            </p>
          </section>

          <section className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Limitation of Liability</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Zepkart shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service. We do not guarantee that the service will be uninterrupted or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any dispute arising out of or related to these terms shall be subject to the exclusive jurisdiction of the courts located in Bangalore, India.
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
}
