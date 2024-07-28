import { forwardRef, useEffect, useState } from 'react';
import { GetData } from '~/api/General/HandleData';
import { FormSearch } from '~/layout/Component/FormSearch';

const Department = forwardRef(function Department(
  {
    title,
    classTitle,
    ValueID,
    SearchValue,
    useLabel = true,
    handleSetID = () => {},
    handleSetName = () => {},
    handleOnclick = () => {},
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
    GetData('admin', 'department', { name: searchValue })
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
        handleOnclick={handleOnclick}
        ref={ref}
        valueID={value}
        useLabel={useLabel}
        Value={searchValue}
        title={title}
        classTitle={classTitle}
        data={Data}
        searchValue={setSearchValue}
        handleSetID={setValue}
      />
    </>
  );
});

export default Department;
