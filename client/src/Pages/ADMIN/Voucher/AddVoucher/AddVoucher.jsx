import classNames from 'classnames/bind';
import styles from '../Voucher.module.scss';
import WrapperMain from '~/layout/Component/WrapperMain';
import { FormSearch } from '~/layout/Component/FormSearch';
import { useRef, useState } from 'react';
import Category from '~/layout/Component/Category';
import { FormDate } from '~/layout/Component/FormGroup/FormDate';
import { FormText } from '~/layout/Component/FormGroup/FormText';
import Button from '~/components/Button';
import MessageDanger from '~/layout/Component/Message/MessageDanger';
import MessageSuccess from '~/layout/Component/Message/MessageSuccess';
import { CreateData } from '~/api/General/HandleData';

const cx = classNames.bind(styles);

export default function AddVoucher() {
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
  const [voucher, setVoucher] = useState({
    name: '',
    category_id: '',
    descriptions: '',
    percents: '',
    quantity: '',
    code: '',
    start_day: '',
    end_day: '',
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
  const validated = () => {
    if (voucher.name === '') {
      nameRef.current.classList.add('border_danger');
    } else {
      nameRef.current.classList.remove('border_danger');
    }
    // if (voucher.category_id === '') {
    //   catRef.current.classList.add('border_danger');
    // } else {
    //   catRef.current.classList.remove('border_danger');
    // }
    if (voucher.code === '') {
      codeRef.current.classList.add('border_danger');
    } else {
      codeRef.current.classList.remove('border_danger');
    }
    if (voucher.descriptions === '') {
      descriptionsRef.current.classList.add('border_danger');
    } else {
      descriptionsRef.current.classList.remove('border_danger');
    }
    if (voucher.end_day === '') {
      EndDayRef.current.classList.add('border_danger');
    } else {
      EndDayRef.current.classList.remove('border_danger');
    }
    // if (voucher.quantity === '') {
    //   quantityRef.current.classList.add('border_danger');
    // } else {
    //   quantityRef.current.classList.remove('border_danger');
    // }
    if (voucher.start_day === '') {
      startDayRef.current.classList.add('border_danger');
    } else {
      startDayRef.current.classList.remove('border_danger');
    }
    if (voucher.percents === '') {
      percentsRef.current.classList.add('border_danger');
    } else {
      percentsRef.current.classList.remove('border_danger');
    }
  };
  const handleSubmitCreateVoucher = (e) => {
    e.preventDefault();
    validated();
    if (
      voucher.name &&
      voucher.code &&
      voucher.descriptions &&
      voucher.end_day &&
      voucher.start_day &&
      voucher.percents
    ) {
      CreateData('admin', 'voucher', voucher)
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
      <WrapperMain title="add voucher">
        <form
          onSubmit={handleSubmitCreateVoucher}
          className={cx('add_voucher', 'd-flex flex-row flex-wrap')}
          noValidate
        >
          <FormSearch ref={nameRef} title="name" name="name" handleOnchange={handleOnchange} useTippy={false} />
          <FormSearch ref={codeRef} title="code" name="code" handleOnchange={handleOnchange} useTippy={false} />
          <FormSearch
            ref={percentsRef}
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
            title="quantity"
            name="quantity"
            inputType="number"
            handleOnchange={handleOnchange}
            useTippy={false}
          />
          <Category ref={catRef} title="category" name="category_id" handleOnchange={handleOnchange} />
          <FormDate ref={startDayRef} title="start day" name="start_day" handleOnchange={handleOnchange} />
          <FormDate ref={EndDayRef} title="end day" name="end_day" handleOnchange={handleOnchange} />
          <FormText
            ref={descriptionsRef}
            containerClass={cx('descriptions')}
            title="descriptions"
            name="descriptions"
            rows="4"
            handleOnchange={handleOnchange}
          />
          <MessageDanger classNames={cx('message')} message={voucherValid} />
          <MessageSuccess classNames={cx('message')} message={messageSuccess} />
          <div className={cx('btn_create', 'text-center')}>
            <Button type="submit" gradient_primary>
              Create
            </Button>
          </div>
        </form>
      </WrapperMain>
    </>
  );
}
