import { HelpCircle, MapPin, Truck, FlaskConical, CheckCircle2 } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F172A] pt-24 pb-12 border-t border-slate-800/60 relative overflow-hidden">
      {/* Decorative Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blush-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

          {/* Brand/Identity Segment */}
          <div className="flex flex-col items-center md:items-start lg:col-span-1">
            <div className="flex items-center gap-4 mb-8">
              <img
                src="/glow-logo.jpg"
                alt="Fit and Glow"
                className="h-14 w-auto object-contain bg-white rounded-2xl p-2 shadow-glow"
              />
              <span className="text-2xl font-heading font-black text-white tracking-tight">
                Fit & <span className="text-blush-500">Glow</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-8 max-w-sm text-center md:text-left font-medium opacity-80">
              Leading the evolution of wellness through medical-grade peptides. Meticulously lab-tested, scientifically formulated.
            </p>
            <div className="flex items-center gap-4">
              {/* Optional Social Icons could go here */}
            </div>
          </div>

          {/* Engagement Channels */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8 border-b border-blush-500/30 pb-2">
              Communication
            </h3>
            <div className="space-y-5">
              <a
                href="mailto:fitandglow2026@gmail.com"
                className="text-slate-400 hover:text-blush-400 transition-all flex items-center gap-4 text-sm font-semibold group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center group-hover:bg-blush-600 group-hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                fitandglow2026@gmail.com
              </a>

              <a
                href="tel:+639989747336"
                className="text-slate-400 hover:text-blush-400 transition-all flex items-center gap-4 text-sm font-semibold group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center group-hover:bg-blush-600 group-hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                0908 281 4438
              </a>

              <div className="text-slate-400 flex items-center gap-4 text-sm font-semibold">
                <div className="w-10 h-10 rounded-xl bg-slate-800/50 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-slate-400" />
                </div>
                NCR, Philippines
              </div>
            </div>
          </div>

          {/* Exploration Path */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white font-black text-xs uppercase tracking-[0.2em] mb-8 border-b border-blush-500/30 pb-2">
              Navigation
            </h3>
            <div className="space-y-4 w-full">
              {[
                { name: 'Products', icon: FlaskConical, href: '#' },
                { name: 'Order Track', icon: Truck, href: '/track-order' },
                { name: 'Knowledge Base', icon: HelpCircle, href: '/faq' },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="text-slate-400 hover:text-white transition-all flex items-center gap-3 text-[13px] font-bold group"
                >
                  <link.icon className="w-4 h-4 text-blush-600 group-hover:scale-110 transition-transform" />
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Certification Trust */}
          <div className="flex flex-col items-center md:items-start">
            <div className="bg-slate-800/30 backdrop-blur-md p-6 rounded-3xl border border-slate-700/50 w-full">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-6 h-6 text-blush-500" />
                <span className="text-white font-black text-sm tracking-tight">Authenticated Source</span>
              </div>
              <p className="text-xs text-slate-400 font-medium leading-relaxed opacity-70">
                All batches are strictly analyzed for purity and potency. Scan COA included in every package.
              </p>
            </div>
          </div>

        </div>

        {/* Global Footer Terminal */}
        <div className="pt-12 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center md:text-left">
            © {currentYear} Fit and Glow. Engineered for Excellence.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-black text-blush-600 uppercase tracking-[0.2em] animate-pulse">
            <span className="w-2 h-2 rounded-full bg-blush-600" />
            System Optimized
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
