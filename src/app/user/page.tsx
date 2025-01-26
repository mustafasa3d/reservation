import Header from "@/components/Header";
import UserReservations from "@/components/user/UserReservations";

async function page() {
  return (
    <>
      <Header
        title={`Reservations`}
        btnInfo={{ href: "/user/addreservation", text: "+ Add Reservation" }}
      />

      <UserReservations />
    </>
  );
}

export default page;
