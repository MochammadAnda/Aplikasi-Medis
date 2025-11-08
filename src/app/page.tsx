// app/page.jsx
import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
// import ScanSection from "../components/ScanSection";
import CTASection from "../components/CTASection";
// import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center w-full overflow-hidden">
      <Hero />
      <About />
      <Features />
      <HowItWorks />
      {/* <ScanSection /> */}
      <CTASection />
      {/* <Footer /> */}
    </main>
  );
}
