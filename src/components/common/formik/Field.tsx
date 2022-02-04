import React, { useMemo } from 'react';
import { Field as FormikField, useField } from 'formik';
import classnames from 'classnames';

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
      {label && (
        <label>
          {label} {required && <em>*</em>}
        </label>
      )}
      <FormikField
        className={classnames(
          'w-full px-4 py-3 text-sm bg-gray-50 focus:outline-none border border-gray-200 rounded text-gray-600 focus:border-sky-500 transition duration-150',
          { 'border-danger': error }
        )}
        name={name}
        {...props}
      />
      <div
        className={classnames('text-danger text-right text-sm', { invisible: !error })}
      >
        {error || 'none'}
      </div>
    </div>
  );
};

export default Field;
