import { Reservation } from "@/types";

const SingleReservationView = ({ reservation }: { reservation: Reservation }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-10 text-blue-600 ">Reservation Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-700 font-semibold">ID:</p>
            <p className="text-blue-600">{reservation?.id}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Hotel:</p>
            <p className="text-blue-600">{reservation?.hotel}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Username:</p>
            <p className="text-blue-600">{reservation?.username}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Check-In:</p>
            <p className="text-blue-600">{reservation?.checkIn}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Check-Out:</p>
            <p className="text-blue-600">{reservation?.checkOut}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Guests:</p>
            <p className="text-blue-600">{reservation?.guests}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Room Type:</p>
            <p className="text-blue-600">{reservation?.roomType}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Status:</p>
            <p className="text-blue-600">{reservation?.status}</p>
          </div>
          <div>
            <p className="text-gray-700 font-semibold">Message:</p>
            <p className="text-blue-600">{reservation?.message || "No message"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleReservationView;