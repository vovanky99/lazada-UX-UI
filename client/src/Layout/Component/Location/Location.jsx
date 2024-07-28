import { forwardRef, useEffect, useState } from 'react';
import GetLocation from '~/api/Location/GetLocation';
import { FormSearch } from '../FormSearch';

const Location = forwardRef(function Location(
  {
    title,
    classTitle,
    ValueID,
    foreignID,
    useTippy = true,
    name,
    type,
    SearchValue,
    placement = 'bottom',
    useLabel = true,
    useColumn = false,
    resetValue = false,
    handleSetID = () => {},
    handleSetName = () => {},
    handleOnchange = () => {},
    handleOnclick = () => {},
    handleResetValue = () => {},
    disabled = false,
  },
  ref,
) {
  const [value, setValue] = useState(ValueID || '');
  const [searchValue, setSearchValue] = useState(SearchValue || '');
  const [data, setData] = useState(null);

  // pass data for parent
  useEffect(() => {
    handleSetID(value);
  }, [value]);
  useEffect(() => {
    handleSetName(searchValue);
  }, [searchValue]);

  /* get data */
  useEffect(() => {
    GetLocation(title, searchValue, foreignID)
      .then((result) => {
        setData(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [searchValue, foreignID]);
  return (
    <>
      <FormSearch
        ref={ref}
        resetValue={resetValue}
        useTippy={useTippy}
        valueID={value}
        useColumn={useColumn}
        useLabel={useLabel}
        Value={searchValue}
        placement={placement}
        disabled={disabled}
        title={title}
        type={type}
        name={name}
        handleResetValue={handleResetValue}
        classTitle={classTitle}
        data={data}
        searchValue={setSearchValue}
        handleOnchange={handleOnchange}
        handleSetID={setValue}
        handleOnclick={handleOnclick}
      />
    </>
  );
});

export default Location;
