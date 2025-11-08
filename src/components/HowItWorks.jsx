"use client";

import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      num: 1,
      title: "Pemeriksaan",
      desc: "Radiografer melakukan pemeriksaan",
      color: "bg-blue-500",
    },
    {
      num: 2,
      title: "Kirim ke PACS",
      desc: "Kirim DICOM ke Orthanc PACS",
      color: "bg-emerald-500",
    },
    {
      num: 3,
      title: "Ekspertise",
      desc: "Dokter analisis DICOM data",
      color: "bg-violet-500",
    },
    {
      num: 4,
      title: "Kirim Laporan",
      desc: "Ekspertise ke radiografer",
      color: "bg-orange-400",
    },
    {
      num: 5,
      title: "Serahkan Pasien",
      desc: "Hasil ke pasien",
      color: "bg-cyan-400",
    },
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white" id="howitworks">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-10">Workflow Process</h2>
        <p className="text-sm md:text-base text-slate-300 mb-8 max-w-3xl mx-auto">Sistem kerja yang terintegrasi antara Radiographer, Orthanc PACS, dan Radiologist untuk efisiensi teleradiologi yang optimal</p>

        <div className="relative bg-slate-800/30 border border-slate-700/60 rounded-2xl p-6 md:p-10 backdrop-blur-sm">
          {/* Grid layout (no horizontal scroll). Cards will wrap to multiple rows when needed. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {steps.map((step) => (
              <div key={step.num} className="relative bg-white p-8 pt-14 rounded-xl shadow hover:shadow-lg flex flex-col items-center text-center min-h-[220px] md:min-h-[240px]">
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                  <span className={`${step.color} inline-flex items-center justify-center w-12 h-12 rounded-full text-white font-semibold shadow-lg border-2 border-white`}>{step.num}</span>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
