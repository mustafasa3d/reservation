"use client";

import {
  createReservation,
  deleteReservation,
  fetchReservations,
} from "../../../utils/api/services";
import { useEffect, useState } from "react";

import Link from "next/link";
import ReservationForm from "@/components/ReservationForm";
import useAuth from "@/utils/hooks/UseAuth";

const Reservations = () => {
  useAuth("admin");
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log(reservations);
  console.log(loading);

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

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">Reservations</h1>
        <Link
          href="/admin"
          className="bg-blue-500/20 text-white py-2 px-4 rounded"
        >
          See All Reservation
        </Link>
      </div>
      <ReservationForm onSubmit={handleCreateReservation} />
    </div>
  );
};

export default Reservations;
