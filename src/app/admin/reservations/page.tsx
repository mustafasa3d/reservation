"use client";

import {
  createReservation,
  deleteReservation,
  fetchReservations,
} from "../../../utils/api/services";
import { useEffect, useState } from "react";

import ReservationForm from "@/components/ReservationForm";
import useAuth from "@/utils/hooks/UseAuth";

const Reservations = () => {
  useAuth("admin");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getReservations = async () => {
      setLoading(true);
      try {
        const data = await fetchReservations();
        setReservations(data);
      } catch (error) {
        console.error("Failed to fetch reservations:", error);
      } finally {
        setLoading(false);
      }
    };

    getReservations();
  }, []);

  const handleCreateReservation = async (reservationData: any) => {
    reservationData.status = "pending";
    setLoading(true);
    try {
      const newReservation = await createReservation(reservationData);
      setReservations((prev) => [newReservation, ...prev]);
    } catch (error) {
      console.error("Failed to create reservation:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReservation = async (id: number) => {
    setLoading(true);
    try {
      const data = await deleteReservation(id);
      if (data.statusText === "OK") {
        setReservations((prev) =>
          prev.filter((reservation) => reservation.id !== id)
        );
      }
    } catch (error) {
      console.error("Failed to cancel reservation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Reservations</h1>
      <ReservationForm onSubmit={handleCreateReservation} />
       <div className="mt-8">
        {loading ? (
          <p>Loading...</p>
        ) : reservations.length > 0 ? (
          <ul className="space-y-4">
            {reservations?.map((reservation: any) => (
              <li
                key={reservation.id}
                className="p-4 bg-red-500/50 shadow-md rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-bold">{reservation.hotel}</p>
                  <p>
                    {reservation.checkIn} - {reservation.checkOut}
                  </p>
                  <p>Status: {reservation.status}</p>
                </div>
                {reservation.status === "pending" && (
                  <button
                    onClick={() => handleCancelReservation(reservation.id)}
                    className="bg-red-500 text-white py-1 px-3 rounded"
                  >
                    Cancel
                  </button>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No reservations found.</p>
        )}
      </div>
    </div>
  );
};

export default Reservations;
