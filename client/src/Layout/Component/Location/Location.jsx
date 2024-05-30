import { forwardRef, useEffect, useState } from 'react';
import GetLocation from '~/api/Location/GetLocation';
import { FormSearch } from '../FormSearch';

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
      <FormSearch
        ref={ref}
        valueID={value}
        useLabel={useLabel}
        Value={searchValue}
        title={title}
        classTitle={classTitle}
        useNull={true}
        data={Data}
        searchValue={setSearchValue}
        handleSetID={setValue}
      />
    </>
  );
});

export default Location;
