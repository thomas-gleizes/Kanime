import React from 'react';
import { useField } from 'formik';
import base64 from 'utils/base64';

interface Props extends React.HTMLAttributes<HTMLInputElement> {
  innerRef: any;
  name: string;
  disabled?: boolean;
}

const File: Component<Props> = ({ innerRef, name, disabled }) => {
  const [__, _, { setValue }] = useField(name);

  const handleChange = ({ target }) => {
    const file = target.files[0];

    base64.encodeInputFile(file).then((result) =>
      setValue({
        raw: `data:${file.type};base64,${result}`,
        type: file.type,
        content: result,
      })
    );
  };

  return (
    <input
      ref={innerRef}
      onChange={handleChange}
      type="file"
      className="hidden"
      disabled={disabled}
    />
  );
};

export default File;
