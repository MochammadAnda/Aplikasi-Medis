import axios from "axios";

// Pastikan port ini sama dengan backend Flask Anda
const API_BASE_URL = "https://api.dradiographiq.cloud/";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000000, // 30 detik
});

/**
 * Wrapper untuk POST Request dengan FormData
 * Catatan: Saat mengirim FormData, axios biasanya otomatis mengatur
 * boundary Content-Type, jadi kita bisa membiarkan headers kosong atau auto.
 */
export const postFormData = async (endpoint, formData) => {
  try {
    const response = await apiClient.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Mengembalikan pesan error spesifik dari Flask (jika ada)
      throw new Error(error.response.data.error || "Terjadi kesalahan pada server");
    } else if (error.request) {
      throw new Error("Tidak ada respon dari server. Cek koneksi backend.");
    } else {
      throw new Error(error.message);
    }
  }
};

// --- FUNGSI SPESIFIK UNTUK ENDPOINT FLASK ---

/**
 * 1. Single Prediction (/predict)
 * Menerima satu object File (dari input type="file")
 */
export const predictSingleImage = async (file) => {
  const formData = new FormData();
  // Key 'file' harus sesuai dengan: request.files['file'] di Flask
  formData.append("file", file);

  return await postFormData("/predict", formData);
};

/**
 * 2. Multiple Prediction (/predict-multiple)
 * Menerima array of Files atau FileList
 */
export const predictMultipleImages = async (files) => {
  const formData = new FormData();

  // Loop dan append dengan key yang sama ('files')
  // Harus sesuai dengan: request.files.getlist('files') di Flask
  Array.from(files).forEach((file) => {
    formData.append("files", file);
  });

  return await postFormData("/predict-multiple", formData);
};

/**
 * HELPER: Download Excel dari Base64
 * Backend Flask mengirim file Excel dalam format string Base64.
 * Fungsi ini mengubahnya menjadi file yang bisa didownload browser.
 */
export const downloadExcelFromBase64 = (base64String, fileName = "Laporan_Klasifikasi.xlsx") => {
  try {
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    // Membuat link download virtual
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    window.URL.revokeObjectURL(link.href);
  } catch (error) {
    console.error("Gagal mendownload excel:", error);
  }
};
