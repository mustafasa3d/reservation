import { deleteReservation, updateReservation } from "../utils/api/services";

export const handleUpdateReservation = async (
  id: string,
  status: string,
  setReservations: (reservations: any[]) => void,
  setLoading: (loading: boolean) => void,
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
        status,
        message: message || null,
      });

      if (data?.status === "cancelled" || data?.status === "approved") {
        setReservations((prev) =>
          prev.map((reservation) =>
            reservation.id === id ? { ...reservation, status } : reservation
          )
        );
      }
    }
  } catch (error) {
    console.error("Failed to update reservation:", error);
  } finally {
    setLoading(false);
  }
};
