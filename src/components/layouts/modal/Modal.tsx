import React, { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';

import domUuid from 'utils/domUuid';
import { useBrowser } from 'hooks';

interface Props {
  isOpen: boolean;
  toggle: () => void;
  size?: Size;
  children: React.ReactNode;
  className?: string;
}

const Modal: Component<Props> = ({ isOpen, toggle, children, size }) => {
  const backgroundId = useMemo<string>(() => `modal-${domUuid()}`, []);
  const isBrowser = useBrowser();

  const modalNode = useMemo<HTMLDivElement>(
    () => isBrowser && document.createElement('div'),
    [isBrowser]
  );

  useEffect(() => {
    if (isOpen) {
      modalNode.id = `modal m-${domUuid()}`;
      document.body.appendChild(modalNode);

      return () => {
        document.body.removeChild(modalNode);
      };
    }
  }, [isOpen, modalNode]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const classname = useMemo<string>(() => {
    switch (size) {
      case 'xs':
        return 'w-[350px]';
      case 'sm':
        return 'w-[450px]';
      case 'lg':
        return 'w-2/3';
      case 'xl':
        return 'w-3/4';
      default:
        return 'w-1/2';
    }
  }, [size]);

  const handleClick = (event) => event.target.id === backgroundId && toggle();

  if (!isBrowser) return null;

  const component = (
    <div className="z-100 fixed top-0 left-0 w-screen h-screen bg-opacity-50 bg-gray-800">
      <div
        id={backgroundId}
        onClick={handleClick}
        className="fixed flex justify-items-center backdrop-filter backdrop-blur-sm bg-gray-600 bg-opacity-40 h-screen w-screen overflow-hidden top-0 left-0 z-100 px-4"
      >
        <div className={classnames(classname, 'bg-white m-auto max-h-[90%]')}>
          {children}
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(component, modalNode);
};

export default Modal;
