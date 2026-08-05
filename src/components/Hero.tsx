import { motion } from 'framer-motion';
import { ArrowRight, Award, ShieldCheck, Truck, IndianRupee, Package, RotateCcw, Tag } from 'lucide-react';

export default function Hero() {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const trustPoints = [
    { icon: Award, label: 'Premium', sub: 'Quality' },
    { icon: ShieldCheck, label: 'Trusted', sub: 'Brand' },
    { icon: Truck, label: 'Fast & Safe', sub: 'Delivery' },
    { icon: IndianRupee, label: 'Cash On', sub: 'Delivery' },
  ];

  const bottomStrip = [
    { icon: Package, title: 'COD Available', sub: 'Pay at your doorstep' },
    { icon: RotateCcw, title: 'Easy Returns', sub: 'Hassle free returns' },
    { icon: Tag, title: 'Best Prices', sub: 'Quality at best prices' },
  ];

  return (
    <section className="relative w-full pt-16 sm:pt-20 bg-ink overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[560px] sm:min-h-[640px]">
        {/* Left: text content */}
        <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="h-px w-8 bg-gold-dark/70" />
            <span className="text-gold text-xs sm:text-sm tracking-[0.25em] font-semibold uppercase">New Collection</span>
            <span className="h-px w-8 bg-gold-dark/70" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-extrabold leading-[1.05] bg-gradient-to-r from-gold-dark via-gold to-silver bg-clip-text text-transparent text-4xl sm:text-5xl lg:text-6xl"
          >
            Timeless<br />Elegance
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-script text-gold text-3xl sm:text-4xl mt-1"
          >
            crafted for you
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-silver-light text-base sm:text-lg font-light"
          >
            Premium Sarees for Every Occasion
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6"
          >
            {trustPoints.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2">
                <item.icon size={24} className="text-gold" />
                <span className="text-[11px] sm:text-xs text-silver-light font-semibold tracking-wide uppercase leading-tight">
                  {item.label}<br />{item.sub}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-9"
          >
            <button
              onClick={scrollToProducts}
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-gold-dark to-gold hover:from-bronze hover:to-gold-dark text-ink rounded-full font-bold text-sm sm:text-base shadow-xl shadow-gold/20 transition-all hover:scale-105 active:scale-95"
            >
              Shop Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Right: photo */}
        <div className="relative min-h-[340px] lg:min-h-0">
          <img
            src="/hero-model.jpg"
            alt="Shevoy - Timeless Elegance Saree Collection"
            className="absolute inset-0 w-full h-full object-cover object-[70%_center]"
          />
          {/* blend curve into dark panel */}
          <div className="absolute inset-y-0 left-0 w-24 sm:w-32 bg-gradient-to-r from-ink to-transparent" />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-ink/60 to-transparent lg:hidden" />
        </div>
      </div>

      {/* bottom trust strip */}
      <div className="relative z-10 border-t border-gold/15 bg-ink">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
          {bottomStrip.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <item.icon size={20} className="text-gold shrink-0" />
              <div>
                <p className="text-silver-light text-sm font-semibold leading-tight">{item.title}</p>
                <p className="text-silver-dark text-xs leading-tight">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
