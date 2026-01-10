import React, { useEffect, useState } from 'react';
import { ArrowRight, Shield, ChevronRight, Beaker, Dna, Award, Zap } from 'lucide-react';
import { useCOAPageSetting } from '../hooks/useCOAPageSetting';

interface HeroProps {
  onShopAll: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopAll }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { coaPageEnabled } = useCOAPageSetting();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-[85vh] sm:min-h-[90vh] overflow-hidden flex items-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        {/* Primary Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-science-blue-900 via-science-blue-800 to-science-blue-900" />

        {/* Animated Mesh Gradient Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-tech-teal/40 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-bio-green/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3 bg-science-blue-500/20 rounded-full blur-[100px]" />
        </div>

        {/* DNA Helix Pattern - Left Side */}
        <div className="hidden lg:block absolute left-[5%] top-1/2 -translate-y-1/2 w-24 h-[600px] opacity-20">
          <svg viewBox="0 0 100 600" className="w-full h-full" preserveAspectRatio="none">
            {[...Array(12)].map((_, i) => (
              <g key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.15}s` }}>
                <circle cx={50 + Math.sin(i * 0.5) * 30} cy={i * 50 + 25} r="8" fill="#1FA6A3" opacity="0.8" />
                <circle cx={50 - Math.sin(i * 0.5) * 30} cy={i * 50 + 25} r="8" fill="#6CBF4A" opacity="0.8" />
                <line
                  x1={50 + Math.sin(i * 0.5) * 30} y1={i * 50 + 25}
                  x2={50 - Math.sin(i * 0.5) * 30} y2={i * 50 + 25}
                  stroke="white" strokeWidth="2" opacity="0.3"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* DNA Helix Pattern - Right Side */}
        <div className="hidden lg:block absolute right-[5%] top-1/2 -translate-y-1/2 w-24 h-[600px] opacity-20">
          <svg viewBox="0 0 100 600" className="w-full h-full" preserveAspectRatio="none">
            {[...Array(12)].map((_, i) => (
              <g key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.15 + 0.5}s` }}>
                <circle cx={50 + Math.cos(i * 0.5) * 30} cy={i * 50 + 25} r="8" fill="#6CBF4A" opacity="0.8" />
                <circle cx={50 - Math.cos(i * 0.5) * 30} cy={i * 50 + 25} r="8" fill="#1FA6A3" opacity="0.8" />
                <line
                  x1={50 + Math.cos(i * 0.5) * 30} y1={i * 50 + 25}
                  x2={50 - Math.cos(i * 0.5) * 30} y2={i * 50 + 25}
                  stroke="white" strokeWidth="2" opacity="0.3"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Floating Molecular Structures */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-white/10 rounded-full animate-float"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i}s`
              }}
            />
          ))}
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center lg:text-left lg:mx-0">

          {/* Badge */}
          <div
            className={`inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <div className="w-2 h-2 bg-bio-green rounded-full animate-pulse" />
            <span className="text-xs font-bold text-white uppercase tracking-[0.2em]">Research-Grade Peptide Science</span>
            <Beaker className="w-4 h-4 text-tech-teal" />
          </div>

          {/* Headline */}
          <h1
            className={`font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] mb-8 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            Precision Peptides.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-teal via-bio-green to-tech-teal bg-[length:200%_auto] animate-gradient">
              Pure Science.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-lg md:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed font-sans mx-auto lg:mx-0 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            HPLC-verified, third-party tested peptides for labs, clinicians, and educated researchers.
            No fluff—just <span className="text-white font-semibold">99%+ purity</span> and uncompromising transparency.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-16 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <button
              onClick={onShopAll}
              className="w-full sm:w-auto group relative px-8 py-4 bg-gradient-to-r from-bio-green to-tech-teal text-white font-bold rounded-lg shadow-lg shadow-bio-green/25 hover:shadow-xl hover:shadow-bio-green/30 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">Explore Catalog</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-tech-teal to-bio-green opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {coaPageEnabled && (
              <a
                href="/coa"
                className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Shield className="w-5 h-5 text-tech-teal" />
                View Lab Reports
                <ChevronRight className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Trust Stats Bar */}
          <div
            className={`flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 lg:gap-12 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            {[
              { icon: Dna, value: '99%+', label: 'Purity Verified' },
              { icon: Award, value: '500+', label: 'Orders Shipped' },
              { icon: Zap, value: '24hr', label: 'Fast Processing' }
            ].map((stat, idx) => (
              <div key={idx} className="flex items-center gap-2 sm:gap-3 group">
                <div className="p-1.5 sm:p-2 rounded-lg bg-white/5 border border-white/10 group-hover:border-tech-teal/50 group-hover:bg-white/10 transition-colors">
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-tech-teal" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-20" />

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(180deg); opacity: 0.6; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-gradient { animation: gradient 4s ease infinite; }
      `}</style>
    </div>
  );
};

export default Hero;
