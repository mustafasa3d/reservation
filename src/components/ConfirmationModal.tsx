"use client";

import { useState } from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (message?: string) => void;
  target: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  target,
}) => {
  if (!isOpen) return null;

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const isCancelled = target === "cancelled";

  const onSubmit = () => {
    if (isCancelled) {
      message.trim().length > 5
        ? onConfirm(message)
        : setError("Message too short");
    } else {
      onConfirm();
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          {target === "approved"
            ? "Approve Reservation"
            : target === "cancelled"
            ? "Cancel Reservation"
            : "Delete Reservation"}
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Are you sure you want to <span className="font-bold">{target}</span>{" "}
          this reservation?
        </p>

        {isCancelled && (
          <div className="my-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-700"
            />
            {error && <p className="text-red-500">{error}</p>}
          </div>
        )}
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600 transition-all shadow-md"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-all shadow-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
