import classNames from 'classnames/bind';
import styles from '../ReportProduct.module.scss';
import Button from '~/components/Button';
import Tippy from '@tippyjs/react/headless';
import { FormSearch } from '~/layout/Component/FormSearch';
import { useEffect, useState } from 'react';
import GetCategory from '~/api/Category/GetCategory';
import { FormSelect } from '~/layout/Component/FormGroup/FormSelect';
import { EditData } from '~/api/General/HandleData';
import DeleteCategory from '~/api/Category/DeleteCategory';

const cx = classNames.bind(styles);

export default function ListReport({ handleDelete = () => {} }) {
  return <></>;
}
