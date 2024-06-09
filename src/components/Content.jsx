import React from "react";
import { motion } from "framer-motion";

import useThemeKomposisi from "../services/Hooks/useThemeKomposisi";


const Content = ({ data }) => {
  const { data: fetch, loading } = useThemeKomposisi();
  const items = data || fetch;

  // if (loading) {
  //   return <div><Loading /></div>;
  // }
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 1 }}
      className="relative"
    >
      <div className="flex justify-center lg:-mt-8 md:-mt-24 -mt-8">
        <div className="bg-white md:w-[90%] w-[95%] lg:w-[90%] shadow-xl rounded-md shadow-gray-400 h-full py-12 px-8">
          <motion.span
            className="flex justify-center -mt-8 mb-8 py-4 font-bold lg:text-2xl text-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            Peralatan Kami
          </motion.span>
          <div className="flex justify-center">
            <div className="grid  md:grid-cols-2 grid-cols-1 gap-8 md:ml-20 lg:items-center lg:grid-cols-4 lg:gap-12  lg:ml-0 ml-8">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-col-2 items-center mt-auto"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.2, duration: 1 }}
                    className="flex flex-col"
                  >
                    <div className="mb-5">
                      <img
                        src={item.image || "https://via.placeholder.com/150"}
                        alt={`AFC orgen tunggal ${item.name}`}
                        className="w-40 mb-2 rounded-lg"
                      />
                    </div>
                    <h2 className="lg:text-xl md:text-xl -mt-4 font-bold">
                      {item.name}
                    </h2>
                    <p className="text-xs text-gray-400">{item.description}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Content;
