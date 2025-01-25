import AdminDashboard from "@/components/admin/AdminDashboard";
import Header from "@/components/Header";

async function page() {
  return (
    <>
      <Header
        title="Admin Dashboard"
        btnInfo={{ href: "/admin/addreservation", text: "+ Add Reservation" }}
      />
      <AdminDashboard />
    </>
  );
}

export default page;
