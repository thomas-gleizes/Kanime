import React, { LegacyRef, MutableRefObject, useEffect, useMemo, useState } from 'react'
import { Transition } from '@headlessui/react'
import domUuid from 'utils/domUuid'

interface Props {
  innerRef: MutableRefObject<HTMLElement | null>
  children: ReactNode
}

const DropDownByRef: Component<Props> = ({ innerRef, children }) => {
  const [open, setOpen] = useState<boolean>(false)

  const identifier = useMemo<string>(() => `dropdown-${domUuid()}`, [])

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.classList.add(identifier)
    } else throw new Error('Dropdown by ref must provide a valide ref')
  }, [innerRef]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (innerRef.current) {
      const toggleOpen = () => setOpen(!open)

      innerRef.current.addEventListener('click', toggleOpen, true)

      return () => innerRef.current?.removeEventListener('click', toggleOpen, true)
    } else throw new Error('Dropdown by ref must provide a valide ref')
  }, [innerRef, open])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const element = event.target as HTMLElement
      if (element.classList.contains(identifier)) setOpen(false)
    }

    document.body.addEventListener('click', handleClick, true)

    return () => document.body.removeEventListener('click', handleClick, true)
  }, [])

  return (
    <Transition
      show={open}
      enter="transition ease-out duration-200"
      enterFrom="transform opacity-0 scale-0"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-150"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-0"
    >
      <div className="relative">{children}</div>
    </Transition>
  )
}

export default DropDownByRef
