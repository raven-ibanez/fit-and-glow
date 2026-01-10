import React from 'react';
import { Activity, HelpCircle, Calculator, FileText, Truck } from 'lucide-react';
import { useCOAPageSetting } from '../hooks/useCOAPageSetting';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { coaPageEnabled } = useCOAPageSetting();

  return (
    <footer className="bg-science-blue-900 pt-16 pb-8 border-t border-science-blue-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">

          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="h-12 bg-white rounded p-2">
              <img
                src="/rs-peptides-logo.png"
                alt="RS PEPTIDES"
                className="h-full w-auto object-contain"
              />
            </div>
            <p className="text-science-blue-100/80 text-sm max-w-xs text-center md:text-left">
              Research-grade peptide science built on precision and trust.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-6 justify-center md:justify-end">
            <a
              href="/track-order"
              className="text-science-blue-200 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Truck className="w-4 h-4" />
              Track
            </a>
            <a
              href="/calculator"
              className="text-science-blue-200 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <Calculator className="w-4 h-4" />
              Calculator
            </a>
            {coaPageEnabled && (
              <a
                href="/coa"
                className="text-science-blue-200 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
              >
                <FileText className="w-4 h-4" />
                Lab Reports
              </a>
            )}
            <a
              href="/faq"
              className="text-science-blue-200 hover:text-white transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <HelpCircle className="w-4 h-4" />
              FAQ
            </a>

          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-science-blue-800 mb-6" />

        {/* Locations */}
        <div className="text-center mb-6">
          <p className="text-xs text-science-blue-300 font-bold uppercase tracking-wider mb-2">Our Locations</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
            <span className="text-xs text-science-blue-400">Mandaluyong, Metro Manila</span>
            <span className="hidden md:inline text-science-blue-700">•</span>
            <span className="text-xs text-science-blue-400">Bajada, Davao City</span>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center">
          <p className="text-xs text-science-blue-400 flex items-center justify-center gap-1">
            Engineered with
            <Activity className="w-3 h-3 text-bio-green-500" />
            © {currentYear} RS PEPTIDES.
          </p>
          <p className="text-[10px] text-science-blue-500/60 mt-2 uppercase tracking-wide">
            For Research & Educational Reference Only. Not intended for human use.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
