import React, { FC, HTMLAttributes, MouseEventHandler, useEffect, useRef } from 'react';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  close: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, close, ...rest }) => {
  const background = useRef<HTMLDivElement>();

  const handleClose: MouseEventHandler = ({ target }) => {
    if (background.current === target) {
      close && close();
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
