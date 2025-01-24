"use client";

import { Reservation, selectOption } from "@/types";
import { createReservation, fetchHotels } from "@/utils/api/services";
import { useEffect, useState } from "react";

import Loading from "./Loading";
import Select from "react-select";

const initFormData = {
  hotel: "",
  username: "",
  checkIn: "",
  checkOut: "",
  guests: 1,
  roomType: "Single",
};

/* required fields */
const requiredFields = ["hotel", "username", "checkIn", "checkOut", "guests"];

const ReservationForm = () => {
  const [formData, setFormData] = useState(initFormData);
  const [error, setError] = useState("");
  const [hotels, setHotels] = useState([] as selectOption[]); // حالة لتخزين قائمة الفنادق
  const [reservations, setReservations] = useState([] as Reservation[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchHotels(setHotels);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    /* @ts-ignore */
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setError("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);

    if (checkInDate < today) {
      setError("لا يمكن حجز تاريخ في الماضي");
      return;
    }

    if (checkOutDate <= checkInDate) {
      setError("يجب أن يكون تاريخ المغادرة بعد تاريخ الوصول");
      return;
    }

    // تنفيذ onSubmit فقط بعد التحقق الكامل
    /* @ts-ignore */
    formData.status = "pending";
    /* @ts-ignore */
    createReservation(formData, setReservations, setLoading);
  };

  const handleFilterChange = (item: any) => {
    setFormData({ ...formData, hotel: item.value });
  };

  if (loading) return <Loading />;

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg rounded-lg max-w-xl mx-auto"
    >
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          User Name
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-blue-900"
          placeholder="User Name"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">Hotel</label>
        <Select
          options={hotels}
          value={
            formData.hotel
              ? { value: formData.hotel, label: formData.hotel }
              : null
          }
          onChange={(selectedOption) => handleFilterChange(selectedOption)}
          placeholder="Select Hotel"
          className="react-select-container text-black"
          classNamePrefix="react-select"
        />
      </div>
      <div className="mb-6 flex gap-4">
        <div className="w-full">
          <label className="block text-gray-700 font-semibold mb-2">
            Check-In
          </label>
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-blue-900"
            placeholder="Check-In"
            required
          />
        </div>
        <div className="w-full">
          <label className="block text-gray-700 font-semibold mb-2">
            Check-Out
          </label>
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-blue-900"
            placeholder="Check-Out"
            required
          />
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Number of Guests
        </label>
        <input
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-blue-900"
          placeholder="Number of Guests"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 font-semibold mb-2">
          Room Type
        </label>
        <select
          title="Room Type"
          name="roomType"
          value={formData.roomType}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-blue-900"
        >
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Suite">Suite</option>
        </select>
      </div>

      {error && (
        <div className="mb-6 text-white bg-red-600 p-3 rounded-lg">{error}</div>
      )}

      <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all">
        Submit
      </button>
    </form>
  );
};

export default ReservationForm;
