"use client";

import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 relative overflow-visible">
      {/* Dekorasi blur background */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-violet-600/30 rounded-full blur-2xl z-0 pointer-events-none"></div>
      <div className="absolute bottom-8 right-8 w-80 h-80 bg-blue-700/30 rounded-full blur-[80px] z-0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* --- BAGIAN GAMBAR (DIPERBESAR) --- */}
          {/* Menggunakan lg:w-2/3 agar area gambar lebih luas dibanding teks */}
          <div className="w-full max-w-2xl flex justify-center">
            {/* Container Window Frame */}
            {/* - max-w-4xl: Memperbesar batas maksimal lebar card.
                - bg-slate-900/20: Membuat background transparan gelap.
                - backdrop-blur-md: Memberikan efek blur (kaca buram).
                - border-white/10: Border tipis transparan.
            */}
            <div className="relative w-full max-w-4xl bg-slate-900/20 border border-white/10 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md transform transition-all hover:scale-[1.01] duration-500">
              {/* Header Bar (Semi-Transparent) */}
              <div className="bg-slate-900/60 backdrop-blur-xl px-4 py-3 flex items-center justify-between border-b border-white/5">
                {/* Traffic Lights */}
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-sm"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-sm"></div>
                </div>

                {/* Title Bar Text */}
                <div className="text-xs text-slate-400 font-mono tracking-wide absolute left-1/2 -translate-x-1/2">D-RadiographIQ Preview</div>
              </div>

              {/* Area Gambar */}
              <div className="relative w-full aspect-video p-1">
                <Image
                  src="/images/about.webp"
                  alt="About D-RadiographIQ"
                  fill
                  /* object-contain memastikan gambar utuh. 
                     Sisa ruang akan mengikuti style parent (blur/transparan) */
                  className="object-contain"
                />
              </div>
            </div>
          </div>
          {/* --- AKHIR BAGIAN GAMBAR --- */}

          {/* --- BAGIAN TEKS --- */}
          {/* Menggunakan lg:w-1/3 agar teks tetap rapi di sisi kanan */}
          <div className="w-full max-w-xl text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-500">Tentang D-RadiographIQ</h2>
            <p className="text-lg text-justify md:text-xl mb-6 leading-relaxed text-slate-300">
              D-RadiographIQ dikembangkan untuk membantu radiografer mengambil keputusan yang cepat, objektif, dan konsisten dalam menetapkan apakah citra thoraks dapat diterima atau perlu dilakukan pengulangan. Aplikasi ini mempermudah
              proses identifikasi penyebab penolakan, memberikan rekomendasi tindak lanjut, serta mendukung dokumentasi reject–repeat secara terstandar.
            </p>
            <p className="text-base text-justify md:text-lg text-slate-400">
              D-RadiographIQ berperan penting dalam meningkatkan mutu pencitraan, mengurangi paparan radiasi tidak perlu, dan menjaga keselamatan pasien dengan dukungan teknologi AI yang modern.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
