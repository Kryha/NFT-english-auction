import { useEffect, useState } from "react";

export interface ResponsiveProps {
  useResponsive: boolean;
}

export const useCompactMode = (): boolean => {
  const [windowSize, setWindowSize] = useState<number>(0);

  useEffect(() => {
    function handleResize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return Boolean(windowSize < 1200);
};
