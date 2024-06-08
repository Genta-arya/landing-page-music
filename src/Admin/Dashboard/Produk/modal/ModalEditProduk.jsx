import React, { useState } from "react";
import { formatRupiah } from "../../../../utils/utils";
import { ToastContainer, toast } from "react-toastify";
import { db, storage } from "../../../../services/Firebase/FirebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import "react-toastify/dist/ReactToastify.css";
import CustomImageInput from "./CustomeImageChange";

const ModalEditProduk = ({ data, onClose, refresh }) => {
  const [productName, setProductName] = useState(data.name);
  const [productPrice, setProductPrice] = useState(data.price);
  const [productImage, setProductImage] = useState(data.image);
  const [discType, setDiscType] = useState(data.disc);
  const [label, setLabel] = useState(data.label);
  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = productImage;

      if (!productImage || !productName || !productPrice) {
        setLoading(false);
        return toast.warning("Field Tidak Boleh kosong");
      }
      if (newImage) {
        const imageRef = ref(storage, `images/${newImage.name}`);
        await uploadBytes(imageRef, newImage);
        imageUrl = await getDownloadURL(imageRef);
      }

      const productRef = doc(db, "products", data.id);
      await updateDoc(productRef, {
        name: productName,
        price: productPrice,
        image: imageUrl,
        disc: discType,
        label: label,
      });

      toast.success("Produk berhasil diperbarui!", {
        onClose: () => {
          onClose();
          refresh();
          setLoading(false);
        },
        autoClose: 500,
      });
    } catch (error) {
      toast.error("Terjadi kesalahan saat memperbarui produk.");
      console.error("Error updating product: ", error);
    } finally {
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg md:w-[80%] w-[90%] lg:w-[50%] py-4">
        <h2 className="lg:text-xl md:text-xl text-base font-bold lg:mb-12 md:mb-8 mb-6 text-center">
          Edit Produk
        </h2>
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
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="mt-1 py-1 border px-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                  <span className="ml-2 text-xs lg:text-base md:text-base">
                    Aktifkan Diskon
                  </span>
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
                  <span className="ml-2 text-xs lg:text-base md:text-base">
                    Terlaris
                  </span>
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
              type="text"
              id="productPrice"
              name="productPrice"
              required
              placeholder="Harga"
              value={formatRupiah(productPrice)}
              onChange={(e) =>
                setProductPrice(Number(e.target.value.replace(/\D/g, "")))
              }
              className="mt-1 py-1 border px-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <CustomImageInput
              onChange={(file) => setNewImage(file)}
              title={"Ganti Gambar"}
            />
            <div className="mt-4 flex gap-4 justify-center">
              {!newImage && (
                <div className="flex flex-col items-center">
                  <p className="lg:text-sm md:text-sm text-xs mb-1 text-gray-500">
                    Gambar Sekarang:
                  </p>
                  <img
                    src={productImage}
                    alt="Gambar Sebelumnya"
                    className="lg:w-40 md:w-52 w-20 h-full object-cover rounded"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full justify-center disabled:bg-gray-500 px-4 py-2 text-sm font-medium text-white bg-sky-400 hover:bg-sky-500 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500"
            >
              {loading ? "Tunggu..." : "Simpan"}
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

export default ModalEditProduk;
