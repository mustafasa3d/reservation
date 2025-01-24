import {
  Reservation,
  ReservationForm,
  hotel,
  selectOption,
  userData,
  userLogin,
} from "@/types";

import axios from "axios";

const API_URL = "http://localhost:3001";

/* init axios and add token for all requests */
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchReservations = async (
  searchParamsData: URLSearchParams,
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    const searchParams = Object.fromEntries(searchParamsData.entries());

    /* create query parameters */
    const params = new URLSearchParams();

    if (searchParams?.status) params.append("status", searchParams.status);
    if (searchParams?.hotelName) params.append("hotel", searchParams.hotelName);
    if (searchParams?.userName)
      params.append("username", searchParams.userName);
    /* if (filter?.startDate) params.append("checkIn", filter.startDate); */
    /* if (filter?.endDate) params.append("checkOut", filter.endDate); */

    const response = await axios.get(
      `${API_URL}/reservations?${params.toString()}`
    );
    setReservations(response.data);
  } catch (error) {
    console.error("Failed to fetch reservations:", error);
  } finally {
    setLoading(false);
  }
};

export const fetchHotels = async (
  setHotels: React.Dispatch<React.SetStateAction<selectOption[]>>
) => {
  try {
    const response = await axios.get(`${API_URL}/hotels`);
    if (response?.data) {
      const allHotels = response?.data.map((hotel: hotel) => ({
        value: hotel.name,
        label: hotel.name,
      }));
      setHotels([{ value: "", label: "All Hotels" }, ...allHotels]);
    }
  } catch (error) {
    console.error("Failed to fetch reservations:", error);
  }
};

export const login = async (
  data: userLogin,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  router: any
) => {
  setLoading(true);
  try {
    const { data: users } = await axios.get<userData[]>(`${API_URL}/login`);

    const user = users?.find(
      (u) => u.username === data.username && u.password === data.password
    );

    if (user) {
      localStorage.setItem("token", user.token);
      localStorage.setItem("role", user.role);

      if (user.role === "admin") router.push("/admin");
      if (user.role === "user") router.push("/user");
    } else {
      setError("Invalid username or password");
      console.error("Error in login response: ?");
      return null;
    }
  } catch (error) {
    setError("Failed Login");
    console.error("Failed Login:", error);
    throw error;
  } finally {
    setLoading(false);
  }
};

/* (approve | cancel | delete) reservation */
export const handleUpdateReservation = async (
  id: string,
  status: string,
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  message?: string
) => {
  setLoading(true);
  try {
    if (status === "deleted") {
      /* if (status === 'deleted') */
      const data = await axios.delete(`${API_URL}/reservations/${id}`);
      if (data?.data?.id) {
        setReservations((prev) =>
          prev.filter((reservation) => reservation.id !== id)
        );
      }
    } else {
      /* if (status === 'cancelled' || status === 'approved') */
      const DataToUpdate = { status: status, message: message || null };

      const data = await axios.patch(
        `${API_URL}/reservations/${id}`,
        DataToUpdate
      );

      if (
        data?.data?.status === "cancelled" ||
        data?.data?.status === "approved"
      ) {
        setReservations(
          (prev) =>
            prev.map((reservation) =>
              reservation.id === id
                ? { ...reservation, status: status }
                : reservation
            ) as Reservation[]
        );
      }
    }
  } catch (error) {
    console.error("Failed to update reservation:", error);
  } finally {
    setLoading(false);
  }
};

/* (create) reservation */
/* Reservation */
export const createReservation = async (
  formData: ReservationForm,
  requiredFields: string[],
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>,
  setShowPopup: React.Dispatch<React.SetStateAction<boolean>>,
  setPopupMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  const missingFields = requiredFields.filter((field) => !formData[field]);

  if (missingFields.length > 0) {
    setError("يرجى ملء جميع الحقول المطلوبة");
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const checkInDate = new Date(formData.checkIn);
  const checkOutDate = new Date(formData.checkOut);

  if (checkInDate < today) {
    setError("لا يمكن حجز تاريخ في الماضي");
    return;
  }

  if (checkOutDate <= checkInDate) {
    setError("يجب أن يكون تاريخ المغادرة بعد تاريخ الوصول");
    return;
  }

  try {
    /* @ts-ignore */
    formData.status = "pending";
    const newReservation = await axios.post(
      `${API_URL}/reservations`,
      formData
    );

    if (newReservation?.data) {
      setReservations(
        (prev: Reservation[]) =>
          [newReservation?.data, ...prev] as Reservation[]
      );
    }

    setPopupMessage("تم الحجز بنجاح!");
    setIsSuccess(true);
    setShowPopup(true);
  } catch (err) {
    setPopupMessage("حدث خطأ أثناء الحجز. يرجى المحاولة مرة أخرى.");
    setIsSuccess(false);
    setShowPopup(true);
  } finally {
    setLoading(false);
  }
};
