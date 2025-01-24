// components/Popup.tsx

import React from "react";

interface PopupProps {
  showPopup: boolean;
  popupMessage: string;
  isSuccess: boolean;
  onClose: () => void;
  onAction?: () => void;
}

const PopupModal: React.FC<PopupProps> = ({
  showPopup,
  popupMessage,
  isSuccess,
  onClose,
  onAction,
}) => {
  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg min-w-[450px]">
        <p className="mb-4 text-black text-xl text-center">{popupMessage}</p>
        <div className="flex justify-end">
          {isSuccess ? (
            <div className="flex justify-center items-center w-full gap-2">
              <button
                onClick={onAction}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
              >
                See All Reservations
              </button>
              <button
                onClick={onClose}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg w-full"
              >
                OK
              </button>
            </div>
          ) : (
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
            >
              موافق
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupModal;