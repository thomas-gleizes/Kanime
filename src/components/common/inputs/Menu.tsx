import React, { useMemo, Fragment } from 'react'
import { Menu as MenuDropDown, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import classnames from 'classnames'

interface Props {
  label: string
  children: ReactNode
}

const Menu: Component<Props> = ({ label, children }) => {
  return (
    <MenuDropDown as="div" className="select-none relative w-full inline-block text-left">
      <div>
        <MenuDropDown.Button className="inline-flex w-full justify-center rounded-md bg-primary bg-opacity-80 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {label}
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
            aria-hidden="true"
          />
        </MenuDropDown.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuDropDown.Items className="absolute right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {children}
        </MenuDropDown.Items>
      </Transition>
    </MenuDropDown>
  )
}

export const MenuGroup: Component<{ children: ReactNode }> = ({ children }) => {
  return <div className="p-1">{children}</div>
}

interface MenuItemProps {
  children: ReactNode
  icon?: ReactNode
  color?: TailwindcssColors | CustomColors
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const MenuItem: Component<MenuItemProps> = ({
  children,
  icon,
  color,
  onClick
}) => {
  const colorClassName = useMemo<string>(() => {
    return ''
  }, [])

  return (
    <MenuDropDown.Item>
      {({ active }) => (
        <button
          className={classnames(
            { 'bg-primary text-white': active },
            'group flex w-full items-center rounded-md px-2 py-2 text-sm transition duration-100'
          )}
          onClick={onClick}
        >
          {icon}
          <div className="mx-2 text-lg">{children}</div>
        </button>
      )}
    </MenuDropDown.Item>
  )
}

export default Menu
