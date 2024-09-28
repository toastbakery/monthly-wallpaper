import React from "react";
import StyledSolarTerm from "./SolarTerm";
import Color from "./Color";

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

interface ColorPaletteProps {
  colors: Color[] | undefined;
  term: SolarTerm | undefined;
  onColorSelect: (color: Color) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  colors,
  term,
  onColorSelect,
}) => {
  return (
    <div>
      <div className="mt-[8vmin] mb-2 border-t-4 border-black"></div>
      <div className="flex justify-between">
        <div className="ml-5 font-bold">
          <StyledSolarTerm
            solarterm={term}
            cnNameStyle="text-4xl pr-6"
            pinyinStyle="text-xl"
            dateStyle="text-4xl"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-3xl mr-5">{term?.en_name}</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2 p-4">
        {colors?.map((color, index) => (
          <div key={index} onClick={() => onColorSelect(color)}>
            <Color color={color} />
          </div>
        ))}
      </div>
      <div className="mb-[8vmin] border-t-4 border-black"></div>
    </div>
  );
};

export default ColorPalette;
