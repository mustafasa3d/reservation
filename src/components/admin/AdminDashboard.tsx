"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Select from "react-select";
import Filters from "./Filters";
import Table from "./Table";
import {
  deleteReservation,
  fetchHotels,
  fetchReservations,
  updateReservation,
} from "../../utils/api/services";
import { filterReservationsByDates } from "@/utils/filterReservations";
import { handleUpdateReservation } from "@/utils/handleReservationActions";

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState<{
    id: string;
    target: string;
  } | null>(null);
  const [hotels, setHotels] = useState([]);
  const [tempFilters, setTempFilters] = useState({
    status: "",
    startDate: "",
    endDate: "",
    hotelName: "",
    userName: "",
  });

  // جلب بيانات الفنادق
  /* async function getHotelsData() {
    const data = await fetchHotels();
    const allHotels = data?.map((hotel) => ({
      value: hotel.name,
      label: hotel.name,
    }));
    setHotels([{ value: "", label: "All Hotels" }, ...allHotels]);
  } */

  // جلب بيانات الحجوزات
  const fetchData = async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(searchParams.entries());
      const data = await fetchReservations(params);
      setReservations(data);
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
    } finally {
      setLoading(false);
    }
  };

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
    setTempFilters({
      status: "",
      startDate: "",
      endDate: "",
      hotelName: "",
      userName: "",
    });
    router.replace(pathname);
  };

  useEffect(() => {
    /* getHotelsData(); */
    fetchHotels(setHotels);
    // تهيئة الفلاتر المؤقتة من الـ URL الموجود
    const initialFilters = {
      status: searchParams.get("status") || "",
      startDate: searchParams.get("startDate") || "",
      endDate: searchParams.get("endDate") || "",
      hotelName: searchParams.get("hotelName") || "",
      userName: searchParams.get("userName") || "",
    };
    setTempFilters(initialFilters);
  }, []);

  useEffect(() => {
    fetchData();
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
