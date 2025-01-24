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
    const response = await axios.get(
      `${API_URL}/reservations?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch reservations:", error);
    throw error; // يمكنك التعامل مع الخطأ بشكل أفضل في الكود الذي يستدعي هذه الدالة
  }
};

export const fetchHotels = async (setHotels) => {
  try {
    // إرسال الطلب مع query parameters
    const response = await axios.get(`${API_URL}/hotels`);
    if (response?.data) {
      const allHotels = response?.data.map((hotel) => ({
        value: hotel.name,
        label: hotel.name,
      }));
      setHotels([{ value: "", label: "All Hotels" }, ...allHotels]);
    }
  } catch (error) {
    console.error("Failed to fetch reservations:", error);
    throw error; // يمكنك التعامل مع الخطأ بشكل أفضل في الكود الذي يستدعي هذه الدالة
  }
};

export const createReservation = async (reservation) => {
  try {
    const response = await axios.post(`${API_URL}/reservations`, reservation);
    return response.data;
  } catch (error) {
    console.error("Failed to create reservation:", error);
    throw error; // يمكنك التعامل مع الخطأ بشكل أفضل في الكود الذي يستدعي هذه الدالة
  }
};

export const updateReservation = async (id, data) => {
  try {
    const response = await axios.patch(`${API_URL}/reservations/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Failed to update reservation:", error);
    throw error; // يمكنك التعامل مع الخطأ بشكل أفضل في الكود الذي يستدعي هذه الدالة
  }
};

export const deleteReservation = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/reservations/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete reservation:", error);
    throw error; // يمكنك التعامل مع الخطأ بشكل أفضل في الكود الذي يستدعي هذه الدالة
  }
};

export const login = async (data) => {
  /* setLoading(true); */
  try {
    const { data: users } = await axios.get(`${API_URL}/login`);

    const user = users?.find(
      (u) => u.username === data.username && u.password === data.password
    );

    if (user) {
      localStorage.setItem("token", user.token);
      localStorage.setItem("role", user.role);
      return user;
    } else {
      console.error("Error in login response: ?");
      return null;
      /*  setError('Invalid username or password'); */
    }
  } catch (error) {
    console.error("Failed to fetch reservations:", error);
    throw error;
  }
};
