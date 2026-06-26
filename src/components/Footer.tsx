import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#101e26] border-t border-gray-800 text-gray-400 font-sans">
      
      {/* Newsletter / Get Smarter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-gray-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-6 text-left">
            <span className="text-[10px] font-mono text-[#FFC801] uppercase tracking-widest font-bold">Stay Updated</span>
            <h3 className="text-2xl sm:text-3xl font-mono font-bold text-white mt-1 mb-3">
              Get Smarter About AI Systems
            </h3>
            <p className="text-xs text-gray-400 max-w-md leading-relaxed">
              Weekly insights on visual automation workflows, API proxy security measures, and real-world agent orchestration deployments. No fluff, just pure logic.
            </p>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md lg:ml-auto">
              <div className="relative w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@framer.com"
                  className="w-full bg-[#172B36] border border-[#114C5A] rounded-xl py-3 px-4 text-xs text-[#F1F6F4] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#FFC801]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#FFC801] text-black font-mono text-xs font-bold px-6 py-3.5 rounded-xl hover:bg-[#FF9932] transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <div className="flex items-center gap-1.5 mt-2.5 text-green-400 font-mono text-[10px] lg:text-right lg:justify-end">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Successfully added to dispatch index. Check your inbox soon!</span>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Main Links and Brand Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        {/* Brand Column */}
        <div className="md:col-span-4 text-left">
          <div className="flex items-center gap-2.5 mb-4">
            <svg viewBox="0 0 40 40" className="w-8 h-8 fill-none stroke-[#FFC801]" strokeWidth="2.5">
              <path d="M 12 6 L 28 6 L 34 16 L 20 34 L 6 16 z" strokeLinejoin="round" />
            </svg>
            <span className="font-mono text-lg font-bold text-white">armory.ai</span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed mb-6">
            Armory provides modern orchestration infrastructure to design, deploy, secure, and monitor next-gen autonomous workflows and custom LLM agent pipelines globally.
          </p>
          <div className="flex items-center gap-3 text-xs font-mono text-gray-500">
            <span>PLATFORM: ACTIVE</span>
            <span>●</span>
            <span>NODE V20_STABLE</span>
          </div>
        </div>

        {/* Links Column 1: Quick Navigation */}
        <div className="md:col-span-3 text-left">
          <h4 className="font-mono font-bold text-xs text-white uppercase tracking-wider mb-4">// QUICK NAVIGATION</h4>
          <ul className="space-y-3.5 text-xs font-mono text-gray-400">
            <li>
              <button onClick={() => scrollToSection('features')} className="hover:text-[#FFC801] transition-colors">
                Capabilities
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('canvas')} className="hover:text-[#FFC801] transition-colors">
                Visual Canvas
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('telemetry')} className="hover:text-[#FFC801] transition-colors">
                Performance Telemetry
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection('pricing')} className="hover:text-[#FFC801] transition-colors">
                Pricing Matrix
              </button>
            </li>
          </ul>
        </div>

        {/* Links Column 2: Legal & Support */}
        <div className="md:col-span-3 text-left">
          <h4 className="font-mono font-bold text-xs text-white uppercase tracking-wider mb-4">// SECURITY & LEGAL</h4>
          <ul className="space-y-3.5 text-xs font-sans text-gray-400">
            <li>
              <a href="#" className="hover:text-[#FFC801] transition-colors font-mono text-xs">
                SOC-2 Certificates
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FFC801] transition-colors font-mono text-xs">
                Privacy Enforcer
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FFC801] transition-colors font-mono text-xs">
                Tariffs & Variables
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#FFC801] transition-colors font-mono text-xs">
                System Terms
              </a>
            </li>
          </ul>
        </div>

        {/* Status indicator Column */}
        <div className="md:col-span-2 text-left font-mono text-xs text-gray-500">
          <h4 className="font-mono font-bold text-xs text-white uppercase tracking-wider mb-4">// REGIONAL NODES</h4>
          <div className="space-y-2 text-[10px]">
            <div className="flex items-center justify-between">
              <span>US-EAST-4</span>
              <span className="text-green-500 font-bold">12ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span>EU-WEST-1</span>
              <span className="text-green-500 font-bold">14ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span>AP-SOUTH-1</span>
              <span className="text-green-500 font-bold">11ms</span>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Copyright brand text */}
      <div className="bg-[#0b1419] py-8 border-t border-gray-800/40 text-center font-mono text-[10px] text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>©2026 Armory AI. All rights reserved. Managed globally via Cloud Run.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#FFC801]">TWITTER</a>
            <span>/</span>
            <a href="#" className="hover:text-[#FFC801]">GITHUB</a>
            <span>/</span>
            <a href="#" className="hover:text-[#FFC801]">DISCORD</a>
          </div>
        </div>
      </div>

    </footer>
  );
}
