'use client'

import React, { useMemo } from 'react'
import { useField } from 'formik'
import classnames from 'classnames'

import { Input } from 'components/common/inputs'
import type { InputProps } from 'components/common/inputs/Input'

interface FieldProps extends InputProps {
  label?: string
  name: string
  required?: boolean
}

const Field: Component<FieldProps> = ({ name, label, required, className, ...props }) => {
  const [field, meta] = useField(name)

  const error = useMemo<string>(
    () => (meta.touched && !!meta.error ? meta.error : ''),
    [meta.error, meta.touched]
  )

  return (
    <div className={className}>
      {label && (
        <label className="text-sm">
          {label} {required && <em className="text-primary">*</em>}
        </label>
      )}
      <Input
        invalid={meta.touched && !!meta.error}
        valid={meta.touched && !meta.error}
        {...field}
        {...props}
      />
      <div
        className={classnames('text-danger text-right text-sm', {
          invisible: !(meta.touched && !!meta.error)
        })}
      >
        {error || 'none'}
      </div>
    </div>
  )
}

export default Field
