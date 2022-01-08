import { useEffect, useState } from 'react';
import Moment from '@helpers/momentFr';

const format = (date: Date): string => Moment(date).fromNow();

const useClockFromDate = (
  date: Date = new Date(),
  interval: number = 1000,
  formatTime: (date: Date) => string = format
) => {
  const [state, setState] = useState<string>(formatTime(date));

  useEffect(() => {
    const intervalId = setInterval(() => setState(formatTime(date)), interval);

    return () => clearInterval(intervalId);
  }, [interval]);

  return state;
};

export default useClockFromDate;
