import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import icon from "../assets/icon.png";
import useThemeReview from "../services/Hooks/useThemeReview";
import Loading from "../Admin/Auth/components/Loading";
import video from "../assets/video.mp4";

const Review = ({ image, paragraf1, paragraf2, color, colorText }) => {
  const {
    loading,
    content: defaultContent,
    subtitle: defaultSubtitle,
    backgroundColor: defaultBackgroundColor,
    backgroundColorText: defaultBackgroundColorText,
    image: imageState,
    setBackgroundColor,
    setBackgroundColorText,
    setSubtitle,
    setContent,
    setImage,
    imageApi: defaultImage,
  } = useThemeReview();

  useEffect(() => {
    if (image instanceof Blob) {
      const blobUrl = URL.createObjectURL(image);
      setImage(blobUrl);
    }

    if (colorText) setBackgroundColorText(colorText);
  }, [image]);

  useEffect(() => {
    if (paragraf1) {
      setSubtitle(paragraf1);
    }
  }, [paragraf1]);

  useEffect(() => {
    if (paragraf2) {
      setContent(paragraf2);
    }
  }, [paragraf2]);

  useEffect(() => {
    if (color) {
      setBackgroundColor(color);
    }
  }, [color]);

  useEffect(() => {
    if (colorText) {
      setBackgroundColorText(colorText);
    }
  }, [colorText]);

  // if (loading) {
  //   return <div className=""><Loading />.</div>;
  // }

  return (
    <div
      className={`lg:flex md:flex md:items-center w-full lg:items-center md:justify-center lg:justify-center py-24 mt-24 gap-4 p-4`}
      style={{ backgroundColor: defaultBackgroundColor }}
    >
      <div className="w-52 lg:w-[40%] md:w-96 lg:ml-12 md:mr-4 border shadow-lg border-black rounded-lg overflow-hidden hidden lg:block md:block">
        <ReactPlayer
          url={video}
          playing
          loop
          muted
          controls
          width="100%"
          height="100%"
        />
      </div>
      <div className="lg:w-1/2 md:w-1/2 p-4 lg:mr-12 lg:ml-12">
        <div className="mb-4">
          <div className="text-justify -mt-20">
            <div className="flex flex-col items-center mb-4">
              <div className="flex justify-center">
                <img
                  src={icon}
                  alt="amplang epok ema"
                  className="w-40 lg:w-80 rounded-full"
                />
              </div>
              <p className="text-center font-bold lg:mr-0 mr-3 mt-8">
                AFC Entertainment
              </p>
            </div>
            <p
              className="italic font-serif"
              style={{ color: defaultBackgroundColorText }}
            >
              {defaultSubtitle}
            </p>
            <p
              className="mt-2 italic font-serif"
              style={{ color: defaultBackgroundColorText }}
            >
              {defaultContent}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full border shadow-lg border-black rounded-lg overflow-hidden block lg:hidden md:hidden">
        <ReactPlayer
          url={video}
          playing
          loop
          muted
          controls
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default Review;
