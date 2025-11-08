"use client";

import React from "react";

export default function Features() {
  const features = [
    {
      img: "/images/feature1.svg",
      title: "Cepat & Efisien",
      desc: "Proses analisis gambar dilakukan dengan cepat tanpa mengorbankan akurasi.",
    },
    {
      img: "/images/feature2.svg",
      title: "Akurat & Andal",
      desc: "Menggunakan teknologi AI untuk menghasilkan hasil deteksi yang presisi.",
    },
    {
      img: "/images/feature3.svg",
      title: "Mendukung Tenaga Medis",
      desc: "Didesain untuk membantu dokter dan tenaga medis dalam analisis awal hasil rontgen.",
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white" id="features">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-white mb-10">Fitur Unggulan MediScanX</h2>
        <div className="relative bg-slate-800/30 border border-slate-700/60 rounded-2xl p-6 md:p-10 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center text-center min-h-[260px]">
                <img src={feature.img} alt={feature.title} className="w-32 h-32 object-contain mb-6" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm max-w-md">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
