import ConfirmationModal from "../ConfirmationModal";
import Loading from "../Loading";

interface Reservation {
  id: string;
  username: string;
  hotel: string;
  checkIn: string;
  checkOut: string;
  status: string;
}

interface TableProps {
  reservations: Reservation[];
  loading: boolean;
  setModalOpen: (modal: { id: string; target: string } | null) => void;
  modalOpen: { id: string; target: string } | null;
  handleUpdateReservation: (
    id: string,
    status: string,
    message?: string
  ) => void;
}

const thData = ["ID", "User", "Hotel", "Dates", "Status", "Actions"];

const Table: React.FC<TableProps> = ({
  reservations,
  loading,
  setModalOpen,
  modalOpen,
  handleUpdateReservation,
}) => {
  if (loading) {
    return <Loading />;
  }

  if (reservations.length === 0) {
    return <p className="text-center text-gray-600">No reservations found.</p>;
  }

  return (
    <>
      <div className="overflow-x-auto shadow-lg rounded-lg mb-10">
        <table className="min-w-full bg-white rounded-lg overflow-hidden !text-center">
          <thead className="bg-gradient-to-r from-blue-500 to-purple-600 ">
            <tr>
              {thData.map((th) => (
                <th key={th} className="py-3 px-6 font-semibold">
                  {th}
                </th>
              ))}
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
                  {reservation.checkIn
                    ? new Date(reservation.checkIn).toLocaleDateString()
                    : ""}{" "}
                  -{" "}
                  {reservation.checkOut
                    ? new Date(reservation.checkOut).toLocaleDateString()
                    : ""}
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
                  <div className="flex justify-center space-x-2">
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

      <ConfirmationModal
        isOpen={!!modalOpen}
        onClose={() => setModalOpen(null)}
        onConfirm={(message) => {
          if (modalOpen) {
            handleUpdateReservation(modalOpen.id, modalOpen.target, message);
            setModalOpen(null);
          }
        }}
        target={modalOpen?.target || ""}
      />
    </>
  );
};

export default Table;
