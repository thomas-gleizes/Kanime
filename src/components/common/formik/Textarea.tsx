'use client'

import React, { useMemo, useRef } from 'react'
import { useField } from 'formik'
import classnames from 'classnames'

interface FieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  name: string
  required?: boolean
}

const TextArea: Component<FieldProps> = ({ name, label, required, ...rest }) => {
  const input = useRef<HTMLTextAreaElement | null>(null)

  const [field, meta] = useField(name)

  const error = useMemo<string>(
    () => (meta.touched && !!meta.error ? meta.error : ''),
    [meta.error, meta.touched]
  )

  const handleClick = (): void => {
    if (input.current) {
      input.current.select()
      input.current.focus()
    }
  }

  return (
    <div onClick={handleClick} className="w-full relative px-2 my-1.5">
      <label className="absolute mx-2 font-medium text-md rounded-full px-2 -top-3 text-gray-600 bg-white group-hover:text-primary transform transition duration-200 left-3 cursor-text">
        {label}
        {required ? <em className="text-red-600">*</em> : null}
      </label>
      <textarea
        ref={input}
        className="border border-[3px] w-full p-3 rounded-md min-h-150 border-gray-300 hover:border-blue-500 focus-within:border-blue-500 bg-white w-full transition duration-200"
        {...field}
        {...rest}
      />
      <div
        className={classnames('text-danger text-right px-2 text-xs', {
          invisible: !error
        })}
      >
        {error || 'none'}
      </div>
    </div>
  )
}

TextArea.defaultProps = {
  maxLength: 500
}

export default TextArea
