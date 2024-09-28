import React from "react";
import StyledSolarTerm from "./SolarTerm";

interface SolarTerm {
  name: string;
  cn_name: string;
  pinyin: string;
  en_name: string;
  date: string;
}

interface SolarTermTabsProps {
  solarTerms: SolarTerm[] | undefined;
  selectedTerm: SolarTerm | undefined;
  onSelectTerm: (term: SolarTerm) => void;
}

const SolarTermTabs: React.FC<SolarTermTabsProps> = ({
  solarTerms,
  selectedTerm,
  onSelectTerm,
}) => {
  return (
    <div className="flex justify-center space-x-4 mb-3">
      {solarTerms?.map((term, index) => (
        <div
          key={index}
          className={`flex justify-center items-center  w-[220px] p-2 rounded-full cursor-pointer border-2 mr-2 hover:font-bold ${
            selectedTerm?.name === term.name
              ? "border-black font-bold"
              : "border-transparent"
          }`}
          onClick={() => onSelectTerm(term)}
        >
          <StyledSolarTerm
            solarterm={term}
            cnNameStyle="text-xl text-right"
            pinyinStyle="text-lg text-right pr-1"
            dateStyle="text-xl"
          />
        </div>
      ))}
    </div>
  );
};

export default SolarTermTabs;
