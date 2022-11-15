import { useEffect, useState } from 'react';
import RAF from '~/utils/funcs/RAF';

const REFRESH_CYCLE = 500;

export function useTime(getTime = Date.now, { rate = REFRESH_CYCLE } = {}) {
  const [now, setNow] = useState(getTime());
  const [isHourly, setIsHourly] = useState(false);
  const [isMinutely, setIsMinutely] = useState(false);
  useEffect(() => {
    const intervalId = RAF.setInterval(() => {
      const _now = getTime();
      setNow(_now);
    }, rate);
    return () => {
      RAF.clearInterval(intervalId);
    };
  }, [getTime, rate]);

  useEffect(() => {
    const _isMinutely = now % (60 * 1000) < rate;
    // console.log(`_isMinutely`, _isMinutely);
    setIsMinutely(_isMinutely); // 因为rate
  }, [now, rate]);
  useEffect(() => {
    const _isHourly = now % (60 * 60 * 1000) < rate;
    setIsHourly(_isHourly); // 因为rate
  }, [now, rate]);
  return { now, isHourly, isMinutely };
}
