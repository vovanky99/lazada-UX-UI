import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RequestPhone, ResetPassword } from '~/api/General/HandleData';
import Button from '~/components/Button';
import config from '~/config';
import Country from '~/layout/Component/Country';
import { FormSearch } from '~/layout/Component/FormSearch';
import AdminLogo from '~/layout/Component/Logo';
import Translate from '~/layout/Component/Translate';
import styles from '~/pages/ADMIN/Auth/Auth.module.scss';

const cx = classNames.bind(styles);

export default function ResetPass() {
  const phoneRef = useRef();
  const passRef = useRef();
  const passConfirmRef = useRef();
  const formRequestRef = useRef();
  const formResetRef = useRef();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [togglePass, setTogglePass] = useState(false);
  const [requestPhone, setRequestPhone] = useState({
    phone_number: '',
  });
  const [resetPass, setResetPass] = useState({
    phone_number: '',
    token: '',
    password: '',
    password_confirmation: '',
  });
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setRequestPhone({
      ...requestPhone,
      [name]: value,
    });
  };
  const handleOnchangePass = (e) => {
    const { name, value } = e.target;
    setResetPass({
      ...resetPass,
      [name]: value,
    });
  };
  const validateRequestphone = () => {
    if (requestPhone.phone_number.length !== 11) {
      phoneRef.current.classList.add('input_danger');
    } else {
      phoneRef.current.classList.remove('input_danger');
    }
  };

  const validateResetPass = () => {
    if (resetPass.password.length < 8) {
      passRef.current.classList.add('input_danger');
    } else {
      passRef.current.classList.remove('input_danger');
    }
    if (resetPass.password !== resetPass.password_confirmation) {
      passConfirmRef.current.classList.add('input_danger');
    } else {
      passConfirmRef.current.classList.remove('input_danger');
    }
  };
  const handleSubmitRequestPhone = (e) => {
    e.preventDefault();
    validateRequestphone();
    if (requestPhone.phone_number.length === 11) {
      RequestPhone(requestPhone)
        .then((result) => {
          if (result.token) {
            setTogglePass(true);
            setResetPass({
              ...resetPass,
              token: result.token,
              phone_number: requestPhone.phone_number,
            });
            formRequestRef.current.classList.add('reset_hidden');
          }
        })
        .catch((e) => console.log(e));
    }
  };
  const handleSubmitResetPass = (e) => {
    e.preventDefault();
    validateResetPass();
    if (resetPass.password.length >= 8 && resetPass.password === resetPass.password_confirmation) {
      ResetPassword('admin', resetPass)
        .then((result) => {
          if (result.success) {
            navigate(config.adminRoutes.SignIn);
          }
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <Country>
      <section className={cx('reset')}>
        <div className={cx('reset_content', ' d-flex justify-content-center align-items-center')}>
          <div className={cx('reset_content_contain', 'd-flex justify-content-between flex-column align-items-center')}>
            <h1 className={cx('logo')}>
              <AdminLogo />
            </h1>
            <form ref={formRequestRef} onSubmit={handleSubmitRequestPhone} className={cx('form')} noValidate>
              <FormSearch
                ref={phoneRef}
                title="phone"
                name="phone_number"
                inputType="number"
                inputClass={cx('form_phone', 'form-control')}
                useLabel={false}
                handleOnchange={handleOnchange}
                useTippy={false}
              />
              <div className={cx('form_btn')}>
                <Button className={cx('btn-reset', 'text-capitolize')} gradient_primary>
                  <Translate>next</Translate>
                </Button>
              </div>
            </form>
            {togglePass ? (
              <form ref={formResetRef} onSubmit={handleSubmitResetPass} className={cx('form')} noValidate>
                <FormSearch
                  ref={passRef}
                  title="password"
                  name="password"
                  inputType="password"
                  inputClass={cx('form_pass', 'form-control')}
                  handleOnchange={handleOnchangePass}
                  useTippy={false}
                />
                <FormSearch
                  ref={passConfirmRef}
                  title="password confirm"
                  name="password_confirmation"
                  inputType="password"
                  inputClass={cx('form_pass', 'form-control')}
                  handleOnchange={handleOnchangePass}
                  useTippy={false}
                />
                <div className={cx('form_btn')}>
                  <Button className={cx('btn-reset', 'text-capitolize')} gradient_primary>
                    Next
                  </Button>
                </div>
              </form>
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
    </Country>
  );
}
