import { forwardRef, useEffect, useState } from 'react';
import { FormSearch } from '../FormSearch';
import { GetCatBar } from '~/api/General/HandleData';
import { useSelector } from 'react-redux';

const Category = forwardRef(function Category(
  {
    title,
    classTitle,
    ValueID,
    foreignID,
    useColumn = false,
    SearchValue,
    useLabel = true,
    handleSetID = () => {},
    handleOnchange = () => {},
    handleSetName = () => {},
    handleOnclick = () => {},
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
    GetCatBar({ name: searchValue, parent_id: value }, language)
      .then((result) => {
        setData(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [searchValue, value]);
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
        data={Data}
        useColumn={useColumn}
        handleOnclick={handleOnclick}
        handleOnchange={handleOnchange}
        searchValue={setSearchValue}
        handleSetID={setValue}
      />
    </>
  );
});

export default Category;
