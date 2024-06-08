import React from 'react';
import icon from '../assets/icon.png';
import { motion } from 'framer-motion';

const SplashScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <motion.img
        src={icon}
        alt="amplang epok ema"
        className="w-52 "
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      />
    </div>
  );
};

export default SplashScreen;
