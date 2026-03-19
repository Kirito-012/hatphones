import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { Brands } from "./components/Brands";
import { WhyUs } from "./components/WhyUs";
import { About } from "./components/About";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] transition-colors duration-500">
      <Navbar />
      <Hero />
      <Brands />
      <Services />
      <Process />
      <WhyUs />
      <About />
      <CTA />
      <Footer />
    </main>
  );
}
