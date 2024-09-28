import React from "react";

interface ColorProps {
  color: {
    name: string;
    cn_name: string;
    pinyin: string;
    hex: string;
    rgb: string;
    cmyk: string;
  };
}

const Color: React.FC<ColorProps> = ({ color }) => {
  // Regular Expression
  const rgbValues = color.rgb.match(/\d+/g);
  const cmykValues = color.cmyk.match(/\d+/g);
  // Array Destructuring
  const [r, g, b] = rgbValues ? rgbValues.map(Number) : [0, 0, 0];
  const [c, m, y, k] = cmykValues ? cmykValues.map(Number) : [0, 0, 0, 0];

  const shouldUseBlackText = (r: number, g: number, b: number): boolean => {
    const sumRgbValue = r + g + b;
    return (
      sumRgbValue > 420 || (sumRgbValue > 360 && r > 100 && g > 100 && b > 100)
    );
  };

  const textColor = shouldUseBlackText(r, g, b) ? "black" : "white";

  return (
    <div
      className="h-[16vmin] cursor-pointer border-[2px] border-black pl-2 pr-1 py-2 flex flex-col justify-between"
      style={{ backgroundColor: color.hex, color: textColor }}
    >
      <div className="text-right">
        <p className="font-bold tracking-[2px]">{color.cn_name}</p>
        <p className="pr-[3px]">{color.pinyin}</p>
      </div>
      <div className="text-left text-xs font-bold">
        <p>{color.hex}</p>
        <p>
          R {r} G {g} B {b}
        </p>
        <p>
          C {c} M {m} Y {y} K {k}
        </p>
      </div>
    </div>
  );
};

export default Color;
