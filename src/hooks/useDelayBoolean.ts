import { useEffect, useState } from 'react';

export default function useDelayBoolean(milliseconds: number): [boolean, () => void] {
  const [bool, setBool] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setBool(false), milliseconds);
  }, [bool]);

  const trigger = () => {
    if (!bool) setBool(true);
  };

  return [bool, trigger];
}
