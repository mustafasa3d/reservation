"use client";

import {
  deleteReservation,
  fetchReservations,
  updateReservation,
} from "../utils/api/services";
import { useEffect, useState } from "react";

import Link from "next/link";
import useAuth from "@/utils/hooks/UseAuth";

const AdminDashboard = () => {
  useAuth("admin");

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(null);

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

  const handleUpdateReservation = async (id: number, status: string) => {
    setLoading(true);
    try {
      if (status === "deleted") {
        const data = await deleteReservation(id);
        if (data.statusText === "OK") {
          setReservations((prev) =>
            prev.filter((reservation) => reservation.id !== id)
          );
        }
        /* const updatedReservation = await updateReservation(id, { status }); */
      } else {
        const data = await updateReservation(id, { status });
        console.log("firstssssss", data);
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
      <div className="mb-6 flex justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <Link
          href="/admin/reservations"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          + Add Reservation
        </Link>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : reservations.length > 0 ? (
        <table className="min-w-full bg-gray-700 shadow-md rounded text-center">
          <thead>
            <tr className="bg-red-500">
              <th className="py-2 px-4">Reservation ID</th>
              <th className="py-2 px-4">User</th>
              <th className="py-2 px-4">Hotel</th>
              <th className="py-2 px-4">Dates</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation: any) => (
              <tr key={reservation.id}>
                <td className="py-2 px-4">{reservation.id}</td>
                <td className="py-2 px-4">{reservation.username}</td>
                <td className="py-2 px-4">{reservation.hotel}</td>
                <td className="py-2 px-4">
                  {reservation.checkIn} - {reservation.checkOut}
                </td>
                <td className="py-2 px-4">
                  <span
                    className={`border ${
                      reservation.status === "cancelled"
                        ? "border-red-500"
                        : reservation.status === "approved"
                        ? "border-green-500"
                        : "border-yellow-500"
                    } p-2 rounded-lg`}
                  >
                    {reservation.status}
                  </span>
                </td>
                <td className="py-2 px-4">
                  <div>
                    {reservation.status === "pending" && (
                      <button
                        onClick={() => {
                          setModalOpen({
                            id: reservation.id,
                            target: "approved",
                          });
                          /* handleUpdateReservation(reservation.id, "approved"); */
                        }}
                        className="bg-green-500 text-white py-1 px-3 rounded mr-2"
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
                          /* handleUpdateReservation(reservation.id, "cancelled"); */
                        }}
                        className="bg-red-500 text-white py-1 px-3 rounded"
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
                          /* handleUpdateReservation(reservation.id, "deleted"); */
                        }}
                        className="bg-red-500 text-white py-1 px-3 rounded"
                      >
                        deleted
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reservations found.</p>
      )}

      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4 !text-black text-center">
              {modalOpen === "cancelled"
                ? "Approve Reservation"
                : "Cancel Reservation"}
            </h2>
            <p className="mb-4 !text-black">
              Are you sure you want to <span className="font-bold">{modalOpen?.target}</span> {" "}
              {modalOpen === "cancelled" ? "approve" : "cancel"} this
              reservation?
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => setModalOpen(null)}
                className="bg-gray-500 text-white py-2 px-4 mr-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleUpdateReservation(
                    modalOpen.id,
                    modalOpen.target 
                  );
                  setModalOpen(null);
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                {modalOpen?.target}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
