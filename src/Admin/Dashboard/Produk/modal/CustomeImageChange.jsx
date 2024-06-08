import React, { useState } from "react";

const CustomImageInput = ({ onChange , title }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [fileName, setFileName] = useState("");

  // Function to handle file change
  const handleFileChange = (file) => {
   
    setPreviewImage(URL.createObjectURL(file));
  
    setFileName(file.name);
   
    onChange(file);
  };

 
  const handleButtonClick = () => {
   
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
   
    input.addEventListener("change", (e) => {
      const file = e.target.files[0];
      handleFileChange(file);
    });
  
    input.click();
  };

  
  const handleClearButtonClick = () => {
  
    setPreviewImage(null);
    setFileName("");
   
    onChange(null);
  };

  return (
    <div className="mb-4">
      <label
        htmlFor="productImage"
        className="block text-sm font-medium text-gray-700"
      >
        {title  ?  title  : "Gambar Produk"}
      
      </label>
      {/* Custom button */}
      <div
        className="mt-1 focus:ring-indigo-500 border text-center lg:py-4 md:py-4 py-2 cursor-pointer text-sm focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        onClick={handleButtonClick}
      >
        {previewImage ? "Ganti Gambar" : title}
      </div>
      {/* Display file name if available */}
      {fileName && (
        <div className="mt-1 text-sm text-gray-500 text-center">{fileName}</div>
      )}
      {/* Preview image */}
      {previewImage && (
        <div className="flex justify-center mt-2">
          <img
            src={previewImage}
            alt="Preview"
            className="lg:w-40 w-20 md:w-52 h-full rounded-md border border-gray-300"
          />
        </div>
      )}
      {/* Clear button */}
      {previewImage && (
        <div className="mt-2 flex justify-center">
          <button
            className="text-sm text-red-600 hover:text-red-800"
            onClick={handleClearButtonClick}
          >
            Hapus Gambar
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomImageInput;
