import React, { useEffect, useState } from 'react';
import { ArrowRight, Shield, FlaskConical, BadgeCheck, Droplets, Eye, Sparkles } from 'lucide-react';
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
    <div className="relative min-h-[82vh] lg:min-h-[85vh] overflow-hidden bg-gradient-to-br from-white via-clinical-blue/10 to-tech-teal/5">

      {/* Animated Gradient Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-gradient-to-br from-tech-teal/20 to-bio-green/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
      <div className="absolute bottom-[-15%] left-[-10%] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-gradient-to-tr from-science-blue-200/30 to-tech-teal/15 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }} />
      <div className="absolute top-[40%] left-[20%] w-[200px] h-[200px] bg-gradient-to-br from-bio-green/10 to-transparent rounded-full blur-2xl animate-pulse hidden sm:block" style={{ animationDuration: '4s', animationDelay: '2s' }} />

      {/* Floating Particles - Throughout */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: `${4 + Math.random() * 12}px`,
              height: `${4 + Math.random() * 12}px`,
              backgroundColor: i % 3 === 0 ? 'rgba(31,166,163,0.4)' : i % 3 === 1 ? 'rgba(108,191,74,0.35)' : 'rgba(13,59,102,0.2)',
              left: `${5 + Math.random() * 90}%`,
              top: `${5 + Math.random() * 85}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* DNA Helix - Animated */}
      <div className="absolute right-0 top-0 bottom-0 w-full pointer-events-none">
        <svg
          className="absolute right-2 sm:right-8 lg:right-16 top-1/2 -translate-y-1/2 h-[55%] sm:h-[65%] lg:h-[75%] w-auto opacity-20 sm:opacity-40 lg:opacity-70 animate-bounce"
          style={{ animationDuration: '8s', animationTimingFunction: 'ease-in-out' }}
          viewBox="0 0 150 500"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="helixGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1FA6A3" />
              <stop offset="50%" stopColor="#0D3B66" />
              <stop offset="100%" stopColor="#1FA6A3" />
            </linearGradient>
            <linearGradient id="helixGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#6CBF4A" />
              <stop offset="50%" stopColor="#1FA6A3" />
              <stop offset="100%" stopColor="#6CBF4A" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Strand 1 */}
          <path
            d="M75,15 C140,55 10,105 75,145 C140,185 10,235 75,275 C140,315 10,365 75,405 C140,445 10,485 75,485"
            fill="none"
            stroke="url(#helixGrad1)"
            strokeWidth="12"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* Strand 2 */}
          <path
            d="M75,15 C10,55 140,105 75,145 C10,185 140,235 75,275 C10,315 140,365 75,405 C10,445 140,485 75,485"
            fill="none"
            stroke="url(#helixGrad2)"
            strokeWidth="12"
            strokeLinecap="round"
            filter="url(#glow)"
          />

          {/* Base Pairs with Glow */}
          {[...Array(13)].map((_, i) => {
            const y = 35 + i * 36;
            const phase = (i * 0.38);
            const offset = Math.sin(phase) * 50;
            return (
              <g key={i}>
                <line x1={75 + offset} y1={y} x2={75 - offset} y2={y} stroke="rgba(13,59,102,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx={75 + offset} cy={y} r="7" fill="#1FA6A3" filter="url(#glow)" />
                <circle cx={75 + offset} cy={y} r="3" fill="white" opacity="0.5" />
                <circle cx={75 - offset} cy={y} r="7" fill="#6CBF4A" filter="url(#glow)" />
                <circle cx={75 - offset} cy={y} r="3" fill="white" opacity="0.5" />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Decorative Rings */}
      <div className="hidden sm:block absolute top-[15%] right-[20%] w-32 h-32 border-2 border-tech-teal/10 rounded-full" />
      <div className="hidden sm:block absolute bottom-[25%] left-[8%] w-24 h-24 border-2 border-bio-green/10 rounded-full" />
      <div className="hidden lg:block absolute top-[30%] left-[15%] w-16 h-16 border border-science-blue-200/30 rounded-full" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24 lg:pt-16 lg:pb-32">
        <div className="max-w-2xl mx-auto text-center lg:text-left lg:mx-0">

          {/* Logo with Circle Animation */}
          <div
            className={`mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
          >
            <div className="relative inline-block mx-auto lg:mx-0">
              {/* Rotating Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-tech-teal/40 animate-spin" style={{ animationDuration: '12s' }} />
              {/* Pulse Ring */}
              <div className="absolute inset-[-4px] rounded-full border-2 border-tech-teal/20 animate-pulse" />
              {/* Logo Container */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white shadow-lg shadow-tech-teal/10 border border-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src="/rs-peptides-logo.png"
                  alt="RSPEPTIDE"
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                />
              </div>
            </div>
          </div>

          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-tech-teal/20 shadow-lg shadow-tech-teal/5 mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <Sparkles className="w-4 h-4 text-tech-teal animate-pulse" />
            <span className="text-xs font-bold text-science-blue-800 uppercase tracking-wider">Lab-Tested Excellence</span>
          </div>

          {/* Headline */}
          <h1
            className={`font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <span className="text-science-blue-900 block">Research-Grade Peptides.</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-tech-teal to-bio-green block mt-1">Precision You Can Trust.</span>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-base sm:text-lg text-gray-600 max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Advanced peptide solutions developed with scientific rigor, transparency, and consistent quality standards.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 mb-4 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <button
              onClick={onShopAll}
              className="w-full sm:w-auto group px-8 py-4 bg-gradient-to-r from-tech-teal to-tech-teal/90 text-white font-bold rounded-full shadow-xl shadow-tech-teal/25 hover:shadow-2xl hover:shadow-tech-teal/35 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative">Explore Peptides</span>
              <ArrowRight className="w-5 h-5 relative group-hover:translate-x-1 transition-transform" />
            </button>

            {coaPageEnabled && (
              <a
                href="/coa"
                className="w-full sm:w-auto px-8 py-4 bg-white text-science-blue-900 font-semibold rounded-full border-2 border-gray-200 hover:border-tech-teal hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4 text-tech-teal" />
                View Research Standards
              </a>
            )}
          </div>

          {/* Rush Order Contact */}
          <div
            className={`mb-6 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <a
              href="https://m.me/61585973522665"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-tech-teal transition-colors"
            >
              <span className="w-2 h-2 bg-tech-teal rounded-full animate-pulse" />
              For rush orders, please contact us
            </a>
          </div>

        </div>
      </div>

      {/* Trust Bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-100 py-4 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-10">
            {[
              { icon: FlaskConical, label: 'Research Grade' },
              { icon: BadgeCheck, label: 'Third-Party Tested' },
              { icon: Droplets, label: 'High Purity' },
              { icon: Eye, label: 'Transparent' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-gray-600">
                <item.icon className="w-4 h-4 text-tech-teal" />
                <span className="text-xs sm:text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
