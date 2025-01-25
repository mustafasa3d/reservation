import Header from "@/components/Header";
import Link from "next/link";

async function page() {
  /* const reservationData = await getSingleData(`/reservations/${id}`); */
  return (
    <>
      <Header title={`Reservations`} />
      <div>
        <Link href="/user/reservations/1">reservation 1</Link>
        <Link href="/user/reservations/2">reservation 2</Link>
        <Link href="/user/reservations/3">reservation 3</Link>
      </div>
    </>
  );
}

export default page;
