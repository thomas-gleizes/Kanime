import React from 'react';
import { XIcon } from '@heroicons/react/solid';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CancelButton: React.FunctionComponent<Props> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      disabled={true}
      className="w-full flex justify-center bg-white text-gray-800 font-bold transition rounded border-b-2 disabled:bg-opacity-50 border-red-500 hover:border-red-600 hover:bg-red-500 hover:text-white shadow-md py-2 px-6"
    >
      <span className="mr-2">{children}</span>
      <XIcon className="h-5" />
    </button>
  );
};

CancelButton.defaultProps = {
  children: 'Annuler',
};

export default CancelButton;
