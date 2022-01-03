import React, { useMemo, useRef, useState } from 'react';
import { useField } from 'formik';
import classnames from 'classnames';

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  required?: boolean;
}

const Field: React.FC<FieldProps> = ({ type, name, label, required, ...rest }) => {
  const input = useRef<HTMLInputElement>();
  const [focus, setFocus] = useState<boolean>(false);

  const [{ onBlur, ...field }, meta] = useField(name);

  const error = useMemo<string>(
    () => (meta.touched && !!meta.error ? meta.error : ''),
    [meta.error, meta.touched]
  );

  const handleClick = (): void => {
    input.current.select();
    input.current.focus();
  };

  return (
    <div className="w-full px-2 my-1.5">
      <div
        onClick={handleClick}
        className={classnames(
          'relative group rounded-md p-0.5 border-[3px] border-gray-300 hover:border-blue-500 focus-within:border-blue-500 bg-white w-full transition duration-200',
          { 'border-red-400': error }
        )}
      >
        <label
          onClick={handleClick}
          className={classnames(
            'absolute px-1 mx-2 text-md top-2.5 bg-white group-hover:text-blue-700 transform transition duration-200 left-3 text-opacity-40 cursor-text',
            { '-translate-y-6 -translate-x-2': focus || field.value }
          )}
        >
          {label}
          {required ? <em className="text-red-600">*</em> : null}
        </label>
        <input
          ref={input}
          onFocus={() => setFocus(true)}
          onBlur={(event) => {
            setFocus(false);
            onBlur(event);
          }}
          className="w-full bg-white text-lg px-5 py-2"
          type={type}
          {...field}
          {...rest}
        />
      </div>
      <div
        className={classnames('text-danger text-right px-2 text-xs', {
          invisible: !error,
        })}
      >
        {error || 'none'}
      </div>
    </div>
  );
};

export default Field;
export { default as File } from './File';
export { default as TextArea } from './Textarea';
export { default as Select } from './Select';
