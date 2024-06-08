import React, { useState, useEffect } from "react";
import { db } from "../../../services/Firebase/FirebaseConfig";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { formatTimeAgo } from "../../../utils/utils";
import Rating from "../../../components/Rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAmountDown,
  faSortAmountUp,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import useUlasan from "../../../services/Hooks/useUlasan";

const Ulasan = () => {
  const { loading, handleSortChange, ulasan, setUlasan, sortBy } = useUlasan();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "comments", id));
      setUlasan(ulasan.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  const confirmDelete = () => {
    handleDelete(deleteId);
    setDeleteModal(false);
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-between mb-4 ">
        <p className="lg:text-lg md:text-lg text-sm font-semibold">
          Ulasan Produk
        </p>
        <button
          onClick={handleSortChange}
          className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <FontAwesomeIcon
            icon={sortBy === "highest" ? faSortAmountUp : faSortAmountDown}
            className="mr-1"
          />
          <p className="text-xs">
            {sortBy === "highest" ? "Rating Tertinggi" : "Rating Terendah"}
          </p>
        </button>
      </div>
      <hr className="border-b mb-8"></hr>
      {loading ? (
        <div className="flex items-center justify-center">
          <FontAwesomeIcon
            icon={faSpinner}
            className="animate-spin mr-2 text-gray-600"
          />
          <p>Loading...</p>
        </div>
      ) : (
        <ul className="  gap-4 grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1">
          {ulasan.length === 0 ? (
            <p className="text-center font-bold">
              Tidak ada ulasan yang tersedia.
            </p>
          ) : (
            ulasan.map((item) => (
              <div
                key={item.id}
                className="rounded-lg shadow-md p-4 mb-4 w-full flex flex-col"
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="md:text-lg lg:text-lg text-sm font-bold truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 ">{item.region}</p>
                    <Rating rating={item?.rating} />
                  </div>
                </div>
                <span className="text-xs text-gray-500 mb-2 ">
                  {formatTimeAgo(item.timestamp)}
                </span>
                <p className="text-gray-700 text-sm lg:text-base md:text-base">
                  {item.comment}
                </p>{" "}
                <p className="text-gray-700 text-sm">{item.item}</p>
                <div className="flex justify-center items-center text-xs lg:text-base md:text-sm mt-auto pt-4">
                  <button
                    onClick={() => openDeleteModal(item.id)}
                    className="py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 w-full"
                  >
                    Hapus Ulasan
                  </button>
                </div>
              </div>
            ))
          )}
        </ul>
      )}
      {deleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-md shadow-md w-80 lg:w-[50%] md:w-[50%]">
            <p className="lg:text-lg md:text-lg text-base font-semibold mb-4">
              Konfirmasi
            </p>
            <p className="lg:text-lg md:text-lg text-xs">
              Apakah Anda yakin ingin menghapus ulasan ini?
            </p>
            <div className="flex justify-end mt-4 lg:text-lg md:text-sm text-xs">
              <button
                onClick={() => setDeleteModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-md mr-4 hover:bg-gray-600"
              >
                Batal
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-20"
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ulasan;
