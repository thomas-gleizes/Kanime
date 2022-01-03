import React from 'react';
import { useField } from 'formik';
import base64 from '@helpers/base64';

interface Props {
  innerRef: any;
  name: string;
  disabled?: boolean;
}

const File: React.FunctionComponent<Props> = ({ innerRef, name, disabled }) => {
  const [__, _, { setValue }] = useField(name);

  const handleChange = ({ target }) => {
    const file = target.files[0];

    base64
      .encode(file)
      .then((result) => {
        console.log('data', result);

        setValue({ data: result, extension: file.type });
      })
      .catch((error) => {
        console.log('error', error);
      });
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
