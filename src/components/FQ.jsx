import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

const Fq = () => {
  const faqs = [
    {
      question: "Kualitas Suara Terbaik",
      answer:
        "Kami menggunakan alat musik berkualitas tinggi untuk memastikan suara yang jernih dan memukau. Orgen tunggal kami dirawat dengan baik dan selalu dalam kondisi prima.",
    },
    {
      question: "Profesional dan Berpengalaman",
      answer:
        "Tim kami terdiri dari musisi profesional yang berpengalaman dalam berbagai acara pernikahan. Mereka mampu menyesuaikan musik dengan tema dan suasana acara Anda.",
    },
    {
      question: "Repertoar Luas",
      answer:
        "Dari lagu-lagu romantis klasik hingga hits modern, kami memiliki koleksi lagu yang dapat disesuaikan dengan preferensi Anda. Anda bisa memilih lagu-lagu spesial yang memiliki makna tersendiri untuk Anda dan pasangan.",
    },
    {
      question: "Layanan Personalisasi",
      answer:
        "Kami bekerja sama dengan Anda untuk memahami visi dan tema pernikahan Anda. Dengan layanan personalisasi kami, Anda dapat memastikan bahwa musik yang dimainkan benar-benar mencerminkan kepribadian dan cinta Anda.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <div className="flex justify-center lg:-mb-6 md:-mb-6 -mb-12 mt-10">
        <div className="bg-white shadow-2xl border rounded-md py-4 px-8 items-center text-center">
          <h2 className="lg:text-xl md:text-xl text-base font-bold flex justify-center text-center items-center">
            <FontAwesomeIcon icon={faMusic} className="mr-4 text-red-500" />
            Mengapa Memilih Kami
          </h2>
        </div>
      </div>
      <div className="bg-[#DCF2F1] text-gray-500">
        <div className="p-8 lg:px-24">
          <div className="mt-12">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="lg:text-lg md:text-base text-sm font-semibold">
                    {1 + index}. {faq.question}
                  </h3>
                  <FontAwesomeIcon
                    icon={openIndex === index ? faChevronUp : faChevronDown}
                  />
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-sm px-5 mt-4"
                      key={index}
                    >
                      {faq.answer}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Fq;
