import React, { useState, useEffect } from "react";

interface CalendarProps {
  year: number;
  month: number;
  textColor: string;
}

// Function to get the first day of the month and the number of days in the month
const getMonthData = (
  year: number,
  month: number
): { firstDay: number; daysInMonth: number } => {
  const firstDay = new Date(year, month - 1, 1).getDay(); // Get the weekday of the first day of the month
  const daysInMonth = new Date(year, month, 0).getDate(); // Get the total number of days in the month
  return { firstDay, daysInMonth };
};

// Function to generate the calendar data based on the year and month
const generateCalendar = (year: number, month: number): number[][] => {
  const { firstDay, daysInMonth } = getMonthData(year, month);
  const calendar: number[][] = [];
  let week: number[] = new Array(firstDay === 0 ? 6 : firstDay - 1).fill(0); // Adjust for starting day of the week (Monday as first day)

  // Loop through each day in the month and create the calendar array
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      calendar.push(week);
      week = [];
    }
  }

  // If there are remaining days in the week, push them as well
  if (week.length > 0) {
    while (week.length < 7) {
      week.push(0); // Fill the remaining days with 0 to complete the week
    }
    calendar.push(week);
  }

  return calendar;
};

// Calendar component that displays the month based on the selected year and month
const Calendar: React.FC<CalendarProps> = ({ year, month, textColor }) => {
  const calendarData = generateCalendar(year, month);

  return (
    <div className="calendar" style={{ color: textColor }}>
      <div className="grid grid-cols-7 text-center font-bold text-[0.35rem] mb-1">
        <div>MON</div>
        <div>TUE</div>
        <div>WED</div>
        <div>THU</div>
        <div>FRI</div>
        <div>SAT</div>
        <div>SUN</div>
      </div>
      <div>
        {calendarData.map((week, weekIndex) => (
          <div
            key={weekIndex}
            className="grid grid-cols-7 text-center text-[0.4rem]"
          >
            {week.map((day, dayIndex) => (
              <div key={dayIndex} className="px-1.5 py-1">
                {day > 0 ? day.toString().padStart(2, "0") : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
