import  { useEffect, useState } from "react";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";


import { toast } from "react-toastify";
import { db } from "../Firebase/FirebaseConfig";
const useThemeKomposisi = () => {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newData = [...data];
    newData[index][name] = value;
    setData(newData);
  };

  const handleImageChange = (index, event) => {
    const file = event.target.files[0];

    if (file) {
        if (file.size <= 500 * 1024) { 
            const reader = new FileReader();
            reader.onloadend = () => {
                const newData = [...data];
                newData[index]["image"] = reader.result;
                newData[index]["fileName"] = file.name; 
                setData(newData);
            };
            reader.readAsDataURL(file);
        } else {
            toast.info('Ukuran gambar harus kurang dari 500KB.');
            event.target.value = null; 
        }
    }
};


  const removeImage = (index) => {
    const newData = [...data];

    newData[index]["image"] = "";
    setData(newData);
  };

  const addNewContent = () => {
    if (data.length < 8) {
      // Batasi jumlah maksimum konten
      const newContent = {
        id: data.length + 1,
        name: "",
        description: "",
        image: "",
        delay: 0.5,
      };
      setData([...data, newContent]);
    } else {
      toast.info("Maksimum 8 konten.");
    }
  };

  const removeContent = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };
  const resetData = () => {
    window.location.reload();
  };
  const saveData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "ThemesKomposisi"))
      );
      const latestTheme = querySnapshot.docs[0];
      const themeId = latestTheme.id;

      await updateDoc(doc(db, "ThemesKomposisi", themeId), {
        data,
      });
      fetcHData();

      setLoading(false);
      toast.success("Theme Komposisi berhasil diperbarui!");
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetcHData = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "ThemesKomposisi"))
      );
      const latestTheme = querySnapshot.docs[0].data();

      setData(latestTheme.data);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetcHData();
  }, []);
  return {
    data,
    refresh: fetcHData,
    saveData,
    removeContent,
    removeImage,
    addNewContent,
    resetData,
    handleImageChange,
    handleInputChange,
    loading,
  };
};

export default useThemeKomposisi;
