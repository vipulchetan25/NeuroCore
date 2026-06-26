import { useState } from 'react';
import { HelpCircle, Plus, Minus, Info } from 'lucide-react';

type FAQCategory = 'Overview' | 'Security' | 'Protocols' | 'Licensing';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_DATA: Record<FAQCategory, FAQItem[]> = {
  Overview: [
    {
      question: 'What is the Armory platform?',
      answer: 'Armory is a specialized high-performance infrastructure for building, deploying, and monitoring custom AI agents. We provide the visual node architecture, secure middleware pipelines, and regional routers required to run complex, automated LLM workflows securely at enterprise scale.'
    },
    {
      question: 'Who is this platform designed for?',
      answer: 'It is built for engineering teams, systems architects, and automation specialists who want to deploy custom LLM workflows without writing boilerplates, building custom API proxies, or dealing with multi-region scaling failures.'
    },
    {
      question: 'Does Armory provide pre-built agents?',
      answer: 'Yes! We provide out-of-the-box template nodes for common enterprise actions like email ingestion, sentiment classification, data format sanitization, database lookup, and multi-channel notifications.'
    }
  ],
  Security: [
    {
      question: 'How does Armory secure my API keys?',
      answer: 'Your API keys and database credentials are encrypted at rest using AES-256 and stored inside our hardened key vault. Keys are injected server-side only at execution time, never exposed to client browsers or client-side bundles.'
    },
    {
      question: 'What security compliance standards are met?',
      answer: 'Our infrastructure is fully SOC-2 Type II compliant and maintains HIPAA-eligible pipelines. All data flowing through our model proxy is masked in real-time to remove PII (Personally Identifiable Information) before hitting external models.'
    },
    {
      question: 'Can I deploy Armory in my private cloud VPC?',
      answer: 'Absolutely. We offer custom Enterprise VPC deployment templates for AWS, GCP, and Azure, allowing you to run the entire visual node engine inside your own secure perimeter.'
    }
  ],
  Protocols: [
    {
      question: 'What protocols are supported for triggers?',
      answer: 'Armory supports secure IMAP for email integrations, standard HTTPS webhooks, event publishers like Apache Kafka or RabbitMQ, and direct database listeners for PostgreSQL, MySQL, and MongoDB.'
    },
    {
      question: 'What model APIs can be connected to the visual nodes?',
      answer: 'Out-of-the-box, we support the Google Gemini Developer SDK, OpenAI, Anthropic Claude, and custom local models via vLLM or Ollama endpoints.'
    }
  ],
  Licensing: [
    {
      question: 'Is there a limit to how many agents I can build?',
      answer: 'There is no hard limit on the number of visual templates you can build in your sandbox. Active production deployment allocations depend on your chosen pricing tier (Starter, Professional, or Enterprise).'
    },
    {
      question: 'What are the developer seat licenses?',
      answer: 'Starter includes 2 seats, Professional includes 10 seats with role-based access controls, and Enterprise supports unlimited developer seats with single sign-on (SSO) integration.'
    }
  ]
};

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('Overview');
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const categories: FAQCategory[] = ['Overview', 'Security', 'Protocols', 'Licensing'];

  return (
    <section id="faq" className="relative py-24 bg-[#172B36] border-t border-gray-800">
      <div className="absolute inset-0 noise-bg opacity-30 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#114C5A]/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#114C5A] bg-[#114C5A]/20 mb-4">
            <HelpCircle className="w-4 h-4 text-[#FFC801]" />
            <span className="text-[10px] font-mono text-[#D9E8E2] uppercase tracking-wider font-bold">Inquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-[#F1F6F4] mb-4">
            Common Inquiries
          </h2>
          <p className="text-[#D9E8E2]/80 font-sans text-base">
            Everything you need to know about security, deployment models, and node protocols.
          </p>
        </div>

        {/* Tab Category Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 border-b border-[#114C5A]/20 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0); // auto-open first item in new tab
              }}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#114C5A] text-white border border-[#FFC801]'
                  : 'bg-transparent text-gray-400 border border-transparent hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA[activeCategory].map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-xl border transition-all duration-300 ${
                  isOpen ? 'bg-[#114C5A]/15 border-[#FFC801]' : 'bg-[#172B36] border-gray-800'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left focus:outline-none cursor-pointer"
                >
                  <span className="font-mono font-bold text-sm text-[#F1F6F4]">{faq.question}</span>
                  <span className="text-[#FFC801] shrink-0 ml-4">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>
                
                {/* Expandable answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-60 border-t border-[#114C5A]/10' : 'max-h-0'
                  }`}
                >
                  <p className="p-5 text-xs text-[#D9E8E2]/80 font-sans leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Support Callout Footer */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-[#114C5A]/15 border border-[#114C5A]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <Info className="w-5 h-5 text-[#FFC801]" />
            <div>
              <p className="text-xs font-mono font-bold text-white">Still have questions?</p>
              <p className="text-[11px] text-gray-400 font-sans">Contact our expert solutions team for custom deployment assistance.</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-[#FFC801] text-black font-mono text-xs font-bold rounded-lg hover:bg-[#FF9932] transition-colors">
            Contact Support
          </button>
        </div>

      </div>
    </section>
  );
}
