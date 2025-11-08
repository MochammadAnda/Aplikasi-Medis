"use client";

import { useRef, useState } from "react";
import Image from "next/image";

export default function ScanSection() {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState("");
  const [fileName, setFileName] = useState("");

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const type = file.type;
    setFileType(type);
    // Preview for images
    if (type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(file);
    } else if (type === "application/pdf") {
      setPreview("pdf");
    } else if (file.name.toLowerCase().endsWith(".dcm")) {
      setPreview("dicom");
    } else {
      setPreview(null);
    }
  }

  return (
    <section id="scan" className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="panel-translucent rounded-2xl p-8 flex flex-col items-center gap-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary-500 text-center">Scan Gambar Medis</h2>
          <p className="text-lg text-on-primary/80 text-center mb-4">Unggah file DICOM (.dcm), PDF, atau gambar (JPG, JPEG, PNG, dll) untuk dianalisis.</p>
          <input ref={fileInputRef} type="file" accept=".dcm,application/pdf,image/jpeg,image/jpg,image/png,image/gif" className="hidden" onChange={handleFileChange} />
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-semibold shadow-md transition" onClick={() => fileInputRef.current?.click()}>
            Pilih File
          </button>
          {fileName && (
            <div className="w-full flex flex-col items-center gap-4 mt-4">
              <span className="text-on-primary/80 text-sm">File: {fileName}</span>
              {preview && fileType.startsWith("image/") && (
                <div className="relative w-64 h-64">
                  <Image src={preview} alt="Preview" fill className="object-contain rounded-xl border border-primary-500" />
                </div>
              )}
              {preview === "pdf" && (
                <div className="w-64 h-64 flex items-center justify-center bg-slate-800/40 rounded-xl border border-primary-500">
                  <span className="text-primary-400">PDF file terdeteksi</span>
                </div>
              )}
              {preview === "dicom" && (
                <div className="w-64 h-64 flex items-center justify-center bg-slate-800/40 rounded-xl border border-primary-500">
                  <span className="text-primary-400">DICOM file terdeteksi</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
