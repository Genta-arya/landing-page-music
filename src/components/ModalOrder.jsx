import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import icon from "../assets/icon.png";
const ModalOrder = ({ isOpen, onClose, data }) => {
  const [name, setName] = useState("");
  const [productName, setProductName] = useState(data.name);

  const [quantity, setQuantity] = useState(1);

  const handleOrder = () => {
    const message = `Halo Epok, saya ingin memesan:\n\nNama: ${name}\nProduk: ${productName}\nJumlah: ${quantity}`;
    const whatsappURL = `https://wa.me/628971078541?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, "_blank");
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);


  return (
    <AnimatePresence>
      {isOpen && (
     
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg relative lg:w-[50%] w-[95%]"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-8 text-gray-600 hover:text-gray-900"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="flex justify-center">
              <img src={icon} alt="amplang epok ema" className="w-32 lg:w-52 md:w-52" />
            </div>
            <form onSubmit={handleOrder} className="text-xs md:text-base lg:text-base">
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Nama:</label>
                <input
                  type="text"
                  value={name}
                  placeholder="Masukan nama"
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Produk:</label>
                <input
                  type="text"
                  value={productName}
                  readOnly
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Harga:</label>
                <input
                  type="text"
                  value={formatPrice(data.price)}
                  readOnly
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-gray-700">Jumlah:</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <button className="w-full bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition duration-300">
                Pesan
              </button>
            </form>
          </motion.div>
    
      )}
    </AnimatePresence>
  );
};

export default ModalOrder;
