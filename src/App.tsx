import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CollectionsPage } from './pages/CollectionsPage';
import { ProductListingPage } from './pages/ProductListingPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CustomJewelleryPage } from './pages/CustomJewelleryPage';
import { JewelleryCarePage } from './pages/JewelleryCarePage';
import { PriceGuidePage } from './pages/PriceGuidePage';
import { StoresPage, BookAppointmentPage } from './pages/StoresPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { JournalPage } from './pages/JournalPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { AuthPages } from './pages/AuthPages';
import { AccountPage } from './pages/AccountPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const navigate = (route: string) => {
    window.history.pushState({}, '', route);
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Route Resolver
  const renderRoute = () => {
    const path = currentRoute.split('?')[0];

    // Home
    if (path === '/' || path === '') {
      return <HomePage navigate={navigate} />;
    }

    // About
    if (path === '/about') {
      return <AboutPage navigate={navigate} />;
    }

    // All Collections landing
    if (path === '/collections') {
      return <CollectionsPage navigate={navigate} />;
    }

    // Category / Collection specific listings
    if (path.startsWith('/collections/')) {
      const slug = path.replace('/collections/', '');
      return <ProductListingPage collectionSlug={slug} navigate={navigate} />;
    }

    // Search results
    if (path === '/search') {
      const urlParams = new URLSearchParams(currentRoute.split('?')[1] || '');
      const q = urlParams.get('q') || '';
      return <ProductListingPage searchParam={q} navigate={navigate} />;
    }

    // Product Detail
    if (path.startsWith('/products/')) {
      const slug = path.replace('/products/', '');
      return <ProductDetailPage slug={slug} navigate={navigate} />;
    }

    // Custom Jewellery
    if (path === '/custom-jewellery') {
      return <CustomJewelleryPage navigate={navigate} />;
    }

    // Jewellery Care & Repair
    if (path === '/jewellery-care') {
      return <JewelleryCarePage navigate={navigate} />;
    }

    // Price Guide & Bullion Rate
    if (path === '/price-guide') {
      return <PriceGuidePage navigate={navigate} />;
    }

    // Stores & Appointments
    if (path === '/stores') {
      return <StoresPage navigate={navigate} />;
    }
    if (path === '/book-appointment') {
      return <BookAppointmentPage navigate={navigate} />;
    }

    // Reviews
    if (path === '/reviews') {
      return <ReviewsPage navigate={navigate} />;
    }

    // Journal
    if (path === '/journal') {
      return <JournalPage navigate={navigate} />;
    }

    // Contact
    if (path === '/contact') {
      return <ContactPage navigate={navigate} />;
    }

    // FAQ
    if (path === '/faq') {
      return <FAQPage navigate={navigate} />;
    }

    // Auth
    if (path === '/login') {
      const urlParams = new URLSearchParams(currentRoute.split('?')[1] || '');
      const isStaff = urlParams.get('role') === 'admin';
      return <AuthPages navigate={navigate} initialMode="login" staffMode={isStaff} />;
    }
    if (path === '/register') {
      return <AuthPages navigate={navigate} initialMode="register" />;
    }

    // Account
    if (path === '/account') {
      const urlParams = new URLSearchParams(currentRoute.split('?')[1] || '');
      const tab = urlParams.get('tab') || 'orders';
      return <AccountPage navigate={navigate} defaultTab={tab} />;
    }

    // Cart & Checkout
    if (path === '/cart') {
      return <CartPage navigate={navigate} />;
    }
    if (path === '/checkout') {
      return <CheckoutPage navigate={navigate} />;
    }

    // Track Order
    if (path === '/track-order') {
      return <TrackOrderPage navigate={navigate} />;
    }

    // Admin
    if (path === '/admin') {
      return <AdminDashboardPage navigate={navigate} />;
    }

    // Fallback
    return <HomePage navigate={navigate} />;
  };

  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen bg-[#FAF7F0] text-[#283447]">
        <Header currentRoute={currentRoute} navigate={navigate} />
        <main className="flex-grow">{renderRoute()}</main>
        <Footer navigate={navigate} />
      </div>
    </AppProvider>
  );
}
export default App;
