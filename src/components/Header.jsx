import React from "react";
import { motion } from "framer-motion";
import header from "../assets/rill.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-scroll";

const splitText = (text) => {
  return text.split("").map((char, index) => (
    <motion.span
      key={index}
      className="inline-block"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      style={{ marginRight: char === " " ? "0.4rem" : "0" }}
    >
      {char}
    </motion.span>
  ));
};

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-auto"
    >
      <div className="relative w-full lg:h-screen">
        <img
          src={header}
          alt="amplang epok ema"
          className="w-full md:h-full lg:h-full h-[250px] filter blur-0 object-right-top "
        />
        <div className="absolute inset-0  bg-black opacity-65"></div>
      </div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-5 flex items-center z-10 justify-center lg:-top-20 md:-top-20 top-5"
      >
        <div className="py-16 text-center flex flex-col gap-2 italic md:mt-8">
          <p className="text-white text-sm font-bold text-center lg:text-3xl md:text-3xl font-serif">
            {splitText("AFC  ")}
            <span className="text-sky-300 ">
              {splitText("Entertainment ")}
            </span>
          </p>
          <div className="mt-2 ">
            <p className="text-white text-sm font-bold text-center lg:text-2xl md:text-2xl font-serif">
              {splitText("Dapatkan pengalaman audio Terbaik")}
            </p>
            <p className="text-white text-sm font-bold text-center lg:text-2xl md:text-2xl font-serif ">
              {splitText("dengan layanan Orgen Tunggal kami.")}
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="lg:flex lg:justify-center flex gap-2 lg:gap-8 lg:mt-12 md:mt-4 md:gap-8 md:flex md:justify-center"
          >
            <Link to="productSection" spy={true} smooth={true} duration={500}>
              <motion.button
                whileHover={{ scale: 0.95 }}
                className="hover:scale-95 lg:text-base md:text-base  text-xs px-4 bg-sky-500 py-1 text-white font-semibold lg:px-8 lg:py-2 rounded-lg overflow-hidden transition duration-300 ease-in-out hover:bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 hover:text-white"
              >
                <p className="">
                Layanan Kami
                  </p>
              </motion.button>
            </Link>

            <motion.a
              href="https://wa.me/62895702460633"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 0.95 }}
              className="hover:scale-95 bg-transparent text-white font-semibold px-4 py-1 text-xs lg:text-base md:text-base lg:px-8 lg:py-2 rounded-lg border border-white hover:bg-white hover:text-sky-400 hover:border-sky-400 transition duration-300 ease-in-out flex items-center"
            >
              <FontAwesomeIcon icon={faPhone} />{" "}
              <span className="ml-2">+62 895-7024-60633</span>
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  );
};

export default Header;
