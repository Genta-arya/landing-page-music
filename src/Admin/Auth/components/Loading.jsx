import React from 'react';
import icon from '../../../assets/icons.png'; // Pastikan path ke gambar ikon sesuai

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={icon} alt="Loading Icon" className="w-16 h-16 mb-4" /> {/* Ganti ukuran sesuai kebutuhan */}
      <p className="text-gray-600">Memuat Data...</p>
    </div>
  );
};

export default Loading;
