import { forwardRef, useEffect, useState } from 'react';
import GetDepartment from '~/api/Department/GetDepartment';
import { SearchSelect } from '~/layout/Component/SearchSelect';

const Department = forwardRef(function Department(
  {
    title,
    classTitle,
    ValueID,
    SearchValue,
    NullValue = true,
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
      <SearchSelect
        ref={ref}
        valueID={value}
        isLabel={useLabel}
        searchValue={searchValue}
        title={title}
        classTitle={classTitle}
        NullValue={NullValue}
        data={Data}
        searchSelectValue={setSearchValue}
        handleSetID={setValue}
      />
    </>
  );
});

export default Department;
