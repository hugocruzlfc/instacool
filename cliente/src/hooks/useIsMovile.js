import { useEffect, useState } from "react";

export default function useIsMovil() {
  const [isMovil, setIsMovil] = useState(null);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 576px)");

    mql.addEventListener("change", checkIsMovil);
    checkIsMovil(mql);

    return () => mql.removeEventListener("change", checkIsMovil);
  }, []);

  const checkIsMovil = (mql) => {
    if (mql.matches) {
      setIsMovil(false);
    } else {
      setIsMovil(true);
    }
  };

  return isMovil;
}
