import { useCallback, useEffect, useState } from "react";

import * as text from "../assets";

export const useCountdown = (deadline: number): string => {
  const [time, setTime] = useState<string>("");
  const [isTimeRemaining, setIsTimeRemaining] = useState<boolean>(true);

  const day = 1000 * 60 * 60 * 24;
  const minute = 1000 * 60 * 60;
  const second = 1000 * 60;

  const countdownTimer = useCallback(() => {
    const now = Date.now();

    const timeLeft = deadline - now;
    if (timeLeft <= 0) {
      setTime(text.timeIsUp);
      setIsTimeRemaining(false);
    } else {
      const days = Math.floor(timeLeft / day);
      const hours = Math.floor((timeLeft % day) / minute);
      const minutes = Math.floor((timeLeft % minute) / second);
      const seconds = Math.floor((timeLeft % second) / 1000);

      setTime(text.timeRemaining(days, hours, minutes, seconds));
    }
  }, [day, deadline, minute, second]);

  useEffect(() => {
    countdownTimer();

    const interval = setInterval((): void => {
      if (!isTimeRemaining) return clearInterval(interval);
      countdownTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownTimer, isTimeRemaining]);

  return time;
};
