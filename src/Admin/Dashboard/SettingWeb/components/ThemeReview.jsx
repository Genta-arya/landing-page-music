import React from "react";
import { ToastContainer } from "react-toastify";
import useThemeReview from "../../../../services/Hooks/useThemeReview";
import Review from "../../../../components/Review";
import CustomImageInput from "../../Produk/modal/CustomeImageChange";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ThemeReview = () => {
  const {
    setBackgroundColor,
    setSubtitle,
    setContent,
    editThemeReview,
    refresh,
    content,
    subtitle,
    backgroundColor,
    backgroundColorText,
    image,
    imageApi,
    loading,
    handleImageChange,
    setBackgroundColorText,
    setImage,
    handleColorChange,
    handleColorTextChange,
  } = useThemeReview();

  return (
    <>
      <div className="mb-8 bg-white lg:p-6 p-4 rounded-lg shadow-md">
       
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Paragraph-1:</label>
          <textarea
            value={subtitle}
            rows={4}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Paragraph-2:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
          />
        </div>
        <div className="mt-4">
          <CustomImageInput onChange={handleImageChange} title="Change Image" />
        </div>
      </div>

      {/* Website Preview */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <p className="flex justify-center mt-4 font-bold">Preview</p>
        <div className="-mt-20">
          <Review
            image={image} // Use selected image file
            paragraf1={subtitle}
            paragraf2={content}
            color={backgroundColor}
            colorText={backgroundColorText}
          />
        </div>
      </div>

      {/* Color Picker */}
      <div className="border border-black p-4 rounded-xl mt-4">
        <p className="text-center font-bold lg:text-base md:text-base text-sm">
          Pengaturan Tema
        </p>
        <div className="mb-4 mt-4">
          <label className="block text-gray-700 mb-2 font-bold lg:text-base md:text-base text-sm">
            Ganti Warna Latar
          </label>
          <input
            type="color"
            value={backgroundColor}
            onChange={handleColorChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4 mt-4">
          <label className="block text-gray-700 mb-2 font-bold lg:text-base md:text-base text-sm">
            Ganti Warna Text
          </label>
          <input
            type="color"
            value={backgroundColorText}
            onChange={handleColorTextChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="flex justify-center">
          <button
            disabled={loading}
            className="bg-sky-400 hover:bg-sky-500 ease-in disabled:bg-gray-500 text-white px-4 py-2 w-80 rounded-lg mt-8 "
            onClick={editThemeReview}
          >
            <FontAwesomeIcon icon={faSave} className="mr-2" />
            {loading ? "Tunggu sebentar" : "Simpan"}
          </button>
        </div>
      </div>
      <ToastContainer autoClose={1500} />
    </>
  );
};

export default ThemeReview;
