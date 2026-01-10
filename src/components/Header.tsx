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
      <header className="bg-white sticky top-0 z-50 border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <button
              onClick={() => { onMenuClick(); setMobileMenuOpen(false); }}
              className="flex items-center hover:opacity-90 transition-opacity"
            >
              <div className="h-10 sm:h-12 flex items-center">
                {/* Using text placeholder if image doesn't match new brand, otherwise keep image */}
                {/* For now keeping image container but adding text fallback context mentally */}
                <img
                  src="/rs-peptides-logo.png"
                  alt="RS PEPTIDES"
                  className="h-full w-auto object-contain"
                />
              </div>
            </button>

            {/* Right Side Navigation */}
            <div className="flex items-center gap-2 md:gap-6 ml-auto">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1 lg:gap-4">
                <button
                  onClick={onMenuClick}
                  className="text-sm font-semibold text-science-blue-900 hover:text-tech-teal px-3 py-2 rounded transition-colors"
                >
                  Catalog
                </button>
                <a
                  href="/track-order"
                  className="text-sm font-medium text-gray-600 hover:text-science-blue-600 px-3 py-2 rounded transition-colors flex items-center gap-2"
                >
                  <Truck className="w-4 h-4" />
                  Track
                </a>
                <a
                  href="/calculator"
                  className="text-sm font-medium text-gray-600 hover:text-science-blue-600 px-3 py-2 rounded transition-colors flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4" />
                  Calc
                </a>
                {coaPageEnabled && (
                  <a
                    href="/coa"
                    className="text-sm font-medium text-gray-600 hover:text-science-blue-600 px-3 py-2 rounded transition-colors flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    COA
                  </a>
                )}
                <a
                  href="/faq"
                  className="text-sm font-medium text-gray-600 hover:text-science-blue-600 px-3 py-2 rounded transition-colors flex items-center gap-2"
                >
                  <HelpCircle className="w-4 h-4" />
                  FAQ
                </a>

              </nav>

              {/* Cart Button */}
              <button
                onClick={onCartClick}
                className="relative p-2 text-science-blue-800 hover:bg-clinical-blue rounded-md transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-tech-teal text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-science-blue-800 hover:bg-clinical-blue rounded-md transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
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
            className="absolute inset-0 bg-science-blue-900/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sidebar Drawer */}
          <div
            className="absolute top-0 right-0 bottom-0 w-[300px] bg-white shadow-2xl border-l border-gray-100 flex flex-col animate-in slide-in-from-right duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <span className="font-heading font-bold text-lg text-science-blue-900">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-science-blue-600 transition-colors rounded hover:bg-clinical-blue"
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
                  className="flex items-center gap-3 p-4 rounded-lg text-left font-medium text-science-blue-900 hover:bg-clinical-blue transition-colors"
                >
                  <div className="p-2 rounded bg-white border border-gray-100 shadow-sm text-science-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                  </div>
                  Products
                </button>

                {[
                  { href: '/track-order', icon: Truck, label: 'Track Order' },
                  { href: '/calculator', icon: Calculator, label: 'Peptide Calculator' },
                  { href: '/coa', icon: FileText, label: 'Lab Reports (COA)' },
                  { href: '/faq', icon: HelpCircle, label: 'FAQ' },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    className="flex items-center gap-3 p-4 rounded-lg text-left font-medium text-science-blue-900 hover:bg-clinical-blue transition-colors"
                  >
                    <div className="p-2 rounded bg-white border border-gray-100 shadow-sm text-science-blue-600">
                      <item.icon className="w-[18px] h-[18px]" />
                    </div>
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
