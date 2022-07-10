import { devNull } from "os";
import { useEffect, useState } from "react";

export const UseIsMobile = (breakpoint: number) => {
  const [mobile, setMobile] = useState<boolean | null>(null);
  const [windowSize, setWindowSize] = useState<number>(0);

  // add event listeners
  useEffect(() => {
    if (typeof window != undefined) {
      window.addEventListener("orientationchange", getWindowWidth);
      window.addEventListener("resize", getWindowWidth);

      if (window.innerWidth < breakpoint) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    }
    return () => {
      window.removeEventListener("resize", getWindowWidth);
      window.removeEventListener("orientationchange", getWindowWidth);
    };
  }, [windowSize]);

  // get Window Width
  const getWindowWidth = () => {
    setWindowSize(window.innerWidth);
  };

  return mobile;
};
