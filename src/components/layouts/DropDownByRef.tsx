import React, { useEffect, useRef, useState } from 'react'
import { Transition } from '@headlessui/react'
import { useClickAway } from 'react-use'

interface Props {
  innerRef: MutableRefObject<HTMLElement>
  children: ReactNode
}

const DropDownByRef: Component<Props> = ({ innerRef, children }) => {
  const ref = useRef(null)
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (innerRef.current) {
      const toggleOpen = () => setOpen(!open)

      innerRef.current.addEventListener('click', toggleOpen, true)

      return () => innerRef.current?.removeEventListener('click', toggleOpen, true)
    } else throw new Error('Dropdown by ref must provide a valide ref')
  }, [innerRef, open])

  useClickAway(ref, () => setOpen(false))

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
      <div ref={ref} className="relative" onClick={() => setOpen(false)}>
        {children}
      </div>
    </Transition>
  )
}

export default DropDownByRef
