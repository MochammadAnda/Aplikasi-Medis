"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export default function ScanSection() {
  const singleInputRef = useRef(null);
  const multiInputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [fileType, setFileType] = useState("");
  const [fileName, setFileName] = useState("");

  // multiple upload state
  const [multiFiles, setMultiFiles] = useState([]); // array of {name,type,size}
  const [csvUrl, setCsvUrl] = useState(null);

  useEffect(() => {
    return () => {
      if (csvUrl) URL.revokeObjectURL(csvUrl);
    };
  }, [csvUrl]);

  function handleSingleChange(e) {
    const file = e.target.files?.[0];
   
    if (!file) return;
    setFileName(file.name);
    const type = file.type;
    setFileType(type);

    uploadSingleToFlask(file);
    
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

  async function uploadSingleToFlask(file) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("http://localhost:5001/predict", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  console.log("Hasil Flask:", data);

  // TODO: tampilkan hasil ke UI
}


  function handleMultiChange(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const list = files.map((f) => ({ name: f.name, type: f.type || "unknown", size: f.size }));
    setMultiFiles(files.map(f => ({ name: f.name, size: f.size, type: f.type })));

  uploadMultipleToFlask(files); // ← kirim ke Flask backend

    // create CSV immediately (simulate successful upload)
    const csv = createCsv(list);
    if (csvUrl) URL.revokeObjectURL(csvUrl);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    setCsvUrl(url);
  }

  async function uploadMultipleToFlask(files) {
  const formData = new FormData();
  for (let f of files) {
    formData.append("files", f);
  }

  const res = await fetch("http://localhost:5001/predict-multiple", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  console.log("Hasil Multiple Flask:", data);

  // TODO: tampilkan summary + CSV ke UI
}


  function createCsv(list) {
    const header = ["filename", "type", "size_bytes", "status"];
    const rows = list.map((f) => [f.name, f.type, String(f.size), "uploaded"]);
    const lines = [header.join(",")].concat(rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")));
    return lines.join("\n");
  }

  return (
    <section id="scan" className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 relative overflow-visible">
      {/* Dekorasi blur background sama seperti Hero (tuned) */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-violet-600/30 rounded-full blur-2xl z-0 pointer-events-none"></div>
      <div className="absolute bottom-8 right-8 w-80 h-80 bg-blue-700/30 rounded-full blur-[80px] z-0 pointer-events-none"></div>
      {/* Blur effect for section border (top)
      <div className="absolute left-0 right-0 -top-6 h-12 pointer-events-none z-10">
        <div className="w-full h-full bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent backdrop-blur-md"></div>
      </div> */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 relative z-10">
        <div className="panel-translucent rounded-2xl p-8 flex flex-col items-center gap-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-primary-500 text-center">Scan Gambar Medis</h2>
          <p className="text-lg text-on-primary/80 text-center mb-4">Unggah file DICOM (.dcm), PDF, atau gambar (JPG, JPEG, PNG, dll) untuk dianalisis.</p>
          {/* Single upload input/button */}
          <input ref={singleInputRef} type="file" accept=".dcm,application/pdf,image/jpeg,image/jpg,image/png,image/gif" className="hidden" onChange={handleSingleChange} />
          <input ref={multiInputRef} type="file" multiple accept=".dcm,application/pdf,image/jpeg,image/jpg,image/png,image/gif" className="hidden" onChange={handleMultiChange} />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-full font-semibold shadow-md transition" onClick={() => singleInputRef.current?.click()}>
              Single Upload
            </button>
            <button className="bg-primary-400 hover:bg-primary-500 text-white px-6 py-3 rounded-full font-semibold shadow-md transition" onClick={() => multiInputRef.current?.click()}>
              Multiple Upload
            </button>
          </div>
          {fileName && (
            <div className="w-full flex flex-col items-center gap-4 mt-4">
              <span className="text-on-primary/80 text-sm">File: {fileName}</span>
              {preview && fileType.startsWith("image/") && (
                <div className="relative w-64 h-64">
                  <img src={preview} alt="Preview" className="object-contain rounded-xl border border-primary-500 w-full h-full" />
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

          {/* Multiple upload preview + CSV download */}
          {multiFiles && multiFiles.length > 0 && (
            <div className="w-full mt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="text-on-primary/80">{multiFiles.length} file(s) ready</div>
                <div className="flex items-center gap-2">
                  {csvUrl && (
                    <a href={csvUrl} download="upload-results.csv" className="inline-flex items-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm">
                      Download CSV
                    </a>
                  )}
                  <button
                    className="inline-flex items-center px-3 py-2 bg-slate-700/60 text-slate-200 rounded-md text-sm border border-slate-600 hover:bg-slate-700"
                    onClick={() => {
                      setMultiFiles([]);
                      if (csvUrl) {
                        URL.revokeObjectURL(csvUrl);
                        setCsvUrl(null);
                      }
                      if (multiInputRef.current) multiInputRef.current.value = null;
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>

              <ul className="space-y-2 max-h-48 overflow-auto">
                {multiFiles.map((f, i) => (
                  <li key={i} className="text-sm text-on-primary/80">
                    {f.name} — {f.type || "unknown"} — {f.size} bytes
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