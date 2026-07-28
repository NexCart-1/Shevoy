import { useState, useEffect, useMemo } from 'react';
import emailjs from '@emailjs/browser';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCarousel from './components/ProductCarousel';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import OrderForm from './components/OrderForm';
import ThankYouModal from './components/ThankYouModal';
import Footer from './components/Footer';
import { Toaster, toast } from './components/Toaster';
import { products } from './data/products';
import type { Product, CartItem, CustomerDetails } from './types';
import { OWNER_EMAIL } from './types';

const EMAILJS_SERVICE_ID = 'service_1dk9f1r';
const EMAILJS_TEMPLATE_ID = 'template_jsqlk92';
const EMAILJS_PUBLIC_KEY = 'nE30WZllwuO4URVNr';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('shevoy-cart');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    localStorage.setItem('shevoy-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast(`${product.name} added to cart`);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const buildOrderItemsList = (items: CartItem[]) => {
    return items
      .map(
        (item) =>
          `• ${item.name} (${item.category}) - Qty: ${item.quantity} - ₹${item.price * item.quantity}\n  Image: ${item.image}`
      )
      .join('\n\n');
  };

  const placeOrder = async (details: CustomerDetails) => {
    if (isSending) return;
    setIsSending(true);

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const isPrepaid = details.paymentMethod !== 'cod';
    const discount = isPrepaid ? 99 : 0;
    const finalAmount = Math.max(subtotal - discount, 0);

    const paymentMethodLabel: Record<string, string> = {
      cod: 'Cash on Delivery',
      paytm: 'Paytm (Prepaid)',
      gpay: 'Google Pay (Prepaid)',
      phonepe: 'PhonePe (Prepaid)'
    };

    const templateParams = {
      to_email: OWNER_EMAIL,
      from_name: details.fullName,
      customer_name: details.fullName,
      customer_mobile: details.mobile,
      customer_address: `${details.address}, ${details.city}, ${details.state} - ${details.pincode}`,
      payment_method: paymentMethodLabel[details.paymentMethod] || details.paymentMethod,
      order_items: buildOrderItemsList(cart),
      subtotal: `₹${subtotal}`,
      discount: `₹${discount}`,
      total_amount: `₹${finalAmount}`,
      reply_to: OWNER_EMAIL
    };

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);
      setIsOrderFormOpen(false);
      setIsThankYouOpen(true);
      setCart([]);
    } catch (error) {
      console.error('EmailJS error:', error);
      toast('Failed to place order. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Header
        cart={cart}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <Hero />
      <ProductCarousel />
      <ProductGrid
        products={filteredProducts}
        onAddToCart={addToCart}
        onProductClick={setSelectedProduct}
      />
      <Footer />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          if (cart.length === 0) {
            toast('Your cart is empty');
            return;
          }
          setIsCartOpen(false);
          setIsOrderFormOpen(true);
        }}
      />

      <OrderForm
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
        cart={cart}
        onPlaceOrder={placeOrder}
      />

      <ThankYouModal
        isOpen={isThankYouOpen}
        onClose={() => setIsThankYouOpen(false)}
      />

      <Toaster />

      {isSending && (
        <div className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="px-6 py-4 bg-white rounded-2xl shadow-2xl flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-gold-dark border-t-transparent rounded-full animate-spin" />
            <span className="font-semibold text-slate-700">Placing your order...</span>
          </div>
        </div>
      )}
    </div>
  );
}
