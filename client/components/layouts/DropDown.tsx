import React, { useEffect, useState } from "react";
import { Transition } from "@tailwindui/react";

interface Props {
  innerRef: { current: HTMLElement };
  children: React.ReactNode;
}

const DropDown: React.FC<Props> = ({ innerRef, children }) => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (innerRef) {
      innerRef.current.onclick = () => setOpen(!open);
    }
  }, [innerRef]);

  useEffect(() => {
    document.body.addEventListener("click", handleClick, true);

    return () => document.body.removeEventListener("click", handleClick, true);
  }, []);

  const handleClick = () => setOpen(false);

  return (
    <Transition
      show={open}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div className="absolute">{children}</div>
    </Transition>
  );
};

export default DropDown;
