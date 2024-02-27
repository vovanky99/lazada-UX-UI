import { useState } from 'react';

export const useDynamicYears = ({ Year = new Date().getFullYear(), numberOfYears }) => {
  const [years, setYears] = useState(() => {
    const dynamicYears = [];
    for (let year = Year; year >= Year - numberOfYears; year--) {
      dynamicYears.push(year);
    }
    return dynamicYears;
  });
  return years;
};
