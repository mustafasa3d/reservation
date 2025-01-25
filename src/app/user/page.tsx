import Header from "@/components/Header";
import UserReservations from "@/components/user/UserReservations";

async function page() {
  return (
    <>
      <Header title={`Reservations`} />
      <UserReservations />
    </>
  );
}

export default page;
