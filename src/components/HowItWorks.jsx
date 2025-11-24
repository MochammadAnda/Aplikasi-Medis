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
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-visible" id="howitworks">
      {/* Dekorasi blur background sama seperti Hero */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-violet-700/40 rounded-full blur-3xl z-0"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-800/40 rounded-full blur-[120px] z-0"></div>
      {/* Blur effect for section border (top)
      <div className="absolute left-0 right-0 -top-6 h-12 pointer-events-none z-10">
        <div className="w-full h-full bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent backdrop-blur-md"></div>
      </div> */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 md:mb-10 tracking-tight">Workflow Process</h2>
        <p className="text-base md:text-lg text-slate-300 mb-10 max-w-2xl mx-auto">Sistem kerja terintegrasi antara Radiographer, Orthanc PACS, dan Radiologist untuk efisiensi teleradiologi yang optimal</p>

        <div className="relative bg-slate-800/40 border border-slate-700/60 rounded-2xl p-4 md:p-8 backdrop-blur-sm shadow-lg">
          {/* Mobile: grid, Desktop: flex row with arrows between cards */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-0 w-full">
            {steps.map((step, idx) => (
              <React.Fragment key={step.num}>
                <div className="relative bg-white p-6 pt-14 rounded-xl shadow-md hover:shadow-xl flex flex-col items-center text-center min-h-[220px] transition-all duration-200 border border-slate-100 w-full md:w-1/4 mx-0 md:mx-4 mb-8 md:mb-0">
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2">
                    <span className={`${step.color} inline-flex items-center justify-center w-14 h-14 rounded-full text-white text-xl font-bold shadow-lg border-4 border-white`}>{step.num}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-2">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                </div>
                {/* Panah di antara card, di luar card, hanya tampil di desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center">
                    <span className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center mx-2">
                      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-slate-600">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
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
