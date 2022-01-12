import React from 'react';
import { tailwindcssColors } from '@lib/constants';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const GenericButton: React.FunctionComponent<Props> = ({ children, ...props }) => {
  console.log('TailwindcssColors', tailwindcssColors);

  return (
    <button
      {...props}
      className="w-full flex justify-center bg-white text-gray-800 font-bold transition rounded border-b-2 border-blue-500 hover:border-blue-600 hover:bg-blue-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
    >
      <span className="mr-2">{children}</span>
    </button>
  );
};

export default GenericButton;
