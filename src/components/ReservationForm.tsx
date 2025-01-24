"use client";

import { Reservation, selectOption } from "@/types";
import { createReservation, fetchHotels } from "@/utils/api/services";
import { useEffect, useState } from "react";

import CustomInput from "./CustomInput";
import Loading from "./Loading";
import PopupModal from "./PopupModal";
import { useRouter } from "next/navigation";

const initFormData = {
  hotel: "",
  username: "",
  checkIn: "",
  checkOut: "",
  guests: 1,
  roomType: "Single",
};

const requiredFields = ["hotel", "username", "checkIn", "checkOut", "guests"];

const ReservationForm = () => {
  const [formData, setFormData] = useState(initFormData);
  const [error, setError] = useState("");
  const [hotels, setHotels] = useState([] as selectOption[]);
  const [loading, setLoading] = useState(false);
  const [reservations, setReservations] = useState([] as Reservation[]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchHotels(setHotels);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createReservation(
      /* @ts-ignore */
      formData,
      requiredFields,
      setReservations,
      setLoading,
      setError,
      setIsSuccess,
      setShowPopup,
      setPopupMessage
    );
  };

  if (loading) return <Loading />;

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg rounded-lg max-w-xl mx-auto"
    >
      <CustomInput
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        label="User Name"
        placeholder="User Name"
        required
      />
      <CustomInput
        type="select"
        name="hotel"
        value={formData.hotel}
        onChange={handleChange}
        label="Hotel"
        isReactSelect
        options={hotels}
      />
      <div className="mb-6 flex gap-4">
        <CustomInput
          type="date"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
          label="Check-In"
          required
        />
        <CustomInput
          type="date"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          label="Check-Out"
          required
        />
      </div>
      <CustomInput
        type="number"
        name="guests"
        value={formData.guests}
        onChange={handleChange}
        label="Number of Guests"
        required
      />
      <CustomInput
        type="select"
        name="roomType"
        value={formData.roomType}
        onChange={handleChange}
        label="Room Type"
        isReactSelect
        options={[
          { value: "Single", label: "Single" },
          { value: "Double", label: "Double" },
          { value: "Suite", label: "Suite" },
        ]}
      />

      {error && (
        <div className="mb-6 text-white bg-red-600 p-3 rounded-lg">{error}</div>
      )}

      <PopupModal
        showPopup={showPopup}
        popupMessage={popupMessage}
        isSuccess={isSuccess}
        onClose={() => setShowPopup(false)}
        onAction={() => {
          if (isSuccess) {
            router.push("/admin");
          }
          setShowPopup(false);
        }}
      />

      <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all">
        Submit
      </button>
    </form>
  );
};

export default ReservationForm;
