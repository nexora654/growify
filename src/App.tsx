import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PackagePricingGrid } from './components/PackagePricingGrid';
import { HowItWorks } from './components/HowItWorks';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { AuthModal } from './components/AuthModal';
import { ContactModal } from './components/ContactModal';
import { CartDrawer } from './components/CartDrawer';
import { LoginPage } from './components/LoginPage';
import { RegistrationPage } from './components/RegistrationPage';
import { ServiceType, PricingPackage, OrderRecord, CartItem } from './types';
import { ALL_PACKAGES } from './data/packagesData';
import { ShoppingBag, MessageSquare, ArrowUp, Check } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'login-page' | 'registration-page'>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname === '/login') {
        return 'login-page';
      }
      if (window.location.pathname === '/registration' || window.location.pathname === '/register') {
        return 'registration-page';
      }
    }
    return 'home';
  });
  const [selectedService, setSelectedService] = useState<ServiceType>('followers');
  const [selectedPackageForCheckout, setSelectedPackageForCheckout] = useState<PricingPackage | null>(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [recentOrders, setRecentOrders] = useState<OrderRecord[]>([]);
  const [currency, setCurrency] = useState<string>('USD');

  // Sync URL history state
  useEffect(() => {
    const handleLocationChange = () => {
      if (window.location.pathname === '/login') {
        setCurrentView('login-page');
      } else if (window.location.pathname === '/registration' || window.location.pathname === '/register') {
        setCurrentView('registration-page');
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Cart State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Currency rate mapping
  const currencyConfig: Record<string, { symbol: string; rate: number }> = {
    USD: { symbol: '$', rate: 1.0 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 },
    CAD: { symbol: 'CA$', rate: 1.36 },
    AUD: { symbol: 'AU$', rate: 1.52 }
  };

  const formatPrice = (usdPrice: number): string => {
    const config = currencyConfig[currency] || currencyConfig.USD;
    const converted = (usdPrice * config.rate).toFixed(2);
    return `${config.symbol}${converted}`;
  };

  const handleOpenCheckoutWithService = (service: ServiceType) => {
    setSelectedService(service);
    const defaultPkg = ALL_PACKAGES.find((p) => p.service === service && (p.isPopular || p.isBestValue)) || ALL_PACKAGES.find((p) => p.service === service) || ALL_PACKAGES[0];
    setSelectedPackageForCheckout(defaultPkg);
    setIsCheckoutModalOpen(true);
  };

  const handleSelectPackageForCheckout = (pkg: PricingPackage) => {
    setSelectedPackageForCheckout(pkg);
    setIsCheckoutModalOpen(true);
  };

  const handleAddToCart = (pkg: PricingPackage) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.packageItem.id === pkg.id);
      if (existing) {
        return prev.map((item) => 
          item.packageItem.id === pkg.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: `cart-${Date.now()}-${pkg.id}`, packageItem: pkg, quantity: 1 }];
    });

    // Show toast notification
    setToastMessage(`${pkg.label} added to cart`);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCartCheckout = () => {
    if (cartItems.length > 0) {
      setSelectedPackageForCheckout(cartItems[0].packageItem);
      setIsCheckoutModalOpen(true);
    }
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    if (mode === 'signup') {
      setCurrentView('registration-page');
      if (window.location.pathname !== '/registration') {
        window.history.pushState({}, '', '/registration');
      }
    } else {
      setCurrentView('login-page');
      if (window.location.pathname !== '/login') {
        window.history.pushState({}, '', '/login');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToLogin = () => {
    setAuthMode('login');
    setCurrentView('login-page');
    if (window.location.pathname !== '/login') {
      window.history.pushState({}, '', '/login');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToRegister = () => {
    setAuthMode('signup');
    setCurrentView('registration-page');
    if (window.location.pathname !== '/registration') {
      window.history.pushState({}, '', '/registration');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToHome = () => {
    setCurrentView('home');
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderCompleted = (order: OrderRecord) => {
    setRecentOrders((prev) => [order, ...prev]);
    // Clear cart after checkout
    setCartItems([]);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'login-page') {
    return (
      <LoginPage
        initialMode={authMode}
        onBackToHome={handleNavigateToHome}
        onLoginSuccess={handleNavigateToHome}
        onCreateAccount={handleNavigateToRegister}
      />
    );
  }

  if (currentView === 'registration-page') {
    return (
      <RegistrationPage
        onBackToHome={handleNavigateToHome}
        onNavigateToLogin={handleNavigateToLogin}
        onRegisterSuccess={() => {
          handleNavigateToHome();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#fafbfc] text-slate-900 selection:bg-orange-200 selection:text-orange-900">
      {/* Navigation Header with Top Sunrise Bar, Logo, 5.0 Review Chip, and Cart Drawer trigger */}
      <Header
        onSelectService={(srv) => {
          setSelectedService(srv);
          const elem = document.getElementById('pricing-section');
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenTrackModal={() => setIsTrackModalOpen(true)}
        onOpenCheckoutWithService={handleOpenCheckoutWithService}
        onOpenAuthModal={handleOpenAuth}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />

      {/* Hero Section with Live Platform Selector & 4 Action CTA buttons */}
      <Hero
        selectedService={selectedService}
        onSelectService={setSelectedService}
        onSelectPackageForCheckout={handleSelectPackageForCheckout}
        formatPrice={formatPrice}
        onNavigateToLogin={handleNavigateToLogin}
      />

      {/* Full Interactive Package Pricing Grid & Custom Slider */}
      <PackagePricingGrid
        currentService={selectedService}
        onSelectService={setSelectedService}
        onSelectPackageForCheckout={handleSelectPackageForCheckout}
        formatPrice={formatPrice}
      />

      {/* 3-Step Simple Delivery Workflow */}
      <HowItWorks
        onStartOrder={handleOpenCheckoutWithService}
      />

      {/* Verified Reviews Section */}
      <ReviewsSection />

      {/* Footer with Top Links, Socials, and Copyright */}
      <Footer
        onOpenContact={() => setIsContactModalOpen(true)}
        onNavigateToLogin={handleNavigateToLogin}
      />

      {/* Sliding Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckout={handleCartCheckout}
        onSelectService={(srv) => {
          setSelectedService(srv);
          handleOpenCheckoutWithService(srv);
        }}
        formatPrice={formatPrice}
      />

      {/* Interactive Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        selectedPackage={selectedPackageForCheckout}
        onOrderCompleted={handleOrderCompleted}
        formatPrice={formatPrice}
      />

      {/* Live Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isTrackModalOpen}
        onClose={() => setIsTrackModalOpen(false)}
        recentOrders={recentOrders}
      />

      {/* Auth Modal (Login / Sign up) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />

      {/* Contact Support Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      {/* Toast Notification (Item added to cart) */}
      {toastMessage && (
        <div 
          id="bz-cart-toast"
          role="alert"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <p className="text-xs font-semibold text-white">{toastMessage}</p>
          <button
            type="button"
            onClick={() => {
              setToastMessage(null);
              setIsCartOpen(true);
            }}
            className="text-xs font-extrabold text-orange-400 hover:text-orange-300 ml-2 underline cursor-pointer"
          >
            View Cart
          </button>
        </div>
      )}

      {/* Floating Bottom Quick Action Bar for Mobile */}
      <div className="sm:hidden fixed bottom-3 inset-x-3 z-30 flex gap-2" style={{ bottom: 'max(0.75rem, env(safe-area-inset-bottom, 0.75rem))' }}>
        <button
          id="mobile-floating-buy-cta"
          onClick={() => handleOpenCheckoutWithService('followers')}
          className="flex-1 bg-gradient-to-r from-[#ff5500] to-[#e61e50] text-white font-extrabold text-xs py-3.5 px-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 cursor-pointer min-h-[44px] touch-manipulation"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Buy Real Followers from $1.99</span>
        </button>

        <button
          id="mobile-floating-cart-btn"
          onClick={() => setIsCartOpen(true)}
          aria-label="Shopping Cart"
          className="relative bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl flex items-center justify-center cursor-pointer min-h-[44px] min-w-[44px] touch-manipulation"
        >
          <ShoppingBag className="w-4 h-4" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#ff5500] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          )}
        </button>
      </div>

      {/* Scroll to Top Floating Button (Desktop) */}
      <button
        id="scroll-to-top-btn"
        onClick={scrollToTop}
        aria-label="Scroll back to top"
        className="hidden md:flex fixed bottom-6 right-6 z-30 w-11 h-11 rounded-full bg-white/95 backdrop-blur-md text-slate-700 hover:text-[#ff5500] border border-slate-200/90 shadow-lg hover:shadow-xl items-center justify-center transition-all hover:-translate-y-0.5 cursor-pointer"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}
