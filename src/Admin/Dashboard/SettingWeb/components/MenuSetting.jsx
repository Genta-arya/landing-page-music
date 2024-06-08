import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveMenuSetting } from "../../../../Redux/slices/MenuSetting";
import ThemeHeader from "./ThemeHeader";
import ThemeKomposisi from "./ThemeKomposisi";
import ThemeReview from "./ThemeReview";
import { Link } from "react-router-dom";

const MenuSetting = () => {
  const activeMenuSetting = useSelector(
    (state) => state.menuSetting.activeMenuSetting
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const storedMenuSetting = localStorage.getItem("activeMenuSetting");
    if (storedMenuSetting) {
      dispatch(setActiveMenuSetting(storedMenuSetting));
    }
  }, [dispatch]);

  const handleMenuClick = (menu) => {
    dispatch(setActiveMenuSetting(menu));
    localStorage.setItem("activeMenuSetting", menu);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center ">
        <p className="lg:text-lg md:text-lg text-sm font-bold md:w-auto lg:w-auto w-32">
          Setting Layout Website
        </p>
        <Link
          to={"/"}
          className="font-bold lg:text-lg md:text-lg text-sm  hover:text-sky-400 hover:underline"
        >
          Lihat live
        </Link>
      </div>
      <hr className="border-b border-gray-400 mt-4" />
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={() => handleMenuClick("Header")}
          className={`lg:px-4 lg:py-2 lg:text-base md:text-base text-xs py-1 px-2 md:px-3 md:py-1 rounded-md focus:outline-none ${
            activeMenuSetting === "Header"
              ? "bg-sky-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Header
        </button>
        <button
          onClick={() => handleMenuClick("Komposisi")}
          className={`lg:px-4 lg:py-2  lg:text-base md:text-base text-xs py-1 px-2 md:px-3 md:py-1 rounded-md focus:outline-none ${
            activeMenuSetting === "Komposisi"
              ? "bg-sky-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Komposisi
        </button>
        <button
          onClick={() => handleMenuClick("Review")}
          className={`lg:px-4 lg:py-2 lg:text-base md:text-base py-1 px-2 md:px-3 md:py-1 text-xs rounded-md focus:outline-none ${
            activeMenuSetting === "Review"
              ? "bg-sky-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Branding
        </button>
      </div>
      <div className="content mt-4">
        {activeMenuSetting === "Header" && <ThemeHeader />}
        {activeMenuSetting === "Komposisi" && <ThemeKomposisi />}
        {activeMenuSetting === "Review" && <ThemeReview />}
      </div>
    </div>
  );
};

export default MenuSetting;
