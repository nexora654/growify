import React, { useState } from 'react';
import { Search, X, CheckCircle, Clock, ShieldCheck, RefreshCw, AlertCircle, Sparkles } from 'lucide-react';
import { OrderRecord } from '../types';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentOrders?: OrderRecord[];
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  recentOrders = []
}) => {
  const [lookupQuery, setLookupQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState<OrderRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [refillRequested, setRefillRequested] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    setRefillRequested(false);

    // Check if matching recent orders
    const matched = recentOrders.find(
      (o) =>
        o.orderId.toLowerCase() === lookupQuery.trim().toLowerCase() ||
        o.username.toLowerCase().includes(lookupQuery.replace('@', '').trim().toLowerCase())
    );

    if (matched) {
      setSearchedOrder(matched);
    } else if (lookupQuery.trim().length > 0) {
      // Generate realistic simulated active order for demo
      setSearchedOrder({
        orderId: lookupQuery.toUpperCase().startsWith('BZ-') ? lookupQuery.toUpperCase() : `BZ-${Math.floor(100000 + Math.random() * 900000)}`,
        service: 'followers',
        tier: 'active',
        quantity: 2500,
        username: lookupQuery.startsWith('@') ? lookupQuery : `@${lookupQuery}`,
        email: 'customer@example.com',
        date: 'Today at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        totalPrice: 49.99,
        status: 'Delivering',
        progressPercentage: 78,
        deliveredCount: 1950,
        targetCount: 2500,
        estimatedRemaining: 'approx. 4 mins remaining'
      });
    } else {
      setSearchedOrder(null);
    }
  };

  const handleRequestRefill = () => {
    setRefillRequested(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto">
        <button
          id="close-order-tracker-btn"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-purple-700 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Search className="w-4 h-4" /> Live Dispatch Network
        </div>
        <h3 className="text-2xl font-black text-slate-900 font-display mb-2">
          Track Your Growify Order
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mb-6">
          Enter your Order ID (e.g. GW-84920) or your Instagram handle to check real-time dispatch progress.
        </p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="order-lookup-input"
              type="text"
              required
              value={lookupQuery}
              onChange={(e) => setLookupQuery(e.target.value)}
              placeholder="e.g. @yourhandle or BZ-19284"
              className="w-full text-xs sm:text-sm pl-10 pr-3 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            id="order-lookup-submit-btn"
            className="bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-xs transition-colors cursor-pointer min-h-[44px]"
          >
            Track
          </button>
        </form>

        {/* Order Details Display */}
        {hasSearched && searchedOrder && (
          <div className="bg-[#fafbfc] rounded-2xl p-4 sm:p-5 border border-purple-100 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Order ID</span>
                <div className="text-sm font-extrabold text-slate-900 font-mono">{searchedOrder.orderId}</div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-black uppercase px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {searchedOrder.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Target Account</span>
                <span className="font-bold text-slate-900">{searchedOrder.username}</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Ordered Service</span>
                <span className="font-bold text-slate-900">{searchedOrder.quantity.toLocaleString()} {searchedOrder.tier} units</span>
              </div>
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between text-xs font-bold mb-1.5">
                <span className="text-slate-600">
                  Delivered: <span className="text-purple-700">{searchedOrder.deliveredCount.toLocaleString()}</span> / {searchedOrder.targetCount.toLocaleString()}
                </span>
                <span className="text-purple-700">{searchedOrder.progressPercentage}%</span>
              </div>
              <div className="h-3 bg-slate-200 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-500 rounded-full transition-all duration-500"
                  style={{ width: `${searchedOrder.progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" /> {searchedOrder.estimatedRemaining}
                </span>
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Safe Natural Pacing
                </span>
              </div>
            </div>

            {/* Guarantee / Refill Action */}
            <div className="border-t border-slate-200/80 pt-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>30-Day Auto Refill: <strong className="text-emerald-700">ACTIVE</strong></span>
              </div>

              {refillRequested ? (
                <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Refill Dispatched!
                </span>
              ) : (
                <button
                  id="request-refill-btn"
                  onClick={handleRequestRefill}
                  className="text-xs font-bold text-purple-700 hover:text-purple-900 underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Check Refill
                </button>
              )}
            </div>
          </div>
        )}

        {hasSearched && !searchedOrder && (
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Please enter a valid Instagram handle or Order ID to inspect live dispatch progress.</span>
          </div>
        )}
      </div>
    </div>
  );
};
