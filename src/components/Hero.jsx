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

  // Fungsi untuk menangani scroll halus
  const handleScrollToScan = (e) => {
    e.preventDefault(); // Mencegah lompatan kasar default browser
    const element = document.getElementById("scan");
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

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
              className="relative inline-block text-white text-xs md:text-sm font-semibold px-4 py-2 rounded-full border border-white/10 shadow-[0_0_15px_rgba(124,58,237,0.5)] overflow-hidden group"
              style={{
                background: "linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)",
              }}
            >
              {/* Teks Utama */}
              <span className="relative z-10">D-RadiographIQ</span>

              {/* Layer Kilauan (Shimmer) */}
              <div className="absolute top-0 left-0 w-[50%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] animate-[shimmer_2s_infinite]"></div>
            </span>

            {/* Tambahkan style ini di file CSS global atau di tag style sementara */}
            <style jsx>{`
              @keyframes shimmer {
                0% {
                  transform: translateX(-150%);
                }
                100% {
                  transform: translateX(250%);
                }
              }
            `}</style>
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
              onClick={handleScrollToScan}
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
        {/* Hero Illustration with Window Frame Style */}
        <div className="flex justify-center mt-10 w-full px-4">
          {/* Container Window Frame */}
          {/* Menggunakan style yang sama: max-w-4xl, bg transparan, backdrop-blur */}
          <div className="relative w-full max-w-4xl bg-slate-900/20 border border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md transform transition-all hover:scale-[1.01] duration-500">
            {/* Header Bar */}
            <div className="bg-slate-900/60 backdrop-blur-xl px-4 py-3 flex items-center justify-between border-b border-white/5">
              {/* Traffic Lights */}
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm"></div>
              </div>

              {/* Title Bar Text */}
              <div className="text-xs text-slate-400 font-mono tracking-wide absolute left-1/2 -translate-x-1/2">D-RadiographIQ Result</div>
            </div>

            {/* Area Gambar */}
            {/* aspect-video agar lebar (16:9) */}
            <div className="relative w-full aspect-video p-1">
              <Image
                src="/images/heroImg.webp"
                alt="Thorax Analysis Illustration"
                fill
                /* object-contain agar gambar utuh 100% dan sisa ruang jadi blur */
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
