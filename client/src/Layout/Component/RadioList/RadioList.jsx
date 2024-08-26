import { Fragment, useEffect, useRef } from 'react';
import Radio from '~/components/Radio';

export default function RadioList({
  data,
  defaultValue = 1,
  color = 'primary',
  className,
  titleClass,
  onClick = () => {},
}) {
  const radioRef = useRef();
  useEffect(() => {
    const t = document.querySelectorAll(`.${titleClass}`);
    const handleClick = (e) => {
      const { color, type } = e.currentTarget.dataset;
      for (let i = 0; i < t.length; i++) {
        if (t[i].classList.contains(`radio_${color}_active`)) {
          t[i].classList.remove(`radio_${color}_active`);
        }
      }
      if (!e.currentTarget.classList.contains(`radio_${color}_active`)) {
        e.currentTarget.classList.add(`radio_${color}_active`);
      }
      onClick(e);
    };
    if (t) {
      t.forEach((dt) => dt.addEventListener('click', handleClick));
    }
  }, []);

  useEffect(() => {
    if (defaultValue && titleClass) {
      const radioItems = document.querySelectorAll(`.${titleClass}`);
      console.log(radioItems);
      for (let i = 0; i < radioItems.length; i++) {
        if (parseInt(radioItems[i].dataset.type) === defaultValue) {
          radioItems[i].classList.add(`radio_${color}_active`);
          break;
        }
      }
    }
  }, []);
  return (
    <Fragment>
      {data?.map((dt, index) => (
        <Radio
          ref={radioRef}
          type={dt?.type}
          className={(className + '', titleClass)}
          title={dt?.title}
          primary={color}
          key={index}
        />
      ))}
    </Fragment>
  );
}
