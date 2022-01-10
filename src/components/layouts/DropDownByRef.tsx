import React, { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import { Transition } from '@headlessui/react';

interface Props {
  innerRef: { current: HTMLElement };
  children: React.ReactNode;
}

const DropDownByRef: React.FC<Props> = ({ innerRef, children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [id] = useState<string>('dropdown-' + uuid());

  useEffect(() => {
    if (innerRef?.current) {
      innerRef.current.classList.add(id);
    } else throw new Error('Dropdown by ref must provide a valide ref');
  }, [innerRef]);

  useEffect(() => {
    if (innerRef?.current) {
      const toggleOpen = () => setOpen(!open);

      innerRef.current.addEventListener('click', toggleOpen, true);

      return () => innerRef.current.removeEventListener('click', toggleOpen, true);
    }
  }, [innerRef, open]);

  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.classList.contains(id)) setOpen(false);
    };

    document.body.addEventListener('click', handleClick, true);

    return () => document.body.removeEventListener('click', handleClick, true);
  }, []);

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
  );
};

export default DropDownByRef;