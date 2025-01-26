import {
  Reservation,
  ReservationForm,
  hotel,
  selectOption,
  userData,
  userLogin,
} from "@/types";

import Cookie from "js-cookie";
import axios from "./initAxios";

export const login = async (
  data: userLogin,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
  router: any
) => {
  setLoading(true);
  try {
    const { data: users } = await axios.get<userData[]>(`/login`);

    const user = users?.find(
      (u) => u.username === data.username && u.password === data.password
    );

    if (user) {
      Cookie.set("token", user.token);
      Cookie.set("role", user.role);
      Cookie.set("username", user.username);

      if (user.role === "admin") {
        router.push("/admin");
      } else {
        console.log("hreeeeeeeee", user);
        router.push("/user");
      }
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
  /* @ts-ignore */
  const missingFields = requiredFields.filter((field) => !formData[field]);

  if (missingFields.length > 0) {
    setError("Please fill in all the required fields");
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const checkInDate = new Date(formData.checkIn);
  const checkOutDate = new Date(formData.checkOut);

  if (checkInDate < today) {
    setError("Cannot book a date in the past");
    return;
  }

  if (checkOutDate <= checkInDate) {
    setError("Check-out date must be after check-in date");
    return;
  }

  setLoading(true);
  try {
    /* @ts-ignore */
    formData.status = "pending";
    const newReservation = await axios.post(`/reservations`, formData);

    if (newReservation?.data) {
      setReservations(
        (prev: Reservation[]) =>
          [newReservation?.data, ...prev] as Reservation[]
      );
    }

    setPopupMessage("Reservation created successfully!");
    setIsSuccess(true);
    setShowPopup(true);
  } catch (err) {
    setPopupMessage("An error occurred while booking. Please try again.");
    setIsSuccess(false);
    setShowPopup(true);
  } finally {
    setLoading(false);
  }
};

export const fetchHotels = async (
  setHotels: React.Dispatch<React.SetStateAction<selectOption[]>>
) => {
  try {
    const response = await axios.get(`/hotels`);
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

export const logout = (router: any) => {
  Cookie.remove("token");
  Cookie.remove("role");
  Cookie.remove("username");
  router.push("/");
};

/* -------------------------------------------------------------------------------------------- */

export const getSingleData = async (endPoint: string) => {
  try {
    const response = await axios.get(`/${endPoint}`);
    return response?.data;
  } catch (error) {
    console.error("Failed to fetch reservations:", error);
  }
};
