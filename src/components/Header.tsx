import React, { useState } from 'react';
import { ShoppingCart, Menu, X, FlaskConical, HelpCircle, Truck, Calculator } from 'lucide-react';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onMenuClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white/70 backdrop-blur-xl sticky top-0 z-50 border-b border-white/40 shadow-soft">
        <div className="container mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo - Refined Branding */}
            <button
              onClick={() => { onMenuClick(); setMobileMenuOpen(false); }}
              className="flex items-center hover:opacity-80 transition-all active:scale-95 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-blush-400 blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
                <img
                  src="/glow-logo.jpg"
                  alt="Fit and Glow"
                  className="h-10 sm:h-12 w-auto object-contain rounded-xl relative z-10 border border-white/60 shadow-sm"
                />
              </div>
              <span className="ml-4 text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
                Fit & <span className="text-blush-600">Glow</span>
              </span>
            </button>

            {/* Right Side Navigation */}
            <div className="flex items-center gap-2 md:gap-8 ml-auto">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                {[
                  { name: 'Products', icon: FlaskConical, onClick: onMenuClick },
                  { name: 'Calculator', icon: Calculator, href: '/calculator' },
                  { name: 'Protocols', icon: FlaskConical, href: '/protocols' },
                  { name: 'Track', icon: Truck, href: '/track-order' },
                  { name: 'FAQ', icon: HelpCircle, href: '/faq' },
                ].map((item, idx) => (
                  item.href ? (
                    <a
                      key={idx}
                      href={item.href}
                      className="text-[13px] font-semibold text-slate-600 hover:text-blush-600 px-4 py-2 rounded-full transition-all hover:bg-white/50 flex items-center gap-2 group"
                    >
                      <item.icon className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                      {item.name}
                    </a>
                  ) : (
                    <button
                      key={idx}
                      onClick={item.onClick}
                      className="text-[13px] font-semibold text-slate-600 hover:text-blush-600 px-4 py-2 rounded-full transition-all hover:bg-white/50 flex items-center gap-2 group"
                    >
                      <item.icon className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                      {item.name}
                    </button>
                  )
                ))}
              </nav>

              {/* Cart Button - Enhanced */}
              <button
                onClick={onCartClick}
                className="relative p-3 text-slate-700 hover:bg-blush-600 hover:text-white rounded-full transition-all shadow-sm hover:shadow-glow hover:-translate-y-0.5 active:scale-90 bg-white/80 border border-white/60"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1 border-2 border-white shadow-sm animate-bounce">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-3 text-slate-700 hover:bg-blush-50 rounded-full transition-all active:scale-95 bg-white border border-white/60"
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
            className="absolute inset-0 bg-charcoal-900/30 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sidebar Drawer */}
          <div
            className="absolute top-0 right-0 bottom-0 w-[300px] bg-white shadow-2xl border-l border-blush-100 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-blush-100/50">
              <div className="flex items-center gap-4">
                <img
                  src="/glow-logo.jpg"
                  alt="Fit and Glow"
                  className="h-10 w-auto object-contain rounded-xl shadow-sm border border-white/60"
                />
                <span className="text-xl font-heading font-bold text-slate-900">
                  Fit & <span className="text-blush-600">Glow</span>
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-slate-400 hover:text-rose-500 transition-colors rounded-full hover:bg-rose-50 active:scale-95"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col space-y-2">
                {[
                  { name: 'Products', icon: FlaskConical, onClick: onMenuClick },
                  { name: 'Calculator', icon: Calculator, href: '/calculator' },
                  { name: 'Protocols', icon: FlaskConical, href: '/protocols' },
                  { name: 'Track Order', icon: Truck, href: '/track-order' },
                  { name: 'FAQ', icon: HelpCircle, href: '/faq' },
                ].map((item, idx) => (
                  item.href ? (
                    <a
                      key={idx}
                      href={item.href}
                      className="flex items-center gap-4 p-4 rounded-2xl font-semibold text-slate-700 hover:bg-blush-50 hover:text-blush-700 transition-all active:scale-[0.98] border border-transparent hover:border-blush-100 shadow-sm hover:shadow-md"
                    >
                      <div className="p-2 rounded-xl bg-white shadow-sm border border-slate-100 group-hover:bg-blush-600 group-hover:text-white transition-colors">
                        <item.icon className="w-5 h-5 text-blush-600" />
                      </div>
                      {item.name}
                    </a>
                  ) : (
                    <button
                      key={idx}
                      onClick={() => {
                        item.onClick?.();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-4 p-4 rounded-2xl font-semibold text-slate-700 hover:bg-blush-50 hover:text-blush-700 transition-all active:scale-[0.98] border border-transparent hover:border-blush-100 shadow-sm hover:shadow-md text-left w-full group"
                    >
                      <div className="p-2 rounded-xl bg-white shadow-sm border border-slate-100 group-hover:bg-blush-600 group-hover:text-white transition-colors">
                        <item.icon className="w-5 h-5 text-blush-600" />
                      </div>
                      {item.name}
                    </button>
                  )
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
