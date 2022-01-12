import React, { useEffect, useRef } from 'react';
import { Transition } from '@headlessui/react';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  toggle: () => void;
}

const Modal: React.FunctionComponent<ModalProps> = ({ isOpen, toggle, ...rest }) => {
  const background = useRef<HTMLDivElement>();

  const handleClose: React.MouseEventHandler = ({ target }) => {
    if (background.current === target) {
      toggle && toggle();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Transition
      show={isOpen}
      enter="transition ease-out duration-200"
      enterFrom="transform opacity-0 scale-0"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div ref={background} onClick={handleClose} className="modal">
        {isOpen && <div {...rest} />}
      </div>
    </Transition>
  );
};

export default Modal;
