import React, { useMemo } from 'react';
import { Field as FormikField, useField } from 'formik';

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  required?: boolean;
}

const Field: React.FC<FieldProps> = ({ name, label, required, ...props }) => {
  const [_, meta] = useField(name);

  const error = useMemo<string>(
    () => (meta.touched && !!meta.error ? meta.error : ''),
    [meta.error, meta.touched]
  );

  return (
    <div>
      <label>{}</label>
      <FormikField
        className="w-full p-4 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 focus:border-sky-500"
        name={name}
        {...props}
      />
      <div>{error}</div>
    </div>
  );
};

export default Field;
