import React, { useState } from "react";
import { formatRupiah } from "../../../../utils/utils";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../../services/Firebase/FirebaseConfig";
import ConfirmationModal from "../modal/ModalDelete";
import ModalEditProduk from "../modal/ModalEditProduk";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenClip,
  faToggleOff,
  faToggleOn,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const CardListProduk = (props) => {
  const { dataList, refresh } = props;
  const [openEdit, setEdit] = useState(false);
  const [data, setData] = useState();
  const [showConfirm, setShowConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleEditProduk = (data) => {
    setEdit(true);
    setData(data);
  };

  const handleDeleteClick = (product) => {
    setShowConfirm(true);
    setProductToDelete(product);
  };

  const handleConfirmDelete = async () => {
    try {
      const productRef = doc(db, "products", productToDelete.id);
      await deleteDoc(productRef);
      toast.success("Produk berhasil dihapus!", {
        onClose: () => window.location.reload(),
        autoClose: 1000,
      });
      refresh();
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus produk.");
      console.error("Error deleting product: ", error);
    } finally {
      setShowConfirm(false);
      setProductToDelete(null);
    }
  };

  const handleCheckboxChange = async (product, field) => {
    try {
      const productRef = doc(db, "products", product.id);
      await updateDoc(productRef, {
        [field]: !product[field],
      });
      toast.success("Produk berhasil diperbarui!", {
        onClose: refresh,
        autoClose: 1000,
      });
    } catch (error) {
      toast.error("Terjadi kesalahan saat memperbarui produk.");
      console.error("Error updating product: ", error);
    }
  };

  const handleTypeToggle = async (product) => {
    try {
      const productRef = doc(db, "products", product.id);
      await updateDoc(productRef, {
        active: !product.active,
      });

      if (product.active) {
        toast.success("Produk dinonaktifkan!", {
          onClose: refresh,
          autoClose: 1000,
        });
      } else {
        toast.success("Produk diaktifkan!", {
          onClose: refresh,
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat memperbarui tipe produk.");
      console.error("Error updating product type: ", error);
    }
  };

  const onClose = () => {
    setEdit(false);
  };

  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);

  return (
    <div>
      {dataList.length > 0 ? (
        <div
          className={`grid grid-cols-1  sm:grid-cols-2 pb-10 ${
            sidebarOpen ? "md:grid-cols-2" : "md:grid-cols-2"
          } lg:grid-cols-3 gap-4  lg:py-8`}
        >
          {dataList.map((product, index) => (
            <div
              key={index}
              className="flex flex-col bg-white border shadow-md p-4 rounded-md transition-transform duration-300 transform relative"
            >
              <div className="w-full flex justify-center">
                <img
                  src={product.image}
                  alt=""
                  className="lg:w-40  object-cover rounded-lg"
                />
              </div>
              <div className="mt-4 flex-1">
                <h3 className="lg:text-base text-sm md:text-base font-semibold mb-2 ">
                  {product.name}
                </h3>
                <p className="text-gray-600 lg:text-lg text-sm md:text-base">
                  {formatRupiah(product.price)}
                </p>
              </div>

              <div className="flex items-center gap-2 mt-4 justify-between">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={product.disc}
                    onChange={() => handleCheckboxChange(product, "disc")}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Diskon</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={product.label}
                    onChange={() => handleCheckboxChange(product, "label")}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Terlaris</span>
                </label>
              </div>

              <div className="flex flex-col w-full gap-2 mt-2">
                <button
                  className="bg-sky-400 text-white px-3 py-1 rounded-md w-full"
                  onClick={() => handleEditProduk(product)}
                >
                  <div className="flex items-center justify-center gap-4 text-xs lg:text-base md:text-base">
                    <FontAwesomeIcon icon={faPenClip} className="text-white" />
                    Edit
                  </div>
                </button>
                <button
                  className="bg-white border-red-500 border text-black px-3 py-1 rounded-md w-full"
                  onClick={() => handleDeleteClick(product)}
                >
                  <div className="flex items-center justify-center gap-4 text-xs lg:text-base md:text-base">
                    <FontAwesomeIcon icon={faTrash} className="text-red-500" />
                    Hapus
                  </div>
                </button>
                <hr className="border-b w-full border-gray-500 mt-2"></hr>

                <div className="flex gap-2 justify-between items-center text-xs lg:text-sm md:text-sm">
                  <p className="text-center">Status</p>
                  <span
                    className={`${
                      product.active ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {product.active ? "Terlihat" : "Sembunyi"}
                  </span>
                </div>
                <button
                  className={`text-white px-3 py-1 rounded-md w-full ${
                    !product.active ? "bg-green-500" : "bg-red-500"
                  }`}
                  onClick={() => handleTypeToggle(product)}
                >
                  <div className="flex items-center justify-center gap-4 text-xs lg:text-base md:text-base">
                    <FontAwesomeIcon
                      icon={!product.active ? faToggleOff : faToggleOn}
                    />
                    {!product.active ? "Aktifkan" : "Matikan"}
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <p className="text-sm text-center mt-32 text-gray-500 lg:text-base md:text-base h-full mx-auto items-center">
            Produk Tidak ditemukan
          </p>
        </>
      )}

      {openEdit && (
        <ModalEditProduk data={data} onClose={onClose} refresh={refresh} />
      )}
      {showConfirm && (
        <ConfirmationModal
          message="Apakah Anda yakin ingin menghapus produk ini?"
          onConfirm={handleConfirmDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default CardListProduk;
