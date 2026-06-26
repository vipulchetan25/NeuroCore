import Hero from './components/Hero';
import BentoAccordion from './components/BentoAccordion';
import NodeEditor from './components/NodeEditor';
import PerformanceTelemetry from './components/PerformanceTelemetry';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#172B36] text-[#F1F6F4] selection:bg-[#FFC801] selection:text-[#172B36]">
      <Hero />
      <main>
        <BentoAccordion />
        <NodeEditor />
        <PerformanceTelemetry />
        <Pricing />
        <Testimonials />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
