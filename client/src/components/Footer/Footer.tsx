import { Link } from 'react-router-dom';
import {
  ShoppingCart,
  Facebook,
  Twitter,
  Instagram,
  Store,
  Megaphone,
  Gift,
  HelpCircle,
} from 'lucide-react';

const aboutLinks = [
  'Contact Us',
  'About Us',
  'Careers',
  'Zepkart Stories',
  'Corporate Information',
];

const helpLinks = [
  'Payments',
  'Shipping',
  'Cancellation & Returns',
  'FAQ',
  'Report Infringement',
];

const policyLinks = [
  'Return Policy',
  'Terms of Use',
  'Security',
  'Privacy',
  'Sitemap',
];

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto">
      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary text-white w-8 h-8 rounded-lg flex items-center justify-center">
                <ShoppingCart size={16} />
              </div>
              <span className="text-lg font-bold text-white">Zepkart</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 mb-4">
              Your one-stop destination for all things shopping. Quality
              products, best prices, and fast delivery at your doorstep.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Facebook, label: 'FB' },
                { icon: Twitter, label: 'TW' },
                { icon: Instagram, label: 'IG' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-700 hover:bg-primary flex items-center justify-center transition-colors duration-150"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* About */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              About
            </h3>
            <ul className="space-y-2.5">
              {aboutLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-primary transition-colors duration-150"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Help
            </h3>
            <ul className="space-y-2.5">
              {helpLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-400 hover:text-primary transition-colors duration-150"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Newsletter
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to our newsletter to get updates on our latest offers!
            </p>
            <form
              className="flex flex-col gap-2.5"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                id="newsletter-email"
                type="email"
                placeholder="Your email address"
                className="px-4 py-2.5 rounded-lg bg-gray-700 border border-gray-600 text-sm text-white placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary transition-colors duration-150"
              />
              <button
                id="newsletter-subscribe"
                type="submit"
                className="px-4 py-2.5 bg-accent hover:bg-accent-dark text-white rounded-lg text-sm font-semibold transition-colors duration-150"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <a
                href="#"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Store size={14} /> Become a Seller
              </a>
              <span className="text-gray-600">|</span>
              <a
                href="#"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Megaphone size={14} /> Advertise
              </a>
              <span className="text-gray-600">|</span>
              <a
                href="#"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Gift size={14} /> Gift Cards
              </a>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <a
                href="#"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <HelpCircle size={14} /> Help Center
              </a>
            </div>
            <p className="text-xs text-gray-500">
              © 2007-2025 Zepkart.com. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
