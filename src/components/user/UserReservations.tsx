"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Cookie from "js-cookie";
import Link from "next/link";
import Loading from "../Loading";
import { Reservation } from "@/types";
import { fetchReservationsUser } from "@/utils/api/user/services";
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {reservations?.map((reservation) => (
        <div
          key={reservation.id}
          className="flex items-center justify-center flex-col p-4 mb-10 border border-red-500"
        >
          <div className="flex justify-end items-center w-full mb-3">
            <Link
              className="px-4 py-2 bg-red-300 rounded-xl"
              href={`/user/reservations/${reservation.id}`}
            >
              see more
            </Link>
          </div>
          <div className="flex justify-between items-center w-full [&>span]:w-full [&>span]:text-left">
            <span>id: </span>
            <span>{reservation.id}</span>
          </div>
          <div className="flex justify-between items-center w-full [&>span]:w-full [&>span]:text-left">
            <span>checkIn: </span>
            <span>{reservation.checkIn}</span>
          </div>
          <div className="flex justify-between items-center w-full [&>span]:w-full [&>span]:text-left">
            <span>checkOut: </span>
            <span>{reservation.checkOut}</span>
          </div>
          <div className="flex justify-between items-center w-full [&>span]:w-full [&>span]:text-left">
            <span>guests: </span>
            <span>{reservation.guests}</span>
          </div>
          <div className="flex justify-between items-center w-full [&>span]:w-full [&>span]:text-left">
            <span>hotel: </span>
            <span>{reservation.hotel}</span>
          </div>
          <div className="flex justify-between items-center w-full [&>span]:w-full [&>span]:text-left">
            <span>status: </span>
            <span>{reservation.status}</span>
          </div>
          <div className="flex justify-between items-center w-full [&>span]:w-full [&>span]:text-left">
            <span>roomType: </span>
            <span>{reservation.roomType}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserReservations;
