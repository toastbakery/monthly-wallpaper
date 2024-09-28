import React from "react";
import { motion } from "framer-motion";

interface MonthTabsProps {
  months: string[];
  selectedMonth: string;
  onSelectMonth: (month: string) => void;
}

const variants = {
  default: { width: 0 },
  active: { width: "calc(100% - 0rem)" },
};

const MonthTabs: React.FC<MonthTabsProps> = ({
  months,
  selectedMonth,
  onSelectMonth,
}) => {
  return (
    <div className="flex justify-center space-x-4 p-4 mt-7 mb-3">
      {months.map((month, index) => (
        <div>
          <div
            key={index}
            className={`cursor-pointer w-[30px] text-2xl hover:font-bold ${
              selectedMonth === month ? "font-bold" : ""
            }`}
            onClick={() => onSelectMonth(month)}
          >
            {month}
          </div>
          <motion.div
            animate={selectedMonth === month ? "active" : "default"}
            variants={variants}
            className="h-[3px] bg-black"
          ></motion.div>
        </div>
      ))}
    </div>
  );
};

export default MonthTabs;
