import { Sparkles, ArrowRight, Activity, Terminal } from 'lucide-react';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="relative bg-[#172B36] pt-32 pb-20 overflow-hidden border-b border-gray-800">
      {/* Background visual art: Grid overlay and light paths */}
      <div className="absolute inset-0 noise-bg opacity-30 pointer-events-none" />
      
      {/* Dynamic glowing spots */}
      <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-[#114C5A]/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-10 right-1/4 w-[500px] h-[500px] bg-[#FFC801]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Brand Navbar */}
      <nav className="absolute top-0 inset-x-0 z-50 bg-[#172B36]/80 backdrop-blur-md border-b border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {/* Elegant Custom Armory SVG Logo */}
            <svg viewBox="0 0 40 40" className="w-9 h-9 fill-none stroke-[#FFC801]" strokeWidth="2.5">
              <path d="M 12 6 L 28 6 L 34 16 L 20 34 L 6 16 z" strokeLinejoin="round" />
              <path d="M 12 6 L 20 34 L 28 6" strokeLinejoin="round" opacity="0.6" />
              <circle cx="20" cy="16" r="3" fill="#FF9932" />
            </svg>
            <span className="font-mono text-xl font-bold tracking-tight text-[#F1F6F4]">
              armory<span className="text-[#FF9932]">.ai</span>
            </span>
          </div>

          {/* Desktop Nav menu items */}
          <div className="hidden md:flex items-center gap-8 text-xs font-mono text-gray-300 uppercase tracking-wider">
            <button onClick={() => scrollToSection('features')} className="hover:text-[#FFC801] transition-colors cursor-pointer">
              Capabilities
            </button>
            <button onClick={() => scrollToSection('canvas')} className="hover:text-[#FFC801] transition-colors cursor-pointer">
              Visual Canvas
            </button>
            <button onClick={() => scrollToSection('telemetry')} className="hover:text-[#FFC801] transition-colors cursor-pointer">
              Telemetry
            </button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-[#FFC801] transition-colors cursor-pointer">
              Pricing
            </button>
            <button onClick={() => scrollToSection('faq')} className="hover:text-[#FFC801] transition-colors cursor-pointer">
              FAQs
            </button>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection('canvas')}
              className="font-mono text-xs font-bold border border-[#114C5A] hover:border-[#FFC801] text-[#D9E8E2] hover:text-white px-4 py-2 rounded-lg transition-all duration-300 cursor-pointer"
            >
              Console Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Body Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Subtle top indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#114C5A] bg-[#114C5A]/10 mb-6 backdrop-blur-sm animate-pulse">
          <span className="w-1.5 h-1.5 bg-[#FFC801] rounded-full" />
          <span className="text-[10px] font-mono text-[#D9E8E2] uppercase tracking-widest font-bold">NEXT-GEN AI SCHEMATIC AGENTS</span>
        </div>

        {/* Main Display Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-mono font-bold tracking-tight text-[#F1F6F4] max-w-4xl mx-auto leading-tight mb-6">
          Power your <span className="text-[#FFC801]">future</span> with custom <span className="text-[#FF9932]">AI agents</span>
        </h1>

        {/* Supporting description */}
        <p className="text-gray-300 font-sans text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
          Deploy custom enterprise agents and automate complex data workflows with high-precision models. Scale your intelligence with Armory today.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => scrollToSection('canvas')}
            className="w-full sm:w-auto bg-[#FFC801] text-black font-mono text-sm font-bold px-8 py-4 rounded-xl hover:bg-[#FF9932] transition-all duration-300 shadow-xl shadow-[#FFC801]/5 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Build a Workflow</span>
            <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="w-full sm:w-auto bg-transparent hover:bg-[#114C5A]/20 border border-[#114C5A] text-[#D9E8E2] hover:text-white font-mono text-sm font-bold px-8 py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Activity className="w-4 h-4 text-[#FF9932]" />
            <span>Platform Capabilities</span>
          </button>
        </div>

        {/* Trust logos bar */}
        <div className="border-t border-gray-800/80 pt-10">
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-6">
            TRUSTED BY INDUSTRY CONGLOMERATES & SYSTEMS LABS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-y-6 gap-x-12 opacity-65 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Cigna logo simulation */}
            <div className="flex items-center gap-1.5 font-mono font-bold text-gray-400 text-sm">
              <span className="w-3 h-3 bg-[#FF9932] rounded-full" />
              <span>cigna</span>
            </div>
            {/* Aetna logo simulation */}
            <div className="flex items-center gap-1 font-mono font-bold text-gray-400 text-sm">
              <span>aetna</span>
              <span className="text-[#FFC801]">✦</span>
            </div>
            {/* Anthem logo simulation */}
            <div className="flex items-center gap-1 font-mono font-bold text-gray-400 text-sm">
              <span>anthem</span>
              <span className="w-2 h-2 bg-[#114C5A] rounded" />
            </div>
            {/* CVS logo simulation */}
            <div className="flex items-center gap-1.5 font-mono font-bold text-gray-400 text-sm">
              <span className="border border-gray-400 px-1 text-[10px]">CVS</span>
              <span>healthcare</span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
