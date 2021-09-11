import React, { useEffect, useMemo } from "react";
import classnames from "classnames";
import { FaTimes } from "react-icons/fa";

import { useCallBackRef, useToggle } from "../../helpers/hooks";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Image: React.FC<Props> = ({ className, onClick, alt, ...props }) => {
  const [element, ref] = useCallBackRef();
  const [open, toggle] = useToggle();

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, []);

  const { width, height } = useMemo(() => {
    if (element) return { width: element.offsetWidth, height: element.offsetHeight };
    return { width: 0, height: 0 };
  }, [element]);

  return (
    <>
      <img
        ref={ref}
        className={classnames(className, "cursor-pointer")}
        onClick={toggle}
        alt={alt}
        {...props}
      />
      {open ? (
        <div
          onClick={toggle}
          className="fixed z-100 top-0 left-0 h-screen w-full bg-black bg-opacity-50"
        >
          <div className="absolute top-10 right-10">
            <FaTimes size={50} className="text-red-400 hover:text-red-500 cursor-pointer" />
          </div>
          <div className="h-screen w-full text-center">
            <span className="inline-block h-full align-middle" />
            <img
              {...props}
              width={width * 1.8}
              height={height * 1.8}
              className="m-auto inline-block align-middle"
              onClick={onClick}
              alt={alt}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Image;
