import { Reservation } from "@/types";
import { deleteReservation, updateReservation } from "../utils/api/services";

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
      const data = await deleteReservation(id);
      if (data?.id) {
        setReservations((prev) =>
          prev.filter((reservation) => reservation.id !== id)
        );
      }
    } else {
      const data = await updateReservation(id, {
        status: status,
        message: message || null,
      } as any);

      if (data?.status === "cancelled" || data?.status === "approved") {
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
