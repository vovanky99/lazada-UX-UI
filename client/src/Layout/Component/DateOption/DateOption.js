import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { getMonth, getYear, format, getDate } from 'date-fns';

import { months } from './Month';
import { useDynamicYears } from './years';
import { days } from './days';
import style from './DateOption.module.scss';

const cx = classNames.bind(style);

export default function DateOption({
  onChangeValue,
  classDay = '',
  classMonth = '',
  classYear = '',
  year = new Date().getFullYear(),
  numberOfYears,
  className = '',
  selectClassName = '',
  setDefault,
}) {
  const [selectDate, setSelectedDate] = useState(() => {
    if (setDefault != '') {
      return format(new Date(setDefault), 'yyyy-MM-dd');
    } else {
      return format(new Date(), 'yyyy-MM-dd');
    }
  });
  const dynamicYears = useDynamicYears({
    Year: year,
    numberOfYears: numberOfYears,
  });
  useEffect(() => {
    onChangeValue(selectDate);
  }, [selectDate]);
  const handleDaySelect = (e) => {
    const { value } = e.target;
    const day = parseInt(value, 10);
    setSelectedDate(format(new Date(getYear(selectDate), getMonth(selectDate), day), 'yyyy-MM-dd'));
  };
  const handleMonthSelect = (e) => {
    const { value } = e.target;
    const month = parseInt(value, 10);
    setSelectedDate(format(new Date(getYear(selectDate), month, getDate(selectDate)), 'yyyy-MM-dd'));
  };
  const handleYearSelect = (e) => {
    const { value } = e.target;
    const year = parseInt(value, 10);
    setSelectedDate(format(new Date(year, getMonth(selectDate), getDate(selectDate)), 'yyyy-MM-dd'));
  };
  return (
    <div className={cx('wrapper', className + ' ')}>
      <div className={cx('month', classMonth + ' ')}>
        <select className={selectClassName} onChange={handleMonthSelect} value={getMonth(selectDate)}>
          {months.map((key, index) => (
            <option value={index} key={index}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <div className={cx('day', classDay + ' ')}>
        <select className={selectClassName} onChange={handleDaySelect} value={getDate(selectDate)}>
          {days.map((key, index) => (
            <option value={key} key={index}>
              {key}
            </option>
          ))}
        </select>
      </div>
      <div className={cx('year', classYear + ' ')}>
        <select className={selectClassName} onChange={handleYearSelect} value={getYear(selectDate)}>
          {dynamicYears.map((key, index) => (
            <option value={key} key={index}>
              {key}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
