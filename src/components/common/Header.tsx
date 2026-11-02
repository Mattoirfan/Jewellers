import React, { useState } from 'react';
import { Logo } from './Logo';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Clock,
  Layers,
  Wrench,
  BookOpen,
} from 'lucide-react';
import { Currency } from '../../types';

interface HeaderProps {
  currentRoute: string;
  navigate: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, navigate }) => {
  const {
    cartCount,
    wishlist,
    currency,
    setCurrency,
    currentUser,
    logout,
    searchQuery,
    setSearchQuery,
    metalRates,
    formatPrice,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [collectionsMenuOpen, setCollectionsMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchOpen(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT & UTILITY BAR */}
      <div className="bg-[#245B4A] text-[#FAF7F0] text-xs py-2 px-4 border-b border-[#C5A46D]/30 transition-all">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between text-[11px] font-light">
          {/* Live Gold Bullion Rate Ticker */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <span className="flex items-center gap-1.5 text-[#E9D9B8] whitespace-nowrap">
              <TrendingUp className="w-3.5 h-3.5 text-[#C5A46D]" />
              <strong className="font-medium text-white">Live 22K (916) Gold:</strong> {formatPrice(metalRates.gold22kPerGram)}/g
            </span>
            <span className="text-[#E9D9B8]/40">|</span>
            <button
              onClick={() => navigate('/price-guide')}
              className="text-[#E9D9B8] hover:text-white underline decoration-[#C5A46D] transition-colors whitespace-nowrap"
            >
              Gold Rate Transparency Guide
            </button>
          </div>

          {/* Central Trust Promise */}
          <div className="flex items-center justify-center gap-2 mx-auto text-center truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A46D] shrink-0" />
            <span className="truncate">
              100% BIS Hallmarked with HUID & GIA Certified · Insured Armoured Transit
            </span>
          </div>

          {/* Right Utilities: Currency Selector & Quick Links */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <button
              onClick={() => navigate('/book-appointment')}
              className="hover:text-[#E9D9B8] transition-colors whitespace-nowrap"
            >
              Book Boutique Consultation
            </button>
            <span className="text-[#E9D9B8]/40">|</span>
            <button
              onClick={() => navigate('/track-order')}
              className="hover:text-[#E9D9B8] transition-colors whitespace-nowrap"
            >
              Track Order
            </button>
            <span className="text-[#E9D9B8]/40">|</span>

            {/* Currency Picker */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 text-[#E9D9B8] hover:text-white font-medium uppercase tracking-wider"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white text-[#283447] shadow-xl rounded-md border border-[#E7E2D9] py-1 z-50 animate-in fade-in slide-in-from-top-1">
                  {(['INR', 'USD', 'AED', 'GBP'] as Currency[]).map((cur) => (
                    <button
                      key={cur}
                      onClick={() => {
                        setCurrency(cur);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#FAF7F0] ${
                        currency === cur ? 'font-semibold text-[#245B4A] bg-[#FAF7F0]' : ''
                      }`}
                    >
                      {cur}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MANDATORY DESKTOP HEADER NAVIGATION (STRICT SINGLE HORIZONTAL LINE) */}
      <header className="sticky top-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-[#E7E2D9] transition-all">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between flex-nowrap gap-4 xl:gap-8">
          
          {/* Brand Logo Zone - Single unclipped flex element */}
          <div
            onClick={() => navigate('/')}
            className="cursor-pointer shrink-0 hover:opacity-90 transition-opacity"
            role="button"
            tabIndex={0}
            aria-label="Aurelia Fine Jewels Home"
          >
            <Logo size="md" />
          </div>

          {/* Desktop Navigation Links — Strictly flex-nowrap, single horizontal row, white-space: nowrap */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center flex-nowrap gap-4 xl:gap-6 text-[13.5px] font-medium tracking-wide text-[#283447] shrink-0"
          >
            <button
              onClick={() => navigate('/')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                currentRoute === '/'
                  ? 'text-[#245B4A] font-semibold border-b-2 border-[#C5A46D]'
                  : 'hover:text-[#245B4A]'
              }`}
            >
              Home
            </button>

            {/* Collections Dropdown */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => setCollectionsMenuOpen(true)}
              onMouseLeave={() => setCollectionsMenuOpen(false)}
            >
              <button
                onClick={() => navigate('/collections')}
                className={`flex items-center gap-1 whitespace-nowrap shrink-0 py-1 transition-colors ${
                  currentRoute.startsWith('/collections')
                    ? 'text-[#245B4A] font-semibold border-b-2 border-[#C5A46D]'
                    : 'hover:text-[#245B4A]'
                }`}
              >
                <span>Collections</span>
                <ChevronDown className="w-3 h-3 text-[#C5A46D]" />
              </button>

              {collectionsMenuOpen && (
                <div className="absolute top-full left-0 w-64 bg-white border border-[#E7E2D9] shadow-xl rounded-md py-2 z-50 animate-in fade-in duration-150">
                  <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#82796E] border-b border-[#E7E2D9]/60">
                    Curated Vaults
                  </div>
                  <button
                    onClick={() => {
                      setCollectionsMenuOpen(false);
                      navigate('/collections/gold');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF7F0] text-xs font-medium text-[#283447] flex items-center justify-between"
                  >
                    <span>22K & 18K Gold Jewellery</span>
                    <span className="text-[10px] text-[#C5A46D]">Heritage</span>
                  </button>
                  <button
                    onClick={() => {
                      setCollectionsMenuOpen(false);
                      navigate('/collections/diamond');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF7F0] text-xs font-medium text-[#283447] flex items-center justify-between"
                  >
                    <span>GIA Solitaire & Diamonds</span>
                    <span className="text-[10px] text-[#C5A46D]">Certified</span>
                  </button>
                  <button
                    onClick={() => {
                      setCollectionsMenuOpen(false);
                      navigate('/collections/bridal');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF7F0] text-xs font-medium text-[#283447] flex items-center justify-between"
                  >
                    <span>Royal Bridal Trousseau</span>
                    <span className="text-[10px] text-[#245B4A]">Polki & Emerald</span>
                  </button>
                  <button
                    onClick={() => {
                      setCollectionsMenuOpen(false);
                      navigate('/collections');
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-[#245B4A] hover:bg-[#FAF7F0] border-t border-[#E7E2D9]/60 mt-1"
                  >
                    View All Collections →
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('/collections/gold')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                currentRoute === '/collections/gold'
                  ? 'text-[#245B4A] font-semibold border-b-2 border-[#C5A46D]'
                  : 'hover:text-[#245B4A]'
              }`}
            >
              Gold
            </button>

            <button
              onClick={() => navigate('/collections/diamond')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                currentRoute === '/collections/diamond'
                  ? 'text-[#245B4A] font-semibold border-b-2 border-[#C5A46D]'
                  : 'hover:text-[#245B4A]'
              }`}
            >
              Diamond
            </button>

            <button
              onClick={() => navigate('/collections/bridal')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                currentRoute === '/collections/bridal'
                  ? 'text-[#245B4A] font-semibold border-b-2 border-[#C5A46D]'
                  : 'hover:text-[#245B4A]'
              }`}
            >
              Bridal
            </button>

            <button
              onClick={() => navigate('/custom-jewellery')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1 ${
                currentRoute === '/custom-jewellery'
                  ? 'text-[#245B4A] font-semibold border-b-2 border-[#C5A46D]'
                  : 'hover:text-[#245B4A]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A46D]" />
              <span>Custom Jewellery</span>
            </button>

            <button
              onClick={() => navigate('/about')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                currentRoute === '/about'
                  ? 'text-[#245B4A] font-semibold border-b-2 border-[#C5A46D]'
                  : 'hover:text-[#245B4A]'
              }`}
            >
              About Us
            </button>

            {/* More Menu for Secondary Links without wrapping */}
            <div
              className="relative shrink-0"
              onMouseEnter={() => setMoreMenuOpen(true)}
              onMouseLeave={() => setMoreMenuOpen(false)}
            >
              <button
                className="flex items-center gap-1 whitespace-nowrap shrink-0 py-1 hover:text-[#245B4A] transition-colors"
                aria-expanded={moreMenuOpen}
              >
                <span>Services</span>
                <ChevronDown className="w-3 h-3 text-[#C5A46D]" />
              </button>

              {moreMenuOpen && (
                <div className="absolute top-full right-0 w-56 bg-white border border-[#E7E2D9] shadow-xl rounded-md py-2 z-50 animate-in fade-in duration-150">
                  <button
                    onClick={() => {
                      setMoreMenuOpen(false);
                      navigate('/jewellery-care');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF7F0] text-xs font-medium text-[#283447] flex items-center gap-2"
                  >
                    <Wrench className="w-3.5 h-3.5 text-[#C5A46D]" />
                    <span>Jewellery Care & Repair</span>
                  </button>
                  <button
                    onClick={() => {
                      setMoreMenuOpen(false);
                      navigate('/price-guide');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF7F0] text-xs font-medium text-[#283447] flex items-center gap-2"
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-[#C5A46D]" />
                    <span>Gold Price Guide</span>
                  </button>
                  <button
                    onClick={() => {
                      setMoreMenuOpen(false);
                      navigate('/stores');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF7F0] text-xs font-medium text-[#283447] flex items-center gap-2"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#C5A46D]" />
                    <span>Boutique Locations</span>
                  </button>
                  <button
                    onClick={() => {
                      setMoreMenuOpen(false);
                      navigate('/journal');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF7F0] text-xs font-medium text-[#283447] flex items-center gap-2"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#C5A46D]" />
                    <span>The Aurelia Gazette</span>
                  </button>
                  <button
                    onClick={() => {
                      setMoreMenuOpen(false);
                      navigate('/reviews');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF7F0] text-xs font-medium text-[#283447] flex items-center gap-2"
                  >
                    <Heart className="w-3.5 h-3.5 text-[#C5A46D]" />
                    <span>Client Testimonials</span>
                  </button>
                  <button
                    onClick={() => {
                      setMoreMenuOpen(false);
                      navigate('/faq');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#FAF7F0] text-xs font-medium text-[#283447] border-t border-[#E7E2D9]/60"
                  >
                    Frequently Asked Questions
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('/contact')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                currentRoute === '/contact'
                  ? 'text-[#245B4A] font-semibold border-b-2 border-[#C5A46D]'
                  : 'hover:text-[#245B4A]'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Utility Icons (Search, Wishlist, Account, Cart) — Always Single Row */}
          <div className="flex items-center gap-3.5 xl:gap-5 shrink-0 text-[#283447]">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-1.5 hover:text-[#245B4A] transition-colors relative"
              aria-label="Search Fine Jewels"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Account / Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="p-1.5 hover:text-[#245B4A] transition-colors flex items-center gap-1"
                aria-label="User Account"
              >
                <User className="w-5 h-5 stroke-[1.75]" />
                {currentUser && currentUser.role === 'admin' && (
                  <span className="hidden xl:inline text-[10px] bg-[#245B4A] text-white px-1.5 py-0.5 rounded font-mono">
                    ADMIN
                  </span>
                )}
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E7E2D9] shadow-xl rounded-md py-2 z-50 animate-in fade-in duration-150">
                  {currentUser ? (
                    <>
                      <div className="px-4 py-2 border-b border-[#E7E2D9]">
                        <p className="text-xs font-semibold text-[#283447] truncate">{currentUser.name}</p>
                        <p className="text-[11px] text-[#82796E] truncate">{currentUser.email}</p>
                      </div>
                      <button
                        onClick={() => {
                          setAccountMenuOpen(false);
                          navigate('/account');
                        }}
                        className="w-full text-left px-4 py-2 text-xs hover:bg-[#FAF7F0] text-[#283447]"
                      >
                        Client Dashboard & Orders
                      </button>
                      {currentUser.role === 'admin' && (
                        <button
                          onClick={() => {
                            setAccountMenuOpen(false);
                            navigate('/admin');
                          }}
                          className="w-full text-left px-4 py-2 text-xs font-medium text-[#245B4A] hover:bg-[#FAF7F0] border-t border-b border-[#E7E2D9]"
                        >
                          Atelier Management Console
                        </button>
                      )}
                      <button
                        onClick={() => {
                          setAccountMenuOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-[#B87878] hover:bg-[#FAF7F0]"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setAccountMenuOpen(false);
                          navigate('/login');
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-medium text-[#245B4A] hover:bg-[#FAF7F0]"
                      >
                        Sign In / Register
                      </button>
                      <button
                        onClick={() => {
                          setAccountMenuOpen(false);
                          navigate('/login?role=admin');
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-[#82796E] hover:bg-[#FAF7F0] border-t border-[#E7E2D9]"
                      >
                        Atelier Staff Login
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Link */}
            <button
              onClick={() => navigate('/account?tab=wishlist')}
              className="p-1.5 hover:text-[#245B4A] transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.75]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B87878] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => navigate('/cart')}
              className="p-1.5 hover:text-[#245B4A] transition-colors relative"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#245B4A] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 hover:text-[#245B4A] transition-colors"
              aria-label="Toggle Mobile Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Expandable Search Overlay */}
        {searchOpen && (
          <div className="bg-white border-t border-[#E7E2D9] px-4 py-3 shadow-md animate-in slide-in-from-top-2">
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-3">
              <Search className="w-5 h-5 text-[#82796E]" />
              <input
                type="text"
                placeholder="Search gold necklaces, solitaire rings, bridal polki, bangles, or BIS HUID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent border-none text-sm focus:outline-none placeholder:text-[#82796E]/60 text-[#283447]"
              />
              <button
                type="submit"
                className="bg-[#245B4A] text-white px-4 py-1.5 text-xs uppercase tracking-wider font-medium rounded hover:bg-[#1C4537] transition-colors"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-[#82796E] hover:text-[#283447] text-xs"
              >
                Close
              </button>
            </form>
          </div>
        )}

        {/* 3. MOBILE MENU SLIDE-OUT DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[108px] bottom-0 bg-white z-50 overflow-y-auto border-t border-[#E7E2D9] p-6 animate-in slide-in-from-top-4">
            <nav className="flex flex-col gap-4 text-base font-medium text-[#283447]">
              <button
                onClick={() => {
                  navigate('/');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 border-b border-[#E7E2D9]/60 hover:text-[#245B4A]"
              >
                Home
              </button>
              <button
                onClick={() => {
                  navigate('/collections');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 border-b border-[#E7E2D9]/60 hover:text-[#245B4A]"
              >
                All Collections
              </button>
              <button
                onClick={() => {
                  navigate('/collections/gold');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 border-b border-[#E7E2D9]/60 pl-3 text-sm text-[#82796E] hover:text-[#245B4A]"
              >
                ↳ 22K & 18K Gold Jewellery
              </button>
              <button
                onClick={() => {
                  navigate('/collections/diamond');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 border-b border-[#E7E2D9]/60 pl-3 text-sm text-[#82796E] hover:text-[#245B4A]"
              >
                ↳ Diamond & Solitaires
              </button>
              <button
                onClick={() => {
                  navigate('/collections/bridal');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 border-b border-[#E7E2D9]/60 pl-3 text-sm text-[#82796E] hover:text-[#245B4A]"
              >
                ↳ Royal Bridal Trousseau
              </button>
              <button
                onClick={() => {
                  navigate('/custom-jewellery');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 border-b border-[#E7E2D9]/60 text-[#245B4A] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#C5A46D]" />
                <span>Custom Jewellery Atelier</span>
              </button>
              <button
                onClick={() => {
                  navigate('/about');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 border-b border-[#E7E2D9]/60 hover:text-[#245B4A]"
              >
                About Our Heritage
              </button>
              <button
                onClick={() => {
                  navigate('/jewellery-care');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 border-b border-[#E7E2D9]/60 hover:text-[#245B4A]"
              >
                Jewellery Care & Repair
              </button>
              <button
                onClick={() => {
                  navigate('/price-guide');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 border-b border-[#E7E2D9]/60 hover:text-[#245B4A]"
              >
                Live Gold Rate & Price Guide
              </button>
              <button
                onClick={() => {
                  navigate('/stores');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 border-b border-[#E7E2D9]/60 hover:text-[#245B4A]"
              >
                Boutique Showrooms
              </button>
              <button
                onClick={() => {
                  navigate('/book-appointment');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 border-b border-[#E7E2D9]/60 text-[#245B4A]"
              >
                Book VIP Consultation
              </button>
              <button
                onClick={() => {
                  navigate('/journal');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 border-b border-[#E7E2D9]/60 hover:text-[#245B4A]"
              >
                The Aurelia Gazette (Journal)
              </button>
              <button
                onClick={() => {
                  navigate('/contact');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 border-b border-[#E7E2D9]/60 hover:text-[#245B4A]"
              >
                Contact & Concierge
              </button>
              <button
                onClick={() => {
                  navigate('/faq');
                  setMobileMenuOpen(false);
                }}
                className="text-left py-2 border-b border-[#E7E2D9]/60 hover:text-[#245B4A]"
              >
                Frequently Asked Questions
              </button>
              
              {/* Account Quick Status */}
              <div className="pt-4 mt-2">
                {currentUser ? (
                  <div className="bg-[#FAF7F0] p-4 rounded-lg">
                    <p className="text-xs text-[#82796E]">Signed in as</p>
                    <p className="font-semibold text-sm text-[#245B4A]">{currentUser.name}</p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => {
                          navigate('/account');
                          setMobileMenuOpen(false);
                        }}
                        className="bg-[#245B4A] text-white text-xs px-3 py-1.5 rounded"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="border border-[#E7E2D9] text-xs px-3 py-1.5 rounded"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-[#245B4A] text-white py-3 rounded text-center text-sm font-medium tracking-wide"
                  >
                    Client Sign In / Register
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
