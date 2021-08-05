import { useState } from "react";

const useToggle = (initialValues: boolean = false): [boolean, () => void] => {
  const [state, setState] = useState<boolean>(initialValues);
  const toggle = () => setState(!state);
  return [state, toggle];
};

export default useToggle;
