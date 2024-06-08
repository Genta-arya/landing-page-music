import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const username = "Administrator";
  const email = useSelector((state) => state.auth.email);

  return (
    <nav className=" border-b border-gray-400  bg-white p-4 ">
      <div className="w-full mx-auto flex justify-between items-center">
        <div className="text-black font-bold">
          <div className="flex flex-col px-4">
            <p className=" hidden lg:text-base lg:block md:block text-sky-500">System UMKM</p>
            <span className="text-sm hidden lg:block md:block text-gray-400">V.1.0</span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs lg:text-base text-red-500 font-bold">{username}</p>
          <p className="text-xs lg:text-base text-gray-500">{email}</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
