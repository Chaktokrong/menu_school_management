import { useState, useEffect } from "react";

const useWithDimension = () => {
  // ========================= Resize width Screen ========================
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth - 50);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return { width };
};

export default useWithDimension;
