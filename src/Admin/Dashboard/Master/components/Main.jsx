import React from "react";
import { useDispatch } from "react-redux";
import { setActiveMenu } from "../../../../Redux/slices/MenuSlice";
import useUlasan from "../../../../services/Hooks/useUlasan";
import useProduct from "../../../../services/Hooks/useProduct";
import Chart from "react-apexcharts";
const MasterMain = () => {
  const { loading: ulasanLoading, ulasan } = useUlasan();
  const {
    loading: productLoading,
    jumlahProdukAktif,
    jumlahProdukNonAktif,
    jumlahProdukDiskonAktif,
    jumlahProdukDiskonNonAktif,
    jumlahProdukLabelTrue,
    jumlahProdukLabelFalse,
  } = useProduct();

  const dispatch = useDispatch();

  const handleMenuClick = (menu) => {
    dispatch(setActiveMenu(menu));
  };

  const jumlahUlasan = ulasan?.length || 0;

  const pieChartData = [jumlahProdukAktif, jumlahProdukNonAktif];

  const pieChartDataDiskonAktifNonAktif = [
    jumlahProdukDiskonAktif,
    jumlahProdukDiskonNonAktif,
  ];

  const pieChartDataLabelTrueFalse = [
    jumlahProdukLabelTrue,
    jumlahProdukLabelFalse,
  ];

  const pieChartLabels = ["Aktif", "Non-Aktif"];

  const pieChartOptions = {
    labels: pieChartLabels,
    legend: {
      show: true,
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
    },
    colors: ["#4CAF50", "#FF0000"],
  };

  const seriesData = [
    {
      name: "Jumlah Ulasan",
      data: [jumlahUlasan],
    },
  ];

  const chartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },

    xaxis: {
      categories: ["Jumlah Ulasan"],
    },
  };

  // Tampilkan loading spinner selama data dimuat
  if (ulasanLoading || productLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-base text-gray-500">Memuat Data...</div>
      </div>
    );
  }
  return (
    <>
      <div className="  items-center mb-4 mt-4 ">
        <p className="lg:text-lg md:text-lg text-sm font-semibold text-gray-500">
          Dashboard
        </p>
      </div>
      <hr className="border-b mb-8"></hr>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 w-full">
        <div className="bg-white rounded-lg shadow-md p-6 w-full shadow-black">
          <div className="flex gap-2 items-center justify-between mb-4">
            <h2
              className="text-xs lg:text-base md:text-base hover:cursor-pointer hover:text-gray-700 hover:underline font-semibold "
              onClick={() => handleMenuClick("Produk")}
            >
              Jumlah Produk
            </h2>
            <p className="bg-red-500 text-white rounded-full py-1 px-3 text-sm">
              {jumlahProdukAktif + jumlahProdukNonAktif}
            </p>
          </div>
          <Chart
            options={pieChartOptions}
            series={pieChartData}
            type="donut"
            width="80%"
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 w-full shadow-black">
          <div className="flex gap-2 items-center justify-between mb-4">
            <h2
              className="text-xs lg:text-base md:text-base hover:cursor-pointer hover:text-gray-700 hover:underline font-semibold "
              onClick={() => handleMenuClick("Ulasan")}
            >
              Jumlah Ulasan
            </h2>
            <p className="bg-red-500 text-white rounded-full py-1 px-3 text-sm">
              {jumlahUlasan}
            </p>
          </div>
          <Chart
            options={chartOptions}
            series={seriesData}
            type="bar"
            width="100%"
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 w-full shadow-black">
          <div className="flex gap-2 items-center justify-between mb-4">
            <h2
              className="text-xs lg:text-base md:text-base hover:cursor-pointer hover:text-gray-700 hover:underline font-semibold  "
              onClick={() => handleMenuClick("Produk")}
            >
              Produk Diskon
            </h2>
            <p className="bg-red-500 text-white rounded-full py-1 px-3 text-sm">
              {jumlahProdukDiskonAktif}
            </p>
          </div>
          <Chart
            options={pieChartOptions}
            series={pieChartDataDiskonAktifNonAktif}
            type="pie"
            width="80%"
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 w-full shadow-black ">
          <div className="flex gap-2 items-center justify-between mb-4">
            <h2
              className="text-xs lg:text-base md:text-base hover:cursor-pointer hover:text-gray-700 hover:underline font-semibold "
              onClick={() => handleMenuClick("Produk")}
            >
              Produk Laris
            </h2>
            <p className="bg-red-500 text-white rounded-full py-1 px-3 text-sm">
              {jumlahProdukLabelTrue}
            </p>
          </div>

          <Chart
            options={pieChartOptions}
            series={pieChartDataLabelTrueFalse}
            type="pie"
            width="80%"
          />
        </div>
      </div>
    </>
  );
};

export default MasterMain;
