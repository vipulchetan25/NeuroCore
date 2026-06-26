import { useState, useEffect } from 'react';
import { Activity, Cpu, Sliders, RefreshCw, Layers, Gauge } from 'lucide-react';

export default function PerformanceTelemetry() {
  const [pulseCount, setPulseCount] = useState<number>(345);
  const [systemLoad, setSystemLoad] = useState<number>(56.7);
  const [latencyHistory, setLatencyHistory] = useState<number[]>([12, 11, 14, 12, 10, 13, 11, 12, 11, 12]);

  // Simulate real-time monitoring updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      setSystemLoad(prev => {
        const delta = (Math.random() - 0.5) * 2;
        const next = prev + delta;
        return next < 30 ? 30 : next > 80 ? 80 : parseFloat(next.toFixed(1));
      });
      setLatencyHistory(prev => {
        const nextVal = Math.floor(Math.random() * 5) + 10; // between 10 and 14
        return [...prev.slice(1), nextVal];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="telemetry" className="relative py-24 bg-[#172B36] border-t border-gray-800">
      <div className="absolute inset-0 noise-bg opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[350px] h-[350px] bg-[#FF9932]/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#114C5A] bg-[#114C5A]/20 mb-4">
            <Gauge className="w-4 h-4 text-[#FF9932]" />
            <span className="text-[10px] font-mono text-[#D9E8E2] uppercase tracking-wider font-bold">Deep Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-[#F1F6F4] mb-4">
            Optimized for Extreme Performance
          </h2>
          <p className="text-[#D9E8E2]/80 font-sans text-lg">
            Monitor every neural inference in real-time. Armory provides detailed telemetry into agent accuracy, global latency, and token allocation.
          </p>
        </div>

        {/* Telemetry Bento Grid Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Panel 1: System Load */}
          <div className="rounded-2xl border border-[#114C5A]/30 bg-[#172B36] p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">System Load</span>
                <Cpu className="w-4 h-4 text-[#FFC801]" />
              </div>
              <p className="text-xs text-[#D9E8E2]/70 font-sans mb-4">Active neural core processing allocation.</p>
              
              <div className="flex items-baseline gap-1.5 mb-3">
                <span className="text-3xl font-mono font-bold text-[#F1F6F4]">{systemLoad}%</span>
                <span className="text-[10px] text-green-400 font-mono">OPTIMAL</span>
              </div>

              {/* Simple CSS simulated loading bar */}
              <div className="w-full bg-[#101e26] h-2 rounded-full overflow-hidden border border-gray-800">
                <div 
                  className="bg-gradient-to-r from-[#114C5A] to-[#FFC801] h-full transition-all duration-1000 ease-out"
                  style={{ width: `${systemLoad}%` }}
                />
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800/60 flex justify-between items-center text-[10px] font-mono text-gray-400">
              <span>CORES: 15 ACTIVE</span>
              <span>CACHE: 99%</span>
            </div>
          </div>

          {/* Panel 2: SLA Response / Latency Wave */}
          <div className="rounded-2xl border border-[#114C5A]/30 bg-[#172B36] p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">SLA Latency</span>
                <Activity className="w-4 h-4 text-[#FF9932] animate-pulse" />
              </div>
              <p className="text-xs text-[#D9E8E2]/70 font-sans mb-4">Average response for real-time inference.</p>
              
              <div className="flex items-baseline gap-1.5 mb-3">
                <span className="text-3xl font-mono font-bold text-[#F1F6F4]">11.8ms</span>
                <span className="text-[10px] text-[#FFC801] font-mono">99.99% UPTIME</span>
              </div>

              {/* Mini Custom SVG line sparkline */}
              <div className="w-full h-10 flex items-end gap-1.5">
                {latencyHistory.map((val, idx) => {
                  const percent = ((val - 8) / 8) * 100; // scaling height
                  return (
                    <div 
                      key={idx} 
                      className="bg-[#114C5A] hover:bg-[#FFC801] w-full rounded-sm transition-all duration-300"
                      style={{ height: `${Math.max(10, percent)}%` }}
                      title={`${val}ms`}
                    />
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800/60 flex justify-between items-center text-[10px] font-mono text-gray-400">
              <span>ROUTER: REGIONAL</span>
              <span>TARGET: &lt;15ms</span>
            </div>
          </div>

          {/* Panel 3: Token Throughput */}
          <div className="rounded-2xl border border-[#114C5A]/30 bg-[#172B36] p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Token Volume</span>
                <Layers className="w-4 h-4 text-[#FF9932]" />
              </div>
              <p className="text-xs text-[#D9E8E2]/70 font-sans mb-4">Active data nodes throughput volume.</p>
              
              <div className="flex items-baseline gap-1.5 mb-4">
                <span className="text-3xl font-mono font-bold text-[#F1F6F4]">{pulseCount}</span>
                <span className="text-[10px] text-green-400 font-mono">ACTIVE NODES</span>
              </div>

              <div className="flex gap-1">
                {[...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-4 w-full rounded-sm ${
                      i < 8 ? 'bg-gradient-to-t from-[#114C5A] to-[#FF9932]/70' : 'bg-gray-800'
                    }`} 
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800/60 flex justify-between items-center text-[10px] font-mono text-gray-400">
              <span>QUERIES: 152K/hr</span>
              <span>COMPRESSION: 4.2x</span>
            </div>
          </div>

          {/* Panel 4: Net Growth Vector */}
          <div className="rounded-2xl border border-[#114C5A]/30 bg-[#172B36] p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Growth Vector</span>
                <Sliders className="w-4 h-4 text-[#FFC801]" />
              </div>
              <p className="text-xs text-[#D9E8E2]/70 font-sans mb-4">Efficiency gains over last 30 days.</p>
              
              <div className="flex items-baseline gap-1.5 mb-3">
                <span className="text-3xl font-mono font-bold text-[#F1F6F4]">+82.4%</span>
                <span className="text-[10px] text-[#FF9932] font-mono">NET SAVINGS</span>
              </div>

              {/* Tiny vector visualizer */}
              <div className="relative h-10 w-full overflow-hidden rounded bg-[#101e26] border border-gray-800 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full stroke-[#FFC801]" viewBox="0 0 100 40">
                  <path d="M0 35 Q 25 30, 50 15 T 100 5" fill="none" strokeWidth="2" />
                  <path d="M0 35 Q 25 30, 50 15 T 100 5 L 100 40 L 0 40 Z" fill="url(#blueGlow)" opacity="0.1" />
                  <defs>
                    <linearGradient id="blueGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#FFC801" />
                      <stop offset="100%" stopColor="#172B36" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="text-[9px] font-mono text-gray-400 z-10">OPTIMAL SCALING</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-800/60 flex justify-between items-center text-[10px] font-mono text-gray-400">
              <span>WEIGHTS: STABILIZED</span>
              <span>MODEL: FLASH-V2.5</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
