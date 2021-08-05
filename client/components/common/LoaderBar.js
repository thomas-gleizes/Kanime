import classnames from "classnames";

import { useCallback, useEffect, useState } from "react";
import { useLoaderContext } from "../../context/loader";

let loop = null;

const LoaderBar = () => {
  const [percent, setPercent] = useState(0);
  const [inProgress, setInProgress] = useState(false);
  const { loading } = useLoaderContext();

  const initLoader = useCallback(() => {
    let n = 0;
    loop = setInterval(() => {
      if (n >= 90) {
        clearInterval(loop);
      } else {
        n += 1;
        setPercent(n);
      }
    }, 28);
  }, []);

  const completeLoader = useCallback(() => {
    clearInterval(loop);
    setPercent(100);
    setTimeout(() => {
      setInProgress(false);
    }, 500);
    setTimeout(() => {
      setPercent(0);
    }, 2000);
  }, []);

  useEffect(() => {
    if (loading && !inProgress) {
      setPercent(0);
      setInProgress(true);
      initLoader();
    }

    if (!loading && inProgress) {
      completeLoader();
    }
  }, [loading]);

  return (
    <div
      className="-z-10 absolute left-0 w-full bg-transparent"
      style={{ height: "0.184rem" }}
    >
      <div
        className={classnames(
          "h-full transition ease-in-out bg-secondary",
          percent === 100
            ? "opacity-0 duration-1500"
            : "opacity-100 duration-75"
        )}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export default LoaderBar;
