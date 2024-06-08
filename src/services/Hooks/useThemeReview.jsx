import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, query, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db ,storage} from "../Firebase/FirebaseConfig";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useThemeReview = () => {
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState(
    ""
  );
  const [backgroundColor, setBackgroundColor] = useState("#DCF2F1");
  const [backgroundColorText, setBackgroundColorText] = useState("#4B5563");
  const [image, setImage] = useState(null);
  const [imageApi,setImageApi]= useState(null)
 const [loading,setLoading] = useState(false)
  const handleColorChange = (e) => {
    setBackgroundColor(e.target.value);
  };
  const handleColorTextChange = (e) => {
    setBackgroundColorText(e.target.value);
  };

  const handleImageChange = (selectedImage) => {
    setImage(selectedImage);
  };

  const editThemeReview = async () => {

      setLoading(true);
    try {
        let imageURL = null;
        if (image) {
          const imageRef = ref(
            storage,
            `images/${Math.floor(Math.random() * 10000)}`
          );
          await uploadBytes(imageRef, image);
          imageURL = await getDownloadURL(imageRef);
        }
    
        
        const querySnapshot = await getDocs(query(collection(db, "ThemesReview")));
        const latestTheme = querySnapshot.docs[0];
        const themeId = latestTheme.id;
  
        await updateDoc(doc(db, "ThemesReview", themeId), {
          subtitle,
          content,
          backgroundColor,
          backgroundColorText,
          imageURL: imageURL || imageApi,
        });
        fetchDefaultData();
        setLoading(false)
    
        toast.success('Theme Branding berhasil diperbarui!');
        
    } catch (error) {
        toast.error(error)
    } finally {
        setLoading(false)
    }
   
  };

  const fetchDefaultData = async () => {
    setLoading(true)
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "ThemesReview"))
      );
      const latestTheme = querySnapshot.docs[0].data();

      if (latestTheme) {
        setSubtitle(latestTheme.subtitle);
        setContent(latestTheme.content);
        setBackgroundColor(latestTheme.backgroundColor);
        setBackgroundColorText(latestTheme.backgroundColorText);
        setImageApi(latestTheme.imageURL);
      }
    } catch (error) {
      console.error("Error fetching default theme data:", error);
    } finally{
        setLoading(false)
    }
  };
  useEffect(() => {
    fetchDefaultData();
  }, []);
  return {
    refresh: fetchDefaultData,
    setBackgroundColor,
    setBackgroundColorText,
    setContent,
    setImage,
    setImageApi,
    setSubtitle,
    handleColorChange,
    handleColorTextChange,
    handleImageChange,
    editThemeReview,
    subtitle,
    content,
    backgroundColor,
    backgroundColorText,
    image,
    imageApi,
    loading
  };
};

export default useThemeReview;
