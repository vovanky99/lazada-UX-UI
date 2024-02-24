import { useState } from 'react';
import PropTypes from 'prop-types';
import { months } from './Month';
import { useDynamicYears } from './years';
import { days } from './days';
import { getDay, getMonth, getYear, format, getDate } from 'date-fns';
import { Form } from 'react-bootstrap';

export default function SelectDate({ onChangeValue, startingYear, numberOfYears, className, selectClassName = '' }) {
  const [selectDate, setSelectedDate] = useState(format(new Date(startingYear, '0', '1'), 'yyyy-MM-dd'));
  const dynamicYears = useDynamicYears({
    startingYear: startingYear,
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
    <div className={className} style={{ display: 'flex', flexDirection: 'row' }}>
      <div className="col-5" style={{ boxSizing: 'border-box' }}>
        <Form.Select className={selectClassName} onChange={handleMonthSelect} value={getMonth(selectDate)}>
          {months.map((key, index) => (
            <option value={index} key={index}>
              {key}
            </option>
          ))}
        </Form.Select>
      </div>
      <div className="col-3" style={{ boxSizing: 'border-box' }}>
        <Form.Select className={selectClassName} onChange={handleDaySelect} value={getDate(selectDate)}>
          {days.map((key, index) => (
            <option value={key} key={index}>
              {key}
            </option>
          ))}
        </Form.Select>
      </div>
      <div className="col-4" style={{ boxSizing: 'border-box' }}>
        <Form.Select className={selectClassName} onChange={handleYearSelect} value={getYear(selectDate)}>
          {dynamicYears.map((key, index) => (
            <option value={key} key={index}>
              {key}
            </option>
          ))}
        </Form.Select>
      </div>
    </div>
  );
}
SelectDate.propTypes = {
  startingYear: PropTypes.number.isRequired,
  numberOfYears: PropTypes.number.isRequired,
  className: PropTypes.string,
  selectClassName: PropTypes.string,
};
