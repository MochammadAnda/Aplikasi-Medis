"use client";

import { useRef, useState, useEffect } from "react";
// Import Service Axios
import { postFormData } from "@/services/api";

// Import Chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// Registrasi komponen Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// --- KOMPONEN ACTION CARDS ---
const ActionCards = ({ actionData, title }) => {
  if (!actionData) return null;

  const PointCard = ({ children, variant }) => {
    const variants = {
      red: "bg-red-950/40 border-red-500/20 text-red-100 hover:bg-red-900/60 hover:border-red-500/50",
      amber: "bg-amber-950/40 border-amber-500/20 text-amber-100 hover:bg-amber-900/60 hover:border-amber-500/50",
      emerald: "bg-emerald-950/40 border-emerald-500/20 text-emerald-100 hover:bg-emerald-900/60 hover:border-emerald-500/50",
    };

    const dots = {
      red: "bg-red-500 shadow-red-500/50",
      amber: "bg-amber-500 shadow-amber-500/50",
      emerald: "bg-emerald-500 shadow-emerald-500/50",
    };

    return (
      <div className={`p-4 rounded-xl border ${variants[variant]} transition-all duration-300 flex gap-3 items-start group/card`}>
        <span className={`mt-1.5 h-2 w-2 min-w-[8px] rounded-full ${dots[variant]} shadow-[0_0_8px] opacity-70 group-hover/card:opacity-100 transition-opacity`}></span>
        <span className="text-sm leading-relaxed font-medium opacity-90 group-hover/card:opacity-100">{children}</span>
      </div>
    );
  };

  return (
    <div className="w-full mt-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {title && (
        <div className="flex items-center justify-center mb-10">
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-slate-600"></div>
          <h3 className="mx-6 text-xl font-bold text-slate-100 tracking-wider text-center uppercase drop-shadow-md">{title}</h3>
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-slate-600"></div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* KOLOM 1: MASALAH */}
        <div className="flex flex-col h-full bg-slate-900/40 border border-slate-700/60 rounded-3xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-700/60">
            <div className="p-3 bg-red-500/10 rounded-2xl text-red-400 shadow-[0_0_20px_-5px_rgba(239,68,68,0.3)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></svg>
            </div>
            <h4 className="font-bold text-slate-200 text-lg">Deskripsi Masalah</h4>
          </div>
          <div className="space-y-3 flex-1">
            {actionData.diskripsi?.length > 0 ? (
              actionData.diskripsi.map((item, i) => <PointCard key={i} variant="red">{item}</PointCard>)
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-slate-700 text-slate-500 text-sm text-center italic">Tidak ada deskripsi spesifik.</div>
            )}
          </div>
        </div>

        {/* KOLOM 2: PENYEBAB */}
        <div className="flex flex-col h-full bg-slate-900/40 border border-slate-700/60 rounded-3xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-700/60">
            <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-400 shadow-[0_0_20px_-5px_rgba(245,158,11,0.3)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>
            </div>
            <h4 className="font-bold text-slate-200 text-lg">Penyebab / Orientasi</h4>
          </div>
          <div className="space-y-3 flex-1">
            {actionData.pengulangan?.length > 0 ? (
              actionData.pengulangan.map((item, i) => <PointCard key={i} variant="amber">{item}</PointCard>)
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-slate-700 text-slate-500 text-sm text-center italic">Tidak ada data penyebab.</div>
            )}
          </div>
        </div>

        {/* KOLOM 3: TINDAK LANJUT */}
        <div className="flex flex-col h-full bg-slate-900/40 border border-slate-700/60 rounded-3xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-700/60">
            <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg>
            </div>
            <h4 className="font-bold text-slate-200 text-lg">Tindak Lanjut</h4>
          </div>
          <div className="space-y-3 flex-1">
            {actionData.tindaklanjut?.length > 0 ? (
              actionData.tindaklanjut.map((item, i) => <PointCard key={i} variant="emerald">{item}</PointCard>)
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-slate-700 text-slate-500 text-sm text-center italic">Tidak ada tindakan lanjut.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

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
  const [multiAction, setMultiAction] = useState(null);

  // State untuk Download Modal
  const [customExcelName, setCustomExcelName] = useState("");
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // State untuk Pilihan Chart (Bar vs Pie)
  const [chartType, setChartType] = useState("bar");

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
    setPreview(null);
    setFileType("");

    uploadSingleToFlask(file);
  }

  async function uploadSingleToFlask(file) {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const data = await postFormData("/predict", formData);
      setSingleResult(data);

      if (data.image) {
        const base64Prefix = data.image.startsWith("data:") ? "" : "data:image/png;base64,";
        setPreview(`${base64Prefix}${data.image}`);
        setFileType("image/png");
      }
    } catch (error) {
      console.error("Error uploading:", error);
      alert("Terjadi kesalahan saat memproses Citra.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleMultiChange(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setCsvUrl(null);
    setMultiStats(null);
    setMultiAction(null);
    setCustomExcelName("");

    const list = files.map((f) => ({
      name: f.name,
      type: f.type || "unknown",
      size: f.size,
    }));
    setMultiFiles(list);

    uploadMultipleToFlask(files);
  }

  async function uploadMultipleToFlask(files) {
    setIsLoading(true);
    const formData = new FormData();
    files.forEach((f) => formData.append("files", f));

    try {
      const data = await postFormData("/predict-multiple", formData);

      if (data.excel_base64) {
        const excelBlob = base64ToBlob(data.excel_base64, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        const excelUrl = URL.createObjectURL(excelBlob);
        setCsvUrl(excelUrl);
      }

      if (data.summary) {
        setMultiStats(data.summary);
      }

      if (data.action) {
        setMultiAction(data.action);
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

  // --- FUNGSI EKSEKUSI DOWNLOAD ---
  const handleDownloadExecution = () => {
    if (csvUrl) {
      const a = document.createElement("a");
      a.href = csvUrl;
      const fileName = customExcelName.trim()
        ? (customExcelName.endsWith('.xlsx') ? customExcelName : `${customExcelName}.xlsx`)
        : "hasil_klasifikasi_batch.xlsx";

      a.download = fileName;
      a.click();
      setShowDownloadModal(false); // Tutup modal setelah download
    }
  };

  // --- CHART CONFIG ---
  const chartColors = ["rgba(59, 130, 246, 0.8)", "rgba(239, 68, 68, 0.8)", "rgba(16, 185, 129, 0.8)", "rgba(245, 158, 11, 0.8)"];
  const chartBorders = ["rgba(59, 130, 246, 1)", "rgba(239, 68, 68, 1)", "rgba(16, 185, 129, 1)", "rgba(245, 158, 11, 1)"];

  const chartData = multiStats
    ? {
        labels: multiStats.map((item) => item.class_name),
        datasets: [
          {
            label: "Jumlah Kasus",
            data: multiStats.map((item) => item.count),
            backgroundColor: chartColors,
            borderColor: chartBorders,
            borderWidth: 1,
            borderRadius: chartType === 'bar' ? 6 : 0,
            hoverOffset: chartType === 'pie' ? 10 : 0,
          },
        ],
      }
    : null;

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        titleColor: "#cbd5e1",
        bodyColor: "#fff",
        borderColor: "#3b82f6",
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Jumlah Deteksi", color: "#94a3b8", font: { size: 12 } },
        ticks: { stepSize: 1, color: "#cbd5e1" },
        grid: { color: "#334155" },
      },
      x: {
        title: { display: true, text: "Kategori / Kelas", color: "#94a3b8", font: { size: 12 } },
        ticks: { color: "#cbd5e1" },
        grid: { display: false },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: "#cbd5e1",
          font: { size: 12 },
          boxWidth: 15,
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        titleColor: "#cbd5e1",
        bodyColor: "#fff",
        borderColor: "#3b82f6",
        borderWidth: 1,
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) { label += ': '; }
            let value = context.parsed;
            let total = context.chart._metasets[context.datasetIndex].total;
            let percentage = ((value / total) * 100).toFixed(1) + "%";
            return label + value + " (" + percentage + ")";
          }
        }
      },
    },
  };

  return (
    <section id="scan" className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 relative overflow-visible min-h-screen">
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-violet-600/30 rounded-full blur-3xl z-0 pointer-events-none"></div>
      <div className="absolute bottom-8 right-8 w-80 h-80 bg-blue-700/30 rounded-full blur-[100px] z-0 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="panel-translucent rounded-3xl p-8 lg:p-10 flex flex-col items-center gap-8 bg-slate-800/50 backdrop-blur-xl border border-slate-700 shadow-2xl">
          <div className="text-center space-y-2">
            <h2 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Scan Citra Medis</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">Unggah file DICOM untuk analisis klasifikasi dan rekomendasi tindakan otomatis.</p>
          </div>

          <input ref={singleInputRef} type="file" accept=".dcm,application/pdf,image/*" className="hidden" onChange={handleSingleChange} />
          <input ref={multiInputRef} type="file" multiple accept=".dcm,application/pdf,image/*" className="hidden" onChange={handleMultiChange} />

          {/* Buttons Upload */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center w-full max-w-md">
            <button
              disabled={isLoading}
              className="group flex-1 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
              onClick={() => singleInputRef.current?.click()}
            >
              {isLoading && !multiFiles.length ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
              )}
              {isLoading && !multiFiles.length ? "Processing..." : "Single Upload"}
            </button>
            <button
              disabled={isLoading}
              className="group flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-4 rounded-xl font-bold shadow-lg transition-all transform hover:-translate-y-1 border border-slate-600 flex items-center justify-center gap-3"
              onClick={() => multiInputRef.current?.click()}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" /><polyline points="14 2 14 8 20 8" /><path d="M3 15h6" /><path d="M3 18h6" /></svg>
              {isLoading && multiFiles.length > 0 ? "Processing Batch..." : "Multiple Upload"}
            </button>
          </div>

          {/* TAMPILAN SINGLE UPLOAD */}
          {fileName && !multiFiles.length && (
            <div className="w-full flex flex-col gap-8 mt-4 animate-in fade-in zoom-in duration-500">
              <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
                <div className="flex flex-col items-center gap-4 w-full md:w-5/12">
                  <div className="w-full bg-slate-900/40 p-3 rounded-lg border border-slate-700 flex items-center justify-between">
                    <span className="text-slate-300 text-sm truncate px-2 font-mono">{fileName}</span>
                    <button onClick={handleReset} className="p-1 hover:bg-red-500/20 text-red-400 rounded transition" title="Reset">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                    </button>
                  </div>

                  {isLoading && (
                    <div className="w-full aspect-square max-w-sm bg-slate-900/50 rounded-2xl flex flex-col items-center justify-center border-2 border-slate-700 border-dashed animate-pulse relative overflow-hidden">
                       <span className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full mb-3 relative z-10"></span>
                      <span className="text-slate-400 text-sm font-medium relative z-10">Menganalisis Citra...</span>
                    </div>
                  )}

                  {!isLoading && preview && fileType.startsWith("image/") && (
                    <div className="relative w-full aspect-square max-w-sm bg-black rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl group">
                      <img src={preview} alt="Result Preview" className="object-contain w-full h-full transition duration-500 group-hover:scale-105" />
                    </div>
                  )}
                </div>

                {singleResult && (
                  <div className="w-full md:w-7/12 flex flex-col gap-4 h-full">
                    <div className="bg-slate-900/60 p-6 sm:p-8 rounded-3xl border border-slate-600/50 shadow-xl backdrop-blur-md relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                      <h3 className="text-xs uppercase tracking-widest text-slate-400 mb-2 font-semibold">Hasil Prediksi Utama</h3>
                      <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-8 tracking-tight">{singleResult.predicted_class || "Unknown"}</div>

                      <div className="space-y-5">
                        <div className="flex justify-between items-end border-b border-slate-700 pb-2 mb-2">
                          <span className="text-sm text-slate-400 font-medium">Distribusi Probabilitas</span>
                        </div>
                        {singleResult.probabilities?.map((prob, idx) => (
                          <div key={idx} className="group">
                            <div className="flex justify-between text-sm mb-1.5">
                              <span className={`transition-colors ${prob.class_name === singleResult.predicted_class ? "text-blue-300 font-bold" : "text-slate-500"}`}>{prob.class_name}</span>
                              <span className="text-slate-400 font-mono">{prob.percent}%</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden shadow-inner">
                              <div className={`h-full rounded-full transition-all duration-1000 ease-out ${prob.class_name === singleResult.predicted_class ? "bg-gradient-to-r from-blue-600 to-cyan-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]" : "bg-slate-600 group-hover:bg-slate-500"}`} style={{ width: `${parseFloat(prob.percent)}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {singleResult && singleResult.action && (
                <div className="border-t border-slate-700/50 pt-8 mt-4">
                  <ActionCards actionData={singleResult.action} />
                </div>
              )}
            </div>
          )}

          {/* TAMPILAN MULTIPLE UPLOAD */}
          {multiFiles && multiFiles.length > 0 && (
            <div className="w-full mt-8 pt-8 border-t border-slate-700 animate-in fade-in slide-in-from-bottom-6 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Kiri: List File & Kontrol */}
                <div className="order-2 md:order-1 flex flex-col h-full gap-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-200">Antrian Batch</h3>
                    <span className="px-3 py-1 bg-slate-700/50 rounded-full text-xs font-mono text-blue-300 border border-slate-600">{multiFiles.length} files</span>
                  </div>

                  <div className="bg-slate-900/40 p-1 rounded-2xl border border-slate-700/50 flex-1 min-h-[200px] flex flex-col shadow-inner">
                    <div className="overflow-y-auto max-h-[250px] custom-scrollbar p-2 space-y-2">
                      {multiFiles.map((f, i) => (
                        <div key={i} className="text-sm text-slate-300 flex justify-between items-center bg-slate-800/40 p-3 rounded-xl border border-transparent hover:border-slate-600 hover:bg-slate-800/60 transition group">
                          <div className="flex items-center gap-3 overflow-hidden">
                            <span className="text-slate-500 group-hover:text-blue-400 transition-colors">📄</span>
                            <span className="truncate max-w-[180px] sm:max-w-[250px]">{f.name}</span>
                          </div>
                          <span className="text-xs text-slate-500 font-mono">{(f.size / 1024).toFixed(0)} KB</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
                    {/* BUTTON DOWNLOAD UTAMA (Sekarang Membuka Modal) */}
                    <button
                      disabled={isLoading || !csvUrl}
                      onClick={() => setShowDownloadModal(true)}
                      className={`px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                        isLoading ? "bg-slate-800 text-slate-500 cursor-not-allowed col-span-2" : csvUrl ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20 col-span-2 sm:col-span-1" : "bg-slate-700 text-slate-500 cursor-not-allowed col-span-2"
                      }`}
                    >
                      {isLoading ? (
                         <> <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span> Memproses... </>
                      ) : csvUrl ? (
                         <>📊 Download Excel</>
                      ) : ( "Menunggu..." )}
                    </button>

                    <button
                      className={`px-4 py-3 rounded-xl font-medium border transition-all flex items-center justify-center gap-2 ${
                        csvUrl ? "border-slate-600 text-slate-300 hover:bg-slate-700 col-span-2 sm:col-span-1" : "border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-white col-span-2"
                      }`}
                      onClick={() => {
                        setMultiFiles([]);
                        setMultiStats(null);
                        setCsvUrl(null);
                        setMultiAction(null);
                        setCustomExcelName("");
                        if (multiInputRef.current) multiInputRef.current.value = "";
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                      Reset & Ulang
                    </button>
                  </div>
                </div>

                {/* Kanan: Grafik Chart */}
                <div className="order-1 md:order-2 flex flex-col bg-slate-900/40 rounded-3xl border border-slate-700/50 p-6 h-full min-h-[350px] shadow-lg">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-4">
                    <h4 className="text-slate-300 font-semibold">Visualisasi Data</h4>
                    {/* CHART TYPE TOGGLE */}
                    <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700/50">
                        <button onClick={() => setChartType('bar')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartType === 'bar' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'}`}>Bar</button>
                        <button onClick={() => setChartType('pie')} className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${chartType === 'pie' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'}`}>Pie</button>
                    </div>
                  </div>

                  <div className="flex-1 flex items-center justify-center w-full relative">
                    {isLoading ? (
                      <div className="flex flex-col items-center justify-center text-slate-500 gap-3 absolute inset-0">
                        <div className="animate-spin h-12 w-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full"></div>
                        <span className="text-sm font-medium animate-pulse">Analisis data sedang berjalan...</span>
                      </div>
                    ) : chartData ? (
                      <div className="w-full h-full min-h-[250px] flex justify-center items-center">
                        {chartType === 'bar' ? (
                            <Bar data={chartData} options={barOptions} />
                        ) : (
                            <div className="w-full h-[250px]">
                                <Pie data={chartData} options={pieOptions} />
                            </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-slate-600 text-sm text-center px-8 italic flex flex-col items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><line x1="18" x2="18" y1="20" y2="10" /><line x1="12" x2="12" y1="20" y2="4" /><line x1="6" x2="6" y1="20" y2="14" /></svg>
                        Grafik akan muncul di sini setelah analisis selesai.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {multiAction && (
                <div className="border-t border-slate-700 pt-8 mt-4">
                  <ActionCards actionData={multiAction} title={`Rekomendasi Tindak Lanjut (Dominan: ${multiAction.dataid})`} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* --- POPUP / MODAL DOWNLOAD --- */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-slate-800 border border-slate-600 rounded-2xl p-6 w-full max-w-md shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-bold text-white mb-2">Simpan Hasil Analisis</h3>
            <p className="text-slate-400 text-sm mb-6">Masukkan nama file untuk menyimpan hasil analisis Anda dalam format Excel (.xlsx).</p>

            <div className="mb-6">
              <label className="text-xs text-slate-300 font-semibold mb-2 block uppercase tracking-wider">Nama File</label>
              <input
                type="text"
                autoFocus
                value={customExcelName}
                onChange={(e) => setCustomExcelName(e.target.value)}
                placeholder="contoh: hasil_klasifikasi"
                className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              <p className="text-right text-xs text-slate-500 mt-2">Default: hasil_klasifikasi_batch.xlsx</p>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDownloadModal(false)}
                className="px-5 py-2.5 rounded-xl text-slate-300 font-medium hover:bg-slate-700 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDownloadExecution}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/20 flex items-center gap-2 transition-transform active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}