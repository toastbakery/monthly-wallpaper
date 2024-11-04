import React, { useMemo, useState, useEffect } from "react";
import Header from "../components/Header";
import ColorPalette from "../components/ColorPalette";
import MonthTabs from "../components/MonthTabs";
import SolarTermTabs from "../components/SolarTermTabs";
import WallpaperPreview from "../components/WallpaperPreview";
import ColorInfo from "../components/ColorInfo";
import monthData from "../data/month.json";
import monthSolarTermsData from "../data/monthSolarTerms.json";
import solarTermColorListData from "../data/solarTermColorList.json";

interface SolarTerm {
  name: string;
  cn_name: string;
  pinyin: string;
  en_name: string;
  date: string;
}

interface Color {
  name: string;
  cn_name: string;
  pinyin: string;
  hex: string;
  rgb: string;
  cmyk: string;
}

const Home = () => {
  const [selectedMonth, setSelectedMonth] = useState("01");

  const months = monthData.map((month) => month.month);

  const getSolarTerms = (month: string): SolarTerm[] | undefined => {
    const monthSolarTerms = monthSolarTermsData.find(
      (monthSolarTerms) => monthSolarTerms.month === month
    );
    return monthSolarTerms?.solarterms;
  };

  const solarTerms = useMemo(() => {
    return getSolarTerms(selectedMonth);
  }, [selectedMonth]);

  const [selectedTerm, setSelectedTerm] = useState<SolarTerm | undefined>(
    undefined
  );

  // Add useEffect to update selectedTerm when selectedMonth changes
  useEffect(() => {
    if (solarTerms && solarTerms.length > 0) {
      setSelectedTerm(solarTerms[0]);
    }
  }, [selectedMonth, solarTerms]);

  // Update ColorList
  const getColorList = (
    selectedSolarTerm: SolarTerm | undefined
  ): Color[] | undefined => {
    const solarTermColorList = solarTermColorListData.find(
      (solarTermColorList) =>
        solarTermColorList.solarterm === selectedSolarTerm?.name
    );
    return solarTermColorList?.colorlist;
  };

  const colorList = useMemo(() => {
    return getColorList(selectedTerm);
  }, [selectedTerm]);

  const [selectedColor, setSelectedColor] = useState<Color | undefined>(
    undefined
  );
  useEffect(() => {
    if (colorList && colorList.length > 0) {
      setSelectedColor(colorList[0]);
    }
  }, [colorList]);

  // Calculate textColor
  // Regular Expression
  const rgbValues = selectedColor?.rgb.match(/\d+/g);

  // Array Destructuring
  const [r, g, b] = rgbValues ? rgbValues.map(Number) : [0, 0, 0];

  const shouldUseBlackText = (r: number, g: number, b: number): boolean => {
    const sumRgbValue = r + g + b;
    return (
      sumRgbValue > 420 || (sumRgbValue > 360 && r > 100 && g > 100 && b > 100)
    );
  };

  const textColor = shouldUseBlackText(r, g, b) ? "black" : "white";

  return (
    <div className="px-0.5 bg-black">
      <div className="w-full min-h-screen flex">
        <div className="w-[60px] bg-white mx-0.5 xl:w-[100px]">
          <Header />
        </div>
        <div className="flex-1 flex-col items-center bg-white mx-0.5 min-w-[600px]">
          <ColorPalette
            colors={colorList}
            term={selectedTerm}
            onColorSelect={setSelectedColor}
          />
        </div>
        <div className="flex-1 flex-col items-center bg-white mx-0.5 px-4">
          <MonthTabs
            months={months}
            selectedMonth={selectedMonth}
            onSelectMonth={setSelectedMonth}
          />
          <SolarTermTabs
            solarTerms={solarTerms}
            selectedTerm={selectedTerm}
            onSelectTerm={setSelectedTerm}
          />
          <WallpaperPreview
            selectedColor={selectedColor} // if selectedColor is false value, assign it with default value
            month={selectedMonth}
            textColor={textColor}
          />

          <ColorInfo color={selectedColor} textColor={textColor} />
        </div>
      </div>
    </div>
  );
};

export default Home;
