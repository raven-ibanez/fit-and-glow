import React from 'react';
import { Activity, HelpCircle, Calculator, FileText, Truck, Phone, Mail, MessageCircle } from 'lucide-react';
import { useCOAPageSetting } from '../hooks/useCOAPageSetting';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { coaPageEnabled } = useCOAPageSetting();

  return (
    <footer className="bg-science-blue-900 pt-16 pb-8 border-t border-science-blue-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

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

          {/* Contact Us */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-2">Contact Us</h3>

            <a
              href="tel:09761536129"
              className="text-science-blue-200 hover:text-white transition-colors flex items-center gap-2 text-sm"
            >
              <Phone className="w-4 h-4 text-tech-teal" />
              0976-153-6129
            </a>

            <a
              href="viber://chat?number=09665487151"
              className="text-science-blue-200 hover:text-white transition-colors flex items-center gap-2 text-sm"
            >
              <MessageCircle className="w-4 h-4 text-bio-green" />
              Viber: 09665487151
            </a>

            <a
              href="https://www.facebook.com/profile.php?id=61585973522665"
              target="_blank"
              rel="noopener noreferrer"
              className="text-science-blue-200 hover:text-white transition-colors flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              RS Peptides PH
            </a>

            <a
              href="mailto:Rspeptides8@gmail.com"
              className="text-science-blue-200 hover:text-white transition-colors flex items-center gap-2 text-sm"
            >
              <Mail className="w-4 h-4 text-tech-teal" />
              Rspeptides8@gmail.com
            </a>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-2">Quick Links</h3>
            <a
              href="/track-order"
              className="text-science-blue-200 hover:text-white transition-colors flex items-center gap-2 text-sm"
            >
              <Truck className="w-4 h-4" />
              Track Order
            </a>
            <a
              href="/calculator"
              className="text-science-blue-200 hover:text-white transition-colors flex items-center gap-2 text-sm"
            >
              <Calculator className="w-4 h-4" />
              Calculator
            </a>
            {coaPageEnabled && (
              <a
                href="/coa"
                className="text-science-blue-200 hover:text-white transition-colors flex items-center gap-2 text-sm"
              >
                <FileText className="w-4 h-4" />
                Lab Reports
              </a>
            )}
            <a
              href="/faq"
              className="text-science-blue-200 hover:text-white transition-colors flex items-center gap-2 text-sm"
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
