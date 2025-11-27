import axios from "axios";

// Ganti URL ini sesuai alamat backend Flask Anda
const API_BASE_URL = "http://localhost:5001";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Timeout 30 detik (opsional, sesuaikan kebutuhan)
});

/**
 * Helper untuk melakukan POST request (Multipart/Form-Data)
 * @param {string} endpoint - Contoh: "/predict"
 * @param {FormData} formData - Data file yang akan dikirim
 */
export const postFormData = async (endpoint, formData) => {
  try {
    const response = await apiClient.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Axios otomatis mengatur boundary, tapi eksplisit juga oke
      },
    });
    return response.data; // Mengembalikan data JSON langsung
  } catch (error) {
    // Handle error response dari server (misal 400, 500)
    if (error.response) {
      throw new Error(error.response.data.message || "Server Error");
    }
    throw error;
  }
};
