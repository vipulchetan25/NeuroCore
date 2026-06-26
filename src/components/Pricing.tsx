import React, { useEffect, useState } from 'react';
import { pricingStore, Currency, BillingCycle } from '../pricingStore';
import { PRICING_TIERS, REGIONAL_TARIFFS, ANNUAL_DISCOUNT_MULTIPLIER } from '../pricingData';
import { Check, Info, Shield, HelpCircle } from 'lucide-react';

// Isolated Currency Selector component to prevent parent re-renders
function CurrencySelector() {
  const [currency, setCurrency] = useState<Currency>(() => pricingStore.getCurrency());

  useEffect(() => {
    return pricingStore.subscribe(() => {
      setCurrency(pricingStore.getCurrency());
    });
  }, []);

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    pricingStore.setCurrency(e.target.value as Currency);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="currency-select" className="text-xs font-mono text-gray-400 uppercase tracking-wider">
        Currency
      </label>
      <div className="relative">
        <select
          id="currency-select"
          value={currency}
          onChange={handleCurrencyChange}
          className="appearance-none bg-[#114C5A]/40 border border-[#114C5A] text-[#F1F6F4] font-mono text-sm rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:ring-2 focus:ring-[#FFC801] cursor-pointer"
        >
          {Object.entries(REGIONAL_TARIFFS).map(([key, info]) => (
            <option key={key} value={key} className="bg-[#172B36]">
              {info.label}
            </option>
          ))}
        </select>
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-xs text-[#FFC801]">
          ▼
        </span>
      </div>
    </div>
  );
}

// Isolated Billing Switcher component to prevent parent re-renders
function BillingToggle() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(() => pricingStore.getBillingCycle());

  useEffect(() => {
    return pricingStore.subscribe(() => {
      setBillingCycle(pricingStore.getBillingCycle());
    });
  }, []);

  const handleToggle = () => {
    pricingStore.setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly');
  };

  return (
    <div className="flex items-center gap-3">
      <span
        onClick={() => pricingStore.setBillingCycle('monthly')}
        className={`text-sm font-medium font-mono cursor-pointer transition-colors duration-200 ${
          billingCycle === 'monthly' ? 'text-[#FFC801]' : 'text-gray-400 hover:text-white'
        }`}
      >
        Monthly
      </span>
      <button
        id="billing-cycle-toggle-btn"
        onClick={handleToggle}
        aria-label="Toggle Billing Cycle"
        className="relative w-12 h-6 rounded-full p-1 bg-[#114C5A]/60 border border-[#114C5A]/80 transition-colors duration-200"
      >
        <div
          className={`w-4 h-4 rounded-full bg-[#FFC801] transition-transform duration-200 ${
            billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>
      <div className="flex items-center gap-1.5">
        <span
          onClick={() => pricingStore.setBillingCycle('annual')}
          className={`text-sm font-medium font-mono cursor-pointer transition-colors duration-200 ${
            billingCycle === 'annual' ? 'text-[#FFC801]' : 'text-gray-400 hover:text-white'
          }`}
        >
          Annually
        </span>
        <span className="text-[10px] bg-[#FF9932] text-black font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full">
          -20%
        </span>
      </div>
    </div>
  );
}

// Isolated Price Text component to prevent parent/layout reflows
interface PriceTextProps {
  baseMonthlyRateUSD: number;
}

function PriceText({ baseMonthlyRateUSD }: PriceTextProps) {
  const [currency, setCurrency] = useState<Currency>(() => pricingStore.getCurrency());
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(() => pricingStore.getBillingCycle());

  useEffect(() => {
    return pricingStore.subscribe(() => {
      setCurrency(pricingStore.getCurrency());
      setBillingCycle(pricingStore.getBillingCycle());
    });
  }, []);

  const tariff = REGIONAL_TARIFFS[currency];
  const calculatedRate = baseMonthlyRateUSD * tariff.multiplier;
  const finalPrice = billingCycle === 'annual' ? calculatedRate * ANNUAL_DISCOUNT_MULTIPLIER : calculatedRate;

  // Format currency output nicely
  let formattedValue = '';
  if (currency === 'INR') {
    formattedValue = Math.round(finalPrice).toLocaleString('en-IN');
  } else {
    formattedValue = finalPrice.toFixed(0);
  }

  return (
    <div className="flex items-baseline gap-1.5">
      <span className="text-4xl font-mono font-bold text-[#F1F6F4]">
        <span className="text-2xl text-[#FFC801] mr-1">{tariff.symbol}</span>
        {formattedValue}
      </span>
      <span className="text-xs text-gray-400 font-mono">/mo</span>
    </div>
  );
}

// Isolated Billing Summary text to inform user of exact billing frequency
interface PriceSummaryProps {
  baseMonthlyRateUSD: number;
}

function PriceSummary({ baseMonthlyRateUSD }: PriceSummaryProps) {
  const [currency, setCurrency] = useState<Currency>(() => pricingStore.getCurrency());
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(() => pricingStore.getBillingCycle());

  useEffect(() => {
    return pricingStore.subscribe(() => {
      setCurrency(pricingStore.getCurrency());
      setBillingCycle(pricingStore.getBillingCycle());
    });
  }, []);

  const tariff = REGIONAL_TARIFFS[currency];
  const calculatedRate = baseMonthlyRateUSD * tariff.multiplier;
  const monthlyRate = billingCycle === 'annual' ? calculatedRate * ANNUAL_DISCOUNT_MULTIPLIER : calculatedRate;
  const annualTotal = monthlyRate * 12;

  let formattedAnnual = '';
  if (currency === 'INR') {
    formattedAnnual = Math.round(annualTotal).toLocaleString('en-IN');
  } else {
    formattedAnnual = annualTotal.toFixed(0);
  }

  if (billingCycle === 'annual') {
    return (
      <p className="text-[11px] text-gray-400 font-mono italic mt-1">
        Billed annually ({tariff.symbol}{formattedAnnual}/yr)
      </p>
    );
  }

  return (
    <p className="text-[11px] text-gray-500 font-mono italic mt-1">
      Billed month-to-month
    </p>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 bg-[#172B36] border-t border-gray-800 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#114C5A]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#114C5A] bg-[#114C5A]/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFC801]" />
            <span className="text-[10px] font-mono text-[#D9E8E2] uppercase tracking-wider font-bold">Pricing Framework</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-[#F1F6F4] mb-4">
            Flexible Scale, Isolated Pricing
          </h2>
          <p className="text-[#D9E8E2]/80 font-sans text-lg">
            Choose the right capacity for your AI pipeline. Our multi-currency matrix computes tariff conversions dynamically with isolated instant state updates.
          </p>
        </div>

        {/* Currency Selector and Billing Switcher Row - Isolated Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-[#172B36]/80 border border-[#114C5A]/30 mb-12 shadow-xl backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#FFC801]" />
            <p className="text-sm text-gray-300 font-sans font-medium">
              Enterprise security features & dynamic local billing variables mapped dynamically.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <CurrencySelector />
            <div className="h-px sm:h-8 w-16 sm:w-px bg-gray-800" />
            <BillingToggle />
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRICING_TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative flex flex-col justify-between p-8 rounded-2xl border transition-all duration-300 group ${
                tier.popular
                  ? 'bg-[#114C5A]/20 border-[#FF9932] shadow-2xl shadow-[#FF9932]/5 scale-105 md:-translate-y-2'
                  : 'bg-[#172B36] border-[#114C5A]/40 hover:border-[#114C5A]'
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FF9932] text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                <h3 className="text-xl font-mono font-bold text-[#F1F6F4] mb-2">{tier.name}</h3>
                <p className="text-xs text-gray-400 font-sans mb-6 h-12">{tier.description}</p>

                {/* Price Display with performance-isolated subscription wrapper */}
                <div className="mb-6 p-4 rounded-xl bg-[#172B36]/90 border border-[#114C5A]/20">
                  <PriceText baseMonthlyRateUSD={tier.baseMonthlyRateUSD} />
                  <PriceSummary baseMonthlyRateUSD={tier.baseMonthlyRateUSD} />
                </div>

                <div className="h-px bg-[#114C5A]/20 mb-6" />

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#D9E8E2]/90">
                      <Check className="w-4 h-4 text-[#FFC801] mt-0.5 shrink-0" />
                      <span className="font-sans">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`w-full py-3 px-4 rounded-xl font-mono text-sm font-bold transition-all duration-300 ${
                  tier.popular
                    ? 'bg-[#FF9932] text-[#172B36] hover:bg-[#FFC801] shadow-lg shadow-[#FF9932]/10'
                    : 'bg-[#114C5A]/30 text-[#D9E8E2] border border-[#114C5A] hover:bg-[#114C5A]/50 hover:text-white'
                }`}
              >
                Deploy {tier.name} Agent
              </button>
            </div>
          ))}
        </div>

        {/* Security / FAQ hint below */}
        <div className="mt-12 text-center flex items-center justify-center gap-2 text-xs text-gray-400">
          <Info className="w-3.5 h-3.5 text-[#FFC801]" />
          <span>All transactions are subject to regional tariffs. Zero credit card required during deployment testing.</span>
        </div>
      </div>
    </section>
  );
}
