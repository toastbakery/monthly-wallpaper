import React from "react";

interface SolarTerm {
  name: string;
  cn_name: string;
  pinyin: string;
  en_name: string;
  date: string;
}

interface SolarTermProps {
  solarterm: SolarTerm | undefined;
  cnNameStyle: string;
  pinyinStyle: string;
  dateStyle: string;
}

const SolarTerm: React.FC<SolarTermProps> = ({
  solarterm,
  cnNameStyle,
  pinyinStyle,
  dateStyle,
}) => {
  return (
    <div className="flex flex-row space-x-2 leading-none">
      <div className="flex flex-col justify-between">
        <h2 className={`${cnNameStyle} tracking-[4px] `}>
          {solarterm?.cn_name}
        </h2>
        <p className={`${pinyinStyle}`}>{solarterm?.pinyin}</p>
      </div>
      <div className="flex flex-col justify-center">
        <h2 className={`${dateStyle}`}>{solarterm?.date}</h2>
      </div>
    </div>
  );
};

export default SolarTerm;
