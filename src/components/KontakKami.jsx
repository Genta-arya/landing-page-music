import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faLink,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const KontakKami = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);
  const navigate = useNavigate();
  const openLinktree = () => {
    navigate("/kontak");
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsVisibleDropdown(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const handleHover = () => {
    setIsVisibleDropdown(true);
  };

  const handleMouseLeave = () => {
    setIsVisibleDropdown(false);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed bottom-24 lg:right-10 md:right-10 right-4 bg-sky-500 text-white rounded-full px-3 py-2 focus:outline-none z-50 ${!isVisible ? "hidden" : "block"}`}
        onClick={openLinktree}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      >
        <FontAwesomeIcon icon={faUserFriends} className="text-xs" />
      </motion.button>
      
      {isVisibleDropdown && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={` ${!isVisibleDropdown ? "hidden" : "block"} fixed bottom-24 lg:right-24 md:right-24 right-16 bg-white rounded-lg rouded-br-full shadow-md p-2`}
        >
          <p className="text-gray-800 font-semibold w-32 text-center">Kontak Kami</p>
         
        </motion.div>
      )}
    </div>
  );
};

export default KontakKami;
