import { forwardRef, useEffect, useState } from 'react';
import { FormSearch } from '../FormSearch';
import GetCategory from '~/api/Category/GetCategory';

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
  });
  useEffect(() => {
    handleSetName(searchValue);
  });

  /* get data */
  useEffect(() => {
    GetCategory({ value: searchValue })
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
        handleOnchange={handleOnchange}
        searchValue={setSearchValue}
        handleSetID={setValue}
      />
    </>
  );
});

export default Category;
