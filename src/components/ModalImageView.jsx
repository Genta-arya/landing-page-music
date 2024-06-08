import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faT, faTimes } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import icon from "../assets/icon.png";
const ModalImage = ({ isOpen, onClose, data }) => {
 
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
          className="w-full lg:w-[50%] items-center flex flex-col "
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={onClose}
            className="w-52 bg-white px-4 py-1 rounded-xl text-xs lg:text-base font-bold hover:bg-slate-100  mb-4 "
          >
            <div className="flex  justify-center  items-center gap-4">
              <FontAwesomeIcon icon={faChevronLeft}  className="-ml-8 mr-4"/>
              <p className="">Kembali</p>
            </div>
          </button>

          <div className="flex justify-center ">
            <img
              src={data.image}
              alt="Modal Content"
              className="lg:w-[50%] w-[70%] rounded-lg"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalImage;
