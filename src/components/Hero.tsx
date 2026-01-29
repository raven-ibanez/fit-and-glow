import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Shield, FlaskConical } from 'lucide-react';

interface HeroProps {
  onShopAll: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopAll }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-[95vh] overflow-hidden flex items-center justify-center pt-20">
      {/* Dynamic Background System */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,#ECFDF5_0%,#FFFFFF_100%)]" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
      </div>

      {/* Animated Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-blush-100/30 rounded-full blur-[120px] animate-float opacity-60" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-blush-200/20 rounded-full blur-[100px] animate-float opacity-40" style={{ animationDelay: '-3s' }} />

        {/* Floating "Cells" - Decorative */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/40 border border-white/60 backdrop-blur-sm rounded-full shadow-soft animate-float"
            style={{
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              animationDuration: `${Math.random() * 4 + 6}s`,
              animationDelay: `${Math.random() * -5}s`,
              opacity: 0.5
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Left Side: Content Box */}
          <div className={`flex-1 text-center lg:text-left transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blush-50 border border-blush-100 shadow-sm mb-8 animate-fadeIn">
              <Sparkles className="w-4 h-4 text-blush-600" />
              <span className="text-[11px] font-bold text-blush-800 uppercase tracking-widest">The Science of Radiance</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
              Evolve Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blush-600 to-emerald-500">Essential Glow.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience medical-grade purity. Our premium peptides are meticulously lab-tested to unlock your peak wellness and natural vitality.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <button
                onClick={onShopAll}
                className="btn-primary flex items-center group w-full sm:w-auto"
              >
                Explore Collection
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-4 text-slate-500 text-sm font-medium">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <span>Trusted by 2k+ Researchers</span>
              </div>
            </div>
          </div>

          {/* Right Side: Hero Visual */}
          <div className={`flex-1 relative w-full max-w-[600px] transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
            <div className="relative aspect-square">
              {/* Glass Card for Logo Surround */}
              <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl rounded-[3rem] border border-white shadow- luxury shadow-blush-600/5 rotate-3 scale-105" />
              <div className="absolute inset-0 bg-white/70 backdrop-blur-md rounded-[3rem] border border-white shadow-luxury -rotate-3 transition-transform hover:rotate-0 duration-700 overflow-hidden flex items-center justify-center p-12">
                <img
                  src="/glow-logo.jpg"
                  alt="Fit and Glow"
                  className="w-full h-auto object-contain drop-shadow-2xl rounded-2xl transform hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Floating Feature Badges */}
              <div className="absolute -top-6 -right-6 lg:-right-12 bg-white p-4 rounded-2xl shadow-uplift border border-slate-100 animate-float" style={{ animationDelay: '-1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blush-50 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blush-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 leading-none mb-1">QUALITY</p>
                    <p className="text-sm font-bold text-slate-800">99.9% Pure</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 lg:-left-12 bg-white p-4 rounded-2xl shadow-uplift border border-slate-100 animate-float" style={{ animationDelay: '-2.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                    <FlaskConical className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 leading-none mb-1">TRUST</p>
                    <p className="text-sm font-bold text-slate-800">Lab Tested</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
