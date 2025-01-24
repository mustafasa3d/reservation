"use client";
import useAuth from "@/utils/hooks/UseAuth";

function ProtectRoute({ user }) {
  useAuth(user);
  return null;
}

export default ProtectRoute;
