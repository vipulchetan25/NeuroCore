export interface PricingTier {
  id: string;
  name: string;
  description: string;
  baseMonthlyRateUSD: number; // base tier rate
  features: string[];
  popular?: boolean;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Perfect for small projects, early prototypes, and automation experimenters.',
    baseMonthlyRateUSD: 29,
    features: [
      'Up to 3 Custom Agents',
      '50,000 monthly executions',
      'Standard LLM pipeline routing',
      '14-day data retention logs',
      'Community Slack support'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Designed for scaling teams requiring high-throughput, secure pipelines.',
    baseMonthlyRateUSD: 89,
    popular: true,
    features: [
      'Up to 15 Custom Agents',
      '250,000 monthly executions',
      'Advanced routing & error-fallback',
      '30-day data retention logs',
      'Next-day priority support',
      'Custom API/Webhook endpoints'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Built for enterprise workloads needing unlimited capacity and customized agents.',
    baseMonthlyRateUSD: 249,
    features: [
      'Unlimited Custom Agents',
      '1,500,000+ monthly executions',
      'SLA-backed uptime guarantees',
      'Dedicated vector db integration',
      '24/7 dedicated support team',
      'Custom fine-tuned models'
    ]
  }
];

export const REGIONAL_TARIFFS = {
  USD: {
    symbol: '$',
    multiplier: 1.0,
    label: 'USD ($)'
  },
  EUR: {
    symbol: '€',
    multiplier: 0.92,
    label: 'EUR (€)'
  },
  INR: {
    symbol: '₹',
    multiplier: 83.0,
    label: 'INR (₹)'
  }
};

export const ANNUAL_DISCOUNT_MULTIPLIER = 0.8; // 20% annual discount
