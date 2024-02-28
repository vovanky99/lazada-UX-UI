import classNames from 'classnames/bind';
import style from './Profile.module.scss';
import Account from '../Account';
import { useEffect, useState } from 'react';
import Images from '~/components/Images';
import Date from '~/components/Date';
import { format } from 'date-fns';

const cx = classNames.bind(style);

function Profile({ data }) {
  const [username, setUsername] = useState('nsjskskw');
  const [avatar, setAvatar] = useState('https://down-vn.img.susercontent.com/file/438ac806ce989d6ef1013207c531b451');
  const [name, setName] = useState('võ văn kỷ');
  const [email, setEmail] = useState('vo************@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('*********57');
  const [gender, setGender] = useState(1);
  const [birthday, setBirthday] = useState('1999-01-05');

  //handle change birthday
  const changeBirthday = (val) => {
    setBirthday(val);
    console.log(birthday);
  };

  // handle select gender active
  useEffect(() => {
    let stardust_radio = document.querySelectorAll('.stardust_radio_click');

    // add class active
    const genderActive = () => {
      for (let j = 0; j < stardust_radio.length; j++) {
        if (stardust_radio[j].getAttribute('value') == gender) {
          stardust_radio[j].classList.add('stardust-radio_active');
        }
      }
    };
    genderActive();
    //handle click active gender
    const handleClick = (e) => {
      if (e.currentTarget.classList.contains('stardust-radio_active') == false) {
        for (let i = 0; i < stardust_radio.length; i++) {
          if (stardust_radio[i].classList.contains('stardust-radio_active') == true) {
            stardust_radio[i].classList.remove('stardust-radio_active');
          }
          // e.currentTarget.classList.add('stardust-radio_active');
          setGender(e.currentTarget.getAttribute('value'));
        }
      }
    };
    if (stardust_radio) {
      stardust_radio.forEach((e) => e.addEventListener('click', handleClick));
    }
    return () => {
      if (stardust_radio) {
        stardust_radio.forEach((e) => e.removeEventListener('click', handleClick));
      }
    };
  }, [gender]);

  const handleSaveProfile = (e) => {
    e.preventDefault();
  };
  const handleAvatar = (e) => {};
  return (
    <>
      <Account>
        <div className={cx('wrapper')}>
          <div className={cx('header')}>
            <h2 className={cx('header-title')}>My Profile</h2>
            <div className={cx('header-note')}>Manage and protect your account</div>
          </div>
          <div className={cx('footer', 'd-flex flex-row')}>
            <div className={cx('form-contain')}>
              <form className={cx('d-flex flex-row')}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <label className="text-capitalize">Username</label>
                      </td>
                      <td>
                        <div className={cx('username')}>{username}</div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="text-capitalize">Name</label>
                      </td>
                      <td>
                        <div className={cx('name')}>
                          <input
                            className="form-control"
                            type="text"
                            placeholder=""
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="text-capitalize">Email</label>
                      </td>
                      <td>
                        <div className={cx('email', 'd-flex flex-row align-items-center')}>
                          <div className={cx('email-contain')}>{email}</div>
                          <button className="btn">Change</button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="text-capitalize">phone number</label>
                      </td>
                      <td>
                        <div className={cx('phone', 'd-flex flex-row align-items-center')}>
                          <div className={cx('phone-contain')}>{phoneNumber}</div>
                          <button className="btn">Change</button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="text-capitalize">gender</label>
                      </td>
                      <td>
                        <div className={cx('gender')}>
                          <div className={cx('gender-contain', 'd-flex flex-row gap-3')}>
                            <div className={cx('stardust-radio', 'stardust_radio_click d-flex flex-row')} value={0}>
                              <div className={cx('outer-circle', 'outer-circle_active')}>
                                <div className={cx('inner-circle', 'inner-circle_active')}></div>
                              </div>
                              <div className={cx('gender-male')}>Male</div>
                            </div>
                            <div className={cx('stardust-radio', 'stardust_radio_click d-flex flex-row')} value={1}>
                              <div className={cx('outer-circle', 'outer-circle_active')}>
                                <div className={cx('inner-circle', 'inner-circle_active')}></div>
                              </div>
                              <div className={cx('gender-female')}>Female</div>
                            </div>
                            <div className={cx('stardust-radio', 'stardust_radio_click d-flex flex-row')} value={2}>
                              <div className={cx('outer-circle', ' outer-circle_active')}>
                                <div className={cx('inner-circle', 'inner-circle_active')}></div>
                              </div>
                              <div className={cx('gender-other')}>Other</div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <label className="text-capitalize">Date of birth</label>
                      </td>
                      <td>
                        <div className={cx('gender')}>
                          <div className={cx('gender-contain')}>
                            <Date setDefault={birthday} onChangeValue={changeBirthday} numberOfYears={80} />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>
                        <button className={cx('save', 'btn')}>Save</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </div>
            <div className={cx('avatar-contain', 'd-flex flex-column align-items-center')}>
              <div onClick={handleAvatar} className={cx('avatar-contain-img')} style={{ cursor: 'pointer' }}>
                <Images className={cx('rounded-circle')} src={avatar} alt={avatar} />
              </div>
              <input type="file" accept=".jpg,.jpeg,.png" />
              <button
                onClick={handleAvatar}
                type="button"
                className={cx('avatar-contain-select-image', 'text-capitalize')}
              >
                select image
              </button>
              <div className={cx('avatar-contain-note', 'd-flex flex-column')}>
                <span className={cx('note-file-size')}>File size: maximum 1 MB</span>
                <span className={cx('note-file-extension')}>File extension: .JPEG, .PNG</span>
              </div>
            </div>
          </div>
        </div>
      </Account>
    </>
  );
}

export default Profile;
