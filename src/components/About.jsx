"use client";

import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 relative overflow-visible">
      {/* Dekorasi blur background sama seperti Hero (tuned) */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-violet-600/30 rounded-full blur-2xl z-0 pointer-events-none"></div>
      <div className="absolute bottom-8 right-8 w-80 h-80 bg-blue-700/30 rounded-full blur-[80px] z-0 pointer-events-none"></div>
      {/* Blur effect for section border (top)
      <div className="absolute left-0 right-0 -top-6 h-12 pointer-events-none z-10">
        <div className="w-full h-full bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent backdrop-blur-md"></div>
      </div> */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Gambar ilustrasi */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <Image src="/images/feature2.svg" alt="About MediScanX" fill className="object-contain" />
            </div>
          </div>

          {/* Teks penjelasan */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-500">Tentang D-RadiographIQ</h2>
            <p className="text-lg text-justify md:text-xl mb-6 leading-relaxed text-on-primary">
              D-RadiographIQ dikembangkan untuk membantu radiografer mengambil keputusan yang cepat, objektif, dan konsisten dalam menetapkan apakah citra thoraks dapat diterima atau perlu dilakukan pengulangan. Aplikasi ini mempermudah
              proses identifikasi penyebab penolakan, memberikan rekomendasi tindak lanjut, serta mendukung dokumentasi reject–repeat secara terstandar. D-RadiographIQ berperan penting dalam meningkatkan mutu pencitraan, mengurangi paparan
              radiasi tidak perlu, dan menjaga keselamatan pasien.
            </p>
            <p className="text-base text-justify md:text-lg text-on-primary/80">Dengan antarmuka yang intuitif dan dukungan teknologi AI, D-RadiographIQ memberikan pengalaman pemindaian gambar medis yang modern dan mudah digunakan.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
