import Header from "@/components/Header";
import ReservationForm from "@/components/ReservationForm";

const AddReservation = async () => {
  return (
    <div className="container mx-auto ">
      <Header
        title="Reservations"
        btnInfo={{ href: "/admin", text: "See All Reservations" }}
      />
      <ReservationForm />
    </div>
  );
};

export default AddReservation;
