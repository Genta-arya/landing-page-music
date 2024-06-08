import React, { useState, useEffect } from "react";
import { db } from "../services/Firebase/FirebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { formatTimeAgo } from "../utils/utils";
import Rating from "./Rating";

const KomentarList = ({ refresh, setRefresh }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRating, setSelectedRating] = useState(null); 

  const fetchComments = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "comments"));
      const fetchedComments = [];
      querySnapshot.forEach((doc) => {
        fetchedComments.push({ id: doc.id, ...doc.data() });
      });

    
      fetchedComments.sort(
        (a, b) => b.timestamp.toMillis() - a.timestamp.toMillis()
      );

      // Mengambil 5 komentar terbaru
      const latestComments = fetchedComments.slice(0, 5);

      const filteredComments = selectedRating
        ? latestComments.filter((comment) => comment.rating === selectedRating)
        : latestComments;

      setComments(filteredComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (refresh) {
      fetchComments();
      setRefresh(false);
    } else {
      fetchComments();
    }
  }, [refresh, selectedRating]);

  const handleRatingChange = (e) => {
    const selectedValue = parseInt(e.target.value);
    setSelectedRating(selectedValue);
  };

  return (
    <div className="max-w-full mx-auto md:px-10 px-2 lg:px-72">
      <div className="flex items-center lg:justify-between md:justify-between justify-between lg:flex-row md:flex-row flex-row mb-4 ">
        <h2 className="lg:text-2xl md:text-xl text-sm font-semibold ">
          Ulasan Pelanggan
        </h2>
        <div>
          <select
            id="ratingFilter"
            onChange={handleRatingChange}
            value={selectedRating || ""}
            className="lg:py-2 py-1 md:py-2  border px-2 rounded-md text-sm bg-sky-400 text-white hover:bg-sky-500 focus:outline-none"
          >
            <option value="" className="bg-white text-gray-500 ">
              Semua
            </option>
            <option value="1" className="bg-white text-gray-500">
              1 Bintang
            </option>
            <option value="2" className="bg-white text-gray-500">
              2 Bintang
            </option>
            <option value="3" className="bg-white text-gray-500">
              3 Bintang
            </option>
            <option value="4" className="bg-white text-gray-500">
              4 Bintang
            </option>
            <option value="5" className="bg-white text-gray-500">
              5 Bintang
            </option>
          </select>
        </div>
      </div>
      {!loading ? (
        <>
          {comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-4 bg-white rounded-lg shadow-md px-4"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <h3 className="text-base font-bold lg:text-lg md:text-lg">
                        {comment.name.length > 15
                          ? comment.name.slice(0, 15) + "..."
                          : comment.name}
                      </h3>{" "}
                      <p className="text-xs text-gray-500 mb-2">{comment.region}</p>
                      <Rating rating={comment.rating} />
                    </div>
                    <span className="text-xs md:text-sm lg:text-sm text-gray-500">
                      {formatTimeAgo(comment.timestamp)}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm  lg:text-base md:text-base">{comment.comment}</p>{" "}
                </div>
              ))}
            </div>
          ) : (
            <>
              <p className="md:text-base text-center text-bold">
                Belum ada ulasan
              </p>
            </>
          )}
        </>
      ) : (
        <>
          <p className="md:text-base text-center text-bold">Memuat ulasan...</p>
        </>
      )}
    </div>
  );
};

export default KomentarList;
