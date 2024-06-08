import React, { useState } from "react";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ModalAddProduk from "../modal/ModalAddProduk";

const SearchProduk = ({ searchTerm, handleSearch, refresh, data }) => {
  const [openAdd, setAdd] = useState(false);

  const handleTambahProduk = () => {
    setAdd(true);
  };
  const onClose = () => {
    setAdd(false);
  };

  return (
    <>
      <div className="flex  md:justify-between md:flex-row lg:flex-row flex-col gap-4 lg:justify-between mb-4 ">
        <div>
          <button
            className="bg-sky-500 text-white px-3 py-1 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-md mr-2 w-full text-xs lg:text-base md:text-base"
            disabled={data.length === 1}
            onClick={handleTambahProduk}
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Tambah Produk
          </button>
          {data.length === 1 && (
            <p className="text-xs text-red-500 mt-2">*Hanya dapat menambahkan 1 produk</p>

          )}
        </div>
        <div className="flex items-center justify-center  ">
          <div className="relative ">
            <input
              type="text"
              placeholder="Cari produk..."
              className="border rounded-md px-3 py-1 pl-10 text-xs lg:text-base md:text-base  md:w-full  lg:w-full w-64"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </div>
        </div>
      </div>
      {openAdd && <ModalAddProduk onClose={onClose} refresh={refresh} />}
    </>
  );
};

export default SearchProduk;
