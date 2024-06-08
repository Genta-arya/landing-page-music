import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Maps = () => {
  return (
    <div className="py-4 mt-8 lg:px-10 md:px-10 px-2 ">
      <p className="text-center font-bold mb-2">Lokasi kami</p>
      <div className="gap-12">
        <div className="bg-sky-400 text-center text-white font-bold rounded-t-xl">
          <div className=" text-sm py-1">
            <p>Buka Setiap hari</p>
            <p>
              {" "}
              <FontAwesomeIcon icon={faClock} /> <span>08:00 - 22:00 wib</span>
            </p>
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d249.23624472371327!2d109.96963465920153!3d-1.8315752860071757!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e05197834159337%3A0xecd87fd6ecb85920!2sAnchay%20Sewa%20Orgen%20Tunggal!5e0!3m2!1sen!2sid!4v1717868005356!5m2!1sen!2sid"
          width="100%"
          height="450"
          style={{
            border: "1px solid #ccc",

            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Maps;
