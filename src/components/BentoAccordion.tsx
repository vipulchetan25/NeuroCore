import React, { useState, useRef, useEffect } from 'react';
import { Shield, Cpu, Cloud, Database, ArrowRight, Lock, Terminal, Activity, Layers } from 'lucide-react';

interface BentoItem {
  id: string;
  title: string;
  brief: string;
  detail: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  stats: string;
  subfeatures: string[];
}

const BENTO_ITEMS: BentoItem[] = [
  {
    id: 'secure-guard',
    title: 'Secure Guard',
    brief: 'We fortify all AI deployments with robust security protocols. Our system ensures every model complies with strict data standards.',
    detail: 'Secure Guard acts as an automated security proxy between your client applications and LLM backends. It scans payloads in real-time, redacting PII (personally identifiable information), preventing prompt injection attacks, and enforcing strict rate-limits at the model level.',
    badge: 'AES-256 & SOC2',
    icon: Shield,
    tagline: 'Enterprise Shielding',
    stats: '0 Safety Breaches',
    subfeatures: ['PII Masking & Redaction', 'Prompt Injection Shield', 'Access Key Rotations']
  },
  {
    id: 'agent-build',
    title: 'Agent Build',
    brief: 'Tailored AI Agents designed for your specific needs. We develop custom logic and workflows that integrate with existing systems.',
    detail: 'With our node-based builder, teams create multi-layered autonomous agents capable of calling APIs, executing database operations, and triggering messaging channels. No complex coding is required—just pure structural logic mapped visually.',
    badge: 'Autonomous SDK',
    icon: Cpu,
    tagline: 'Visual Flow Design',
    stats: '10x Faster Deployment',
    subfeatures: ['Dynamic API Integrations', 'Interactive Node Editor', 'Conditional Rule Sets']
  },
  {
    id: 'cloud-scale',
    title: 'Cloud Scale',
    brief: 'Infrastructure optimization for high-traffic AI apps. We ensure your systems remain fast, responsive, and ready for demand.',
    detail: 'Cloud Scale manages multi-region node orchestration, routing your inference requests to the lowest-latency model endpoint. Automatic model fallbacks ensure that if an upstream provider experiences downtime, your workflows transition seamlessly without interruption.',
    badge: '12ms Avg Latency',
    icon: Cloud,
    tagline: 'Low-latency Routing',
    stats: '99.99% Uptime SLA',
    subfeatures: ['Auto-scaling Node Clusters', 'Failover Provider Routing', 'Edge Cache Acceleration']
  },
  {
    id: 'data-mining',
    title: 'Data Mining',
    brief: 'Transform raw information into actionable intelligence. We build the pipelines and vector stores that power your enterprise.',
    detail: 'Data Mining streamlines ETL processes from raw cloud storage directly into indexed vectors. Your unstructured files (PDFs, sheets, support logs) are automatically chunked, embedded, and cataloged into our low-latency retrieval system.',
    badge: 'Vector Pipeline',
    icon: Database,
    tagline: 'Retrieval Augmented QA',
    stats: '15M Embeddings/sec',
    subfeatures: ['Dynamic Chunking Engine', 'Vector Store Syncing', 'Semantic Search Search']
  }
];

export default function BentoAccordion() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const accordionRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Smooth height calculation for mobile accordions
  useEffect(() => {
    accordionRefs.current.forEach((el, index) => {
      if (el) {
        if (index === activeIndex) {
          el.style.maxHeight = `${el.scrollHeight}px`;
        } else {
          el.style.maxHeight = '0px';
        }
      }
    });
  }, [activeIndex]);

  return (
    <section id="features" className="relative py-24 bg-[#172B36] border-t border-gray-800">
      {/* Background patterns */}
      <div className="absolute inset-0 noise-bg opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FFC801]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#114C5A] bg-[#114C5A]/20 mb-4">
            <span className="w-1.5 h-1.5 bg-[#FF9932] rounded-full animate-pulse" />
            <span className="text-[10px] font-mono text-[#D9E8E2] uppercase tracking-wider font-bold">Platform Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-[#F1F6F4] mb-4">
            Engineered for Total Autonomy
          </h2>
          <p className="text-[#D9E8E2]/80 font-sans text-lg">
            A cohesive suite of architectural building blocks built to deploy, secure, and scale enterprise-grade autonomous systems.
          </p>
        </div>

        {/* ----------------- DESKTOP BENTO GRID VIEW ----------------- */}
        <div className="hidden md:grid grid-cols-12 gap-6 mb-8">
          
          {/* Bento Cards (Left columns) */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
            {BENTO_ITEMS.map((item, idx) => {
              const IconComponent = item.icon;
              const isActive = activeIndex === idx;
              return (
                <div
                  key={item.id}
                  id={`bento-card-${item.id}`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`p-6 rounded-xl border text-left cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                    isActive
                      ? 'bg-[#114C5A]/30 border-[#FFC801] shadow-lg shadow-[#114C5A]/10'
                      : 'bg-[#172B36]/50 border-gray-800/80 hover:border-[#114C5A]/60'
                  }`}
                >
                  {/* Subtle hover background highlight */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent to-white/[0.02] transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg shrink-0 border transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#FFC801] text-black border-[#FFC801]' 
                        : 'bg-[#114C5A]/20 text-[#D9E8E2] border-[#114C5A]/30 group-hover:border-[#FFC801]/40'
                    }`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-mono font-bold text-[#F1F6F4] text-base">{item.title}</h3>
                        <span className="text-[10px] bg-[#114C5A]/40 text-[#D9E8E2] font-mono px-2 py-0.5 rounded-full border border-[#114C5A]/20">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 font-sans leading-relaxed group-hover:text-gray-300 transition-colors">
                        {item.brief}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Showcase Preview (Right Columns) - Programmatically Locked with activeIndex */}
          <div className="col-span-12 lg:col-span-7 flex flex-col justify-between p-8 rounded-2xl border border-[#114C5A]/30 bg-[#172B36]/90 relative overflow-hidden shadow-2xl h-full min-h-[480px]">
            {/* Background glowing sphere representation */}
            <div className="absolute -bottom-24 -right-24 w-[350px] h-[350px] bg-[#114C5A]/20 rounded-full blur-[80px] pointer-events-none" />
            
            {/* Content Display based on activeIndex */}
            {BENTO_ITEMS.map((item, idx) => {
              const IconComponent = item.icon;
              const isActive = activeIndex === idx;
              if (!isActive) return null;

              return (
                <div key={item.id} className="h-full flex flex-col justify-between transition-opacity duration-500 animate-fadeIn">
                  
                  {/* Top Bar Info */}
                  <div>
                    <div className="flex items-center gap-2.5 mb-6">
                      <span className="text-[11px] font-mono text-[#FFC801] bg-[#114C5A]/40 px-2.5 py-1 rounded-md border border-[#114C5A]">
                        {item.tagline}
                      </span>
                      <span className="text-[11px] font-mono text-gray-400">
                        Module // {item.id.toUpperCase()}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-mono font-bold text-[#F1F6F4] mb-4">
                      {item.title} Dashboard
                    </h3>

                    <p className="text-sm text-gray-300 font-sans leading-relaxed mb-6">
                      {item.detail}
                    </p>

                    {/* Sub-features list */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {item.subfeatures.map((sf, index) => (
                        <div key={index} className="flex items-center gap-2 bg-[#172B36] border border-[#114C5A]/20 p-3 rounded-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF9932]" />
                          <span className="text-xs font-mono text-gray-300">{sf}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Stats Badge */}
                  <div className="mt-8 pt-6 border-t border-[#114C5A]/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#FFC801]/10 rounded-lg text-[#FFC801]">
                        <Activity className="w-4 h-4 animate-pulse" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">Performance Vector</p>
                        <p className="text-sm font-mono font-bold text-white">{item.stats}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#FF9932] group cursor-pointer hover:text-[#FFC801] transition-colors">
                      <span>View Specifications</span>
                      <ArrowRight className="w-4.5 h-4.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

        {/* ----------------- MOBILE ACCORDION VIEW ----------------- */}
        {/* On mobile viewports, Bento component automatically refactors to mobile-friendly accordion list */}
        <div className="block md:hidden space-y-4">
          {BENTO_ITEMS.map((item, idx) => {
            const IconComponent = item.icon;
            const isOpen = activeIndex === idx;

            return (
              <div
                key={item.id}
                id={`accordion-item-${item.id}`}
                className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'bg-[#114C5A]/25 border-[#FFC801]' : 'bg-[#172B36]/80 border-gray-800'
                }`}
              >
                {/* Header Switch */}
                <button
                  onClick={() => setActiveIndex(idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg border shrink-0 ${
                      isOpen ? 'bg-[#FFC801] text-black border-[#FFC801]' : 'bg-[#114C5A]/20 text-[#D9E8E2] border-[#114C5A]/30'
                    }`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-mono font-bold text-sm text-[#F1F6F4]">{item.title}</h3>
                      <span className="text-[9px] bg-[#114C5A]/50 text-gray-300 font-mono px-1.5 py-0.2 rounded border border-[#114C5A]/20">
                        {item.badge}
                      </span>
                    </div>
                  </div>
                  <span className={`text-sm text-[#FFC801] transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                    ▼
                  </span>
                </button>

                {/* Animated content body */}
                <div
                  ref={(el) => {
                    accordionRefs.current[idx] = el;
                  }}
                  className="accordion-content overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? '1000px' : '0px' }}
                >
                  <div className="p-5 pt-0 border-t border-[#114C5A]/20 bg-[#172B36]/40">
                    <p className="text-xs text-gray-400 font-sans leading-relaxed mb-4">
                      {item.brief}
                    </p>
                    <p className="text-xs text-gray-300 font-sans leading-relaxed mb-4">
                      {item.detail}
                    </p>
                    
                    {/* Sub-features list */}
                    <div className="space-y-2 mb-4">
                      {item.subfeatures.map((sf, index) => (
                        <div key={index} className="flex items-center gap-2 bg-[#172B36]/80 p-2 rounded border border-[#114C5A]/10">
                          <span className="w-1 h-1 rounded-full bg-[#FF9932]" />
                          <span className="text-[11px] font-mono text-gray-300">{sf}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-[#114C5A]/10 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-[#FF9932]">{item.tagline}</span>
                      <span className="text-white font-bold">{item.stats}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
