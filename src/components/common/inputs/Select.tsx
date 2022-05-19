import { Fragment, useEffect, useMemo } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

interface Props {
  value: any;
  onChange: (value: any) => void;
  placeholder?: string;
  children: JSX.Element[];
  color?: TailwindcssColors;
}

type OptionsComponent = Component<{ value: string; children: string }>;

const Select: Component<Props> & { Option?: OptionsComponent } = ({
  value,
  onChange,
  children,
  placeholder,
}) => {
  const currentValue = useMemo(() => {
    const current: { children: string; value: any } | null = children.find(
      (child) => child.props.value === value
    )?.props;

    if (current)
      return {
        label: current.children,
        value: current.value,
      };
    else return null;
  }, [children, value]);

  console.log(currentValue);

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">
            {currentValue?.label || placeholder || 'Veuillez sélectionner une valeur'}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-50 py-1 text-base shadow-lg ring-1 ring-gray-500 ring-opacity-20 focus:outline-none sm:text-sm">
            {children}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

const Option: OptionsComponent = ({ value, children }) => (
  <Listbox.Option
    className={({ active }) =>
      `relative cursor-default select-none py-2 px-5 ${
        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
      }`
    }
    value={value}
  >
    {({ selected }) => (
      <>
        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
          {children}
        </span>
        {selected ? (
          <span className="absolute inset-y-0 right-2 flex items-center px-2 text-amber-600">
            <CheckIcon className="h-5 w-5" aria-hidden="true" />
          </span>
        ) : null}
      </>
    )}
  </Listbox.Option>
);

Select.Option = Option;

export default Select;
