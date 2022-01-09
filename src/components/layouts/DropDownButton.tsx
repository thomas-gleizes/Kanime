import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';

interface Props {
  innerRef: { current: HTMLElement };
  children: React.ReactNode;
}

const DropDownButton: React.FC<Props> = ({ innerRef, children }) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (innerRef) {
      innerRef.current.onclick = () => setOpen(!open);
    }
  }, [innerRef, open]);

  useEffect(() => {
    document.body.addEventListener('click', handleClick, true);

    return () => document.body.removeEventListener('click', handleClick, true);
  }, []);

  const handleClick = () => setOpen(false);

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
      <div className="absolute">{children}</div>
    </Transition>
  );
};

export default DropDownButton;
