import { forwardRef, useEffect, useState } from 'react';
import { FormSearch } from '../FormSearch';
import { GetData } from '~/api/General/HandleData';

const Category = forwardRef(function Category(
  {
    title,
    classTitle,
    ValueID,
    foreignID,
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
    GetData('admin', 'category', { value: searchValue })
      .then((result) => {
        setData(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [searchValue]);
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
        useNull={true}
        data={Data}
        handleOnclick={handleOnclick}
        handleOnchange={handleOnchange}
        searchValue={setSearchValue}
        handleSetID={setValue}
      />
    </>
  );
});

export default Category;
