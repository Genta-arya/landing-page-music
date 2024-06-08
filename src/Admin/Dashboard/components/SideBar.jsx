import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Redux/slices/AuthSlice";
import Content from "./Content";
import icon from "../../../assets/icon.png";
import Navbar from "./Navbar";
import Menu from "./Menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faSignOut,
  faChevronLeft,
  faChevronRight,
  faChevronCircleRight,
  faChevronCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { toggleSidebar } from "../../../Redux/slices/SideBarSlice";


const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebarOpen = useSelector((state) => state.sidebar.sidebarOpen);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleLogout = async () => {
    dispatch(logout());

    try {
      const auth = getAuth();
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="fixed  flex w-full h-full ">
      <div
        className={`${
          sidebarOpen ? "lg:w-24 md:w-24 w-20" : "w-64"
        }  border-r p-2  border-gray-400 transition-all duration-300 bg-white`}
      >
        <div className="flex flex-col items-center">
          <img
            src={icon}
            alt="icon epok ema"
            className={`${sidebarOpen ? " w-32" : "w-32 h-full"}`}
          />
        
        </div>
        <Menu />

        <div className={`absolute bottom-4 duration-300  ${sidebarOpen ? "left-9" : "left-12" }`} onClick={handleLogout}>
          <li className={`flex justify-center items-center cursor-pointer duration-300 hover:text-red-800 `}>
            <FontAwesomeIcon icon={faSignOut} className="mr-3 text-red-500 " />
            {!sidebarOpen && <span className="text-gray-600">Keluar</span>}
          </li>
        </div>

        <div
          className={` duration-300 absolute hidden md:block lg:block left-24 ${
            sidebarOpen ? "md:left-[70px] lg:left-[75px] lg:top-96  md:top-1/2" : "md:left-40  lg:left-48 lg:top-96  md:top-1/2"
          } p-2 cursor-pointer`}
          onClick={handleToggleSidebar}
        >
          <FontAwesomeIcon
            icon={sidebarOpen ? faChevronCircleRight : faChevronCircleLeft}
            className="text-lg text-sky-500"
          />
        </div>
      </div>
      <div className="w-full overflow-auto ">
        <Navbar />
        
        <div className="px-4 py-8 lg:h-screen md:h-screen h-full  pb-12 ">
          <Content />
      
        </div>
     
      </div>
    </div>
  );
};

export default SideBar;
