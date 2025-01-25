"use client";

import Link from "next/link";
import React from "react";
import { logout } from "@/utils/api/services";
import { useRouter } from "next/navigation";

interface btnInfoType {
  href: string;
  text: string;
}

interface propsType {
  title: string;
  btnInfo: btnInfoType;
}

function Header({ title, btnInfo }: propsType) {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-end">
        <button
          className="mt-8 bg-red-500/40 hover:bg-red-500/80 duration-300 text-white py-2 px-4 rounded"
          type="button"
          onClick={() => logout(router)}
        >
          {" "}
          Logout
        </button>
      </div>
      <div className="flex justify-between items-center my-8">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        <Link
          href={btnInfo.href}
          className="bg-blue-500/40 hover:bg-blue-500/80 duration-300 text-white py-2 px-4 rounded"
        >
          {btnInfo.text}
        </Link>
      </div>
    </>
  );
}

export default Header;
