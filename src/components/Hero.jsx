import Image from "next/image";
import Button from "./Button";

export default function Hero() {
  return (
    <section className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
      <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-8">
        {/* Badge */}
        <div className="mb-4">
          <span className="inline-block bg-primary-700/20 text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-full backdrop-blur border border-primary-700/40">Sistem Teleradiologi Open Source</span>
        </div>
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-bold  leading-tight bg-gradient-to-r from-primary-200 via-secondary-200 to-primary-100 bg-clip-text">Tingkatkan Layanan Radiologi Anda</h1>
        {/* Subheadline */}
        <p className="text-xl md:text-xl mb-6 text-on-primary/80">Sistem Teleradiologi pertama dan satu-satunya di Indonesia yang Open Source! Dirancang untuk revolusi teleradiologi dengan teknologi canggih.</p>
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="#scan">Try Demo</Button>
          <Button href="#about">Source Code</Button>
        </div>
        {/* Hero Illustration */}
        <div className="flex justify-center mt-8">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <Image src="/images/feature1.svg" alt="Hero Illustration" fill className="object-contain drop-shadow-2xl" priority />
          </div>
        </div>
      </div>
    </section>
  );
}
