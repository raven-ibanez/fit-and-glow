import React, { useState } from 'react';
import { useCOAPageSetting } from '../hooks/useCOAPageSetting';
import { ShoppingCart, Menu, X, Calculator, FileText, HelpCircle, Truck } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onMenuClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { coaPageEnabled } = useCOAPageSetting();

  return (
    <>
      <header className="bg-black/90 backdrop-blur-xl sticky top-0 z-50 border-b border-white/10">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo and Brand */}
            <button
              onClick={() => { onMenuClick(); setMobileMenuOpen(false); }}
              className="flex items-center space-x-3 hover:opacity-80 transition-all group min-w-0 flex-1 max-w-[calc(100%-130px)] sm:max-w-none sm:flex-initial"
            >
              <div className="relative flex-shrink-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border border-white/20 shadow-glow">
                  <img
                    src="/assets/logo.jpg"
                    alt="X Peptide"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="text-left min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl font-black text-white leading-tight whitespace-nowrap overflow-hidden text-ellipsis tracking-tight">
                  X PEPTIDE
                </h1>
                <p className="text-xs text-gray-500 font-medium">
                  Premium Research Peptides
                </p>
              </div>
            </button>

            {/* Right Side Navigation */}
            <div className="flex items-center gap-2 md:gap-4 ml-auto">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1 lg:gap-2">
                <button
                  onClick={onMenuClick}
                  className="text-sm font-medium text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-all"
                >
                  Products
                </button>
                <a
                  href="/track-order"
                  className="text-sm font-medium text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-all flex items-center gap-1.5"
                >
                  <Truck className="w-4 h-4" />
                  Track
                </a>
                <a
                  href="/calculator"
                  className="text-sm font-medium text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-all flex items-center gap-1.5"
                >
                  <Calculator className="w-4 h-4" />
                  Calculator
                </a>
                {coaPageEnabled && (
                  <a
                    href="/coa"
                    className="text-sm font-medium text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-all flex items-center gap-1.5"
                  >
                    <FileText className="w-4 h-4" />
                    Lab Tests
                  </a>
                )}
                <a
                  href="/faq"
                  className="text-sm font-medium text-gray-400 hover:text-white px-3 py-2 rounded-lg hover:bg-white/5 transition-all flex items-center gap-1.5"
                >
                  <HelpCircle className="w-4 h-4" />
                  FAQ
                </a>

              </nav>

              {/* Cart Button */}
              <button
                onClick={onCartClick}
                className="relative p-2.5 text-white hover:bg-white/10 rounded-lg transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2.5 text-white hover:bg-white/10 rounded-lg transition-all"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sidebar Drawer */}
          <div
            className="absolute top-0 right-0 bottom-0 w-[300px] bg-[#0a0a0a] shadow-2xl border-l border-white/10 flex flex-col animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <span className="font-bold text-lg text-white">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col space-y-1">
                <button
                  onClick={() => {
                    onMenuClick();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 p-4 rounded-xl text-left font-medium text-white hover:bg-white/5 transition-all"
                >
                  <div className="p-2 rounded-lg bg-white/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                  </div>
                  Products
                </button>
                <a
                  href="/track-order"
                  className="flex items-center gap-3 p-4 rounded-xl text-left font-medium text-white hover:bg-white/5 transition-all"
                >
                  <div className="p-2 rounded-lg bg-white/10">
                    <Truck className="w-[18px] h-[18px]" />
                  </div>
                  Track Order
                </a>
                <a
                  href="/calculator"
                  className="flex items-center gap-3 p-4 rounded-xl text-left font-medium text-white hover:bg-white/5 transition-all"
                >
                  <div className="p-2 rounded-lg bg-white/10">
                    <Calculator className="w-[18px] h-[18px]" />
                  </div>
                  Peptide Calculator
                </a>
                <a
                  href="/coa"
                  className="flex items-center gap-3 p-4 rounded-xl text-left font-medium text-white hover:bg-white/5 transition-all"
                >
                  <div className="p-2 rounded-lg bg-white/10">
                    <FileText className="w-[18px] h-[18px]" />
                  </div>
                  Lab Tests
                </a>
                <a
                  href="/faq"
                  className="flex items-center gap-3 p-4 rounded-xl text-left font-medium text-white hover:bg-white/5 transition-all"
                >
                  <div className="p-2 rounded-lg bg-white/10">
                    <HelpCircle className="w-[18px] h-[18px]" />
                  </div>
                  FAQ
                </a>

              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

