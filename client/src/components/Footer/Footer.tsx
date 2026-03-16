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
          <div className="lg:col-span-1">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 text-center sm:text-left">
              Newsletter
            </h3>
            <p className="text-sm text-gray-400 mb-4 text-center sm:text-left">
              Subscribe to our newsletter for latest updates & offers!
            </p>
            <form
              className="flex flex-col gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                id="newsletter-email"
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-xl bg-gray-700/50 border border-gray-600 text-sm text-white placeholder:text-gray-500 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
              />
              <button
                id="newsletter-subscribe"
                type="submit"
                className="px-4 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-bold transition-all shadow-md active:scale-95"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50 bg-gray-900/30">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-3 text-sm font-medium text-gray-400">
              <a
                href="#"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Store size={16} className="text-primary" /> Become a Seller
              </a>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Megaphone size={16} className="text-primary" /> Advertise
              </a>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Gift size={16} className="text-primary" /> Gift Cards
              </a>
              <a
                href="#"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <HelpCircle size={16} className="text-primary" /> Help Center
              </a>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              © 2007-2026 Zepkart. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
