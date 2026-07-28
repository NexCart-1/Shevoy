import { motion } from 'framer-motion';
import { ShoppingCart, SearchX } from 'lucide-react';
import type { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onProductClick: (product: Product) => void;
}

export default function ProductGrid({ products, onAddToCart, onProductClick }: ProductGridProps) {
  return (
    <section id="products" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900"
          >
            Our Best Products
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-slate-500 max-w-xl mx-auto"
          >
            Tap any product to view details. COD available on every order.
          </motion.p>
        </div>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <SearchX size={64} className="mb-4 opacity-30" />
            <p className="text-lg font-medium">No products found</p>
            <p className="text-sm">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div
                  onClick={() => onProductClick(product)}
                  className="cursor-pointer"
                >
                  <div className="relative h-40 sm:h-56 lg:h-64 bg-slate-50 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 sm:p-6 group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-rose-500 text-white text-[10px] sm:text-xs font-bold rounded-full">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-3 sm:p-5">
                    <h3 className="text-sm sm:text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-gold-dark transition-colors">
                      {product.name}
                    </h3>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-base sm:text-xl font-extrabold text-gold-dark">
                        ₹{product.price}
                      </p>
                      <p className="text-[10px] sm:text-xs text-slate-400 line-through">
                        ₹{Math.round(product.price * 1.4)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-3 pb-3 sm:px-5 sm:pb-5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product);
                    }}
                    className="w-full py-2 sm:py-3 bg-ink hover:bg-gold-dark text-white rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
