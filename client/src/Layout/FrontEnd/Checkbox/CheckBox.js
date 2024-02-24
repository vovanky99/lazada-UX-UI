import classNames from 'classnames/bind';
import style from './checkbox.module.scss';

const cx = classNames.bind(style);

export default function CheckBox({
  requir = true,
  width = '',
  height = '',
  ClassName,
  ClassNameCheck,
  Label = '',
  BorderColer = '',
  Size = '',
  Top = '',
  Bottom = '',
  Left = '',
  Right = '',
  IconCheck = '',
}) {
  const FormGroup = {};
  return (
    <label className={cx('container', ClassName)} style={FormGroup}>
      {requir ? (
        <input
          required
          type="checkbox"
          style={{ height: Size, width: Size, top: Top, left: Left, right: Right, bottom: Bottom }}
        />
      ) : (
        <input
          type="checkbox"
          style={{ height: Size, width: Size, top: Top, left: Left, right: Right, bottom: Bottom }}
        />
      )}
      {Label}
      <span
        className={cx('input-helper', ' ' + IconCheck)}
        style={{
          borderColor: BorderColer,
          height: Size,
          width: Size,
          top: Top,
          left: Left,
          right: Right,
          bottom: Bottom,
        }}
      ></span>
    </label>
  );
}
