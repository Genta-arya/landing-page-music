import React, { useEffect, useState } from "react";
import { db } from "../Firebase/FirebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const useUlasan = () => {
  const [ulasan, setUlasan] = useState([]);
  const [sortBy, setSortBy] = useState("highest");
  const [loading, setLoading] = useState(true);
  const fetchUlasan = async () => {
    try {
      const ulasanRef = collection(db, "comments");
      const q = query(
        ulasanRef,
        orderBy("rating", sortBy === "highest" ? "desc" : "asc")
      );
      const querySnapshot = await getDocs(q);
      const ulasanData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUlasan(ulasanData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUlasan();
  }, [sortBy]);

  const handleSortChange = () => {
    setSortBy(sortBy === "highest" ? "lowest" : "highest");
  };

  return { ulasan, loading, handleSortChange, refresh: fetchUlasan ,setUlasan , sortBy};
};

export default useUlasan;
