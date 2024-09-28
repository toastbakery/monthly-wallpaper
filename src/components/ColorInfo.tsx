import React from "react";

interface Color {
  name: string;
  cn_name: string;
  pinyin: string;
  hex: string;
  rgb: string;
  cmyk: string;
}

interface ColorInfoProps {
  color: Color | undefined;
  textColor: String;
}

const ColorInfo: React.FC<ColorInfoProps> = ({ color, textColor }) => {
  const cnNameArray = color?.cn_name.split("");
  return (
    <div className="my-4">
      <div className="flex flex-col items-start ml-6">
        <div className="flex flex-row">
          {cnNameArray?.map((letter, index) => (
            <div
              key={index}
              className="w-[120px] h-[120px] flex justify-center items-center text-6xl rounded-full mt-[10px]"
              style={{
                backgroundColor: color?.hex,
              }}
            >
              <svg width="100" height="100">
                <text
                  x="50%"
                  y="56%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  font-family="Arial"
                  font-size="70"
                  fill="none"
                  stroke={`${textColor}`}
                  stroke-width="1"
                >
                  {letter}
                </text>
              </svg>
            </div>
          ))}
        </div>
        <div>
          <p className="text-3xl mt-2 tracking-wider ml-7">{color?.pinyin}</p>
        </div>
      </div>

      <div
        className="flex flex-col justify-end text-right text-xl mr-16 font-bold"
        style={{ color: color?.hex }}
      >
        <p> {color?.hex}</p>
        <p>{color?.rgb}</p>
        <p>{color?.cmyk}</p>
      </div>
    </div>
  );
};

export default ColorInfo;
