import React, { SelectHTMLAttributes, useMemo, useRef, useState } from "react";
import { useField } from "formik";
import classnames from "classnames";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  name: string;
  required?: boolean;
}

const FormikSelect: React.FC<SelectProps> = ({
  name,
  label,
  required,
  children,
  defaultValue,
  ...rest
}) => {
  const select = useRef<HTMLSelectElement>();
  const [focus, setFocus] = useState(false);

  const [{ onBlur, ...field }, meta] = useField(name);

  const error = useMemo<string>(
    () => (meta.touched && !!meta.error ? meta.error : ""),
    [meta.error, meta.touched]
  );

  const handleClick = () => {
    select.current.focus();
  };

  return (
    <div className="w-full px-2 my-1.5">
      <div
        onClick={handleClick}
        className={classnames(
          "relative group rounded-md p-0.5 border-2 border-gray-300 hover:border-blue-500 focus-within:border-blue-500 bg-white w-full transition duration-200",
          { "border-red-400": error }
        )}
      >
        <label
          onClick={handleClick}
          className={classnames(
            "absolute mx-2 text-md rounded-full px-1 top-2 text-gray-500 bg-white group-hover:text-primary transform transition duration-200 left-3 cursor-text",
            {
              "-translate-y-6 -translate-x-2 text-gray-800":
                focus || field.value,
            }
          )}
        >
          {label}
          {required ? <em className="text-red-600">*</em> : null}
        </label>
        <select
          ref={select}
          className="w-full bg-white text-lg outline-none px-5 py-2"
          {...field}
          {...rest}
          onBlur={(event) => {
            setFocus(false);
            onBlur(event);
          }}
        >
          {children}
        </select>
      </div>
      <div
        className={classnames("text-danger text-right px-2 text-xs", {
          invisible: !error,
        })}
      >
        {error || "none"}
      </div>
    </div>
  );
};

export default FormikSelect;
