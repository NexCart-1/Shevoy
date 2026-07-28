import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X } from 'lucide-react';

let showToastFn: (message: string) => void = () => {};

export function toast(message: string) {
  showToastFn(message);
}

export function Toaster() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    showToastFn = (msg: string) => {
      setMessage(msg);
      setTimeout(() => setMessage(null), 3000);
    };
  }, []);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          className="fixed bottom-6 left-1/2 z-[120] flex items-center gap-3 px-5 py-3 bg-ink text-white rounded-full shadow-2xl text-sm font-medium"
        >
          <CheckCircle size={18} className="text-emerald-400" />
          <span>{message}</span>
          <button onClick={() => setMessage(null)} className="ml-1 hover:text-slate-300">
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
