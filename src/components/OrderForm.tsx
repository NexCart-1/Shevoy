import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CreditCard, Truck, BadgePercent, ArrowLeft, CheckCircle } from 'lucide-react';
import type { CartItem, CustomerDetails } from '../types';
import { PREPAID_DISCOUNT, UPI_ID } from '../types';

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onPlaceOrder: (details: CustomerDetails) => void;
}

const paymentOptions = [
  { key: 'cod', label: 'Cash on Delivery', icon: Truck },
  { key: 'paytm', label: 'Paytm', icon: CreditCard },
  { key: 'gpay', label: 'Google Pay', icon: CreditCard },
  { key: 'phonepe', label: 'PhonePe', icon: CreditCard }
] as const;

export default function OrderForm({ isOpen, onClose, cart, onPlaceOrder }: OrderFormProps) {
  const [step, setStep] = useState<'address' | 'payment' | 'confirm'>('address');
  const [details, setDetails] = useState<CustomerDetails>({
    fullName: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod'
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({});
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'done'>('pending');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isPrepaid = details.paymentMethod !== 'cod';
  const discount = isPrepaid ? PREPAID_DISCOUNT : 0;
  const finalAmount = Math.max(subtotal - discount, 0);

  useEffect(() => {
    if (isOpen) {
      setStep('address');
      setPaymentStatus('pending');
      setErrors({});
    }
  }, [isOpen]);

  const validateAddress = () => {
    const newErrors: Partial<Record<keyof CustomerDetails, string>> = {};
    if (!details.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!details.mobile.trim() || !/^[6-9]\d{9}$/.test(details.mobile.trim())) {
      newErrors.mobile = 'Enter valid 10 digit mobile number';
    }
    if (!details.address.trim()) newErrors.address = 'Address is required';
    if (!details.city.trim()) newErrors.city = 'City is required';
    if (!details.state.trim()) newErrors.state = 'State is required';
    if (!details.pincode.trim() || !/^\d{6}$/.test(details.pincode.trim())) {
      newErrors.pincode = 'Enter valid 6 digit pincode';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 'address' && validateAddress()) {
      setStep('payment');
    } else if (step === 'payment') {
      setStep('confirm');
      if (isPrepaid) {
        const upiUrl = generateUpiUrl(finalAmount);
        window.location.href = upiUrl;
      }
    }
  };

  const generateUpiUrl = (amount: number) => {
    const txnNote = encodeURIComponent('Shevoy Order Payment');
    return `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent('Shevoy')}&am=${amount}&cu=INR&tn=${txnNote}`;
  };

  const handlePaymentDone = () => {
    setPaymentStatus('done');
    onPlaceOrder(details);
  };

  const handleBack = () => {
    if (step === 'payment') setStep('address');
    else if (step === 'confirm') setStep('payment');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto"
        >
          <div className="sticky top-0 z-10 bg-gold-dark text-white p-5 rounded-t-3xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              {step !== 'address' && (
                <button onClick={handleBack} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                  <ArrowLeft size={20} />
                </button>
              )}
              <h2 className="text-lg font-bold">Checkout</h2>
            </div>
            <button onClick={onClose} aria-label="Close">
              <X size={24} />
            </button>
          </div>

          <div className="p-5 sm:p-6">
            {/* Step indicator */}
            <div className="flex items-center justify-between mb-6">
              {['Address', 'Payment', 'Confirm'].map((label, idx) => {
                const stepNames: Array<'address' | 'payment' | 'confirm'> = ['address', 'payment', 'confirm'];
                const currentIdx = stepNames.indexOf(step);
                const active = idx <= currentIdx;
                return (
                  <div key={label} className="flex flex-col items-center gap-1.5">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        active ? 'bg-gold-dark text-white' : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <span className={`text-[10px] sm:text-xs font-medium ${active ? 'text-gold-dark' : 'text-slate-400'}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>

            {step === 'address' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-900">Delivery Address</h3>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={details.fullName}
                    onChange={(e) => setDetails({ ...details, fullName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none text-sm"
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="text-xs text-rose-500 mt-1">{errors.fullName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    value={details.mobile}
                    onChange={(e) => setDetails({ ...details, mobile: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none text-sm"
                    placeholder="10 digit mobile number"
                    maxLength={10}
                  />
                  {errors.mobile && <p className="text-xs text-rose-500 mt-1">{errors.mobile}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Full Address</label>
                  <textarea
                    value={details.address}
                    onChange={(e) => setDetails({ ...details, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none text-sm min-h-[80px] resize-none"
                    placeholder="House no, street, area, landmark"
                  />
                  {errors.address && <p className="text-xs text-rose-500 mt-1">{errors.address}</p>}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">City</label>
                    <input
                      type="text"
                      value={details.city}
                      onChange={(e) => setDetails({ ...details, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none text-sm"
                      placeholder="City"
                    />
                    {errors.city && <p className="text-xs text-rose-500 mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">State</label>
                    <input
                      type="text"
                      value={details.state}
                      onChange={(e) => setDetails({ ...details, state: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none text-sm"
                      placeholder="State"
                    />
                    {errors.state && <p className="text-xs text-rose-500 mt-1">{errors.state}</p>}
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs font-medium text-slate-600 mb-1">Pincode</label>
                    <input
                      type="text"
                      value={details.pincode}
                      onChange={(e) => setDetails({ ...details, pincode: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-gold focus:ring-2 focus:ring-gold/30 outline-none text-sm"
                      placeholder="Pincode"
                      maxLength={6}
                    />
                    {errors.pincode && <p className="text-xs text-rose-500 mt-1">{errors.pincode}</p>}
                  </div>
                </div>
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Select Payment Method</h3>
                  <p className="text-xs text-slate-500 mt-1">Choose COD or any prepaid option.</p>
                </div>

                <div className="space-y-3">
                  {paymentOptions.map((option) => {
                    const selected = details.paymentMethod === option.key;
                    const Icon = option.icon;
                    return (
                      <label
                        key={option.key}
                        onClick={() => setDetails({ ...details, paymentMethod: option.key as CustomerDetails['paymentMethod'] })}
                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          selected
                            ? 'border-gold-dark bg-gold/10'
                            : 'border-slate-100 bg-white hover:border-gold/40'
                        }`}
                      >
                        <div className={`p-2.5 rounded-xl ${selected ? 'bg-gold-dark text-white' : 'bg-slate-100 text-slate-500'}`}>
                          <Icon size={22} />
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-sm text-slate-900">{option.label}</p>
                          {option.key !== 'cod' && (
                            <p className="text-[10px] sm:text-xs text-emerald-600 font-semibold">
                              ₹99 discount applied
                            </p>
                          )}
                          {option.key === 'cod' && (
                            <p className="text-[10px] sm:text-xs text-slate-500">Pay when you receive</p>
                          )}
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selected ? 'border-gold-dark' : 'border-slate-300'
                          }`}
                        >
                          {selected && <div className="w-2.5 h-2.5 rounded-full bg-gold-dark" />}
                        </div>
                      </label>
                    );
                  })}
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                  <BadgePercent size={20} className="text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-amber-800">
                    <span className="font-bold">Special Offer:</span> Get flat ₹99 off when you pay via Paytm, Google Pay or PhonePe.
                  </p>
                </div>
              </div>
            )}

            {step === 'confirm' && (
              <div className="text-center space-y-5">
                {!isPrepaid ? (
                  <>
                    <div className="w-16 h-16 mx-auto rounded-full bg-gold/15 flex items-center justify-center">
                      <CheckCircle size={32} className="text-gold-dark" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Confirm Cash on Delivery</h3>
                      <p className="text-sm text-slate-500 mt-1">No prepayment needed. Pay ₹{finalAmount} when your order arrives.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center">
                      <CreditCard size={32} className="text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">Complete Payment</h3>
                      <p className="text-sm text-slate-500 mt-1">
                        We opened your selected UPI app. Please complete the payment of ₹{finalAmount}.
                      </p>
                    </div>
                    {paymentStatus === 'pending' && (
                      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                        <p className="text-xs text-slate-500 mb-3">After successful payment, click below:</p>
                        <button
                          onClick={handlePaymentDone}
                          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm transition-colors"
                        >
                          I Have Completed the Payment
                        </button>
                        <p className="text-[10px] text-slate-400 mt-2">
                          Order notification will be sent to owner only after payment confirmation.
                        </p>
                      </div>
                    )}
                  </>
                )}

                {!isPrepaid && (
                  <button
                    onClick={() => onPlaceOrder(details)}
                    className="w-full py-3.5 bg-gradient-to-r from-gold-dark to-gold hover:from-bronze hover:to-gold-dark text-white rounded-2xl font-bold text-base transition-all hover:scale-[1.02] active:scale-95"
                  >
                    Confirm Order (COD)
                  </button>
                )}
              </div>
            )}

            {step !== 'confirm' && (
              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-slate-500">Order Total</span>
                  <div className="text-right">
                    {isPrepaid && discount > 0 && (
                      <p className="text-xs text-slate-400 line-through">₹{subtotal}</p>
                    )}
                    <p className="text-xl font-extrabold text-gold-dark">₹{finalAmount}</p>
                  </div>
                </div>
                <button
                  onClick={handleNext}
                  className="w-full py-3.5 bg-gradient-to-r from-gold-dark to-gold hover:from-bronze hover:to-gold-dark text-white rounded-2xl font-bold text-base shadow-lg transition-all hover:scale-[1.02] active:scale-95"
                >
                  {step === 'address' ? 'Continue to Payment' : 'Proceed to Pay'}
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
