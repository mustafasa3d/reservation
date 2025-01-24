"use client";

import { Role } from "@/types";
import useAuth from "@/utils/hooks/UseAuth";

function ProtectRoute({ user }: { user: Role }) {
  useAuth(user);
  return null;
}

export default ProtectRoute;
