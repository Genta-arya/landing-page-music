import React, { useState } from "react";
import { db, storage } from "../../../../services/Firebase/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomImageInput from "./CustomeImageChange";
import { formatRupiah } from "../../../../utils/utils";
const ModalAddProduk = ({ onClose, refresh }) => {
  const [productName, setProductName] = useState("");
  const [discType, setDiscType] = useState(false);
  const [label, setLabel] = useState(false);
  const [productPrice, setProductPrice] = useState(0);
  const [productImage, setProductImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const addProductToFirestore = async (
    productName,
    productPrice,
    productImageUrl
  ) => {
    try {
      const docRef = await addDoc(collection(db, "products"), {
        name: productName,
        price: productPrice,
        image: productImageUrl,
        disc: discType,
        label: label,
        active:true
      });
    } catch (error) {
      console.error("Error adding product to Firestore:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!productImage || !productName || !productPrice) {
      setLoading(false);
      return toast.warning("Field Tidak Boleh kosong");
    }

    try {
      const storageRef = ref(storage, `images/${productImage.name}`);

      const uploadTask = uploadBytes(storageRef, productImage);

      await uploadTask;

      const downloadURL = await getDownloadURL(storageRef);

      await addProductToFirestore(productName, productPrice, downloadURL);

      toast.success("Produk telah ditambahkan!", {
        onClose: () => {
          onClose();
          refresh();
          setLoading(false);
        },
        autoClose: 500,
      });
    } catch (error) {
      toast.error("Error saat mengunggah file:", error);
    } finally {
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg md:w-[80%] w-[90%] lg:w-[50%]">
        <h2 className="lg:text-xl md:text-xl text-base font-bold lg:mb-12 md:mb-8 mb-8 text-center ">Tambah Produk</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label
              htmlFor="productName"
              className="block text-sm font-medium text-gray-700"
            >
              Nama Produk
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              placeholder="Nama Produk"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mt-1  py-1 border px-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-around gap-4 items-center mt-8">
            <div className="mb-4">
              <label
                htmlFor="discType"
                className="block text-sm font-medium text-gray-700"
              >
                Diskon
              </label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={discType}
                    onChange={() => setDiscType(!discType)}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Aktifkan Diskon</span>
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="label"
                className="block text-sm font-medium text-gray-700"
              >
                Label
              </label>
              <div className="mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={label}
                    onChange={() => setLabel(!label)}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Terlaris</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="productPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Harga
            </label>
            <input
              type="text" // Ubah tipe menjadi text
              id="productPrice"
              name="productPrice"
              placeholder="Harga"
              value={formatRupiah(productPrice)}
              onChange={
                (e) =>
                  setProductPrice(Number(e.target.value.replace(/\D/g, ""))) // Hapus karakter selain angka
              }
              className="mt-1 py-1 border px-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <CustomImageInput
              onChange={(file) => setProductImage(file)}
              title={"Tambahkan Gambar"}
            />
          </div>

          <div className="flex flex-col gap-2 ">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full justify-center disabled:bg-gray-500 px-4 py-2 text-sm font-medium text-white bg-sky-400 hover:bg-sky-500 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
            >
              {loading ? "Tunggu..." : "Upload"}
            </button>
            <button
              type="button"
              className="inline-flex w-full justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
              onClick={onClose}
            >
              Batal
            </button>
          </div>
        </form>
      </div>
      <ToastContainer autoClose={500} />
    </div>
  );
};

export default ModalAddProduk;
