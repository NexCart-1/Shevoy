import { motion } from 'framer-motion';
import { Instagram, PartyPopper, Package } from 'lucide-react';
import { INSTAGRAM_LINK } from '../types';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ThankYouModal({ isOpen, onClose }: ThankYouModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden text-center"
      >
        <div className="h-32 bg-gradient-to-r from-ink via-gold-dark to-gold flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            <PartyPopper size={40} className="text-white" />
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Thank You!</h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Your order has been placed successfully. We will contact you soon for confirmation.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3 p-4 rounded-2xl bg-gold/10 border border-gold/20">
            <Package size={24} className="text-gold-dark" />
            <p className="text-sm font-semibold text-bronze">Order details sent to Shevoy</p>
          </div>

          <div className="mt-6">
            <p className="text-xs sm:text-sm text-slate-500 mb-3">Follow us on Instagram for daily order updates & new arrivals</p>
            <a
              href={INSTAGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-transform"
            >
              <Instagram size={20} />
              @nex_cart_official
            </a>
          </div>

          <button
            onClick={onClose}
            className="mt-8 w-full py-3 bg-ink hover:bg-ink-2 text-white rounded-2xl font-bold text-sm transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
