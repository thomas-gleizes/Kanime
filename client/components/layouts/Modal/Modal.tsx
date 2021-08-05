import React, { FC, HTMLAttributes, useEffect, useRef } from "react";

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  close: () => void;
}

const Modal: FC<ModalProps> = ({ isOpen, close, ...rest }) => {
  const background = useRef<HTMLDivElement>();

  const handleClose = ({ target }) => {
    if (background.current === target) {
      close && close();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={background}
      onClick={handleClose}
      className="fixed backdrop-filter backdrop-blur-sm bg-gray-600 bg-opacity-40 h-screen w-screen overflow-hidden top-0 left-0 z-100 px-4"
    >
      <div {...rest} />
    </div>
  );
};

export default Modal;
