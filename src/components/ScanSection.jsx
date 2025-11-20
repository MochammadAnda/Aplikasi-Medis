"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function ScanSection() {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setFileType(file.type);
    setResult(null);
    setError(null);

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(file);
    } else if (file.type === "application/pdf") {
      setPreview("pdf");
    } else if (file.name.toLowerCase().endsWith(".dcm")) {
      setPreview("dicom");
    } else {
      setPreview(null);
    }
  }

  async function handleUpload() {
    if (!fileInputRef.current.files[0]) {
      alert("Pilih file terlebih dahulu!");
      return;
    }

    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("http://202.10.42.70:5001/predict", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Terjadi kesalahan pada server");

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="scan" className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="panel-translucent rounded-2xl p-8 flex flex-col items-center gap-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary-500 text-center">Scan Gambar Medis</h2>
          <p className="text-lg text-on-primary/80 text-center mb-4">
            Unggah file DICOM (.dcm), PDF, atau gambar (JPG, JPEG, PNG, dll) untuk dianalisis.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept=".dcm,application/pdf,image/jpeg,image/png,image/jpg"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-semibold shadow-md transition"
            onClick={() => fileInputRef.current?.click()}
          >
            Pilih File
          </button>

          {fileName && (
            <div className="w-full flex flex-col items-center gap-4 mt-4">
              <span className="text-on-primary/80 text-sm">File: {fileName}</span>

              {preview && fileType.startsWith("image/") && (
                <div className="relative w-64 h-64">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="object-contain rounded-xl border border-primary-500"
                  />
                </div>
              )}

              {preview === "pdf" && (
                <div className="w-64 h-64 flex items-center justify-center bg-slate-800/40 rounded-xl border border-primary-500">
                  <span className="text-primary-400">PDF terdeteksi</span>
                </div>
              )}

              {preview === "dicom" && (
                <div className="w-64 h-64 flex items-center justify-center bg-slate-800/40 rounded-xl border border-primary-500">
                  <span className="text-primary-400">DICOM terdeteksi</span>
                </div>
              )}
            </div>
          )}

          {/* Upload Button */}
          <button
            className="mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-full font-semibold transition"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Memproses..." : "Scan Sekarang"}
          </button>

          {/* Error */}
          {error && <p className="text-red-400 mt-4">{error}</p>}

          {/* Result */}
          {result && (
            <div className="bg-slate-800/60 p-6 rounded-xl mt-6 w-full">
              <h3 className="text-xl font-bold text-primary-400 mb-3">
                Hasil Prediksi: {result.predicted_class}
              </h3>

              <p className="font-semibold">Probabilitas:</p>
              <ul className="text-sm mt-2 mb-4">
                {result.probabilities.map((p, i) => (
                  <li key={i}>
                    {p.class_name} — {p.percent}%
                  </li>
                ))}
              </ul>

              {result.action && (
                <>
                  <p className="font-semibold">Tindak Lanjut:</p>
                  <ul className="text-sm mt-2">
                    {result.action.tindaklanjut.map((t, i) => (
                      <li key={i}>• {t}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
