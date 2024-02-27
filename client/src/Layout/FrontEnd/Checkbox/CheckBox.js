import classNames from 'classnames/bind';
import style from './checkbox.module.scss';

const cx = classNames.bind(style);

export default function CheckBox({
  requir = true,
  onClick,
  Label = '',
  width = '',
  height = '',
  ClassName,
  ClassNameCheck,
  BorderColer = '',
  Size = '',
  Top = '',
  Bottom = '',
  Left = '',
  Right = '',
  IconCheck = '',
  checkedAll = '',
  checkboxclass = '',
}) {
  const FormGroup = {};
  return (
    <div className={cx('container', ClassName)} style={FormGroup}>
      {requir ? (
        <input
          onClick={onClick}
          id={checkedAll}
          className={cx(checkboxclass)}
          required
          type="checkbox"
          style={{ height: Size, width: Size, top: Top, left: Left, right: Right, bottom: Bottom }}
        />
      ) : (
        <input
          onClick={onClick}
          id={checkedAll}
          className={cx(checkboxclass)}
          type="checkbox"
          style={{ height: Size, width: Size, top: Top, left: Left, right: Right, bottom: Bottom }}
        />
      )}
      <label>{Label}</label>
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
    </div>
  );
}
