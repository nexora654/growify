import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ArrowRight, 
  ShoppingBag, 
  ChevronDown, 
  Check, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { CartItem, PricingPackage, ServiceType } from '../types';
import { ALL_PACKAGES, SERVICE_METADATA } from '../data/packagesData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
  onSelectService: (service: ServiceType) => void;
  formatPrice: (price: number) => string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart,
  onCheckout,
  onSelectService,
  formatPrice
}) => {
  const [expandedPlatform, setExpandedPlatform] = useState<string | null>('instagram');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.packageItem.salePrice * item.quantity), 0);

  const togglePlatform = (platform: string) => {
    setExpandedPlatform(expandedPlatform === platform ? null : platform);
  };

  const handleBrowseClick = (service: ServiceType) => {
    onSelectService(service);
    onClose();
    const elem = document.getElementById('pricing-section') || document.getElementById('services-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  // Recommended packages (not currently in cart)
  const recommendations = ALL_PACKAGES.filter(
    (pkg) => (pkg.isPopular || pkg.isBestValue) && !cartItems.some(i => i.packageItem.id === pkg.id)
  ).slice(0, 2);

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        id="bz-cart-overlay"
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Cart Drawer */}
      <aside 
        id="bz-cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col justify-between transition-transform duration-300 ease-out border-l border-slate-200"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ff5500] to-[#e61e50] flex items-center justify-center text-white">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-black text-slate-900 font-display">
              Your Cart {cartItems.length > 0 && <span className="text-sm font-semibold text-slate-500">({cartItems.length})</span>}
            </h2>
          </div>

          <button
            type="button"
            id="bz-cart-close"
            onClick={onClose}
            aria-label="Close cart"
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {cartItems.length > 0 ? (
            /* Cart Items List */
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs flex items-center justify-between gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black text-slate-900 truncate">
                        {item.packageItem.label}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-50 text-orange-600 border border-orange-200/60 uppercase">
                        {item.packageItem.tier}
                      </span>
                    </div>

                    {item.username && (
                      <p className="text-xs text-slate-500 truncate">
                        Account: <strong className="text-slate-700 font-medium">@{item.username}</strong>
                      </p>
                    )}

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm font-extrabold text-slate-900">
                        {formatPrice(item.packageItem.salePrice * item.quantity)}
                      </span>
                      {item.quantity > 1 && (
                        <span className="text-xs text-slate-400">
                          ({formatPrice(item.packageItem.salePrice)} × {item.quantity})
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label="Remove item"
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Recommendations */}
              {recommendations.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> You Might Like
                  </h4>
                  <div className="space-y-2.5">
                    {recommendations.map((pkg) => (
                      <div 
                        key={pkg.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3 text-xs"
                      >
                        <div>
                          <div className="font-bold text-slate-900">{pkg.label}</div>
                          <div className="text-slate-500 text-[11px]">{formatPrice(pkg.salePrice)} · Instant delivery</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            onSelectService(pkg.service);
                            onClose();
                            onCheckout();
                          }}
                          className="bg-white hover:bg-orange-50 text-orange-600 border border-orange-300 font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Empty State */
            <div id="bz-cart-empty" className="space-y-6">
              <div className="text-center py-6 px-4 bg-slate-50 rounded-2xl border border-slate-200/70">
                <div className="w-12 h-12 rounded-full bg-slate-200/80 flex items-center justify-center text-slate-500 mx-auto mb-3">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-display">Your cart is empty</h3>
                <p className="text-xs text-slate-500 mt-1">Add services to get started</p>
              </div>

              {/* Browse Services Accordion (Exact Buzzoid style) */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                  Browse Services
                </h4>

                {/* Instagram Platform */}
                <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
                  <button
                    type="button"
                    onClick={() => togglePlatform('instagram')}
                    className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB] p-0.5 flex items-center justify-center text-white shrink-0">
                        <div className="w-full h-full rounded-[4px] border border-white flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full border border-white"></div>
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Instagram</div>
                        <div className="text-[10px] text-slate-500">Followers · Likes · Views · Comments</div>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expandedPlatform === 'instagram' ? 'rotate-180' : ''}`} />
                  </button>

                  {expandedPlatform === 'instagram' && (
                    <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50/60 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleBrowseClick('followers')}
                        className="p-2.5 bg-white hover:bg-orange-50 hover:border-orange-300 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 text-center transition-all cursor-pointer"
                      >
                        Followers
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBrowseClick('likes')}
                        className="p-2.5 bg-white hover:bg-orange-50 hover:border-orange-300 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 text-center transition-all cursor-pointer"
                      >
                        Likes
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBrowseClick('views')}
                        className="p-2.5 bg-white hover:bg-orange-50 hover:border-orange-300 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 text-center transition-all cursor-pointer"
                      >
                        Views
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBrowseClick('comments')}
                        className="p-2.5 bg-white hover:bg-orange-50 hover:border-orange-300 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 text-center transition-all cursor-pointer"
                      >
                        Comments
                      </button>
                    </div>
                  )}
                </div>

                {/* TikTok Platform */}
                <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
                  <button
                    type="button"
                    onClick={() => togglePlatform('tiktok')}
                    className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-3.04-1.54z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">TikTok</div>
                        <div className="text-[10px] text-slate-500">Followers · Likes · Views</div>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expandedPlatform === 'tiktok' ? 'rotate-180' : ''}`} />
                  </button>

                  {expandedPlatform === 'tiktok' && (
                    <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50/60 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleBrowseClick('tiktok-followers')}
                        className="p-2.5 bg-white hover:bg-orange-50 hover:border-orange-300 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 text-center transition-all cursor-pointer"
                      >
                        Followers
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBrowseClick('tiktok-likes')}
                        className="p-2.5 bg-white hover:bg-orange-50 hover:border-orange-300 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 text-center transition-all cursor-pointer"
                      >
                        Likes
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBrowseClick('tiktok-views')}
                        className="p-2.5 bg-white hover:bg-orange-50 hover:border-orange-300 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 text-center transition-all cursor-pointer"
                      >
                        Views
                      </button>
                    </div>
                  )}
                </div>

                {/* YouTube Platform */}
                <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-2xs">
                  <button
                    type="button"
                    onClick={() => togglePlatform('youtube')}
                    className="w-full p-3.5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#ff0000] flex items-center justify-center text-white shrink-0">
                        <div className="w-0 h-0 border-y-[3px] border-y-transparent border-l-[5px] border-l-white ml-0.5"></div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">YouTube</div>
                        <div className="text-[10px] text-slate-500">Views · Subscribers · Likes</div>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${expandedPlatform === 'youtube' ? 'rotate-180' : ''}`} />
                  </button>

                  {expandedPlatform === 'youtube' && (
                    <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50/60 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => handleBrowseClick('youtube-views')}
                        className="p-2.5 bg-white hover:bg-orange-50 hover:border-orange-300 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 text-center transition-all cursor-pointer"
                      >
                        Views
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBrowseClick('youtube-subscribers')}
                        className="p-2.5 bg-white hover:bg-orange-50 hover:border-orange-300 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 text-center transition-all cursor-pointer"
                      >
                        Subscribers
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBrowseClick('youtube-likes')}
                        className="p-2.5 bg-white hover:bg-orange-50 hover:border-orange-300 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 text-center transition-all cursor-pointer"
                      >
                        Likes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        {cartItems.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-slate-200 bg-slate-50/80 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
              <span>Estimated Delivery:</span>
              <span className="text-emerald-600 font-bold">Instant (within 60s)</span>
            </div>

            <div className="flex items-center justify-between text-sm font-black text-slate-900">
              <span>Total:</span>
              <span className="text-xl text-slate-900 font-display">{formatPrice(subtotal)}</span>
            </div>

            <button
              type="button"
              id="bz-cart-checkout"
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full bg-gradient-to-r from-[#ff5500] to-[#e61e50] hover:from-[#e04500] hover:to-[#cf1645] text-white font-extrabold text-sm py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-101 min-h-[44px]"
            >
              <span>Checkout</span>
              <span>·</span>
              <span>{formatPrice(subtotal)}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              type="button"
              id="bz-cart-clear"
              onClick={onClearCart}
              className="w-full text-center text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors py-1 cursor-pointer"
            >
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
