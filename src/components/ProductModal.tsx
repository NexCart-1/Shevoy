import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Check, ZoomIn } from 'lucide-react';
import type { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  if (!product) return null;

  const gallery = product.images && product.images.length > 0
    ? Array.from(new Set([product.image, ...product.images]))
    : [product.image];
  const currentImg = gallery[activeImage] ?? gallery[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 hover:bg-slate-100 text-slate-700 shadow transition-colors"
            aria-label="Close"
          >
            <X size={22} />
          </button>

          <div className="grid sm:grid-cols-2">
            <div>
              <div className="relative h-72 sm:h-96 bg-slate-50 flex items-center justify-center p-6">
                <img
                  src={currentImg}
                  alt={product.name}
                  onClick={() => setZoomOpen(true)}
                  className="max-h-full max-w-full object-contain cursor-zoom-in active:scale-[0.98] transition-transform"
                />
                <button
                  onClick={() => setZoomOpen(true)}
                  className="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 shadow text-slate-700 hover:bg-white"
                  aria-label="Zoom image"
                >
                  <ZoomIn size={18} />
                </button>
              </div>
              {gallery.length > 1 && (
                <div className="flex gap-2 px-6 pb-4 overflow-x-auto">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`shrink-0 h-14 w-14 rounded-lg overflow-hidden border-2 transition-colors ${
                        activeImage === i ? 'border-gold-dark' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="p-6 sm:p-8 flex flex-col justify-center">
              <div className="inline-flex self-start px-3 py-1 bg-gold/15 text-bronze text-xs font-bold rounded-full mb-3">
                In Stock
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {product.name}
              </h2>
              <p className="mt-3 text-slate-600 leading-relaxed text-sm sm:text-base">
                {product.description}
              </p>

              <div className="mt-5 flex items-end gap-3">
                <span className="text-3xl sm:text-4xl font-black text-gold-dark">₹{product.price}</span>
                <span className="text-base text-slate-400 line-through mb-1">₹{Math.round(product.price * 1.4)}</span>
                <span className="text-xs sm:text-sm font-bold text-emerald-600 mb-1.5">30% off</span>
              </div>

              <ul className="mt-5 space-y-2">
                {['Cash on Delivery Available', 'Free Shipping', 'Easy Returns'].map((point, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <Check size={16} className="text-emerald-500" />
                    {point}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
                className="mt-7 w-full py-3.5 bg-gradient-to-r from-gold-dark to-gold hover:from-bronze hover:to-gold-dark text-white rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {zoomOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setZoomOpen(false)}
          className="fixed inset-0 z-[70] bg-black/95 flex items-center justify-center p-4 overflow-auto touch-pinch-zoom"
        >
          <button
            onClick={() => setZoomOpen(false)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close zoom"
          >
            <X size={26} />
          </button>
          <img
            src={currentImg}
            alt={product.name}
            onClick={(e) => e.stopPropagation()}
            className="max-w-none w-auto h-auto min-w-full sm:min-w-0 sm:max-h-[95vh] sm:max-w-[95vw] object-contain"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
