import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

function Timer({ deadline, day = false, text = false, className }) {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const getTime = () => {
    let giay = 1000;
    let phut = giay * 60;
    let gio = phut * 60;
    let ngay = gio * 24;

    setDays(Math.floor(Date.parse(deadline) / ngay) - Math.floor(Date.now() / ngay));
    setHours(Math.floor(((Date.parse(deadline) / gio) % 24) - ((Date.now() / gio) % 24)));

    setMinutes(Math.floor((Date.parse(deadline) / phut) % 60) - Math.floor((Date.now() / phut) % 60));
    setSeconds(Math.floor((Date.parse(deadline) / giay) % 60) - Math.floor((Date.now() / giay) % 60));
  };
  useEffect(() => {
    let interval = setInterval(() => {
      getTime(deadline);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <Row className={className}>
      {days >= -365 || day == false ? (
        ''
      ) : (
        <Col>
          <div className="box d-flex">
            <p id="day">{days + 365}</p>
            {text ? <span className="text">D</span> : <span className="text">:</span>}
          </div>
        </Col>
      )}
      <Col>
        <div className="box d-flex">
          <p id="hour">{hours}</p>
          {text ? <span className="text">H</span> : <span className="text">:</span>}
        </div>
      </Col>
      <Col>
        <div className="box d-flex">
          <p id="minute">{minutes == 0 ? 0 : minutes + 60}</p>
          {text ? <span className="text">M</span> : <span className="text">:</span>}
        </div>
      </Col>
      <Col>
        <div className="box d-flex ">
          <p id="second">{seconds + 60}</p>
          {text && <span className="text">S</span>}
        </div>
      </Col>
    </Row>
  );
}

Timer.propTypes = {
  deadline: PropTypes.string.isRequired,
  day: PropTypes.bool,
  text: PropTypes.bool,
};

export default Timer;
