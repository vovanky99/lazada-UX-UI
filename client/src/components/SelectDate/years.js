import { useState } from 'react';

export const useDynamicYears = ({ startingYear, numberOfYears }) => {
  const [years, setYears] = useState(() => {
    const dynamicYears = [];
    for (let year = startingYear; year < startingYear + numberOfYears; year++) {
      dynamicYears.push(year);
    }
    return dynamicYears;
  });
  return years;
};
