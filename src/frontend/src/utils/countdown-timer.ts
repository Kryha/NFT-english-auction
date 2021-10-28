import { useEffect, useState } from "react";
import * as text from "../assets";

// Pass a date string to this function
export const Countdown = (expiresAt: string): string => {
  const [time, setTime] = useState<string>("");
  const [isTimeRemaining, setIsTimeRemaining] = useState<boolean>(true);

  useEffect(() => {
    countdownTimer();

    const interval = setInterval((): void => {
      if (!isTimeRemaining) return clearInterval(interval);
      countdownTimer();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const countdownTimer = () => {
    const countDownDate = Date.parse(expiresAt);
    const now = Date.now();

    const timeLeft = countDownDate - now;
    if (timeLeft <= 0) {
      setTime(text.timeIsUp);
      setIsTimeRemaining(false);
    } else {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      setTime(text.timeRemaining(days, hours, minutes, seconds));
    }
  };
  return time;
};
