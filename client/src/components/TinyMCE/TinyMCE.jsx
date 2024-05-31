import { Editor } from '@tinymce/tinymce-react';
import { forwardRef } from 'react';
const TinyMCE = forwardRef(function TinyMCE({ initialValue, init, onChange = () => {} }, ref) {
  return (
    <Editor
      initialValue={initialValue}
      ref={ref}
      apiKey={`${process.env.REACT_APP_TINYMCE_KEY}`}
      init={init}
      onChange={(e) => {
        onChange(e);
      }}
    />
  );
});
export default TinyMCE;
