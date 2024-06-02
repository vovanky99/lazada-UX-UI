import { forwardRef, useEffect, useState } from 'react';
import GetLocation from '~/api/Location/GetLocation';
import { FormSearch } from '../FormSearch';

const Location = forwardRef(function Location(
  {
    title,
    classTitle,
    ValueID,
    foreignID,
    name,
    SearchValue,
    useLabel = true,
    handleSetID = () => {},
    handleSetName = () => {},
    handleOnchange = () => {},
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
  });
  useEffect(() => {
    handleSetName(searchValue);
  });

  /* get data */
  useEffect(() => {
    GetLocation(title, searchValue, foreignID)
      .then((result) => {
        setData(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [searchValue, foreignID]);
  return (
    <>
      <FormSearch
        ref={ref}
        valueID={value}
        useLabel={useLabel}
        Value={searchValue}
        title={title}
        name={name}
        classTitle={classTitle}
        useNull={true}
        data={Data}
        searchValue={setSearchValue}
        handleOnchange={handleOnchange}
        handleSetID={setValue}
        handleOnclick={handleOnclick}
      />
    </>
  );
});

export default Location;
