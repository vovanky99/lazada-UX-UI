import classNames from 'classnames/bind';
import styles from '../Voucher.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import { EditData } from '~/api/General/HandleData';
import { useRef, useState } from 'react';
import { FormSearch } from '~/layout/Component/FormSearch';
import Category from '~/layout/Component/Category';
import { FormDate } from '~/layout/Component/FormGroup/FormDate';
import { FormText } from '~/layout/Component/FormGroup/FormText';
import MessageSuccess from '~/layout/Component/Message/MessageSuccess';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

export default function EditElement({ data }) {
  const nameRef = useRef();
  const catRef = useRef();
  const descriptionsRef = useRef();
  const percentsRef = useRef();
  const quantityRef = useRef();
  const codeRef = useRef();
  const startDayRef = useRef();
  const EndDayRef = useRef();
  const [voucherValid, setVoucherValid] = useState('');
  const [messageSuccess, setMessageSuccess] = useState('');
  const catName = data?.cat_name || '';
  const [voucher, setVoucher] = useState({
    name: data.name || '',
    category_id: data.category_id || '',
    descriptions: data.descriptions || '',
    percents: data.percents || '',
    quantity: data.quantity || '',
    code: data.code || '',
    start_day: data.start_day || '',
    end_day: data.end_day || '',
  });

  /* hanlde change  */
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    if (name === 'category_id') {
      setVoucher({
        ...voucher,
        [name]: e.target.dataset.id,
      });
    } else {
      setVoucher({
        ...voucher,
        [name]: value,
      });
    }
  };
  /* valid voucher */
  const validVoucher = () => {
    if (voucher.name === '') {
      nameRef.current.classList.add('input_danger');
    } else {
      nameRef.current.classList.remove('input_danger');
    }
    if (voucher.code === '') {
      codeRef.current.classList.add('input_danger');
    } else {
      codeRef.current.classList.remove('input_danger');
    }
    if (voucher.descriptions === '' && voucher.descriptions.length <= 14) {
      descriptionsRef.current.classList.add('input_danger');
    } else {
      descriptionsRef.current.classList.remove('input_danger');
    }
    if (voucher.end_day === '') {
      EndDayRef.current.classList.add('input_danger');
    } else {
      EndDayRef.current.classList.remove('input_danger');
    }
    if (voucher.start_day === '') {
      startDayRef.current.classList.add('input_danger');
    } else {
      startDayRef.current.classList.remove('input_danger');
    }
    if (voucher.percents === '') {
      percentsRef.current.classList.add('input_danger');
    } else {
      percentsRef.current.classList.remove('input_danger');
    }
  };
  const handleSubmitCreateVoucher = (e) => {
    e.preventDefault();
    validVoucher();
    if (
      voucher.name &&
      voucher.code &&
      voucher.descriptions &&
      voucher.end_day &&
      voucher.start_day &&
      voucher.percents
    ) {
      EditData('admin', 'voucher', data.id, voucher)
        .then((result) => {
          if (result.success) {
            setMessageSuccess(result.success);
          } else {
            setVoucherValid(result.error);
          }
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <>
      <WrapperMain title="edit voucher">
        <form
          onSubmit={handleSubmitCreateVoucher}
          className={cx('edit_voucher', 'd-flex flex-row flex-wrap')}
          noValidate
        >
          <FormSearch
            ref={nameRef}
            title="name"
            name="name"
            Value={voucher.name}
            handleOnchange={handleOnchange}
            useTippy={false}
          />
          <FormSearch
            ref={codeRef}
            title="code"
            name="code"
            Value={voucher.code}
            handleOnchange={handleOnchange}
            useTippy={false}
          />
          <FormSearch
            ref={percentsRef}
            Value={voucher.percents}
            title="percents"
            name="percents"
            min="1"
            max="100"
            inputType="number"
            handleOnchange={handleOnchange}
            useTippy={false}
          />
          <FormSearch
            ref={quantityRef}
            Value={voucher.quantity}
            title="quantity"
            name="quantity"
            inputType="number"
            handleOnchange={handleOnchange}
            useTippy={false}
          />
          <Category
            ref={catRef}
            title="category"
            name="category_id"
            ValueID={voucher.category_id}
            Value={catName}
            handleOnchange={handleOnchange}
          />
          <FormDate
            ref={startDayRef}
            data={voucher.start_day}
            title="start day"
            name="start_day"
            handleOnchange={handleOnchange}
          />
          <FormDate
            ref={EndDayRef}
            data={voucher.end_day}
            title="end day"
            name="end_day"
            handleOnchange={handleOnchange}
          />
          <FormText
            data={voucher.descriptions}
            ref={descriptionsRef}
            containerClass={cx('descriptions')}
            title="descriptions"
            name="descriptions"
            rows="4"
            handleOnchange={handleOnchange}
          />

          <div className={cx('btn_create', 'text-center')}>
            <MessageDanger classNames={cx('message')} message={voucherValid} />
            <MessageSuccess classNames={cx('message')} message={messageSuccess} />
            <Button type="submit" small gradient_primary>
              Save
            </Button>
          </div>
        </form>
      </WrapperMain>
    </>
  );
}
