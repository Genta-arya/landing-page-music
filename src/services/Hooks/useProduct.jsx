import { useEffect, useState } from "react";
import { db } from "../Firebase/FirebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const useProduct = () => {
  const [produkList, setProdukList] = useState([]);
  const [activeProdukList, setActiveProdukList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProductsFromFirestore = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "products"), orderBy("price"))
      );
      const products = [];
      const activeProducts = [];
      querySnapshot.forEach((doc) => {
        const product = {
          id: doc.id,
          ...doc.data(),
        };
        products.push(product);
        if (product.active) {
          activeProducts.push(product);
        }
      });
      setProdukList(products);
      setActiveProdukList(activeProducts);
    } catch (error) {
      console.error("Error fetching produk list:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductsFromFirestore();
  }, []);

  // Hitung jumlah produk yang aktif dan tidak aktif
  const jumlahProdukAktif = activeProdukList.length;
  const jumlahProdukNonAktif = produkList.length - jumlahProdukAktif;

  // Hitung jumlah produk diskon yang aktif dan tidak aktif
  const jumlahProdukDiskonAktif = activeProdukList.filter(product => product.disc).length;
  const jumlahProdukDiskonNonAktif = jumlahProdukAktif - jumlahProdukDiskonAktif;

  // Hitung jumlah produk dengan label yang benar atau salah
  const jumlahProdukLabelTrue = produkList.filter(product => product.label === true).length;
  const jumlahProdukLabelFalse = produkList.length - jumlahProdukLabelTrue;

  return { 
    produkList, 
    activeProdukList, 
    loading, 
    getProductsFromFirestore ,
    setProdukList,
    jumlahProdukAktif,
    jumlahProdukNonAktif,
    jumlahProdukDiskonAktif,
    jumlahProdukDiskonNonAktif,
    jumlahProdukLabelTrue,
    jumlahProdukLabelFalse
  };
};

export default useProduct;
