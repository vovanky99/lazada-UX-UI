import { forwardRef, useEffect, useState } from 'react';
import GetDepartment from '~/api/Department/GetDepartment';
import { FormSearch } from '~/layout/Component/FormSearch';

const Department = forwardRef(function Department(
  {
    title,
    classTitle,
    ValueID,
    SearchValue,
    useNull = true,
    useLabel = true,
    handleSetID = () => {},
    handleSetName = () => {},
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
    GetDepartment(searchValue)
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

export default Department;
