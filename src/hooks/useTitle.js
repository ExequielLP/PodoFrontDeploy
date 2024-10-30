import { useEffect, useRef } from "react";

export default function useTitle({ title }) {
  const prevTitle = useRef(document.title);

  useEffect(() => {
    const previusTitle = prevTitle.current;
    document.title = `Pedicuría La Plata | ${title}`;

    return () => (document.title = previusTitle);
  }, [title]);
}
