import React from 'react';
import { useField } from 'formik';
import { TailwindcssColors } from '../../../../types/global';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  color?: TailwindcssColors;
  label?: string;
  required?: boolean;
}

const Select: React.FunctionComponent<SelectProps> = ({
  name,
  label,
  required,
  defaultValue,
  color,
  children,
  ...rest
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <em>*</em>}
        </label>
      )}
      <select
        {...field}
        {...rest}
        className="mt-1 block w-full py-2 px-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
      >
        {children}
      </select>
    </>
  );
};

Select.defaultProps = {
  color: 'blue',
};

export default Select;
