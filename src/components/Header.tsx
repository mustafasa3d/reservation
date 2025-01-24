import Link from "next/link";
import React from "react";

interface btnInfoType {
  href: string;
  text: string;
}

interface propsType {
  title: string;
  btnInfo: btnInfoType;
}

function Header({ title, btnInfo }: propsType) {
  return (
    <div className="flex justify-between items-center my-8">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      <Link
        href={btnInfo.href}
        className="bg-blue-500/40 hover:bg-blue-500/80 duration-300 text-white py-2 px-4 rounded"
      >
        {btnInfo.text}
      </Link>
    </div>
  );
}

export default Header;
