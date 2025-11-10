export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/*
          Semua elemen ditumpuk vertikal (flex-col) dan dirata-tengah (items-center)
        */}
        <div className="rounded-2xl p-2 md:p-2 flex flex-col items-center justify-center gap-4 text-center">
          {/* Blok 1: Logo/Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold">SM</div>
            <div>
              <div className="font-semibold">MediScanX</div>
              {/* <div className="text-sm text-on-primary/80">Empowering Indonesian healthcare</div> */}
            </div>
          </div>

          {/* Blok 2: Copyright */}
          <div className="text-sm text-on-primary/80">© {new Date().getFullYear()} SiTerMid. Empowering Indonesian healthcare with open source teleradiology.</div>

          {/* Blok 3: Ikon Sosial (ditambahkan di bawah) */}
          {/* <div className="flex items-center gap-3 pt-2">
            <a href="#" aria-label="GitHub" className="p-2 rounded-md hover:bg-white/10 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-on-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.084-.729.084-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.3-5.467-1.332-5.467-5.932 0-1.31.468-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.807 5.628-5.479 5.922.43.371.814 1.102.814 2.222 0 1.606-.014 2.898-.014 3.293 0 .321.216.694.825.576C20.565 22.092 24 17.592 24 12.297 24 5.67 18.627.297 12 .297z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter" className="p-2 rounded-md hover:bg-white/10 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-on-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.555-2.005.959-3.127 1.184A4.92 4.92 0 0 0 16.616 3c-2.717 0-4.92 2.205-4.92 4.917 0 .39.044.765.127 1.124C7.691 8.86 4.066 6.873 1.64 3.905c-.427.734-.666 1.588-.666 2.5 0 1.725.877 3.248 2.208 4.142a4.904 4.904 0 0 1-2.229-.616v.06c0 2.404 1.71 4.409 3.977 4.866a4.93 4.93 0 0 1-2.224.084c.627 1.957 2.445 3.381 4.6 3.423A9.867 9.867 0 0 1 0 19.54a13.94 13.94 0 0 0 7.548 2.213c9.056 0 14.01-7.496 14.01-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z" />
              </svg>
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
