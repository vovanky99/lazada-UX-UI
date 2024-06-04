import { forwardRef, useEffect, useState } from 'react';
import { GetData } from '~/api/General/HandleData';
import { FormSearch } from '~/layout/Component/FormSearch';

const Role = forwardRef(function Role(
  {
    title,
    classTitle,
    ValueID,
    SearchValue,
    useLabel = true,
    useNull = true,
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
    GetData('admin', 'role', { name: searchValue })
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
        handleOnclick={handleOnclick}
        valueID={value}
        useLabel={useLabel}
        Value={searchValue}
        title={title}
        classTitle={classTitle}
        useNull={useNull}
        data={Data}
        searchValue={setSearchValue}
        handleSetID={setValue}
      />
    </>
  );
});

export default Role;
