import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox, faStar, faCog, faDashboard, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { setActiveMenu } from "../../../Redux/slices/MenuSlice";

const Menu = () => {
  const activeMenu = useSelector((state) => state.menu.activeMenu);
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);

  const handleMenuClick = (menu) => {
    dispatch(setActiveMenu(menu));

    localStorage.setItem("activeMenu", menu);
  };

  return (
    <ul className={`flex flex-col  ${sidebarOpen ? "gap-6":"gap-4"} mt-4 px-2`}>
      <li
        className={`duration-300 flex items-center ${
          sidebarOpen ? "justify-center mt-4 ml-1" : ""
        } cursor-pointer ${
          activeMenu === "Master" && !sidebarOpen
            ? "rounded-full border-2 border-sky-400"
            : "text-gray-600"
        } hover:text-gray-900`}
        onClick={() => handleMenuClick("Master")}
      >
        <FontAwesomeIcon
          icon={faDashboard}
          className={`  ${
            sidebarOpen ? "text-3xl  " : "text-base mr-3 ml-3"
          } text-blue-400 ${
            activeMenu === "Master" && sidebarOpen
              ? "border-b-2 border-sky-400"
              : "text-gray-600"
          } hover:text-sky-300`}
        />
        {!sidebarOpen && (
          <span className={` text-center md:text-xs  lg:text-sm ${activeMenu === "Master" ? "text-sky-400 font-bold" : "text-gray-600 font-semibold "}`}>Dashboard Utama</span>
        )}
      </li>
      <li
        className={`duration-300 flex items-center ${
          sidebarOpen ? "justify-center" : ""
        } cursor-pointer ${
          activeMenu === "Produk" && !sidebarOpen
            ? "rounded-full border-2 border-sky-400"
            : "text-gray-600"
        } hover:text-gray-900`}
        onClick={() => handleMenuClick("Produk")}
      >
        <FontAwesomeIcon
          icon={faBox}
          className={` ${
            sidebarOpen ? "text-3xl mr-3 ml-3" : "text-base mr-3 ml-3"
          } text-blue-400 ${
            activeMenu === "Produk" && sidebarOpen
              ? "border-b-2 border-sky-400"
              : "text-gray-600"
          } hover:text-sky-300`}
        />
        {!sidebarOpen && (
          <span className={` text-center  md:text-xs  lg:text-sm ${activeMenu === "Produk" ? "text-sky-400 font-bold" : "text-gray-600 font-semibold "}`}>Produk Amplang</span>
        )}
      </li>
      <li
        className={`duration-300 flex items-center ${
          sidebarOpen ? "justify-center " : ""
        } cursor-pointer ${
          activeMenu === "Ulasan" && !sidebarOpen
            ? "rounded-full border-2 border-sky-400"
            : "text-gray-600"
        } hover:text-gray-900`}
        onClick={() => handleMenuClick("Ulasan")}
      >
        <FontAwesomeIcon
          icon={faStar}
          className={` ${
            sidebarOpen ? "text-3xl mr-0" : "text-base mr-3 ml-3"
          } text-blue-400 ${
            activeMenu === "Ulasan" && sidebarOpen
              ? "border-b-2 border-sky-400"
              : "text-gray-600"
          } hover:text-sky-300`}
        />
        {!sidebarOpen && (
          <span className={` text-center  md:text-xs lg:text-sm ${activeMenu === "Ulasan" ? "text-sky-400 font-bold" : "text-gray-600 font-semibold "}`}>Ulasan Pengguna</span>
        )}
      </li>
      <li
        className={`duration-300 flex items-center ${
          sidebarOpen ? "justify-center " : ""
        } cursor-pointer ${
          activeMenu === "Website" && !sidebarOpen
            ? "rounded-full border-2 border-sky-400"
            : "text-gray-600"
        } hover:text-gray-900`}
        onClick={() => handleMenuClick("Website")}
      >
        <FontAwesomeIcon
          icon={faGlobe}
          className={` ${
            sidebarOpen ? "text-3xl mr-0" : "text-base mr-3 ml-3"
          } text-blue-400 ${
            activeMenu === "Website" && sidebarOpen
              ? "border-b-2 border-sky-400"
              : "text-gray-600"
          } hover:text-sky-300`}
        />
        {!sidebarOpen && (
          <span className={` text-center  md:text-xs lg:text-sm ${activeMenu === "Website" ? "text-sky-400 font-bold" : "text-gray-600 font-semibold "}`}>Setting Website</span>
        )}
      </li>
    </ul>
    
  );
};

export default Menu;
