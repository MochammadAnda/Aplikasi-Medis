"use client";

import React from "react";

export default function Features() {
  const features = [
    {
      // Icon: Petir / Speedometer
      // Style baru: Dark circle dengan icon berwarna terang + shadow glow
      icon: (
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(37,99,235,0.2)] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-blue-500">
            <path
              fillRule="evenodd"
              d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ),
      title: "Cepat & Efisien",
      desc: "Proses analisis gambar dilakukan dengan cepat tanpa mengorbankan akurasi.",
    },
    {
      // Icon: Otak / Chip
      icon: (
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(139,92,246,0.2)] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-violet-500">
            <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625z" />
            <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375h1.875c1.148 0 2.22.419 3.058 1.103l-4.706-4.706a1.87 1.87 0 00-1.881-.081z" />
          </svg>
        </div>
      ),
      title: "Akurat & Andal",
      desc: "Menggunakan teknologi AI untuk menghasilkan hasil deteksi yang presisi.",
    },
    {
      // Icon: Dokter / Medis
      icon: (
        <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-emerald-500">
            <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 001.402 10.06a.75.75 0 01-.231-1.337A60.653 60.653 0 0111.7 2.805z" />
            <path d="M13.06 15.473a48.45 48.45 0 017.666-3.282c.134 1.414.22 2.843.255 4.285a9.6 9.6 0 01-6.869 8.658 9.92 9.92 0 01-1.036.236.75.75 0 01-.516 0 9.92 9.92 0 01-1.036-.236 9.6 9.6 0 01-6.869-8.658 48.33 48.33 0 01.255-4.285 48.47 48.47 0 017.666 3.282c.115.06.23.12.345.18.115-.06.23-.12.345-.18z" />
          </svg>
        </div>
      ),
      title: "Mendukung Tenaga Medis",
      desc: "Didesain untuk membantu dokter dan tenaga medis dalam analisis awal hasil rontgen.",
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-visible" id="features">
      {/* Dekorasi blur background */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-violet-600/30 rounded-full blur-2xl z-0 pointer-events-none"></div>
      <div className="absolute bottom-8 right-8 w-80 h-80 bg-blue-700/30 rounded-full blur-[80px] z-0 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto text-center px-6 relative z-10">
        <h2 className="text-3xl font-bold text-white mb-10">Fitur Unggulan D-RadiographIQ</h2>

        {/* Container Utama Transparan (Sama seperti HowItWorks) */}
        <div className="relative bg-slate-900/40 border border-slate-700/50 rounded-3xl p-6 md:p-10 backdrop-blur-sm shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                // --- STYLE CARD DIPERBARUI ---
                // bg-slate-800/60: Background gelap transparan
                // border-slate-700/50: Border abu tua
                // hover:border-blue-500/50: Efek glow saat hover
                className="bg-slate-800/60 backdrop-blur-md p-8 rounded-xl shadow-lg hover:shadow-2xl hover:bg-slate-800 transition-all duration-300 hover:-translate-y-1 border border-slate-700/50 hover:border-blue-500/50 flex flex-col items-center text-center min-h-[260px] group"
              >
                {/* Render Icon */}
                {feature.icon}

                {/* Typography untuk Dark Mode */}
                <h3 className="text-xl font-semibold text-slate-100 mb-2 group-hover:text-blue-300 transition-colors">{feature.title}</h3>
                <p className="text-slate-400 text-sm max-w-md leading-relaxed group-hover:text-slate-300 transition-colors">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
