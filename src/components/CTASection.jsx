"use client";

import React from "react";
import Image from "next/image"; // Pastikan ini ada di paling atas

export default function CTASection() {
  return (
    <section className="w-full py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white" id="cta">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-10">DR</h2>

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
                <a href="#" className="inline-flex items-center gap-2 px-3 py-2 bg-slate-700/60 text-slate-200 rounded-md text-sm border border-slate-600 hover:bg-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12.07C22 6 17.52 1.5 11.5 1.5S1 6 1 12.07c0 5 3.66 9.17 8.44 9.93v-7.03H7.9v-2.9h1.55V9.88c0-1.53.9-2.38 2.28-2.38.66 0 1.35.12 1.35.12v1.49h-.77c-.76 0-1 .48-1 0v-1.49h1.7l-.27 2.9h-1.43V22c4.78-.76 8.44-4.93 8.44-9.93z" />
                  </svg>
                  LinkedIn
                </a>

                <a href="#" className="inline-flex items-center gap-2 px-3 py-2 bg-slate-700/60 text-slate-200 rounded-md text-sm border border-slate-600 hover:bg-slate-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.07 1.85.49 2.28.82.5.37.86.82 1.24 1.5.36.66.49 1.33.56 2.24.08 1.04.08 1.44.08 4.27s0 3.23-.08 4.27c-.07.91-.2 1.58-.56 2.24-.38.68-.74 1.13-1.24 1.5-.43.33-1.06.75-2.28.82-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.07-1.85-.49-2.28-.82-.5-.37-.86-.82-1.24-1.5-.36-.66-.49-1.33-.56-2.24C2 16.7 2 16.3 2 13.46s0-3.23.08-4.27c.07-.91.2-1.58.56-2.24.38-.68.74-1.13 1.24-1.5.43-.33 1.06-.75 2.28-.82C6.4 2.2 6.8 2.2 10 2.2h2z" />
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
