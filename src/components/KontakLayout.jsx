import React, { useEffect } from "react";
import icon from "../assets/icon.png";
import "../style.css";
import shoope from "../assets/shoope.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faLocation } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
const KontakLayout = () => {
  useEffect(() => {
  
    document.body.style.overflow = "hidden";


    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Amplang Epok Ema - Kontak Kami</title>
        <meta
          name="description"
          content="Amplang Epok Ema adalah makanan ringan berupa kerupuk ikan tenggiri khas Ketapang dengan harga mulai dari Rp 10.000 per bungkus. Kunjungi toko kami untuk membeli oleh-oleh khas Ketapang."
        />
        <meta
          name="keywords"
          content="Toko Epok Ema, Amplang Epok Ema, Amplang Ketapang , Jual amplang ketapang , Epok Ema , oleh oleh ketapang , makanan khas ketapang"
        />
        <meta
          property="og:title"
          content="Amplang Epok Ema - Oleh Oleh khas Ketapang"
        />
      </Helmet>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative  flex flex-col  items-center justify-center h-screen bg-cover bg-center "
        style={{
          backgroundImage:
            "url(https://amplangema.my.id/static/media/rill.2c84a1e1b9d0d289760b.png)",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-80 "></div>
        <div className="relative bg-gray-600   blur-background bg-opacity-60 md:w-[95%] md:p-8 lg:w-[50%] py-8 w-[90%] lg:p-8 rounded-2xl shadow-lg text-center z-10">
          <Link
            to={"/"}
            className="flex items-center justify-start gap-4 w-fit px-4 py-1 rounded-md"
            o
          >
            <FontAwesomeIcon
              icon={faChevronLeft}
              className="text-xl text-white"
            />
            <p className="text-white font-bold">Kembali</p>
          </Link>

          <div className="flex flex-col items-center mb-6">
            <img
              src={icon}
              alt="Icon"
              className="w-20 h-full bg-white rounded-full mb-4"
            />
            <p className="text-2xl font-bold font-serif text-white">
              Amplang Epok Ema
            </p>
            <p className="text-sm font-light font-serif text-white mt-2">
              Asli Ikan Tenggiri khas Ketapang Kalimantan Barat
            </p>
          </div>
          <div className="space-y-4 flex flex-col items-center  ">
            <Link
              to="https://maps.app.goo.gl/qTzNhwzc4zRBzwVh8"
              className="shine-button block lg:w-96 w-60 md:w-96 px-4 py-2 bg-gray-500 bg-opacity-40  text-white font-semibold rounded transition duration-300 hover:bg-gray-400 hover:bg-opacity-65"
            >
              <div className="flex items-center justify-center gap-4 ">
                <FontAwesomeIcon
                  icon={faLocation}
                  className="text-xl text-sky-400"
                />
                <p>Lokasi</p>
              </div>
            </Link>
            <Link
              to="https://shopee.co.id/product/290467699/29301079214?d_id=ba077&uls_trackid=4vsfdl8o00ke&utm_content=2z8PYQd1qdX77jYEiRw2d3x3sj6f"
              className="shine-button blur-background block lg:w-96 w-60 md:w-96 px-4 py-2 bg-gray-500 bg-opacity-40  text-white font-semibold rounded transition duration-300 hover:bg-gray-400 hover:bg-opacity-65"
            >
              <div className="flex items-center justify-center gap-4">
                <img
                  src={shoope}
                  alt="epok ema"
                  className="w-6 h-full rounded-full"
                />
                <p>Shopee</p>
              </div>
            </Link>
            <div className="flex items-center w-full">
              <hr className="border border-white my-4 w-1/2" />{" "}
              <p className="text-white text-xs w-40">Hubungi Kami</p>{" "}
              <hr className="border border-white my-4 w-1/2" />{" "}
            </div>
            <Link
              to="https://api.whatsapp.com/send/?phone=628971078541&text&type=phone_number&app_absent=0"
              className="shine-button block lg:w-96 w-60 md:w-96 px-4 py-2 bg-gray-500 bg-opacity-40  text-white font-semibold rounded transition duration-300 hover:bg-gray-400 hover:bg-opacity-65"
            >
              <div className="flex items-center justify-center gap-4">
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  className="text-2xl text-green-600"
                />
                <p>WhatsApp</p>
              </div>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default KontakLayout;
