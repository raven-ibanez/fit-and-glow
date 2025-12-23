import React from 'react';
import { Heart, HelpCircle, Calculator, FileText, Truck } from 'lucide-react';
import { useCOAPageSetting } from '../hooks/useCOAPageSetting';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { coaPageEnabled } = useCOAPageSetting();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">

          {/* Brand Section */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/20 shadow-glow">
              <img
                src="/assets/logo.jpg"
                alt="X Peptide"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left">
              <div className="font-black text-white text-xl tracking-tight">
                X PEPTIDE
              </div>
              <div className="text-xs text-gray-500">Premium Research Peptides</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-4 justify-center md:justify-end">
            <a
              href="/track-order"
              className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Truck className="w-4 h-4" />
              Track
            </a>
            <a
              href="/calculator"
              className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Calculator className="w-4 h-4" />
              Calculator
            </a>
            {coaPageEnabled && (
              <a
                href="/coa"
                className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <FileText className="w-4 h-4" />
                Lab Tests
              </a>
            )}
            <a
              href="/faq"
              className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <HelpCircle className="w-4 h-4" />
              FAQ
            </a>

          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

        {/* Footer Bottom */}
        <div className="text-center">
          <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
            Made with
            <Heart className="w-3 h-3 text-white/50 fill-white/50" />
            © {currentYear} X Peptide. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
