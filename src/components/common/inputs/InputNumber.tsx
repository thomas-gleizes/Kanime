import React, { KeyboardEventHandler } from 'react'
import { MinusIcon, PlusIcon } from '@heroicons/react/solid'

// @ts-ignore TODO remove
interface Props extends React.InputHTMLAttributes<any> {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  step: number
}

const InputNumber: Component<Props> = ({ value, onChange, min, max, step, ...props }) => {
  const handleKey: KeyboardEventHandler<HTMLInputElement> = ({ keyCode }) => {
    if (keyCode === 40) handleMinus()
    else if (keyCode === 38) handlePlus()
  }

  const handleMinus = () => {
    if ((!min && min !== 0) || min < value) handleChange(value - step)
  }

  const handlePlus = () => {
    if ((!max && max !== 0) || max > value) handleChange(value + step)
  }

  const handleChange = (value: number) => {
    if (value || value === 0) {
      if (min !== undefined && value < min) onChange(min)
      else if (max !== undefined && value > max) onChange(max)
      else onChange(value)
    } else if (isNaN(value)) onChange(0)
  }

  return (
    <div className="my-5 rounded-lg">
      <button
        type="button"
        onClick={handleMinus}
        className="bg-blue-600 hover:bg-blue-700 focus:bg-blue-800 rounded-l-lg text-white py-2 px-3"
      >
        <i>
          <MinusIcon className="h-5" />
        </i>
      </button>
      <input
        min={min}
        max={max}
        step={step}
        value={value}
        className="text-center bg-gray-50 text-lg"
        onKeyDown={handleKey}
        onChange={({ target: { value } }) => handleChange(+value)}
        {...props}
      />
      <button
        type="button"
        onClick={handlePlus}
        className="bg-blue-600 hover:bg-blue-700 focus:bg-blue-800 rounded-r-lg text-white py-2 px-3"
      >
        <i>
          <PlusIcon className="h-5" />
        </i>
      </button>
    </div>
  )
}

InputNumber.defaultProps = {
  step: 1
}

export default InputNumber
