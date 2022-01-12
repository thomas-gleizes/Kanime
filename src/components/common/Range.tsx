import React, { useEffect, useMemo, useState } from 'react';

type minmax = {
  min: number;
  max: number;
};

interface Props {
  min: number;
  max: number;
  step: number;
  onChange: (values: minmax) => void;
}

const Range: React.FunctionComponent<Props> = ({ min, max, step, onChange }) => {
  const [minValue, setMinValue] = useState<number>(min);
  const [maxValue, setMaxValue] = useState<number>(max);

  const handleMin = ({ target: { value } }) => {
    console.log('min', +value);

    if (value < min) setMinValue(min);
    else if (value > max) setMinValue(max);
    else setMinValue(Math.min(value, maxValue));
  };

  const handleMax = ({ target: { value } }) => {
    console.log('max', +value, max);

    if (+value < min) setMaxValue(min);
    else if (+value > max) setMaxValue(max);
    else setMaxValue(Math.max(+value, minValue));
  };

  const thumb: minmax = useMemo(
    () => ({
      min: ((minValue - min) / (max - min)) * 100,
      max: 100 - ((maxValue - min) / (max - min)) * 100,
    }),
    [maxValue, minValue, min, max]
  );

  useEffect(
    () => onChange && onChange({ min: minValue, max: maxValue }),
    [minValue, maxValue]
  );

  return (
    <div className="relative w-full">
      <div>
        <input
          type="range"
          step={step}
          min={min}
          max={max}
          value={minValue}
          onChange={handleMin}
          className="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
        />
        <input
          type="range"
          step={step}
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMax}
          className="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
        />
        <div className="relative z-10 h-2">
          <div className="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200" />
          <div
            className="absolute z-20 top-0 bottom-0 rounded-md bg-green-300"
            style={{ right: `${thumb.max}%`, left: `${thumb.min}%` }}
          />
          <div
            className="absolute z-30 w-6 h-6 top-0 left-0 bg-green-300 rounded-full -mt-2 -ml-1"
            style={{ left: `${thumb.min}%` }}
          />
          <div
            className="absolute z-30 w-6 h-6 top-0 right-0 bg-green-300 rounded-full -mt-2 -mr-3"
            style={{ right: `${thumb.max}%` }}
          />
        </div>
      </div>
      <div className="flex justify-between items-center py-5">
        <div>
          <input
            type="number"
            value={minValue}
            onChange={handleMin}
            className="px-3 py-2 border border-gray-200 rounded w-24 text-center"
          />
        </div>
        <div>
          <input
            type="number"
            value={maxValue}
            onChange={handleMax}
            className="px-3 py-2 border border-gray-200 rounded w-24 text-center"
          />
        </div>
      </div>
    </div>
  );
};

Range.defaultProps = {
  min: 0,
  max: 10,
  step: 1,
};

export default Range;
