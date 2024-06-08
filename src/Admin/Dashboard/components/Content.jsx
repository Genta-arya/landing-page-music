import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Produk from "../Produk/Produk";
import Ulasan from "../Ulasan/Ulasan";
import PageMaster from "../Master/PageMaster";
import PageSettingWeb from "../SettingWeb/Page";
import { setActiveMenu } from "../../../Redux/slices/MenuSlice";

const Content = () => {
  const activeMenu = useSelector((state) => state.menu.activeMenu);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedActiveMenu = localStorage.getItem("activeMenu");
    if (storedActiveMenu) {
      dispatch(setActiveMenu(storedActiveMenu));
    }
  }, []);

  return (
    <div className=" ">
      <div className="lg:px-10 pb-8">
        {activeMenu === "Ulasan" && <Ulasan />}
        {activeMenu === "Master" && <PageMaster />}
        {activeMenu === "Produk" && <Produk />}
        {activeMenu === "Website" && <PageSettingWeb />}
      </div>
    </div>
  );
};

export default Content;
