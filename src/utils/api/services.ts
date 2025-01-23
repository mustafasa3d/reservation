import axios from "axios";

const API_URL = "http://localhost:3001/reservations";

export const fetchReservations = async (filter) => {
  try {
    // بناء query parameters بناءً على الفلتر
    const params = new URLSearchParams();

    if (filter.status) params.append("status", filter.status);
    if (filter.startDate) params.append("checkIn", filter.startDate);
    if (filter.endDate) params.append("checkOut", filter.endDate);
    if (filter.hotelName) params.append("hotel", filter.hotelName);
    if (filter.username) params.append("username", filter.userName);

    // إرسال الطلب مع query parameters
    const response = await axios.get(`${API_URL}?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch reservations:", error);
    throw error; // يمكنك التعامل مع الخطأ بشكل أفضل في الكود الذي يستدعي هذه الدالة
  }
};

/* export const fetchReservations = async (filter) => {
  const response = await axios.get(API_URL);
  return response.data;
}; */

export const createReservation = async (reservation: any) => {
  const response = await axios.post(API_URL, reservation);
  return response.data;
};

export const updateReservation = async (id: number, data: any) => {
  const response = await axios.patch(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteReservation = async (id: number) => {
  return await axios.delete(`${API_URL}/${id}`);
};


