import {
  Reservation,
  ReservationForm,
  hotel,
  selectOption,
  userData,
  userLogin,
} from "@/types";

import Cookie from "js-cookie";
import axios from "../initAxios";
import { logout } from "../commanService";

export const fetchReservationsUser = async (
  username: "string",
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  
) => {
  try {
    setLoading(true);
    const response = await axios.get(`/reservations?username=${username}`);
    setReservations(response.data);
  } catch (error) {
    console.error("Failed to fetch reservations:", error);
  } finally {
    setLoading(false);
  }
};

/* -------------------------------------------------------------------------------------------- */
