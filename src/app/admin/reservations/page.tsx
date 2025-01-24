import ReservationForm from "@/components/ReservationForm";
import Header from "@/components/Header";

const Reservations = () => {
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

export default Reservations;
