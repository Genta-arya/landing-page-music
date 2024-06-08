import React from "react";
import Header from "../../../../components/Header";

const ThemeHeader = () => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden pb-12">
      <p className="text-center mt-4 text-red-500 font-bold">Fitur akan segera update</p>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <p className="flex justify-center mt-4 font-bold">Preview</p>
        <div className="mt-8 ">
          <Header />
        </div>
      </div>
    </div>
  );
};

export default ThemeHeader;
