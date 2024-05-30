import WrapperMain from '~/layout/Component/WrapperMain';
import classNames from 'classnames/bind';
import styles from '~/pages/ADMIN/Blog/Blog.module.scss';
import Button from '~/components/Button';
import { useEffect, useRef, useState } from 'react';
import { FormSearch } from '~/layout/Component/FormSearch';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import config from '~/config';
import TodoList from '~/components/TodoList';
import { TodoListData } from '~/api/General/HandleData';
import GetBlog from '~/api/Blog/GetBlog';

const cx = classNames.bind(styles);

export default function EditBlog() {
  return (
    <>
      <WrapperMain title="edit blog">
        <div className={cx}></div>
      </WrapperMain>
    </>
  );
}
