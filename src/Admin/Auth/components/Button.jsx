import React from "react";

const Button = (props) => {
  const { type, title, loading } = props;
 
  return (
    <button
      type={type}
      disabled={loading}
      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded disabled:bg-gray-500 hover:bg-blue-700"
    >
      {loading ? "Tunggu sebentar" : title}
    </button>
  );
};

export default Button;
