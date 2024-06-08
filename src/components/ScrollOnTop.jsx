import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUp } from "@fortawesome/free-solid-svg-icons";

const ScrollOnTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleHover = () => {
    setIsVisibleDropdown(true);
  };

  const handleMouseLeave = () => {
    setIsVisibleDropdown(false);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={`fixed  bottom-10 lg:right-10 md:right-10 right-4 bg-sky-500 text-white rounded-full px-3 ${!isVisible ? "hidden" : "block"}  py-2 focus:outline-none z-50`}
      onClick={scrollToTop}
      onMouseEnter={handleHover}
      onMouseLeave={handleMouseLeave}
    >
      <FontAwesomeIcon icon={faCircleUp} size={32} />

     
    </motion.button>
  );
};

export default ScrollOnTop;
