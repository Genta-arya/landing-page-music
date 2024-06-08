import React from "react";
import SideBar from "./components/SideBar";

import useCheckLogin from "../../services/Hooks/useCheckLogin";
import Loading from "../Auth/components/Loading";
import { Helmet } from "react-helmet";

const PageDashboard = () => {
  const { user, loading } = useCheckLogin();

  return (
    <div className="">
      <Helmet>
        <title>AFC Sewa Orgen Tunggal - Dashboard</title>

        <meta property="og:title" content="Amplang Epok Ema - Dashboard" />
      </Helmet>

      {loading ? (
        <Loading />
      ) : user ? (
        <>
          <SideBar />
        </>
      ) : (
        <div className="text-center h-screen mx-auto flex justify-center">
          User not logged in
        </div>
      )}
    </div>
  );
};

export default PageDashboard;
