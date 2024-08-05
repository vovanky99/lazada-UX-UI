import { forwardRef, useEffect, useState } from 'react';
import { FormSearch } from '../FormSearch';
import { GetAttrsBar } from '~/api/General/HandleData';
import { useSelector } from 'react-redux';

const Attributes = forwardRef(function Attributes(
  {
    title,
    classTitle,
    ValueID,
    foreignID,
    cat_id,
    useColumn = false,
    SearchValue,
    useLabel = true,
    handleSetID = () => {},
    handleOnchange = () => {},
    handleSetName = () => {},
    handleOnclick = () => {},
    handleResetValue = () => {},
    placement,
    name,
  },
  ref,
) {
  const { language } = useSelector((state) => state.Auth);
  const [value, setValue] = useState(ValueID || '');
  const [searchValue, setSearchValue] = useState(SearchValue || '');
  const [Data, setData] = useState(null);

  // pass data for parent
  useEffect(() => {
    handleSetID(value);
  }, [value]);
  useEffect(() => {
    handleSetName(searchValue);
  }, [searchValue]);

  /* get data */
  useEffect(() => {
    GetAttrsBar({ name: searchValue, attr_id: value, cat_id: cat_id }, language)
      .then((result) => {
        if (result?.attrs) {
          setData(result?.attrs);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [searchValue, value, cat_id]);
  return (
    <>
      <FormSearch
        ref={ref}
        name={name}
        valueID={value}
        useLabel={useLabel}
        Value={searchValue}
        title={title}
        classTitle={classTitle}
        handleResetValue={handleResetValue}
        data={Data}
        placement={placement}
        useColumn={useColumn}
        handleOnclick={handleOnclick}
        handleOnchange={handleOnchange}
        searchValue={setSearchValue}
        handleSetID={setValue}
      />
    </>
  );
});

export default Attributes;
