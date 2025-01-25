"use client";

import React, { useEffect, useState } from "react";
import { Reservation, selectOption } from "@/types";
import { fetchReservationsAdmin, handleUpdateReservation } from "../../utils/api/admin/services";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Filters from "./Filters";
import Table from "./Table";
import { fetchHotels } from "@/utils/api/commanService";
import { filterReservationsByDates } from "@/utils/filterReservations";
import { initializeFilters } from "@/utils/initializeFilters";

const defaultFilterValues = {
  status: "",
  startDate: "",
  endDate: "",
  hotelName: "",
  userName: "",
};

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [reservations, setReservations] = useState([] as Reservation[]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState<{
    id: string;
    target: string;
  } | null>(null);
  const [hotels, setHotels] = useState([] as selectOption[]);
  const [tempFilters, setTempFilters] = useState(defaultFilterValues);

  // تحديث الفلاتر المؤقتة
  const updateTempFilters = (name: string, value: string) => {
    setTempFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // تطبيق الفلاتر والبحث
  const handleSearch = () => {
    const params = new URLSearchParams();
    Object.entries(tempFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    router.replace(`${pathname}?${params.toString()}`);
  };

  const filteredReservations = filterReservationsByDates(
    reservations,
    searchParams.get("startDate"),
    searchParams.get("endDate")
  );

  const reset = () => {
    setTempFilters(defaultFilterValues);
    router.replace(pathname);
  };

  useEffect(() => {
    /* getHotelsData(); */
    fetchHotels(setHotels);
    initializeFilters(searchParams, setTempFilters);
  }, []);

  useEffect(() => {
    fetchReservationsAdmin(searchParams, setReservations, setLoading);
    /* fetchData(); */
  }, [searchParams]);

  return (
    <div className="container mx-auto">
      <Filters
        tempFilters={tempFilters}
        updateTempFilters={updateTempFilters}
        handleSearch={handleSearch}
        reset={reset}
        hotels={hotels}
      />

      <Table
        reservations={filteredReservations}
        loading={loading}
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        /* handleUpdateReservation={handleUpdateReservation} */
        handleUpdateReservation={(id, status, message) =>
          handleUpdateReservation(
            id,
            status,
            setReservations,
            setLoading,
            message
          )
        }
      />
    </div>
  );
};

export default AdminDashboard;








/* 
<div
          key={reservation.id}
          className="flex items-center justify-center flex-col p-4 mb-10 border border-red-500"
        >
          <div className="flex justify-end items-center w-full mb-3">
            {reservation?.status === "pending" && (
              <button
                className="px-4 py-2 bg-red-500 rounded-xl mr-auto"
                onClick={() => {
                  cancelReservation(
                    reservation.id,
                    setReservations,
                    setLoading
                  );
                }}
              >
                cancel
              </button>
            )}
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
        </div> */