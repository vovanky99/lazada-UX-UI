import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

function Timer({ deadline, day = false, text = false, className, textFs, dateClass }) {
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
            <span id="day" className={dateClass}>
              {days + 365}
            </span>
            {text ? <span className={textFs}>D</span> : <span className={textFs}>:</span>}
          </div>
        </Col>
      )}
      <Col>
        <div className="box d-flex">
          <span id="hour" className={dateClass}>
            {hours}
          </span>
          {text ? <span className={textFs}>H</span> : <span className={textFs}>:</span>}
        </div>
      </Col>
      <Col>
        <div className="box d-flex">
          <span id="minute" className={dateClass}>
            {minutes == 0 ? 0 : minutes + 60}
          </span>
          {text ? <span className={textFs}>M</span> : <span className={textFs}>:</span>}
        </div>
      </Col>
      <Col>
        <div className="box d-flex ">
          <span id="second" className={dateClass}>
            {seconds + 60}
          </span>
          {text && <span className={textFs}>S</span>}
        </div>
      </Col>
    </Row>
  );
}

export default Timer;
