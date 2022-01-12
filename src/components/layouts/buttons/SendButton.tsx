import React from 'react';
import { XIcon } from '@heroicons/react/solid';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const SendButton: React.FunctionComponent<Props> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="w-full flex justify-center bg-white text-gray-800 font-bold transition rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
    >
      <span className="mr-2">{children}</span>
      <XIcon className="h-5" />
    </button>
  );
};

SendButton.defaultProps = {
  children: 'Envoyer',
};

export default SendButton;
