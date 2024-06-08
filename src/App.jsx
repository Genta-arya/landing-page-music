import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Review from "./components/Review";
import Product from "./components/Product";
import Fq from "./components/FQ";
import Maps from "./components/Maps";
import ScrollOnTop from "./components/ScrollOnTop";
import { motion, useAnimation } from "framer-motion";
import SplashScreen from "./components/SplashScreen";
import ReactGA from "react-ga4";
import KontakKami from "./components/KontakKami";
import Komentar from "./components/Komentar";
const App = () => {
  const [isVisibleHeader, setIsVisibleHeader] = useState(false);
  const [isVisibleReview, setIsVisibleReview] = useState(false);
  const [isVisibleProduct, setIsVisibleProduct] = useState(false);
  const [isVisibleFq, setIsVisibleFq] = useState(false);
  const [isVisibleMaps, setIsVisibleMaps] = useState(false);
  const [isVisibleFooter, setIsVisibleFooter] = useState(false);
  const [VisibleSplashScreen, setVisibleSplashScreen] = useState(true);
  const controlsHeader = useAnimation();
  const controlsReview = useAnimation();
  const controlsProduct = useAnimation();
  const controlsFq = useAnimation();
  const controlsMaps = useAnimation();
  const controlsFooter = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Tentukan nilai trigger offset untuk setiap komponen
      const headerOffset = 100;
      const reviewOffset = 400;
      const productOffset = 850;
      const fqOffset = 850;
      const mapsOffset = 850;
      const footerOffset = 600;

      setIsVisibleHeader(scrollY > headerOffset);
      setIsVisibleReview(scrollY > reviewOffset);
      setIsVisibleProduct(scrollY > productOffset);
      setIsVisibleFq(scrollY > fqOffset);
      setIsVisibleMaps(scrollY > mapsOffset);
      setIsVisibleFooter(scrollY > footerOffset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isVisibleHeader) {
      controlsHeader.start({ opacity: 1, y: 0, scale: 1 });
    }
  }, [isVisibleHeader, controlsHeader]);

  useEffect(() => {
    if (isVisibleReview) {
      controlsReview.start({ opacity: 1, y: 0, scale: 1 });
    }
  }, [isVisibleReview, controlsReview]);

  useEffect(() => {
    if (isVisibleProduct) {
      controlsProduct.start({ opacity: 1, y: 0, scale: 1 });
    }
  }, [isVisibleProduct, controlsProduct]);

  useEffect(() => {
    if (isVisibleFq) {
      controlsFq.start({ opacity: 1, y: 0, scale: 1 });
    }
  }, [isVisibleFq, controlsFq]);

  useEffect(() => {
    if (isVisibleMaps) {
      controlsMaps.start({ opacity: 1, y: 0, scale: 1 });
    }
  }, [isVisibleMaps, controlsMaps]);

  useEffect(() => {
    if (isVisibleFooter) {
      controlsFooter.start({ opacity: 1, y: 0, scale: 1 });
    }
  }, [isVisibleFooter, controlsFooter]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleSplashScreen(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
    });
  }, []);

  return (
    <main className="min-h-screen w-full relative">
      <Helmet>
        <title>Anchay Sewa Orgen Tunggal - Musik Pernikahan Ketapang Kalimantan Barat</title>
        <meta
          name="description"
          content="Anchay Sewa Orgen Tunggal menghadirkan musik yang memukau untuk pernikahan Anda. Dengan alat musik berkualitas tinggi dan musisi profesional, kami memastikan setiap momen istimewa Anda diiringi oleh lantunan nada yang indah."
        />
        <meta
          name="keywords"
          content="Sewa Orgen Tunggal, Musik Pernikahan, Orgen Tunggal, Layanan Musik Pernikahan, Anchay Orgen Tunggal, Musisi Pernikahan, Musik Acara, Musik Pernikahan Profesional"
        />
        <meta
          property="og:title"
          content="Anchay Sewa Orgen Tunggal - Musik Pernikahan Ketapang Kalimantan Barat"
        />
        <meta
          property="og:description"
          content="Anchay Sewa Orgen Tunggal menghadirkan musik yang memukau untuk pernikahan Anda. Dengan alat musik berkualitas tinggi dan musisi profesional, kami memastikan setiap momen istimewa Anda diiringi oleh lantunan nada yang indah."
        />
        <meta property="og:url" content="http://www.anchayorgen.com" />
        <meta property="og:type" content="website" />
      </Helmet>
      {VisibleSplashScreen ? (
        <SplashScreen />
      ) : (
        <>
          <Header />
          <Content />
          <motion.div
            animate={controlsReview}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            <Review />
          </motion.div>
          <motion.div
            animate={controlsProduct}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            <Product />
          </motion.div>
          <motion.div
            animate={controlsFq}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            <Fq />
          </motion.div>
          <motion.div
            animate={controlsMaps}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            <Maps />
            <Komentar />
          </motion.div>
          <ScrollOnTop />

          <motion.div
            animate={controlsFooter}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            <Footer />
          </motion.div>
        </>
      )}
    </main>
  );
};

export default App;
