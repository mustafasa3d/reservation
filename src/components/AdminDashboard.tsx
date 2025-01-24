"use client";

import {
  deleteReservation,
  fetchHotels,
  fetchReservations,
  updateReservation,
} from "../utils/api/services";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";
import Select from "react-select";
import useAuth from "@/utils/hooks/UseAuth";

const AdminDashboard = () => {
  useAuth("admin");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(null);
  const [hotels, setHotels] = useState([]);
  const [tempFilters, setTempFilters] = useState({
    status: "",
    startDate: "",
    endDate: "",
    hotelName: "",
    userName: "",
  });

  // جلب بيانات الفنادق
  async function getHotelsData() {
    const data = await fetchHotels();
    const allHotels = data?.map((hotel) => ({
      value: hotel.name,
      label: hotel.name,
    }));
    setHotels([{ value: "", label: "All Hotels" }, ...allHotels]);
  }

  // جلب بيانات الحجوزات
  const fetchData = async () => {
    console.log("fetchData");
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
  const updateTempFilters = (name, value) => {
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

  const handleUpdateReservation = async (id, status) => {
    setLoading(true);
    try {
      if (status === "deleted") {
        const data = await deleteReservation(id);
        if (data.statusText === "OK") {
          setReservations((prev) =>
            prev.filter((reservation) => reservation.id !== id)
          );
        }
      } else {
        const data = await updateReservation(id, { status });
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
    getHotelsData();
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

  // ... باقي الدوال بدون تغيير (handleUpdateReservation)

  return (
    <div className="container mx-auto py-8">
      {/* ... باقي العناصر بدون تغيير حتى قسم الفلاتر */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <Link
          href="/admin/reservations"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-md"
        >
          + Add Reservation
        </Link>
      </div>

      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            options={[
              { value: "", label: "All Statuses" },
              {
                value: "pending",
                label: "Pending",
              },
              {
                value: "approved",
                label: "Approved",
              },
              {
                value: "cancelled",
                label: "Cancelled",
              },
            ]}
            value={
              tempFilters.status
                ? { value: tempFilters.status, label: tempFilters.status }
                : null
            }
            onChange={(selectedOption) =>
              updateTempFilters("status", selectedOption?.value)
            }
            placeholder="Select Status"
            className="react-select-container text-black"
            classNamePrefix="react-select"
          />

          <input
            type="date"
            name="startDate"
            value={tempFilters.startDate}
            onChange={(e) => updateTempFilters("startDate", e.target.value)}
            className="p-2 border rounded-lg text-black"
          />

          <input
            type="date"
            name="endDate"
            value={tempFilters.endDate}
            onChange={(e) => updateTempFilters("endDate", e.target.value)}
            className="p-2 border rounded-lg text-black"
          />

          <Select
            options={hotels}
            value={
              tempFilters.hotelName
                ? { value: tempFilters.hotelName, label: tempFilters.hotelName }
                : null
            }
            onChange={(selectedOption) =>
              updateTempFilters("hotelName", selectedOption?.value)
            }
            placeholder="Select Hotel"
            className="react-select-container text-black"
            classNamePrefix="react-select"
          />

          <input
            type="text"
            name="userName"
            value={tempFilters.userName}
            onChange={(e) => updateTempFilters("userName", e.target.value)}
            placeholder="User Name"
            className="p-2 border rounded-lg text-black"
          />

          <button
            type="submit"
            onClick={handleSearch}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all shadow-md"
          >
            Search
          </button>
          <button
            type="button"
            onClick={reset}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all shadow-md"
          >
            Reset
          </button>
        </div>
      </div>

      {/* ... باقي الكود بدون تغيير */}
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : reservations.length > 0 ? (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left font-semibold">
                  Reservation ID
                </th>
                <th className="py-3 px-6 text-left font-semibold">User</th>
                <th className="py-3 px-6 text-left font-semibold">Hotel</th>
                <th className="py-3 px-6 text-left font-semibold">Dates</th>
                <th className="py-3 px-6 text-left font-semibold">Status</th>
                <th className="py-3 px-6 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {reservations.map((reservation) => (
                <tr
                  key={reservation.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-all"
                >
                  <td className="py-4 px-6">{reservation.id}</td>
                  <td className="py-4 px-6">{reservation.username}</td>
                  <td className="py-4 px-6">{reservation.hotel}</td>
                  <td className="py-4 px-6">
                    {reservation.checkIn} - {reservation.checkOut}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block py-1 px-3 rounded-full text-sm font-semibold ${
                        reservation.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : reservation.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {reservation.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      {reservation.status === "pending" && (
                        <button
                          onClick={() => {
                            setModalOpen({
                              id: reservation.id,
                              target: "approved",
                            });
                          }}
                          className="bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-600 transition-all shadow-md"
                        >
                          Approve
                        </button>
                      )}
                      {reservation.status === "pending" && (
                        <button
                          onClick={() => {
                            setModalOpen({
                              id: reservation.id,
                              target: "cancelled",
                            });
                          }}
                          className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition-all shadow-md"
                        >
                          Cancel
                        </button>
                      )}
                      {reservation.status !== "pending" && (
                        <button
                          onClick={() => {
                            setModalOpen({
                              id: reservation.id,
                              target: "deleted",
                            });
                          }}
                          className="bg-gray-500 text-white py-1 px-4 rounded-lg hover:bg-gray-600 transition-all shadow-md"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No reservations found.</p>
      )}

      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              {modalOpen.target === "approved"
                ? "Approve Reservation"
                : modalOpen.target === "cancelled"
                ? "Cancel Reservation"
                : "Delete Reservation"}
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Are you sure you want to{" "}
              <span className="font-bold">{modalOpen.target}</span> this
              reservation?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setModalOpen(null)}
                className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-all shadow-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleUpdateReservation(modalOpen.id, modalOpen.target);
                  setModalOpen(null);
                }}
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all shadow-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

/* 

"use client";

import {
  deleteReservation,
  fetchHotels,
  fetchReservations,
  updateReservation,
} from "../utils/api/services";
import { useEffect, useState } from "react";

import Link from "next/link";
import Select from "react-select"; // استيراد react-select
import useAuth from "@/utils/hooks/UseAuth";

const AdminDashboard = () => {
  useAuth("admin");

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(null);
  const [filters, setFilters] = useState({
    status: "",
    startDate: "",
    endDate: "",
    hotelName: "",
    userName: "",
  });
  const [hotels, setHotels] = useState([]); // حالة لتخزين قائمة الفنادق

  async function getHotelsData() {
    const data = await fetchHotels();
    setHotels(data?.map((hotel) => ({ value: hotel.name, label: hotel.name })));
    console.log("aaaaaaaaaaaaa", data);
  }

  useEffect(() => {
    getHotelsData();
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await fetchReservations(filters);
      setReservations(data);
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const handleUpdateReservation = async (id, status) => {
    setLoading(true);
    try {
      if (status === "deleted") {
        const data = await deleteReservation(id);
        if (data.statusText === "OK") {
          setReservations((prev) =>
            prev.filter((reservation) => reservation.id !== id)
          );
        }
      } else {
        const data = await updateReservation(id, { status });
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

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <Link
          href="/admin/reservations"
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-md"
        >
          + Add Reservation
        </Link>
      </div>

      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <select
            name="status"
            value={filters.status}
            onChange={(e) => handleFilterChange("status", e.target.value)}
            placeholder="Status"
            className="p-2 border rounded-lg text-black"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={(e) => handleFilterChange("startDate", e.target.value)}
            placeholder="Start Date"
            className="p-2 border rounded-lg text-black"
          />
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={(e) => handleFilterChange("endDate", e.target.value)}
            placeholder="End Date"
            className="p-2 border rounded-lg text-black"
          />
          <Select
            options={hotels}
            value={{ value: filters.hotelName, label: filters.hotelName }}
            onChange={(selectedOption) =>
              handleFilterChange("hotelName", selectedOption.value)
            }
            placeholder="Select Hotel"
            className="react-select-container text-black"
            classNamePrefix="react-select"
          />
          <input
            type="text"
            name="userName"
            value={filters.userName}
            onChange={(e) => handleFilterChange("userName", e.target.value)}
            placeholder="User Name"
            className="p-2 border rounded-lg text-black"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all shadow-md"
          >
            Search
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : reservations.length > 0 ? (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left font-semibold">
                  Reservation ID
                </th>
                <th className="py-3 px-6 text-left font-semibold">User</th>
                <th className="py-3 px-6 text-left font-semibold">Hotel</th>
                <th className="py-3 px-6 text-left font-semibold">Dates</th>
                <th className="py-3 px-6 text-left font-semibold">Status</th>
                <th className="py-3 px-6 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {reservations.map((reservation) => (
                <tr
                  key={reservation.id}
                  className="border-b border-gray-200 hover:bg-gray-50 transition-all"
                >
                  <td className="py-4 px-6">{reservation.id}</td>
                  <td className="py-4 px-6">{reservation.username}</td>
                  <td className="py-4 px-6">{reservation.hotel}</td>
                  <td className="py-4 px-6">
                    {reservation.checkIn} - {reservation.checkOut}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block py-1 px-3 rounded-full text-sm font-semibold ${
                        reservation.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : reservation.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {reservation.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      {reservation.status === "pending" && (
                        <button
                          onClick={() => {
                            setModalOpen({
                              id: reservation.id,
                              target: "approved",
                            });
                          }}
                          className="bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-600 transition-all shadow-md"
                        >
                          Approve
                        </button>
                      )}
                      {reservation.status === "pending" && (
                        <button
                          onClick={() => {
                            setModalOpen({
                              id: reservation.id,
                              target: "cancelled",
                            });
                          }}
                          className="bg-red-500 text-white py-1 px-4 rounded-lg hover:bg-red-600 transition-all shadow-md"
                        >
                          Cancel
                        </button>
                      )}
                      {reservation.status !== "pending" && (
                        <button
                          onClick={() => {
                            setModalOpen({
                              id: reservation.id,
                              target: "deleted",
                            });
                          }}
                          className="bg-gray-500 text-white py-1 px-4 rounded-lg hover:bg-gray-600 transition-all shadow-md"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No reservations found.</p>
      )}

      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              {modalOpen.target === "approved"
                ? "Approve Reservation"
                : modalOpen.target === "cancelled"
                ? "Cancel Reservation"
                : "Delete Reservation"}
            </h2>
            <p className="text-gray-600 mb-6 text-center">
              Are you sure you want to{" "}
              <span className="font-bold">{modalOpen.target}</span> this
              reservation?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setModalOpen(null)}
                className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-all shadow-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleUpdateReservation(modalOpen.id, modalOpen.target);
                  setModalOpen(null);
                }}
                className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all shadow-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
 */
