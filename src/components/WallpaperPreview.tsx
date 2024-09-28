import React, { useRef } from "react";
import monthData from "../data/month.json";
import Calendar from "./Calendar";
import * as htmlToImage from "html-to-image";

interface WallpaperPreviewProps {
  selectedColor: { hex: string; rgb: string } | undefined; //the type of selectedColor is an object, and it must have the attribute "hex"
  month: string;
  textColor: string;
}

const WallpaperPreview: React.FC<WallpaperPreviewProps> = ({
  selectedColor,
  month,
  textColor,
}) => {
  // Regular Expression
  const rgbValues = selectedColor?.rgb.match(/\d+/g);

  // // Array Destructuring
  // const [r, g, b] = rgbValues ? rgbValues.map(Number) : [0, 0, 0];

  // const getSumedRgbValue = (r: number, g: number, b: number): number => {
  //   const sumRgbValue = r + g + b;
  //   return sumRgbValue;
  // };

  // const textColor = getSumedRgbValue(r, g, b) > 360 ? "black" : "white";

  const monthEn = monthData.find((monthWord) => monthWord.month === month);
  const currentYear = new Date().getFullYear(); // Get the current year

  // Create a ref to the wallpaper container
  const wallpaperRef = useRef<HTMLDivElement>(null);

  // Function to handle download button click
  const handleDownload = () => {
    if (wallpaperRef.current === null) {
      return;
    }
    // Temporarily remove the border before capturing the image
    const originalBorder = wallpaperRef.current.style.border;
    wallpaperRef.current.style.border = "none";
    // Convert the div to an image with increased resolution
    htmlToImage
      .toPng(wallpaperRef.current, {
        pixelRatio: 5, // Increase the pixel density (5x resolution)
      })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `wallpaper-${month}.png`; // Set the download filename
        link.click();
      })
      .catch((err) => {
        console.error("Error generating image:", err);
      })
      .finally(() => {
        // Restore the original border after capture
        wallpaperRef.current!.style.border = originalBorder;
      });
  };

  return (
    <div className="flex justify-center mb-6 mt-8">
      <div
        ref={wallpaperRef} // Attach the ref to the div containing the wallpaper
        className="w-[60vmin] h-[36vmin] flex flex-row items-center justify-center border-2 border-black"
        style={{ backgroundColor: selectedColor?.hex }}
      >
        <div className="text-center mr-2">
          <h2
            className="text-6xl tracking-wider"
            style={{
              fontFamily: "'DM Serif Display', serif",
              color: textColor,
            }}
          >
            {month}
          </h2>
          <h2
            className="text-2xl mt-1"
            style={{ fontFamily: "'Playwrite CU', cursive", color: textColor }}
          >
            {monthEn?.en_name}
          </h2>
        </div>
        <div className="mt-4">
          <Calendar
            year={currentYear}
            month={Number(month)}
            textColor={textColor}
          />
        </div>
      </div>
      <div className="flex items-center ml-4">
        <button
          className="flex items-center hover:font-bold"
          onClick={handleDownload}
        >
          {/* copy svg code from heroicons.com */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="0.8"
            stroke="#5C4F55"
            className="size-20 hover:stroke-[1] hover:stroke-black"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WallpaperPreview;
