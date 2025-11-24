"use client";

import { useRef, useState, useEffect } from "react";
// Hapus import Image next/image jika tidak dipakai, atau gunakan tag <img> biasa untuk base64 dinamis agar lebih mudah
// import Image from "next/image";

export default function ScanSection() {
  const singleInputRef = useRef(null);
  const multiInputRef = useRef(null);

  // State untuk Single Upload
  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState("");
  const [fileName, setFileName] = useState("");
  const [singleResult, setSingleResult] = useState(null); // Menyimpan JSON response
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // State untuk Multiple Upload
  const [multiFiles, setMultiFiles] = useState([]);
  const [csvUrl, setCsvUrl] = useState(null);

  useEffect(() => {
    return () => {
      if (csvUrl) URL.revokeObjectURL(csvUrl);
    };
  }, [csvUrl]);

  function handleSingleChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    // Reset state sebelumnya
    setSingleResult(null);
    setFileName(file.name);
    const type = file.type;
    setFileType(type);

    // Preview awal (gambar asli sebelum diproses)
    if (type.startsWith("image/")) {
      // Buat FileReader baru untuk membaca file
      const reader = new FileReader();
      // Fungsi ini akan dipanggil setelah file selesai dibaca
      reader.onload = (ev) => {
        // Set hasil bacaan (data URL gambar) ke state 'preview'
        setPreview(ev.target.result);
      };
      // Mulai membaca file sebagai data URL
      reader.readAsDataURL(file);
    } else if (type === "application/pdf") {
      setPreview("pdf");
    } else if (file.name.toLowerCase().endsWith(".dcm")) {
      setPreview("dicom");
    } else {
      setPreview(null);
    }

    // Langsung upload
    uploadSingleToFlask(file);
  }

  async function uploadSingleToFlask(file) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("http://localhost:5001/predict", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Gagal melakukan prediksi");

      const data = await res.json();
      console.log("Hasil Flask:", data);

      setSingleResult(data);

      // Jika API mengembalikan gambar hasil (base64), update preview dengan gambar tersebut
      // Format base64 string biasanya butuh prefix data:image/...
      if (data.image) {
        // Deteksi header base64 jika belum ada, asumsikan png/jpeg
        const base64Prefix = data.image.startsWith("data:")
          ? ""
          : "data:image/png;base64,";
        setPreview(`${base64Prefix}${data.image}`);
      }
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Terjadi kesalahan saat memproses gambar.");
    } finally {
      setIsLoading(false);
    }
  }

  // --- Bagian Multiple Upload (Tidak berubah banyak) ---
  function handleMultiChange(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const list = files.map((f) => ({
      name: f.name,
      type: f.type || "unknown",
      size: f.size,
    }));
    setMultiFiles(
      files.map((f) => ({ name: f.name, size: f.size, type: f.type }))
    );

    uploadMultipleToFlask(files);
    if (csvUrl) URL.revokeObjectURL(csvUrl);
  }

  async function uploadMultipleToFlask(files) {
    const formData = new FormData();
    for (let f of files) {
      formData.append("files", f);
    }

    // Contoh error handling sederhana untuk multiple
    try {
      const res = await fetch("http://localhost:5001/predict-multiple", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Hasil Multiple Flask:", data);

      const blob = new Blob([data.csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      setCsvUrl(url); // <-- ini yang dipakai untuk download
      setMultiFiles(files);

    } catch (err) {
      console.error("Error multiple:", err);
    }
  }

  function createCsv(list) {
    const header = ["filename", "type", "size_bytes", "status"];
    const rows = list.map((f) => [f.name, f.type, String(f.size), "uploaded"]);
    const lines = [header.join(",")].concat(
      rows.map((r) =>
        r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")
      )
    );
    return lines.join("\n");
  }

  return (
    <section
      id="scan"
      className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 relative overflow-visible min-h-screen"
    >
      {/* Dekorasi Background */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-violet-600/30 rounded-full blur-2xl z-0 pointer-events-none"></div>
      <div className="absolute bottom-8 right-8 w-80 h-80 bg-blue-700/30 rounded-full blur-[80px] z-0 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="panel-translucent rounded-2xl p-8 flex flex-col items-center gap-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary-500 text-center">
            Scan Gambar Medis
          </h2>
          <p className="text-lg text-slate-300 text-center mb-4">
            Unggah file DICOM, PDF, atau Gambar untuk dianalisis.
          </p>

          {/* Inputs */}
          <input
            ref={singleInputRef}
            type="file"
            accept=".dcm,application/pdf,image/*"
            className="hidden"
            onChange={handleSingleChange}
          />
          <input
            ref={multiInputRef}
            type="file"
            multiple
            accept=".dcm,application/pdf,image/*"
            className="hidden"
            onChange={handleMultiChange}
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 text-white px-6 py-3 rounded-full font-semibold shadow-md transition flex items-center gap-2"
              onClick={() => singleInputRef.current?.click()}
            >
              {isLoading ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              ) : null}
              {isLoading ? "Processing..." : "Single Upload"}
            </button>
            <button
              disabled={isLoading}
              className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-3 rounded-full font-semibold shadow-md transition"
              onClick={() => multiInputRef.current?.click()}
            >
              Multiple Upload
            </button>
          </div>

          {/* TAMPILAN HASIL SINGLE UPLOAD */}
          {fileName && (
            <div className="w-full flex flex-col gap-8 mt-6 animate-in fade-in zoom-in duration-300">
              {/* Bagian Atas: Gambar & Ringkasan */}
              <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                {/* Preview Gambar */}
                <div className="flex flex-col items-center gap-2 w-full md:w-1/2">
                  <span className="text-slate-400 text-sm">
                    File: {fileName}
                  </span>
                  {preview && fileType.startsWith("image/") && (
                    <div className="relative w-full max-w-sm aspect-square bg-black rounded-xl overflow-hidden border-2 border-blue-500 shadow-lg shadow-blue-500/20">
                      <img
                        src={preview}
                        alt="Preview"
                        className="object-contain w-full h-full"
                      />
                    </div>
                  )}
                  {preview === "pdf" && (
                    <div className="w-64 h-64 flex items-center justify-center bg-slate-700 rounded-xl border border-blue-500">
                      <span className="text-blue-400 font-bold">PDF File</span>
                    </div>
                  )}
                  {preview === "dicom" && (
                    <div className="w-64 h-64 flex items-center justify-center bg-slate-700 rounded-xl border border-blue-500">
                      <span className="text-blue-400 font-bold">DICOM File</span>
                    </div>
                  )}
                </div>

                {/* Hasil Prediksi Utama (Kanan) */}
                {singleResult && (
                  <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-600">
                      <h3 className="text-sm uppercase tracking-wider text-slate-400 mb-1">
                        Prediksi Utama
                      </h3>
                      <div className="text-3xl font-bold text-blue-400 mb-4">
                        {singleResult.predicted_class || "Unknown"}
                      </div>

                      <h4 className="text-sm text-slate-400 mb-2">
                        Probabilitas:
                      </h4>
                      <div className="space-y-3">
                        {singleResult.probabilities?.map((prob, idx) => (
                          <div key={idx} className="flex flex-col gap-1">
                            <div className="flex justify-between text-sm">
                              <span
                                className={
                                  prob.class_name ===
                                  singleResult.predicted_class
                                    ? "text-white font-semibold"
                                    : "text-slate-400"
                                }
                              >
                                {prob.class_name}
                              </span>
                              <span className="text-slate-300">
                                {prob.percent}%
                              </span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  prob.class_name ===
                                  singleResult.predicted_class
                                    ? "bg-blue-500"
                                    : "bg-slate-500"
                                }`}
                                style={{
                                  width: `${parseFloat(prob.percent)}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bagian Bawah: Detail Analisis (Action) */}
              {singleResult && singleResult.action && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 w-full">
                  {/* Deskripsi Masalah */}
                  <div className="bg-red-900/20 border border-red-500/30 p-5 rounded-xl">
                    <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                      ⚠️ Deskripsi Masalah
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
                      {singleResult.action.diskripsi?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Penyebab / Pengulangan */}
                  <div className="bg-orange-900/20 border border-orange-500/30 p-5 rounded-xl">
                    <h4 className="font-bold text-orange-400 mb-3 flex items-center gap-2">
                      🔄 Penyebab / Orientasi
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
                      {singleResult.action.pengulangan?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Tindak Lanjut */}
                  <div className="bg-green-900/20 border border-green-500/30 p-5 rounded-xl">
                    <h4 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                      ✅ Tindak Lanjut
                    </h4>
                    <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
                      {singleResult.action.tindaklanjut?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Multiple upload list (Tetap ada di bawah jika diperlukan) */}
          {multiFiles && multiFiles.length > 0 && (
            <div className="w-full mt-8 pt-8 border-t border-slate-700">
              <div className="flex items-center justify-between mb-3">
                <div className="text-slate-300">
                  {multiFiles.length} file(s) ready
                </div>
                <div className="flex items-center gap-2">
                  {csvUrl && (
                    <a
                      href={csvUrl}
                      download="upload-results.csv"
                      className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm"
                    >
                      Download CSV
                    </a>
                  )}
                  <button
                    className="px-3 py-2 bg-slate-700 text-slate-200 rounded-md text-sm hover:bg-slate-600"
                    onClick={() => {
                      setMultiFiles([]);
                      if (csvUrl) URL.revokeObjectURL(csvUrl);
                      setCsvUrl(null);
                      if (multiInputRef.current)
                        multiInputRef.current.value = null;
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
              <ul className="space-y-2 max-h-32 overflow-auto bg-slate-900/50 p-4 rounded-lg">
                {multiFiles.map((f, i) => (
                  <li key={i} className="text-sm text-slate-400">
                    {f.name} — {f.size} bytes
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
