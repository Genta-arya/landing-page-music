import React, { useState, useEffect } from "react";
import KomentarList from "./KomentarList";
import { Filters } from "../utils/utils";
import RendersStar from "./RendersStar";
import { db } from "../services/Firebase/FirebaseConfig";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

const Komentar = () => {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [userIP, setUserIP] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [rating, setRating] = useState(0);
  const [isIpExist, setIsIpExist] = useState(false); // State untuk menentukan apakah IP sudah ada
  const [loading, setLoading] = useState(false);
  const filter = Filters();
  const [userLocation, setUserLocation] = useState(null);
  const fetchIPDetails = async (ipAddress) => {
    try {
      const response = await fetch(`https://ipapi.co/${ipAddress}/json/`);
      const data = await response.json();
      setUserLocation(data);
      
    } catch (error) {
      console.error("Error fetching IP details:", error);
    }
  };

  const fetchIP = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      setUserIP(data.ip);

      const ipQuery = query(
        collection(db, "comments"),
        where("userIP", "==", data.ip)
      );
      const ipQuerySnapshot = await getDocs(ipQuery);
      setIsIpExist(!ipQuerySnapshot.empty);

      // Mendapatkan detail alamat dari alamat IP
      await fetchIPDetails(data.ip);
    } catch (error) {
      console.error("Error fetching IP:", error);
    }
  };
  
  

  useEffect(() => {
    fetchIP();
  }, [isIpExist]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // Memeriksa panjang input
    if (inputValue.length <= 500) {
      setComment(inputValue);
    } else {
      setComment(inputValue.slice(0, 500));
    }
  };

  const handleNameChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 30) {
      setName(inputValue);
    } else {
      setName(inputValue.slice(0, 30));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRefresh(true);
    if (comment.trim() && name.trim() && !isIpExist) {
      const censoredComment = filter.clean(comment);

      try {
        const timestamp = Timestamp.fromDate(new Date());

        await addDoc(collection(db, "comments"), {
          comment: censoredComment,
          name: name,
          userIP: userIP,
          rating: rating,
          region: userLocation.region,
          timestamp: timestamp,
        });

        fetchIP();
        toast.success("Ulasan Terkirim");
      } catch (error) {
        console.error("Error saat menyimpan komentar:", error);
      } finally {
        setLoading(false);
      }

      setComment("");
      setName("");
      setRating(0);
    }
  };

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        onClick={() => handleStarClick(index)}
        className={`w-4 h-4 text-yellow-300 me-1 cursor-pointer ${
          index < rating ? "fill-current" : "stroke-current"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 22 20"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 0l3.09 6.26L21 7.27l-5 4.87L17.18 20 11 16.27 4.82 20l1.09-7.86L1 7.27l6.91-1.01L11 0z"
        />
      </svg>
    ));
  };

  return (
    <>
      <hr className="border-t mt-4"></hr>
      <div className="lg:px-96 md:px-10 px-4 flex flex-col gap-4 mt-8 mb-4">
        <div className="flex items-center justify-center mb-0 -mt-14 ">
          <RendersStar />
        </div>
        <p className="text-lg font-bold lg:w-96 md:w-96 w-72 mt-4 -mb-4 p">
          <span>Ayo Berikan Ulasan  kepuasan kalian</span> <span className="text-red-500">Tentang Amplang kami </span>
        </p>
        <form className="border border-gray-300 px-4 md:px-8  lg:pb-8 lg:pt-8 lg:pl-12 lg:pr-12 rounded-lg mt-4" onSubmit={handleFormSubmit}>
          <div className="mb-2 ">
            <label
              htmlFor="name-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Name
            </label>
            <input
              type="text"
              placeholder="Nama kamu"
              required
              id="name-input"
              value={name}
              onChange={handleNameChange}
              className=" border px-4 py-2 border-gray-400 text-gray-900 text-sm rounded-lg  block w-full p-2.5 focus:outline-none "
            />
          </div>

          <div>
            <div className="flex items-center border border-gray-400 py-2 rounded-lg px-4 justify-start mb-2 mt-2 ">
              <p className="mr-2 text-sm text-gray-400">Rating</p>{" "}
              {renderStars()}
            </div>
          </div>

          <div className="w-full mb-4 border border-gray-400 rounded-lg bg-gray-50">
            <div className="px-4 py-2 bg-white rounded-t-lg">
              <label htmlFor="comment" className="sr-only">
                Your comment
              </label>
              <textarea
                id="comment"
                rows={4}
                value={comment}
                onChange={handleInputChange}
                className="w-full px-0 text-sm text-gray-900 bg-white border-0  focus:outline-none"
                placeholder="Tulis ulasan disini..."
                required
              />
            </div>
            <div className="flex items-center justify-center px-3 py-2 border-t border-gray-400 ">
              <button
                type="submit"
                disabled={isIpExist || loading}
                className={`inline-flex  items-center py-2.5 px-4 text-xs font-medium text-center text-white rounded-lg focus:outline-none ${
                  isIpExist
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-sky-400 hover:bg-sky-500"
                }`}
              >
                {isIpExist
                  ? "Ulasan Terkirim"
                  : "Submit Ulasan" && loading
                  ? "Mengirim Ulasan..."
                  : "Submit Ulasan"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <hr className="border-t mt-4 mb-8"></hr>
      <KomentarList refresh={refresh} setRefresh={setRefresh} />
      <ToastContainer />
    </>
  );
};

export default Komentar;
