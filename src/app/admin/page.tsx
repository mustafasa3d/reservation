import AdminDashboard from "@/components/admin/AdminDashboard";
import Header from "@/components/Header";

function page() {
  return (
    <>
      <Header
        title="Admin Dashboard"
        btnInfo={{ href: "/admin/reservations", text: "+ Add Reservation" }}
      />
      <AdminDashboard />
    </>
  );
}

export default page;
