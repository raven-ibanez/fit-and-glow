import React, { useEffect, useState } from 'react';
import { ArrowRight, Shield, ChevronRight, Leaf, Scale, Heart } from 'lucide-react';

interface HeroProps {
  onShopAll: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopAll }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);



  return (
    <div className="relative min-h-[90vh] bg-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-blue-50 to-sage-100" />

        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/[0.03] rounded-full blur-3xl" />

        {/* Large Decorative Measuring Tape - Premium flowing design */}
        <div className="absolute -top-10 -right-10 md:top-0 md:right-0 w-[350px] sm:w-[450px] md:w-[550px] lg:w-[700px] h-[400px] sm:h-[500px] md:h-[600px] lg:h-[750px] opacity-25 md:opacity-30">
          <svg viewBox="0 0 700 750" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Background glow effect */}
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="tapeGradientPremium" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7BC26A" />
                <stop offset="35%" stopColor="#2CA6A4" />
                <stop offset="70%" stopColor="#A8DCE6" />
                <stop offset="100%" stopColor="#2CA6A4" />
              </linearGradient>
              <linearGradient id="tapeEdgeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
              </linearGradient>
              <linearGradient id="shadowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B3A5A" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0B3A5A" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Shadow layer */}
            <path
              d="M580 30 
                 C650 30, 690 80, 690 150
                 C690 240, 640 300, 560 360
                 C480 420, 420 480, 380 560
                 C340 640, 280 700, 200 720
                 C140 735, 80 700, 70 640
                 C60 580, 100 540, 160 550
                 C220 560, 240 620, 200 650
                 C160 680, 120 650, 130 610
                 C140 580, 170 590, 165 615"
              stroke="url(#shadowGradient)"
              strokeWidth="50"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              transform="translate(8, 8)"
            />

            {/* Main tape ribbon - elegant flowing curve with spiral end */}
            <path
              d="M580 30 
                 C650 30, 690 80, 690 150
                 C690 240, 640 300, 560 360
                 C480 420, 420 480, 380 560
                 C340 640, 280 700, 200 720
                 C140 735, 80 700, 70 640
                 C60 580, 100 540, 160 550
                 C220 560, 240 620, 200 650
                 C160 680, 120 650, 130 610
                 C140 580, 170 590, 165 615"
              stroke="url(#tapeGradientPremium)"
              strokeWidth="42"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#glow)"
            />

            {/* Top edge highlight for 3D effect */}
            <path
              d="M580 30 
                 C650 30, 690 80, 690 150
                 C690 240, 640 300, 560 360
                 C480 420, 420 480, 380 560
                 C340 640, 280 700, 200 720"
              stroke="url(#tapeEdgeGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              fill="none"
              opacity="0.8"
            />

            {/* Measurement marks - professionally spaced */}
            <g stroke="#0B3A5A" strokeLinecap="round" opacity="0.6">
              {/* Long marks (major) */}
              <line x1="565" y1="45" x2="595" y2="45" strokeWidth="3" />
              <line x1="610" y1="75" x2="635" y2="65" strokeWidth="3" />
              <line x1="645" y1="120" x2="670" y2="110" strokeWidth="3" />
              <line x1="660" y1="175" x2="685" y2="170" strokeWidth="3" />
              <line x1="655" y1="235" x2="678" y2="235" strokeWidth="3" />
              <line x1="625" y1="295" x2="645" y2="305" strokeWidth="3" />
              <line x1="575" y1="350" x2="592" y2="368" strokeWidth="3" />
              <line x1="515" y1="405" x2="528" y2="425" strokeWidth="3" />
              <line x1="455" y1="465" x2="462" y2="488" strokeWidth="3" />
              <line x1="410" y1="530" x2="412" y2="555" strokeWidth="3" />
              <line x1="370" y1="595" x2="365" y2="620" strokeWidth="3" />
              <line x1="315" y1="655" x2="302" y2="678" strokeWidth="3" />
              <line x1="250" y1="700" x2="232" y2="718" strokeWidth="3" />

              {/* Short marks (minor) */}
              <line x1="590" y1="58" x2="608" y2="52" strokeWidth="2" />
              <line x1="630" y1="95" x2="650" y2="88" strokeWidth="2" />
              <line x1="655" y1="145" x2="675" y2="140" strokeWidth="2" />
              <line x1="660" y1="205" x2="680" y2="202" strokeWidth="2" />
              <line x1="642" y1="265" x2="660" y2="270" strokeWidth="2" />
              <line x1="600" y1="325" x2="615" y2="340" strokeWidth="2" />
              <line x1="545" y1="378" x2="558" y2="398" strokeWidth="2" />
              <line x1="485" y1="435" x2="495" y2="458" strokeWidth="2" />
              <line x1="432" y1="498" x2="436" y2="522" strokeWidth="2" />
              <line x1="390" y1="562" x2="388" y2="588" strokeWidth="2" />
              <line x1="342" y1="628" x2="332" y2="652" strokeWidth="2" />
              <line x1="280" y1="680" x2="265" y2="700" strokeWidth="2" />
            </g>

            {/* Numbers on tape */}
            <g fill="#0B3A5A" fontSize="16" fontWeight="700" opacity="0.5" fontFamily="Inter, sans-serif">
              <text x="598" y="50" transform="rotate(-5 598 50)">1</text>
              <text x="665" y="130" transform="rotate(15 665 130)">2</text>
              <text x="658" y="220" transform="rotate(35 658 220)">3</text>
              <text x="610" y="310" transform="rotate(50 610 310)">4</text>
              <text x="535" y="395" transform="rotate(55 535 395)">5</text>
              <text x="455" y="480" transform="rotate(60 455 480)">6</text>
              <text x="390" y="565" transform="rotate(65 390 565)">7</text>
              <text x="310" y="660" transform="rotate(70 310 660)">8</text>
            </g>

            {/* Decorative small leaf near the spiral */}
            <g transform="translate(90, 580) rotate(-20)" opacity="0.4">
              <path
                d="M0 40 C-15 25, -10 5, 0 0 C10 5, 15 25, 0 40"
                fill="#7BC26A"
              />
              <path d="M0 38 L0 5" stroke="#2CA6A4" strokeWidth="1.5" />
            </g>
          </svg>
        </div>

        {/* Secondary smaller tape measure - bottom left accent */}
        <div className="absolute bottom-10 left-0 w-[150px] sm:w-[200px] md:w-[280px] h-[200px] sm:h-[250px] md:h-[350px] opacity-15 transform -rotate-12">
          <svg viewBox="0 0 280 350" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="tapeGradientSecondary" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#A8DCE6" />
                <stop offset="50%" stopColor="#2CA6A4" />
                <stop offset="100%" stopColor="#7BC26A" />
              </linearGradient>
            </defs>
            <path
              d="M250 20 
                 C280 40, 280 100, 240 150
                 C200 200, 160 250, 120 290
                 C90 320, 50 330, 30 300
                 C10 270, 30 240, 60 250
                 C90 260, 80 290, 55 280"
              stroke="url(#tapeGradientSecondary)"
              strokeWidth="24"
              strokeLinecap="round"
              fill="none"
            />
            <g stroke="#0B3A5A" strokeWidth="2" opacity="0.4">
              <line x1="245" y1="35" x2="260" y2="30" />
              <line x1="260" y1="70" x2="275" y2="68" />
              <line x1="262" y1="110" x2="275" y2="115" />
              <line x1="248" y1="150" x2="258" y2="160" />
              <line x1="220" y1="190" x2="228" y2="205" />
              <line x1="185" y1="230" x2="190" y2="248" />
              <line x1="148" y1="268" x2="148" y2="288" />
            </g>
          </svg>
        </div>

        {/* Floating accent leaves */}
        <div className="absolute top-[60%] left-[15%] w-12 h-12 opacity-20 animate-float" style={{ animationDelay: '2s' }}>
          <svg viewBox="0 0 50 50" fill="none">
            <path d="M25 45 C10 30, 10 15, 25 5 C40 15, 40 30, 25 45" fill="#7BC26A" opacity="0.6" />
            <path d="M25 42 L25 10" stroke="#2CA6A4" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="absolute top-[20%] left-[8%] w-8 h-8 opacity-15 animate-float" style={{ animationDelay: '4s' }}>
          <svg viewBox="0 0 50 50" fill="none">
            <path d="M25 45 C10 30, 10 15, 25 5 C40 15, 40 30, 25 45" fill="#2CA6A4" opacity="0.6" />
          </svg>
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-wellness opacity-[0.02]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16">
        <div className="max-w-5xl mx-auto text-center">

          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-50 border border-teal-200 mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
          >
            <Leaf className="w-4 h-4 text-leaf-green-500" />
            <span className="text-sm font-medium text-deep-blue-500 tracking-wide">Your partner in the journey to confidence.</span>
          </div>

          {/* Main Headline */}
          <h1
            className={`font-poppins text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-deep-blue-500 tracking-tighter leading-[0.9] mb-6 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <span className="block">Glow.Slim.Transform</span>
            <span className="block">
              with <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-teal-400 to-leaf-green-500">Slimmetry</span>
            </span>
          </h1>

          {/* Underline accent - gradient line */}
          <div
            className={`h-1 w-32 mx-auto bg-gradient-to-r from-teal-500 via-leaf-green-500 to-teal-500 rounded-full mb-8 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
              }`}
          />

          {/* Description */}
          <p
            className={`text-lg sm:text-xl text-charcoal-500 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <span className="block font-bold tracking-wide text-sm sm:text-base text-deep-blue-500 mb-3">TRUSTED BY THE SLIMMETRY COMMUNITY</span>
            Carefully curated products • Transparent sourcing • Real user journeys
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <button
              onClick={onShopAll}
              className="group relative overflow-hidden bg-teal-500 text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 shadow-glow hover:shadow-glow-lg transform hover:-translate-y-1 hover:bg-teal-600"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Products
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>

            <a
              href="/coa"
              className="group flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-sm text-deep-blue-500 hover:text-teal-600 border border-deep-blue-200 hover:border-teal-400 hover:bg-teal-50 transition-all duration-300"
            >
              <Shield className="w-4 h-4" />
              View Lab Reports
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Feature Cards */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            {[
              { icon: Scale, title: 'Metabolic Balance', desc: 'Precision-guided support', color: 'teal' },
              { icon: Leaf, title: 'Nature + Science', desc: 'Clean & sustainable', color: 'leaf-green' },
              { icon: Heart, title: 'Long-term Wellness', desc: 'Trusted for your journey', color: 'teal' }
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 hover:border-teal-200 hover:bg-white shadow-card hover:shadow-card-hover transition-all duration-500"
                style={{ transitionDelay: `${600 + idx * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-14 h-14 rounded-xl bg-${feature.color}-50 flex items-center justify-center mb-4 group-hover:bg-${feature.color}-100 transition-colors`}>
                    <feature.icon className={`w-6 h-6 text-${feature.color}-500`} />
                  </div>
                  <h3 className="text-lg font-bold text-deep-blue-500 mb-1">{feature.title}</h3>
                  <p className="text-sm text-charcoal-500">{feature.desc}</p>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};

export default Hero;
