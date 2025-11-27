"use client";

import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      num: 1,
      title: "Upload Citra",
      desc: "Unggah hasil foto rontgen ke sistem.",
      color: "bg-blue-500",
    },
    {
      num: 2,
      title: "Preprocessing Citra",
      desc: "Sistem memproses dan meningkatkan kualitas citra.",
      color: "bg-emerald-500",
    },
    {
      num: 3,
      title: "Prediksi dan Analisis",
      desc: "AI menganalisis data untuk deteksi dini.",
      color: "bg-violet-500",
    },
    {
      num: 4,
      title: "Rekapitulasi & Hasil",
      desc: "Hasil analisis dikompilasi oleh sistem.",
      color: "bg-orange-500",
    },
    {
      num: 5,
      title: "Download Laporan",
      desc: "Unduh laporan lengkap hasil diagnosa.",
      color: "bg-orange-500",
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden" id="howitworks">
      {/* Dekorasi blur background */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-violet-700/30 rounded-full blur-[100px] z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-800/30 rounded-full blur-[120px] z-0"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Workflow Process</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Sistem kerja terintegrasi untuk efisiensi teleradiologi yang optimal</p>
        </div>

        {/* Container Gelap di Belakang Card */}
        <div className="bg-slate-800/50 border border-slate-700/50 rounded-3xl p-6 md:p-10 backdrop-blur-md shadow-2xl">
          {/* Wrapper Flexbox untuk Card dan Panah */}
          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-4">
            {steps.map((step, idx) => (
              <React.Fragment key={step.num}>
                {/* CARD ITEM */}
                <div className="relative flex-1 group">
                  <div className="relative bg-white rounded-2xl p-6 pt-12 h-full flex flex-col items-center text-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-200/60">
                    {/* Badge Angka (Lingkaran di atas) */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                      <div className={`relative flex items-center justify-center w-12 h-12 rounded-full text-white text-lg font-bold shadow-md ring-8 ring-slate-800/50 ${step.color} z-20`}>
                        {/* Ring tambahan agar menyatu dengan card putih saat hover (opsional, visual trick) */}
                        <div className="absolute inset-0 rounded-full ring-4 ring-white z-10"></div>
                        <span className="relative z-20">{step.num}</span>
                      </div>
                    </div>

                    {/* Konten Card */}
                    <h3 className="text-base font-bold text-slate-800 mb-2 mt-2">{step.title}</h3>
                    {step.desc && <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>}
                  </div>
                </div>

                {/* ARROW CONNECTOR */}
                {idx < steps.length - 1 && (
                  <div className="flex items-center justify-center py-4 lg:py-0">
                    <div className="w-8 h-8 bg-slate-700/50 rounded-full flex items-center justify-center text-slate-400 transform rotate-90 lg:rotate-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
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
