"use client";

import React from "react";
import Image from "next/image";
import Button from "./Button";
import { useTypewriter, Cursor } from "react-simple-typewriter";

export default function Hero() {
  const descriptions = [
    "Membantu radiografer mengambil keputusan yang cepat, objektif, dan konsisten.",
    "Mempermudah identifikasi penyebab penolakan: Rotasi, Low Exposure, Motion, hingga Artefak.",
    "Meningkatkan mutu pencitraan serta mengurangi paparan radiasi yang tidak perlu.",
    "Mendukung dokumentasi reject-repeat secara terstandar demi keselamatan pasien.",
  ];

  // PERBAIKAN: Gunakan [text] (array), bukan {text} (object)
  const [text] = useTypewriter({
    words: descriptions,
    loop: true, // true artinya infinite loop
    typeSpeed: 40,
    deleteSpeed: 20,
    delaySpeed: 3000,
  });

  return (
    <section className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 relative overflow-visible">
      {/* Dekorasi blur background */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-violet-600/30 rounded-full blur-2xl z-0 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-80 h-80 bg-blue-700/30 rounded-full blur-[80px] z-0 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 flex flex-col items-center text-center gap-4 relative z-10">
        <div className="w-full flex flex-col items-center text-center gap-2 mb-2">
          {/* Badge */}
          <div className="mb-2">
            <span
              className="inline-block text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-full border border-transparent shadow-md"
              style={{
                background: "linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)",
                boxShadow: "0 2px 8px 0 rgba(44, 62, 80, 0.15)",
              }}
            >
              D-RadiographIQ
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">Decision Support System for Thorax Image Acceptance</h1>

          {/* Subheadline dengan Typewriter */}
          <div className="text-xl mb-4 md:text-xl mb-6 text-blue-200 flex items-center justify-center h-28 md:h-20" style={{ maxWidth: "750px" }}>
            <p>
              {/* Gunakan pre-wrap agar text panjang tetap wrap di mobile */}
              <span className="text-blue-200 inline-block" style={{ minHeight: 24, whiteSpace: "pre-wrap" }}>
                {text}
              </span>
              <Cursor cursorStyle="|" cursorColor="#bfdbfe" />
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="#scan"
              variant="secondary"
              style={{
                background: "linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)",
                boxShadow: "0 2px 8px 0 rgba(44, 62, 80, 0.15)",
              }}
            >
              Start Analysis
            </Button>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="flex justify-center mt-8">
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <Image src="/images/feature1.svg" alt="Thorax Analysis Illustration" fill className="object-contain drop-shadow-2xl" priority />
          </div>
        </div>
      </div>
    </section>
  );
}
