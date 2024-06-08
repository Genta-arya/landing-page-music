// ConfirmationModal.js
import React from "react";
import { ToastContainer, toast } from "react-toastify";

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Konfirmasi</h2>
        <p>{message}</p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="bg-gray-500 text-white py-2 w-20 text-center rounded-md"
            onClick={onCancel}
          >
            Tidak
          </button>
          <button
            className="bg-red-500 text-white w-20 py-2 rounded-md"
            onClick={onConfirm}
          >
            Ya
          </button>
        </div>
        <ToastContainer autoClose={1500} />
      </div>
    </div>
  );
};

export default ConfirmationModal;
