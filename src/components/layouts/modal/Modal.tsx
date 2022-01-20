import React, { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import domUuid from '@helpers/domUuid';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  toggle: () => void;
}

const Modal: React.FunctionComponent<ModalProps> = ({ isOpen, toggle, ...rest }) => {
  const backgroundId = useMemo(() => `modal-${domUuid()}`, []);
  const modalNode = useMemo<HTMLDivElement>(
    () => process.browser && document.createElement('div'),
    [process.browser]
  );

  useEffect(() => {
    if (isOpen) {
      modalNode.id = `modal m-${domUuid()}`;
      document.body.appendChild(modalNode);

      return () => {
        document.body.removeChild(modalNode);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const handleClick = (event) => {
    if (event.target.id === backgroundId) toggle();
  };

  if (!process.browser) return null;

  const component = (
    <div
      id={backgroundId}
      onClick={handleClick}
      className="z-100 fixed top-0 left-0 w-screen h-screen bg-opacity-50 bg-gray-800"
    >
      <div {...rest} />
    </div>
  );

  return ReactDOM.createPortal(component, modalNode);
};

export default Modal;
