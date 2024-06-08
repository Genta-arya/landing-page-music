import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import menuReducer from "./slices/MenuSlice";
import sideBarReducer from "./slices/SideBarSlice";
import MenuSetting from "./slices/MenuSetting";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
    menuSetting: MenuSetting,
    sidebar: sideBarReducer,
  },
});
