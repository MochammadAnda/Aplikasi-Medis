"use client";

import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      num: 1,
      title: "Upload Citra",
      desc: "Unggah hasil foto rontgen ke sistem.",
      color: "bg-blue-600", // Warna dipertegas sedikit
    },
    {
      num: 2,
      title: "Preprocessing Citra",
      desc: "Sistem memproses dan meningkatkan kualitas citra.",
      color: "bg-emerald-600",
    },
    {
      num: 3,
      title: "Prediksi dan Analisis",
      desc: "AI menganalisis data untuk deteksi dini.",
      color: "bg-violet-600",
    },
    {
      num: 4,
      title: "Rekapitulasi & Hasil",
      desc: "Hasil analisis dikompilasi oleh sistem.",
      color: "bg-orange-600",
    },
    {
      num: 5,
      title: "Download Laporan",
      desc: "Unduh laporan lengkap hasil diagnosa.",
      color: "bg-rose-600", // Ubah warna akhir agar beda
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden" id="howitworks">
      {/* STYLE CSS MANUAL */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Keyframes untuk Floating (Naik Turun Halus) khusus Arrow */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `,
        }}
      />

      {/* Dekorasi blur background */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-violet-700/20 rounded-full blur-[100px] z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-800/20 rounded-full blur-[120px] z-0"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Workflow Process</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Sistem kerja terintegrasi untuk efisiensi teleradiologi yang optimal</p>
        </div>

        {/* Container Utama Transparan */}
        <div className="bg-slate-900/40 border border-slate-700/50 rounded-3xl p-6 md:p-10 backdrop-blur-sm shadow-2xl">
          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-4">
            {steps.map((step, idx) => (
              <React.Fragment key={step.num}>
                {/* --- CARD ITEM (Tanpa Animasi Float) --- */}
                <div className="relative flex-1 group">
                  {/* UBAHAN TEMA GELAP:
                      - bg-slate-800/60: Background gelap transparan
                      - border-slate-700: Border abu tua
                      - hover:border-blue-500/50: Efek glow border saat hover
                  */}
                  <div className="relative bg-slate-800/60 backdrop-blur-md rounded-2xl p-6 pt-12 h-full flex flex-col items-center text-center shadow-lg transition-all duration-300 hover:bg-slate-800 hover:-translate-y-1 border border-slate-700/50 hover:border-blue-500/50 z-10">
                    {/* Badge Angka */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                      <div className={`relative flex items-center justify-center w-12 h-12 rounded-full text-white text-lg font-bold shadow-[0_0_15px_rgba(0,0,0,0.5)] ${step.color} z-20`}>
                        {/* Ring disesuaikan dengan warna background card (slate-800) bukan putih */}
                        <div className="absolute inset-0 rounded-full ring-4 ring-slate-900 z-10"></div>
                        <span className="relative z-20">{step.num}</span>
                      </div>
                    </div>

                    {/* Konten Card (Text disesuaikan dark mode) */}
                    <h3 className="text-base font-bold text-slate-100 mb-2 mt-2 group-hover:text-blue-300 transition-colors">{step.title}</h3>
                    {step.desc && <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{step.desc}</p>}
                  </div>
                </div>

                {/* --- ARROW CONNECTOR (Tetap Ada Animasi) --- */}
                {idx < steps.length - 1 && (
                  <div className="flex items-center justify-center py-4 lg:py-0 relative z-0">
                    {/* DIV 1: Wrapper Animasi Floating (HANYA DI SINI) */}
                    <div className="animate-float" style={{ animationDelay: `${idx * 0.2}s` }}>
                      {/* DIV 2: Wrapper Rotasi */}
                      <div className="transform rotate-90 lg:rotate-0">
                        {/* Lingkaran Arrow dipergelap */}
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-900 border border-slate-700 shadow-lg text-blue-500">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
