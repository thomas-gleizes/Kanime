import { useState } from "react";

const useScroll = () => {
  const [state, setState] = useState<boolean>(false);

  const handleScroll = (target) => {};

  return [state, handleScroll];
};

export default useScroll;
