import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Lock, 
  CreditCard, 
  Sparkles, 
  ShieldCheck, 
  Flame, 
  ArrowRight, 
  Heart, 
  Eye, 
  Users, 
  Clock, 
  CheckCircle2,
  Tag,
  Zap,
  Smartphone
} from 'lucide-react';
import { PricingPackage, MockPost, OrderRecord } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPackage: PricingPackage | null;
  onOrderCompleted: (order: OrderRecord) => void;
  formatPrice: (price: number) => string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedPackage,
  onOrderCompleted,
  formatPrice
}) => {
  const [step, setStep] = useState<number>(1);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPostIds, setSelectedPostIds] = useState<string[]>(['post-1']);
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponError, setCouponError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'google-pay' | 'crypto'>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderRecord | null>(null);

  if (!isOpen || !selectedPackage) return null;

  const mockUserPosts: MockPost[] = [
    {
      id: 'post-1',
      imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&auto=format&fit=crop&q=80',
      likes: 342,
      comments: 28,
      caption: 'Sunset vibes in Malibu ✨'
    },
    {
      id: 'post-2',
      imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&auto=format&fit=crop&q=80',
      likes: 512,
      comments: 45,
      caption: 'New collection photoshoot 👗'
    },
    {
      id: 'post-3',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      likes: 289,
      comments: 19,
      caption: 'Weekend aesthetic coffee run ☕'
    },
    {
      id: 'post-4',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      likes: 670,
      comments: 52,
      caption: 'Morning workout routine done 💪'
    }
  ];

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'FLASH20' || code === 'BUZZ20') {
      setAppliedDiscount(20);
    } else if (code === 'BUZZ10' || code === 'FIRST10') {
      setAppliedDiscount(10);
    } else {
      setCouponError('Invalid coupon code. Try FLASH20');
    }
  };

  const isLikeOrView = selectedPackage.service === 'likes' || selectedPackage.service === 'views';

  const toggleSelectPost = (id: string) => {
    if (selectedPostIds.includes(id)) {
      if (selectedPostIds.length > 1) {
        setSelectedPostIds(selectedPostIds.filter((p) => p !== id));
      }
    } else {
      setSelectedPostIds([...selectedPostIds, id]);
    }
  };

  // Price calculations
  const basePrice = selectedPackage.salePrice;
  const discountAmount = appliedDiscount > 0 ? (basePrice * appliedDiscount) / 100 : 0;
  const finalPrice = Math.max(0.99, Number((basePrice - discountAmount).toFixed(2)));

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newOrderId = `BZ-${Math.floor(100000 + Math.random() * 900000)}`;
      const order: OrderRecord = {
        orderId: newOrderId,
        service: selectedPackage.service,
        tier: selectedPackage.tier,
        quantity: selectedPackage.quantity,
        username: username.startsWith('@') ? username : `@${username || 'creator'}`,
        email: email || 'customer@example.com',
        date: 'Just now',
        totalPrice: finalPrice,
        status: 'Delivering',
        progressPercentage: 12,
        deliveredCount: Math.round(selectedPackage.quantity * 0.12),
        targetCount: selectedPackage.quantity,
        estimatedRemaining: 'approx. 2-5 mins'
      };

      setCompletedOrder(order);
      onOrderCompleted(order);
      setStep(3); // confirmation step
    }, 1800);
  };

  const handleClose = () => {
    setStep(1);
    setCompletedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-5 sm:p-8 max-w-xl w-full shadow-2xl relative border border-slate-100 max-h-[92vh] overflow-y-auto">
        <button
          id="close-checkout-modal-btn"
          onClick={handleClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Step 1: Username and Post Selection */}
        {step === 1 && (
          <div className="animate-in fade-in duration-150">
            <div className="flex items-center gap-2 text-purple-700 font-extrabold text-xs uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Step 1 of 2: Account Details
            </div>
            <h3 className="text-2xl font-black text-slate-900 font-display mb-1">
              {selectedPackage.label}
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Enter your public Instagram handle. No password needed.
            </p>

            {/* Package Summary Box */}
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 mb-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
                  {selectedPackage.tier.toUpperCase()} TIER
                </span>
                <div className="font-extrabold text-slate-900 text-sm">{selectedPackage.label}</div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 line-through mr-1.5">{formatPrice(selectedPackage.originalPrice)}</span>
                <span className="text-lg font-black text-slate-900 font-display">{formatPrice(selectedPackage.salePrice)}</span>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!username) return;
                setStep(2);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Instagram Handle <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">
                    @
                  </span>
                  <input
                    id="checkout-username-input"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value.replace('@', ''))}
                    placeholder="yourhandle"
                    className="w-full text-sm font-semibold pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Account must be set to <strong>Public</strong> during delivery.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Email Address (for instant receipt) <span className="text-rose-500">*</span>
                </label>
                <input
                  id="checkout-email-input"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="w-full text-sm font-semibold px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Post Selector for Likes / Views */}
              {isLikeOrView && (
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-slate-800">
                      Select Post(s) to distribute {selectedPackage.quantity.toLocaleString()} {selectedPackage.service}
                    </label>
                    <span className="text-[11px] text-purple-700 font-bold">
                      {selectedPostIds.length} selected
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {mockUserPosts.map((post) => {
                      const isSelected = selectedPostIds.includes(post.id);
                      return (
                        <div
                          key={post.id}
                          onClick={() => toggleSelectPost(post.id)}
                          className={`relative rounded-xl overflow-hidden aspect-square border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'border-purple-600 ring-2 ring-purple-600/30 scale-102'
                              : 'border-slate-200 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={post.imageUrl}
                            alt="post preview"
                            className="w-full h-full object-cover"
                          />
                          {isSelected && (
                            <div className="absolute top-1 right-1 bg-purple-600 text-white rounded-full p-0.5 shadow-sm">
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                          <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold p-1 text-center">
                            {Math.round(selectedPackage.quantity / selectedPostIds.length)} {selectedPackage.service === 'likes' ? '❤️' : '👁️'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <button
                type="submit"
                id="checkout-continue-step2-btn"
                className="w-full bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer mt-4 min-h-[44px]"
              >
                <span>Continue to Fast Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Payment & Coupon */}
        {step === 2 && (
          <div className="animate-in fade-in duration-150">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2 text-purple-700 font-extrabold text-xs uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5 text-emerald-600" /> Step 2 of 2: 256-Bit SSL Checkout
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-purple-700 font-bold hover:underline"
              >
                &larr; Back
              </button>
            </div>

            <h3 className="text-2xl font-black text-slate-900 font-display mb-4">
              Review & Pay Securely
            </h3>

            {/* Target handle summary */}
            <div className="bg-[#fafbfc] rounded-2xl p-3.5 border border-slate-200 mb-5 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  @
                </div>
                <div>
                  <span className="font-extrabold text-slate-900">@{username}</span>
                  <span className="text-slate-400 block text-[10px]">{email}</span>
                </div>
              </div>
              <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg">
                {selectedPackage.label}
              </span>
            </div>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="checkout-coupon-input"
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Discount code (try FLASH20)"
                  className="w-full text-xs font-semibold pl-8 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <button
                type="submit"
                id="checkout-apply-coupon-btn"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {appliedDiscount > 0 && (
              <div className="p-2 mb-4 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-1.5 border border-emerald-200">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Coupon Applied: <strong>{appliedDiscount}% OFF</strong></span>
              </div>
            )}

            {couponError && (
              <div className="p-2 mb-4 rounded-xl bg-rose-50 text-rose-800 text-xs font-semibold">
                {couponError}
              </div>
            )}

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1 min-h-[44px] ${
                  paymentMethod === 'card'
                    ? 'border-purple-600 bg-purple-50/80 text-purple-900 shadow-2xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span className="text-[10px]">Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple-pay')}
                className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1 min-h-[44px] ${
                  paymentMethod === 'apple-pay'
                    ? 'border-purple-600 bg-purple-50/80 text-purple-900 shadow-2xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span className="text-[10px]">Apple Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('google-pay')}
                className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1 min-h-[44px] ${
                  paymentMethod === 'google-pay'
                    ? 'border-purple-600 bg-purple-50/80 text-purple-900 shadow-2xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Zap className="w-4 h-4" />
                <span className="text-[10px]">Google Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('crypto')}
                className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all flex flex-col items-center justify-center gap-1 min-h-[44px] ${
                  paymentMethod === 'crypto'
                    ? 'border-purple-600 bg-purple-50/80 text-purple-900 shadow-2xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px]">Crypto</span>
              </button>
            </div>

            {/* Credit Card inputs */}
            {paymentMethod === 'card' && (
              <div className="space-y-3 mb-5">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 •••• •••• 4242"
                    className="w-full text-xs font-mono p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">MM / YY</label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="12/28"
                      className="w-full text-xs font-mono p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">CVC Code</label>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="849"
                      className="w-full text-xs font-mono p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod !== 'card' && (
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 text-purple-900 text-xs text-center mb-5 font-medium">
                Instant 1-Click checkout with {paymentMethod === 'apple-pay' ? 'Apple Pay' : paymentMethod === 'google-pay' ? 'Google Pay' : 'Bitcoin & Ethereum'}.
              </div>
            )}

            {/* Total Breakdown */}
            <div className="border-t border-slate-200/80 pt-3 pb-4 space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(basePrice)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount ({appliedDiscount}%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-base font-black text-slate-900 font-display pt-1 border-t border-slate-100">
                <span>Total Due</span>
                <span className="text-purple-700">{formatPrice(finalPrice)}</span>
              </div>
            </div>

            <button
              id="checkout-submit-pay-btn"
              onClick={handleProcessPayment}
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 disabled:opacity-60 text-white font-extrabold text-sm py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Processing Instant Dispatch...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Lock className="w-4 h-4" /> Pay {formatPrice(finalPrice)} & Start Delivery
                </span>
              )}
            </button>
          </div>
        )}

        {/* Step 3: Order Confirmation & Live Tracking Confirmation */}
        {step === 3 && completedOrder && (
          <div className="text-center animate-in zoom-in-95 duration-200 py-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              <Sparkles className="w-3 h-3 text-purple-600" /> Order Successfully Confirmed
            </div>

            <h3 className="text-2xl font-black text-slate-900 font-display mb-1">
              Dispatch in Progress!
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Your engagement package has been sent to our delivery node.
            </p>

            <div className="bg-[#fafbfc] rounded-2xl p-4 text-left border border-slate-200 text-xs space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-slate-400">Order ID:</span>
                <span className="font-mono font-bold text-slate-900">{completedOrder.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Target Account:</span>
                <span className="font-bold text-slate-900">{completedOrder.username}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Quantity:</span>
                <span className="font-bold text-purple-700">{completedOrder.quantity.toLocaleString()} {completedOrder.tier} units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Delivery Status:</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Dispatched (Started in 60s)
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                id="checkout-done-btn"
                onClick={handleClose}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs sm:text-sm py-3.5 rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Close & View Live Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
