import { Star, Quote, Heart } from 'lucide-react';

interface Testimonial {
  title: string;
  comment: string;
  author: string;
  role: string;
  stars: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    title: 'Infrastructure that finally scales',
    comment: "The reliability of Armory is unmatched. We've migrated our entire neural pipeline to their edge nodes with zero downtime for our users.",
    author: 'Vertex Labs',
    role: 'Infrastructure & DevOps Team',
    stars: 5
  },
  {
    title: 'Saved us months of R&D',
    comment: 'Instead of building our own custom agent routing logic from scratch, we used Armory. We went from a prototype to a global production launch in weeks.',
    author: 'Resolv.AI',
    role: 'Core AI Systems Team',
    stars: 5
  },
  {
    title: 'Precision in every inference',
    comment: 'The observability tools allow us to monitor agent accuracy and latency in real-time. It has become an absolutely vital part of our evaluation workflow.',
    author: 'Neural Sync',
    role: 'Quality Assurance Department',
    stars: 5
  },
  {
    title: 'Enterprise-grade by default',
    comment: 'The node-based builder is a massive game changer for our team. Even our non-technical stakeholders can now easily help map out complex agent behaviors.',
    author: 'Sentinel Ops',
    role: 'Enterprise Operations Team',
    stars: 5
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 bg-[#172B36] border-t border-gray-800">
      <div className="absolute inset-0 noise-bg opacity-30 pointer-events-none" />
      <div className="absolute top-10 right-10 w-[200px] h-[200px] bg-[#FFC801]/5 rounded-full blur-[70px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#114C5A] bg-[#114C5A]/20 mb-4">
            <Heart className="w-4 h-4 text-[#FF9932] fill-current" />
            <span className="text-[10px] font-mono text-[#D9E8E2] uppercase tracking-wider font-bold">Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-[#F1F6F4] mb-4">
            Trusted by the Pioneers
          </h2>
          <p className="text-[#D9E8E2]/80 font-sans text-lg">
            See how high-growth startups and enterprise research labs scale their operations with Armory AI.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#172B36]/90 border border-[#114C5A]/20 shadow-xl flex flex-col justify-between hover:border-[#FFC801]/40 transition-all duration-300 relative group"
            >
              {/* Subtle top quotes icon */}
              <div className="absolute top-4 right-4 text-gray-800 opacity-20 group-hover:opacity-40 transition-opacity">
                <Quote className="w-10 h-10 transform scale-x-[-1]" />
              </div>

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4 text-[#FFC801]">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <h3 className="font-mono font-bold text-[#F1F6F4] text-sm mb-3">
                  {t.title}
                </h3>
                <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#114C5A]/10">
                <p className="font-mono font-bold text-xs text-[#FF9932]">
                  // {t.author}
                </p>
                <p className="text-[10px] text-gray-500 font-sans">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
