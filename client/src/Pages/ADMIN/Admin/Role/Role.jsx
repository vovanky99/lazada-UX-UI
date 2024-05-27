import { forwardRef, useEffect, useState } from 'react';
import GetRole from '~/api/Role/GetRole';
import { SearchSelect } from '~/layout/Component/SearchSelect';

const Role = forwardRef(function Role(
  {
    title,
    classTitle,
    ValueID,
    SearchValue,
    useLabel = true,
    NullValue = true,
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
    GetRole(searchValue)
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

export default Role;
