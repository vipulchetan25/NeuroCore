// Custom pub/sub store to isolate pricing state updates and prevent parent/global component reflows.
export type Currency = 'USD' | 'EUR' | 'INR';
export type BillingCycle = 'monthly' | 'annual';

class PricingStore {
  private listeners = new Set<() => void>();
  private currency: Currency = 'USD';
  private billingCycle: BillingCycle = 'monthly';

  getCurrency(): Currency {
    return this.currency;
  }

  getBillingCycle(): BillingCycle {
    return this.billingCycle;
  }

  setCurrency(currency: Currency) {
    if (this.currency !== currency) {
      this.currency = currency;
      this.notify();
    }
  }

  setBillingCycle(billingCycle: BillingCycle) {
    if (this.billingCycle !== billingCycle) {
      this.billingCycle = billingCycle;
      this.notify();
    }
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener());
  }
}

export const pricingStore = new PricingStore();
