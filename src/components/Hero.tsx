import { motion } from 'framer-motion';
import { ArrowDown, Truck, BadgePercent, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full min-h-[92vh] sm:min-h-[85vh] flex flex-col items-center justify-center pt-20 sm:pt-24 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://i.ibb.co/1t8XbRPM/4910241.jpg"
          alt="Shevoy Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-50" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs sm:text-sm font-medium mb-6"
        >
          <BadgePercent size={16} className="text-amber-300" />
          <span>Best Deals Live Now — COD Available All Over India</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight drop-shadow-lg"
        >
          Shop Smart,<br />
          <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
            Save Big
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-5 text-base sm:text-xl text-slate-100 max-w-2xl mx-auto font-light"
        >
          Shevoy brings you trending products at unbeatable prices. Cash on Delivery, secure prepaid options, and ₹99 extra off on prepaid orders.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={scrollToProducts}
            className="group px-8 py-4 bg-gradient-to-r from-gold-dark to-gold hover:from-bronze hover:to-gold-dark text-white rounded-full font-bold text-base sm:text-lg shadow-xl shadow-gold/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            Shop Now
            <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {[
            { icon: Truck, text: 'Free Delivery Available' },
            { icon: ShieldCheck, text: 'Secure Payments' },
            { icon: BadgePercent, text: '₹99 Off on Prepaid' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 text-white"
            >
              <item.icon size={22} className="text-amber-300 shrink-0" />
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
