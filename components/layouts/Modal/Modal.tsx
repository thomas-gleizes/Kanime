import React, { useEffect, useRef } from 'react';

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
    <div ref={background} onClick={handleClose} className="modal">
      {isOpen && <div {...rest} />}
    </div>
  );
};

export default Modal;
