import { Reservation } from "@/types";
import axios from "../initAxios";

export const fetchReservationsUser = async (
  username: "string",
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
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

/* ( cancel only ) reservation */
export const cancelReservation = async (
  id: string,
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoading(true);
  try {
    const data = await axios.delete(`/reservations/${id}`);
    if (data?.data?.id) {
      setReservations((prev) =>
        prev.filter((reservation) => reservation.id !== id)
      );
    }
  } catch (error) {
    console.error("Failed to update reservation:", error);
  } finally {
    setLoading(false);
  }
};

/* -------------------------------------------------------------------------------------------- */
