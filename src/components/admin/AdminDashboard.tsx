"use client";

import React, { useEffect, useState } from "react";
import { Reservation, selectOption } from "@/types";
import {
  fetchReservationsAdmin,
  handleUpdateReservation,
} from "../../utils/api/admin/services";
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

  const updateTempFilters = (name: string, value: string) => {
    setTempFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
    fetchHotels(setHotels);
    initializeFilters(searchParams, setTempFilters);
  }, []);

  useEffect(() => {
    fetchReservationsAdmin(searchParams, setReservations, setLoading);
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
