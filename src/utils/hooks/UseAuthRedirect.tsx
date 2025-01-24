import { useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role === "admin") router.push("/admin");
    if (token && role === "user") router.push("/user");
  }, [router]);
};

export default useAuthRedirect;