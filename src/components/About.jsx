"use client";

import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="panel-translucent flex flex-col md:flex-row items-center gap-12">
          {/* Gambar ilustrasi */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <Image src="/images/about-placeholder.png" alt="About MediScanX" fill className="object-contain" />
            </div>
          </div>

          {/* Teks penjelasan */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-500">Tentang MediScanX</h2>
            <p className="text-lg md:text-xl mb-6 leading-relaxed text-on-primary">
              MediScanX adalah platform inovatif berbasis teknologi untuk mendeteksi dan menganalisis citra medis secara cerdas. Dirancang untuk membantu tenaga medis dan peneliti dalam memahami hasil pemindaian secara lebih cepat, akurat,
              dan efisien.
            </p>
            <p className="text-base md:text-lg text-on-primary/80">Dengan antarmuka yang intuitif dan dukungan teknologi AI, MediScanX memberikan pengalaman pemindaian gambar medis yang modern dan mudah digunakan.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
