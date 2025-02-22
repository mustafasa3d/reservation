import Header from "@/components/Header";
import ReservationForm from "@/components/ReservationForm";

const AddReservation = async () => {
  return (
    <div className="container mx-auto ">
      <Header
        title="Reservations"
        btnInfo={{ href: "/user", text: "See All Reservations" }}
      />
      <ReservationForm from="user" />
    </div>
  );
};

export default AddReservation;
