import { forwardRef, useEffect, useState } from 'react';
import GetLocation from '~/api/Location/GetLocation';
import { SearchSelect } from '../SearchSelect';

const Location = forwardRef(function Location(
  {
    title,
    classTitle,
    ValueID,
    ForeignID,
    SearchValue,
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
    GetLocation(title, searchValue, ForeignID)
      .then((result) => {
        setData(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [searchValue, ForeignID]);
  return (
    <>
      <SearchSelect
        ref={ref}
        valueID={value}
        isLabel={useLabel}
        searchValue={searchValue}
        title={title}
        classTitle={classTitle}
        NullValue={true}
        data={Data}
        searchSelectValue={setSearchValue}
        handleSetID={setValue}
      />
    </>
  );
});

export default Location;
