"use client";

import React, { useEffect, useState } from "react";
import {
  cancelReservation,
  fetchReservationsUser,
} from "@/utils/api/user/services";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Cookie from "js-cookie";
import Link from "next/link";
import Loading from "../Loading";
import { Reservation } from "@/types";
import { logout } from "@/utils/api/commanService";

const UserReservations: React.FC = () => {
  const username = Cookie.get("username");
  const router = useRouter();
  const pathname = usePathname();

  const [reservations, setReservations] = useState([] as Reservation[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (username) {
      /* @ts-ignore */
      fetchReservationsUser(username, setReservations, setLoading);
    } else {
      logout(router);
    }
  }, []);

  if (loading) return <Loading />;

  if (reservations.length === 0) {
    return (
      <div className="flex justify-center items-center h-[200px] w-full">
        <h1 className="text-4xl font-bold">No Reservations</h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {reservations?.map((reservation) => (
        <div key={reservation.id} className="border p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            {reservation?.status === "pending" && (
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-800 duration-300 text-white rounded"
                onClick={() =>
                  cancelReservation(reservation.id, setReservations, setLoading)
                }
              >
                Cancel
              </button>
            )}
            <Link
              href={`/user/reservations/${reservation.id}`}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-800 duration-300 text-white rounded"
            >
              See More
            </Link>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">ID:</span>
              <span>{reservation.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Check-In:</span>
              <span>{reservation.checkIn}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Check-Out:</span>
              <span>{reservation.checkOut}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Guests:</span>
              <span>{reservation.guests}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Hotel:</span>
              <span>{reservation.hotel}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Status:</span>
              <span>{reservation.status}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Room Type:</span>
              <span>{reservation.roomType}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserReservations;
