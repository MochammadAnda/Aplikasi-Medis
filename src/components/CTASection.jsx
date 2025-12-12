"use client";

import React from "react";
import Image from "next/image"; // Pastikan ini ada di paling atas

export default function CTASection() {
  return (
    <section className="w-full py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white" id="cta">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-10">Created by DR</h2>

        <div className="relative bg-slate-800/30 border border-slate-700/60 rounded-2xl p-6 md:p-10 backdrop-blur-sm">
          <div className="max-w-2xl mx-auto bg-transparent">
            <div className="flex flex-col items-center gap-4">
              {/* Avatar */}
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[var(--primary-2)] to-[var(--secondary-2)] p-1 shadow-lg">
                {/* Tambahkan 'relative' dan 'overflow-hidden' agar gambar terpotong bulat */}
                <div className="relative w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                  <Image
                    src="/images/ctaImg.webp" // Ganti dengan nama file gambar Anda yang ada di public/images
                    alt="Foto Profil"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-on-primary">Dwi Rochmayanti</h3>
                <div className="text-sm text-slate-200">Founder & Lecturer</div>
              </div>

              <p className="text-sm font-semibold text-slate-300 max-w-xl"> Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya (HR. Ahmad dan ath-Thabrani).</p>

              <div className="flex gap-3 mt-3">
                <a href="https://www.linkedin.com/in/dwi-rochmayanti-9490323a/" className="inline-flex items-center gap-2 px-3 py-2 bg-slate-700/60 text-slate-200 rounded-md text-sm border border-slate-600 hover:bg-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1s2.5 1.12 2.5 2.5zM.22 8h4.52v14H.22V8zM8.5 8h4.33v1.92h.06c.6-1.14 2.06-2.34 4.24-2.34 4.53 0 5.37 2.98 5.37 6.85V22h-4.52v-6.73c0-1.6-.03-3.65-2.22-3.65-2.22 0-2.56 1.73-2.56 3.53V22H8.5V8z" />
                  </svg>
                  LinkedIn
                </a>

                <a href="https://instagram.com/rochmayantidwi" className="inline-flex items-center gap-2 px-3 py-2 bg-slate-700/60 text-slate-200 rounded-md text-sm border border-slate-600 hover:bg-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3.5A4.5 4.5 0 0 0 7.5 12 4.5 4.5 0 0 0 12 16.5 4.5 4.5 0 0 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 2A2.5 2.5 0 0 1 14.5 12 2.5 2.5 0 0 1 12 14.5 2.5 2.5 0 0 1 9.5 12 2.5 2.5 0 0 1 12 9.5zm4-3.25c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
                  </svg>
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
