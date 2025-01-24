import axios from "axios";

const API_URL = "http://localhost:3001";

// إعداد interceptor لإضافة التوكن إلى كل الطلبات
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // جلب التوكن من localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // إضافة التوكن إلى رأس الطلب
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchReservations = async (filter) => {
  
  try {
    // بناء query parameters بناءً على الفلتر
    const params = new URLSearchParams();

    if (filter?.status) params.append("status", filter.status);
    if (filter?.hotelName) params.append("hotel", filter.hotelName);
    if (filter?.userName) params.append("username", filter.userName);
    /* if (filter?.startDate) params.append("checkIn", filter.startDate); */
    /* if (filter?.endDate) params.append("checkOut", filter.endDate); */

    // إرسال الطلب مع query parameters
    const response = await axios.get(`${API_URL}/reservations?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch reservations:", error);
    throw error; // يمكنك التعامل مع الخطأ بشكل أفضل في الكود الذي يستدعي هذه الدالة
  }
};

export const fetchHotels = async () => {
  try {
    // إرسال الطلب مع query parameters
    const response = await axios.get(`${API_URL}/hotels`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch reservations:", error);
    throw error; // يمكنك التعامل مع الخطأ بشكل أفضل في الكود الذي يستدعي هذه الدالة
  }
};

export const createReservation = async (reservation) => {
  const response = await axios.post(`${API_URL}/reservations`, reservation);
  return response.data;
};

export const updateReservation = async (id, data) => {
  const response = await axios.patch(`${API_URL}/reservations/${id}`, data);
  return response.data;
};

export const deleteReservation = async (id) => {
  return await axios.delete(`${API_URL}/reservations/${id}`);
};