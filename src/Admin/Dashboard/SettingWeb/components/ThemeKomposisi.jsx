import React from "react";
import Content from "../../../../components/Content";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faTrash,
  faSyncAlt,
  faSave,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { ToastContainer } from "react-toastify";
import useThemeKomposisi from "../../../../services/Hooks/useThemeKomposisi";
import Loading from "../../../Auth/components/Loading";

const ThemeKomposisi = () => {
  const {
    data,
    addNewContent,
    handleImageChange,
    handleInputChange,
    loading,
    removeContent,
    removeImage,
    resetData,
    saveData,
  } = useThemeKomposisi();

  if (loading) return <Loading />;

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden pb-12">
        <div className="p-4">
          {data.map((item, index) => (
            <div key={item.id} className="mb-4">
              <h3 className="font-bold mb-2">Konten {index + 1}</h3>
              <textarea
                rows={4}
                name="name"
                value={item.name}
                onChange={(event) => handleInputChange(index, event)}
                placeholder="Name"
                className="border rounded-md p-2 mb-2 w-full"
              />
              <textarea
                name="description"
                rows={4}
                value={item.description}
                onChange={(event) => handleInputChange(index, event)}
                placeholder="Description"
                className="border rounded-md p-2 mb-2 w-full"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleImageChange(index, event)}
                className="border rounded-md p-2 mb-2 w-full"
              />
              {item.image ? (
                <div className="flex justify-center items-center">
                  <img
                    src={item.image}
                    alt={`Image ${index}`}
                    className="w-20 mb-2"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="bg-red-500 text-xs  text-white px-2 py-1 rounded-full ml-2 -mt-3"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              ) : (
                <p className="text-center mt-2 text-gray-500">
                  Tidak ada gambar
                </p>
              )}

              <div className="flex justify-center">
                <button
                  onClick={() => removeContent(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-2 text-xs"
                >
                  <div className="flex items-center gap-4">
                    <FontAwesomeIcon icon={faTrash} />
                    <p> Hapus Konten {index + 1}</p>
                  </div>
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={addNewContent}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full mt-4"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Tambah Konten
          </button>
          <button
            onClick={resetData}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-full mt-2"
          >
            <FontAwesomeIcon icon={faSyncAlt} className="mr-2" />
            Reset
          </button>
        </div>
        <p className="flex justify-center mt-4 font-bold">Preview</p>
        <div className="md:mt-40 mt-16">
          <Content data={data} />
        </div>
        <div className="flex justify-center">
          <button
            onClick={saveData}
            disabled={loading}
            className="bg-sky-400 hover:bg-sky-500 ease-in disabled:bg-gray-500 text-white px-4 py-2 w-80 rounded-lg mt-8 "
          >
            <FontAwesomeIcon icon={faSave} className="mr-2" />
            {loading ? "Tunggu sebentar" : "Simpan"}
          </button>
        </div>
      </div>
      <ToastContainer autoClose={1500} />
    </div>
  );
};

export default ThemeKomposisi;
