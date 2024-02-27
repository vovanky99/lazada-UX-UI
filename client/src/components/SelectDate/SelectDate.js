import classNames from 'classnames/bind';
import { useState } from 'react';
import { getDay, getMonth, getYear, format, getDate } from 'date-fns';

import { months } from './Month';
import { useDynamicYears } from './years';
import { days } from './days';
import style from './SelectDate.module.scss';

const cx = classNames.bind(style);

export default function SelectDate({
  onChangeValue,
  classDay = '',
  classMonth = '',
  classYear = '',
  year = new Date().getFullYear(),
  numberOfYears,
  className = '',
  selectClassName = '',
}) {
  const [selectDate, setSelectedDate] = useState(format(new Date(year, '0', '1'), 'yyyy-MM-dd'));
  const dynamicYears = useDynamicYears({
    Year: year,
    numberOfYears: numberOfYears,
  });
  onChangeValue = selectDate;
  const handleDaySelect = (e) => {
    const { value } = e.target;
    const day = parseInt(value, 10);
    setSelectedDate(format(new Date(getYear(selectDate), getMonth(selectDate), day), 'yyyy-MM-dd'));
  };
  const handleMonthSelect = (e) => {
    const { value } = e.target;
    const month = parseInt(value, 10);
    setSelectedDate(format(new Date(getYear(selectDate), month, getDay(selectDate)), 'yyyy-MM-dd'));
  };
  const handleYearSelect = (e) => {
    const { value } = e.target;
    const year = parseInt(value, 10);
    setSelectedDate(format(new Date(year, getMonth(selectDate), getDay(selectDate)), 'yyyy-MM-dd'));
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
