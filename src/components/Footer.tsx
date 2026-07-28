import { Instagram, MapPin } from 'lucide-react';
import { INSTAGRAM_LINK } from '../types';

export default function Footer() {
  return (
    <footer className="bg-ink text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo-icon.png"
                alt="Shevoy"
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-gold-dark via-gold to-silver bg-clip-text text-transparent">Shevoy</span>
            </div>
            <p className="text-sm text-slate-400">
              Your one-stop shop for trending products at the best prices. COD available all over India.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#products" className="hover:text-white transition-colors">Shop Products</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Return Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-gold" />
                <span>India</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Follow Us</h4>
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white text-sm font-bold hover:scale-105 transition-transform"
            >
              <Instagram size={18} />
              @nex_cart_official
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gold/20 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Shevoy. All rights reserved. Made with ❤️ in India.
        </div>
      </div>
    </footer>
  );
}
