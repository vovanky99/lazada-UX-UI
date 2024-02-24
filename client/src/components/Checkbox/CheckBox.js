import classNames from 'classnames/bind';
import style from './checkbox.module.scss';
import { Button, Form } from 'react-bootstrap';

const cx = classNames.bind(style);

export default function CheckBox({ requir = true, ClassName, ClassNameCheck, Label = '', styleCheckMark = {} }) {
  const FormGroup = {};
  return (
    <Form.Group className={cx('container', ClassName)} style={FormGroup}>
      {requir ? <input required type="checkbox" /> : <input type="checkbox" />}
      <label>{Label}</label>
      <span className={cx('input-helper')} style={styleCheckMark}></span>
    </Form.Group>
  );
}
