"use client";

import { useRef, useState, useEffect } from "react";
// Import Service Axios yang baru dibuat
import { postFormData } from "@/services/api"; // Sesuaikan path import ini dengan struktur folder Anda

// Import Chart.js
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";

// Registrasi komponen Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function ScanSection() {
  const singleInputRef = useRef(null);
  const multiInputRef = useRef(null);

  // State untuk Single Upload
  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState("");
  const [fileName, setFileName] = useState("");
  const [singleResult, setSingleResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // State untuk Multiple Upload
  const [multiFiles, setMultiFiles] = useState([]);
  const [csvUrl, setCsvUrl] = useState(null);
  const [multiStats, setMultiStats] = useState(null);

  useEffect(() => {
    return () => {
      if (csvUrl) URL.revokeObjectURL(csvUrl);
    };
  }, [csvUrl]);

  function handleReset() {
    setPreview(null);
    setFileName("");
    setFileType("");
    setSingleResult(null);
    setIsLoading(false);
    if (singleInputRef.current) {
      singleInputRef.current.value = "";
    }
  }

  function handleSingleChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setSingleResult(null);
    setFileName(file.name);
    const type = file.type || "image/unknown";
    setFileType(type);

    if (type.startsWith("image/") || type === "image/unknown") {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    } else if (type === "application/pdf") {
      setPreview("pdf");
    } else if (file.name.toLowerCase().endsWith(".dcm")) {
      setPreview("dicom");
    } else {
      setPreview(null);
    }

    uploadSingleToFlask(file);
  }

  // --- FUNGSI UPLOAD SINGLE (MENGGUNAKAN AXIOS) ---
  async function uploadSingleToFlask(file) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Menggunakan service axios import
      // Tidak perlu lagi menulis "http://localhost:5001" disini jika sudah di set di service
      const data = await postFormData("/predict", formData);

      console.log("Hasil Flask:", data);
      setSingleResult(data);

      if (data.image) {
        const base64Prefix = data.image.startsWith("data:") ? "" : "data:image/png;base64,";
        setPreview(`${base64Prefix}${data.image}`);
      }
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Terjadi kesalahan saat memproses gambar.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleMultiChange(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setCsvUrl(null);
    setMultiStats(null);

    const list = files.map((f) => ({
      name: f.name,
      type: f.type || "unknown",
      size: f.size,
    }));
    setMultiFiles(list); // Menyimpan list file untuk UI

    uploadMultipleToFlask(files);
  }

  // --- FUNGSI UPLOAD MULTIPLE (MENGGUNAKAN AXIOS) ---
  async function uploadMultipleToFlask(files) {
    setIsLoading(true);
    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));

    try {
      // Menggunakan service axios import
      const data = await postFormData("/predict-multiple", formData);

      // 1. Handle Excel
      if (data.excel_base64) {
        const excelBlob = base64ToBlob(data.excel_base64, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        const excelUrl = URL.createObjectURL(excelBlob);
        setCsvUrl(excelUrl);
      }

      // 2. Handle Statistik
      if (data.summary) {
        setMultiStats(data.summary);
      } else {
        console.warn("Backend tidak mengirim data 'summary' untuk grafik.");
        setMultiStats(null);
      }
    } catch (err) {
      console.error("Error processing batch:", err);
      alert("Gagal memproses multiple upload.");
    } finally {
      setIsLoading(false);
    }
  }

  function base64ToBlob(base64, type = "application/octet-stream") {
    const binStr = atob(base64);
    const len = binStr.length;
    const arr = new Uint8Array(len);
    for (let i = 0; i < len; i++) arr[i] = binStr.charCodeAt(i);
    return new Blob([arr], { type });
  }

  // Konfigurasi Chart
  const chartData = multiStats
    ? {
        labels: Object.keys(multiStats),
        datasets: [
          {
            label: "Jumlah Kasus",
            data: Object.values(multiStats),
            backgroundColor: [
              "rgba(59, 130, 246, 0.8)", // Blue
              "rgba(239, 68, 68, 0.8)", // Red
              "rgba(16, 185, 129, 0.8)", // Green
              "rgba(245, 158, 11, 0.8)", // Yellow
            ],
            borderColor: ["rgba(59, 130, 246, 1)", "rgba(239, 68, 68, 1)", "rgba(16, 185, 129, 1)", "rgba(245, 158, 11, 1)"],
            borderWidth: 1,
          },
        ],
      }
    : null;

  return (
    <section id="scan" className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 relative overflow-visible min-h-screen">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-violet-600/30 rounded-full blur-2xl z-0 pointer-events-none"></div>
      <div className="absolute bottom-8 right-8 w-80 h-80 bg-blue-700/30 rounded-full blur-[80px] z-0 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <div className="panel-translucent rounded-2xl p-8 flex flex-col items-center gap-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary-500 text-center">Scan Gambar Medis</h2>
          <p className="text-lg text-slate-300 text-center mb-4">Unggah file DICOM, PDF, atau Gambar untuk dianalisis.</p>

          <input ref={singleInputRef} type="file" accept=".dcm,application/pdf,image/*" className="hidden" onChange={handleSingleChange} />
          <input ref={multiInputRef} type="file" multiple accept=".dcm,application/pdf,image/*" className="hidden" onChange={handleMultiChange} />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 text-white px-6 py-3 rounded-full font-semibold shadow-md transition flex items-center gap-2"
              onClick={() => singleInputRef.current?.click()}
            >
              {isLoading && !multiFiles.length ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : null}
              {isLoading && !multiFiles.length ? "Processing..." : "Single Upload"}
            </button>
            <button disabled={isLoading} className="bg-slate-600 hover:bg-slate-500 text-white px-6 py-3 rounded-full font-semibold shadow-md transition" onClick={() => multiInputRef.current?.click()}>
              {isLoading && multiFiles.length > 0 ? "Processing Batch..." : "Multiple Upload"}
            </button>
          </div>

          {/* TAMPILAN SINGLE UPLOAD */}
          {fileName && !multiFiles.length && (
            <div className="w-full flex flex-col gap-8 mt-6 animate-in fade-in zoom-in duration-300">
              <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                {/* Preview Gambar */}
                <div className="flex flex-col items-center gap-2 w-full md:w-1/2">
                  <span className="text-slate-400 text-sm">File: {fileName}</span>
                  {preview && fileType.startsWith("image/") && (
                    <div className="relative w-full max-w-sm aspect-square bg-black rounded-xl overflow-hidden border-2 border-blue-500 shadow-lg shadow-blue-500/20">
                      <img src={preview} alt="Preview" className="object-contain w-full h-full" />
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

                  <div className="flex items-center justify-between px-2 w-full mt-2">
                    <p className="text-xs text-slate-500 font-mono truncate max-w-[200px]">{fileName}</p>
                    <button onClick={handleReset} className="text-sm flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-full transition">
                      🔄 Reset
                    </button>
                  </div>
                </div>

                {/* Hasil Prediksi Utama */}
                {singleResult && (
                  <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-600">
                      <h3 className="text-sm uppercase tracking-wider text-slate-400 mb-1">Prediksi Utama</h3>
                      <div className="text-3xl font-bold text-blue-400 mb-4">{singleResult.predicted_class || "Unknown"}</div>

                      <h4 className="text-sm text-slate-400 mb-2">Probabilitas:</h4>
                      <div className="space-y-3">
                        {singleResult.probabilities?.map((prob, idx) => (
                          <div key={idx} className="flex flex-col gap-1">
                            <div className="flex justify-between text-sm">
                              <span className={prob.class_name === singleResult.predicted_class ? "text-white font-semibold" : "text-slate-400"}>{prob.class_name}</span>
                              <span className="text-slate-300">{prob.percent}%</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                              <div className={`h-2 rounded-full ${prob.class_name === singleResult.predicted_class ? "bg-blue-500" : "bg-slate-500"}`} style={{ width: `${parseFloat(prob.percent)}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Detail Analisis */}
              {singleResult && singleResult.action && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4 w-full">
                  <div className="bg-red-900/20 border border-red-500/30 p-5 rounded-xl">
                    <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2">⚠️ Deskripsi Masalah</h4>
                    <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
                      {singleResult.action.diskripsi?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-orange-900/20 border border-orange-500/30 p-5 rounded-xl">
                    <h4 className="font-bold text-orange-400 mb-3 flex items-center gap-2">🔄 Penyebab / Orientasi</h4>
                    <ul className="list-disc list-inside space-y-2 text-sm text-slate-300">
                      {singleResult.action.pengulangan?.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-green-900/20 border border-green-500/30 p-5 rounded-xl">
                    <h4 className="font-bold text-green-400 mb-3 flex items-center gap-2">✅ Tindak Lanjut</h4>
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

          {/* TAMPILAN MULTIPLE UPLOAD */}
          {multiFiles && multiFiles.length > 0 && (
            <div className="w-full mt-8 pt-8 border-t border-slate-700 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* List File */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-200">Batch Analysis</h3>
                    <span className="text-slate-400 text-sm">{multiFiles.length} files</span>
                  </div>
                  <div className="bg-slate-900/50 p-4 rounded-lg max-h-60 overflow-y-auto border border-slate-600">
                    <ul className="space-y-2">
                      {multiFiles.map((f, i) => (
                        <li key={i} className="text-sm text-slate-400 flex justify-between">
                          <span className="truncate max-w-[70%]">{f.name}</span>
                          <span className="text-xs text-slate-500">{(f.size / 1024).toFixed(1)} KB</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex flex-col gap-3">
                    <button
                      disabled={isLoading || !csvUrl}
                      onClick={() => {
                        if (csvUrl) {
                          const a = document.createElement("a");
                          a.href = csvUrl;
                          a.download = "hasil_klasifikasi_batch.xlsx";
                          a.click();
                        }
                      }}
                      className={`w-full px-4 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition ${
                        isLoading ? "bg-slate-700 text-slate-400 cursor-not-allowed" : csvUrl ? "bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20" : "bg-slate-700 text-slate-500 cursor-not-allowed"
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <span className="animate-spin h-4 w-4 border-2 border-slate-400 border-t-transparent rounded-full"></span>
                          Sedang Memproses...
                        </>
                      ) : csvUrl ? (
                        <>📄 Download Hasil Excel</>
                      ) : (
                        "Menunggu Proses..."
                      )}
                    </button>

                    <button
                      className="px-3 py-2 text-slate-400 hover:text-white text-sm transition"
                      onClick={() => {
                        setMultiFiles([]);
                        setMultiStats(null);
                        setCsvUrl(null);
                        if (multiInputRef.current) multiInputRef.current.value = "";
                      }}
                    >
                      Bersihkan / Upload Ulang
                    </button>
                  </div>
                </div>

                {/* Grafik Chart */}
                <div className="flex flex-col items-center justify-center bg-slate-900/30 rounded-xl border border-slate-700/50 p-6">
                  <h4 className="text-slate-300 font-semibold mb-4">Statistik Klasifikasi</h4>
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center h-48 text-slate-500 gap-2">
                      <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                      <span>Menganalisis data...</span>
                    </div>
                  ) : chartData ? (
                    <div className="w-full max-w-[250px]">
                      <Doughnut
                        data={chartData}
                        options={{
                          plugins: {
                            legend: {
                              position: "bottom",
                              labels: { color: "#cbd5e1" },
                            },
                          },
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-48 flex items-center justify-center text-slate-600 text-sm text-center px-4">Grafik akan muncul setelah analisis selesai.</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
