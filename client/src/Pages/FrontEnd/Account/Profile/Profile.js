import classNames from 'classnames/bind';
import style from './Profile.module.scss';
import Account from '../Account';

const cx = classNames.bind(style);

function Profile() {
  return (
    <>
      <Account>
        <h1>profile</h1>
      </Account>
    </>
  );
}

export default Profile;
