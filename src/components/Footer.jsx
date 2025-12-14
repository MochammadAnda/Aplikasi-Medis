export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-8 relative overflow-visible">
      {/* Dekorasi blur background sama seperti Hero (tuned)
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-violet-600/30 rounded-full blur-2xl z-0 pointer-events-none"></div>
      <div className="absolute bottom-6 right-6 w-72 h-72 bg-blue-700/30 rounded-full blur-[60px] z-0 pointer-events-none"></div> */}
      {/* Blur effect for section border (top)
      <div className="absolute left-0 right-0 -top-6 h-8 pointer-events-none z-10">
        <div className="w-full h-full bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent backdrop-blur-md"></div>
      </div> */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/*
          Semua elemen ditumpuk vertikal (flex-col) dan dirata-tengah (items-center)
        */}
        <div className="rounded-2xl p-2 md:p-2 flex flex-col items-center justify-center gap-4 text-center">
          {/* Blok 1: Logo/Brand */}
          <div className="flex items-center gap-3">
            <div>
              <div className="font-semibold">D-RadiographIQ</div>
              {/* <div className="text-sm text-on-primary/80">Empowering Indonesian healthcare</div> */}
            </div>
          </div>

          {/* Blok 2: Copyright */}
          <div className="text-sm text-on-primary/80">© {new Date().getFullYear()} D-RadiographIQ in Collaboration with Yunanto Biantoro and dgDev.</div>
        </div>
      </div>
    </footer>
  );
}
