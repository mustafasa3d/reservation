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

export const fetchReservationsAdmin = async (
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
      `/reservations?${params.toString()}`
    );
    setReservations(response.data);
  } catch (error) {
    console.error("Failed to fetch reservations:", error);
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
      const data = await axios.delete(`/reservations/${id}`);
      if (data?.data?.id) {
        setReservations((prev) =>
          prev.filter((reservation) => reservation.id !== id)
        );
      }
    } else {
      /* if (status === 'cancelled' || status === 'approved') */
      const DataToUpdate = { status: status, message: message || null };

      const data = await axios.patch(
        `/reservations/${id}`,
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


/* -------------------------------------------------------------------------------------------- */

