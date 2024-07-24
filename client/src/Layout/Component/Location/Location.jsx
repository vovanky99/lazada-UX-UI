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
    SearchValue,
    placement = 'bottom',
    useLabel = true,
    useColumn = false,
    handleSetID = () => {},
    handleSetName = () => {},
    handleOnchange = () => {},
    handleOnclick = () => {},
    disabled = false,
  },
  ref,
) {
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
        useTippy={useTippy}
        valueID={value}
        useColumn={useColumn}
        useLabel={useLabel}
        Value={searchValue}
        placement={placement}
        disabled={disabled}
        title={title}
        name={name}
        classTitle={classTitle}
        useNull={true}
        data={Data}
        searchValue={setSearchValue}
        handleOnchange={handleOnchange}
        handleSetID={setValue}
        handleOnclick={handleOnclick}
      />
    </>
  );
});

export default Location;
