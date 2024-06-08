import React from "react";
import Footer from "./Footer";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen  text-gray-700">
        <h1 className="lg:text-9xl text-7xl font-bold mb-8">404</h1>
        <p className="lg:text-2xl mb-2 font-bold ">Yahh</p>
        <p className="lg:text-2xl mb-8 font-bold">Halaman Tidak Ditemukan</p>
        <a
          href="/"
          className="px-4 py-2 bg-sky-400 text-white rounded hover:bg-sky-700 transition duration-300"
        >
          Kembali ke Beranda
        </a>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
