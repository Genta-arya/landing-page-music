import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import { AnimatePresence, motion } from "framer-motion";
import ReactGA from "react-ga4";

import ModalImage from "./ModalImageView";
import Countdown from "react-countdown";
import useProduct from "../services/Hooks/useProduct";
import SkeletonGrid from "../Admin/Dashboard/Produk/components/SkeletonGrid";
const Product = () => {
  const [selectData, setSelectData] = useState(null);

  const [isOpenImage, setIsOpenImage] = useState(false);
  const [startTime, setStartTime] = useState(() => {
    const savedTime = localStorage.getItem("startTime");
    return savedTime ? parseInt(savedTime, 10) : Date.now();
  });
  const { loading, activeProdukList } = useProduct();

  const formatPriceToRupiah = (price) => {
    const formattedPrice = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
    return formattedPrice.replace(",00", "");
  };


  const handleOpenImage = (data) => {
    setIsOpenImage(true);
    setSelectData(data);
    ReactGA.event({
      category: "Product Click",
      action: "Click",
      label: data.name,
    });
  };

  const handleOrder = () => {
    const message = `Halo bg anchay , mau sewa alat musik orgen tunggal nya`;
    const whatsappURL = `https://wa.me/62895702460633?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };
  const handleClose = () => {
   
    setIsOpenImage(false);
  };

  const CountdownTimer = ({ startTime }) => {
    const calculateTimeLeft = () => {
      const now = Date.now();
      const endTime = startTime + 24 * 60 * 60 * 1000;
      const timeLeft = endTime - now;
      return timeLeft > 0 ? timeLeft : 0;
    };

    return (
      <Countdown
        date={Date.now() + calculateTimeLeft()}
        onComplete={() => {
          localStorage.setItem("startTime", Date.now());
          window.location.reload();
        }}
        renderer={({ hours, minutes, seconds }) => (
          <span>
            {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </span>
        )}
      />
    );
  };

  useEffect(() => {
    if (!localStorage.getItem("startTime")) {
      localStorage.setItem("startTime", Date.now());
    }
  }, []);

  return (
    <>
      <div
        className="lg:px-14 md:px-14  px-11 -mt-4 bg-white w-fit shadow-2xl py-2 ml-8 rounded-md border"
        id="productSection"
      >
        <p className="font-bold">Paket Sewa</p>
      </div>
      <div className="px-11 lg:px-24 py-8 text-gray-500 lg:text-base md:text-base text-sm">
        <p>
          Kami memiliki paket sewa orgen tunggal{" "}
          <span className="text-red-500 font-bold ">
            untuk harga dan booking{" "}
          </span>{" "}
        </p>
        <p className="text-sky-400 font-bold">Bisa melalui WhatsApp kami</p>
      </div>
      {loading ? (
        <div className="w-full px-4">
          <SkeletonGrid />
        </div>
      ) : (
        <div className="lg:flex lg:flex-wrap lg:px-64  lg:justify-around md:flex md:justify-around grid grid-cols-1 items-center py-4 ">
          {activeProdukList.map((product, index) => (
            <div
              key={index}
              className={` ${
                activeProdukList.length > 1
                  ? "md:w-1/3"
                  : "lg:w-[70%] md:w-[60%]  w-full"
              } lg:p-2 md:p-2 p-1`}
            >
              <div className="bg-white shadow-lg rounded-lg  pb-2 lg:pb-4 md:pb-2  overflow-hidden hover:shadow-sky-400  duration-300 transition-all ease-in hover:cursor-pointer relative ">
                {product.label === true && (
                  <div className="absolute top-0 left-0 bg-red-500 text-white text-xs font-bold px-5 py-1 rounded-br-lg z-50 ">
                    Terlaris
                  </div>
                )}

                {product.disc === true && (
                  <div className="absolute top-0 flex flex-col right-0 bg-red-500 text-white text-xs font-bold px-5 py-1 rounded-bl-lg z-50 ">
                    <span>Diskon 25%</span>{" "}
                    <div className="text-center">
                      <CountdownTimer startTime={startTime} />
                    </div>
                  </div>
                )}
                <div
                  className="flex justify-center"
                  onClick={() => handleOpenImage(product)}
                >
                  <img
                    src={product.image}
                    alt={`amplang epok ema`}
                    className="md:w-full lg:w-full w-full  md:h-60 lg:h-96 h-52 transition duration-300 ease-in-out transform"
                  />
                </div>
                <div className="p-2">
                  <p className="lg:text-lg md:text-lg text-sm w-full lg:w-full md:w-full font-semibold mt-1 ">
                    {product.name}
                  </p>
                  <div className="flex gap-4 items-center">
                    {product.disc === true && (
                      <p className="mt-2 text-red-500 font-bold text-xs lg:text-base md:text-base">
                        <s>{formatPriceToRupiah(20000)}</s>
                      </p>
                    )}
                    <p className="mt-2 text-green-500 font-semibold text-xs lg:text-base md:text-sm">
                      Info lebih lanjut silahkan hubungi kami
                    </p>
                  </div>

                  <button
                    onClick={() => handleOrder()}
                    className="mt-4 text-xs md:text-base lg:text-base hover:animate-pulse bg-sky-400 w-full text-white font-semibold px-4 py-1.5 rounded-lg hover:bg-sky-500 transition duration-300 ease-in-out hover:scale-95"
                  >
                    <div className="flex justify-center items-center">
                      <FontAwesomeIcon
                        icon={faWhatsapp}
                        className="mr-2 text-xl lg:text-xl md:text-xl"
                      />{" "}
                      <p className="text-xs lg:text-sm md:text-sm">
                        WhatsApp kami
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isOpenImage && (
          <motion.div
            initial={{ opacity: 1, y: 500, scale: 0.1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 500, scale: 0.1 }}
            transition={{ duration: 0.5 }}
            style={{ backdropFilter: "blur(10px)" }}
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75  z-50 text-black"
          >
            <ModalImage
              data={selectData}
              isOpen={isOpenImage}
              onClose={handleClose}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Product;
